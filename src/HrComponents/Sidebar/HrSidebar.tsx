import { useState } from "react";
import { Link,Outlet,useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { MdAnnouncement } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import { MdRequestPage } from "react-icons/md";
import { MdTask } from "react-icons/md";
import { MdReport } from "react-icons/md";
import { handleLogout } from "../../Logout/Logout";


export default function HrSidebar() {
  const [isOpen, setIsOpen] = useState(true); // For mobile toggle

  const navigate=useNavigate();
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div
        className={`bg-light border-end p-3 ${
          isOpen ? "d-block" : "d-none d-md-block"
        }`}
        style={{ width: "250px", minHeight: "100vh" }}
      >
        <h4 className="mb-4">My App</h4>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <Link className="nav-link text-dark" to="/hr/dashboard">
              <MdDashboard size={22} />
              Dashboard
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link className="nav-link text-dark" to="/hr/announcement">
            <MdAnnouncement size={22} />
              Announcements
            </Link>
          </li>

             <li className="nav-item mb-2">
    <Link className="nav-link text-dark" to="/hr/request">
    <MdRequestPage size={22} />
      Requests
    </Link>
  </li>
  <li className="nav-item mb-2">
    <Link className="nav-link text-dark" to="/hr/task">
    <MdTask size={22}/>
      Tasks
    </Link>
  </li>
  <li className="nav-item mb-2">
    <Link className="nav-link text-dark" to="/hr/reportIssue">
    <MdReport size={22}/>
      Report Issues
    </Link>
  </li>


          <li className="nav-item mb-2">
            <span className="nav-link text-dark"
             style={{ cursor: "pointer" }}
             onClick={() => handleLogout(navigate)}>
            <MdLogout size={22}/>
              Logout
            </span>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1">
        {/* Mobile toggle button */}
        <button
          className="btn btn-primary d-md-none m-2"
          onClick={toggleSidebar}
        >
          {isOpen ? "Close Menu" : "Open Menu"}
        </button>
       <Outlet />
      </div>
    </div>
  );
}