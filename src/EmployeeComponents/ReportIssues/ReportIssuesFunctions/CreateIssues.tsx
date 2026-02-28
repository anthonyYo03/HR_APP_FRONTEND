import { CreateIssue } from "../../../types/Issues"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast"
import axios from "axios";



export default function CreateIssues() {
  const [issue,setIssue]=useState<CreateIssue>({title:'',description:'',priority:'medium'});
const [loading,setLoading]=useState(false)
const navigate=useNavigate();


const handleCreateAnnouncement=async(e:React.FormEvent)=>{
try {
e.preventDefault();
if(!issue.title.trim() || !issue.description.trim() ){
toast.error("Please fill title and description fields");
return;

}

if (!issue.priority) {
  toast.error("Please select a priority");
  return;
}



setLoading(true);
await axios.post(`${process.env.REACT_APP_BACKEND_URL}/reportIssue/create`,issue,{withCredentials:true})
toast.success("Issue created Successfully");
navigate('/employee/reportIssue');

    
} catch (error:any) {
    toast.error(error?.response?.data?.message || "Failed to Create Issue")
}
finally{
    setLoading(false)
}



}

const backButton=()=>{
  navigate('/employee/reportIssue');
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
    value={issue.title}
    onChange={(e)=>{setIssue({...issue,title:e.target.value})}}
    
    />
    
  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">Description</label>
    <input type="text" 
    className="form-control" 
    id="description"
    placeholder='Enter description ...'
    value={issue.description}
    onChange={(e)=>{setIssue({...issue,description:e.target.value})}}
    
    />
  </div>

<div className="btn-group" role="group" aria-label="Basic radio toggle button group">
  <input 
   type="radio"
   className="btn-check" 
   name="btnradio" 
   id="btnradio1"
   value="low"
   checked={issue.priority==="low"}
   onChange={(e)=>setIssue({...issue,priority: e.target.value as CreateIssue['priority']})} 
   disabled={loading}
   />
  <label className="btn btn-outline-primary" htmlFor="btnradio1">Low</label>

  <input 
  type="radio" 
  className="btn-check" 
  name="btnradio" 
  id="btnradio2" 
   value="medium"                                
          checked={issue.priority === 'medium'} 
          onChange={(e) => setIssue({ ...issue, priority: e.target.value as CreateIssue['priority'] })}
   disabled={loading}
  
  />
  <label className="btn btn-outline-primary" htmlFor="btnradio2">Medium</label>

  <input 
  type="radio" 
  className="btn-check" 
  name="btnradio" 
  id="btnradio3" 
  value="high"                                    
  checked={issue.priority === 'high'}           
  onChange={(e) => setIssue({ ...issue, priority: e.target.value as CreateIssue['priority'] })}
  disabled={loading}
  
  />
  <label className="btn btn-outline-primary" htmlFor="btnradio3">High</label>

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
Creating Issue
</>:
<>Create Issue</>

} 
</button>



</form>
    

    
    </>
  )
}
