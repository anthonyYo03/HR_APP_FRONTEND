import { useNavigate } from 'react-router-dom';
import GetMyIssues from './ReportIssuesFunctions/GetMyIssues';

export default function EmployeeReportIssues() {
  const navigate = useNavigate();
  return (
    <div className="page-root">
      <div className="page-header">
        <h2 className="page-title">My <span>Issues</span></h2>
        <button className="btn-gold" onClick={() => navigate('/employee/createIssue')}>+ Report Issue</button>
      </div>
      <GetMyIssues />
    </div>
  );
}

