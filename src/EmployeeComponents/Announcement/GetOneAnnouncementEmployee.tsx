import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getAnnouncement } from '../../types/announcement';
import axios from 'axios';
import toast from 'react-hot-toast';

const fmt = (d: string) => new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

export default function GetOneAnnouncementEmployee() {
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
        <button className="btn-ghost" onClick={() => navigate('/employee/announcement')}>â† Back</button>
      </div>
      <div className="detail-card">
        <div className="detail-field" style={{ gridColumn: '1 / -1' }}>
          <span className="detail-field-label">Posted</span>
          <span className="detail-field-value">{fmt(announcement.createdAt)}</span>
        </div>
        <div className="detail-divider" />
        <p style={{ color: '#c8c3bc', lineHeight: 1.8, margin: 0, whiteSpace: 'pre-wrap' }}>{announcement.description}</p>
      </div>
    </div>
  );
}
