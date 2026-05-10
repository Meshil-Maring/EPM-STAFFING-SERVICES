import { X, Printer, Loader2, ScrollText } from "lucide-react";

export default function Toolbar({ isLoading, isError, onPrint, onClose }) {
  return (
    <div
      id="ea-toolbar"
      className="w-204 max-w-[calc(100vw-16px)] flex items-center justify-between bg-slate-900 rounded-xl px-5 py-4 shadow-xl"
    >
      {/* Left — icon + title/subtitle */}
      <div className="flex items-center gap-3.5">
        <div className="w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center shrink-0">
          <ScrollText size={20} className="text-orange-400" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-white text-sm font-bold font-sans leading-tight">
              Commercial Empanelment Agreement
            </span>
            {isError && (
              <span className="text-amber-400 text-xs font-sans">
                ⚠ Showing defaults
              </span>
            )}
            {isLoading && (
              <span className="flex items-center gap-1 text-slate-400 text-xs font-sans">
                <Loader2 size={11} className="animate-spin" />
                Loading…
              </span>
            )}
          </div>
          <p className="text-slate-400 text-xs font-sans leading-tight mt-0.5">
            Review and print the agreement below
          </p>
        </div>
      </div>

      {/* Right — actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={onPrint}
          title="Print / Save as PDF"
          className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-semibold font-sans transition-all duration-200 bg-orange-500 hover:bg-orange-400 text-white shadow-lg shadow-orange-500/25 active:scale-95"
        >
          <Printer size={14} />
          Print / Save PDF
        </button>

        {onClose && (
          <button
            onClick={onClose}
            title="Close (Esc)"
            className="w-8 h-8 rounded-lg bg-slate-700 hover:bg-red-500 flex items-center justify-center transition-all duration-200 active:scale-95 group"
          >
            <X
              size={15}
              className="text-slate-300 group-hover:text-white transition-colors"
            />
          </button>
        )}
      </div>
    </div>
  );
}
