import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { CreateTask, getAllTask } from '../../../types/task';

interface User { _id: string; username: string; }

export default function UpdateTaskHR() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [task, setTask] = useState<CreateTask | null>(null);

  useEffect(() => {
    const stateTask = location.state?.task as getAllTask | undefined;
    if (stateTask) {
      setTask({ name: stateTask.name, description: stateTask.description, status: stateTask.status,
        dueDate: stateTask.dueDate, priority: stateTask.priority, assignedTo: stateTask.assignedTo });
      return;
    }
    axios
      .get<{ oneTask: getAllTask }>(`${process.env.REACT_APP_BACKEND_URL}/task/getOne/${id}`, { withCredentials: true })
      .then((res) => {
        const t = res.data.oneTask;
        setTask({ name: t.name, description: t.description, status: t.status,
          dueDate: t.dueDate, priority: t.priority, assignedTo: t.assignedTo });
      })
      .catch(() => toast.error('Cannot load task'));
  }, [id]);

  useEffect(() => {
    axios.get<User[]>(`${process.env.REACT_APP_BACKEND_URL}/user/all`, { withCredentials: true })
      .then((res) => setUsers(res.data))
      .catch(() => toast.error('Failed to load users'));
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!task) return;
    if (!task.name.trim() || !task.description.trim() || !task.dueDate.trim() || !task.assignedTo?._id) {
      toast.error('Please fill all required fields'); return;
    }
    setLoading(true);
    try {
      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/task/hrUpdate/${id}`,
        { ...task, assignedTo: task.assignedTo._id },
        { withCredentials: true }
      );
      toast.success('Task updated successfully');
      navigate('/hr/task');
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Failed to update task');
    } finally {
      setLoading(false);
    }
  };

  if (!task) return <div className="state-loading"><div className="state-spinner" /></div>;

  const priorities: CreateTask['priority'][] = ['low', 'medium', 'high'];

  return (
    <div className="page-root">
      <div className="page-header">
        <h2 className="page-title">Edit <span>Task</span></h2>
        <button className="btn-ghost" onClick={() => navigate('/hr/task')}>â† Cancel</button>
      </div>
      <div className="form-card">
        <form onSubmit={handleUpdate}>
          <div className="form-field">
            <label className="form-lbl">Task Name</label>
            <input className="form-inp" type="text" placeholder="Task name" value={task.name}
              onChange={(e) => setTask({ ...task, name: e.target.value })} disabled={loading} />
          </div>
          <div className="form-field">
            <label className="form-lbl">Description</label>
            <textarea className="form-inp" rows={4} value={task.description}
              onChange={(e) => setTask({ ...task, description: e.target.value })} disabled={loading}
              style={{ resize: 'vertical' }} />
          </div>
          <div className="form-field">
            <label className="form-lbl">Priority</label>
            <div className="form-radio-group">
              {priorities.map((p) => (
                <React.Fragment key={p}>
                  <input type="radio" className="form-radio-hidden" name="priority" id={`pr-${p}`}
                    value={p} checked={task.priority === p}
                    onChange={(e) => setTask({ ...task, priority: e.target.value as CreateTask['priority'] })} />
                  <label className="form-radio-label" htmlFor={`pr-${p}`}>
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </label>
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="form-field">
            <label className="form-lbl">Due Date</label>
            <input className="form-inp" type="date" value={task.dueDate?.split('T')[0] || ''}
              onChange={(e) => setTask({ ...task, dueDate: e.target.value })} disabled={loading} />
          </div>
          <div className="form-field">
            <label className="form-lbl">Assign To</label>
            <select className="form-inp form-inp-select" value={task.assignedTo?._id || ''}
              onChange={(e) => {
                const u = users.find((x) => x._id === e.target.value);
                if (u) setTask({ ...task, assignedTo: { _id: u._id, username: u.username } });
              }} disabled={loading}>
              <option value="">-- Select employee --</option>
              {users.map((u) => <option key={u._id} value={u._id}>{u.username}</option>)}
            </select>
          </div>
          <div className="form-actions">
            <button type="button" className="btn-ghost" onClick={() => navigate('/hr/task')} disabled={loading}>Cancel</button>
            <button type="submit" className="btn-gold" disabled={loading}>
              {loading && <span className="btn-spinner" />}
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
