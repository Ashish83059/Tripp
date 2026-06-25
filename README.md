# Trrip – AI Travel Itinerary Generator

A MERN + AI web application where users upload travel booking documents (PDFs/images) and automatically receive a structured, day-by-day travel itinerary.

## Features

- **JWT Authentication** – Register/Login with secure token-based auth
- **Document Upload** – Drag-and-drop PDFs or images (flight tickets, hotel bookings, etc.)
- **AI Text Extraction** – Extracts text from PDFs (pdf-parse) and images (Tesseract.js OCR)
- **AI Itinerary Generation** – Uses Google Gemini to generate structured day-by-day itineraries
- **History** – All itineraries saved in MongoDB, accessible anytime
- **Sharing** – Each itinerary gets a unique public share link (no login required to view)
- **AWS S3 Support** – Optional S3 integration for file storage (falls back to local)
- **Responsive UI** – Clean, mobile-friendly React frontend

## Tech Stack

**Backend:** Node.js, Express.js, MongoDB (Mongoose), JWT, Multer, pdf-parse, Tesseract.js, Google Gemini AI  
**Frontend:** React.js, React Router, Axios, react-dropzone  
**Optional:** AWS S3 (multer-s3)

## Project Structure

```
trrip-app/
├── backend/
│   ├── config/         # DB connection
│   ├── controllers/    # Auth & Itinerary logic
│   ├── middleware/     # JWT auth middleware
│   ├── models/         # User & Itinerary schemas
│   ├── routes/         # Express routes
│   ├── utils/          # storage, extractor, aiService
│   └── server.js
└── frontend/
    └── src/
        ├── components/ # Navbar, ItineraryView
        ├── context/    # AuthContext
        ├── pages/      # Landing, Login, Register, Dashboard, Upload, Detail, Shared
        └── utils/      # axios instance
```

## Setup & Installation

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)
- Google Gemini API key (free at https://aistudio.google.com)

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your values
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

### Environment Variables (backend/.env)

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/trrip
JWT_SECRET=your_secret_here

GEMINI_API_KEY=your_gemini_key_here

# Optional S3 (set STORAGE_TYPE=s3 to enable)
STORAGE_TYPE=local
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=us-east-1
AWS_BUCKET_NAME=trrip-uploads
```

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/auth/register | No | Register user |
| POST | /api/auth/login | No | Login user |
| GET | /api/auth/me | Yes | Get current user |
| POST | /api/itineraries/upload | Yes | Upload & generate itinerary |
| GET | /api/itineraries | Yes | Get user's itineraries |
| GET | /api/itineraries/:id | Yes | Get single itinerary |
| DELETE | /api/itineraries/:id | Yes | Delete itinerary |
| GET | /api/itineraries/shared/:token | No | View shared itinerary |

## Deployment

**Backend:** Deploy to Render, Railway, or AWS EC2  
**Frontend:** Deploy to Vercel or Netlify (set `REACT_APP_API_URL` for production)  
**Database:** Use MongoDB Atlas for cloud DB

## Bonus Features Implemented

- ✅ Drag-and-drop file upload (react-dropzone)
- ✅ AWS S3 integration (configurable via env)
- ✅ Shareable itinerary links (public, no auth needed)
- ✅ Animated upload progress steps
- ✅ Clean, responsive UI with travel-themed design
