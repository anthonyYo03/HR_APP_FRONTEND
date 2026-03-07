import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { MdNotifications } from 'react-icons/md';
import { Notification } from '../types/notification';
import socket from './socketClient';

const API = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

export default function NotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 5;
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
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  return (
    <div ref={dropdownRef} className="notif-wrapper">
      <button className="notif-btn" onClick={() => setIsOpen((prev) => !prev)} aria-label="Notifications">
        <MdNotifications size={22} />
        {unreadCount > 0 && (
          <span className="notif-badge">{unreadCount > 99 ? '99+' : unreadCount}</span>
        )}
      </button>

      {isOpen && (
        <div className="notif-dropdown">
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
      )}
    </div>
  );
}
