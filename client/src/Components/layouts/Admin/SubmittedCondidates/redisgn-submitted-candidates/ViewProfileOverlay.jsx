import {
  X,
  Mail,
  Clock4,
  Phone,
  CircleStar,
  Cake,
  MapPin,
  Link,
  FileText,
  Banknote,
  NotebookPen,
  Download,
  ExternalLink,
  ChevronLeft,
} from "lucide-react";
import { useEffect, useState } from "react";
import { PdfViewer } from "../../../CommonLayouts/PdfViewer";

/* ── Sub-components ─────────────────────────────────────────────────────── */

const InfoCard = ({ icon: Icon, label, value, className = "" }) => (
  <div
    className={`flex items-center gap-3 bg-[#ede9f8] rounded-2xl px-4 py-3 ${className}`}
  >
    <Icon size={18} className="text-slate-400 shrink-0" />
    <div className="min-w-0">
      <p className="text-xs text-slate-400 font-medium">{label}</p>
      <p className="text-sm font-semibold text-slate-700 truncate">
        {value || "N/A"}
      </p>
    </div>
  </div>
);

const PdfCard = ({ label, url, onView, className = "" }) => {
  const hasFile = !!url;

  const handleDownload = (e) => {
    e.stopPropagation();
    if (!url) return;
    const a = document.createElement("a");
    a.href = url;
    a.download = label + ".pdf";
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.click();
  };

  return (
    <div
      className={`flex items-center gap-3 bg-[#ede9f8] rounded-2xl px-4 py-3 ${className} ${
        hasFile ? "cursor-pointer hover:bg-[#e0d9f5]" : "opacity-50"
      } transition-colors`}
      onClick={() => hasFile && onView(url, label)}
    >
      <FileText
        size={18}
        className={
          hasFile ? "text-red-500 shrink-0" : "text-slate-400 shrink-0"
        }
      />
      <div className="flex-1 min-w-0">
        <p className="text-xs text-slate-400 font-medium">PDF</p>
        <p className="text-sm font-semibold text-slate-700">{label}</p>
      </div>
      {hasFile && (
        <div className="flex items-center gap-1">
          <button
            onClick={handleDownload}
            title="Download"
            className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-indigo-100 transition-colors"
          >
            <Download size={14} className="text-indigo-500" />
          </button>
          <ExternalLink size={14} className="text-slate-400" />
        </div>
      )}
    </div>
  );
};

const SalaryCard = ({ label, value }) => (
  <div className="flex items-center gap-3 bg-[#fce8e8] rounded-2xl px-4 py-4 flex-1">
    <div className="w-9 h-9 rounded-xl bg-red-500 flex items-center justify-center shrink-0">
      <Banknote size={16} className="text-white" />
    </div>
    <div className="min-w-0">
      <p className="text-[11px] text-red-400 font-medium truncate">{label}</p>
      <p className="text-sm font-bold text-slate-800 truncate">
        {value || "N/A"}
      </p>
    </div>
  </div>
);

const Section = ({ title, children }) => (
  <div className="space-y-3">
    <h3 className="text-base font-bold text-slate-800">{title}</h3>
    {children}
  </div>
);

/* ── Main Component ─────────────────────────────────────────────────────── */

export default function CandidateViewProfile({ data, onClose }) {
  const [pdfViewer, setPdfViewer] = useState(null); // { url, label }

  const application = data?.applications?.[0];
  const client = data?.client?.[0];
  const job = data?.job?.[0];

  /* Map candidate_documents array into a lookup by file_name */
  const docs = (data?.candidate_documents || []).reduce((acc, doc) => {
    acc[doc.file_name] = doc.file_url;
    return acc;
  }, {});

  const candidate = {
    initials: data?.candidate_name?.slice(0, 2)?.toUpperCase() || "NA",
    name: data?.candidate_name || "N/A",
    gender: data?.gender || "N/A",
    dob: data?.date_of_birth
      ? new Date(data.date_of_birth).toLocaleDateString("en-IN")
      : "N/A",
    noticePeriod:
      data?.notice_period_days != null
        ? `${data.notice_period_days} days`
        : "N/A",
    email: data?.email || "N/A",
    phone: data?.phone || "N/A",
    link: data?.linkedin || "N/A",
    location: data?.location || "N/A",
    experience: data?.experience || "N/A",
    currentCtc: data?.current_ctc || "N/A",
    expectedCtc: data?.expected_ctc || "N/A",
    notes: data?.description || "No notes available",
    submittedOn: data?.created_at
      ? new Date(data.created_at).toLocaleDateString("en-IN")
      : "N/A",

    skills: (() => {
      const s = data?.skills;
      if (!s) return [];
      if (typeof s === "string")
        return s
          .split(",")
          .map((x) => x.trim())
          .filter(Boolean);
      if (Array.isArray(s)) return s.map(String);
      if (typeof s === "object") return Object.values(s).map(String);
      return [];
    })(),
    status: application?.status || "N/A",
    company: {
      initials:
        client?.company?.company_name?.slice(0, 2)?.toUpperCase() || "NA",
      name: client?.company?.company_name || "N/A",
    },
    job: {
      title: job?.job_name || "N/A",
      type: job?.job_type || data?.job_type || "Full-time",
    },
  };

  /* Lock scroll */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  /* Escape to close */
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape" && !pdfViewer) onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, pdfViewer]);

  if (!data) return null;

  return (
    <>
      {/* ── PDF Viewer (rendered above everything) ── */}
      {pdfViewer && (
        <PdfViewer
          url={pdfViewer.url}
          label={pdfViewer.label}
          onClose={() => setPdfViewer(null)}
        />
      )}

      {/* ── Backdrop ── */}
      <div
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 md:p-8"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        {/* ── Card shell ── */}
        <div className="w-full max-w-sm sm:max-w-md md:max-w-lg bg-[#f1f0f5] rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
          {/* ── HEADER ── */}
          <div className="bg-red-600 px-5 pt-5 pb-4 shrink-0">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-orange-500 flex items-center justify-center text-white font-bold text-base shrink-0">
                {candidate.initials}
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-white text-xl sm:text-2xl font-bold leading-tight truncate">
                  {candidate.name}
                </h1>
                <div className="flex gap-2 mt-1">
                  <p className="text-red-200 text-sm mt-0.5 truncate">
                    {candidate.job.title}
                  </p>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/20 text-white">
                    {candidate.experience !== "N/A"
                      ? `${candidate.experience} yrs`
                      : "Experience"}
                  </span>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-500 text-white">
                    {candidate.status}
                  </span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center text-white hover:bg-white/20 rounded-full transition-colors shrink-0"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* ── BODY ── */}
          <div
            className="flex-1 overflow-y-auto px-4 sm:px-5 py-5 space-y-6"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {/* Personal Information */}
            <Section title="Personal Information">
              <div className="grid grid-cols-2 gap-2">
                <InfoCard icon={Mail} label="Gender" value={candidate.gender} />
                <InfoCard icon={Cake} label="DOB" value={candidate.dob} />
                <InfoCard
                  icon={Clock4}
                  label="Notice Period"
                  value={candidate.noticePeriod}
                />
                <InfoCard
                  icon={CircleStar}
                  label="Experience"
                  value={candidate.experience}
                />

                {/* Documents — wired to candidate_documents */}
                <PdfCard
                  label="Resume"
                  url={docs["resumes"]}
                  onView={(url, label) => setPdfViewer({ url, label })}
                />
                <PdfCard
                  label="Cover Letter"
                  url={docs["letters"]}
                  onView={(url, label) => setPdfViewer({ url, label })}
                />
              </div>

              {/* Show portfolio if present */}
              {docs["portfolios"] && (
                <PdfCard
                  label="Portfolio"
                  url={docs["portfolios"]}
                  onView={(url, label) => setPdfViewer({ url, label })}
                  className="col-span-2"
                />
              )}
            </Section>

            {/* Contact Information */}
            <Section title="Contact Information">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <InfoCard
                  icon={Mail}
                  label="Email"
                  value={candidate.email}
                  className="sm:col-span-2"
                />
                <InfoCard
                  icon={Link}
                  label="Link"
                  value={candidate.link}
                  className="sm:col-span-2"
                />
                <InfoCard icon={Phone} label="Phone" value={candidate.phone} />
                <InfoCard
                  icon={MapPin}
                  label="Location"
                  value={candidate.location}
                />
              </div>
            </Section>

            {/* Submission Details */}
            <Section title="Submission Details">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="bg-[#ede9f8] rounded-2xl px-3 py-3 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
                    {candidate.company.initials}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] text-indigo-500 font-semibold leading-tight">
                      Client Company
                    </p>
                    <p className="text-xs font-bold text-slate-800 leading-snug truncate">
                      {candidate.company.name}
                    </p>
                    <p className="text-[10px] text-slate-400 leading-tight">
                      Submitted on {candidate.submittedOn}
                    </p>
                  </div>
                </div>
                <div className="bg-[#ede9f8] rounded-2xl px-4 py-3">
                  <p className="text-[10px] text-slate-400 font-medium mb-1">
                    Current Stage
                  </p>
                  <p className="text-sm font-bold text-slate-800">
                    {candidate.status}
                  </p>
                </div>
                <div className="bg-[#ede9f8] rounded-2xl px-4 py-3">
                  <p className="text-[10px] text-slate-400 font-medium mb-1">
                    Job Type
                  </p>
                  <p className="text-sm font-bold text-slate-800">
                    {candidate.job.type}
                  </p>
                </div>
              </div>
            </Section>

            {/* Skills */}
            <Section title="Skills & Expertise">
              <div className="flex flex-wrap gap-2">
                {candidate.skills.length > 0 ? (
                  candidate.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-sm font-semibold px-4 py-1.5 rounded-full bg-[#ede9f8] text-indigo-600"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-slate-400">
                    No skills listed
                  </span>
                )}
              </div>
            </Section>

            {/* Compensation */}
            <Section title="Compensation">
              <div className="flex flex-col sm:flex-row gap-2">
                <SalaryCard
                  label="Current Salary"
                  value={candidate.currentCtc}
                />
                <SalaryCard
                  label="Expected Salary"
                  value={candidate.expectedCtc}
                />
              </div>
            </Section>

            {/* Notes */}
            <Section title="Notes">
              <div className="flex items-center gap-3 bg-[#dde8f8] rounded-2xl px-4 py-4">
                <NotebookPen size={20} className="text-blue-500 shrink-0" />
                <p className="text-sm font-medium text-slate-700">
                  {candidate.notes}
                </p>
              </div>
            </Section>

            <div className="h-1" />
          </div>
        </div>
      </div>
    </>
  );
}
