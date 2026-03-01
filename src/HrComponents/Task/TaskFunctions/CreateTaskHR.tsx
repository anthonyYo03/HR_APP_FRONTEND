import axios from 'axios';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { CreateTask } from '../../../types/task';

interface User {
  _id: string;
  username: string;
}

export default function CreateTaskHR() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const [task, setTask] = useState<CreateTask>({
    name: '',
    description: '',
    status: 'pending',
    dueDate: '',
    priority: 'medium',
    assignedTo: {
      _id: '',
      username: ''
    }
  });

  // Fetch all users on mount
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/user/all`, { withCredentials: true })
      .then((res) => setUsers(res.data))
      .catch(() => toast.error("Failed to load users"));
  }, []);

  const handleTaskCreation = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!task.name.trim() || !task.description.trim() || !task.dueDate.trim() || !task.assignedTo._id) {
      toast.error("Please fill all the required fields");
      return;
    }

    try {
      setLoading(true);
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/task/create`,
        { ...task, assignedTo: task.assignedTo._id }, // send only the ObjectId
        { withCredentials: true }
      );
      toast.success("Task Created Successfully");
      navigate('/hr/task');
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to create Task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleTaskCreation}>
        {/* Task Name */}
        <div className="mb-3">
          <label className="form-label">Task Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter title ..."
            value={task.name}
            onChange={(e) => setTask({ ...task, name: e.target.value })}
          />
        </div>

        {/* Description */}
        <div className="mb-3">
          <label className="form-label">Description</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter description ..."
            value={task.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
          />
        </div>

        {/* Priority */}
        <div className="btn-group mb-3" role="group">
          {(['low', 'medium', 'high'] as const).map((p) => (
            <React.Fragment key={p}>
              <input
                type="radio"
                className="btn-check"
                name="priority"
                id={`priority-${p}`}
                value={p}
                checked={task.priority === p}
                onChange={(e) => setTask({ ...task, priority: e.target.value as CreateTask['priority'] })}
                disabled={loading}
              />
              <label className="btn btn-outline-primary" htmlFor={`priority-${p}`}>
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </label>
            </React.Fragment>
          ))}
        </div>

        {/* Due Date */}
        <div className="mb-3">
          <label className="form-label">Due Date</label>
          <input
            type="date"
            className="form-control"
            value={task.dueDate}
            onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
          />
        </div>

        {/* Assigned To Dropdown */}
        <div className="mb-3">
          <label className="form-label">Assigned To</label>
          <select
            className="form-select"
            value={task.assignedTo._id}
            onChange={(e) => {
              const selected = users.find((u) => u._id === e.target.value);
              if (selected) {
                setTask({ ...task, assignedTo: { _id: selected._id, username: selected.username } });
              }
            }}
          >
            <option value="">-- Select a user --</option>
            {users.map((u) => (
              <option key={u._id} value={u._id}>
                {u.username}
              </option>
            ))}
          </select>
        </div>

        <button type="button" className="btn btn-secondary me-2" onClick={() => navigate('/hr/task')}>
          Back
        </button>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true" />
              Creating Task...
            </>
          ) : (
            'Create Task'
          )}
        </button>
      </form>
    </>
  );
}