import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import {
  X,
  Briefcase,
  ArrowRight,
  BookOpen,
  ClipboardList,
} from "lucide-react";
import MoreDetailsRequirements from "./MoreDetailsRequirements";

function JobCardMoreDetails({ setMoreDetails, card }) {
  const navigate = useNavigate();

  const handleBtnClick = () => {
    navigate(`/client/dashboard/job-overview/${card?.id}`);
  };

  return createPortal(
    <div
      onClick={() => setMoreDetails(false)}
      className="fixed inset-0 z-[1000] bg-black/50 backdrop-blur-sm flex items-center justify-center"
    >
      <AnimatePresence>
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "100%" }}
          transition={{ duration: 0.35, type: "tween", ease: "easeOut" }}
          className="relative bg-white h-[92vh] w-[42%] rounded-2xl shadow-2xl flex flex-col overflow-hidden"
        >
          {/* ── Header ── */}
          <div className="shrink-0 bg-gradient-to-br from-slate-800 to-slate-900 px-6 py-5 flex items-start justify-between">
            <div className="flex items-center gap-3">
              {/* Icon badge */}
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                <Briefcase size={18} className="text-violet-300" />
              </div>

              <div>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-widest mb-0.5">
                  Job Specifications
                </p>
                <h2 className="text-lg font-semibold text-white leading-tight">
                  {card?.job_name || "N/A"}
                </h2>
              </div>
            </div>

            {/* Close button */}
            <button
              onClick={() => setMoreDetails(false)}
              className="mt-0.5 w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors duration-150 cursor-pointer"
            >
              <X size={16} className="text-slate-300" />
            </button>
          </div>

          {/* ── Accent strip ── */}
          <div className="h-0.5 bg-gradient-to-r from-indigo-500 via-violet-500 to-transparent shrink-0" />

          {/* ── Scrollable body ── */}
          <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar">
            <div className="p-5 flex flex-col gap-4">
              {/* Section heading */}
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-violet-50 flex items-center justify-center shrink-0">
                  <ClipboardList size={14} className="text-violet-500" />
                </div>
                <span className="text-sm font-semibold text-slate-700 tracking-wide">
                  Requirements & Details
                </span>
                <div className="flex-1 h-px bg-slate-100 ml-1" />
              </div>

              {/* Requirements card */}
              <div className="rounded-xl border border-slate-100 bg-slate-50/60 overflow-hidden">
                <div className="px-4 py-3 bg-violet-50 border-b border-violet-100 flex items-center gap-2">
                  <BookOpen size={13} className="text-violet-500" />
                  <span className="text-xs font-semibold text-violet-700 uppercase tracking-wider">
                    Specifications
                  </span>
                </div>
                <div className="p-4">
                  <MoreDetailsRequirements card={card} />
                </div>
              </div>
            </div>
          </div>

          {/* ── Sticky footer ── */}
          <div className="shrink-0 bg-white border-t border-slate-100 px-5 py-3.5 flex items-center justify-between gap-3">
            <p className="text-xs text-slate-400">
              Job ID:{" "}
              <span className="font-medium text-slate-600">
                #{card?.id || "—"}
              </span>
            </p>

            <button
              onClick={handleBtnClick}
              className="flex items-center gap-2 px-5 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-sm font-semibold shadow-md shadow-indigo-200 hover:shadow-lg hover:shadow-indigo-300 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
            >
              View Applications
              <ArrowRight size={15} />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>,
    document.body,
  );
}

export default JobCardMoreDetails;
