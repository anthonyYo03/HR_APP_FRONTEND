import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";


interface Props {
  id: string;
}



export default function DeleteRequestEmployee({id}:Props) {
 const navigate=useNavigate();
const [loading,setLoading]=useState(false);

const handleDelete=async()=>{


try{  
  setLoading(true);
 await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/request/delete/${id}`,{withCredentials:true})
  toast.success("Request deleted succesfully");
  navigate('/employee/request');
  
}

catch(error:any){

  toast.error(error?.response?.data?.message ||"Cannot Delete Request");
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
