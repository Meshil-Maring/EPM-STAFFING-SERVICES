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
  TrendingUp,
  Video,
  User,
  AlignLeft,
  Building2,
  MessageSquare,
  Send,
} from "lucide-react";
import { updateByIdSevice } from "../../../../../services/dynamic.service";

import { useEffect, useState } from "react";
import { PdfViewer } from "../../../CommonLayouts/PdfViewer";

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

/* ── tab definitions ── */
const TABS = [
  { id: "profile", label: "Profile", icon: User },
  { id: "interview", label: "Interview", icon: Video },
  { id: "documents", label: "Documents", icon: FileText },
  { id: "details", label: "Details", icon: CircleStar },
  { id: "comments", label: "Comments", icon: MessageSquare },
];

/* ── tab content components ── */

const ProfileTab = ({ data }) => (
  <div className="space-y-6">
    {/* personal */}
    <section>
      <SectionLabel icon={User}>Personal</SectionLabel>
      <div className="grid grid-cols-2 gap-2">
        <InfoCard
          icon={Clock4}
          label="Notice Period"
          value={
            data?.notice_period_days != null
              ? `${data.notice_period_days} days`
              : null
          }
        />
        <InfoCard
          icon={CircleStar}
          label="Experience"
          value={data?.experience}
        />
        <InfoCard
          icon={User}
          label="Gender"
          value={data?.gender}
          className="capitalize"
        />
        <InfoCard
          icon={Cake}
          label="Date of birth"
          value={fmt(data?.date_of_birth)}
        />
      </div>
    </section>

    {/* contact */}
    <section>
      <SectionLabel icon={Phone}>Contact</SectionLabel>
      <div className="flex flex-col gap-2">
        <InfoCard
          icon={Mail}
          label="Email"
          value={data?.email}
          className="col-span-2"
        />
        <InfoCard
          icon={Link}
          label="LinkedIn"
          value={data?.linkedin}
          valueClass="text-indigo-600"
        />
        <div className="grid grid-cols-2 gap-2">
          <InfoCard icon={Phone} label="Phone" value={data?.phone} />
          <InfoCard icon={MapPin} label="Location" value={data?.location} />
        </div>
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
          <span className="bg-violet-600 text-violet-100 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider capitalize ml-1">
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

const DetailsTab = ({ data, skills, client, job }) => (
  <div className="space-y-6">
    {/* submission */}
    <section>
      <SectionLabel icon={Building2}>Submission</SectionLabel>
      <div className="bg-violet-50 border border-violet-100 rounded-2xl px-4 py-3 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
          {client?.company?.company_name?.slice(0, 2)?.toUpperCase() || "NA"}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] text-indigo-500 font-bold uppercase tracking-wider">
            Client company
          </p>
          <p className="text-sm font-bold text-slate-800 leading-snug truncate">
            {client?.company?.company_name || "N/A"}
          </p>
          <p className="text-[11px] text-violet-500 mt-0.5">
            {client?.company?.industry_type} · Submitted {fmt(data?.created_at)}
          </p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-[10px] text-indigo-500 font-bold uppercase tracking-wider">
            Job type
          </p>

          <p className="text-sm capitalize font-bold text-slate-800 mt-0.5">
            {job?.job_type || "Full-time"}
          </p>
        </div>
      </div>
    </section>

    {/* skills */}
    <section>
      <SectionLabel icon={CircleStar}>Skills</SectionLabel>
      <div className="flex flex-wrap gap-1.5">
        {skills.length > 0 ? (
          skills.map((s) => (
            <span
              key={s}
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
              {data?.current_ctc ? `${data.current_ctc} LPA` : "N/A"}
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
              {data?.expected_ctc ? `${data.expected_ctc} LPA` : "N/A"}
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* notes */}
    <section>
      <SectionLabel icon={NotebookPen}>Notes</SectionLabel>
      <div className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-2xl px-4 py-3.5">
        <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center shrink-0 mt-0.5">
          <NotebookPen size={14} className="text-white" />
        </div>
        <p className="text-[13px] font-medium text-blue-900 leading-relaxed">
          {data?.description || "No notes available"}
        </p>
      </div>
    </section>
  </div>
);

// ----------- Comments Tab ------------
const CommentsTab = ({ comments = [] }) => {
  const [localComments, setLocalComments] = useState([
    ...new Map(comments.map((c) => [c.id, c])).values(),
  ]);

  const [input, setInput] = useState("");

  // Mark all unread comments as read when tab opens
  useEffect(() => {
    const unread = localComments.filter((c) => c && !c.read);
    if (unread.length === 0) return;

    // Update each unread comment in the background
    unread.forEach((c) => {
      updateByIdSevice(
        "api/dr/update/id",
        { read: true },
        "candidate_comment",
        c.id,
      );
    });

    // Optimistically update local state immediately (no waiting for API)
    setLocalComments((prev) =>
      prev.map((c) => (c && !c.read ? { ...c, read: true } : c)),
    );
  }, []);

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const fmtTime = (iso) =>
    iso
      ? new Date(iso).toLocaleString("en-IN", {
          day: "2-digit",
          month: "short",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      : "";

  return (
    <div className="flex flex-col gap-4">
      <SectionLabel icon={MessageSquare}>Comments</SectionLabel>

      <div className="flex flex-col gap-3">
        {localComments.length === 0 && (
          <div className="flex flex-col items-center justify-center py-10 gap-2">
            <MessageSquare size={24} className="text-slate-300" />
            <p className="text-sm text-slate-400">No comments yet</p>
          </div>
        )}

        {[...localComments].map((c) => {
          const typeConfig = {
            internal: { color: "bg-indigo-500", initials: "IN" },
            external: { color: "bg-teal-500", initials: "EX" },
            rejected: { color: "bg-red-500", initials: "RJ" },
            approved: { color: "bg-green-500", initials: "AP" },
            offered: { color: "bg-purple-500", initials: "OF" },
            review: { color: "bg-yellow-500", initials: "RV" },
          };

          const key = c.type?.toLowerCase() || "";
          const { color, initials } = typeConfig[key] ?? {
            color: "bg-slate-400",
            initials: c.type?.slice(0, 2)?.toUpperCase() || "NA",
          };

          return (
            <div key={c.id} className="flex items-start gap-3">
              <div
                className={`w-8 h-8 rounded-xl ${color} flex items-center justify-center text-white text-[11px] font-bold shrink-0`}
              >
                {initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[12px] font-bold text-slate-700">
                    {c.type || "Internal"}
                  </span>
                  {!c.read && (
                    <span className="text-[9px] font-bold bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full uppercase tracking-wide">
                      Unread
                    </span>
                  )}
                  <span className="text-[10px] text-slate-400 ml-auto">
                    {fmtTime(c.created_at)}
                  </span>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-sm px-3.5 py-2.5">
                  <p className="text-[13px] text-slate-700 leading-relaxed">
                    {c.comments}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input */}
      {/* <div className="flex items-end gap-2 bg-white border border-slate-200 rounded-2xl px-3.5 py-2.5 mt-1">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Add a comment…"
          rows={2}
          className="flex-1 text-[13px] text-slate-700 placeholder:text-slate-400 resize-none outline-none leading-relaxed bg-transparent"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim()}
          className="w-8 h-8 flex items-center justify-center rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors shrink-0 mb-0.5"
        >
          <Send size={13} className="text-white" />
        </button>
      </div> */}
    </div>
  );
};

/* ── main ── */
export default function CandidateViewProfile({ data, onClose }) {
  const [pdfViewer, setPdfViewer] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");

  const application = data?.applications?.[0];
  const client = data?.client?.[0];
  const job = data?.job?.[0];
  const interview = data?.interviews?.[0] ?? null;
  const comments = [...(data?.candidate_comments || [])]
    .filter(Boolean)
    .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

  const docs = (data?.candidate_documents || []).reduce((acc, d) => {
    acc[d.file_name] = d.file_url;
    return acc;
  }, {});

  const skills = (() => {
    const s = data?.skills?.[0];
    if (!s) return [];
    if (typeof s === "string")
      return s
        .split(",")
        .map((x) => x.trim())
        .filter(Boolean);
    if (Array.isArray(s)) return s.map(String);
    if (typeof s === "object") return Object.values(s).map(String);
    return [];
  })();

  // count unread comments
  const unreadCount = (comments || []).filter(
    (c) => c && c.read === false,
  ).length;

  const status = application?.status || "N/A";
  const isInterview = status?.toLowerCase() === "interview";

  const statusBadge =
    {
      interview: "bg-blue-900/20 text-blue-300 border-blue-500/25",
      offered: "bg-indigo-900/20 text-indigo-300 border-indigo-500/25",
      accepted: "bg-emerald-900/20 text-emerald-300 border-emerald-500/25",
      rejected: "bg-red-900/20 text-red-300 border-red-500/25",
    }[status?.toLowerCase()] ?? "bg-white/10 text-slate-300 border-white/20";

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const h = (e) => {
      if (e.key === "Escape" && !pdfViewer) onClose();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose, pdfViewer]);

  if (!data) return null;

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
              <div className="w-12 h-12 rounded-xl bg-linear-to-br from-orange-400 to-red-500 flex items-center justify-center text-white font-bold text-base shrink-0">
                {data?.candidate_name?.slice(0, 2)?.toUpperCase() || "NA"}
              </div>

              <div className="flex-1 min-w-0">
                <h1 className="text-white text-xl font-bold leading-tight truncate">
                  {data?.candidate_name || "N/A"}
                </h1>

                <div className="flex">
                  <p className="text-slate-400 text-standard mt-0.5">
                    {job?.job_name || "N/A"} · {job?.job_type || "Full-time"}
                  </p>

                  <span
                    className={`text-[11px] font-semibold ml-2 px-2.5 py-0.5 rounded-full border capitalize ${statusBadge}`}
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
                    className={`flex-1 flex flex-col items-center gap-0.5 py-1.5 rounded-xl text-[10px] font-bold transition-all duration-150 relative
                      ${
                        isActive
                          ? "bg-white text-indigo-700 shadow-sm"
                          : "text-slate-400 hover:text-slate-200"
                      }`}
                  >
                    <Icon size={13} />

                    {label === "Comments" && unreadCount ? (
                      <span className="absolute -top-2 -right-1 flex items-center justify-center z-20">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75 animate-ping" />
                        <span className="relative flex items-center justify-center bg-orange-600 text-white text-[10px] font-bold min-w-4.5 h-4.5 px-1 rounded-full shadow-sm">
                          {unreadCount}
                        </span>
                      </span>
                    ) : (
                      ""
                    )}

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
            {activeTab === "profile" && <ProfileTab data={data} />}
            {activeTab === "interview" && (
              <InterviewTab interview={interview} isInterview={isInterview} />
            )}
            {activeTab === "documents" && (
              <DocumentsTab docs={docs} setPdfViewer={setPdfViewer} />
            )}
            {activeTab === "details" && (
              <DetailsTab
                data={data}
                skills={skills}
                client={client}
                job={job}
              />
            )}
            {activeTab === "comments" && <CommentsTab comments={comments} />}

            <div className="h-1" />
          </div>
        </div>
      </div>
    </>
  );
}
