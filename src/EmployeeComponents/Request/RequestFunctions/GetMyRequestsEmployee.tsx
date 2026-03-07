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

export default function GetMyRequestsEmployee() {
  const [requests, setRequests] = useState<getRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get<getRequest[]>(`${process.env.REACT_APP_BACKEND_URL}/request/getmine`, { withCredentials: true })
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
      {requests.map((req) => (
        <div key={req._id} className="data-card" onClick={() => navigate(`/employee/getOneRequest/${req._id}`)}>          <div className="data-card-header">
            <h3 className="data-card-title">{req.leave_type} Leave</h3>
            <div style={{ display: 'flex', gap: '0.4rem', flexShrink: 0 }}>
              <span className={badge(req.leave_type)}>{req.leave_type}</span>
              <span className={badge(req.status)}>{req.status}</span>
            </div>
          </div>
          <div className="data-card-meta-row">
            <span className="data-card-meta"><span className="data-card-label">From</span>{fmt(req.start_date)}</span>
            <span className="data-card-meta"><span className="data-card-label">To</span>{fmt(req.end_date)}</span>
            <span className="data-card-meta"><span className="data-card-label">Submitted</span>{fmt(req.createdAt)}</span>
          </div>
        </div>
      ))}
    </>
  );
}
