import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect,useState } from 'react';
import toast from 'react-hot-toast';
import { getRequest } from '../../../types/request';



export default function GetAllRequestsHR() {
 const [requests, setRequests] = useState<getRequest[]>([]);
const navigate=useNavigate();
useEffect(() => {
  const fetchRequests = async () => {
  try {
    const res = await axios.get<getRequest[] >(
      `${process.env.REACT_APP_BACKEND_URL}/request/getAll`,
      { withCredentials: true }
    );
    console.log("Request Response",res.data);
    setRequests(res.data);
  } catch (error) {
    toast.error("Cannot get requests");
    console.log("Request ERROR:", error); 
  }
};
fetchRequests();
}, []);

  return (
   <>
    {requests.length===0 && <p>No Requests yet</p>}

    {requests.map((requests) => (
      <div key={requests._id} className="card mb-3" onClick={() => navigate(`/hr/getOneRequest/${requests._id}`)} >
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
      
    ))}

  
  </>
  )
}
