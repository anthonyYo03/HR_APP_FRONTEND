import { useState,useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { myIssues } from "../../../types/Issues";
import DeleteIssue from "./DeleteIssue";


export default function GetOneIssue() {
  const [issue, setOneIssue] = useState<myIssues | null>(null);
  const [loading,setloading]=useState(false);
  const { id } = useParams();
  const navigate=useNavigate();
  const BackButton=()=>{
    navigate('/employee/reportIssue')
  }
  useEffect(() => {
    const fetchOneIssue = async () => {
        setloading(true);
      try {
        const res = await axios.get<myIssues>(
          `${process.env.REACT_APP_BACKEND_URL}/reportIssue/getOne/${id}`,
          { withCredentials: true }
        );
        setOneIssue(res.data);
      } catch (error) {
        toast.error("Cannot get announcement");
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
        <h5 className="card-title">{issue.title}</h5>
        <p className="card-text">{issue.description}</p>
         <p className="card-text">{issue.priority}</p>
          <p className="card-text">{issue.status}</p>
      </div>
    </div>
    
<button className='btn btn-secondary' onClick={()=>{BackButton()}}>Back</button>
<DeleteIssue id={issue._id}/>
</>
  );

}
