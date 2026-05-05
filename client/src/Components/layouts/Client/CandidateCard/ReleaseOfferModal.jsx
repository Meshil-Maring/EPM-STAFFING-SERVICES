import { useState, useRef } from "react";
import {
  X,
  ChevronDown,
  Upload,
  User,
  Loader2,
  CheckCircle2,
  XCircle,
  Briefcase,
  MapPin,
  Clock,
  FileText,
  CalendarDays,
  DollarSign,
  FileCheck2,
} from "lucide-react";
import { offerReleased } from "./CandidateCard";
import { showSuccess } from "../../../../utils/toastUtils";
import { useAuth } from "../../../../hooks/useAuth.js";
import { pushNotification } from "../../Notifications/notification.js";

const OFFER_TYPES = ["Full-Time", "Part-Time", "Contract", "Internship"];

const inputClass =
  "w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 transition bg-white";

/* ── Field wrapper ─────────────────────────────────────────── */
const Field = ({ label, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
      {label}
    </label>
    {children}
  </div>
);

/* ── Section block ─────────────────────────────────────────── */
const Section = ({ icon: Icon, title, children }) => (
  <div className="rounded-2xl border border-gray-100 bg-gray-50/60 p-4 flex flex-col gap-4">
    <div className="flex items-center gap-2">
      <span className="w-6 h-6 rounded-lg bg-violet-100 flex items-center justify-center shrink-0">
        <Icon size={13} className="text-violet-500" />
      </span>
      <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
        {title}
      </span>
    </div>
    {children}
  </div>
);

/* ── Toast ─────────────────────────────────────────────────── */
const Toast = ({ type, message, onClose }) => {
  const isSuccess = type === "success";
  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-medium shadow-sm
        ${
          isSuccess
            ? "bg-emerald-50 border-emerald-200 text-emerald-700"
            : "bg-red-50 border-red-200 text-red-700"
        }`}
    >
      {isSuccess ? (
        <CheckCircle2 size={15} className="text-emerald-500 shrink-0" />
      ) : (
        <XCircle size={15} className="text-red-400 shrink-0" />
      )}
      <span className="flex-1">{message}</span>
      <button
        onClick={onClose}
        className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer ml-1"
      >
        <X size={13} />
      </button>
    </div>
  );
};

/* ── Main Component ────────────────────────────────────────── */
export default function ReleaseOfferModal({ application, onClose }) {
  const candidateName = application?.candidate?.[0]?.candidate_name ?? "—";
  const jobName = application?.jobs?.[0]?.job_name ?? "—";
  const status = application?.status ?? "Accepted";
  const initials = candidateName
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");

  const { user } = useAuth();
  const fileInputRef = useRef(null);

  const [confirmed, setConfirmed] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [toast, setToast] = useState(null);

  const [form, setForm] = useState({
    jobRole: "",
    offeredCTCMin: "",
    offeredCTCMax: "",
    joiningDate: "",
    offerType: "Full-Time",
    reportBy: "",
    officeLocation: "",
    acceptanceDeadline: "",
    workStart: "",
    workEnd: "",
    message: "",
  });

  const set = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleFileDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer?.files?.[0] || e.target.files?.[0];
    if (file && file.type === "application/pdf") setPdfFile(file);
  };

  const releaseOfferHandler = async () => {
    setLoading(true);
    setToast(null);

    const res = await offerReleased(
      application.id,
      application.candidate[0].id,
      form,
      pdfFile,
    );

    setLoading(false);

    if (res.success) {
      showSuccess("Offer Released Successfully");
      await pushNotification(
        application.id,
        user?.id,
        "offer_released",
        "Offer Letter Released",
        `Congratulations! An offer letter has been released for the position of "${jobName}". ` +
          `Please review the offer details and respond before the acceptance deadline.`,
        "client",
        "candidate",
      );
      setTimeout(() => onClose(), 1800);
    } else {
      setToast({ type: "error", message: res.message });
    }
  };

  /* status badge colour */
  const statusColor =
    status === "Accepted"
      ? "bg-emerald-100 text-emerald-700"
      : status === "Pending"
        ? "bg-amber-100 text-amber-700"
        : status === "Rejected"
          ? "bg-red-100 text-red-700"
          : "bg-blue-100 text-blue-700";

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl relative flex flex-col max-h-[95vh]">
        {/* ── Header ─────────────────────────────────────── */}
        <div
          className="rounded-t-3xl px-6 py-5 flex items-center justify-between shrink-0"
          style={{
            background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
          }}
        >
          <div className="flex items-center gap-3.5">
            {/* Avatar */}
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-base shrink-0 shadow-md"
              style={{
                background: "linear-gradient(135deg, #fb923c, #ef4444)",
              }}
            >
              {initials || <User size={20} />}
            </div>

            <div className="flex flex-col gap-0.5">
              <h2 className="text-lg font-bold text-white leading-tight">
                {candidateName}
              </h2>
              <div className="flex items-center gap-2.5">
                <span className="text-slate-400 text-xs font-medium">
                  {jobName}
                </span>
                <span
                  className={`inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-full ${statusColor}`}
                >
                  {status}
                </span>
              </div>
            </div>
          </div>

          {/* Chip + close */}
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 bg-white/10 border border-white/20 text-white/80 text-xs font-medium px-3 py-1.5 rounded-full">
              <FileCheck2 size={11} />
              Release Offer
            </span>
            <button
              onClick={onClose}
              className="cursor-pointer text-white/50 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* ── Scrollable Body ─────────────────────────────── */}
        <div className="flex-1 min-h-0 overflow-y-auto px-6 py-5 flex flex-col gap-4">
          {/* Section 1 — Role & Compensation */}
          <Section icon={DollarSign} title="Role & Compensation">
            <div className="grid grid-cols-2 gap-3">
              <Field label="Job Role">
                <input
                  type="text"
                  value={form.jobRole}
                  onChange={set("jobRole")}
                  placeholder="e.g. Frontend Developer"
                  className={inputClass}
                />
              </Field>

              <Field label="Offered CTC (LPA)">
                <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-white focus-within:ring-2 focus-within:ring-indigo-300 focus-within:border-indigo-300 transition">
                  <input
                    type="number"
                    value={form.offeredCTCMin}
                    onChange={set("offeredCTCMin")}
                    placeholder="Min"
                    className="w-full px-3 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none bg-transparent"
                  />
                  <span className="text-gray-300 font-light shrink-0 select-none">
                    |
                  </span>
                  <input
                    type="number"
                    value={form.offeredCTCMax}
                    onChange={set("offeredCTCMax")}
                    placeholder="Max"
                    className="w-full px-3 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none bg-transparent"
                  />
                  <span className="pr-3 text-gray-400 text-[11px] font-semibold shrink-0">
                    LPA
                  </span>
                </div>
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Offer Type">
                <div className="relative">
                  <select
                    value={form.offerType}
                    onChange={set("offerType")}
                    className={`${inputClass} pr-9 appearance-none cursor-pointer`}
                  >
                    {OFFER_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={14}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  />
                </div>
              </Field>

              <Field label="Report To">
                <input
                  type="text"
                  value={form.reportBy}
                  onChange={set("reportBy")}
                  placeholder="e.g. Anjali Mehta"
                  className={inputClass}
                />
              </Field>
            </div>
          </Section>

          {/* Section 2 — Schedule */}
          <Section icon={CalendarDays} title="Schedule & Deadlines">
            <div className="grid grid-cols-2 gap-3">
              <Field label="Joining Date">
                <input
                  type="date"
                  value={form.joiningDate}
                  onChange={set("joiningDate")}
                  className={inputClass}
                />
              </Field>

              <Field label="Acceptance Deadline">
                <input
                  type="date"
                  value={form.acceptanceDeadline}
                  onChange={set("acceptanceDeadline")}
                  className={inputClass}
                />
              </Field>
            </div>

            <Field label="Working Hours">
              <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-2.5 bg-white focus-within:ring-2 focus-within:ring-indigo-300 focus-within:border-indigo-300 transition">
                <Clock size={14} className="text-gray-400 shrink-0" />
                <input
                  type="time"
                  value={form.workStart}
                  onChange={set("workStart")}
                  className="text-sm text-gray-800 focus:outline-none bg-transparent"
                />
                <span className="text-gray-300 font-light select-none">—</span>
                <input
                  type="time"
                  value={form.workEnd}
                  onChange={set("workEnd")}
                  className="text-sm text-gray-800 focus:outline-none bg-transparent"
                />
              </div>
            </Field>
          </Section>

          {/* Section 3 — Location */}
          <Section icon={MapPin} title="Location">
            <Field label="Office Location">
              <div className="relative">
                <MapPin
                  size={14}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
                <input
                  type="text"
                  value={form.officeLocation}
                  onChange={set("officeLocation")}
                  placeholder="e.g. Nariman Point, Mumbai – 400021"
                  className={`${inputClass} pl-9`}
                />
              </div>
            </Field>
          </Section>

          {/* Section 4 — Documents & Message */}
          <Section icon={FileText} title="Documents & Message">
            {/* PDF Upload */}
            <Field label="Offer Letter PDF">
              <div
                onClick={() => fileInputRef.current?.click()}
                onDrop={handleFileDrop}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                className={`border-2 border-dashed rounded-xl px-4 py-5 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all
                  ${
                    dragOver
                      ? "border-indigo-400 bg-indigo-50"
                      : pdfFile
                        ? "border-emerald-300 bg-emerald-50"
                        : "border-gray-200 bg-gray-50 hover:border-indigo-300 hover:bg-indigo-50/40"
                  }`}
              >
                {pdfFile ? (
                  <>
                    <FileCheck2 size={20} className="text-emerald-500" />
                    <span className="text-sm font-medium text-emerald-700 text-center leading-snug">
                      {pdfFile.name}
                    </span>
                    <span className="text-xs text-emerald-500">
                      Click to replace
                    </span>
                  </>
                ) : (
                  <>
                    <Upload size={18} className="text-gray-400" />
                    <span className="text-sm text-gray-500 font-medium">
                      Click or drag a PDF here
                    </span>
                    <span className="text-xs text-gray-400">Max 10 MB</span>
                  </>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="application/pdf"
                  className="hidden"
                  onChange={handleFileDrop}
                />
              </div>
            </Field>

            {/* Message */}
            <Field label="Message to Candidate (optional)">
              <textarea
                value={form.message}
                onChange={set("message")}
                placeholder="Congratulations! We're pleased to offer you this position…"
                rows={3}
                className={`${inputClass} resize-none`}
              />
            </Field>
          </Section>

          {/* Toast */}
          {toast && (
            <Toast
              type={toast.type}
              message={toast.message}
              onClose={() => setToast(null)}
            />
          )}
        </div>

        {/* ── Sticky Footer ──────────────────────────────── */}
        <div className="shrink-0 px-6 py-4 border-t border-gray-100 bg-white rounded-b-3xl flex items-center justify-between gap-4">
          {/* Confirm checkbox */}
          <label className="flex items-center gap-2.5 cursor-pointer select-none min-w-0">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 accent-indigo-500 cursor-pointer shrink-0"
            />
            <span className="text-sm text-gray-600 leading-tight">
              All offer details are correct
            </span>
          </label>

          {/* Actions */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={onClose}
              disabled={loading}
              className="cursor-pointer px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Cancel
            </button>

            <button
              onClick={releaseOfferHandler}
              disabled={!confirmed || loading}
              className="cursor-pointer px-5 py-2.5 rounded-xl text-white text-sm font-semibold hover:opacity-90 active:scale-[0.98] transition-all shadow-sm disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 min-w-[160px] justify-center"
              style={{
                background: "linear-gradient(135deg, #f97316, #ef4444)",
              }}
            >
              {loading ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Releasing…
                </>
              ) : (
                <>
                  <FileCheck2 size={14} />
                  Release Offer
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
