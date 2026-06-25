import { Link } from 'react-router-dom';
import './Landing.css';

export default function Landing() {
  return (
    <div className="landing">
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">✨ AI-Powered Travel Planning</div>
          <h1 className="hero-title">
            Upload your bookings.<br />
            <span className="hero-accent">We plan your trip.</span>
          </h1>
          <p className="hero-desc">
            Drop in your flight tickets, hotel confirmations, or any travel documents — 
            Trrip extracts the details and instantly generates a personalized day-by-day itinerary.
          </p>
          <div className="hero-cta">
            <Link to="/register" className="btn btn-hero">Start for free →</Link>
            <Link to="/login" className="btn btn-hero-ghost">Sign in</Link>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-card">
            <div className="card-header">
              <span className="card-dot red" /><span className="card-dot yellow" /><span className="card-dot green" />
            </div>
            <div className="card-body">
              <div className="card-line short" />
              <div className="card-line" />
              <div className="card-line medium" />
              <div className="card-divider" />
              <div className="day-preview">
                <span className="day-badge">Day 1</span>
                <div className="activity-row"><span className="act-icon">✈</span><div><div className="card-line short" /><div className="card-line tiny" /></div></div>
                <div className="activity-row"><span className="act-icon">🏨</span><div><div className="card-line medium" /><div className="card-line tiny" /></div></div>
                <div className="activity-row"><span className="act-icon">🍜</span><div><div className="card-line short" /><div className="card-line tiny" /></div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <h2>How it works</h2>
        <div className="steps">
          {[
            { icon: '📄', title: 'Upload documents', desc: 'PDFs or images of your flight tickets, hotel bookings, train passes — anything.' },
            { icon: '🤖', title: 'AI extracts & understands', desc: 'Our AI reads your booking details and understands dates, destinations, and timings.' },
            { icon: '🗓️', title: 'Get your itinerary', desc: 'Receive a structured day-by-day itinerary instantly. Share it with your travel companions.' },
          ].map(s => (
            <div key={s.title} className="step">
              <span className="step-icon">{s.icon}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
