import React from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

interface Props {
  id: string;
}

export default function DeleteTaskHR({id}:Props) {
  const navigate=useNavigate();
const [loading,setLoading]=useState(false);

const handleDelete=async()=>{


try{  
  setLoading(true);
 await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/task/delete/${id}`,{withCredentials:true})
  toast.success("Task deleted succesfully");
  navigate('/hr/task');
  
}

catch(error:any){

  toast.error(error?.response?.data?.message ||"Cannot Delete Task");
}
finally{
  setLoading(false);
}
}


  return (
    <button onClick={handleDelete} className="btn btn-secondary" disabled={loading}>
      
      
     {loading?
   <>
   <span
      className="spinner-border spinner-border-sm"
      role="status"
      aria-hidden="true"
      
    /> Deleting
   </>  
   :"Delete"

     }
      
      
      
      
      </button>
  )
}
