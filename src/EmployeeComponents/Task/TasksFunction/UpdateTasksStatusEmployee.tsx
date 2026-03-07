import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { updateTaskStatus } from '../../../types/task';

export default function UpdateTasksStatusEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<updateTaskStatus>({ status: 'pending' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(`${process.env.REACT_APP_BACKEND_URL}/task/employeeUpdate/${id}`, status, { withCredentials: true });
      toast.success('Task status updated');
      navigate('/employee/task');
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Failed to update status');
    } finally {
      setLoading(false);
    }
  };

  const options: { label: string; value: updateTaskStatus['status'] }[] = [
    { label: 'Pending', value: 'pending' },
    { label: 'In Progress', value: 'in-progress' },
    { label: 'Completed', value: 'completed' },
  ];

  return (
    <div className="page-root">
      <div className="page-header">
        <h2 className="page-title">Update Task <span>Status</span></h2>
        <button className="btn-ghost" onClick={() => navigate(`/employee/getOnetask/${id}`)}>â† Back</button>
      </div>
      <div className="form-card">
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label className="form-lbl">New Status</label>
            <div className="form-radio-group">
              {options.map((opt) => (
                <React.Fragment key={opt.value}>
                  <input
                    type="radio" className="form-radio-hidden"
                    id={`ts-${opt.value}`} name="taskStatus" value={opt.value}
                    checked={status.status === opt.value}
                    onChange={() => setStatus({ status: opt.value })}
                  />
                  <label className="form-radio-label" htmlFor={`ts-${opt.value}`}>{opt.label}</label>
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-gold" disabled={loading}>
              {loading && <span className="btn-spinner" />}
              {loading ? 'Updatingâ€¦' : 'Update Status'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
