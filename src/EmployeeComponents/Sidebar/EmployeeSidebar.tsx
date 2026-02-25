import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function EmployeeSidebar() {
  const [isOpen, setIsOpen] = useState(true); // For mobile toggle

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
            <Link className="nav-link text-dark" to="/employee/dashboard">
              Dashboard
            </Link>
          </li>
          {/* <li className="nav-item mb-2">
            <Link className="nav-link text-dark" to="/profile">
              Profile
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link className="nav-link text-dark" to="/settings">
              Settings
            </Link>
          </li> */}

             <li className="nav-item mb-2">
    <Link className="nav-link text-dark" to="/employee/request">
      Requests
    </Link>
  </li>
  <li className="nav-item mb-2">
    <Link className="nav-link text-dark" to="/employee/task">
      Tasks
    </Link>
  </li>
  <li className="nav-item mb-2">
    <Link className="nav-link text-dark" to="/employee/reportIssues">
      Report Issues
    </Link>
  </li>


          <li className="nav-item mb-2">
            <Link className="nav-link text-dark" to="/logout">
              Logout
            </Link>
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
       
      </div>
    </div>
  );
}