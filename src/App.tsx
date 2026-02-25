import './App.css';
import Login from './Login/Login';
import Otp from './OTP/Otp';
import Register from './Register/Register';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import {Toaster} from 'react-hot-toast'
import EmployeeComponents from './EmployeeComponents/EmployeeComponents';
import HrComponents from './HrComponents/HrComponents';
import NotFound from './NotFound/NotFound';


function App() {
  return (

    
   <BrowserRouter>
   <Toaster position='top-right'/>
   <Routes>
    <Route path='/' element={<Register/>} ></Route>
    <Route path='/login' element={<Login/>} ></Route>
    <Route path='/otp' element={<Otp/>}></Route>

    <Route path='/hrDashboard' element={<HrComponents/>}></Route>
    <Route path='employee/*' element= {<EmployeeComponents/> }> </Route>
    <Route path='*' element={<NotFound/>}></Route>



   </Routes>
   
   
   </BrowserRouter>
  );
}

export default App;
