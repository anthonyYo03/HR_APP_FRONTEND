
import { useEffect, useState } from 'react';
import axios from 'axios';
import { MdAnnouncement, MdTask, MdRequestPage, MdReport } from 'react-icons/md';

interface Stats {
  announcements: number;
  tasks: number;
  requests: number;
  issues: number;
}

export default function HrDashboard() {
  const [stats, setStats] = useState<Stats>({ announcements: 0, tasks: 0, requests: 0, issues: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const base = process.env.REACT_APP_BACKEND_URL;
    const opts = { withCredentials: true };
    Promise.all([
      axios.get(`${base}/announcement/getAll`, opts),
      axios.get(`${base}/task/getAll`, opts),
      axios.get(`${base}/request/getAll`, opts),
      axios.get(`${base}/reportIssue/getAll`, opts),
    ])
      .then(([ann, tasks, req, issues]) => {
        setStats({
          announcements: ann.data.length,
          tasks: tasks.data.length,
          requests: req.data.length,
          issues: issues.data.length,
        });
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const cards = [
    { label: 'Announcements', value: stats.announcements, icon: <MdAnnouncement size={22} /> },
    { label: 'Tasks',         value: stats.tasks,         icon: <MdTask size={22} /> },
    { label: 'Requests',      value: stats.requests,      icon: <MdRequestPage size={22} /> },
    { label: 'Issues',        value: stats.issues,        icon: <MdReport size={22} /> },
  ];

  return (
    <div className="page-root">
      <div className="page-header">
        <h2 className="page-title">HR <span>Dashboard</span></h2>
      </div>

      {loading ? (
        <div className="state-loading"><div className="state-spinner" /></div>
      ) : (
        <div className="stat-grid">
          {cards.map((c) => (
            <div className="stat-card" key={c.label}>
              <div className="stat-card-icon">{c.icon}</div>
              <div className="stat-card-value">{c.value}</div>
              <div className="stat-card-label">{c.label}</div>
            </div>
          ))}
        </div>
      )}

      <div style={{
        background: '#111113', border: '1px solid #1e1e22', borderRadius: '12px',
        padding: '1.5rem 2rem', marginTop: '1rem',
      }}>
        <p style={{ color: '#e8c468', fontFamily: '"DM Serif Display", serif', fontSize: '1.1rem', margin: '0 0 0.5rem' }}>
          Welcome to HR Portal
        </p>
        <p style={{ color: '#9a9490', fontSize: '0.875rem', margin: 0, lineHeight: 1.6 }}>
          Manage your organisation’s announcements, tasks, leave requests, and reported issues from the sidebar.
        </p>
      </div>
    </div>
  );
}

