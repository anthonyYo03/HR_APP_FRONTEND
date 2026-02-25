import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { UserOTP } from '../types/user';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Otp() {

const navigate=useNavigate();
const location=useLocation();
const [loading,setloading]=useState(false);
const [resendLoading,setResendLoading]=useState(false);
const [otp,setOtp]=useState<UserOTP>({ email: location.state?.email || '',otp:""})

const submitOTP=async(e:React.FormEvent)=>{
e.preventDefault();
if(!otp.otp.trim()){
toast.error("Please fill the OTP field ");
return;
}
setloading(true);
try {
  
await axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/verify-otp`,otp,{withCredentials:true})
toast.success("OTP submitted successfully")
setTimeout(()=>{navigate('/login')},2000)

} catch (error:any) {
  toast.error(error?.response?.data?.message)
}
finally{
  setloading(false)
}


}

const BackButton=()=>{
  navigate('/');
}


const resendOTP=async()=>{
  setResendLoading(true);
try {
  await axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/resendOTP`,otp,{withCredentials:true})
toast.success("OTP resent successfully")
} catch (error:any) {
   toast.error(error?.response?.data?.message || "Cound not resend OTP")
}
finally{
  setResendLoading(false);
}
}


  return (
    
    
    <>

  <form onSubmit={submitOTP}>
<div className="mb-3">
    <label htmlFor="otp" className="form-label">Your OTP</label>
    <input 
    type="text" 
    className="form-control"
    id="otp"
    aria-describedby="emailHelp"
    value={otp.otp}
    onChange={(e)=>{setOtp({...otp,otp:e.target.value})}}
    disabled={loading}
    />
  </div>
  <button type='submit' className=''>

 {loading && (
    <span
      className="spinner-border spinner-border-sm"
      role="status"
      aria-hidden="true"
    />
  )}

{loading ? "Submitting OTP...":"Submit OTP"}


  </button>
</form>






    {/*  */}
     <button type='button' onClick={resendOTP}>
      
       {resendLoading && (
    <span
      className="spinner-border spinner-border-sm"
      role="status"
      aria-hidden="true"
    />
  )}
      
      { resendLoading ? 'Resending OTP':'Resend OTP'}
      

      
      </button>

      <button onClick={BackButton}>Back</button>
    </>
   

  )
}
