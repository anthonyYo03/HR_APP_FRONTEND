import React from 'react'
import { useState } from 'react';
import { useNavigate, useParams,useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { CreateNewAnnouncement } from '../../../types/announcement';



export default function EditAnnouncement() {   
const location=useLocation();
const [editAnnouncement,setEditAnnouncement]=useState<CreateNewAnnouncement>
({title:location.state?.title || '',
  description:location?.state.description || ''});
const [loading,setLoading]=useState(false)
const navigate=useNavigate();
const {id}=useParams();

const handleCreateAnnouncement=async(e:React.FormEvent)=>{
try {
e.preventDefault();
if(!editAnnouncement.title.trim() || !editAnnouncement.description.trim() ){
toast.error("Please fill title and description fields");
return;
}

setLoading(true);
await axios.put(`${process.env.REACT_APP_BACKEND_URL}/announcement/edit/${id}`,editAnnouncement,{withCredentials:true})
toast.success("Announcement edited Successfully");
navigate('/hr/announcement')

    
} catch (error:any) {
    toast.error(error?.response?.data?.message || "Failed to Edit Announcement")
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
    value={editAnnouncement.title}
    onChange={(e)=>{setEditAnnouncement({...editAnnouncement,title:e.target.value})}}
    
    />
    
  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">Description</label>
    <input type="text" 
    className="form-control" 
    id="description"
    placeholder='Enter description ...'
    value={editAnnouncement.description}
    onChange={(e)=>{setEditAnnouncement({...editAnnouncement,description:e.target.value})}}
    
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
Editing
</>:
<>Update Announcement</>

} 
</button>



</form>
    

    
    </>
  )
}
