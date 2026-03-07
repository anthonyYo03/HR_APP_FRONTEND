import { useState } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { MdDashboard, MdAnnouncement, MdLogout, MdRequestPage, MdTask, MdReport, MdMenu } from 'react-icons/md';
import { handleLogout } from '../../Logout/Logout';
import NotificationBell from '../../NotificationBell/NotificationBell';

export default function HrSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const active = (path: string) => location.pathname.startsWith(path) ? 'active' : '';

  return (
    <div className="app-layout">
      {mobileOpen && <div className="sidebar-backdrop" onClick={() => setMobileOpen(false)} />}
      <aside className={`app-sidebar ${mobileOpen ? 'open' : ''}`}>
        <div className="sidebar-brand">
          <h1 className="sidebar-brand-title">HR <span>Portal</span></h1>
          <NotificationBell />
        </div>
        <nav className="sidebar-nav">
          <Link className={`sidebar-link ${active('/hr/dashboard')}`} to="/hr/dashboard" onClick={() => setMobileOpen(false)}>
            <MdDashboard size={19} /> Dashboard
          </Link>
          <Link className={`sidebar-link ${active('/hr/announcement')}`} to="/hr/announcement" onClick={() => setMobileOpen(false)}>
            <MdAnnouncement size={19} /> Announcements
          </Link>
          <Link className={`sidebar-link ${active('/hr/request')}`} to="/hr/request" onClick={() => setMobileOpen(false)}>
            <MdRequestPage size={19} /> Requests
          </Link>
          <Link className={`sidebar-link ${active('/hr/task')}`} to="/hr/task" onClick={() => setMobileOpen(false)}>
            <MdTask size={19} /> Tasks
          </Link>
          <Link className={`sidebar-link ${active('/hr/reportIssue')}`} to="/hr/reportIssue" onClick={() => setMobileOpen(false)}>
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
          <MdMenu size={22} />
        </button>
        <Outlet />
      </main>
    </div>
  );
}
