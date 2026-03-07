import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import type { UserLogin } from '../types/user';
import toast from 'react-hot-toast';
import axios from 'axios';

export default function Login() {
  const navigate = useNavigate();
  const [login, setLogin] = useState<UserLogin>({ username: '', password: '' });
  const [loading, setLoading] = useState(false);

  const loginUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!login.username.trim() || !login.password.trim()) {
      toast.error('Please fill username and password fields');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/user/login`,
        login,
        { withCredentials: true }
      );
      toast.success('Logged in successfully');
      const role = response.data.role;
      if (role === 'Employee') setTimeout(() => navigate('/employee'), 1000);
      else if (role === 'HR') setTimeout(() => navigate('/hr'), 1000);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Failed to log in');
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
          <h1 className="reg-heading">Welcome <em>back</em></h1>
          <p className="reg-sub">Sign in to your account to continue</p>
          <div className="reg-divider" />
          <form onSubmit={loginUser}>
            <div className="reg-field">
              <label className="reg-label">Username</label>
              <input
                type="text"
                className="reg-input"
                placeholder="Enter your username"
                value={login.username}
                onChange={(e) => setLogin({ ...login, username: e.target.value })}
                disabled={loading}
              />
            </div>
            <div className="reg-field">
              <label className="reg-label">Password</label>
              <input
                type="password"
                className="reg-input"
                placeholder="Enter your password"
                value={login.password}
                onChange={(e) => setLogin({ ...login, password: e.target.value })}
                disabled={loading}
              />
            </div>
            <button className="reg-btn" type="submit" disabled={loading}>
              {loading && <span className="reg-spinner" />}
              {loading ? 'Signing inâ€¦' : 'Sign In'}
            </button>
          </form>
          <div className="reg-footer" style={{ marginTop: '0.75rem' }}>
            <Link to="/forgot-password">Forgot your password?</Link>
          </div>
          <div className="reg-footer">
            Donâ€™t have an account? <Link to="/">Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
