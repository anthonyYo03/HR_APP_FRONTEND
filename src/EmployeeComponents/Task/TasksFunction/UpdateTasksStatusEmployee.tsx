import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { updateTaskStatus } from '../../../types/task';

export default function UpdateTasksStatusEmployee() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<updateTaskStatus>({ status: 'pending' });

const BackButton=()=>{
  navigate(`/employee/getOnetask/${id}`);
}


  const updateStatus = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/task/employeeUpdate/${id}`,
        status,
        { withCredentials: true }
      );

      toast.success("Task status updated successfully");
      navigate('/employee/task');

    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={updateStatus}>
      
      <div className="dropdown mb-3">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
        >
          {status.status}
        </button>

        <ul className="dropdown-menu">
          <li>
            <button
              type="button"
              className="dropdown-item"
              onClick={() => setStatus({ status: 'pending' })}
            >
              Pending
            </button>
          </li>

          <li>
            <button
              type="button"
              className="dropdown-item"
              onClick={() => setStatus({ status: 'in-progress' })}
            >
              In Progress
            </button>
          </li>

          <li>
            <button
              type="button"
              className="dropdown-item"
              onClick={() => setStatus({ status: 'completed' })}
            >
              Completed
            </button>
          </li>
        </ul>
      </div>

      <button
        type="submit"
        className="btn btn-primary"
        disabled={loading}
      >
        {loading ? "Updating..." : "Update Status"}
      </button>
     <button onClick={()=>{BackButton()}} className='btn btn-secondary' >Back</button>
    </form>
  );
}