import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { checkPasswordStrength } from '../utils/Password';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [strength, setStrength] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const token = searchParams.get('token');

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pwd = e.target.value;
    setPassword(pwd);
    setStrength(checkPasswordStrength(pwd).value);
  };

  const strengthColor: Record<string, string> = {
    Weak: '#ef4444', Fair: '#e8c468', Strong: '#22c55e',
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!password.trim() || !confirmPassword.trim()) { setError('Please fill in all fields'); return; }
    if (password !== confirmPassword) { setError('Passwords do not match'); return; }
    if (!id || !token) { setError('Invalid or expired reset link'); return; }
    const result = checkPasswordStrength(password);
    if (result.value !== 'Strong') { toast.error('Password must be strong'); return; }
    setIsLoading(true);
    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/user/resetPassword?id=${id}&token=${token}`,
        { password }
      );
      toast.success('Password reset successfully!');
      setPassword('');
      setConfirmPassword('');
      setTimeout(() => navigate('/login'), 1000);
    } catch (err: any) {
      const message = err.response?.data?.message || 'Something went wrong';
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const eyeBtnStyle: React.CSSProperties = {
    background: 'none', border: 'none', color: '#7a7670', cursor: 'pointer',
    fontSize: '0.78rem', fontFamily: 'DM Sans, sans-serif', padding: '0 0.25rem',
    position: 'absolute', right: '0.9rem', top: '50%', transform: 'translateY(-50%)',
  };

  return (
    <div className="reg-root">
      <div className="reg-card">
        <div className="reg-panel">
          <div className="reg-ornament" />
          <p className="reg-eyebrow">HR Portal</p>
          <h1 className="reg-heading">New <em>Password</em></h1>
          <p className="reg-sub">Enter a strong new password below</p>
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
              <label className="reg-label">New Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="reg-input"
                  placeholder="Enter new password"
                  value={password}
                  onChange={handlePasswordChange}
                  disabled={isLoading}
                  style={{ paddingRight: '3.5rem' }}
                />
                <button type="button" style={eyeBtnStyle} onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              {password && (
                <p style={{ fontSize: '0.78rem', margin: '0.4rem 0 0', color: strengthColor[strength] || '#9a9490' }}>
                  Strength: <strong>{strength}</strong>
                </p>
              )}
            </div>
            <div className="reg-field">
              <label className="reg-label">Confirm Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showConfirm ? 'text' : 'password'}
                  className="reg-input"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={isLoading}
                  style={{ paddingRight: '3.5rem' }}
                />
                <button type="button" style={eyeBtnStyle} onClick={() => setShowConfirm(!showConfirm)}>
                  {showConfirm ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>
            <button className="reg-btn" type="submit" disabled={isLoading}>
              {isLoading && <span className="reg-spinner" />}
              {isLoading ? 'Resetting ...' : 'Reset Password'}
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
