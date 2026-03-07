import React, { useState } from 'react';
import { updateStatus } from '../../../types/Issues';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

interface Props { id: string; }

export default function EditIssueStatus({ id }: Props) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<updateStatus>({ status: 'pending' });
  const navigate = useNavigate();

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(`${process.env.REACT_APP_BACKEND_URL}/reportIssue/edit/${id}`, status, { withCredentials: true });
      toast.success('Issue status updated');
      navigate('/hr/reportIssue');
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Failed to update status');
    } finally {
      setLoading(false);
    }
  };

  const options: { label: string; value: updateStatus['status'] }[] = [
    { label: 'Pending', value: 'pending' },
    { label: 'In Progress', value: 'in_progress' },
    { label: 'Resolved', value: 'resolved' },
  ];

  return (
    <form onSubmit={handleUpdate}>
      <div className="form-field">
        <label className="form-lbl">Update Status</label>
        <div className="form-radio-group">
          {options.map((opt) => (
            <React.Fragment key={opt.value}>
              <input
                type="radio" className="form-radio-hidden"
                id={`is-${opt.value}`} name="issueStatus" value={opt.value}
                checked={status.status === opt.value}
                onChange={() => setStatus({ status: opt.value })}
              />
              <label className="form-radio-label" htmlFor={`is-${opt.value}`}>{opt.label}</label>
            </React.Fragment>
          ))}
        </div>
      </div>
      <button type="submit" className="btn-gold" disabled={loading}>
        {loading && <span className="btn-spinner" />}
        {loading ? 'Updating…' : 'Update Status'}
      </button>
    </form>
  );
}
