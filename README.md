# ✈️ Trrip – AI-Powered Travel Itinerary Generator

> Built as part of the Junior Full Stack Developer (MERN + AI) assignment for **Team Trrip**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20App-blue?style=for-the-badge)](https://ai-tripp-planner.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github)](https://github.com/Ashish83059/Tripp)

---

## 🌐 Live Links

| | Link |
|---|---|
| 🚀 **Frontend (Vercel)** | https://ai-tripp-planner.vercel.app/ |
| 🔧 **Backend API (Render)** | https://tripp-0zar.onrender.com/api/health |
| 📁 **GitHub Repository** | https://github.com/Ashish83059/Tripp |

---

## 📌 What is Trrip?

Trrip is a MERN-based web application where users upload their travel booking documents (flight tickets, hotel confirmations, train passes — PDF or image) and the app automatically extracts the information and generates a structured, day-by-day AI-powered travel itinerary.

---

## ✅ Assignment Requirements Coverage

| Requirement | Status |
|---|---|
| JWT Authentication (Login / Register) | ✅ Implemented |
| Travel document upload (PDF + Images) | ✅ Implemented |
| Text extraction from PDFs | ✅ pdf-parse |
| Text extraction from Images (OCR) | ✅ Tesseract.js |
| AI Itinerary Generation | ✅ Google Gemini AI |
| Store itineraries in MongoDB | ✅ Implemented |
| View history of itineraries | ✅ Dashboard page |
| Shareable itinerary links | ✅ Public share token |
| Responsive React frontend | ✅ Mobile-friendly UI |
| Node.js + Express backend | ✅ Implemented |
| MongoDB integration | ✅ MongoDB Atlas |
| Drag-and-drop upload (Bonus) | ✅ react-dropzone |
| AWS S3 integration (Bonus) | ✅ Configurable via env |
| Animated upload progress (Bonus) | ✅ Step-by-step UI |

---

## 🛠️ Tech Stack

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express.js | REST API server |
| MongoDB + Mongoose | Database & ODM |
| JSON Web Tokens (JWT) | Authentication |
| Multer | File upload handling |
| pdf-parse | Extract text from PDFs |
| Tesseract.js | OCR for image documents |
| Google Gemini AI | Itinerary generation |
| AWS S3 + multer-s3 | Cloud file storage (optional) |
| uuid | Unique share tokens |
| bcryptjs | Password hashing |

### Frontend
| Technology | Purpose |
|---|---|
| React.js | UI framework |
| React Router v6 | Client-side routing |
| Axios | HTTP client |
| react-dropzone | Drag-and-drop uploads |
| Context API | Global auth state |
| CSS3 | Custom responsive styling |

### DevOps & Deployment
| Service | Purpose |
|---|---|
| Vercel | Frontend hosting |
| Render | Backend hosting |
| MongoDB Atlas | Cloud database |
| GitHub | Version control |

---

## 🗂️ Project Structure

```
Tripp/
├── backend/
│   ├── config/
│   │   └── db.js                  # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js      # Register, Login, GetMe
│   │   └── itineraryController.js # Upload, GetAll, GetOne, Share, Delete
│   ├── middleware/
│   │   └── auth.js                # JWT protect middleware
│   ├── models/
│   │   ├── User.js                # User schema (bcrypt password)
│   │   └── Itinerary.js           # Itinerary schema with shareToken
│   ├── routes/
│   │   ├── auth.js                # /api/auth routes
│   │   └── itineraries.js         # /api/itineraries routes
│   ├── utils/
│   │   ├── aiService.js           # Gemini AI itinerary generation
│   │   ├── extractor.js           # PDF + OCR text extraction
│   │   └── storage.js             # Local + S3 file storage
│   ├── .env.example
│   ├── package.json
│   └── server.js                  # Entry point
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.js           # Top navigation
    │   │   └── ItineraryView.js    # Day-by-day itinerary renderer
    │   ├── context/
    │   │   └── AuthContext.js      # Global auth state + login/logout
    │   ├── pages/
    │   │   ├── Landing.js          # Home / marketing page
    │   │   ├── Login.js            # Login form
    │   │   ├── Register.js         # Register form
    │   │   ├── Dashboard.js        # User's itinerary history
    │   │   ├── Upload.js           # Document upload + progress
    │   │   ├── ItineraryDetail.js  # View + share itinerary
    │   │   └── SharedItinerary.js  # Public share page
    │   ├── utils/
    │   │   └── api.js              # Axios instance with base URL
    │   ├── App.js                  # Routes + private route guard
    │   └── index.js
    ├── vercel.json                 # SPA routing fix for Vercel
    └── package.json
```

---

## 🔌 API Endpoints

### Auth Routes — `/api/auth`
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | ❌ | Register new user |
| POST | `/api/auth/login` | ❌ | Login and get JWT token |
| GET | `/api/auth/me` | ✅ | Get logged-in user info |

### Itinerary Routes — `/api/itineraries`
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/itineraries/upload` | ✅ | Upload document → extract → generate itinerary |
| GET | `/api/itineraries` | ✅ | Get all itineraries for logged-in user |
| GET | `/api/itineraries/:id` | ✅ | Get single itinerary by ID |
| DELETE | `/api/itineraries/:id` | ✅ | Delete itinerary |
| GET | `/api/itineraries/shared/:token` | ❌ | View shared itinerary (public) |

---

## 🗄️ Database Schema

### User
```js
{
  name: String,         // required
  email: String,        // required, unique, lowercase
  password: String,     // bcrypt hashed
  timestamps: true
}
```

### Itinerary
```js
{
  user: ObjectId,        // ref: User
  title: String,         // trip title from AI
  uploadedFileUrl: String, // local or S3 URL
  extractedText: String,   // raw text from document
  itinerary: Object,       // full AI-generated structure
  shareToken: String,      // unique UUID for public sharing
  timestamps: true
}
```

---

## ⚙️ Local Setup

### Prerequisites
- Node.js v18+
- MongoDB (local) or MongoDB Atlas account
- Google Gemini API key → https://aistudio.google.com/app/apikey

### 1. Clone the repository
```bash
git clone https://github.com/Ashish83059/Tripp.git
cd Tripp
```

### 2. Backend setup
```bash
cd backend
npm install
cp .env.example .env
# Fill in your values in .env
npm run dev
```

### 3. Frontend setup
```bash
cd frontend
npm install
npm start
```

### 4. Environment Variables

**backend/.env**
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/trrip
JWT_SECRET=your_jwt_secret_here
GEMINI_API_KEY=your_gemini_api_key_here
STORAGE_TYPE=local

# Optional AWS S3
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=us-east-1
AWS_BUCKET_NAME=trrip-uploads
```

**frontend/.env** (for production)
```env
REACT_APP_API_URL=https://your-backend.onrender.com/api
```

---

## 🚀 Deployment

### Frontend → Vercel
1. Connect GitHub repo to Vercel
2. Set root directory to `frontend`
3. Add environment variable: `REACT_APP_API_URL=https://your-backend.onrender.com/api`
4. `vercel.json` handles SPA routing automatically

### Backend → Render
1. Connect GitHub repo to Render
2. Set root directory to `backend`
3. Start command: `node server.js`
4. Add all environment variables in Render dashboard

### Database → MongoDB Atlas
1. Create free cluster at https://mongodb.com/atlas
2. Whitelist `0.0.0.0/0` for Render access
3. Copy connection string to `MONGO_URI`

---

## 🔄 How It Works

```
User uploads PDF/Image
        ↓
Multer saves file (local or S3)
        ↓
pdf-parse (PDF) or Tesseract.js (Image) extracts text
        ↓
Extracted text sent to Google Gemini AI
        ↓
Gemini returns structured JSON itinerary
        ↓
Itinerary saved to MongoDB with unique shareToken
        ↓
User sees day-by-day itinerary with share link
```

---

## ✨ Key Features

- **Drag & Drop Upload** — intuitive file upload with visual feedback
- **Animated Progress** — 3-step progress indicator during processing
- **AI Itinerary** — structured day-by-day plan with times, activities, tips
- **Trip History** — all generated itineraries saved and accessible
- **Public Sharing** — unique link for each itinerary, no login required to view
- **AWS S3 Ready** — switch from local to S3 storage with one env variable
- **Responsive Design** — works on mobile, tablet, and desktop

---

## 👨‍💻 Developer

**Ashish** — Junior Full Stack Developer  
GitHub: [@Ashish83059](https://github.com/Ashish83059)

---

*Assignment submission for Junior Full Stack Developer (MERN + AI) role at Team Trrip*
