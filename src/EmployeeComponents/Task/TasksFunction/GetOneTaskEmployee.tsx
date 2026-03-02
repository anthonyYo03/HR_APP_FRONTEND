import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import { useParams,useNavigate } from 'react-router-dom';
import { getAllTask } from '../../../types/task';
import toast from 'react-hot-toast';


// interface GetOneTaskResponseEmployee {
//   myrequests: getAllTask;
// }


export default function GetOneTaskEmployee() {
 const [task, setOneTask] = useState<getAllTask | null>(null);
  const [loading,setloading]=useState(false);
  const { id } = useParams();
  const navigate=useNavigate();
  const BackButton=()=>{
    navigate('/employee/task');
  }
  useEffect(() => {
    const fetchOneTask = async () => {
        setloading(true);
      try {
        const res = await axios.get<getAllTask>(
          `${process.env.REACT_APP_BACKEND_URL}/task/getOne/${id}`,
          { withCredentials: true }
        );
        setOneTask(res.data);
        console.log(res.data);
      } catch (error) {
        toast.error("Cannot get Task");
      }
      finally{
        setloading(false);
      }
    };

     fetchOneTask();
  }, [id]);

  if(loading) return <p>Getting Task...</p>
  if (!task) return <p>Cannot get Task</p>;

  return (
<>
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title"> <span>Title : </span> {task.name}</h5>
        <p className="card-text"> <span>Description : </span> {task.description}</p>
         <p className="card-text"> <span>Priority : </span> {task.priority}</p>
          <p className="card-text"> <span>Status : </span> {task.status}</p>
          <p className="card-text"> <span>Created By : </span> {task.createdBy.username}</p>
          <p className="card-text"> <span>Assigned to : </span> {task.assignedTo.username}</p>
          <p className="card-text"><span>Created At : </span> {task.createdAt}</p>
          <p className="card-text"> <span>Updated At : </span> {task.updatedAt}</p>

      </div>
    </div>






    
    
<button className='btn btn-secondary' onClick={()=>{BackButton()}}>Back</button>
{/* <button onClick={() => navigate(`/hr/editOneTask/${id}`, { state: { task } })}>Update</button> */}


</>
  )
}
