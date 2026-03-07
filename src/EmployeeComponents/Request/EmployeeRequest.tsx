import { useNavigate } from 'react-router-dom';
import GetMyRequestsEmployee from './RequestFunctions/GetMyRequestsEmployee';

export default function EmployeeRequest() {
  const navigate = useNavigate();
  return (
    <div className="page-root">
      <div className="page-header">
        <h2 className="page-title">My <span>Requests</span></h2>
        <button className="btn-gold" onClick={() => navigate('/employee/createRequest')}>+ New Request</button>
      </div>
      <GetMyRequestsEmployee />
    </div>
  );
}

