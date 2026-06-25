import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../utils/api';
import ItineraryView from '../components/ItineraryView';
import './ItineraryDetail.css';

export default function ItineraryDetail() {
  const { id } = useParams();
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    api.get(`/itineraries/${id}`).then(res => setItinerary(res.data.itinerary)).finally(() => setLoading(false));
  }, [id]);

  const handleShare = () => {
    const url = `${window.location.origin}/shared/${itinerary.shareToken}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (loading) return <div className="loading-screen"><div className="spinner" /></div>;
  if (!itinerary) return <div className="not-found">Itinerary not found</div>;

  return (
    <div className="detail-page">
      <div className="detail-header">
        <Link to="/dashboard" className="back-link">← My Trips</Link>
        <button onClick={handleShare} className={`share-btn ${copied ? 'copied' : ''}`}>
          {copied ? '✓ Link Copied!' : '🔗 Share'}
        </button>
      </div>
      <ItineraryView data={itinerary.itinerary} />
    </div>
  );
}
