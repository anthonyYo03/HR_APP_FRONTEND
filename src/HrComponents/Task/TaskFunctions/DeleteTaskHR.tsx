import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

interface Props { id: string; }

export default function DeleteTaskHR({ id }: Props) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!window.confirm('Delete this task? This cannot be undone.')) return;
    setLoading(true);
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/task/delete/${id}`, { withCredentials: true });
      toast.success('Task deleted');
      setTimeout(() => navigate('/hr/task'), 800);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Could not delete task');
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
