import axios from 'axios'
import { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getAllTask } from '../../../types/task';
import toast from 'react-hot-toast';

export default function GetMyTasksEmployee() {

const [myTasks, setMyTasks] = useState<getAllTask[]>([]);
const navigate=useNavigate();
useEffect(() => {
  const fetchMyTasks = async () => {
  try {
    const res = await axios.get<getAllTask[] >(
      `${process.env.REACT_APP_BACKEND_URL}/task/getmine`,
      { withCredentials: true }
    );
    console.log("Task Response",res.data);
    setMyTasks(res.data);
  } catch (error) {
    toast.error("Cannot get Tasks");
    console.log("ISSUES ERROR:", error); 
  }
};
fetchMyTasks();
}, []);

  return (
   <>
    {myTasks.length===0 && <p>No Tasks yet</p>}

    {myTasks.map((myTasks) => (
      <div key={myTasks._id} className="card mb-3" onClick={() => navigate(`/employee/getOnetask/${myTasks._id}`)} >
        <div className="card-body">
          <h5 className="card-title"> <span>Title :</span> {myTasks.name}</h5>
           <h5 className="card-title"> <span>Created By :</span> {myTasks.assignedTo.username}</h5>
          <p className="card-text">   <span>Description :</span> {myTasks.description}</p>
          <p className="card-text">   <span>Priority :</span> {myTasks.priority}</p>
          <p className="card-text">   <span>Status :</span> {myTasks.status}</p>
          <p className="card-text">   <span>Created At :</span> {myTasks.createdAt}</p>
          <p className="card-text">   <span>Updated At :</span> {myTasks.updatedAt}</p>
        </div>
      </div>
    ))}
  </>
  )
}
