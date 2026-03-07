import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

interface Props { id: string; }

export default function DeleteRequestEmployee({ id }: Props) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm('Delete this leave request?')) return;
    setLoading(true);
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/request/delete/${id}`, { withCredentials: true });
      toast.success('Request deleted');
      navigate('/employee/request');
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Cannot delete request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleDelete} className="btn-danger" disabled={loading}>
      {loading && <span className="btn-spinner-white" />}
      {loading ? 'Deleting…' : 'Delete Request'}
    </button>
  );
}
