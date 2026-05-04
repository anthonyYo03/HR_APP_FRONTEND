import toast from 'react-hot-toast';
import { UserRegister } from '../types/user';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { checkPasswordStrength } from '../utils/Password';

export default function Register() {
  const [register, setRegister] = useState<UserRegister>({ email: '', username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [strength, setStrength] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pwd = e.target.value;
    setRegister({ ...register, password: pwd });
    setStrength(checkPasswordStrength(pwd).value);
  };

  const strengthColor: Record<string, string> = {
    Weak: '#ef4444', Fair: '#e8c468', Strong: '#22c55e',
  };

  const eyeBtnStyle: React.CSSProperties = {
    background: 'none', border: 'none', color: '#7a7670', cursor: 'pointer',
    fontSize: '0.78rem', fontFamily: 'DM Sans, sans-serif', padding: '0 0.25rem',
    position: 'absolute', right: '0.9rem', top: '50%', transform: 'translateY(-50%)',
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!register.email.trim() || !register.username.trim() || !register.password.trim()) {
      toast.error('Please fill all fields');
      return;
    }
    const result = checkPasswordStrength(register.password);
    if (result.value !== 'Strong') {
      toast.error('Password must be strong');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/user/register`,
        register,
        { withCredentials: true }
      );
      toast.success('Registered successfully');
      setTimeout(() => navigate('/otp', { state: { email: register.email, otp: response.data.otp } }), 1000);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Cannot register user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reg-root">
      <div className="reg-card">
        <div className="reg-panel">
          <div className="reg-ornament" />
          <p className="reg-eyebrow">HR Portal</p>
          <h1 className="reg-heading">Create <em>Account</em></h1>
          <p className="reg-sub">Join your organisation's HR platform</p>
          <div className="reg-divider" />
          <form onSubmit={handleSubmit}>
            <div className="reg-field">
              <label className="reg-label">Email Address</label>
              <input
                type="email"
                className="reg-input"
                placeholder="Enter your email"
                value={register.email}
                onChange={(e) => setRegister({ ...register, email: e.target.value })}
                disabled={loading}
              />
            </div>
            <div className="reg-field">
              <label className="reg-label">Username</label>
              <input
                type="text"
                className="reg-input"
                placeholder="Choose a username"
                value={register.username}
                onChange={(e) => setRegister({ ...register, username: e.target.value })}
                disabled={loading}
              />
            </div>
            <div className="reg-field">
              <label className="reg-label">Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="reg-input"
                  placeholder="Create a strong password"
                  value={register.password}
                  onChange={handlePasswordChange}
                  disabled={loading}
                  style={{ paddingRight: '3.5rem' }}
                />
                <button type="button" style={eyeBtnStyle} onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              {register.password && (
                <p style={{ fontSize: '0.78rem', margin: '0.4rem 0 0', color: strengthColor[strength] || '#9a9490' }}>
                  Strength: <strong>{strength}</strong>
                </p>
              )}
            </div>
            <button className="reg-btn" type="submit" disabled={loading}>
              {loading && <span className="reg-spinner" />}
              {loading ? 'Registering . . .' : 'Create Account'}
            </button>
          </form>
          <div className="reg-footer">
            Already have an account? <Link to="/login">Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  );
}