import { useParams,useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { getRequest } from '../../../types/request';
import DeleteRequestEmployee from './DeleteRequestEmployee';

export default function GetOneRequestEmployee() {
  const [requests, setOneRequest] = useState<getRequest | null>(null);
  const [loading,setloading]=useState(false);
  const { id } = useParams();
  const navigate=useNavigate();
  const BackButton=()=>{
    navigate('/employee/request');
  }
  useEffect(() => {
    const fetchOneRequest = async () => {
        setloading(true);
      try {
        const res = await axios.get<getRequest>(
          `${process.env.REACT_APP_BACKEND_URL}/request/getOne/${id}`,
          { withCredentials: true }
        );
        setOneRequest(res.data);
        console.log(res.data);
      } catch (error) {
        toast.error("Cannot get Request");
      }
      finally{
        setloading(false);
      }
    };

     fetchOneRequest();
  }, [id]);

  if(loading) return <p>Getting Request...</p>
  if (!requests) return <p>Cannot get Request</p>;

  return (
<>

    
      <div key={requests._id} className="card mb-3" onClick={() => navigate(`/employee/getOneRequest/${requests._id}`)} >
        <div className="card-body">
          <h5 className="card-title"> <span>Reported By :</span> {requests.reportedBy.username}</h5>
          <p className="card-text">   <span>Leave Type :</span> {requests.leave_type}</p>
          <p className="card-text">   <span>Reason :</span> {requests.reason}</p>
          <p className="card-text">   <span>Status :</span> {requests.status}</p>
          <p className="card-text">   <span>Start Date :</span> {requests.start_date}</p>
          <p className="card-text">   <span>End Date :</span> {requests.end_date}</p>
          <p className="card-text">   <span>Approved By :</span> {requests.approvedBy?.username ||'Pending'}</p>
          <p className="card-text">   <span>Approved Date :</span> {requests?.approvedDate || 'Waiting for the Approval'}</p>
          <p className="card-text">   <span>Created At :</span> {requests.createdAt}</p>
          <p className="card-text">   <span>Updated At :</span> {requests.updatedAt}</p>
        </div>
      </div>
    
<button className='btn btn-secondary' onClick={()=>BackButton()}>Back</button>
<DeleteRequestEmployee id={requests._id}/>
</>
  )
}
