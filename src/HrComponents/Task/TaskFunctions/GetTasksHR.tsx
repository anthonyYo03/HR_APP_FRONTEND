import { useState,useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getAllTask } from '../../../types/task';

export default function GetTasksHR() {
 const [tasks, setTasks] = useState<getAllTask[]>([]);
const navigate=useNavigate();
useEffect(() => {
  const fetchIssues = async () => {
  try {
    const res = await axios.get<getAllTask[] >(
      `${process.env.REACT_APP_BACKEND_URL}/task/getAll`,
      { withCredentials: true }
    );
    console.log("Task Response",res.data);
    setTasks(res.data);
  } catch (error) {
    toast.error("Cannot get Tasks");
    console.log("ISSUES ERROR:", error); 
  }
};
fetchIssues();
}, []);

  return (
   <>
    {tasks.length===0 && <p>No Tasks yet</p>}

    {tasks.map((task) => (
      <div key={task._id} className="card mb-3"  onClick={() => navigate(`/hr/oneTask/${task._id}`)}>
        {/* onClick={() => navigate(`/hr/oneTask/${task._id}`)} */}
        <div className="card-body">
          <h5 className="card-title"> <span>Task Name :</span> {task.name}</h5>
          <p className="card-text">   <span>Created By :</span> {task.createdBy.username}</p>
          <p className="card-text">   <span>Assigned to :</span> {task.assignedTo.username}</p>
           {/* <p className="card-text">   <span>Reported By :</span> {task.assignedTo.username}</p> */}
          <p className="card-text">   <span>Description :</span> {task.description}</p>
          <p className="card-text">   <span>Priority :</span> {task.priority}</p>
          <p className="card-text">   <span>Status :</span> {task.status}</p>
          <p className="card-text">   <span>Created At :</span> {task.createdAt}</p>
          <p className="card-text">   <span>Updated At :</span> {task.updatedAt}</p>
        </div>
      </div>
    ))}
  </>
  )
}
