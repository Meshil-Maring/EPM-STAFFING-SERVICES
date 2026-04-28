import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReqResBen from "../SubmittedCondidates/ReqResBen";
import EditCardDetails from "../../Dashboard/EditCardDetails/EditCardDetails";
import { useNavigate } from "react-router-dom";
import { formatValue } from "../../../common/formatText";
import {
  MapPin,
  Briefcase,
  Wallet,
  Clock,
  Users,
  CalendarClock,
  FileText,
  Pencil,
  UserSearch,
  X,
  Building2,
} from "lucide-react";

function CompanyOverlay_AboutJob({
  job,
  company,
  setClosing,
  setViewJob,
  openCompanyOverlay,
}) {
  const navigate = useNavigate();
  const [editJobPost, setEditJobPost] = useState(false);

  if (!job || !company) return null;

  const job_name = job?.job_name || "N/A";
  const company_name = company?.company_name || "N/A";
  const job_id = job?.job_id;

  const SalaryRange = (min, max) => {
    if (!min || !max) return "N/A";
    return `${formatValue(min)} – ${formatValue(max)}`;
  };

  const getDate = (rawDate) => {
    if (!rawDate) return "N/A";
    const [date, time] = rawDate.split("T");
    return `${date}  ${time?.split(".")[0] || ""}`;
  };

  const infoCards = [
    { label: "Location", icon: MapPin, value: job?.location || "N/A" },
    { label: "Job Type", icon: Briefcase, value: job?.job_type || "N/A" },
    {
      label: "CTC Range",
      icon: Wallet,
      value: SalaryRange(job?.salary_min, job?.salary_max),
    },
    {
      label: "Experience",
      icon: Clock,
      value: job?.experience_years ? `${job.experience_years} yrs` : "N/A",
    },
    { label: "Applicants", icon: Users, value: job?.max_application || "N/A" },
    { label: "Deadline", icon: CalendarClock, value: getDate(job?.deadline) },
  ];

  const handleBtnClicking = (name) => {
    if (name === "Edit Job") {
      setEditJobPost(true);
    } else {
      setViewJob(false);
      setClosing(false);
      navigate("admin_company_overview");
      sessionStorage.setItem("selected_job_id", job_id);
    }
  };

  return (
    <>
      <AnimatePresence>
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, y: 28, scale: 0.97 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: editJobPost ? 0.58 : 1,
            filter: editJobPost ? "blur(2px)" : "blur(0px)",
          }}
          exit={{ opacity: 0, y: 20, scale: 0.97 }}
          transition={{
            duration: 0.25,
            type: "spring",
            stiffness: 300,
            damping: 28,
          }}
          className="relative flex flex-col rounded-2xl bg-white overflow-hidden"
          style={{
            width: "clamp(380px, 40vw, 520px)",
            maxHeight: "90vh",
            height: "90vh",
            boxShadow:
              "0 24px 64px rgba(0,0,0,0.14), 0 0 0 1px rgba(99,102,241,0.1)",
          }}
        >
          {/* ── Top accent bar ── */}
          <div
            className="h-0.75 w-full shrink-0"
            style={{
              background: "linear-gradient(90deg, #6366f1, #8b5cf6, #a78bfa)",
            }}
          />

          {/* ── Header ── */}
          <div
            className="flex items-center justify-between px-5 py-4 shrink-0"
            style={{
              background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
            }}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  boxShadow: "0 4px 12px rgba(99,102,241,0.4)",
                }}
              >
                <Briefcase size={15} className="text-white" />
              </div>
              <div className="min-w-0">
                <p
                  className="text-white font-bold leading-tight truncate"
                  style={{ fontSize: "clamp(0.85rem, 1vw, 1rem)" }}
                >
                  {job_name}
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <Building2 size={10} className="text-indigo-400 shrink-0" />
                  <p className="text-indigo-300 text-xs truncate">
                    {company_name}
                  </p>
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.15 }}
              onClick={() => {
                setViewJob(false);
                openCompanyOverlay();
              }}
              className="w-8 h-8 rounded-full cursor-pointer flex items-center justify-center text-slate-400 hover:text-white transition-colors shrink-0"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <X size={14} />
            </motion.button>
          </div>

          {/* ── Scrollable body ── */}
          <div
            className="flex-1 min-h-0 overflow-y-auto flex flex-col gap-5 p-5"
            style={{ scrollbarWidth: "none" }}
          >
            {/* ── Info grid ── */}
            <div className="rounded-xl" style={{ border: "1px solid #e2e8f0" }}>
              {/* Section label */}
              <div
                className="flex items-center gap-2 px-4 py-2.5"
                style={{
                  background: "#f8fafc",
                  borderBottom: "1px solid #e2e8f0",
                }}
              >
                <div
                  className="w-5 h-5 rounded-md flex items-center justify-center shrink-0"
                  style={{
                    background: "linear-gradient(135deg, #ede9fe, #ddd6fe)",
                  }}
                >
                  <FileText size={11} style={{ color: "#8b5cf6" }} />
                </div>
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-700">
                  Job Information
                </span>
              </div>

              {/* 2-col info cards */}
              <div className="grid grid-cols-2 gap-3 p-4 pb-5">
                {infoCards.map(({ label, icon: Icon, value }, i) => (
                  <motion.div
                    key={`info-${i}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.2 }}
                    className="flex items-start gap-2.5 rounded-xl p-3"
                    style={{
                      background: "#f8fafc",
                      border: "1px solid #e2e8f0",
                    }}
                  >
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                      style={{
                        background: "linear-gradient(135deg, #ede9fe, #ddd6fe)",
                      }}
                    >
                      <Icon size={13} style={{ color: "#8b5cf6" }} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-slate-400 font-medium">
                        {label}
                      </p>
                      <p className="text-sm font-semibold text-slate-700 mt-0.5 wrap-break-words">
                        {value}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* ── Job Description ── */}
            <div className="rounded-xl" style={{ border: "1px solid #e2e8f0" }}>
              <div
                className="flex items-center gap-2 px-4 py-2.5"
                style={{
                  background: "#f8fafc",
                  borderBottom: "1px solid #e2e8f0",
                }}
              >
                <div
                  className="w-5 h-5 rounded-md flex items-center justify-center shrink-0"
                  style={{
                    background: "linear-gradient(135deg, #ede9fe, #ddd6fe)",
                  }}
                >
                  <FileText size={11} style={{ color: "#8b5cf6" }} />
                </div>
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-700">
                  Job Description
                </span>
              </div>
              <div className="p-4">
                <p
                  className="text-sm text-slate-600 leading-relaxed rounded-xl p-3"
                  style={{ background: "#f5f3ff", border: "1px solid #ede9fe" }}
                >
                  {job?.job_description || "No description provided."}
                </p>
              </div>
            </div>

            {/* ── Requirements / Responsibilities / Benefits ── */}
            <div className="rounded-xl" style={{ border: "1px solid #e2e8f0" }}>
              <div
                className="flex items-center gap-2 px-4 py-2.5"
                style={{
                  background: "#f8fafc",
                  borderBottom: "1px solid #e2e8f0",
                }}
              >
                <div
                  className="w-5 h-5 rounded-md flex items-center justify-center shrink-0"
                  style={{
                    background: "linear-gradient(135deg, #ede9fe, #ddd6fe)",
                  }}
                >
                  <Users size={11} style={{ color: "#8b5cf6" }} />
                </div>
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-700">
                  Requirements & Benefits
                </span>
              </div>
              <div className="p-4">
                <ReqResBen currentJob={job} />
              </div>
            </div>

            {/* ── Action buttons ── */}
            <div className="flex gap-3 pb-1">
              {/* Edit Job */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleBtnClicking("Edit Job")}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold transition-all"
                style={{
                  border: "1.5px solid #c7d2fe",
                  color: "#6366f1",
                  background: "#eef2ff",
                }}
              >
                <Pencil size={14} />
                Edit Job
              </motion.button>

              {/* View Applicants */}
              {/* <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleBtnClicking("View Applicants")}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
                style={{
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  boxShadow: "0 4px 14px rgba(99,102,241,0.35)",
                }}
              >
                <UserSearch size={14} />
                View Applicants
              </motion.button> */}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ── Edit job sub-overlay ── */}
      {editJobPost && (
        <EditCardDetails
          setEditJobPost={setEditJobPost}
          setViewJob={setViewJob}
          card={job}
        />
      )}
    </>
  );
}

export default CompanyOverlay_AboutJob;
