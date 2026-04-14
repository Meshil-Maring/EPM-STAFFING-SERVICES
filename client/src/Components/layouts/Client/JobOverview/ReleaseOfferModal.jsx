import { useState, useRef } from "react";
import {
  X,
  Calendar,
  ChevronDown,
  Upload,
  User,
  TriangleAlert,
} from "lucide-react";

const OFFER_TYPES = ["Full-Time", "Part-Time", "Contract", "Internship"];

const inputClass =
  "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-300 transition bg-white";

const Field = ({ label, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm font-medium text-gray-800">{label}</label>
    {children}
  </div>
);

export default function ReleaseOfferModal({ candidate, onClose }) {
  const candidateName = candidate?.candidate?.[0]?.candidate_name ?? "—";
  const jobName = candidate?.jobs?.[0]?.job_name ?? "—";
  const status = candidate?.status ?? "Accepted";

  const fileInputRef = useRef(null);
  const [confirmed, setConfirmed] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);

  const [form, setForm] = useState({
    jobRole: "",
    offeredCTC: "",
    joiningDate: "",
    offerType: "Full-Time",
    reportBy: "",
    officeLocation: "",
    noticePeriod: "",
    workStart: "",
    workEnd: "",
    message: "",
  });

  const set = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleFileDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer?.files?.[0] || e.target.files?.[0];
    if (file && file.type === "application/pdf") setPdfFile(file);
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl relative max-h-[95vh] overflow-y-auto">
        {/* Red Header */}
        <div className="bg-red-500 rounded-t-2xl px-6 py-5 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-orange-400 flex items-center justify-center shrink-0">
              <User size={22} className="text-white" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-white leading-tight">
                {candidateName}
              </h2>

              <div className="flex items-center gap-4">
                <p className="text-red-100 text-sm">{jobName}</p>
                <span className="inline-block mt-1 bg-indigo-500 text-white text-xs font-medium px-2.5 py-0.5 rounded-full capitalize">
                  {status}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="cursor-pointer text-white/70 hover:text-white transition-colors mt-0.5"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 flex flex-col gap-5">
          {/* Row 1 */}
          <div className="grid grid-cols-2 gap-4">
            <Field label="Job Role">
              <input
                type="text"
                value={form.jobRole}
                onChange={set("jobRole")}
                placeholder="Frontend Developer"
                className={inputClass}
              />
            </Field>
            <Field label="Offered CTC (LPA)">
              <input
                type="text"
                value={form.offeredCTC}
                onChange={set("offeredCTC")}
                placeholder="95K - 100K LPA"
                className={inputClass}
              />
            </Field>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-2 gap-4">
            <Field label="Joining Date">
              <div className="relative">
                <input
                  type="date"
                  value={form.joiningDate}
                  onChange={set("joiningDate")}
                  className={`${inputClass} pr-2`}
                />
              </div>
            </Field>

            <Field label="Offer Type">
              <div className="relative">
                <select
                  value={form.offerType}
                  onChange={set("offerType")}
                  className={`${inputClass} pr-10 appearance-none cursor-pointer`}
                >
                  {OFFER_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={15}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
              </div>
            </Field>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-2 gap-4">
            <Field label="Report By">
              <input
                type="text"
                value={form.reportBy}
                onChange={set("reportBy")}
                placeholder="Anjali Mehta"
                className={inputClass}
              />
            </Field>
            <Field label="Office Location">
              <input
                type="text"
                value={form.officeLocation}
                onChange={set("officeLocation")}
                placeholder="Nariman Point, Mumbai - 400021"
                className={inputClass}
              />
            </Field>
          </div>

          {/* Notice Period */}
          <div className="grid grid-cols-2 gap-4">
            <Field label="Notice Period">
              <input
                type="text"
                value={form.noticePeriod}
                onChange={set("noticePeriod")}
                placeholder="1 months"
                className={inputClass}
              />
            </Field>
          </div>

          {/* Working Hours */}
          <Field label="Working Hours">
            <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3 bg-white focus-within:ring-2 focus-within:ring-orange-300 transition">
              <input
                type="time"
                value={form.workStart}
                onChange={set("workStart")}
                className="text-sm text-gray-800 focus:outline-none bg-transparent"
              />
              <span className="text-gray-400 font-medium">—</span>
              <input
                type="time"
                value={form.workEnd}
                onChange={set("workEnd")}
                className="text-sm text-gray-800 focus:outline-none bg-transparent"
              />
            </div>
          </Field>

          {/* PDF Upload */}
          <Field label="Attach Offer Letter (PDF)">
            <div
              onClick={() => fileInputRef.current?.click()}
              onDrop={handleFileDrop}
              onDragOver={(e) => e.preventDefault()}
              className="border-2 border-dashed border-gray-300 rounded-xl px-4 py-6 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-orange-400 hover:bg-orange-50 transition-colors"
            >
              <Upload size={18} className="text-gray-400" />
              <span className="text-sm text-gray-400">
                {pdfFile ? pdfFile.name : "Click to upload PDF"}
              </span>
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
              placeholder="Congratulation! We Pleased to offer you."
              rows={4}
              className={`${inputClass} resize-none`}
            />
          </Field>

          {/* Warning Banner */}
          <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
            <TriangleAlert
              size={15}
              className="text-orange-500 mt-0.5 shrink-0"
            />
            <p className="text-xs text-red-600 leading-relaxed">
              Releasing an offer will notify the candidate via email. Please
              verify all details before proceeding
            </p>
          </div>

          {/* Confirm Checkbox */}
          <label className="flex items-center gap-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 accent-orange-500 cursor-pointer"
            />
            <span className="text-sm text-gray-700">
              I confirm that all offer details are correct
            </span>
          </label>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-1">
            <button
              onClick={onClose}
              className="cursor-pointer px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              disabled={!confirmed}
              className="cursor-pointer px-6 py-2.5 rounded-xl bg-linear-to-r from-orange-500 to-red-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Release Offer Letter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
