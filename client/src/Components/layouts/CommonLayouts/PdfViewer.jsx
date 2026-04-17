import { useEffect } from "react";
import { ChevronLeft, FileText, Download, X, ExternalLink } from "lucide-react";

export const PdfViewer = ({ url, label, onClose }) => {
  // Google Docs viewer as fallback for Supabase public URLs
  const viewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`;

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = url;
    a.download = label + ".pdf";
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.click();
  };

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-3xl h-[90vh] bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col">
        {/* Viewer Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-slate-800 shrink-0">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors text-sm font-medium"
          >
            <ChevronLeft size={18} />
            Back
          </button>

          <div className="flex items-center gap-2">
            <FileText size={16} className="text-red-400" />
            <span className="text-white font-semibold text-sm capitalize">
              {label}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-3 py-1.5 rounded-full transition-colors"
            >
              <Download size={13} />
              Download
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* PDF iframe — try direct embed first, fallback message included */}
        <div className="flex-1 bg-slate-100 relative">
          <iframe
            src={viewerUrl}
            title={label}
            className="w-full h-full border-0"
            allow="fullscreen"
          />
          {/* Thin overlay bar with direct-open link */}
          <div className="absolute bottom-3 right-3">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-slate-800/80 hover:bg-slate-800 text-white text-xs font-medium px-3 py-1.5 rounded-full backdrop-blur-sm transition-colors"
            >
              <ExternalLink size={12} />
              Open in new tab
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
