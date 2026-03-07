import React, { useState } from 'react';
import { CreateIssue } from '../../../types/Issues';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

export default function CreateIssues() {
  const [issue, setIssue] = useState<CreateIssue>({ title: '', description: '', priority: 'medium' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!issue.title.trim() || !issue.description.trim()) {
      toast.error('Please fill all required fields');
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/reportIssue/create`, issue, { withCredentials: true });
      toast.success('Issue reported successfully');
      navigate('/employee/reportIssue');
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Failed to report issue');
    } finally {
      setLoading(false);
    }
  };

  const priorities: CreateIssue['priority'][] = ['low', 'medium', 'high'];

  return (
    <div className="page-root">
      <div className="page-header">
        <h2 className="page-title">Report an <span>Issue</span></h2>
        <button className="btn-ghost" onClick={() => navigate('/employee/reportIssue')}> Back</button>
      </div>
      <div className="form-card">
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label className="form-lbl" htmlFor="title">Title</label>
            <input
              type="text" id="title" className="form-inp"
              placeholder="Brief issue title"
              value={issue.title}
              onChange={(e) => setIssue({ ...issue, title: e.target.value })}
            />
          </div>
          <div className="form-field">
            <label className="form-lbl" htmlFor="desc">Description</label>
            <textarea
              id="desc" className="form-inp" rows={4}
              placeholder="Describe the issue in detail"
              value={issue.description}
              onChange={(e) => setIssue({ ...issue, description: e.target.value })}
            />
          </div>
          <div className="form-field">
            <label className="form-lbl">Priority</label>
            <div className="form-radio-group">
              {priorities.map((p) => (
                <React.Fragment key={p}>
                  <input
                    type="radio" className="form-radio-hidden"
                    id={`p-${p}`} name="priority" value={p}
                    checked={issue.priority === p}
                    onChange={() => setIssue({ ...issue, priority: p })}
                  />
                  <label className="form-radio-label" htmlFor={`p-${p}`} style={{ textTransform: 'capitalize' }}>{p}</label>
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-gold" disabled={loading}>
              {loading && <span className="btn-spinner" />}
              {loading ? 'Submitting' : 'Report Issue'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

