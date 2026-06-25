import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../utils/api';
import ItineraryView from '../components/ItineraryView';
import './ItineraryDetail.css';

export default function SharedItinerary() {
  const { token } = useParams();
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/itineraries/shared/${token}`).then(res => setItinerary(res.data.itinerary)).finally(() => setLoading(false));
  }, [token]);

  if (loading) return <div className="loading-screen"><div className="spinner" /></div>;
  if (!itinerary) return <div className="not-found">This itinerary is not available.</div>;

  return (
    <div className="detail-page">
      <div className="detail-header">
        <div className="shared-badge">🌐 Shared Itinerary</div>
        <Link to="/register" className="share-btn" style={{ textDecoration: 'none' }}>Create your own →</Link>
      </div>
      <ItineraryView data={itinerary.itinerary} />
    </div>
  );
}
