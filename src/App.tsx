import './App.css';
import Login from './Login/Login';
import Otp from './OTP/Otp';
import Register from './Register/Register';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import {Toaster} from 'react-hot-toast'
import NotFound from './NotFound/NotFound';

import EmployeeComponents from './EmployeeComponents/EmployeeComponents';
import EmployeeReportIssues from './EmployeeComponents/ReportIssues/EmployeeReportIssues';
import EmployeeRequest from './EmployeeComponents/Request/EmployeeRequest';
import EmployeeTask from './EmployeeComponents/Task/EmployeeTask';

import HrComponents from './HrComponents/HrComponents';
import HrAnnouncement from './HrComponents/Announcement/HrAnnouncement';
import HrDashboard from './HrComponents/Dashboard/HrDashboard';
import HrReportIssues from './HrComponents/ReportIssues/HrReportIssues';
import HrRequest from './HrComponents/Request/HrRequest';
import HrTask from './HrComponents/Task/HrTask';

import CreateAnnouncement from './HrComponents/Announcement/AnnouncementFunctions/CreateAnnouncement';
import GetOneAnnouncement from './HrComponents/Announcement/AnnouncementFunctions/GetOneAnnouncement';
import GetAnnouncement from './HrComponents/Announcement/AnnouncementFunctions/GetAnnouncement';
import EditAnnouncement from './HrComponents/Announcement/AnnouncementFunctions/EditAnnouncement';

import GetOneAnnouncementEmployee from './EmployeeComponents/Announcement/GetOneAnnouncementEmployee';

import GetOneIssue from './EmployeeComponents/ReportIssues/ReportIssuesFunctions/GetOneIssue';

import GetAnnouncementEmployee from './EmployeeComponents/Announcement/GetAnnouncementsEmployee';
import CreateIssues from './EmployeeComponents/ReportIssues/ReportIssuesFunctions/CreateIssues';


function App() {
  return (

    
   <BrowserRouter>
   <Toaster position='top-right'/>
   <Routes>
    <Route path='/' element={<Register/>} ></Route>
    <Route path='/login' element={<Login/>} ></Route>
    <Route path='/otp' element={<Otp/>}></Route>

   
    
    <Route path='employee' element= {<EmployeeComponents/> }>
    <Route path='reportIssue' element={<EmployeeReportIssues/>} ></Route>
    <Route path='request' element={<EmployeeRequest/>}></Route>
    <Route path='task' element={<EmployeeTask/>}></Route>
    <Route path='announcement' element={<GetAnnouncementEmployee/>}></Route>
    <Route path='getOneAnnouncement/:id' element={<GetOneAnnouncementEmployee/>}></Route>
    <Route path='createIssue' element={<CreateIssues/>}></Route>
    <Route path='oneIssue/:id' element={<GetOneIssue/>}></Route>
    </Route>
{/* announcement */}
    <Route path='hr' element={<HrComponents/>}>
      <Route path='announcement' element={<HrAnnouncement/>}></Route>
      <Route path='dashboard' element={<HrDashboard/>}></Route>
      <Route path='reportIssue' element={<HrReportIssues/>}></Route>
      <Route path='request' element={<HrRequest/>}></Route>
      <Route path='task' element={<HrTask/>}></Route>
      <Route path='createAnnouncement' element={<CreateAnnouncement/>} ></Route>
      <Route path='getOneAnnouncement/:id' element={<GetOneAnnouncement/>} ></Route>
      <Route path='announcement' element={<GetAnnouncement/>}></Route>
      <Route path='editannouncement/:id' element={<EditAnnouncement/>}></Route>
    </Route>

    <Route path='*' element={<NotFound/>}></Route>



   </Routes>
   
   
   </BrowserRouter>
  );
}

export default App;
