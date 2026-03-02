import React, { useState, useEffect } from 'react';
import { useParams, useNavigate ,useLocation } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { CreateTask, getAllTask } from '../../../types/task';

interface User {
  _id: string;
  username: string;
}

export default function UpdateTaskHR() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();


  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [task, setTask] = useState<CreateTask | null>(null);

  // Fetch task data on mount
  useEffect(() => {
     const stateTask = location.state?.task as getAllTask | undefined;

      if (stateTask) {
    setTask({
      name: stateTask.name,
      description: stateTask.description,
      status: stateTask.status,
      dueDate: stateTask.dueDate,
      priority: stateTask.priority,
      assignedTo: stateTask.assignedTo,
    });
    return; // skip the API call
  }
    const fetchTask = async () => {
      try {
        const res = await axios.get<{ oneTask: getAllTask }>(
          `${process.env.REACT_APP_BACKEND_URL}/task/getOne/${id}`,
          { withCredentials: true }
        );
        const t = res.data.oneTask; // ← you're missing this
    setTask({                   // ← and this
      name: t.name,
      description: t.description,
      status: t.status,
      dueDate: t.dueDate,
      priority: t.priority,
      assignedTo: t.assignedTo,
    });

      } catch (err) {
        toast.error("Cannot load task");
      }
    };

    fetchTask();
  }, [id]);

  // Fetch all users for the dropdown
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get<User[]>(`${process.env.REACT_APP_BACKEND_URL}/user/all`, { withCredentials: true });
        setUsers(res.data);
      } catch {
        toast.error("Failed to load users");
      }
    };
    fetchUsers();
  }, []);

  const handleTaskUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!task) return;

    if (!task.name.trim() || !task.description.trim() || !task.dueDate.trim() || !task.assignedTo?._id) {
      toast.error("Please fill all the required fields");
      return;
    }

    try {
      setLoading(true);
      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/task/hrUpdate/${id}`,
        { ...task, assignedTo: task.assignedTo._id }, // send only ObjectId
        { withCredentials: true }
      );
      toast.success("Task updated Successfully");
      navigate(`/hr/oneTask/${id}`);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to update Task");
    } finally {
      setLoading(false);
    }
  };

  // Show loading while fetching task
  if (!task) return <p>Loading task...</p>;

  return (
    <form onSubmit={handleTaskUpdate}>
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
          value={task.assignedTo?._id || ''}
          onChange={(e) => {
            const selected = users.find((u) => u._id === e.target.value);
            if (selected) setTask({ ...task, assignedTo: selected });
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

      <button type="button" className="btn btn-secondary me-2" onClick={() => navigate(`/hr/oneTask/${id}`)}>
        Back
      </button>
      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? (
          <>
            <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true" />
            Updating Task...
          </>
        ) : (
          'Update Task'
        )}
      </button>
    </form>
  );
}