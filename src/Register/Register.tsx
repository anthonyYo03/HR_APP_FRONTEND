import toast from 'react-hot-toast';
import { UserRegister } from '../types/user';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const [register, setRegister] = useState<UserRegister>({ email: '', username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!register.email.trim() || !register.username.trim() || !register.password.trim()) {
      toast.error('Please fill all fields');
      return;
    }
    setLoading(true);
    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/user/register`,
        register,
        { withCredentials: true }
      );
      toast.success('Registered successfully');
      setTimeout(() => navigate('/otp', { state: { email: register.email } }), 1000);
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
              <input
                type="password"
                className="reg-input"
                placeholder="Create a strong password"
                value={register.password}
                onChange={(e) => setRegister({ ...register, password: e.target.value })}
                disabled={loading}
              />
            </div>
            <button className="reg-btn" type="submit" disabled={loading}>
              {loading && <span className="reg-spinner" />}
              {loading ? 'Registering ...' : 'Create Account'}
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
