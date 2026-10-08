import { useEffect, useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getAttendanceRecords } from '../api/index.js';
import ActionPanel from '../components/ActionPanel.jsx';
import EventShell from '../components/EventShell.jsx';

function formatTimestamp(value) {
  return new Intl.DateTimeFormat('en-PH', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}

// Generate deterministic pseudo hash from string
function generateShortHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash).toString(16).padStart(7, '0').slice(0, 7);
}

// Get initials for avatar
function getInitials(name) {
  if (!name) return '??';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function AttendancePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [records, setRecords] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const filter = searchParams.get('type') || '';

  async function loadRecords(showRefreshIndicator = false) {
    if (showRefreshIndicator) setIsRefreshing(true);
    else setIsLoading(true);
    setError('');

    try {
      const result = await getAttendanceRecords(filter);
      setRecords(result.records || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch logs.');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }

  useEffect(() => {
    loadRecords();
  }, [filter]);

  function updateFilter(nextFilter) {
    if (!nextFilter) {
      setSearchParams({});
      return;
    }
    setSearchParams({ type: nextFilter });
  }

  // Calculate live telemetry metrics
  const telemetry = useMemo(() => {
    let logins = 0;
    let logouts = 0;
    records.forEach((r) => {
      if (r.type === 'login') logins++;
      else if (r.type === 'logout') logouts++;
    });
    return {
      total: records.length,
      logins,
      logouts,
      activeInVenue: Math.max(0, logins - logouts),
    };
  }, [records]);

  // Client-side search filtering
  const filteredRecords = useMemo(() => {
    if (!searchQuery.trim()) return records;
    const query = searchQuery.toLowerCase().trim();
    return records.filter((r) => {
      const name = r.participant?.fullName?.toLowerCase() || '';
      const id = r.studentId?.toLowerCase() || '';
      return name.includes(query) || id.includes(query);
    });
  }, [records, searchQuery]);

  return (
    <EventShell
      badge="Admin Dashboard"
      intro="Real-time commit tree & participant attendance logs."
      panelClassName="mx-auto w-full max-w-6xl"
      title="COMMIT LOGS"
    >
      <ActionPanel
        footer="git log --graph --oneline --decorate --all"
        title="Live Commit Activity Feed"
        subtitle="Monitor incoming attendees and track live event occupancy."
      >
        {/* Metric Cards Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-4">
          <div className="p-3.5 sm:p-4 rounded-xl bg-[#13203c] border border-slate-700/80 shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-300 uppercase tracking-wider font-bold">Total Commits</span>
              <span className="p-1 rounded bg-slate-800 text-slate-300">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </span>
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-white mt-1.5 font-mono">{telemetry.total}</p>
            <span className="text-xs text-slate-400 font-mono">Recorded events</span>
          </div>

          <div className="p-3.5 sm:p-4 rounded-xl bg-[#0b2b20] border border-emerald-500/40 shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-bold">Check-Ins</span>
              <span className="p-1 px-1.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold">+</span>
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-emerald-400 mt-1.5 font-mono">{telemetry.logins}</p>
            <span className="text-xs text-emerald-300/80 font-mono">Total check-in pushes</span>
          </div>

          <div className="p-3.5 sm:p-4 rounded-xl bg-[#2e1c0b] border border-amber-500/40 shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-amber-400 uppercase tracking-wider font-bold">Check-Outs</span>
              <span className="p-1 px-1.5 rounded bg-amber-500/20 text-amber-300 font-mono text-xs font-bold">-</span>
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-amber-400 mt-1.5 font-mono">{telemetry.logouts}</p>
            <span className="text-xs text-amber-300/80 font-mono">Total session exits</span>
          </div>

          <div className="p-3.5 sm:p-4 rounded-xl bg-[#0f2347] border border-blue-500/40 shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-blue-300 uppercase tracking-wider font-bold">In Venue Now</span>
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
              </span>
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-blue-300 mt-1.5 font-mono">{telemetry.activeInVenue}</p>
            <span className="text-xs text-blue-300/80 font-mono">Estimated occupancy</span>
          </div>
        </div>

        {/* Toolbar: Filters, Search, and Refresh */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-3.5">
          
          {/* Segmented Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#13203c] border border-slate-700/80">
            <button
              onClick={() => updateFilter('')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition font-mono ${
                filter === ''
                  ? 'bg-[#1d4ed8] text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              All ({records.length})
            </button>
            <button
              onClick={() => updateFilter('login')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition font-mono ${
                filter === 'login'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              + Check-Ins
            </button>
            <button
              onClick={() => updateFilter('logout')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition font-mono ${
                filter === 'logout'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              - Check-Outs
            </button>
          </div>

          {/* Search Input and Refresh Button */}
          <div className="flex items-center gap-2 flex-1 sm:max-w-md">
            <div className="relative flex-1">
              <svg className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search participant or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-9 pr-4 rounded-xl bg-[#13203c] border border-slate-700/80 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30 font-sans transition shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            <button
              onClick={() => loadRecords(true)}
              disabled={isRefreshing || isLoading}
              className="h-10 px-3.5 rounded-xl bg-[#13203c] border border-slate-700/80 hover:border-blue-400 text-slate-200 hover:text-white flex items-center gap-1.5 text-xs font-mono font-bold transition shadow-sm"
              title="Refresh Logs"
            >
              <svg className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-blue-400' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span className="hidden sm:inline">Sync</span>
            </button>
          </div>
        </div>

        {/* Commit Stream Container */}
        <div className="overflow-hidden rounded-xl border border-slate-700/80 bg-[#070c18] shadow-xl flex flex-col">
          
          {/* Table Header */}
          <div className="hidden sm:grid grid-cols-[100px_1fr_130px_190px] gap-4 border-b border-slate-700/80 bg-[#0f1930] px-6 py-3 text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex-shrink-0">
            <span>Commit</span>
            <span>Participant Author</span>
            <span>Event Action</span>
            <span className="text-right">Timestamp</span>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="px-6 py-12 text-center space-y-2">
              <svg className="animate-spin h-6 w-6 text-blue-400 mx-auto" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="font-mono text-sm text-slate-300">Fetching commit tree from origin/main...</p>
            </div>
          )}

          {/* Error State */}
          {!isLoading && error && (
            <div className="px-6 py-10 text-center text-rose-400 font-mono text-sm bg-rose-950/40">
              <span className="font-bold text-rose-300">[error: remote connection failed]</span> {error}
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !error && filteredRecords.length === 0 && (
            <div className="px-6 py-12 text-center space-y-2">
              <p className="font-mono text-sm text-slate-300 font-medium">No commit logs match the current query.</p>
              <p className="text-xs text-slate-400">Try changing the filter or search term.</p>
            </div>
          )}

          {/* Records Stream */}
          {!isLoading && !error && filteredRecords.length > 0 && (
            <div className="divide-y divide-slate-800/80 overflow-y-auto max-h-[38vh] sm:max-h-[42vh] custom-scrollbar">
              {filteredRecords.map((record) => {
                const fullName = record.participant?.fullName || `${record.participant?.firstName || ''} ${record.participant?.lastName || ''}`.trim() || 'Unregistered User';
                const isLogin = record.type === 'login';
                const hash = generateShortHash(`${record.id || ''}-${record.studentId}`);

                return (
                  <div
                    key={record.id}
                    className="grid gap-2 px-6 py-3.5 sm:grid-cols-[100px_1fr_130px_190px] sm:gap-4 items-center hover:bg-white/[0.04] transition duration-150"
                  >
                    {/* Commit Hash */}
                    <div className="flex items-center gap-1 font-mono text-xs text-purple-400">
                      <span className="text-slate-500">#</span>
                      <span className="font-bold">{hash}</span>
                    </div>

                    {/* Participant Details */}
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-sm flex-shrink-0 ${
                        isLogin ? 'bg-gradient-to-tr from-emerald-600 to-teal-500' : 'bg-gradient-to-tr from-amber-600 to-orange-500'
                      }`}>
                        {getInitials(fullName)}
                      </div>
                      <div className="truncate">
                        <p className="font-bold text-white text-sm sm:text-base truncate">
                          {fullName}
                        </p>
                        <p className="font-mono text-xs text-slate-400">
                          {record.studentId}
                        </p>
                      </div>
                    </div>

                    {/* Event Action Badge */}
                    <div className="flex items-center gap-2">
                      {isLogin ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 font-mono text-xs font-bold tracking-wider uppercase">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"></span>
                          Check-In
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/25 font-mono text-xs font-bold tracking-wider uppercase">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block"></span>
                          Check-Out
                        </span>
                      )}

                      {record.remarks === 'Late' && (
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-rose-500/10 text-rose-300 border border-rose-500/30 font-mono text-[10px] font-bold uppercase tracking-wider">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-400 inline-block"></span>
                          Late
                        </span>
                      )}
                    </div>

                    {/* Timestamp */}
                    <div className="flex items-center sm:justify-end font-mono text-xs text-slate-300 font-medium">
                      {formatTimestamp(record.recordedAt)}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer Callout */}
        <div className="mt-3 text-center">
          <p className="text-xs text-slate-400">
            Missing a participant from the stream?{' '}
            <Link 
              className="text-cyan-400 hover:text-cyan-300 font-bold underline underline-offset-4 decoration-cyan-500/40 hover:decoration-cyan-300 transition ml-1" 
              to="/register"
            >
              Add new author identity
            </Link>
          </p>
        </div>
      </ActionPanel>
    </EventShell>
  );
}