import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { getAllTask } from '../../../types/task';
import toast from 'react-hot-toast';
import UpdateTasksStatusEmployee from './UpdateTasksStatusEmployee';

const badge = (v: string) => {
  const m: Record<string, string> = { pending: 'pending', 'in-progress': 'in-progress', completed: 'completed', low: 'low', medium: 'medium', high: 'high' };
  return `badge-status badge-${m[v] || 'pending'}`;
};

const fmt = (d: string) => new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

export default function GetOneTaskEmployee() {
  const [task, setOneTask] = useState<getAllTask | null>(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get<getAllTask>(`${process.env.REACT_APP_BACKEND_URL}/task/getOne/${id}`, { withCredentials: true })
      .then((res) => setOneTask(res.data))
      .catch(() => toast.error('Cannot get task'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="state-loading"><div className="state-spinner" /></div>;
  if (!task) return <div className="state-empty"><p>Task not found</p></div>;

  return (
    <div className="page-root">
      <div className="page-header">
        <h2 className="page-title">{task.name}</h2>
        <button className="btn-ghost" onClick={() => navigate('/employee/task')}>Back</button>
      </div>
      <div className="detail-card">
        <div className="detail-grid">
          <div className="detail-field">
            <span className="detail-field-label">Status</span>
            <span className={badge(task.status)}>{task.status}</span>
          </div>
          <div className="detail-field">
            <span className="detail-field-label">Priority</span>
            <span className={badge(task.priority)}>{task.priority}</span>
          </div>
          <div className="detail-field">
            <span className="detail-field-label">Assigned By</span>
            <span className="detail-field-value">{task.createdBy.username}</span>
          </div>
          <div className="detail-field">
            <span className="detail-field-label">Assigned To</span>
            <span className="detail-field-value">{task.assignedTo.username}</span>
          </div>
          <div className="detail-field">
            <span className="detail-field-label">Created</span>
            <span className="detail-field-value">{fmt(task.createdAt)}</span>
          </div>
          <div className="detail-field">
            <span className="detail-field-label">Last Updated</span>
            <span className="detail-field-value">{fmt(task.updatedAt)}</span>
          </div>
          <div className="detail-field" style={{ gridColumn: '1 / -1' }}>
            <span className="detail-field-label">Description</span>
            <span className="detail-field-value" style={{ lineHeight: 1.6 }}>{task.description}</span>
          </div>
        </div>
      </div>
      <UpdateTasksStatusEmployee />
    </div>
  );
}
