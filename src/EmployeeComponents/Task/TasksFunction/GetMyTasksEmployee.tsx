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

const EMP_TASK_STATUSES = ['all', 'pending', 'in-progress', 'completed'] as const;
const empTaskLabel = (s: string) => s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1);

export default function GetMyTasksEmployee() {
  const [myTasks, setMyTasks] = useState<getAllTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 5;
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get<getAllTask[]>(`${process.env.REACT_APP_BACKEND_URL}/task/getmine`, { withCredentials: true })
      .then((res) => setMyTasks(res.data))
      .catch(() => toast.error('Cannot get tasks'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="state-loading"><div className="state-spinner" /></div>;

  const filtered = filter === 'all' ? myTasks : myTasks.filter(t => t.status === filter);
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
        {EMP_TASK_STATUSES.map(s => (
          <button
            key={s}
            onClick={() => { setFilter(s); setPage(1); }}
            style={{
              padding: '0.35rem 0.9rem', borderRadius: '999px', fontSize: '0.8rem', cursor: 'pointer',
              border: filter === s ? '1px solid #e8c468' : '1px solid #2a2a30',
              background: filter === s ? '#e8c468' : '#18181b',
              color: filter === s ? '#18181b' : '#9a9490', fontWeight: filter === s ? 700 : 400,
              transition: 'all 0.15s',
            }}
          >{empTaskLabel(s)}</button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="state-empty">
          <div className="state-empty-icon"><MdTask /></div>
          <p>{myTasks.length === 0 ? 'No tasks assigned yet' : 'No tasks match this status.'}</p>
        </div>
      ) : paginated.map((task) => (
        <div key={task._id} className="data-card" onClick={() => navigate(`/employee/getOnetask/${task._id}`)}>          <div className="data-card-header">
            <h3 className="data-card-title">{task.name}</h3>
            <div style={{ display: 'flex', gap: '0.4rem', flexShrink: 0 }}>
              <span className={badge(task.priority)}>{task.priority}</span>
              <span className={badge(task.status)}>{task.status}</span>
            </div>
          </div>
          <div className="data-card-meta-row">
            <span className="data-card-meta"><span className="data-card-label">Assigned By</span>{task.createdBy.username}</span>
            <span className="data-card-meta"><span className="data-card-label">Due</span>{fmt(task.updatedAt)}</span>
          </div>
        </div>
      ))}
      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.75rem', marginTop: '1.25rem' }}>
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} style={{ padding: '0.35rem 0.8rem', borderRadius: '6px', border: '1px solid #2a2a30', background: page === 1 ? '#18181b' : '#232329', color: page === 1 ? '#555' : '#e8c468', cursor: page === 1 ? 'default' : 'pointer', fontWeight: 600, fontSize: '0.82rem' }}>Prev</button>
          <span style={{ color: '#9a9490', fontSize: '0.82rem' }}>Page {page} of {totalPages}</span>
          <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} style={{ padding: '0.35rem 0.8rem', borderRadius: '6px', border: '1px solid #2a2a30', background: page === totalPages ? '#18181b' : '#232329', color: page === totalPages ? '#555' : '#e8c468', cursor: page === totalPages ? 'default' : 'pointer', fontWeight: 600, fontSize: '0.82rem' }}>Next</button>
        </div>
      )}
    </>
  );
}
