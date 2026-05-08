import { FileText } from "lucide-react";

export default function PdfLoadingOverlay({ isVisible }) {
  if (!isVisible) return null;

  return (
    <div
      id="ea-pdf-overlay"
      className="fixed inset-0 z-[1000] bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center gap-4"
    >
      <div className="w-14 h-14 rounded-2xl bg-orange-500 flex items-center justify-center shadow-2xl shadow-orange-500/40">
        <FileText size={28} className="text-white ea-spinner" />
      </div>
      <p className="text-white text-base font-semibold font-sans tracking-wide">
        Generating PDF…
      </p>
      <p className="text-slate-300 text-xs font-sans">
        This may take a few seconds
      </p>
    </div>
  );
}
