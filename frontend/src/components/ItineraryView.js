import './ItineraryView.css';

const ICONS = { flight: '✈️', hotel: '🏨', sightseeing: '🗺️', food: '🍽️', transport: '🚌' };

export default function ItineraryView({ data }) {
  if (!data) return null;
  const { title, summary, destination, duration, travelers, days, bookingHighlights } = data;

  return (
    <div className="itinerary">
      {/* Header */}
      <div className="itin-header">
        <h1>{title}</h1>
        <div className="itin-meta">
          {destination && <span>📍 {destination}</span>}
          {duration && <span>🗓️ {duration}</span>}
          {travelers && <span>👤 {travelers}</span>}
        </div>
        {summary && <p className="itin-summary">{summary}</p>}
      </div>

      {/* Booking Highlights */}
      {bookingHighlights && (
        <div className="highlights">
          {bookingHighlights.flights?.length > 0 && (
            <div className="highlight-group">
              <h4>✈ Flights</h4>
              {bookingHighlights.flights.map((f, i) => <p key={i}>{f}</p>)}
            </div>
          )}
          {bookingHighlights.hotels?.length > 0 && (
            <div className="highlight-group">
              <h4>🏨 Hotels</h4>
              {bookingHighlights.hotels.map((h, i) => <p key={i}>{h}</p>)}
            </div>
          )}
          {bookingHighlights.transport?.length > 0 && (
            <div className="highlight-group">
              <h4>🚌 Transport</h4>
              {bookingHighlights.transport.map((t, i) => <p key={i}>{t}</p>)}
            </div>
          )}
        </div>
      )}

      {/* Day by Day */}
      <div className="days">
        {(days || []).map((day) => (
          <div key={day.day} className="day-block">
            <div className="day-label">
              <span className="day-num">Day {day.day}</span>
              {day.label && <span className="day-name">{day.label}</span>}
              {day.date && <span className="day-date">{day.date}</span>}
            </div>
            <div className="activities">
              {(day.activities || []).map((act, i) => (
                <div key={i} className="activity">
                  <div className="act-time">{act.time || ''}</div>
                  <div className="act-dot">
                    <span className="dot-icon">{ICONS[act.type] || '📌'}</span>
                  </div>
                  <div className="act-content">
                    <h4>{act.title}</h4>
                    <p>{act.description}</p>
                  </div>
                </div>
              ))}
            </div>
            {day.tips && (
              <div className="day-tip">💡 {day.tips}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
