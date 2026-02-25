import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import type { UserLogin } from '../types/user';
import toast from 'react-hot-toast';
import axios from 'axios';
export default function Login() {

  const navigate=useNavigate();
  const [login,setLogin]=useState<UserLogin>({username:'',password:''})
  const [loading,setLoading]=useState(false);

const loginUser=async(e:React.FormEvent)=>{

e.preventDefault();

if(!login.username.trim() || !login.password.trim()){
  toast.error("Please fill username and password field ");
  return;
}

setLoading(true);

try {
  
  await axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/login`,login,{withCredentials:true})

toast.success("User succesfully logged in");


setTimeout(()=>{
navigate('/employee')
},2000)

} catch (error:any) {
  toast.error(error?.response?.data?.response)
}
finally{
setLoading(false);
}



}


  return (

    <>
    <form onSubmit={loginUser}>
<div className="mb-3">
    <label htmlFor="username" className="form-label">Username</label>
    <input 
    type="text" 
    className="form-control"
    placeholder="Enter your username . . ."
    id="username"
    aria-describedby="emailHelp"
    value={login.username}
    onChange={(e)=>{setLogin({...login,username:e.target.value})}}
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
    value={login.password}
    onChange={(e)=>setLogin({...login, password: e.target.value})}
    disabled={loading}



    />
  </div>


<button className='btn btn-primary' type='submit'>
  


 {loading ?
<>
{loading && (
    <span
      className="spinner-border spinner-border-sm"
      role="status"
      aria-hidden="true"
    /> 
  )}
Logging In...
</>
:
"Login"
 }


</button>
    <p>Don't have an account ? <Link to="/">Sign Up</Link> now </p>
    </form>
    </>
  )
}
