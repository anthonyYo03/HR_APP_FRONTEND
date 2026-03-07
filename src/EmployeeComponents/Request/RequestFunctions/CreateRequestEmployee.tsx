import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CreateRequest } from '../../../types/request';

export default function CreateRequestEmployee() {
  const [request, setRequest] = useState<CreateRequest>({ leave_type: 'Sick', start_date: '', end_date: '', reason: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!request.start_date || !request.end_date || !request.reason.trim()) {
      toast.error('Please fill all required fields');
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/request/create`, request, { withCredentials: true });
      toast.success('Request submitted successfully');
      navigate('/employee/request');
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Failed to submit request');
    } finally {
      setLoading(false);
    }
  };

  const leaveTypes: CreateRequest['leave_type'][] = ['Sick', 'Vacation', 'Casual'];

  return (
    <div className="page-root">
      <div className="page-header">
        <h2 className="page-title">New Leave <span>Request</span></h2>
        <button className="btn-ghost" onClick={() => navigate('/employee/request')}>Back</button>
      </div>
      <div className="form-card">
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label className="form-lbl">Leave Type</label>
            <div className="form-radio-group">
              {leaveTypes.map((lt) => (
                <React.Fragment key={lt}>
                  <input
                    type="radio" className="form-radio-hidden"
                    id={`lt-${lt}`} name="leaveType" value={lt}
                    checked={request.leave_type === lt}
                    onChange={() => setRequest({ ...request, leave_type: lt })}
                  />
                  <label className="form-radio-label" htmlFor={`lt-${lt}`}>{lt}</label>
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="form-field">
            <label className="form-lbl" htmlFor="start_date">Start Date</label>
            <input
              type="date" id="start_date" className="form-inp"
              value={request.start_date}
              onChange={(e) => setRequest({ ...request, start_date: e.target.value })}
            />
          </div>
          <div className="form-field">
            <label className="form-lbl" htmlFor="end_date">End Date</label>
            <input
              type="date" id="end_date" className="form-inp"
              value={request.end_date}
              onChange={(e) => setRequest({ ...request, end_date: e.target.value })}
            />
          </div>
          <div className="form-field">
            <label className="form-lbl" htmlFor="reason">Reason</label>
            <textarea
              id="reason" className="form-inp" rows={4}
              placeholder="Describe the reason for your leave requestâ€¦"
              value={request.reason}
              onChange={(e) => setRequest({ ...request, reason: e.target.value })}
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-gold" disabled={loading}>
              {loading && <span className="btn-spinner" />}
              {loading ? 'Submitting...' : 'Submit Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
