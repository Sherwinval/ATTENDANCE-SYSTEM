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
    <nav className="mx-auto flex w-full max-w-2xl items-center justify-between gap-2 rounded-2xl border border-slate-700/60 bg-[#0b1329]/95 p-1.5 backdrop-blur-xl shadow-xl shadow-slate-950/20 relative z-10">
      {NAV_ITEMS.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
              isActive
                ? 'bg-gradient-to-r from-[#1d4ed8] to-[#2563eb] text-white shadow-md shadow-blue-900/50 border border-blue-400/40'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`
          }
        >
          {item.icon}
          <span>{item.label}</span>
          <span className="hidden md:inline-block font-mono text-[10px] uppercase opacity-70 tracking-wider">
            {item.badge}
          </span>
        </NavLink>
      ))}
    </nav>
  );
}

// Geometric Quarter-Circle Mosaic Component
function GeometricMosaicTopRight() {
  return (
    <div className="absolute top-0 right-0 w-80 h-80 pointer-events-none z-0 hidden lg:block opacity-90">
      <div className="grid grid-cols-4 gap-1 p-4 float-right">
        {/* Row 1 */}
        <div className="w-12 h-12 bg-gradient-to-br from-[#2a4d7d] to-[#1a3458] rounded-tl-full shadow-md"></div>
        <div className="w-12 h-12 bg-gradient-to-bl from-[#345c94] to-[#1e3e6b] rounded-tr-full shadow-md"></div>
        <div className="w-12 h-12 bg-gradient-to-br from-[#224472] to-[#142a4a] rounded-tl-full shadow-md"></div>
        <div className="w-12 h-12 bg-gradient-to-bl from-[#3b67a3] to-[#254878] rounded-tr-full shadow-md"></div>
        
        {/* Row 2 */}
        <div className="w-12 h-12 bg-gradient-to-br from-[#1d3d69] to-[#0f2442] rounded-bl-full shadow-md"></div>
        <div className="w-12 h-12 bg-gradient-to-br from-[#30578c] to-[#1c3a64] rounded-br-full shadow-md"></div>
        <div className="w-12 h-12 bg-gradient-to-tl from-[#284f82] to-[#163259] rounded-br-full shadow-md"></div>
        <div className="w-12 h-12 bg-gradient-to-bl from-[#1f4270] to-[#122846] rounded-br-full shadow-md"></div>

        {/* Row 3 */}
        <div className="w-12 h-12 bg-gradient-to-tr from-[#3864a0] to-[#1f406d] rounded-tl-full shadow-md"></div>
        <div className="w-12 h-12 bg-gradient-to-br from-[#244978] to-[#132c4c] rounded-tr-full shadow-md"></div>
        <div className="w-12 h-12 bg-gradient-to-bl from-[#2f558a] to-[#19365e] rounded-tl-full shadow-md"></div>
        <div className="w-12 h-12 bg-gradient-to-br from-[#1c3c69] to-[#0f2342] rounded-tr-full shadow-md"></div>
      </div>
    </div>
  );
}

function GeometricMosaicBottomRight() {
  return (
    <div className="absolute bottom-14 right-12 w-64 h-36 pointer-events-none z-0 hidden lg:block opacity-85">
      <div className="grid grid-cols-4 gap-1 float-right">
        <div className="w-10 h-10 bg-gradient-to-br from-[#254878] to-[#152e50] rounded-tl-full shadow-sm"></div>
        <div className="w-10 h-10 bg-gradient-to-bl from-[#31578c] to-[#1e3c66] rounded-tr-full shadow-sm"></div>
        <div className="w-10 h-10 bg-gradient-to-br from-[#284d7e] to-[#173256] rounded-tl-full shadow-sm"></div>
        <div className="w-10 h-10 bg-gradient-to-bl from-[#3b66a2] to-[#244776] rounded-tr-full shadow-sm"></div>

        <div className="w-10 h-10 bg-gradient-to-tr from-[#1d3e69] to-[#0e2544] rounded-bl-full shadow-sm"></div>
        <div className="w-10 h-10 bg-gradient-to-br from-[#2c5388] to-[#1a3860] rounded-br-full shadow-sm"></div>
        <div className="w-10 h-10 bg-gradient-to-tl from-[#355d96] to-[#1e406e] rounded-br-full shadow-sm"></div>
        <div className="w-10 h-10 bg-gradient-to-bl from-[#224574] to-[#132a4a] rounded-br-full shadow-sm"></div>
      </div>
    </div>
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
    <div className="h-screen w-screen max-h-screen overflow-hidden relative flex flex-col justify-between selection:bg-blue-600/20 selection:text-blue-900 bg-[#f3f6fc]">
      {/* Background Topography & Grid */}
      <div className="app-bg-blueprint" />
      <div className="topography-overlay" />

      {/* Decorative Mosaic Art */}
      <GeometricMosaicTopRight />
      <GeometricMosaicBottomRight />

      {/* Corner Blueprint Crosshairs & Coordinates */}
      <div className="absolute top-4 left-6 z-20 pointer-events-none flex items-center gap-1 text-slate-700 font-mono text-xs">
        <span className="text-slate-800 text-base font-bold">+</span>
      </div>

      <div className="absolute top-4 right-6 z-20 pointer-events-none flex flex-col items-end text-[10px] font-mono text-slate-700 tracking-wider">
        <span className="text-slate-800 text-sm font-bold mb-0.5">+</span>
        <span className="font-semibold">14.158975 N</span>
        <span className="font-semibold">121.137492 E</span>
      </div>

      {/* Top Status Bar */}
      <header className="relative z-20 w-full flex-shrink-0 border-b border-blue-900/10 bg-white/70 backdrop-blur-md px-6 sm:px-10 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-blue-600/10 text-blue-700 border border-blue-600/20 font-bold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              IMPRINT 4.0 STATION
            </span>
            <span className="text-slate-400 hidden md:inline">•</span>
            <span className="text-slate-600 hidden md:flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>branch: <span className="text-blue-700 font-semibold">main</span></span>
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-600">
            <span className="text-slate-500 hidden sm:inline text-xs font-mono">v4.0.0-next-commit</span>
            <div className="flex items-center gap-2 px-3 py-0.5 rounded-lg bg-white border border-slate-300 text-slate-700 shadow-sm">
              <svg className="w-3.5 h-3.5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-semibold tracking-wider font-mono">{time || '--:--:--'}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 px-4 sm:px-8 py-2 sm:py-4 flex flex-col items-center justify-center min-h-0 overflow-hidden">
        <div className="w-full max-w-7xl flex flex-col items-center my-auto">
          
          {/* Blueprint Hero Section matching the Screenshot */}
          <section className="w-full text-center mb-2 sm:mb-4 flex-shrink-0">
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-blue-600/10 border border-blue-600/20 text-blue-700 font-mono text-[11px] font-bold tracking-wider uppercase mb-1 shadow-sm">
              <span className="text-blue-600 font-extrabold">&lt;/&gt;</span>
              <span>{badge || 'IMPRINT SEASON 4'}</span>
            </div>

            {/* Main Headline styled like "THE NEXT COMMIT" in Screenshot */}
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-slate-900 leading-tight font-sans">
                <span className="blueprint-title-text blueprint-grid-fill block">
                  {title.includes('imPRINT') ? 'THE NEXT COMMIT' : title}
                </span>
              </h1>
              
              <p className="mt-1 text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-800 blueprint-subtitle">
                {intro || 'SOMETHING ABOUT PREPARING SHI (SUBTITLE HERE IDK)'}
              </p>
            </div>
          </section>

          {/* Navigation Bar - Dark Slate Pill Capsule */}
          <div className="w-full mb-3 sm:mb-4 flex-shrink-0">
            <AttendanceNav />
          </div>

          {/* Content Card Container */}
          <div className={`w-full min-h-0 ${panelClassName}`}>
            {children}
          </div>
        </div>
      </main>

      {/* Bottom Royal Blue Banner matching Screenshot Footer */}
      <footer className="relative z-20 w-full flex-shrink-0 bg-[#1638a0] text-white py-2 px-6 sm:px-10 shadow-xl border-t border-blue-900/30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Left: IMPRINT SEASON 4 Banner logo */}
          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl sm:text-2xl font-black tracking-tighter uppercase font-sans text-white leading-none">
                  imPRINT
                </span>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[10px] font-extrabold uppercase bg-white/20 px-1.5 py-0.5 rounded tracking-widest">
                  SEASON 4
                </span>
                <span className="text-[9px] font-mono text-blue-200 opacity-80 hidden md:inline">
                  CLASS OF 2025 | IMPRINT/S4/2025
                </span>
              </div>
            </div>
          </div>

          {/* Center: Grid Matrix Pattern Icon */}
          <div className="hidden sm:flex items-center gap-1 opacity-80">
            <div className="grid grid-cols-4 gap-1 p-1 bg-white/10 rounded-md border border-white/20">
              <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
              <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
              <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
              <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
              <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
              <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
              <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
              <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
              <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
              <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
              <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
              <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
            </div>
          </div>

          {/* Right: Organization Badges & Seals */}
          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-white/15 border border-white/30 flex items-center justify-center font-bold text-[10px] text-white shadow-sm">
                LPU
              </div>
              <div className="w-7 h-7 rounded-full bg-blue-900 border border-white/30 flex items-center justify-center font-bold text-[10px] text-blue-200 shadow-sm">
                CPS
              </div>
              <div className="w-7 h-7 rounded-lg bg-white/20 border border-white/30 flex items-center justify-center font-bold text-xs text-white">
                +
              </div>
            </div>
            <div className="hidden lg:flex flex-col text-[10px] font-mono text-blue-100 text-right">
              <span className="font-bold uppercase tracking-wider">Computer Programming Society</span>
              <span className="opacity-75">All Rights Reserved © 2025</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}