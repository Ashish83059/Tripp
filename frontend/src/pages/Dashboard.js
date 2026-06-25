import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import './Dashboard.css';

export default function Dashboard() {
  const { user } = useAuth();
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/itineraries').then(res => setItineraries(res.data.itineraries)).finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this itinerary?')) return;
    await api.delete(`/itineraries/${id}`);
    setItineraries(prev => prev.filter(i => i._id !== id));
  };

  const formatDate = (d) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <div className="dashboard">
      <div className="dash-header">
        <div>
          <h1>My Trips</h1>
          <p>Welcome back, {user?.name}! Here are your generated itineraries.</p>
        </div>
        <Link to="/upload" className="btn btn-primary">+ Upload New</Link>
      </div>

      {loading ? (
        <div className="loading-center"><div className="spinner" /></div>
      ) : itineraries.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">✈️</span>
          <h3>No trips yet</h3>
          <p>Upload your first travel booking to generate an AI itinerary</p>
          <Link to="/upload" className="btn btn-primary" style={{ marginTop: '1rem' }}>Upload a booking</Link>
        </div>
      ) : (
        <div className="trips-grid">
          {itineraries.map(it => (
            <div key={it._id} className="trip-card">
              <div className="trip-card-header">
                <span className="trip-icon">✈</span>
                <span className="trip-date">{formatDate(it.createdAt)}</span>
              </div>
              <h3 className="trip-title">{it.itinerary?.title || it.title}</h3>
              <div className="trip-meta">
                {it.itinerary?.destination && <span>📍 {it.itinerary.destination}</span>}
                {it.itinerary?.duration && <span>🕐 {it.itinerary.duration}</span>}
              </div>
              <div className="trip-actions">
                <Link to={`/itinerary/${it._id}`} className="btn-link">View →</Link>
                <button onClick={() => handleDelete(it._id)} className="btn-danger-sm">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
