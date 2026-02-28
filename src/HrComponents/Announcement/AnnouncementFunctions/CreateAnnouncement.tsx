import React, { useState } from 'react'
import { CreateNewAnnouncement } from '../../../types/announcement';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



export default function CreateAnnouncement() {

const [announcement,setAnnouncement]=useState<CreateNewAnnouncement>({title:'',description:''});
const [loading,setLoading]=useState(false)
const navigate=useNavigate();


const handleCreateAnnouncement=async(e:React.FormEvent)=>{
try {
e.preventDefault();
if(!announcement.title.trim() || !announcement.description.trim() ){
toast.error("Please fill title and description fields");
return;

}

setLoading(true);
await axios.post(`${process.env.REACT_APP_BACKEND_URL}/announcement/create`,announcement,{withCredentials:true})
toast.success("Announcement created Successfully");
navigate('/hr/announcement')

    
} catch (error:any) {
    toast.error(error?.response?.data?.message || "Failed to Create Announcement")
}
finally{
    setLoading(false)
}



}

const backButton=()=>{
  navigate('/hr/announcement');
}

  return (
    <>
    
    <form onSubmit={handleCreateAnnouncement}>
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input 
    type="text" 
    className="form-control"
    id="title" 
    placeholder='Enter title ...'
    aria-describedby="emailHelp"
    value={announcement.title}
    onChange={(e)=>{setAnnouncement({...announcement,title:e.target.value})}}
    
    />
    
  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">Description</label>
    <input type="text" 
    className="form-control" 
    id="description"
    placeholder='Enter description ...'
    value={announcement.description}
    onChange={(e)=>{setAnnouncement({...announcement,description:e.target.value})}}
    
    />
  </div>
  <button type='button' className="btn btn-secondary" onClick={backButton}>Back</button>
  <button type="submit" className="btn btn-primary" disabled={loading}>
  {loading ?
<>
{loading && <span
      className="spinner-border spinner-border-sm"
      role="status"
      aria-hidden="true"
    /> }
Creating Announcement
</>:
<>Create Announcement</>

} 
</button>



</form>
    

    
    </>
  )
}
