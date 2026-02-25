import React from 'react'
import { Route,Routes,Outlet } from 'react-router-dom'
import EmployeeDashboard from './Dashboard/EmployeeDashboard'
import EmployeeReportIssues from './ReportIssues/EmployeeReportIssues'
import EmployeeRequest from './Request/EmployeeRequest'
import EmployeeSidebar from './Sidebar/EmployeeSidebar'
import EmployeeTask from './Task/EmployeeTask'


export default function EmployeeComponents() {
  return (

    <>
    <EmployeeSidebar/>
    <Outlet/>
     <Routes>
    <Route path='dashboard' element={<EmployeeDashboard/>} ></Route>
    <Route path='reportIssue' element={<EmployeeReportIssues/>} ></Route>
    <Route path='request' element={<EmployeeRequest/>}></Route>
    <Route path='task' element={<EmployeeTask/>}></Route>
   </Routes>
   </>
  )
}
