import React, { useState } from 'react';
import { CreateNewAnnouncement } from '../../../types/announcement';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CreateAnnouncement() {
  const [announcement, setAnnouncement] = useState<CreateNewAnnouncement>({ title: '', description: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!announcement.title.trim() || !announcement.description.trim()) {
      toast.error('Please fill title and description fields');
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/announcement/create`, announcement, { withCredentials: true });
      toast.success('Announcement created successfully');
      navigate('/hr/announcement');
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Failed to create announcement');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-root">
      <div className="page-header">
        <h2 className="page-title">New <span>Announcement</span></h2>
        <button className="btn-ghost" onClick={() => navigate('/hr/announcement')}>â† Cancel</button>
      </div>
      <div className="form-card">
        <form onSubmit={handleCreate}>
          <div className="form-field">
            <label className="form-lbl">Title</label>
            <input
              type="text"
              className="form-inp"
              placeholder="Announcement title"
              value={announcement.title}
              onChange={(e) => setAnnouncement({ ...announcement, title: e.target.value })}
              disabled={loading}
            />
          </div>
          <div className="form-field">
            <label className="form-lbl">Description</label>
            <textarea
              className="form-inp"
              placeholder="Write the announcement content hereâ€¦"
              rows={5}
              value={announcement.description}
              onChange={(e) => setAnnouncement({ ...announcement, description: e.target.value })}
              disabled={loading}
              style={{ resize: 'vertical' }}
            />
          </div>
          <div className="form-actions">
            <button type="button" className="btn-ghost" onClick={() => navigate('/hr/announcement')} disabled={loading}>Cancel</button>
            <button type="submit" className="btn-gold" disabled={loading}>
              {loading && <span className="btn-spinner" />}
              {loading ? 'Creating...' : 'Create Announcement'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
