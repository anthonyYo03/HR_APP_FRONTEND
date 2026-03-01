import { useNavigate } from 'react-router-dom'
import GetAnnouncement from './AnnouncementFunctions/GetAnnouncement';
export default function HrAnnouncement() {

  const navigate=useNavigate();
  return (
    <>
    <div>HrAnnouncement</div>
    <GetAnnouncement/>
    <button onClick={()=>{navigate('/hr/createAnnouncement')}}>+</button>
    </>
  )
}

