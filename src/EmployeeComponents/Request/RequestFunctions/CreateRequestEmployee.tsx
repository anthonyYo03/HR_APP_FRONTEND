import React from 'react'
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CreateRequest } from '../../../types/request';


export default function CreateRequestEmployee() {
  const [request,setRequest]=useState<CreateRequest>({
leave_type:'Sick',
start_date:'',
end_date:'',
reason:'',
});
const [loading,setLoading]=useState(false)
const navigate=useNavigate();


const handleCreateRequest=async(e:React.FormEvent)=>{
try {
e.preventDefault();
if(!request.start_date.trim()  ||
 !request.end_date.trim() || !request.reason.trim()){
toast.error("Please fill title and description fields");
return;

}





setLoading(true);
await axios.post(`${process.env.REACT_APP_BACKEND_URL}/request/create`,request,{withCredentials:true})
toast.success("Request created Successfully");
navigate('/employee/request');

    
} catch (error:any) {
    toast.error(error?.response?.data?.message || "Failed to Create Request")
}
finally{
    setLoading(false)
}



}

const backButton=()=>{
  navigate('/employee/task');
}

  return (
    <>

<form onSubmit={handleCreateRequest}>
  <div className="mb-3">
    <label htmlFor="startDate" className="form-label">Start Date</label>
    <input 
    type="date" 
    className="form-control"
    id="startDate" 
    aria-describedby="emailHelp"
    value={request.start_date}
    onChange={(e)=>{setRequest({...request,start_date:e.target.value})}}
    
    />
    
  </div>
  <div className="mb-3">
    <label htmlFor="endDate" className="form-label">End Date</label>
    <input type="date" 
    className="form-control" 
    id="endDate"
    value={request.end_date}
    onChange={(e)=>{setRequest({...request,end_date:e.target.value})}}
    
    />
  </div>

<div className="mb-3">
    <label htmlFor="reason" className="form-label">Reason</label>
    <input type="text" 
    className="form-control" 
    id="reason"
    placeholder='Enter reason ...'
    value={request.reason}
    onChange={(e)=>{setRequest({...request,reason:e.target.value})}}
    
    />
  </div>





<div className="btn-group" role="group" aria-label="Basic radio toggle button group">
  <input 
   type="radio"
   className="btn-check" 
   name="btnradio" 
   id="btnradio1"
   value="Sick"
   checked={request.leave_type==="Sick"}
   onChange={(e)=>setRequest({...request,leave_type: e.target.value as CreateRequest['leave_type']})} 
   disabled={loading}
   />
  <label className="btn btn-outline-primary" htmlFor="btnradio1">Sick</label>

  <input 
  type="radio" 
  className="btn-check" 
  name="btnradio" 
  id="btnradio2" 
   value="Vacation"                                
          checked={request.leave_type === 'Vacation'} 
          onChange={(e) => setRequest({ ...request, leave_type: e.target.value as CreateRequest['leave_type'] })}
   disabled={loading}
  
  />
  <label className="btn btn-outline-primary" htmlFor="btnradio2">Vacation</label>

  <input 
  type="radio" 
  className="btn-check" 
  name="btnradio" 
  id="btnradio3" 
  value="Casual"                                    
  checked={request.leave_type === 'Casual'}           
  onChange={(e) => setRequest({ ...request, leave_type: e.target.value as CreateRequest['leave_type'] })}
  disabled={loading}
  
  />
  <label className="btn btn-outline-primary" htmlFor="btnradio3">Casual</label>

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
Creating Task
</>:
<>Create Task</>

} 
</button>



</form>
    

    
    </>
  )
}
