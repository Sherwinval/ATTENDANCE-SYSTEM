
export default function ActionPanel({ title, subtitle, footer, children }) {
  return (
    <div className="terminal-card relative z-10 w-full mx-auto overflow-hidden shadow-2xl">
      
      {/* Terminal Window Titlebar */}
      <div className="flex items-center justify-between px-5 sm:px-8 py-3 border-b border-white/[0.08] bg-[#0c121e]/90 select-none">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#ff5f56]/90 border border-[#e0443e] inline-block shadow-sm"></span>
          <span className="w-3 h-3 rounded-full bg-[#ffbd2e]/90 border border-[#dea123] inline-block shadow-sm"></span>
          <span className="w-3 h-3 rounded-full bg-[#27c93f]/90 border border-[#1aab29] inline-block shadow-sm"></span>
          <span className="ml-2 font-mono text-xs text-slate-400 font-medium hidden sm:inline">
            terminal — bash
          </span>
        </div>

        <div className="font-mono text-xs text-slate-400 flex items-center gap-1.5">
          <span className="text-emerald-400 font-semibold">cps@imprint</span>
          <span>:</span>
          <span className="text-cyan-400 font-semibold">~/attendance</span>
        </div>

        <div className="flex items-center gap-2 font-mono text-[11px] text-slate-400">
          <span className="px-2 py-0.5 rounded bg-white/[0.06] border border-white/10 text-slate-300">
            UTF-8
          </span>
        </div>
      </div>

      {/* Header section with title and subtitle */}
      {(title || subtitle) && (
        <header className="relative z-10 px-6 py-4 sm:px-10 sm:py-6 text-center border-b border-white/[0.06] bg-white/[0.01]">
          {title && (
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-sm sm:text-base font-normal text-slate-300 mt-1.5 max-w-xl mx-auto leading-relaxed">
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
        <footer className="relative z-10 bg-[#090d16]/90 px-6 py-3 sm:px-8 border-t border-white/[0.06] flex items-center justify-between font-mono text-xs text-slate-400">
          <div className="flex items-center gap-2 truncate">
            <span className="text-emerald-400 font-bold select-none text-sm">$</span>
            <span className="text-slate-200 truncate font-medium">{footer}</span>
          </div>
          <span className="text-xs text-slate-500 font-sans hidden sm:inline">
            imPRINT 4.0 Terminal
          </span>
        </footer>
      )}
    </div>
  );
}