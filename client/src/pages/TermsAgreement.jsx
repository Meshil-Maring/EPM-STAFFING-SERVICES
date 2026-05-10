import { useState, useRef } from "react";
import {
  FileText,
  Upload,
  CheckCircle2,
  AlertCircle,
  Percent,
  PenLine,
  Stamp,
  ChevronDown,
  ChevronUp,
  X,
  ArrowRight,
  Image as ImageIcon,
  Loader2,
  UserCheck,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { uploadAgreementService } from "../services/uploadFile.service";
import { showError } from "../utils/toastUtils";

// ─── Data ─────────────────────────────────────────────────────────────────────

const SECTIONS = [
  {
    title: "Candidate Sharing & Process",
    items: [
      "EPM Staffing Services (OPC) Private Limited will share candidate profiles without contact details initially.",
      "Contact details are provided only after the candidate is shortlisted by your company.",
    ],
  },
  {
    title: "Fees & Payment",
    items: [
      "A one-time professional fee (agreed signed % of annual CTC, with or without GST) shall be payable before 60 days from the candidate's date of joining, subject to the fulfilment of the service.",
      "The fee applies even if the candidate is hired within 6 months of referral, directly or indirectly.",
      "Invoice is issued after 45 days of candidate confirmation; payment is due within 7 days.",
      "Payments must be made via net banking or UPI.",
      "All payments shall be made in favour of EPM Staffing Services (OPC) Private Limited.",
    ],
  },
  {
    title: "Confirmation Clause",
    items: [
      "The company must confirm the candidate's continuation after 30 days.",
      "If no response is given within 7 days after that, the hire is considered successful by default.",
    ],
  },
  {
    title: "Replacement Guarantee",
    items: ["A 90-day replacement (lock-in) period is provided."],
  },
  {
    title: "Non-Payment Consequences",
    items: [
      "If payment is delayed beyond 45–60 days, the agency may suspend services, stop sharing candidates, or take legal/recovery action.",
    ],
  },
  {
    title: "Legal & Dispute Terms",
    items: [
      "Governed by Indian law.",
      "Disputes are settled via arbitration in Guwahati (in English).",
      "All legal costs are borne by your company.",
    ],
  },
  {
    title: "Duration & Termination",
    items: [
      "Agreement is valid for 3 years.",
      "Any changes must be agreed in writing.",
    ],
  },
];

// ─── UploadBox ────────────────────────────────────────────────────────────────

function UploadBox({ label, icon: Icon, file, onFileChange, onClear, accept }) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) onFileChange(dropped);
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-slate-700 flex items-center gap-1.5">
        <Icon size={14} className="text-violet-500" />
        {label}
      </label>

      {file ? (
        <div className="relative rounded-xl border border-violet-200 bg-violet-50 p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center shrink-0">
            <ImageIcon size={18} className="text-violet-600" />
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-900 truncate">
              {file.name}
            </p>
            <p className="text-xs text-slate-500 mt-0.5">
              {(file.size / 1024).toFixed(1)} KB
            </p>
          </div>

          <button
            onClick={onClear}
            className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center hover:bg-red-100 transition-colors"
          >
            <X size={13} className="text-slate-600" />
          </button>

          {file.type.startsWith("image/") && (
            <img
              src={URL.createObjectURL(file)}
              alt="preview"
              className="absolute right-14 top-2 w-10 h-10 object-contain rounded border border-slate-200"
            />
          )}
        </div>
      ) : (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`cursor-pointer rounded-xl border-2 border-dashed transition-all duration-200 p-5 flex flex-col items-center gap-2 text-center
            ${
              dragging
                ? "border-violet-400 bg-violet-50"
                : "border-slate-300 hover:border-violet-400 hover:bg-slate-100 bg-slate-50"
            }`}
        >
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${dragging ? "bg-violet-100" : "bg-slate-100"}`}
          >
            <Upload
              size={18}
              className={dragging ? "text-violet-500" : "text-slate-500"}
            />
          </div>
          <div>
            <p className="text-sm text-slate-700 font-medium">
              Drop file or <span className="text-violet-600">browse</span>
            </p>
            <p className="text-xs text-slate-500 mt-0.5">
              PNG, JPG, PDF up to 5MB
            </p>
          </div>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => e.target.files[0] && onFileChange(e.target.files[0])}
      />
    </div>
  );
}

// ─── SuccessScreen ────────────────────────────────────────────────────────────

function SuccessScreen({ serviceCharge }) {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 rounded-full bg-linear-to-br from-indigo-500 to-violet-500 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-indigo-500/20">
          <CheckCircle2 size={36} className="text-white" />
        </div>

        <h2 className="text-2xl font-semibold text-slate-900 mb-2">
          Agreement Submitted
        </h2>
        <p className="text-slate-600 text-sm mb-6">
          Your terms agreement with a service charge of{" "}
          <span className="text-violet-600 font-semibold">
            {serviceCharge}%
          </span>{" "}
          has been recorded successfully.
        </p>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 text-left space-y-3">
          {[
            {
              label: "Service Charge",
              value: `${serviceCharge}% of Annual CTC`,
            },
            { label: "Signature", value: "Uploaded", success: true },
            { label: "Company Stamp", value: "Uploaded", success: true },
          ].map(({ label, value, success }) => (
            <div key={label} className="flex justify-between text-sm">
              <span className="text-slate-500">{label}</span>
              {success ? (
                <span className="text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 size={13} /> {value}
                </span>
              ) : (
                <span className="text-slate-900 font-medium">{value}</span>
              )}
            </div>
          ))}
        </div>

        <Link
          to="/client/dashboard"
          className="mt-6 w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold bg-linear-to-r from-indigo-500 to-violet-600 text-white hover:from-indigo-600 hover:to-violet-700 shadow-lg shadow-indigo-500/20 transition-all duration-200 active:scale-[0.99]"
        >
          Go to Dashboard
          <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
}

// ─── TermsAccordion ───────────────────────────────────────────────────────────

function TermsAccordion({ expandedSections, onToggle }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-200">
        <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wider">
          Terms & Conditions
        </h2>
      </div>

      <div className="divide-y divide-slate-200">
        {SECTIONS.map((sec, i) => (
          <div key={i}>
            <button
              onClick={() => onToggle(i)}
              className="w-full flex items-center justify-between px-5 py-4 hover:bg-slate-100 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-violet-500 shrink-0" />
                <span className="text-sm font-medium text-slate-800">
                  {sec.title}
                </span>
              </div>
              {expandedSections[i] ? (
                <ChevronUp size={15} className="text-slate-500 shrink-0" />
              ) : (
                <ChevronDown size={15} className="text-slate-500 shrink-0" />
              )}
            </button>

            {expandedSections[i] && (
              <div className="px-5 pb-4">
                <ul className="space-y-2 ml-4">
                  {sec.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2.5">
                      <span className="w-1 h-1 rounded-full bg-slate-400 mt-2 shrink-0" />
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {item}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── ServiceChargeField ───────────────────────────────────────────────────────

function ServiceChargeField({ value, error, onChange }) {
  const borderClass = error
    ? "border-red-400 focus:border-red-500"
    : value && !error
      ? "border-emerald-400 focus:border-emerald-500"
      : "border-slate-300 focus:border-indigo-500";

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-7 h-7 rounded-lg bg-indigo-100 flex items-center justify-center">
          <Percent size={14} className="text-indigo-600" />
        </div>
        <h3 className="text-sm font-semibold text-slate-800">
          Agreed Service Charge
        </h3>
      </div>

      <div className="space-y-3">
        <div className="relative">
          <input
            type="number"
            min="8"
            max="100"
            step="0.5"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Enter percentage (min. 8%)"
            className={`w-full bg-white border rounded-xl px-4 py-3 pr-12 text-slate-900 text-sm placeholder-slate-400 outline-none transition-all ${borderClass}`}
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm font-medium">
            %
          </span>
        </div>

        {error && (
          <p className="flex items-center gap-1.5 text-xs text-red-500">
            <AlertCircle size={12} /> {error}
          </p>
        )}

        {value && !error && (
          <p className="flex items-center gap-1.5 text-xs text-emerald-600">
            <CheckCircle2 size={12} />
            {parseFloat(value).toFixed(1)}% of annual CTC agreed
          </p>
        )}

        <div className="bg-slate-50 rounded-lg border border-slate-200 p-3">
          <p className="text-xs text-slate-500 leading-relaxed">
            The professional fee is a one-time charge, payable within{" "}
            <span className="text-slate-700">60 days</span> of the candidate's
            joining date. GST applicable as per government norms.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── AuthorisationSection ─────────────────────────────────────────────────────

function AuthorisationSection({
  signatureFile,
  onSignatureChange,
  stampFile,
  onStampChange,
  authorityName,
  onAuthorityNameChange,
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-7 h-7 rounded-lg bg-violet-100 flex items-center justify-center">
          <PenLine size={14} className="text-violet-600" />
        </div>
        <h3 className="text-sm font-semibold text-slate-800">Authorisation</h3>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <UploadBox
          label="Authorised Signature"
          icon={PenLine}
          file={signatureFile}
          onFileChange={onSignatureChange}
          onClear={() => onSignatureChange(null)}
          accept="image/*,application/pdf"
        />

        <UploadBox
          label="Company Stamp"
          icon={Stamp}
          file={stampFile}
          onFileChange={onStampChange}
          onClear={() => onStampChange(null)}
          accept="image/*,application/pdf"
        />

        <div className="col-span-2 flex flex-col gap-2">
          <label className="text-sm font-medium text-slate-700 flex items-center gap-1.5">
            <UserCheck size={14} className="text-violet-500" />
            Name of Competent Authority
          </label>
          <input
            type="text"
            value={authorityName}
            onChange={(e) => onAuthorityNameChange(e.target.value)}
            placeholder="Enter full name"
            className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 text-sm placeholder-slate-400 outline-none transition-all focus:border-indigo-500"
          />
        </div>
      </div>
    </div>
  );
}

// ─── SubmitSection ────────────────────────────────────────────────────────────

const COMPLETION_CHECKS = [
  { key: "charge", label: "Charge set" },
  { key: "signature", label: "Signature" },
  { key: "stamp", label: "Stamp" },
  { key: "agreed", label: "Agreed" },
];

function SubmitSection({
  agreed,
  onAgreeToggle,
  serviceCharge,
  chargeError,
  canSubmit,
  loading,
  completionState,
  onSubmit,
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
      {/* Agree checkbox */}
      <label className="flex items-start gap-3 cursor-pointer group">
        <div
          onClick={onAgreeToggle}
          className={`w-5 h-5 rounded-md border-2 flex items-center justify-center mt-0.5 shrink-0 transition-all
            ${
              agreed
                ? "bg-indigo-500 border-indigo-500"
                : "border-slate-300 group-hover:border-indigo-400"
            }`}
        >
          {agreed && (
            <svg
              viewBox="0 0 10 8"
              className="w-3 h-3"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 4l3 3 5-6"
                stroke="white"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>

        <p className="text-sm text-slate-600 leading-relaxed">
          I confirm that I have read, understood, and agree to the above Terms &
          Conditions on behalf of my company. I accept the service charge of{" "}
          <span
            className={`font-medium ${serviceCharge && !chargeError ? "text-indigo-600" : "text-slate-400"}`}
          >
            {serviceCharge && !chargeError
              ? `${parseFloat(serviceCharge).toFixed(1)}%`
              : "___%"}
          </span>{" "}
          of annual CTC.
        </p>
      </label>

      {/* Submit button */}
      <button
        onClick={onSubmit}
        disabled={!canSubmit || loading}
        className={`w-full py-3.5 rounded-xl text-sm font-semibold transition-all duration-200
          ${
            canSubmit && !loading
              ? "bg-linear-to-r from-indigo-500 to-violet-600 text-white hover:from-indigo-600 hover:to-violet-700 shadow-lg shadow-indigo-500/20 active:scale-[0.99]"
              : "bg-slate-200 text-slate-500 cursor-not-allowed"
          }`}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 size={16} className="animate-spin" /> Uploading...
          </span>
        ) : canSubmit ? (
          "Submit Agreement"
        ) : (
          "Complete all fields to proceed"
        )}
      </button>

      {/* Completion indicators */}
      <div className="flex items-center justify-center gap-4 pt-1">
        {COMPLETION_CHECKS.map(({ key, label }) => (
          <div key={key} className="flex items-center gap-1.5">
            <div
              className={`w-1.5 h-1.5 rounded-full ${completionState[key] ? "bg-emerald-500" : "bg-slate-300"}`}
            />
            <span
              className={`text-xs ${completionState[key] ? "text-emerald-600" : "text-slate-400"}`}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── TermsAgreement (main) ────────────────────────────────────────────────────

export default function TermsAgreement() {
  const navigate = useNavigate();

  const [expandedSections, setExpandedSections] = useState(
    SECTIONS.map((_, i) => i < 2),
  );
  const [serviceCharge, setServiceCharge] = useState("");
  const [chargeError, setChargeError] = useState("");
  const [authorityName, setAuthorityName] = useState("");
  const [signatureFile, setSignatureFile] = useState(null);
  const [stampFile, setStampFile] = useState(null);
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleToggleSection = (i) =>
    setExpandedSections((prev) => prev.map((v, idx) => (idx === i ? !v : v)));

  const handleChargeChange = (val) => {
    setServiceCharge(val);
    const num = parseFloat(val);
    if (val === "") setChargeError("");
    else if (isNaN(num)) setChargeError("Enter a valid number");
    else if (num < 8) setChargeError("Minimum service charge is 8%");
    else if (num > 100) setChargeError("Cannot exceed 100%");
    else setChargeError("");
  };

  const canSubmit =
    serviceCharge !== "" &&
    !chargeError &&
    signatureFile &&
    stampFile &&
    authorityName.trim() !== "" &&
    agreed;

  const completionState = {
    charge: !!serviceCharge && !chargeError,
    signature: !!signatureFile,
    stamp: !!stampFile,
    agreed,
  };

  const handleSubmit = async () => {
    if (!canSubmit || loading) return;

    const user_id = localStorage.getItem("user_id");
    const company_name = localStorage.getItem("company_name");

    if (!user_id) return navigate("/auth/signup_form");
    if (!company_name) return navigate("/auth/signup_form/company_information");

    setLoading(true);

    try {
      await uploadAgreementService({
        signatureFile,
        stampFile,
        user_id,
        company_name,
        authority_name: authorityName,
        service_charge: serviceCharge,
      });

      setSubmitted(true);
    } catch (err) {
      showError(
        err?.message || "Upload failed. Please check your files and try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  if (submitted) return <SuccessScreen serviceCharge={serviceCharge} />;

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-5">
        {/* Header */}
        <div className="bg-linear-to-r from-white to-slate-50 rounded-2xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-indigo-500 to-violet-600 flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/20">
              <FileText size={22} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-slate-900 leading-tight">
                Service Agreement
              </h1>
              <p className="text-slate-600 text-sm mt-1 leading-relaxed">
                EPM Staffing Services (OPC) Private Limited — Terms & Conditions
              </p>
              <div className="flex items-center gap-2 mt-3">
                <span className="inline-flex items-center gap-1.5 text-xs bg-amber-50 text-amber-700 border border-amber-200 rounded-full px-3 py-1">
                  <AlertCircle size={11} /> Review all sections before signing
                </span>
              </div>
            </div>
          </div>
        </div>

        <TermsAccordion
          expandedSections={expandedSections}
          onToggle={handleToggleSection}
        />

        <ServiceChargeField
          value={serviceCharge}
          error={chargeError}
          onChange={handleChargeChange}
        />

        <AuthorisationSection
          signatureFile={signatureFile}
          onSignatureChange={setSignatureFile}
          stampFile={stampFile}
          onStampChange={setStampFile}
          authorityName={authorityName}
          onAuthorityNameChange={setAuthorityName}
        />

        <SubmitSection
          agreed={agreed}
          onAgreeToggle={() => setAgreed((v) => !v)}
          serviceCharge={serviceCharge}
          chargeError={chargeError}
          canSubmit={canSubmit}
          loading={loading}
          completionState={completionState}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
