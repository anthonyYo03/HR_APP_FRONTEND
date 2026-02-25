import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './Login/Login';
import Otp from './OTP/Otp';
import Register from './Register/Register';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import {Toaster} from 'react-hot-toast'
import EmployeeComponents from './EmployeeComponents/EmployeeComponents';
import HrComponents from './HrComponents/HrComponents';
function App() {
  return (

    
   <BrowserRouter>
   <Toaster position='top-right'/>
   <Routes>
    <Route path='/' element={<Register/>} ></Route>
    <Route path='/login' element={<Login/>} ></Route>
    <Route path='/otp' element={<Otp/>}></Route>
    <Route path="/employeeDashboard" element={<EmployeeComponents/>}></Route>
    <Route path='/hrDashboard' element={<HrComponents/>}></Route>

   </Routes>
   
   
   </BrowserRouter>
  );
}

export default App;
