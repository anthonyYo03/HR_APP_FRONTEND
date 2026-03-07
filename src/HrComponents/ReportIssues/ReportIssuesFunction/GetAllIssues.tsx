import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { allIssues } from '../../../types/Issues';
import { useNavigate } from 'react-router-dom';
import { MdReport } from 'react-icons/md';

const badge = (v: string) => {
  const m: Record<string, string> = {
    pending: 'pending', in_progress: 'in-progress', resolved: 'resolved',
    low: 'low', medium: 'medium', high: 'high',
  };
  return `badge-status badge-${m[v] || 'pending'}`;
};

const fmt = (d: string) => new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

export default function GetAllIssues() {
  const [issues, setAllIssues] = useState<allIssues[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get<allIssues[]>(`${process.env.REACT_APP_BACKEND_URL}/reportIssue/getAll`, { withCredentials: true })
      .then((res) => setAllIssues(res.data))
      .catch(() => toast.error('Cannot get issues'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="state-loading"><div className="state-spinner" /></div>;

  if (issues.length === 0)
    return (
      <div className="state-empty">
        <div className="state-empty-icon"><MdReport /></div>
        <p>No issues reported</p>
      </div>
    );

  return (
    <>
      {issues.map((issue) => (
        <div key={issue._id} className="data-card" onClick={() => navigate(`/hr/oneIssue/${issue._id}`)}>
          <div className="data-card-header">
            <h3 className="data-card-title">{issue.title}</h3>
            <div style={{ display: 'flex', gap: '0.4rem', flexShrink: 0 }}>
              <span className={badge(issue.priority)}>{issue.priority}</span>
              <span className={badge(issue.status)}>{issue.status.replace('_', ' ')}</span>
            </div>
          </div>
          <p className="data-card-meta" style={{ color: '#9a9490', margin: '0 0 0.5rem', fontSize: '0.825rem' }}>
            {issue.description.length > 100 ? issue.description.slice(0, 100) + 'â€¦' : issue.description}
          </p>
          <div className="data-card-meta-row">
            <span className="data-card-meta">
              <span className="data-card-label">Reported by</span>{issue.reportedBy?.username ||'Pending'}
            </span>
            <span className="data-card-meta">
              <span className="data-card-label">Submitted</span>{fmt(issue.createdAt)}
            </span>
          </div>
        </div>
      ))}
    </>
  );
}
