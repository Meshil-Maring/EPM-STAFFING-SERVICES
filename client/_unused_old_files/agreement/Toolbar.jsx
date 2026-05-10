import { X, Download, Loader2 } from "lucide-react";

export default function Toolbar({
  isLoading,
  isError,
  scriptReady,
  pdfLoading,
  onDownload,
  onClose,
}) {
  const downloadDisabled = isLoading || pdfLoading || !scriptReady;

  return (
    <div
      id="ea-toolbar"
      className="sticky top-0 z-[920] w-[794px] max-w-[calc(100vw-16px)] flex items-center justify-between bg-slate-900/95 backdrop-blur-sm rounded-t-xl px-5 py-3 shadow-xl border border-white/5"
    >
      {/* Left — title */}
      <div className="flex items-center gap-2.5">
        <div className="w-2 h-2 rounded-full bg-orange-400" />
        <span className="text-white text-sm font-semibold font-sans tracking-wide">
          Commercial Empanelment Agreement
        </span>
        {isLoading && (
          <span className="flex items-center gap-1 text-slate-400 text-xs font-sans">
            <Loader2 size={11} className="animate-spin" />
            Loading…
          </span>
        )}
        {isError && (
          <span className="text-amber-400 text-xs font-sans">
            ⚠ Showing defaults
          </span>
        )}
      </div>

      {/* Right — actions */}
      <div className="flex items-center gap-2">
        {/* Script loading indicator */}
        {!scriptReady && !isLoading && (
          <span className="text-slate-400 text-xs font-sans flex items-center gap-1">
            <Loader2 size={11} className="animate-spin" />
            Loading PDF engine…
          </span>
        )}

        <button
          onClick={onDownload}
          disabled={downloadDisabled}
          title={!scriptReady ? "PDF engine loading…" : "Download as PDF"}
          className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-semibold font-sans transition-all duration-200
            ${
              downloadDisabled
                ? "bg-slate-700 text-slate-500 cursor-not-allowed opacity-60"
                : "bg-orange-500 hover:bg-orange-400 text-white shadow-lg shadow-orange-500/25 active:scale-95"
            }`}
        >
          {pdfLoading ? (
            <>
              <Loader2 size={14} className="animate-spin" />
              Generating…
            </>
          ) : (
            <>
              <Download size={14} />
              Download PDF
            </>
          )}
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
