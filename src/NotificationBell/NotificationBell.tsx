import { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { MdNotifications } from 'react-icons/md';
import { Notification } from '../types/notification';
import socket from './socketClient';

const API = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

export default function NotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, maxHeight: 420 });
  const PAGE_SIZE = 5;
  const wrapperRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const notifTotalPages = Math.ceil(notifications.length / PAGE_SIZE);
  const paginatedNotifs = notifications.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Load persisted notifications on mount
  useEffect(() => {
    axios
      .get<{ notifications: Notification[] }>(`${API}/notification/get`, {
        withCredentials: true,
      })
      .then((res) => setNotifications(res.data.notifications))
      .catch(() => {});
  }, []);

  // Listen for real-time notifications
  useEffect(() => {
    const handler = (notification: Notification) => {
      setNotifications((prev) => [notification, ...prev]);
    };
    socket.on('new-notification', handler);
    return () => {
      socket.off('new-notification', handler);
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current && !wrapperRef.current.contains(e.target as Node) &&
        dropdownRef.current && !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = () => {
    if (!isOpen && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      const dropdownWidth = Math.min(340, window.innerWidth - 16);
      // Align left edge of dropdown with left edge of button, then clamp to viewport
      let left = rect.left;
      if (left + dropdownWidth > window.innerWidth - 8) {
        left = window.innerWidth - dropdownWidth - 8;
      }
      if (left < 8) left = 8;
      const top = rect.bottom + 10;
      const maxHeight = Math.max(200, window.innerHeight - top - 16);
      setDropdownPos({ top, left, maxHeight });
    }
    setIsOpen((prev) => !prev);
  };

  const markAsRead = async (id: string) => {
    try {
      await axios.put(`${API}/notification/markAsRead/${id}`, {}, { withCredentials: true });
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
      );
    } catch {}
  };

  const clearAll = async () => {
    try {
      await axios.put(`${API}/notification/clear`, {}, { withCredentials: true });
      setNotifications([]);
    } catch {}
  };

  const dropdownPortal = isOpen ? (
    <div
      ref={dropdownRef}
      className="notif-dropdown"
      style={{ position: 'fixed', top: dropdownPos.top, left: dropdownPos.left, maxHeight: dropdownPos.maxHeight, width: Math.min(340, window.innerWidth - 16) }}
    >
      <div className="notif-header">
        <span className="notif-header-title">Notifications</span>
        {notifications.length > 0 && (
          <button className="notif-clear-btn" onClick={clearAll}>Clear all</button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="notif-empty">No notifications</div>
      ) : (
        <>
          {paginatedNotifs.map((n) => (
            <div key={n._id} className={`notif-item${n.isRead ? '' : ' unread'}`}>
              <div className="notif-item-title-row">
                <span className={`notif-item-title${n.isRead ? ' read' : ''}`}>{n.title}</span>
                {!n.isRead && (
                  <button className="notif-mark-btn" onClick={() => markAsRead(n._id)}>
                    Mark as read
                  </button>
                )}
              </div>
              <span className="notif-item-msg">{n.message}</span>
              <span className="notif-item-time">{new Date(n.createdAt).toLocaleString()}</span>
            </div>
          ))}
          {notifTotalPages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 0.75rem 0.25rem', borderTop: '1px solid #2a2a30' }}>
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} style={{ padding: '0.2rem 0.6rem', borderRadius: '4px', border: '1px solid #2a2a30', background: page === 1 ? '#18181b' : '#232329', color: page === 1 ? '#555' : '#e8c468', cursor: page === 1 ? 'default' : 'pointer', fontSize: '0.75rem', fontWeight: 600 }}>Prev</button>
              <span style={{ color: '#9a9490', fontSize: '0.75rem' }}>Page {page} of {notifTotalPages}</span>
              <button onClick={() => setPage(p => Math.min(notifTotalPages, p + 1))} disabled={page === notifTotalPages} style={{ padding: '0.2rem 0.6rem', borderRadius: '4px', border: '1px solid #2a2a30', background: page === notifTotalPages ? '#18181b' : '#232329', color: page === notifTotalPages ? '#555' : '#e8c468', cursor: page === notifTotalPages ? 'default' : 'pointer', fontSize: '0.75rem', fontWeight: 600 }}>Next</button>
            </div>
          )}
        </>
      )}
    </div>
  ) : null;

  return (
    <div ref={wrapperRef} className="notif-wrapper">
      <button ref={btnRef} className="notif-btn" onClick={handleToggle} aria-label="Notifications">
        <MdNotifications size={22} />
        {unreadCount > 0 && (
          <span className="notif-badge">{unreadCount > 99 ? '99+' : unreadCount}</span>
        )}
      </button>

      {ReactDOM.createPortal(dropdownPortal, document.body)}
    </div>
  );
}
