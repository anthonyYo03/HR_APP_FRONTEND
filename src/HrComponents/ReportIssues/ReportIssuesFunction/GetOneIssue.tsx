import EditIssueStatus from './EditIssueStatus';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { allIssues } from '../../../types/Issues';

const badge = (v: string) => {
  const m: Record<string, string> = {
    pending: 'pending', in_progress: 'in-progress', resolved: 'resolved',
    low: 'low', medium: 'medium', high: 'high',
  };
  return `badge-status badge-${m[v] || 'pending'}`;
};

const fmt = (d: string) => new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

export default function GetOneIssueHr() {
  const [issue, setIssue] = useState<allIssues | null>(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get<allIssues>(`${process.env.REACT_APP_BACKEND_URL}/reportIssue/getOne/${id}`, { withCredentials: true })
      .then((res) => setIssue(res.data))
      .catch(() => toast.error('Cannot get issue'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="state-loading"><div className="state-spinner" /></div>;
  if (!issue) return <div className="state-empty"><p>Issue not found</p></div>;

  return (
    <div className="page-root">
      <div className="page-header">
        <h2 className="page-title">{issue.title}</h2>
        <button className="btn-ghost" onClick={() => navigate('/hr/reportIssue')}> Back</button>
      </div>
      <div className="detail-card">
        <div className="detail-grid">
          <div className="detail-field">
            <span className="detail-field-label">Status</span>
            <span className={badge(issue.status)}>{issue.status.replace('_', ' ')}</span>
          </div>
          <div className="detail-field">
            <span className="detail-field-label">Priority</span>
            <span className={badge(issue.priority)}>{issue.priority}</span>
          </div>
          <div className="detail-field">
            <span className="detail-field-label">Reported By</span>
            <span className="detail-field-value">{issue.reportedBy.username}</span>
          </div>
          <div className="detail-field">
            <span className="detail-field-label">Submitted</span>
            <span className="detail-field-value">{fmt(issue.createdAt)}</span>
          </div>
          <div className="detail-field">
            <span className="detail-field-label">Last Updated</span>
            <span className="detail-field-value">{fmt(issue.updatedAt)}</span>
          </div>
          <div className="detail-field" style={{ gridColumn: '1 / -1' }}>
            <span className="detail-field-label">Description</span>
            <span className="detail-field-value" style={{ lineHeight: 1.6 }}>{issue.description}</span>
          </div>
        </div>
      </div>
      <EditIssueStatus id={issue._id} />
    </div>
  );
}
