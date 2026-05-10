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
  ImageIcon,
  Loader2,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { uploadPdfService } from "../services/uploadFile.service";

const sections = [
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
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors
            ${dragging ? "bg-violet-100" : "bg-slate-100"}`}
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

export default function TermsAgreement() {
  const navigate = useNavigate();

  const [expandedSections, setExpandedSections] = useState(
    sections.map((_, i) => i < 2),
  );

  const [serviceCharge, setServiceCharge] = useState("");
  const [chargeError, setChargeError] = useState("");
  const [signatureFile, setSignatureFile] = useState(null);
  const [stampFile, setStampFile] = useState(null);
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const toggleSection = (i) => {
    setExpandedSections((prev) => prev.map((v, idx) => (idx === i ? !v : v)));
  };

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
    agreed;

  // -------------- Submit Handler ------------
  const handleSubmit = async () => {
    const user_id = localStorage.getItem("user_id");
    const company_name = localStorage.getItem("company_name");

    if (!user_id) navigate("/auth/signup_form");

    if (!company_name) navigate("/auth/signup_form/company_information");

    if (!canSubmit || loading) return;

    setLoading(true);
    setSubmitError("");

    try {
      await Promise.all([
        uploadPdfService(
          "api/users/upload/files",
          signatureFile,
          user_id,
          "signatures",
          company_name,
        ),

        uploadPdfService(
          "api/users/upload/files",
          stampFile,
          user_id,
          "stamps",
          company_name,
        ),
      ]);

      setSubmitted(true);
    } catch (err) {
      setSubmitError(
        err?.message || "Upload failed. Please check your files and try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
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
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Service Charge</span>

              <span className="text-slate-900 font-medium">
                {serviceCharge}% of Annual CTC
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Signature</span>

              <span className="text-emerald-600 flex items-center gap-1">
                <CheckCircle2 size={13} />
                Uploaded
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Company Stamp</span>

              <span className="text-emerald-600 flex items-center gap-1">
                <CheckCircle2 size={13} />
                Uploaded
              </span>
            </div>
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
                  <AlertCircle size={11} />
                  Review all sections before signing
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Terms */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-200">
            <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wider">
              Terms & Conditions
            </h2>
          </div>

          <div className="divide-y divide-slate-200">
            {sections.map((sec, i) => (
              <div key={i}>
                <button
                  onClick={() => toggleSection(i)}
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
                    <ChevronDown
                      size={15}
                      className="text-slate-500 shrink-0"
                    />
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

        {/* Service Charge */}
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
                value={serviceCharge}
                onChange={(e) => handleChargeChange(e.target.value)}
                placeholder="Enter percentage (min. 8%)"
                className={`w-full bg-white border rounded-xl px-4 py-3 pr-12 text-slate-900 text-sm placeholder-slate-400 outline-none transition-all
                ${
                  chargeError
                    ? "border-red-400 focus:border-red-500"
                    : serviceCharge && !chargeError
                      ? "border-emerald-400 focus:border-emerald-500"
                      : "border-slate-300 focus:border-indigo-500"
                }`}
              />

              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm font-medium">
                %
              </span>
            </div>

            {chargeError && (
              <p className="flex items-center gap-1.5 text-xs text-red-500">
                <AlertCircle size={12} />
                {chargeError}
              </p>
            )}

            {serviceCharge && !chargeError && (
              <p className="flex items-center gap-1.5 text-xs text-emerald-600">
                <CheckCircle2 size={12} />
                {parseFloat(serviceCharge).toFixed(1)}% of annual CTC agreed
              </p>
            )}

            <div className="bg-slate-50 rounded-lg border border-slate-200 p-3">
              <p className="text-xs text-slate-500 leading-relaxed">
                The professional fee is a one-time charge, payable within{" "}
                <span className="text-slate-700">60 days</span> of the
                candidate's joining date. GST applicable as per government
                norms.
              </p>
            </div>
          </div>
        </div>

        {/* Upload */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-lg bg-violet-100 flex items-center justify-center">
              <PenLine size={14} className="text-violet-600" />
            </div>

            <h3 className="text-sm font-semibold text-slate-800">
              Authorisation
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <UploadBox
              label="Authorised Signature"
              icon={PenLine}
              file={signatureFile}
              onFileChange={setSignatureFile}
              onClear={() => setSignatureFile(null)}
              accept="image/*,application/pdf"
            />

            <UploadBox
              label="Company Stamp"
              icon={Stamp}
              file={stampFile}
              onFileChange={setStampFile}
              onClear={() => setStampFile(null)}
              accept="image/*,application/pdf"
            />
          </div>
        </div>

        {/* Agreement */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
          <label className="flex items-start gap-3 cursor-pointer group">
            <div
              onClick={() => setAgreed(!agreed)}
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
                  className="w-3 h-3 fill-white"
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
              I confirm that I have read, understood, and agree to the above
              Terms & Conditions on behalf of my company. I accept the service
              charge of{" "}
              <span
                className={`font-medium ${
                  serviceCharge && !chargeError
                    ? "text-indigo-600"
                    : "text-slate-400"
                }`}
              >
                {serviceCharge && !chargeError
                  ? `${parseFloat(serviceCharge).toFixed(1)}%`
                  : "___%"}
              </span>{" "}
              of annual CTC.
            </p>
          </label>

          {submitError && (
            <p className="flex items-center gap-1.5 text-xs text-red-500">
              <AlertCircle size={12} />
              {submitError}
            </p>
          )}

          <button
            onClick={handleSubmit}
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
                <Loader2 size={16} className="animate-spin" />
                Uploading...
              </span>
            ) : canSubmit ? (
              "Submit Agreement"
            ) : (
              "Complete all fields to proceed"
            )}
          </button>

          <div className="flex items-center justify-center gap-4 pt-1">
            {[
              { label: "Charge set", done: !!serviceCharge && !chargeError },
              { label: "Signature", done: !!signatureFile },
              { label: "Stamp", done: !!stampFile },
              { label: "Agreed", done: agreed },
            ].map(({ label, done }) => (
              <div key={label} className="flex items-center gap-1.5">
                <div
                  className={`w-1.5 h-1.5 rounded-full ${
                    done ? "bg-emerald-500" : "bg-slate-300"
                  }`}
                />

                <span
                  className={`text-xs ${
                    done ? "text-emerald-600" : "text-slate-400"
                  }`}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
