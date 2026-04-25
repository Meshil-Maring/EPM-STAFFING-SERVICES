import {
  ExternalLink,
  FileText,
  Mail,
  Phone,
  MapPin,
  Calendar,
  User,
  Briefcase,
  Clock,
  Link as LinkIcon,
  Building2,
  TrendingUp,
  UserCheck,
  CalendarCheck,
  CalendarClock,
  Timer,
  MessageSquare,
  ChartNoAxesGantt,
  X,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { PdfViewer } from "../../CommonLayouts/PdfViewer";

/* ─────────────────────────────────────────────
   TABS CONFIG
   Three logical groups:
   1. Candidate  — who they are
   2. Offer      — what was offered
   3. Documents  — attached files
───────────────────────────────────────────── */
const TABS = ["Candidate", "Offer", "Documents"];

/* ─────────────────────────────────────────────
   STATUS CONFIG
   Maps raw DB status values → badge style
   TODO: extend when new statuses are added
───────────────────────────────────────────── */
const STATUS_CONFIG = {
  pending: {
    label: "Pending",
    cls: "bg-amber-100 text-amber-700 border-amber-200",
  },
  offered: {
    label: "Offer Released",
    cls: "bg-blue-100 text-blue-700 border-blue-200",
  },
  accepted: {
    label: "Accepted",
    cls: "bg-emerald-100 text-emerald-700 border-emerald-200",
  },
  rejected: {
    label: "Rejected",
    cls: "bg-red-100 text-red-600 border-red-200",
  },
  // Fallback for display-layer status strings passed from mapOfferToModal
  "Offer Released": {
    label: "Offer Released",
    cls: "bg-blue-100 text-blue-700 border-blue-200",
  },
  Accepted: {
    label: "Accepted",
    cls: "bg-emerald-100 text-emerald-700 border-emerald-200",
  },
  Pending: {
    label: "Pending",
    cls: "bg-amber-100 text-amber-700 border-amber-200",
  },
  Rejected: {
    label: "Rejected",
    cls: "bg-red-100 text-red-600 border-red-200",
  },
};

/* ─────────────────────────────────────────────
   INFO ROW
   Single labeled row with icon — used inside section cards
───────────────────────────────────────────── */
const InfoRow = ({
  icon: Icon,
  label,
  value,
  accent = false,
  link = false,
}) => {
  if (!value && value !== 0) return null; // skip empty rows entirely

  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-gray-50 last:border-0">
      <div
        className={`mt-0.5 p-1.5 rounded-lg ${accent ? "bg-violet-50" : "bg-gray-50"}`}
      >
        <Icon
          size={13}
          className={accent ? "text-violet-500" : "text-gray-400"}
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">
          {label}
        </p>
        <p
          className={`text-sm mt-0.5 font-medium truncate ${link ? "text-blue-500" : "text-gray-800"}`}
        >
          {value}
        </p>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   STAT CARD
   Compact highlight card for key numbers (CTC, etc.)
───────────────────────────────────────────── */
const StatCard = ({ label, value, sub, color = "blue" }) => {
  const colors = {
    blue: "from-blue-50 to-blue-100/50 border-blue-200 text-blue-800",
    green:
      "from-emerald-50 to-emerald-100/50 border-emerald-200 text-emerald-800",
    violet: "from-violet-50 to-violet-100/50 border-violet-200 text-violet-800",
    amber: "from-amber-50 to-amber-100/50 border-amber-200 text-amber-800",
  };
  return (
    <div
      className={`bg-linear-to-br ${colors[color]} border rounded-xl px-4 py-3`}
    >
      <p className="text-[10px] uppercase tracking-wider opacity-60 mb-1">
        {label}
      </p>
      <p className="text-base font-bold">{value}</p>
      {sub && <p className="text-[10px] opacity-50 mt-0.5">{sub}</p>}
    </div>
  );
};

/* ─────────────────────────────────────────────
   SECTION WRAPPER
───────────────────────────────────────────── */
const Section = ({ title, children }) => (
  <div className="mb-4">
    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2 px-1">
      {title}
    </p>
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-3 divide-y divide-gray-50">
      {children}
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   PDF TILE
───────────────────────────────────────────── */
const PdfTile = ({ label, url, setPdfViewer }) => (
  <button
    onClick={() => setPdfViewer({ url, label })}
    className="w-full flex items-center gap-3 p-3 rounded-xl border border-gray-100 bg-white hover:border-indigo-200 hover:bg-indigo-50/30 transition-all duration-150 group"
  >
    <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
      <FileText size={16} className="text-indigo-500" />
    </div>
    <div className="flex-1 text-left min-w-0">
      {/* Capitalize the file_name coming from DB (e.g. "offer_letters" → "Offer Letters") */}
      <p className="text-sm font-medium text-gray-800 truncate capitalize">
        {label?.replace(/_/g, " ")}
      </p>
      <p className="text-[10px] text-gray-400">PDF Document</p>
    </div>
    <ExternalLink
      size={14}
      className="text-gray-300 group-hover:text-indigo-400 transition-colors shrink-0"
    />
  </button>
);

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export const OfferViewModal = ({ offer = {}, onDismiss }) => {
  const [pdfViewer, setPdfViewer] = useState(null);
  const [activeTab, setActiveTab] = useState("Candidate");

  console.log(offer);

  const {
    name = "—",
    role = "—",
    status = "pending",

    // ── Candidate personal info ──────────────
    gender,
    dob,
    noticePeriod,

    // ── Candidate contact ────────────────────
    email,
    linkedin,
    phone,
    location,

    // ── Candidate docs ───────────────────────
    documents, // candidate_documents array [{file_url, file_name}]

    // ── Candidate skills ─────────────────────
    skills = [], // TODO: add skills column to candidates table

    // ── Offer compensation ───────────────────
    ctcMin,
    ctcMax,

    // ── Offer Job details ─────────────
    job,

    // ── Offer employment details ─────────────
    employmentType, // offer.offer_type or job.job_type
    workingHours, // offer.working_hours (e.g. "15:03 - 14:20")
    reportingTo, // offer.report_by
    reportingRole, // TODO: add reporting_role column to offers table
    officeLocation, // offer.office_location

    // ── Offer important dates ────────────────
    offerReleasedDate, // offer.created_at split to date
    acceptanceDeadline, // offer.acceptance_deadline
    expectedJoining, // offer.joining_date

    // ── Offer message ────────────────────────
    message, // offer.description
  } = offer;

  /* Normalize skills array — handles both string[] and object[] */
  const normalizedSkills = Array.isArray(skills)
    ? skills.map((s) => (typeof s === "object" ? Object.values(s)[0] : s))
    : [];

  /* Avatar initials */
  const initials =
    name
      ?.split(" ")
      ?.map((n) => n[0])
      ?.join("")
      ?.slice(0, 2)
      ?.toUpperCase() || "NA";

  /* Status badge config */
  const statusCfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.pending;

  /* Document count for tab badge */
  const docCount = documents?.length ?? 0;

  return (
    <div className="w-full flex flex-col bg-gray-50 rounded-2xl overflow-hidden">
      {/* ── PDF Viewer overlay ─────────────────── */}
      {pdfViewer && (
        <PdfViewer
          url={pdfViewer.url}
          label={pdfViewer.label}
          onClose={() => setPdfViewer(null)}
        />
      )}

      {/* ── Header ────────────────────────────── */}
      <div className="relative bg-linear-to-br from-slate-800 to-slate-900 px-5 pt-5 pb-4">
        {/* Dismiss button */}
        <button
          onClick={onDismiss}
          className="absolute top-4 right-4 w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
        >
          <X size={14} className="text-white/80" />
        </button>

        {/* Avatar + name */}
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-xl bg-linear-to-br from-orange-400 to-red-500 flex items-center justify-center text-white font-bold text-base shadow-lg shrink-0">
            {initials}
          </div>
          <div className="min-w-0">
            <h1 className="text-white font-semibold text-base leading-tight truncate">
              {name}
            </h1>

            <div className="flex gap-4 justify-center items-center mt-1">
              <p className="text-slate-400 text-xs mt-0.5 truncate">{role}</p>

              {/* Status badge */}
              <span
                className={`inline-flex items-center justify-center gap-1.5 text-[9px] font-semibold px-1 rounded-full border ${statusCfg.cls}`}
              >
                {statusCfg.label}
              </span>
            </div>
          </div>
        </div>

        {/* Tab bar */}
        <div className="flex gap-1 mt-4 bg-white/5 rounded-xl p-1">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 flex items-center justify-center gap-1.5 text-xs font-medium py-1.5 rounded-lg transition-all duration-150 cursor-pointer ${
                activeTab === tab
                  ? "bg-white text-slate-800 shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {tab}
              {/* Show doc count badge on Documents tab */}
              {tab === "Documents" && docCount > 0 && (
                <span
                  className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                    activeTab === tab
                      ? "bg-indigo-100 text-indigo-600"
                      : "bg-white/10 text-white"
                  }`}
                >
                  {docCount}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── Tab content ───────────────────────── */}
      <div className="overflow-y-auto max-h-[60vh] p-4">
        {/* ═══════════════════════════════════════
            TAB 1 — CANDIDATE
            Personal info, contact, skills
        ═══════════════════════════════════════ */}
        {activeTab === "Candidate" && (
          <div>
            {/* Personal information */}
            <Section title="Personal information">
              {/* TODO: gender will show once candidates.gender column is added */}
              <InfoRow icon={User} label="Gender" value={gender} />
              {/* TODO: dob will show once candidates.date_of_birth column is added */}
              <InfoRow icon={Calendar} label="Date of birth" value={dob} />
              <InfoRow
                icon={Clock}
                label="Notice period"
                value={noticePeriod ? `${noticePeriod} days` : null}
                accent
              />
            </Section>

            {/* Contact information */}
            <Section title="Contact information">
              <InfoRow icon={Mail} label="Email" value={email} />
              {/* TODO: phone will show once candidates.phone column is added */}
              <InfoRow icon={Phone} label="Phone" value={phone} />
              <InfoRow icon={MapPin} label="Location" value={location} />
              {/* TODO: linkedin will show once candidates.linkedin column is added */}
              <InfoRow icon={LinkIcon} label="LinkedIn" value={linkedin} link />
            </Section>

            {/* Skills — only renders if skills data exists */}
            {/* TODO: skills will populate once candidates.skills column is added */}
            {normalizedSkills.length > 0 && (
              <div className="mb-4">
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2 px-1">
                  Skills & expertise
                </p>
                <div className="flex flex-wrap gap-2">
                  {normalizedSkills.map((skill, i) => (
                    <span
                      key={i}
                      className="bg-violet-50 text-violet-700 border border-violet-100 text-xs px-3 py-1 rounded-full font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ═══════════════════════════════════════
            TAB 2 — OFFER
            Compensation, employment details, dates, message
        ═══════════════════════════════════════ */}
        {activeTab === "Offer" && (
          <div>
            {/* Compensation highlight cards */}
            {(ctcMin || ctcMax) && (
              <div className="mb-4">
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2 px-1">
                  Compensation
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <StatCard
                    label="Min CTC"
                    value={`₹${ctcMin} LPA`}
                    color="blue"
                  />
                  <StatCard
                    label="Max CTC"
                    value={`₹${ctcMax} LPA`}
                    color="green"
                  />
                </div>
              </div>
            )}

            {/* Employment details */}
            <Section title="Employment details">
              <InfoRow
                icon={Briefcase}
                label="Job Name"
                value={job?.job_name}
                accent
              />

              <InfoRow
                icon={ChartNoAxesGantt}
                label="Employment type"
                value={employmentType}
                accent
              />
              <InfoRow
                icon={Clock}
                label="Working hours"
                value={workingHours}
              />
              <InfoRow
                icon={Building2}
                label="Office location"
                value={officeLocation}
              />
              <InfoRow
                icon={UserCheck}
                label="Reporting to"
                value={reportingTo}
              />

              <InfoRow
                icon={ChevronRight}
                label="Reporting role"
                value={reportingRole}
              />
            </Section>

            {/* Important dates */}
            <Section title="Important dates">
              <InfoRow
                icon={CalendarCheck}
                label="Offer released on"
                value={offerReleasedDate}
              />
              <InfoRow
                icon={Timer}
                label="Acceptance deadline"
                value={acceptanceDeadline}
                accent
              />
              <InfoRow
                icon={CalendarClock}
                label="Expected joining"
                value={expectedJoining}
                accent
              />
            </Section>

            {/* Message — only renders if description/message exists */}
            {message && (
              <div className="mb-4">
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2 px-1">
                  Message to candidate
                </p>
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-4 py-3 flex gap-3">
                  <MessageSquare
                    size={14}
                    className="text-gray-300 mt-0.5 shrink-0"
                  />
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {message}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ═══════════════════════════════════════
            TAB 3 — DOCUMENTS
            Attached PDFs (candidate_documents array)
        ═══════════════════════════════════════ */}
        {activeTab === "Documents" && (
          <div>
            {docCount === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-gray-300">
                <FileText size={32} strokeWidth={1} />
                <p className="text-sm mt-3">No documents attached</p>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {documents.map((doc, i) => (
                  <PdfTile
                    key={i}
                    label={doc?.file_name}
                    url={doc?.file_url}
                    setPdfViewer={setPdfViewer}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
