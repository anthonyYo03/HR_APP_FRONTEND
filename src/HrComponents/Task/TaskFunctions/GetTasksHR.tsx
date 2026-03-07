import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getAllTask } from '../../../types/task';
import { MdTask } from 'react-icons/md';

const badge = (v: string) => {
  const m: Record<string, string> = {
    pending: 'pending', 'in-progress': 'in-progress', completed: 'completed',
    low: 'low', medium: 'medium', high: 'high',
  };
  return `badge-status badge-${m[v] || 'pending'}`;
};

const fmt = (d: string) => new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

export default function GetTasksHR() {
  const [tasks, setTasks] = useState<getAllTask[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get<getAllTask[]>(`${process.env.REACT_APP_BACKEND_URL}/task/getAll`, { withCredentials: true })
      .then((res) => setTasks(res.data))
      .catch(() => toast.error('Cannot get tasks'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="state-loading"><div className="state-spinner" /></div>;

  if (tasks.length === 0)
    return (
      <div className="state-empty">
        <div className="state-empty-icon"><MdTask /></div>
        <p>No tasks yet. Create the first one!</p>
      </div>
    );

  return (
    <>
      {tasks.map((t) => (
        <div key={t._id} className="data-card" onClick={() => navigate(`/hr/oneTask/${t._id}`)}>
          <div className="data-card-header">
            <h3 className="data-card-title">{t.name}</h3>
            <div style={{ display: 'flex', gap: '0.4rem', flexShrink: 0 }}>
              <span className={badge(t.priority)}>{t.priority}</span>
              <span className={badge(t.status)}>{t.status}</span>
            </div>
          </div>
          <p className="data-card-meta" style={{ color: '#9a9490', margin: '0 0 0.5rem', fontSize: '0.825rem' }}>
            {t.description.length > 100 ? t.description.slice(0, 100) + 'â€¦' : t.description}
          </p>
          <div className="data-card-meta-row">
            <span className="data-card-meta">
              <span className="data-card-label">Assigned to</span>{t.assignedTo?.username}
            </span>
            <span className="data-card-meta">
              <span className="data-card-label">Created by</span>{t.createdBy?.username}
            </span>
            <span className="data-card-meta">
              <span className="data-card-label">Due</span>{fmt(t.dueDate)}
            </span>
          </div>
        </div>
      ))}
    </>
  );
}
