import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import './Upload.css';

const STEPS = ['Upload document', 'Extracting text', 'Generating itinerary'];

export default function Upload() {
  const [file, setFile] = useState(null);
  const [step, setStep] = useState(-1);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onDrop = useCallback(accepted => {
    if (accepted[0]) { setFile(accepted[0]); setError(''); }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': [], 'image/jpeg': [], 'image/png': [], 'image/webp': [] },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024,
    onDropRejected: () => setError('Invalid file. Upload a PDF, JPG, or PNG under 10MB.'),
  });

  const handleUpload = async () => {
    if (!file) return;
    setError(''); setStep(0);
    const form = new FormData();
    form.append('document', file);
    try {
      setStep(1);
      const { data } = await api.post('/itineraries/upload', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: () => setStep(1),
      });
      setStep(2);
      setTimeout(() => navigate(`/itinerary/${data.itinerary._id}`), 600);
    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed. Please try again.');
      setStep(-1);
    }
  };

  return (
    <div className="upload-page">
      <div className="upload-card">
        <h2>Upload Travel Document</h2>
        <p className="upload-sub">Upload a flight ticket, hotel booking, or any travel document to generate your itinerary.</p>

        {step >= 0 ? (
          <div className="progress-steps">
            {STEPS.map((s, i) => (
              <div key={s} className={`progress-step ${i < step ? 'done' : i === step ? 'active' : ''}`}>
                <div className="step-circle">{i < step ? '✓' : i + 1}</div>
                <span>{s}</span>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div {...getRootProps()} className={`dropzone ${isDragActive ? 'drag-active' : ''} ${file ? 'has-file' : ''}`}>
              <input {...getInputProps()} />
              {file ? (
                <div className="file-preview">
                  <span className="file-icon">{file.type === 'application/pdf' ? '📄' : '🖼️'}</span>
                  <p className="file-name">{file.name}</p>
                  <p className="file-size">{(file.size / 1024).toFixed(1)} KB</p>
                  <button className="remove-file" onClick={e => { e.stopPropagation(); setFile(null); }}>✕ Remove</button>
                </div>
              ) : (
                <div className="drop-placeholder">
                  <span className="drop-icon">☁️</span>
                  <p><strong>Drag & drop</strong> your file here</p>
                  <p className="drop-hint">or click to browse · PDF, JPG, PNG · Max 10MB</p>
                </div>
              )}
            </div>

            {error && <div className="error-msg">{error}</div>}

            <button className="btn-full" onClick={handleUpload} disabled={!file}>
              Generate Itinerary →
            </button>
          </>
        )}
      </div>
    </div>
  );
}
