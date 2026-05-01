import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  Users,
  Calendar,
  FileText,
  Plus,
  X,
  ChevronRight,
  Loader2,
  Star,
} from "lucide-react";
import JobForm_Anchor_Component from "../layouts/Dashboard/PostNewJob/JobForm_Anchor_Component";
import Header from "../layouts/Dashboard/Candidate/Common/Header";
import { showSuccess, showError } from "../../utils/toastUtils";
import { useAuth } from "../../hooks/useAuth";
import { insertDataService } from "../../utils/server_until/service";

// ─── Each dynamic section config ─────────────────────────────────────────────
const SECTIONS = [
  {
    id: "requirements",
    label: "Requirements",
    icon: ChevronRight,
    color: "indigo",
  },
  {
    id: "responsibilities",
    label: "Responsibilities",
    icon: ChevronRight,
    color: "violet",
  },
  { id: "benefits", label: "Benefits & Perks", icon: Star, color: "indigo" },
];

// ── Stable-ID list item helpers ───────────────────────────────────────────────
const makeItem = (value = "") => ({ id: crypto.randomUUID(), value });
const itemsToPayload = (items) =>
  items.reduce((acc, item, i) => ({ ...acc, [i]: item.value }), {});

// ─── Main Component ───────────────────────────────────────────────────────────
function JobForm({ setClosing, onSuccess }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const defaultForm = {
    job_title: "",
    priority: false,
    location: "",
    contract_type: "full-time",
    offer_ctc_min: "",
    offer_ctc_max: "",
    experience_required: "",
    max_applications: "",
    application_deadline: "",
    description: "",
    requirements: [],
    responsibilities: [],
    benefits: [],
  };

  const [job_form, setJob_form] = useState(defaultForm);
  const [loading, setLoading] = useState(false);

  // ── Generic field handler ─────────────────────────────────────────────────
  const handleInputChange = (value, id) =>
    setJob_form((prev) => ({ ...prev, [id]: value ?? "" }));

  // ── Dynamic list handlers (stable-id based) ────────────────────────────────
  const handleAddItem = (sectionId) =>
    setJob_form((prev) => ({
      ...prev,
      [sectionId]: [...prev[sectionId], makeItem()],
    }));

  //  match by item.id, not index — no more key mismatch
  const handleItemChange = (sectionId, itemId, value) =>
    setJob_form((prev) => ({
      ...prev,
      [sectionId]: prev[sectionId].map((item) =>
        item.id === itemId ? { ...item, value } : item,
      ),
    }));

  //  filter by item.id — safe deletion every time
  const handleRemoveItem = (sectionId, itemId) =>
    setJob_form((prev) => ({
      ...prev,
      [sectionId]: prev[sectionId].filter((item) => item.id !== itemId),
    }));

  // ── Submit ────────────────────────────────────────────────────────────────
  const handleFormSubmission = async () => {
    if (loading) return;

    const requiredFields = [
      "job_title",
      "location",
      "contract_type",
      "offer_ctc_min",
      "offer_ctc_max",
      "experience_required",
      "max_applications",
      "application_deadline",
      "description",
    ];

    const missing = requiredFields.filter(
      (f) => !job_form[f]?.toString().trim(),
    );
    if (missing.length > 0)
      return showError(`Please fill required fields: ${missing.join(", ")}`);

    if (Number(job_form.offer_ctc_min) > Number(job_form.offer_ctc_max))
      return showError("Minimum CTC cannot be greater than Maximum CTC");

    try {
      setLoading(true);

      const readyPost = {
        active: true,
        urgent: job_form.priority,
        location: job_form.location,
        job_name: job_form.job_title,
        job_type: job_form.contract_type.toLowerCase(),
        salary_min: Number(job_form.offer_ctc_min),
        salary_max: Number(job_form.offer_ctc_max),
        experience_years: job_form.experience_required,
        max_applications: job_form.max_applications,
        deadline: job_form.application_deadline,
        description: job_form.description,
        user_id: user.id,
      };

      const res = await insertDataService("api/dr/insert/jobs", readyPost);
      const jobId = res.data.id;

      // push notification
      insertDataService("api/dr/insert/notifications", {
        user_id: user.id,
        type: "job_post",
        title: "Post New Job",
        message: `Job "${job_form.job_title}" is posted. Candidates can now apply.`,
        user_type: "client",
        reference_id: jobId,
        reference_type: "job",
      });

      if (!res.success) return showError("Failed to post job");

      // ── Sub-inserts (always send, empty payload if nothing added) ──────────
      await Promise.all([
        insertDataService("api/dr/insert/job_requirements", {
          job_id: jobId,
          requirements: itemsToPayload(job_form.requirements),
        }),
        insertDataService("api/dr/insert/job_responsibilities", {
          job_id: jobId,
          responsibilities: itemsToPayload(job_form.responsibilities),
        }),
        insertDataService("api/dr/insert/job_benefits", {
          job_id: jobId,
          benefits: itemsToPayload(job_form.benefits),
        }),
      ]);

      showSuccess("Job posted successfully!");
      onSuccess?.();
      setClosing(false);
      navigate("/client/dashboard");
    } catch (err) {
      console.error(err);
      showError("Failed to post job");
    } finally {
      setLoading(false);
    }
  };

  // ─── Section accent colours ────────────────────────────────────────────────
  const sectionStyles = {
    indigo: {
      badge: "bg-indigo-50 text-indigo-600 border border-indigo-100",
      add: "text-indigo-500 hover:text-indigo-700 hover:bg-indigo-50",
      input: "focus:ring-indigo-400 focus:border-indigo-400",
      remove: "hover:text-indigo-500 hover:bg-indigo-50",
    },
    violet: {
      badge: "bg-violet-50 text-violet-600 border border-violet-100",
      add: "text-violet-500 hover:text-violet-700 hover:bg-violet-50",
      input: "focus:ring-violet-400 focus:border-violet-400",
      remove: "hover:text-violet-500 hover:bg-violet-50",
    },
  };

  return (
    <div
      onClick={() => setClosing(false)}
      className="absolute inset-0 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm z-200"
    >
      <motion.div
        initial={{ opacity: 0, x: "100%", scale: 0.97 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: "100%" }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col w-[42%] h-full bg-white rounded-xl shadow-2xl overflow-hidden border border-slate-100"
      >
        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div className="shrink-0 bg-linear-to-r from-slate-800 to-slate-900 px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center">
              <Briefcase size={16} className="text-indigo-400" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm">Post New Job</p>
              <p className="text-slate-400 text-xs">
                Fill in the details below
              </p>
            </div>
          </div>
          <button
            onClick={() => setClosing(false)}
            className="w-8 h-8 rounded-lg bg-slate-700 hover:bg-slate-600 flex items-center justify-center transition-colors"
          >
            <X size={15} className="text-slate-300" />
          </button>
        </div>

        {/* ── Scrollable Body ─────────────────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto">
          {/* Core fields from anchor component */}
          <div className="px-5 pt-5">
            <JobForm_Anchor_Component
              handleInputChange={handleInputChange}
              job_form={job_form}
            />
          </div>

          {/* ── Dynamic Sections ──────────────────────────────────────────── */}
          <div className="px-5 pb-4 flex flex-col gap-4 mt-4">
            {SECTIONS.map(({ id, label, icon: SectionIcon, color }) => {
              const s = sectionStyles[color];
              return (
                <div
                  key={id}
                  className="rounded-xl border border-slate-100 bg-slate-50/60 overflow-hidden"
                >
                  {/* Section header */}
                  <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-white">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs font-semibold px-2 py-0.5 rounded-full ${s.badge}`}
                      >
                        {label}
                      </span>
                      <span className="text-xs text-slate-400">
                        {job_form[id].length} item
                        {job_form[id].length !== 1 ? "s" : ""}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleAddItem(id)}
                      className={`flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-lg transition-colors duration-150 ${s.add}`}
                    >
                      <Plus size={13} /> Add
                    </button>
                  </div>

                  {/* Items */}
                  <div className="px-3 py-2 flex flex-col gap-2">
                    {job_form[id].length === 0 && (
                      <p className="text-xs text-slate-400 italic py-1.5 text-center">
                        No items yet — click Add to begin
                      </p>
                    )}

                    <AnimatePresence initial={false}>
                      {job_form[id].map((item) => (
                        <motion.div
                          key={item.id} // ✅ stable ID, not index
                          initial={{ opacity: 0, y: -4, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, x: 16, scale: 0.97 }}
                          transition={{ duration: 0.18 }}
                          className="flex items-center gap-2"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-slate-300 flex-shrink-0" />
                          <input
                            type="text"
                            value={item.value} // ✅ always a string
                            onChange={(e) =>
                              handleItemChange(id, item.id, e.target.value)
                            }
                            placeholder={`Add a ${label.toLowerCase()} point...`}
                            className={`flex-1 border border-slate-200 rounded-lg px-3 py-1.5 text-sm bg-white focus:outline-none focus:ring-1 transition ${s.input}`}
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveItem(id, item.id)} // ✅ by ID
                            className={`w-6 h-6 shrink-0 flex items-center justify-center rounded-lg text-slate-400 transition-all duration-150 ${s.remove}`}
                            aria-label={`Remove ${label} item`}
                          >
                            <X size={13} />
                          </button>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Submit Button ──────────────────────────────────────────────── */}
          <div className="px-5 pb-6">
            <button
              type="button"
              onClick={handleFormSubmission}
              disabled={loading}
              className={`w-full py-2.5 rounded-xl font-semibold text-sm text-white flex items-center justify-center gap-2 transition-all duration-200 ${
                loading
                  ? "bg-slate-400 cursor-not-allowed"
                  : "bg-linear-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 hover:scale-[1.01] shadow-md shadow-indigo-200"
              }`}
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Posting...
                </>
              ) : (
                <>
                  <Briefcase size={15} />
                  Post Job
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default JobForm;
