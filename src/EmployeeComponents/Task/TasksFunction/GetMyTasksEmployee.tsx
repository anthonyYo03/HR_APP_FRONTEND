import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllTask } from '../../../types/task';
import toast from 'react-hot-toast';
import { MdTask } from 'react-icons/md';

const badge = (v: string) => {
  const m: Record<string, string> = { pending: 'pending', 'in-progress': 'in-progress', completed: 'completed', low: 'low', medium: 'medium', high: 'high' };
  return `badge-status badge-${m[v] || 'pending'}`;
};

const fmt = (d: string) => new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

export default function GetMyTasksEmployee() {
  const [myTasks, setMyTasks] = useState<getAllTask[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get<getAllTask[]>(`${process.env.REACT_APP_BACKEND_URL}/task/getmine`, { withCredentials: true })
      .then((res) => setMyTasks(res.data))
      .catch(() => toast.error('Cannot get tasks'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="state-loading"><div className="state-spinner" /></div>;

  if (myTasks.length === 0)
    return (
      <div className="state-empty">
        <div className="state-empty-icon"><MdTask /></div>
        <p>No tasks assigned yet</p>
      </div>
    );

  return (
    <>
      {myTasks.map((task) => (
        <div key={task._id} className="data-card" onClick={() => navigate(`/employee/getOnetask/${task._id}`)}>          <div className="data-card-header">
            <h3 className="data-card-title">{task.name}</h3>
            <div style={{ display: 'flex', gap: '0.4rem', flexShrink: 0 }}>
              <span className={badge(task.priority)}>{task.priority}</span>
              <span className={badge(task.status)}>{task.status}</span>
            </div>
          </div>
          <div className="data-card-meta-row">
            <span className="data-card-meta"><span className="data-card-label">By</span>{task.createdBy.username}</span>
            <span className="data-card-meta"><span className="data-card-label">Due</span>{fmt(task.updatedAt)}</span>
          </div>
        </div>
      ))}
    </>
  );
}
