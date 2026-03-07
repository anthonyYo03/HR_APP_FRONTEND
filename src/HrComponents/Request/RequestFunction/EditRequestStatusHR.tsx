import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { updatedRequestStatus } from '../../../types/request';

interface Props { id: string; }

export default function EditRequestStatusHR({ id }: Props) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<updatedRequestStatus>({ status: 'Pending' });
  const navigate = useNavigate();

  const updateStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/request/hredit/${id}`,
        status,
        { withCredentials: true }
      );
      toast.success('Request status updated');
      navigate('/hr/request');
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Failed to update status');
    } finally {
      setLoading(false);
    }
  };

  const options: updatedRequestStatus['status'][] = ['Pending', 'Approved', 'Rejected'];

  return (
    <form onSubmit={updateStatus}>
      <div className="form-field">
        <label className="form-lbl">Update Status</label>
        <div className="form-radio-group">
          {options.map((opt) => (
            <React.Fragment key={opt}>
              <input
                type="radio" className="form-radio-hidden"
                id={`rs-${opt}`} name="reqStatus" value={opt}
                checked={status.status === opt}
                onChange={() => setStatus({ status: opt })}
              />
              <label className="form-radio-label" htmlFor={`rs-${opt}`}>{opt}</label>
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
