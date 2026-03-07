import { useEffect, useState } from 'react';
import { getAnnouncement } from '../../../types/announcement';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { MdAnnouncement } from 'react-icons/md';

export default function GetAnnouncement() {
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
        <p>No announcements yet. Create the first one!</p>
      </div>
    );

  return (
    <>
      {announcements.map((a) => (
        <div key={a._id} className="data-card" onClick={() => navigate(`/hr/getOneAnnouncement/${a._id}`)}>
          <div className="data-card-header">
            <h3 className="data-card-title">{a.title}</h3>
          </div>
          <p className="data-card-meta" style={{ color: '#9a9490', margin: 0, lineHeight: 1.5 }}>
            {a.description.length > 120 ? a.description.slice(0, 120) + '…' : a.description}
          </p>
        </div>
      ))}
    </>
  );
}

