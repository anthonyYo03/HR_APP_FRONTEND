import { useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

interface Props {
  id: string;
}

export default function DeleteAnnouncement({ id }: Props) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/announcement/delete/${id}`,
        { withCredentials: true }
      );
      toast.success("Announcement deleted successfully");
      setTimeout(() => {
        navigate('/hr/announcement');
      }, 1000);
    } catch (error: any) {
      toast.error(error?.response?.data?.response || "Could not delete Announcement");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleDelete} className='btn btn-secondary' disabled={loading}>
      {loading ? (
        <>
          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
          Deleting ...
        </>
      ) : 'Delete'}
    </button>
  );
}