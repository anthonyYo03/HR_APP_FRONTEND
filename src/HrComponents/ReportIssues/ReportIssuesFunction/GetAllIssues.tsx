import { useState,useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { allIssues } from "../../../types/Issues";
import { useNavigate } from "react-router-dom";

export default function GetAllIssues() {
 const [allIssues, setAllIssues] = useState<allIssues[]>([]);
const navigate=useNavigate();
useEffect(() => {
  const fetchIssues = async () => {
  try {
    const res = await axios.get<allIssues[] >(
      `${process.env.REACT_APP_BACKEND_URL}/reportIssue/getAll`,
      { withCredentials: true }
    );
    console.log("Issue Response",res.data);
    setAllIssues(res.data);
  } catch (error) {
    toast.error("Cannot get issues");
    console.log("ISSUES ERROR:", error); 
  }
};
fetchIssues();
}, []);

  return (
   <>
    {allIssues.length===0 && <p>No issues yet</p>}

    {allIssues.map((issues) => (
      <div key={issues._id} className="card mb-3" onClick={() => navigate(`/hr/oneIssue/${issues._id}`)} >
        <div className="card-body">
          <h5 className="card-title"> <span>Title :</span> {issues.title}</h5>
           <p className="card-text">   <span>Reported By :</span> {issues.reportedBy.username}</p>
          <p className="card-text">   <span>Description :</span> {issues.description}</p>
          <p className="card-text">   <span>Priority :</span> {issues.priority}</p>
          <p className="card-text">   <span>Status :</span> {issues.status}</p>
          <p className="card-text">   <span>Created At :</span> {issues.createdAt}</p>
          <p className="card-text">   <span>Updated At :</span> {issues.updatedAt}</p>
        </div>
      </div>
    ))}
  </>
  )
}
// reportedBy:{
//     _id:string
//     username:string

// }

// createdAt:string;
// updatedAt: string;