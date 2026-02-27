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





// router.post('/create',verifyToken,OnlyHR,announcementControllers.createAnnouncement);
// router.get('/getAll',verifyToken,announcementControllers.getAllAnnouncement)
// router.get('/getOne/:id',verifyToken,announcementControllers.getOneAnnouncement);
// router.put('/edit/:id',verifyToken,OnlyHR,announcementControllers.editAnnouncement);
// router.delete('/delete/:id',verifyToken,OnlyHR,announcementControllers.deleteAnnouncement);