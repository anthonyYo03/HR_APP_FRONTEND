import React, { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { CreateNewAnnouncement } from '../../../types/announcement';

export default function EditAnnouncement() {
  const location = useLocation();
  const [editAnnouncement, setEditAnnouncement] = useState<CreateNewAnnouncement>({
    title: location.state?.title || '',
    description: location.state?.description || '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editAnnouncement.title.trim() || !editAnnouncement.description.trim()) {
      toast.error('Please fill title and description fields');
      return;
    }
    setLoading(true);
    try {
      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/announcement/edit/${id}`,
        editAnnouncement,
        { withCredentials: true }
      );
      toast.success('Announcement updated successfully');
      navigate('/hr/announcement');
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Failed to update announcement');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-root">
      <div className="page-header">
        <h2 className="page-title">Edit <span>Announcement</span></h2>
        <button className="btn-ghost" onClick={() => navigate('/hr/announcement')}>â† Cancel</button>
      </div>
      <div className="form-card">
        <form onSubmit={handleEdit}>
          <div className="form-field">
            <label className="form-lbl">Title</label>
            <input
              type="text"
              className="form-inp"
              placeholder="Announcement title"
              value={editAnnouncement.title}
              onChange={(e) => setEditAnnouncement({ ...editAnnouncement, title: e.target.value })}
              disabled={loading}
            />
          </div>
          <div className="form-field">
            <label className="form-lbl">Description</label>
            <textarea
              className="form-inp"
              placeholder="Write the announcement content"
              rows={5}
              value={editAnnouncement.description}
              onChange={(e) => setEditAnnouncement({ ...editAnnouncement, description: e.target.value })}
              disabled={loading}
              style={{ resize: 'vertical' }}
            />
          </div>
          <div className="form-actions">
            <button type="button" className="btn-ghost" onClick={() => navigate('/hr/announcement')} disabled={loading}>Cancel</button>
            <button type="submit" className="btn-gold" disabled={loading}>
              {loading && <span className="btn-spinner" />}
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
