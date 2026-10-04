export default function ActionPanel({ title, subtitle, footer, children }) {
  return (
    <div className="terminal-card relative z-10 w-full mx-auto overflow-hidden shadow-2xl border border-slate-700/80 bg-[#0c1427]/95 text-white">
      
      {/* Blueprint Control Header */}
      <div className="flex items-center justify-between px-5 sm:px-8 py-2.5 border-b border-slate-700/80 bg-[#070c18] text-white select-none">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#ef4444] inline-block shadow-sm"></span>
          <span className="w-3 h-3 rounded-full bg-[#f59e0b] inline-block shadow-sm"></span>
          <span className="w-3 h-3 rounded-full bg-[#10b981] inline-block shadow-sm"></span>
          <span className="ml-2 font-mono text-xs text-slate-300 font-medium hidden sm:inline">
            terminal — bash
          </span>
        </div>

        <div className="font-mono text-xs text-slate-200 flex items-center gap-1.5">
          <span className="text-cyan-400 font-bold">cps@imprint</span>
          <span>:</span>
          <span className="text-white font-semibold">~/attendance</span>
        </div>

        <div className="flex items-center gap-2 font-mono text-[11px] text-slate-300">
          <span className="px-2 py-0.5 rounded bg-white/10 border border-white/20 text-white font-semibold">
            UTF-8
          </span>
        </div>
      </div>

      {/* Header section with title and subtitle */}
      {(title || subtitle) && (
        <header className="relative z-10 px-6 py-4 sm:px-10 sm:py-5 text-center border-b border-slate-700/50 bg-slate-900/40">
          {title && (
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-sm sm:text-base font-medium text-slate-300 mt-1 max-w-xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
        </header>
      )}

      {/* Main card body */}
      <div className="relative z-10 p-6 sm:p-8 md:p-10">
        {children}
      </div>

      {/* Terminal prompt footer */}
      {footer && (
        <footer className="relative z-10 bg-[#070c18] px-6 py-2.5 sm:px-8 border-t border-slate-700/80 flex items-center justify-between font-mono text-xs text-slate-400">
          <div className="flex items-center gap-2 truncate">
            <span className="text-emerald-400 font-bold select-none text-sm">$</span>
            <span className="text-slate-200 truncate font-semibold">{footer}</span>
          </div>
          <span className="text-xs text-slate-400 font-sans hidden sm:inline">
            imPRINT 4.0 Terminal
          </span>
        </footer>
      )}
    </div>
  );
}