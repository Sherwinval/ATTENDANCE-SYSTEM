import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const NAV_ITEMS = [
  { 
    label: 'Check-In', 
    to: '/login',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
      </svg>
    ),
    badge: 'commit'
  },
  { 
    label: 'Check-Out', 
    to: '/logout',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
      </svg>
    ),
    badge: 'push'
  },
  { 
    label: 'Commit Logs', 
    to: '/attendance',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
    badge: 'git log'
  },
];

export function AttendanceNav() {
  return (
    <nav className="mx-auto flex w-full max-w-2xl items-center justify-between gap-2 rounded-2xl border border-white/10 bg-[#0d131f]/90 p-1.5 backdrop-blur-xl shadow-2xl relative z-10">
      {NAV_ITEMS.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
              isActive
                ? 'bg-gradient-to-b from-[#2ea043] to-[#238636] text-white shadow-lg shadow-emerald-950/40 border border-emerald-400/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
            }`
          }
        >
          {item.icon}
          <span>{item.label}</span>
          <span className="hidden md:inline-block font-mono text-[10px] uppercase opacity-60 tracking-wider">
            {item.badge}
          </span>
        </NavLink>
      ))}
    </nav>
  );
}

export default function EventShell({
  badge,
  title,
  intro,
  children,
  panelClassName = 'mx-auto w-full max-w-5xl',
}) {
  const [time, setTime] = useState('');

  useEffect(() => {
    function updateClock() {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })
      );
    }
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen w-screen max-h-screen overflow-hidden relative flex flex-col justify-between selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Background Gradients & Tech Grid */}
      <div className="app-bg-grid" />
      <div className="ambient-glow-top" />
      <div className="ambient-glow-bottom" />

      {/* Top Telemetry / Status Bar */}
      <header className="relative z-20 w-full flex-shrink-0 border-b border-white/[0.06] bg-[#070b12]/80 backdrop-blur-md px-6 sm:px-10 py-2.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 font-bold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              LIVE STATION
            </span>
            <span className="text-slate-600 hidden md:inline">•</span>
            <span className="text-slate-400 hidden md:flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>branch: <span className="text-cyan-400 font-semibold">main</span></span>
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span className="text-slate-500 hidden sm:inline text-xs">v4.0.0-next-commit</span>
            <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-900/90 border border-white/10 text-slate-300">
              <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-semibold tracking-wider">{time || '--:--:--'}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 px-4 sm:px-8 py-3 sm:py-5 flex flex-col items-center justify-center min-h-0 overflow-hidden">
        <div className="w-full max-w-7xl flex flex-col items-center my-auto">
          
          {/* Hero Section */}
          <section className="w-full text-center mb-3 sm:mb-5 flex-shrink-0">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-xs font-semibold tracking-wider uppercase mb-2 shadow-sm">
              <span className="text-cyan-300 font-bold">&lt;/&gt;</span>
              <span>{badge}</span>
            </div>

            <h1 className="hero-title tracking-tight leading-none">
              {title.includes('imPRINT') ? (
                <>
                  <span className="text-white">imPRINT 4.0</span>
                  <span className="hero-subtitle">The Next Commit</span>
                </>
              ) : (
                <span className="text-white">{title}</span>
              )}
            </h1>

            {intro && (
              <p className="mx-auto mt-2 max-w-2xl text-sm sm:text-base text-slate-400 font-normal leading-relaxed">
                {intro}
              </p>
            )}
          </section>

          {/* Navigation Bar */}
          <div className="w-full mb-3 sm:mb-5 flex-shrink-0">
            <AttendanceNav />
          </div>

          {/* Content Card Container */}
          <div className={`w-full min-h-0 ${panelClassName}`}>
            {children}
          </div>
        </div>
      </main>

      {/* Modern Developer Footer */}
      <footer className="relative z-10 w-full flex-shrink-0 border-t border-white/[0.06] bg-[#070a12]/80 backdrop-blur-md py-2.5 px-6 text-center">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-xs text-slate-500 font-mono">
          <p>© {new Date().getFullYear()} Computer Programming Society. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <span className="text-emerald-500 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
              All Systems Operational
            </span>
            <span>•</span>
            <span>imPRINT 4.0: The Next Commit</span>
          </div>
        </div>
      </footer>
    </div>
  );
}