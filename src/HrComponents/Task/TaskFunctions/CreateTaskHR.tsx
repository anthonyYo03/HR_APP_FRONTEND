import axios from 'axios';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { CreateTask } from '../../../types/task';

interface User { _id: string; username: string; }

export default function CreateTaskHR() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [task, setTask] = useState<CreateTask>({
    name: '', description: '', status: 'pending', dueDate: '', priority: 'medium',
    assignedTo: { _id: '', username: '' },
  });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/user/all`, { withCredentials: true })
      .then((res) => setUsers(res.data))
      .catch(() => toast.error('Failed to load users'));
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!task.name.trim() || !task.description.trim() || !task.dueDate.trim() || !task.assignedTo._id) {
      toast.error('Please fill all required fields'); return;
    }
    setLoading(true);
    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/task/create`,
        { ...task, assignedTo: task.assignedTo._id },
        { withCredentials: true }
      );
      toast.success('Task created successfully');
      navigate('/hr/task');
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Failed to create task');
    } finally {
      setLoading(false);
    }
  };

  const priorities: CreateTask['priority'][] = ['low', 'medium', 'high'];

  return (
    <div className="page-root">
      <div className="page-header">
        <h2 className="page-title">Create <span>Task</span></h2>
        <button className="btn-ghost" onClick={() => navigate('/hr/task')}>â† Cancel</button>
      </div>
      <div className="form-card">
        <form onSubmit={handleCreate}>
          <div className="form-field">
            <label className="form-lbl">Task Name</label>
            <input className="form-inp" type="text" placeholder="Enter task name" value={task.name}
              onChange={(e) => setTask({ ...task, name: e.target.value })} disabled={loading} />
          </div>
          <div className="form-field">
            <label className="form-lbl">Description</label>
            <textarea className="form-inp" placeholder="Describe the task" rows={4} value={task.description}
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
            <input className="form-inp" type="date" value={task.dueDate}
              onChange={(e) => setTask({ ...task, dueDate: e.target.value })} disabled={loading} />
          </div>
          <div className="form-field">
            <label className="form-lbl">Assign To</label>
            <select
              className="form-inp form-inp-select"
              value={task.assignedTo._id}
              onChange={(e) => {
                const u = users.find((x) => x._id === e.target.value);
                if (u) setTask({ ...task, assignedTo: { _id: u._id, username: u.username } });
              }}
              disabled={loading}
            >
              <option value="">-- Select employee --</option>
              {users.map((u) => <option key={u._id} value={u._id}>{u.username}</option>)}
            </select>
          </div>
          <div className="form-actions">
            <button type="button" className="btn-ghost" onClick={() => navigate('/hr/task')} disabled={loading}>Cancel</button>
            <button type="submit" className="btn-gold" disabled={loading}>
              {loading && <span className="btn-spinner" />}
              {loading ? 'Creating...' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
