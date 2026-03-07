import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { getRequest } from '../../../types/request';
import { MdRequestPage } from 'react-icons/md';

const badge = (v: string) => {
  const m: Record<string, string> = {
    Pending: 'pending', Approved: 'approved', Rejected: 'rejected',
    Sick: 'Sick', Vacation: 'Vacation', Casual: 'Casual',
  };
  return `badge-status badge-${m[v] || 'pending'}`;
};

const fmt = (d: string) => new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

export default function GetAllRequestsHR() {
  const [requests, setRequests] = useState<getRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get<getRequest[]>(`${process.env.REACT_APP_BACKEND_URL}/request/getAll`, { withCredentials: true })
      .then((res) => setRequests(res.data))
      .catch(() => toast.error('Cannot get requests'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="state-loading"><div className="state-spinner" /></div>;

  if (requests.length === 0)
    return (
      <div className="state-empty">
        <div className="state-empty-icon"><MdRequestPage /></div>
        <p>No leave requests yet</p>
      </div>
    );

  return (
    <>
      {requests.map((r) => (
        <div key={r._id} className="data-card" onClick={() => navigate(`/hr/getOneRequest/${r._id}`)}>
          <div className="data-card-header">
            <h3 className="data-card-title">{r.reportedBy?.username}</h3>
            <div style={{ display: 'flex', gap: '0.4rem', flexShrink: 0 }}>
              <span className={badge(r.leave_type)}>{r.leave_type}</span>
              <span className={badge(r.status)}>{r.status}</span>
            </div>
          </div>
          <p className="data-card-meta" style={{ color: '#9a9490', margin: '0 0 0.5rem', fontSize: '0.825rem' }}>
            {r.reason.length > 100 ? r.reason.slice(0, 100) : r.reason}
          </p>
          <div className="data-card-meta-row">
            <span className="data-card-meta">
              <span className="data-card-label">From</span>{fmt(r.start_date)}
            </span>
            <span className="data-card-meta">
              <span className="data-card-label">To</span>{fmt(r.end_date)}
            </span>
            <span className="data-card-meta">
              <span className="data-card-label">Submitted</span>{fmt(r.createdAt)}
            </span>
          </div>
        </div>
      ))}
    </>
  );
}
