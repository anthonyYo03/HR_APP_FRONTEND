import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { MdNotifications } from 'react-icons/md';
import { Notification } from '../types/notification';
import socket from './socketClient';

const API = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

export default function NotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

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
            notifications.map((n) => (
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
            ))
          )}
        </div>
      )}
    </div>
  );
}
