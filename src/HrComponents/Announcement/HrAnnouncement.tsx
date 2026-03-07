import { useNavigate } from 'react-router-dom';
import GetAnnouncement from './AnnouncementFunctions/GetAnnouncement';

export default function HrAnnouncement() {
  const navigate = useNavigate();
  return (
    <div className="page-root">
      <div className="page-header">
        <h2 className="page-title">Announcements</h2>
        <button className="btn-gold" onClick={() => navigate('/hr/createAnnouncement')}>
          + New Announcement
        </button>
      </div>
      <GetAnnouncement />
    </div>
  );
}


