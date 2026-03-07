import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

interface Props { id: string; }

export default function DeleteIssue({ id }: Props) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm('Delete this issue?')) return;
    setLoading(true);
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/reportIssue/delete/${id}`, { withCredentials: true });
      toast.success('Issue deleted');
      navigate('/employee/reportIssue');
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Cannot delete issue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleDelete} className="btn-danger" disabled={loading}>
      {loading && <span className="btn-spinner-white" />}
      {loading ? 'Deleting…' : 'Delete Issue'}
    </button>
  );
}
