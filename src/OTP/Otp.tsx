import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserOTP } from '../types/user';
import toast from 'react-hot-toast';
import axios from 'axios';

export default function Otp() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [otp, setOtp] = useState<UserOTP>({ email: location.state?.email || '', otp: '' });

  const submitOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp.otp.trim()) { toast.error('Please enter the OTP'); return; }
    setLoading(true);
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/verify-otp`, otp, { withCredentials: true });
      toast.success('OTP verified successfully');
      setTimeout(() => navigate('/login'), 1500);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  const resendOTP = async () => {
    setResendLoading(true);
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/resendOTP`, otp, { withCredentials: true });
      toast.success('OTP resent successfully');
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Could not resend OTP');
    } finally {
      setResendLoading(false);
    }
  };

  const linkStyle: React.CSSProperties = {
    background: 'none', border: 'none', color: '#e8c468', cursor: 'pointer',
    fontSize: '0.82rem', fontFamily: 'DM Sans, sans-serif', padding: 0,
  };

  return (
    <div className="reg-root">
      <div className="reg-card">
        <div className="reg-panel">
          <div className="reg-ornament" />
          <p className="reg-eyebrow">HR Portal</p>
          <h1 className="reg-heading">Verify <em>Email</em></h1>
          <p className="reg-sub">
            {otp.email ? `We sent a code to ${otp.email}` : 'Enter the code sent to your email'}
          </p>
          <div className="reg-divider" />
          <form onSubmit={submitOTP}>
            <div className="reg-field">
              <label className="reg-label">One-Time Password</label>
              <input
                type="text"
                className="reg-input"
                placeholder="Enter 6-digit code"
                value={otp.otp}
                onChange={(e) => setOtp({ ...otp, otp: e.target.value })}
                disabled={loading}
              />
            </div>
            <button className="reg-btn" type="submit" disabled={loading}>
              {loading && <span className="reg-spinner" />}
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
          </form>
          <div className="reg-footer" style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '1rem' }}>
            <button onClick={resendOTP} disabled={resendLoading} style={linkStyle}>
              {resendLoading ? 'Resending...' : 'Resend OTP'}
            </button>
            <button onClick={() => navigate('/')} style={{ ...linkStyle, color: '#4a4845' }}>
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
