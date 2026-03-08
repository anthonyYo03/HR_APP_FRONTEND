import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { getRequest } from '../../../types/request';
import DeleteRequestEmployee from './DeleteRequestEmployee';

const badge = (v: string) => {
  const m: Record<string, string> = {
    Pending: 'pending', Approved: 'approved', Rejected: 'rejected',
    Sick: 'Sick', Vacation: 'Vacation', Casual: 'Casual',
  };
  return `badge-status badge-${m[v] || 'pending'}`;
};

const fmt = (d?: string) =>
  d ? new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'â€”';

export default function GetOneRequestEmployee() {
  const [request, setOneRequest] = useState<getRequest | null>(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get<getRequest>(`${process.env.REACT_APP_BACKEND_URL}/request/getOne/${id}`, { withCredentials: true })
      .then((res) => setOneRequest(res.data))
      .catch(() => toast.error('Cannot get request'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="state-loading"><div className="state-spinner" /></div>;
  if (!request) return <div className="state-empty"><p>Request not found</p></div>;

  return (
    <div className="page-root">
      <div className="page-header">
        <h2 className="page-title">{request.leave_type} Leave Request</h2>
        <button className="btn-ghost" onClick={() => navigate('/employee/request')}> Back</button>
      </div>
      <div className="detail-card">
        <div className="detail-grid">
          <div className="detail-field">
            <span className="detail-field-label">Leave Type</span>
            <span className={badge(request.leave_type)}>{request.leave_type}</span>
          </div>
          <div className="detail-field">
            <span className="detail-field-label">Status</span>
            <span className={badge(request.status)}>{request.status}</span>
          </div>
          <div className="detail-field">
            <span className="detail-field-label">Start Date</span>
            <span className="detail-field-value">{fmt(request.start_date)}</span>
          </div>
          <div className="detail-field">
            <span className="detail-field-label">End Date</span>
            <span className="detail-field-value">{fmt(request.end_date)}</span>
          </div>
          <div className="detail-field">
            <span className="detail-field-label">Approved By</span>
            <span className="detail-field-value">{request.approvedBy?.username || 'Pending'}</span>
          </div>
          <div className="detail-field">
            <span className="detail-field-label">Approved Date</span>
            <span className="detail-field-value">{request.approvedDate ? fmt(request.approvedDate) : 'Awaiting approval'}</span>
          </div>
          <div className="detail-field">
            <span className="detail-field-label">Submitted</span>
            <span className="detail-field-value">{fmt(request.createdAt)}</span>
          </div>
          <div className="detail-field" style={{ gridColumn: '1 / -1' }}>
            <span className="detail-field-label">Reason</span>
            <span className="detail-field-value" style={{ lineHeight: 1.6 }}>{request.reason}</span>
          </div>
        </div>
        <div className="detail-actions">
          <DeleteRequestEmployee id={request._id} />
        </div>
      </div>
    </div>
  );
}
