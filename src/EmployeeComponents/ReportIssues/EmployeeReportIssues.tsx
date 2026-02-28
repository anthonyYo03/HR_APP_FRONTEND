import { useNavigate } from 'react-router-dom'
import GetMyIssues from './ReportIssuesFunctions/GetMyIssues';
export default function EmployeeReportIssues() {

  const navigate=useNavigate();
  return (
<>
    <GetMyIssues/>

    <button type='button' onClick={()=>navigate('/employee/createIssue')} >+</button>

</>
  )
}
