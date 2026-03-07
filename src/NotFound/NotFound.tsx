import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="reg-root">
      <div className="reg-card" style={{ textAlign: 'center' }}>
        <div className="reg-panel">
          <div className="reg-ornament" />
          <h1 className="reg-heading" style={{ fontSize: '4.5rem', marginBottom: '0.25rem' }}>
            <em>404</em>
          </h1>
          <p className="reg-eyebrow" style={{ marginTop: '0.5rem' }}>Page Not Found</p>
          <p className="reg-sub" style={{ marginBottom: '2.5rem' }}>
            The page you’re looking for doesn’t exist or has been moved.
          </p>
          <button className="reg-btn" onClick={() => navigate(-1)} style={{ margin: '0 auto' }}>
            ← Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

