import { useNavigate,useParams } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { getAnnouncement } from '../../types/announcement';
import axios from 'axios';
import toast from 'react-hot-toast';


export default function GetOneAnnouncementEmployee() {
   
const [announcement, setAnnouncement] = useState<getAnnouncement | null>(null);
  const [loading,setloading]=useState(false);
  const { id } = useParams();
  const navigate=useNavigate();
  const BackButton=()=>{
    navigate('/employee/announcement')
  }
  useEffect(() => {
    const fetchOneAnnouncement = async () => {
        setloading(true);
      try {
        const res = await axios.get<getAnnouncement>(
          `${process.env.REACT_APP_BACKEND_URL}/announcement/getOne/${id}`,
          { withCredentials: true }
        );
        setAnnouncement(res.data);
      } catch (error) {
        toast.error("Cannot get announcement");
      }
      finally{
        setloading(false);
      }
    };

    fetchOneAnnouncement();
  }, [id]);

  if(loading) return <p>Getting Announcement</p>
  if (!announcement) return <p>Cannot get Announcement</p>;

  return (
<>
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{announcement.title}</h5>
        <p className="card-text">{announcement.description}</p>
      </div>
    </div>
    
<button className='btn btn-secondary' onClick={()=>{BackButton()}}>Back</button>
    
</>
  );


}
