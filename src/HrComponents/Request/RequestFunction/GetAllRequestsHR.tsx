import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { getRequest } from '../../../types/request';
import { MdRequestPage, MdSearch } from 'react-icons/md';

const badge = (v: string) => {
  const m: Record<string, string> = {
    Pending: 'pending', Approved: 'approved', Rejected: 'rejected',
    Sick: 'Sick', Vacation: 'Vacation', Casual: 'Casual',
  };
  return `badge-status badge-${m[v] || 'pending'}`;
};

const fmt = (d: string) => new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

const REQUEST_STATUSES = ['all', 'Pending', 'Approved', 'Rejected'] as const;

export default function GetAllRequestsHR() {
  const [requests, setRequests] = useState<getRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const PAGE_SIZE = 5;
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get<getRequest[]>(`${process.env.REACT_APP_BACKEND_URL}/request/getAll`, { withCredentials: true })
      .then((res) => setRequests(res.data))
      .catch(() => toast.error('Cannot get requests'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="state-loading"><div className="state-spinner" /></div>;

  const filtered = filter === 'all' ? requests : requests.filter(r => r.status === filter);
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const searchResults = search.trim()
    ? requests.filter(r =>
        r.leave_type.toLowerCase().includes(search.toLowerCase()) ||
        r.status.toLowerCase().includes(search.toLowerCase()) ||
        r.reason.toLowerCase().includes(search.toLowerCase()) ||
        (r.reportedBy?.username || '').toLowerCase().includes(search.toLowerCase())
      ).slice(0, 6)
    : [];

  return (
    <>
      <div style={{ position: 'relative', marginBottom: '0.5rem' }}>
        <MdSearch style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9a9490', fontSize: '1.1rem', pointerEvents: 'none' }} />
        <input
          type="text"
          placeholder="Search requests..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setShowDropdown(true); }}
          onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
          onFocus={() => { if (search) setShowDropdown(true); }}
          style={{ width: '100%', boxSizing: 'border-box', padding: '0.5rem 1rem 0.5rem 2.25rem', borderRadius: '8px', border: '1px solid #2a2a30', background: '#18181b', color: '#e8e8e8', fontSize: '0.875rem', outline: 'none' }}
        />
        {showDropdown && searchResults.length > 0 && (
          <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: '#232329', border: '1px solid #2a2a30', borderRadius: '8px', zIndex: 100, marginTop: '0.25rem', boxShadow: '0 4px 16px rgba(0,0,0,0.4)', overflow: 'hidden' }}>
            {searchResults.map(r => (
              <div
                key={r._id}
                onMouseDown={() => { navigate(`/hr/getOneRequest/${r._id}`); setShowDropdown(false); setSearch(''); }}
                style={{ padding: '0.6rem 1rem', cursor: 'pointer', borderBottom: '1px solid #2a2a30' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#2a2a30')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <div style={{ fontWeight: 600, color: '#e8e8e8', fontSize: '0.875rem' }}>{r.reportedBy?.username} — {r.leave_type} Leave</div>
                <div style={{ color: '#9a9490', fontSize: '0.8rem' }}>{r.status}</div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
        {REQUEST_STATUSES.map(s => (
          <button
            key={s}
            onClick={() => { setFilter(s); setPage(1); }}
            style={{
              padding: '0.35rem 0.9rem', borderRadius: '999px', fontSize: '0.8rem', cursor: 'pointer',
              border: filter === s ? '1px solid #e8c468' : '1px solid #2a2a30',
              background: filter === s ? '#e8c468' : '#18181b',
              color: filter === s ? '#18181b' : '#9a9490', fontWeight: filter === s ? 700 : 400,
              transition: 'all 0.15s',
            }}
          >{s === 'all' ? 'All' : s}</button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="state-empty">
          <div className="state-empty-icon"><MdRequestPage /></div>
          <p>{requests.length === 0 ? 'No leave requests yet' : 'No requests match this status.'}</p>
        </div>
      ) : paginated.map((r) => (
        <div key={r._id} className="data-card" onClick={() => navigate(`/hr/getOneRequest/${r._id}`)}>
          <div className="data-card-header">
            <h3 className="data-card-title"> Reported By : {r.reportedBy?.username}</h3>
            <div style={{ display: 'flex', gap: '0.4rem', flexShrink: 0 }}>
              <span className={badge(r.leave_type)}>{r.leave_type}</span>
              <span className={badge(r.status)}>{r.status}</span>
            </div>
          </div>
          <p className="data-card-meta" style={{ color: '#9a9490', margin: '0 0 0.5rem', fontSize: '0.825rem' }}>
            Reason : {r.reason.length > 100 ? r.reason.slice(0, 100) : r.reason}
          </p>
          <div className="data-card-meta-row">
            <span className="data-card-meta">
              <span className="data-card-label">From</span>{fmt(r.start_date)}
            </span>
            <span className="data-card-meta">
              <span className="data-card-label">To</span>{fmt(r.end_date)}
            </span>
            <span className="data-card-meta">
              <span className="data-card-label">Submitted</span>{fmt(r.createdAt)}
            </span>
          </div>
        </div>
      ))}
      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.75rem', marginTop: '1.25rem' }}>
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} style={{ padding: '0.35rem 0.8rem', borderRadius: '6px', border: '1px solid #2a2a30', background: page === 1 ? '#18181b' : '#232329', color: page === 1 ? '#555' : '#e8c468', cursor: page === 1 ? 'default' : 'pointer', fontWeight: 600, fontSize: '0.82rem' }}>Prev</button>
          <span style={{ color: '#9a9490', fontSize: '0.82rem' }}>Page {page} of {totalPages}</span>
          <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} style={{ padding: '0.35rem 0.8rem', borderRadius: '6px', border: '1px solid #2a2a30', background: page === totalPages ? '#18181b' : '#232329', color: page === totalPages ? '#555' : '#e8c468', cursor: page === totalPages ? 'default' : 'pointer', fontWeight: 600, fontSize: '0.82rem' }}>Next</button>
        </div>
      )}
    </>
  );
}
