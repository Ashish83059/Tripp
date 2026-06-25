import { createContext, useContext, useState, useEffect } from "react";
import api from "../utils/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check logged-in user on app load
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;

      api
        .get("/api/auth/me")
        .then((res) => {
          setUser(res.data.user);
        })
        .catch(() => {
          localStorage.removeItem("token");
          delete api.defaults.headers.common[
            "Authorization"
          ];
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  // Login
  const login = async (email, password) => {
    const { data } = await api.post(
      "/api/auth/login",
      {
        email,
        password,
      }
    );

    localStorage.setItem(
      "token",
      data.token
    );

    api.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${data.token}`;

    setUser(data.user);
  };

  // Register
  const register = async (
    name,
    email,
    password
  ) => {
    const { data } = await api.post(
      "/api/auth/register",
      {
        name,
        email,
        password,
      }
    );

    localStorage.setItem(
      "token",
      data.token
    );

    api.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${data.token}`;

    setUser(data.user);
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");

    delete api.defaults.headers.common[
      "Authorization"
    ];

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () =>
  useContext(AuthContext);

export default AuthContext;