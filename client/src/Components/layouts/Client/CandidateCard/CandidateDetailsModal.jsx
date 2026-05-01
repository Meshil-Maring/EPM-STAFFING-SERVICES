import {
  X,
  Mail,
  Clock4,
  Phone,
  Star,
  Cake,
  MapPin,
  Link,
  FileText,
  Banknote,
  NotebookPen,
  Download,
  ExternalLink,
  TrendingUp,
  Video,
  User,
  AlignLeft,
  Building2,
  Calendar,
} from "lucide-react";

import { useEffect, useState } from "react";
import { PdfViewer } from "../../../layouts/CommonLayouts/PdfViewer"; // ← adjust path if needed

/* ── helpers ── */
const fmt = (date) =>
  date ? new Date(date).toLocaleDateString("en-IN") : "N/A";

const fmtInterviewDateTime = (date, time) => {
  if (!date) return null;
  const d = new Date(`${date}T${time || "00:00:00"}`);
  const dateStr = d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const timeStr = time
    ? d.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    : null;
  return timeStr ? `${dateStr} · ${timeStr}` : dateStr;
};

/* ── sub-components ── */

const SectionLabel = ({ icon: Icon, children }) => (
  <div className="flex items-center gap-1.5 mb-3">
    <Icon size={12} className="text-indigo-500 shrink-0" />
    <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">
      {children}
    </span>
    <div className="flex-1 h-px bg-indigo-100" />
  </div>
);

const InfoCard = ({
  icon: Icon,
  label,
  value,
  className = "",
  valueClass = "",
}) => (
  <div
    className={`flex items-center gap-2.5 bg-violet-50 border border-violet-100 rounded-2xl px-3.5 py-3 ${className}`}
  >
    <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center shrink-0">
      <Icon size={14} className="text-violet-500" />
    </div>
    <div className="min-w-0">
      <p className="text-[10px] text-violet-400 font-semibold uppercase tracking-wider">
        {label}
      </p>
      <p
        className={`text-[13px] font-bold text-slate-800 truncate mt-0.5 ${valueClass}`}
      >
        {value || "N/A"}
      </p>
    </div>
  </div>
);

const PdfCard = ({ label, url, onView }) => {
  const has = !!url;

  const download = (e) => {
    e.stopPropagation();
    if (!url) return;
    const a = document.createElement("a");
    a.href = url;
    a.download = `${label}.pdf`;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.click();
  };

  return (
    <div
      onClick={() => has && onView(url, label)}
      className={`flex items-center gap-2.5 rounded-2xl px-3.5 py-3 border transition-colors
        ${
          has
            ? "bg-green-50 border-green-200 cursor-pointer hover:bg-green-100"
            : "bg-gray-50 border-gray-200 opacity-50"
        }`}
    >
      <div
        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0
          ${has ? "bg-red-500" : "bg-gray-300"}`}
      >
        <FileText size={14} className="text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <p
          className={`text-[10px] font-semibold uppercase tracking-wider ${has ? "text-green-500" : "text-gray-400"}`}
        >
          PDF
        </p>
        <p
          className={`text-[13px] font-bold mt-0.5 ${has ? "text-slate-800" : "text-gray-400"}`}
        >
          {label}
        </p>
      </div>
      {has && (
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={download}
            className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-green-200 transition-colors"
          >
            <Download size={13} className="text-green-600" />
          </button>
          <ExternalLink size={13} className="text-green-400" />
        </div>
      )}
    </div>
  );
};

const InterviewRow = ({ icon: Icon, label, value, isLink = false }) => (
  <div className="flex items-center gap-2.5">
    <div className="w-7 h-7 rounded-lg bg-indigo-100 flex items-center justify-center shrink-0">
      <Icon size={13} className="text-indigo-500" />
    </div>
    <div className="min-w-0">
      <p className="text-[10px] text-indigo-400 font-semibold uppercase tracking-wider">
        {label}
      </p>
      {isLink && value && value !== "N/A" ? (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[13px] font-bold text-indigo-600 underline underline-offset-2 break-all"
        >
          {value}
        </a>
      ) : (
        <p className="text-[13px] font-bold text-indigo-900 break-all mt-0.5">
          {value || "—"}
        </p>
      )}
    </div>
  </div>
);

/* ── tab definitions (no Comments) ── */
const TABS = [
  { id: "profile", label: "Profile", icon: User },
  { id: "interview", label: "Interview", icon: Video },
  { id: "documents", label: "Documents", icon: FileText },
  { id: "details", label: "Details", icon: Star },
];

/* ── tab content ── */

const ProfileTab = ({ candidate, skills }) => (
  <div className="space-y-6">
    <section>
      <SectionLabel icon={User}>Personal</SectionLabel>
      <div className="grid grid-cols-2 gap-2">
        <InfoCard
          icon={Clock4}
          label="Notice Period"
          value={
            candidate?.notice_period != null
              ? `${candidate.notice_period} days`
              : null
          }
        />
        <InfoCard
          icon={Star}
          label="Experience"
          value={candidate?.experience}
        />
        <InfoCard
          icon={User}
          label="Gender"
          value={candidate?.gender}
          className="capitalize"
        />
        <InfoCard
          icon={Cake}
          label="Date of birth"
          value={fmt(candidate?.date_of_birth)}
        />
      </div>
    </section>

    <section>
      <SectionLabel icon={Phone}>Contact</SectionLabel>
      <div className="flex flex-col gap-2">
        <InfoCard icon={Mail} label="Email" value={candidate?.email} />
        <InfoCard
          icon={Link}
          label="LinkedIn"
          value={candidate?.linkedin}
          valueClass="text-indigo-600"
        />
        <div className="grid grid-cols-2 gap-2">
          <InfoCard icon={Phone} label="Phone" value={candidate?.phone} />
          <InfoCard
            icon={MapPin}
            label="Location"
            value={candidate?.location}
          />
        </div>
      </div>
    </section>

    <section>
      <SectionLabel icon={Star}>Skills</SectionLabel>
      <div className="flex flex-wrap gap-1.5">
        {skills.length > 0 ? (
          skills.map((s, i) => (
            <span
              key={`${s}-${i}`}
              className="text-[12px] font-bold px-3.5 py-1.5 rounded-full bg-violet-50 text-violet-700 border border-violet-200"
            >
              {s}
            </span>
          ))
        ) : (
          <span className="text-sm text-slate-400">No skills listed</span>
        )}
      </div>
    </section>
  </div>
);

const InterviewTab = ({ interview, isInterview }) => {
  if (!isInterview || !interview) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-3">
        <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center">
          <Video size={22} className="text-indigo-300" />
        </div>
        <p className="text-sm font-semibold text-slate-400">
          No interview scheduled
        </p>
        <p className="text-xs text-slate-300">
          Interview details will appear here once scheduled.
        </p>
      </div>
    );
  }

  return (
    <section>
      <SectionLabel icon={Video}>Scheduled Interview</SectionLabel>
      <div className="bg-indigo-50 border border-indigo-200 rounded-2xl overflow-hidden">
        <div className="bg-indigo-600 px-4 py-2.5 flex items-center gap-2.5">
          <div className="w-2 h-2 rounded-full bg-indigo-300 shrink-0" />
          <span className="text-white text-[12px] font-bold flex-1 font-mono">
            {fmtInterviewDateTime(
              interview.interview_date,
              interview.interview_time,
            )}
          </span>
          <span className="bg-white/15 text-indigo-100 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
            {interview.stage?.replace("round", "Round ")}
          </span>
          <span className="bg-violet-600 text-violet-100 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ml-1">
            {interview.type}
          </span>
        </div>
        <div className="px-4 py-3 flex flex-col gap-3">
          {interview.meeting_link && (
            <InterviewRow
              icon={Video}
              label="Meeting link"
              value={interview.meeting_link}
              isLink
            />
          )}
          <div className="grid grid-cols-2 gap-3">
            <InterviewRow
              icon={User}
              label="Interviewer"
              value={interview.interviewer}
            />
            <InterviewRow icon={Phone} label="Phone" value={interview.phone} />
          </div>
          <InterviewRow
            icon={MapPin}
            label="Location / Address"
            value={interview.address}
          />
          {interview.description && (
            <InterviewRow
              icon={AlignLeft}
              label="Notes"
              value={interview.description}
            />
          )}
        </div>
      </div>
    </section>
  );
};

const DocumentsTab = ({ docs, setPdfViewer }) => (
  <section>
    <SectionLabel icon={FileText}>Documents</SectionLabel>
    <div className="grid grid-cols-2 gap-2">
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
      <PdfCard
        label="Offer Letter"
        url={docs["offer_letters"]}
        onView={(url, label) => setPdfViewer({ url, label })}
      />
      <PdfCard
        label="Portfolio"
        url={docs["portfolios"]}
        onView={(url, label) => setPdfViewer({ url, label })}
      />
    </div>
  </section>
);

const DetailsTab = ({ application, candidate, skills, job }) => (
  <div className="space-y-6">
    {/* job info */}
    <section>
      <SectionLabel icon={Building2}>Job</SectionLabel>
      <div className="bg-violet-50 border border-violet-100 rounded-2xl px-4 py-3 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
          {job?.job_name?.slice(0, 2)?.toUpperCase() || "JB"}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] text-indigo-500 font-bold uppercase tracking-wider">
            Position
          </p>
          <p className="text-sm font-bold text-slate-800 leading-snug truncate">
            {job?.job_name || "N/A"}
          </p>
          <p className="text-[11px] text-violet-500 mt-0.5">
            Applied {fmt(application?.applied_at)}
          </p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-[10px] text-indigo-500 font-bold uppercase tracking-wider">
            Job type
          </p>
          <p className="text-sm capitalize font-bold text-slate-800 mt-0.5">
            {job?.job_type || "—"}
          </p>
        </div>
      </div>
    </section>

    {/* skills */}
    <section>
      <SectionLabel icon={Star}>Skills</SectionLabel>
      <div className="flex flex-wrap gap-1.5">
        {skills.length > 0 ? (
          skills.map((s, i) => (
            <span
              key={`${s}-${i}`}
              className="text-[12px] font-bold px-3.5 py-1.5 rounded-full bg-violet-50 text-violet-700 border border-violet-200"
            >
              {s}
            </span>
          ))
        ) : (
          <span className="text-sm text-slate-400">No skills listed</span>
        )}
      </div>
    </section>

    {/* compensation */}
    <section>
      <SectionLabel icon={Banknote}>Compensation</SectionLabel>
      <div className="flex gap-2">
        <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-2xl px-3.5 py-3 flex-1">
          <div className="w-9 h-9 rounded-xl bg-red-500 flex items-center justify-center shrink-0">
            <Banknote size={15} className="text-white" />
          </div>
          <div>
            <p className="text-[10px] text-red-400 font-bold uppercase tracking-wider">
              Current CTC
            </p>
            <p className="text-[15px] font-black text-slate-800 mt-0.5">
              {candidate?.current_ctc ? `${candidate.current_ctc} LPA` : "N/A"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-2xl px-3.5 py-3 flex-1">
          <div className="w-9 h-9 rounded-xl bg-red-500 flex items-center justify-center shrink-0">
            <TrendingUp size={15} className="text-white" />
          </div>
          <div>
            <p className="text-[10px] text-red-400 font-bold uppercase tracking-wider">
              Expected CTC
            </p>
            <p className="text-[15px] font-black text-slate-800 mt-0.5">
              {candidate?.expected_ctc
                ? `${candidate.expected_ctc} LPA`
                : "N/A"}
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* notes / description */}
    <section>
      <SectionLabel icon={NotebookPen}>Notes</SectionLabel>
      <div className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-2xl px-4 py-3.5">
        <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center shrink-0 mt-0.5">
          <NotebookPen size={14} className="text-white" />
        </div>
        <p className="text-[13px] font-medium text-blue-900 leading-relaxed">
          {candidate?.description || "No notes available"}
        </p>
      </div>
    </section>
  </div>
);

/* ── main ── */
export default function CandidateDetailsModal({ application, job, onClose }) {
  const [pdfViewer, setPdfViewer] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");

  const candidate = application?.candidate?.[0] ?? {};
  const interview = application?.interviews?.[0] ?? null;
  const status = application?.status ?? "N/A";
  const isInterview = status?.toLowerCase() === "interview";

  // ── FIX 1: Skills live on application.candidate_skills[0].skills
  // Shape from API: skills = [{ "0": "fsda", "1": "dfsa" }]
  // Iterate every entry in the array and collect all values.
  const skills = (() => {
    const skillsArr = application?.candidate_skills?.[0]?.skills;
    if (!skillsArr || !Array.isArray(skillsArr) || skillsArr.length === 0)
      return [];

    const result = [];
    for (const entry of skillsArr) {
      if (!entry) continue;
      if (typeof entry === "string") {
        entry
          .split(",")
          .map((x) => x.trim())
          .filter(Boolean)
          .forEach((x) => result.push(x));
      } else if (Array.isArray(entry)) {
        entry.filter(Boolean).forEach((x) => result.push(String(x)));
      } else if (typeof entry === "object") {
        // { "0": "skill1", "1": "skill2", ... }
        Object.values(entry)
          .filter(Boolean)
          .forEach((x) => result.push(String(x)));
      }
    }
    return result;
  })();

  // ── FIX 2: Documents live on candidate[0].candidate_documents (not application.candidate_documents)
  const docs = (candidate?.candidate_documents ?? []).reduce((acc, d) => {
    acc[d.file_name] = d.file_url;
    return acc;
  }, {});

  const statusBadge =
    {
      interview: "bg-blue-900/20 text-blue-300 border-blue-500/25",
      offered: "bg-indigo-900/20 text-indigo-300 border-indigo-500/25",
      accepted: "bg-emerald-900/20 text-emerald-300 border-emerald-500/25",
      rejected: "bg-red-900/20 text-red-300 border-red-500/25",
      pending: "bg-amber-900/20 text-amber-300 border-amber-500/25",
    }[status?.toLowerCase()] ?? "bg-white/10 text-slate-300 border-white/20";

  // lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Escape to close
  useEffect(() => {
    const h = (e) => {
      if (e.key === "Escape" && !pdfViewer) onClose();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose, pdfViewer]);

  if (!application) return null;

  return (
    <>
      {pdfViewer && (
        <PdfViewer
          url={pdfViewer.url}
          label={pdfViewer.label}
          onClose={() => setPdfViewer(null)}
        />
      )}

      <div
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div className="w-full max-w-md bg-[#f5f4f9] rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
          {/* ── header ── */}
          <div className="bg-linear-to-b from-slate-800 to-slate-900 px-5 pt-5 pb-4 shrink-0">
            <div className="flex items-start gap-3">
              {/* avatar */}
              <div className="w-12 h-12 rounded-xl bg-linear-to-br from-orange-400 to-red-500 flex items-center justify-center text-white font-bold text-base shrink-0">
                {candidate?.candidate_name?.slice(0, 2)?.toUpperCase() || "?"}
              </div>

              <div className="flex-1 min-w-0">
                <h1 className="text-white text-xl font-bold leading-tight truncate">
                  {candidate?.candidate_name || "Unknown Candidate"}
                </h1>
                <div className="flex items-center gap-2 flex-wrap mt-0.5">
                  <p className="text-slate-400 text-sm">
                    {job?.job_name || "N/A"} · {job?.job_type || "Full-time"}
                  </p>
                  <span
                    className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border capitalize ${statusBadge}`}
                  >
                    {status}
                  </span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors shrink-0"
              >
                <X size={16} className="text-white" />
              </button>
            </div>

            {/* ── tab bar ── */}
            <div className="flex gap-1 mt-4 bg-white/5 rounded-2xl p-1">
              {TABS.map(({ id, label, icon: Icon }) => {
                const isActive = activeTab === id;
                return (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className={`flex-1 flex flex-col items-center gap-0.5 py-1.5 rounded-xl text-[10px] font-bold transition-all duration-150
                      ${
                        isActive
                          ? "bg-white text-indigo-700 shadow-sm"
                          : "text-slate-400 hover:text-slate-200"
                      }`}
                  >
                    <Icon size={13} />
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── body ── */}
          <div
            className="flex-1 overflow-y-auto px-4 py-5"
            style={{ scrollbarWidth: "none" }}
          >
            {activeTab === "profile" && (
              <ProfileTab candidate={candidate} skills={skills} />
            )}
            {activeTab === "interview" && (
              <InterviewTab interview={interview} isInterview={isInterview} />
            )}
            {activeTab === "documents" && (
              <DocumentsTab docs={docs} setPdfViewer={setPdfViewer} />
            )}
            {activeTab === "details" && (
              <DetailsTab
                application={application}
                candidate={candidate}
                skills={skills}
                job={job}
              />
            )}
            <div className="h-1" />
          </div>

          {/* ── sticky footer ── */}
          <div className="shrink-0 bg-white border-t border-black/[0.08] px-5 py-3">
            <p className="text-[11px] text-slate-400 text-center">
              Applied {fmt(application?.applied_at)} · ID:{" "}
              <span className="font-mono">{application?.id?.slice(0, 8)}…</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
