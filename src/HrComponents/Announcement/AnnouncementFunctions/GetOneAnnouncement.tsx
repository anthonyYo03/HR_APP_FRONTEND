import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { getAnnouncement } from '../../../types/announcement';
import toast from 'react-hot-toast';
import DeleteAnnouncement from './DeleteAnnouncement';

export default function GetOneAnnouncement() {
  const [announcement, setAnnouncement] = useState<getAnnouncement | null>(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get<getAnnouncement>(`${process.env.REACT_APP_BACKEND_URL}/announcement/getOne/${id}`, { withCredentials: true })
      .then((res) => setAnnouncement(res.data))
      .catch(() => toast.error('Cannot get announcement'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="state-loading"><div className="state-spinner" /></div>;
  if (!announcement) return <div className="state-empty"><p>Announcement not found</p></div>;

  return (
    <div className="page-root">
      <div className="page-header">
        <h2 className="page-title">{announcement.title}</h2>
        <button className="btn-ghost" onClick={() => navigate('/hr/announcement')}>Back</button>
      </div>
      <div className="detail-card">
        <p style={{ color: '#c5bfb5', lineHeight: 1.7, fontSize: '0.95rem', margin: 0 }}>
          {announcement.description}
        </p>
      </div>
      <div className="detail-actions">
        <button
          className="btn-gold"
          onClick={() => navigate(`/hr/editannouncement/${announcement._id}`, {
            state: { title: announcement.title, description: announcement.description },
          })}
        >
          Edit
        </button>
        <DeleteAnnouncement id={announcement._id} />
      </div>
    </div>
  );
}
