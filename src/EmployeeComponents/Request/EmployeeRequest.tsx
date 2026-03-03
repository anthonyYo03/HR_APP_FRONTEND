import { useNavigate } from "react-router-dom"
import GetMyRequestsEmployee from "./RequestFunctions/GetMyRequestsEmployee";
export default function EmployeeRequest() {
  const navigate=useNavigate();
  return (
    <>
    <div>EmployeeRequest</div>
    <GetMyRequestsEmployee/>
    <button onClick={()=>{navigate('/employee/createRequest')}}>+</button>
    </>
  )
}
