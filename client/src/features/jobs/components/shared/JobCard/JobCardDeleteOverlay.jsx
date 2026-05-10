import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, AlertTriangle, X } from "lucide-react";

function JobCardDeleteOverlay({ onConfirm, card_name, onMutate }) {
  const targetRef = useRef(null);

  useEffect(() => {
    const updateClicking = (e) => {
      if (targetRef.current && !targetRef.current.contains(e.target)) {
        onConfirm("Cancel");
      }
    };
    window.addEventListener("mousedown", updateClicking);
    return () => window.removeEventListener("mousedown", updateClicking);
  }, []);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-200 bg-black/50 backdrop-blur-sm flex items-center justify-center">
        <motion.div
          ref={targetRef}
          initial={{ opacity: 0, scale: 0.92, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 16 }}
          transition={{ duration: 0.25, type: "tween", ease: "easeOut" }}
          className="bg-white w-[420px] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        >
          {/* ── Header ── */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 px-5 py-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-red-500/20 flex items-center justify-center shrink-0">
                <Trash2 size={16} className="text-red-400" />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-widest mb-0.5">
                  Confirm Action
                </p>
                <h2 className="text-sm font-semibold text-white leading-tight">
                  Delete Job Post
                </h2>
              </div>
            </div>
            <button
              onClick={() => onConfirm("Cancel")}
              className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors duration-150 cursor-pointer"
            >
              <X size={14} className="text-slate-300" />
            </button>
          </div>

          {/* ── Accent strip ── */}
          <div className="h-0.5 bg-gradient-to-r from-red-500 via-rose-400 to-transparent shrink-0" />

          {/* ── Body ── */}
          <div className="px-5 py-5 flex flex-col gap-4">
            {/* Warning card */}
            <div className="flex items-start gap-3 bg-red-50 border border-red-100 rounded-xl p-4">
              <div className="w-7 h-7 rounded-lg bg-red-100 flex items-center justify-center shrink-0 mt-0.5">
                <AlertTriangle size={14} className="text-red-500" />
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                You are about to permanently delete the job post{" "}
                <span className="font-semibold text-slate-800">
                  "{card_name}"
                </span>
                . This action cannot be undone.
              </p>
            </div>
          </div>

          {/* ── Footer ── */}
          <div className="px-5 pb-5 flex items-center justify-end gap-3">
            <button
              onClick={() => onConfirm("Cancel")}
              className="px-4 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors duration-150 cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={() => onConfirm("Confirm")}
              className="flex items-center gap-2 px-5 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-semibold shadow-md shadow-red-200 hover:shadow-red-300 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
            >
              <Trash2 size={14} />
              Delete
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default JobCardDeleteOverlay;
