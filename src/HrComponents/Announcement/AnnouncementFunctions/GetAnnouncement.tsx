import { useEffect, useState } from 'react'
import { getAnnouncement } from '../../../types/announcement';
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';

export default function GetAnnouncement() {

const [announcements, setAnnouncements] = useState<getAnnouncement[]>([]);
const navigate=useNavigate();
useEffect(() => {
  const fetchAnnouncements = async () => {
    try {
       const res = await axios.get<{announcements:getAnnouncement[]}>(
          `${process.env.REACT_APP_BACKEND_URL}/announcement/getAll`,
          { withCredentials: true }
        );
        // console.log(res.data);
      setAnnouncements(res.data.announcements);
    } catch (error) {
      toast.error("Cannot get announcements");
    }
  };

  fetchAnnouncements();
}, []);

  return (
   <>
    {announcements.length === 0 && <p>No announcements yet</p>}

    {announcements.map((announcement) => (
      <div key={announcement._id} className="card mb-3" onClick={() => navigate(`/hr/getOneAnnouncement/${announcement._id}`)}>
        <div className="card-body">
          <h5 className="card-title">{announcement.title}</h5>
          <p className="card-text">{announcement.description}</p>
        </div>
      </div>
    ))}
  </>
  )
}

