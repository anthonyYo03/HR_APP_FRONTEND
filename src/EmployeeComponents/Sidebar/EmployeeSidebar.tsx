import { useState } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { MdAnnouncement, MdLogout, MdRequestPage, MdTask, MdReport, MdMenu, MdClose } from 'react-icons/md';
import { handleLogout } from '../../Logout/Logout';
import NotificationBell from '../../NotificationBell/NotificationBell';

export default function EmployeeSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const active = (path: string) => location.pathname.startsWith(path) ? 'active' : '';

  const close = () => setMobileOpen(false);

  return (
    <div className="app-layout">
      {mobileOpen && <div className="sidebar-overlay" onClick={close} />}
      <aside className={`app-sidebar ${mobileOpen ? 'open' : ''}`}>
        <div className="sidebar-brand">
          <h1 className="sidebar-brand-title">HR <span>Portal</span></h1>
          <NotificationBell />
        </div>
        <nav className="sidebar-nav">
          <Link className={`sidebar-link ${active('/employee/announcement')}`} to="/employee/announcement" onClick={close}>
            <MdAnnouncement size={19} /> Announcements
          </Link>
          <Link className={`sidebar-link ${active('/employee/request')}`} to="/employee/request" onClick={close}>
            <MdRequestPage size={19} /> Requests
          </Link>
          <Link className={`sidebar-link ${active('/employee/task')}`} to="/employee/task" onClick={close}>
            <MdTask size={19} /> Tasks
          </Link>
          <Link className={`sidebar-link ${active('/employee/reportIssue')}`} to="/employee/reportIssue" onClick={close}>
            <MdReport size={19} /> Report Issues
          </Link>
        </nav>
        <div className="sidebar-logout">
          <button className="sidebar-link" onClick={() => handleLogout(navigate)}>
            <MdLogout size={19} /> Logout
          </button>
        </div>
      </aside>

      <main className="app-content">
        <button
          className="sidebar-open-btn"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <MdClose size={22} /> : <MdMenu size={22} />}
        </button>
        <Outlet />
      </main>
    </div>
  );
}

