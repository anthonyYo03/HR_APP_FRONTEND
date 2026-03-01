import React, { useState } from 'react'
import { updateStatus } from '../../../types/Issues';
import axios from 'axios'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

interface Props{
id:string

}


export default function EditIssueStatus({id}:Props) {

const [loading,setloading]=useState(false);
const [status,setStatus]=useState<updateStatus>({status:'pending'});
const navigate=useNavigate();


const updateStatus=async(e:React.FormEvent)=>{
e.preventDefault();
try {
  setloading(true);
  await axios.put(`${process.env.REACT_APP_BACKEND_URL}/reportIssue/edit/${id}`,status,{withCredentials:true});
  toast.success("Issue Status updated successfully");
  navigate('/hr/reportIssue');
} catch (error:any) {
  toast.error(error?.response.data?.response ||"Failed to update status");
}
finally{
  setloading(false);
}

}


  return (
    <>
    <form onSubmit={updateStatus}>
   <div className="dropdown">
  <a className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
    Dropdown link
  </a>

  <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
    <li><a className="dropdown-item" href="#" onClick={() => setStatus({ status: 'pending' })}></a>Pending</li>
    <li><a className="dropdown-item" href="#" onClick={() => setStatus({ status: 'in_progress' })}>In_progress</a></li>
    <li><a className="dropdown-item" href="#" onClick={() => setStatus({ status: 'resolved' })} >Resolved</a></li>
  </ul>
</div> 
<button type='submit' className='btn btn-primary'>Update Status</button>
    
    </form>
    </>
  )
}
