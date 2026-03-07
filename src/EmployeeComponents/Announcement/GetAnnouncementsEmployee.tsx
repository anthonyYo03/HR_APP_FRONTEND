import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAnnouncement } from '../../types/announcement';
import axios from 'axios';
import { MdAnnouncement, MdSearch } from 'react-icons/md';

const fmt = (d: string) => new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

const PAGE_SIZE = 5;

export default function GetAnnouncementEmployee() {
  const [announcements, setAnnouncements] = useState<getAnnouncement[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get<getAnnouncement[]>(`${process.env.REACT_APP_BACKEND_URL}/announcement/getAll`, { withCredentials: true })
      .then((res) => setAnnouncements(res.data))
      .catch(() => toast.error('Cannot get announcements'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="state-loading"><div className="state-spinner" /></div>;

  if (announcements.length === 0)
    return (
      <div className="state-empty">
        <div className="state-empty-icon"><MdAnnouncement /></div>
        <p>No announcements yet</p>
      </div>
    );

  const totalPages = Math.ceil(announcements.length / PAGE_SIZE);
  const paginated = announcements.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const searchResults = search.trim()
    ? announcements.filter(a =>
        a.title.toLowerCase().includes(search.toLowerCase()) ||
        a.description.toLowerCase().includes(search.toLowerCase())
      ).slice(0, 6)
    : [];

  return (
    <div className="page-root">
      <div className="page-header">
        <h2 className="page-title">Announcements</h2>
      </div>
      <div style={{ position: 'relative', marginBottom: '1rem' }}>
        <MdSearch style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9a9490', fontSize: '1.1rem', pointerEvents: 'none' }} />
        <input
          type="text"
          placeholder="Search announcements..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setShowDropdown(true); }}
          onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
          onFocus={() => { if (search) setShowDropdown(true); }}
          style={{ width: '100%', boxSizing: 'border-box', padding: '0.5rem 1rem 0.5rem 2.25rem', borderRadius: '8px', border: '1px solid #2a2a30', background: '#18181b', color: '#e8e8e8', fontSize: '0.875rem', outline: 'none' }}
        />
        {showDropdown && searchResults.length > 0 && (
          <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: '#232329', border: '1px solid #2a2a30', borderRadius: '8px', zIndex: 100, marginTop: '0.25rem', boxShadow: '0 4px 16px rgba(0,0,0,0.4)', overflow: 'hidden' }}>
            {searchResults.map(a => (
              <div
                key={a._id}
                onMouseDown={() => { navigate(`/employee/getOneAnnouncement/${a._id}`); setShowDropdown(false); setSearch(''); }}
                style={{ padding: '0.6rem 1rem', cursor: 'pointer', borderBottom: '1px solid #2a2a30' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#2a2a30')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <div style={{ fontWeight: 600, color: '#e8e8e8', fontSize: '0.875rem' }}>{a.title}</div>
                <div style={{ color: '#9a9490', fontSize: '0.8rem' }}>{a.description.length > 60 ? a.description.slice(0, 60) + '…' : a.description}</div>
              </div>
            ))}
          </div>
        )}
      </div>
      {paginated.map((a) => (
        <div key={a._id} className="data-card" onClick={() => navigate(`/employee/getOneAnnouncement/${a._id}`)}>          <div className="data-card-header">
            <h3 className="data-card-title">{a.title}</h3>
            <span className="data-card-meta" style={{ fontSize: '0.8rem', color: '#9a9490', flexShrink: 0 }}>{fmt(a.createdAt)}</span>
          </div>
          <p className="data-card-meta" style={{ color: '#9a9490', margin: 0, fontSize: '0.825rem' }}>
            {a.description.length > 120 ? a.description.slice(0, 120): a.description}
          </p>
        </div>
      ))}
      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.75rem', marginTop: '1.25rem' }}>
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} style={{ padding: '0.35rem 0.8rem', borderRadius: '6px', border: '1px solid #2a2a30', background: page === 1 ? '#18181b' : '#232329', color: page === 1 ? '#555' : '#e8c468', cursor: page === 1 ? 'default' : 'pointer', fontWeight: 600, fontSize: '0.82rem' }}>Prev</button>
          <span style={{ color: '#9a9490', fontSize: '0.82rem' }}>Page {page} of {totalPages}</span>
          <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} style={{ padding: '0.35rem 0.8rem', borderRadius: '6px', border: '1px solid #2a2a30', background: page === totalPages ? '#18181b' : '#232329', color: page === totalPages ? '#555' : '#e8c468', cursor: page === totalPages ? 'default' : 'pointer', fontWeight: 600, fontSize: '0.82rem' }}>Next</button>
        </div>
      )}
    </div>
  );
}
