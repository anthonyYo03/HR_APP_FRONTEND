import React from 'react'
import { useState } from 'react';
import { updateStatus } from '../../../types/Issues';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { updatedRequestStatus } from '../../../types/request';


interface Props{
id:string

}


export default function EditRequestStatusHR({id}:Props) {
  const [loading,setloading]=useState(false);
const [status,setStatus]=useState<updatedRequestStatus>({status:'Pending'});
const navigate=useNavigate();


const updateStatus=async(e:React.FormEvent)=>{
e.preventDefault();
try {
  setloading(true);
  await axios.put(`${process.env.REACT_APP_BACKEND_URL}/request/hredit/${id}`,status,{withCredentials:true});
  toast.success("Request Status updated successfully");
  navigate('/hr/request');
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
    <li><a className="dropdown-item" href="#" onClick={() => setStatus({ status: 'Pending' })}></a>Pending</li>
    <li><a className="dropdown-item" href="#" onClick={() => setStatus({ status: 'Approved' })}>Approved</a></li>
    <li><a className="dropdown-item" href="#" onClick={() => setStatus({ status: 'Rejected' })} >Rejected</a></li>
  </ul>
</div> 
<button type='submit' className='btn btn-primary'>Update Status</button>
    
    </form>
    </>
  )
}
