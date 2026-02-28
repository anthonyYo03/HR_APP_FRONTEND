import { myIssues } from "../../../types/Issues";
import { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


export default function GetMyIssues() {
 const [issues, setIssues] = useState<myIssues[]>([]);
const navigate=useNavigate();
useEffect(() => {
  const fetchIssues = async () => {
  try {
    const res = await axios.get<myIssues[] >(
      `${process.env.REACT_APP_BACKEND_URL}/reportIssue/getMyissues`,
      { withCredentials: true }
    );
    console.log("Issue Response",res.data);
    setIssues(res.data);
  } catch (error) {
    toast.error("Cannot get issues");
    console.log("ISSUES ERROR:", error); 
  }
};
fetchIssues();
}, []);

  return (
   <>
    {issues.length===0 && <p>No issues yet</p>}

    {issues.map((issues) => (
      <div key={issues._id} className="card mb-3" onClick={() => navigate(`/employee/oneIssue/${issues._id}`)} >
        <div className="card-body">
          <h5 className="card-title">{issues.title}</h5>
          <p className="card-text">{issues.description}</p>
          <p className="card-text">{issues.priority}</p>
          <p className="card-text">{issues.status}</p>
        </div>
      </div>
    ))}
  </>
  )
}



///getMyissues router.get('/getMyissues',verifyToken,IssuesControllers.getMyIssues);