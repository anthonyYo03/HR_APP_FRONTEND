import toast from "react-hot-toast"
import { UserRegister } from "../types/user"
import { useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Register() {

const [register,setRegister]=useState<UserRegister>({email:'',username:'',password :''});
const [loading,setLoading]=useState(false);
const navigate=useNavigate();

const handleSubmit=async(e:React.FormEvent)=>{
e.preventDefault();

if(!register.email.trim() || !register.username.trim() || !register.password.trim()){
  toast.error("Please fill the email user name and password fields ")
  return;
}

setLoading(true);
try {

await axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/register`,register,{withCredentials:true})
toast.success("User Registered Successfully")
setTimeout(()=>{
navigate('/otp',{
state: { email: register.email }
})
},1000)

} catch (error:any) {
  
toast.error(error.response?.data?.message||"Cannot register user");

}
finally{
  setLoading(false)
}

}

  return (
   <>
<form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input 
    type="email" 
    className="form-control"
    placeholder="Enter your email . . ."
    id="email"
    aria-describedby="emailHelp"
    value={register.email}
    onChange={(e)=>{setRegister({...register,email:e.target.value})}}
     disabled={loading}
     />
  </div>

<div className="mb-3">
    <label htmlFor="username" className="form-label">Username</label>
    <input 
    type="text" 
    className="form-control"
    placeholder="Enter your username . . ."
    id="username"
    aria-describedby="emailHelp"
    value={register.username}
    onChange={(e)=>{setRegister({...register,username:e.target.value})}}
    disabled={loading}
    />
  </div>

  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input 
    type="password" 
    className="form-control"
    placeholder="Enter your password . . ."
    id="password"
    value={register.password}
    onChange={(e)=>setRegister({...register, password: e.target.value})}
    disabled={loading}



    />
  </div>

  <button type="submit" className="btn btn-primary" disabled={loading}>
  {loading && (
    <span
      className="spinner-border spinner-border-sm"
      role="status"
      aria-hidden="true"
    />
  )}
    {loading ? "Registering" :"Register"}
</button>

<div>Already have an account? <Link to={'/login'}>Log In</Link></div>

</form>

</>
  )
}
