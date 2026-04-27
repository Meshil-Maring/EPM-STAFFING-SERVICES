import React, { useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Header from "../../Dashboard/Candidate/Common/Header";
import { Candidates_context } from "../../../../context/CandidatesContext";
import CompanyOverlay_AboutJob from "./CompanyOverlay_AboutJob";
import CompanyOverlay_SubmitCandidate from "./CompanyOverlay_SubmitCandidate";
import CompanyInfoSection from "./CompanyInfoSection";
import CompanyJobsGrid from "./CompanyJobsGrid";
import {
  getDaysPosted,
  CONTACT_ELEMENTS,
  BUSINESS_DETAILS,
} from "../../../../utils/companyOverlayHelpers";
import { Building2, X, ChevronRight } from "lucide-react";

function CompanyViewOverlay({ company, setClosing }) {
  const [job, setJob] = useState({});
  const [submitCandidate, setSubmitCandidate] = useState(false);
  const [viewJob, setViewJob] = useState(false);

  const { candidates } = useContext(Candidates_context);

  if (!company) return null;

  const heading_class =
    "font-semibold text-[clamp(0.85em,0.9vw,1.05em)] tracking-wide uppercase text-slate-500 pb-1 mb-3 border-b border-slate-200 w-full";

  const isSubOverlayOpen = viewJob || submitCandidate;

  const handleClicking = (name, jobData) => {
    const job_id = jobData?.job_id;
    setJob(jobData);
    if (name === "View") {
      setViewJob(true);
      sessionStorage.setItem("selected_job_id", job_id);
    } else if (name === "Submit") setSubmitCandidate(true);
  };

  return (
    <AnimatePresence>
      {/* ── Backdrop ── */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={() => setClosing(false)}
        className="fixed inset-0 z-200 flex items-center justify-center"
        style={{
          background: "",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
        }}
      >
        {/* ── Main Panel ── */}
        <motion.div
          key="main-panel"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, x: 80, scale: 0.97 }}
          animate={{
            opacity: 1,
            x: 0,
            scale: isSubOverlayOpen ? 0.58 : 1,
            filter: isSubOverlayOpen ? "blur(2px)" : "blur(0px)",
          }}
          exit={{ opacity: 0, x: 80, scale: 0.97 }}
          transition={{
            duration: 0.28,
            type: "spring",
            stiffness: 280,
            damping: 28,
          }}
          className="relative flex flex-col overflow-hidden rounded-2xl shadow-2xl"
          style={{
            width: "clamp(380px, 40vw, 520px)",
            maxHeight: "90vh",
            background: "#ffffff",
            border: "1px solid rgba(99,102,241,0.15)",
            boxShadow:
              "0 32px 80px rgba(0,0,0,0.18), 0 0 0 1px rgba(99,102,241,0.08)",
          }}
        >
          {/* ── Decorative top gradient bar ── */}
          <div
            className="absolute top-0 left-0 right-0 h-[3px] z-10"
            style={{
              background:
                "linear-gradient(90deg, #6366f1 0%, #8b5cf6 50%, #a78bfa 100%)",
            }}
          />

          {/* ── Header ── */}
          <div
            className="relative flex items-center justify-between px-5 pt-6 pb-4"
            style={{
              background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
              borderBottom: "1px solid rgba(99,102,241,0.2)",
            }}
          >
            {/* Company icon + name */}
            <div className="flex items-center gap-3 min-w-0">
              <div
                className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                  boxShadow: "0 4px 14px rgba(99,102,241,0.4)",
                }}
              >
                <Building2 size={18} className="text-white" />
              </div>
              <div className="min-w-0">
                <h2
                  className="text-white font-bold truncate"
                  style={{
                    fontSize: "clamp(0.95rem, 1.1vw, 1.1rem)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {company?.company_name || "N/A"}
                </h2>
                <p
                  className="text-indigo-300 truncate mt-0.5"
                  style={{ fontSize: "0.72rem", letterSpacing: "0.04em" }}
                >
                  {company?.industry_type || "N/A"}
                </p>
              </div>
            </div>

            {/* Breadcrumb dots + close */}
            <div className="flex items-center gap-3 flex-shrink-0">
              {isSubOverlayOpen && (
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 opacity-60" />
                  <ChevronRight size={10} className="text-slate-500" />
                  <div className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                </div>
              )}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.15 }}
                onClick={() => setClosing(false)}
                className="w-8 h-8 flex cursor-pointer rounded-full items-center justify-center text-slate-400 hover:text-white transition-colors"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <X size={15} />
              </motion.button>
            </div>
          </div>

          {/* ── Scrollable Body ── */}
          <div
            className="overflow-y-auto flex flex-col gap-6 p-5"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <style>{`div::-webkit-scrollbar { display: none; }`}</style>

            {/* Info section with subtle card wrapper */}
            <div
              className="rounded-xl p-4"
              style={{
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
              }}
            >
              <CompanyInfoSection
                company={company}
                contactElements={CONTACT_ELEMENTS(company)}
                businessDetails={BUSINESS_DETAILS(company)}
                heading_class={heading_class}
              />
            </div>

            {/* Jobs grid with card wrapper */}
            <div
              className="rounded-xl p-4"
              style={{
                background: "#f5f3ff",
                border: "1px solid rgba(99,102,241,0.15)",
              }}
            >
              <CompanyJobsGrid
                jobs={company?.jobs || []}
                candidates={candidates}
                onJobAction={handleClicking}
                heading_class={heading_class}
                getDays={(created_at) => getDaysPosted(created_at)}
              />
            </div>

            {/* Bottom spacer */}
            <div className="h-1" />
          </div>
        </motion.div>

        {/* ── Sub-overlay: View Job ── */}
        <AnimatePresence>
          {viewJob && (
            <motion.div
              key="view-job-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => {
                setViewJob(false);
                setClosing(true);
              }}
              className="absolute inset-0 flex items-center justify-center p-4 z-[202]"
              style={{
                background: "rgba(2,6,23,0.45)",
                backdropFilter: "blur(4px)",
                WebkitBackdropFilter: "blur(4px)",
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 16, scale: 0.97 }}
                transition={{
                  duration: 0.22,
                  type: "spring",
                  stiffness: 300,
                  damping: 28,
                }}
                onClick={(e) => e.stopPropagation()}
                className="rounded-2xl overflow-hidden"
                style={{
                  boxShadow: "0 40px 100px rgba(0,0,0,0.6), 0 0 0 1px",
                }}
              >
                <CompanyOverlay_AboutJob
                  job={job || {}}
                  company={company || {}}
                  setClosing={setClosing}
                  setViewJob={setViewJob}
                  heading_class={heading_class}
                  openCompanyOverlay={() => setClosing(true)}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Sub-overlay: Submit Candidate ── */}
        <AnimatePresence>
          {submitCandidate && (
            <motion.div
              key="submit-candidate-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => {
                setSubmitCandidate(false);
                setClosing(true);
              }}
              className="absolute inset-0 flex items-center justify-center p-4 z-[202]"
              style={{
                background: "rgba(2,6,23,0.45)",
                backdropFilter: "blur(4px)",
                WebkitBackdropFilter: "blur(4px)",
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 16, scale: 0.97 }}
                transition={{
                  duration: 0.22,
                  type: "spring",
                  stiffness: 300,
                  damping: 28,
                }}
                onClick={(e) => e.stopPropagation()}
                className="rounded-2xl overflow-hidden"
                style={{
                  boxShadow:
                    "0 40px 100px rgba(0,0,0,0.6), 0 0 0 1px rgba(139,92,246,0.2)",
                }}
              >
                <CompanyOverlay_SubmitCandidate
                  job={job}
                  company={company}
                  setClosing={setSubmitCandidate}
                  openCompanyOverlay={() => setClosing(true)}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}

export default CompanyViewOverlay;
