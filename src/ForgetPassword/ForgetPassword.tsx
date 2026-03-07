import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email.trim()) { setError('Please enter your email'); return; }
    setIsLoading(true);
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/requestPasswordReset`, { email });
      toast.success('Password reset link sent to your email!');
      setEmail('');
    } catch (err: any) {
      const message = err.response?.data?.message || 'Something went wrong.';
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="reg-root">
      <div className="reg-card">
        <div className="reg-panel">
          <div className="reg-ornament" />
          <p className="reg-eyebrow">HR Portal</p>
          <h1 className="reg-heading">Reset <em>Password</em></h1>
          <p className="reg-sub">Enter your email to receive a reset link</p>
          <div className="reg-divider" />
          {error && (
            <div style={{
              background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)',
              borderRadius: '6px', padding: '0.75rem 1rem', marginBottom: '1.25rem',
              color: '#ef4444', fontSize: '0.85rem',
            }}>
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="reg-field">
              <label className="reg-label">Email Address</label>
              <input
                type="email"
                className="reg-input"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <button className="reg-btn" type="submit" disabled={isLoading}>
              {isLoading && <span className="reg-spinner" />}
              {isLoading ? 'Sending . . .' : 'Send Reset Link'}
            </button>
          </form>
          <div className="reg-footer">
            <button
              onClick={() => navigate('/login')}
              style={{
                background: 'none', border: 'none', color: '#e8c468', cursor: 'pointer',
                fontSize: '0.82rem', fontFamily: 'DM Sans, sans-serif',
              }}
            >
               Back to Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
