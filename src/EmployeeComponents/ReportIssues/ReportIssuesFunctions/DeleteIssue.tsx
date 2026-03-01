import axios from "axios"
import { useState } from "react";
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"


interface Props {
  id: string;
}

export default function DeleteIssue({id}:Props) {


const navigate=useNavigate();
const [loading,setLoading]=useState(false);

const handleDelete=async()=>{


try{  
  setLoading(true);
 await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/reportIssue/delete/${id}`,{withCredentials:true})
  toast.success("Issue deleted succesfully");
  navigate('/employee/reportIssue');
  
}

catch(error:any){

  toast.error(error?.response?.data?.message ||"Cannot Delete Issue");
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
