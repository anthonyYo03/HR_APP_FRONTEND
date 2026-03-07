import { useNavigate } from 'react-router-dom';
import GetTasksHR from './TaskFunctions/GetTasksHR';

export default function HrTask() {
  const navigate = useNavigate();
  return (
    <div className="page-root">
      <div className="page-header">
        <h2 className="page-title">Task <span>Management</span></h2>
        <button className="btn-gold" onClick={() => navigate('/hr/createTask')}>+ Create Task</button>
      </div>
      <GetTasksHR />
    </div>
  );
}

