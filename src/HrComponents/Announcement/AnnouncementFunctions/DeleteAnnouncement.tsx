import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

interface Props { id: string; }

export default function DeleteAnnouncement({ id }: Props) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!window.confirm('Delete this announcement? This cannot be undone.')) return;
    setLoading(true);
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/announcement/delete/${id}`, { withCredentials: true });
      toast.success('Announcement deleted');
      setTimeout(() => navigate('/hr/announcement'), 800);
    } catch (error: any) {
      toast.error(error?.response?.data?.response || 'Could not delete announcement');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button className="btn-danger" onClick={handleDelete} disabled={loading}>
      {loading && <span className="btn-spinner" style={{ borderColor: 'rgba(239,68,68,0.3)', borderTopColor: '#ef4444' }} />}
      {loading ? 'Deleting...' : 'Delete'}
    </button>
  );
}