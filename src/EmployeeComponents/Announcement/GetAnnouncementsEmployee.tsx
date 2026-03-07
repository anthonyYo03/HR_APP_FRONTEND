import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAnnouncement } from '../../types/announcement';
import axios from 'axios';
import { MdAnnouncement } from 'react-icons/md';

const fmt = (d: string) => new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

export default function GetAnnouncementEmployee() {
  const [announcements, setAnnouncements] = useState<getAnnouncement[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get<getAnnouncement[]>(`${process.env.REACT_APP_BACKEND_URL}/announcement/getAll`, { withCredentials: true })
      .then((res) => setAnnouncements(res.data))
      .catch(() => toast.error('Cannot get announcements'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="state-loading"><div className="state-spinner" /></div>;

  if (announcements.length === 0)
    return (
      <div className="state-empty">
        <div className="state-empty-icon"><MdAnnouncement /></div>
        <p>No announcements yet</p>
      </div>
    );

  return (
    <div className="page-root">
      <div className="page-header">
        <h2 className="page-title">Announcements</h2>
      </div>
      {announcements.map((a) => (
        <div key={a._id} className="data-card" onClick={() => navigate(`/employee/getOneAnnouncement/${a._id}`)}>          <div className="data-card-header">
            <h3 className="data-card-title">{a.title}</h3>
            <span className="data-card-meta" style={{ fontSize: '0.8rem', color: '#9a9490', flexShrink: 0 }}>{fmt(a.createdAt)}</span>
          </div>
          <p className="data-card-meta" style={{ color: '#9a9490', margin: 0, fontSize: '0.825rem' }}>
            {a.description.length > 120 ? a.description.slice(0, 120) + 'â€¦' : a.description}
          </p>
        </div>
      ))}
    </div>
  );
}
