import EditIssueStatus from "./EditIssueStatus";
import { useState,useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { allIssues } from "../../../types/Issues";


export default function GetOneIssueHr() {
 const [issue, setOneIssue] = useState<allIssues | null>(null);
  const [loading,setloading]=useState(false);
  const { id } = useParams();
  const navigate=useNavigate();
  const BackButton=()=>{
    navigate('/hr/reportIssue')
  }
  useEffect(() => {
    const fetchOneIssue = async () => {
        setloading(true);
      try {
        const res = await axios.get<allIssues>(
          `${process.env.REACT_APP_BACKEND_URL}/reportIssue/getOne/${id}`,
          { withCredentials: true }
        );
        setOneIssue(res.data);
      } catch (error) {
        toast.error("Cannot get Issue");
      }
      finally{
        setloading(false);
      }
    };

    fetchOneIssue();
  }, [id]);

  if(loading) return <p>Getting Issue...</p>
  if (!issue) return <p>Cannot get Issue</p>;

  return (
<>
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title"> <span>Title : </span> {issue.title}</h5>
        <p className="card-text"> <span>Description : </span> {issue.description}</p>
         <p className="card-text"> <span>Priority : </span> {issue.priority}</p>
          <p className="card-text"> <span>Status : </span> {issue.status}</p>
          <p className="card-text"> <span>Reported By : </span> {issue.reportedBy.username}</p>
          <p className="card-text"><span>Created At : </span> {issue.createdAt}</p>
          <p className="card-text"> <span>Updated At : </span> {issue.updatedAt}</p>

      </div>
    </div>






    
    
<button className='btn btn-secondary' onClick={()=>{BackButton()}}>Back</button>
<EditIssueStatus id={issue._id}/>
</>
  );
}
