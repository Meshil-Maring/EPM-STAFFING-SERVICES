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
  VenusAndMars,
  Link as LinkIcon,
} from "lucide-react";
import { useState } from "react";
import { PdfViewer } from "../../CommonLayouts/PdfViewer";

/* ---------------- ICON MAP ---------------- */
const ICON_MAP = {
  Gender: VenusAndMars,
  DOB: Calendar,
  "Notice period": Clock,
  Email: Mail,
  LinkedIn: LinkIcon,
  Phone: Phone,
  Location: MapPin,
  "Employment type": Briefcase,
  "Working hours": Clock,
  Default: User,
};

/* ---------------- INFO TILE ---------------- */
const InfoTile = ({ label, value, highlight = false, linkColor = false }) => {
  const Icon = ICON_MAP[label] || ICON_MAP.Default;

  return (
    <div
      className={`flex items-center gap-3 rounded-xl px-3 py-2.5 ${
        highlight ? "bg-violet-50" : "bg-gray-100"
      }`}
    >
      <Icon
        size={16}
        className={highlight ? "text-violet-400" : "text-gray-400"}
      />

      <div>
        <p
          className={`text-[10px] ${
            highlight ? "text-violet-400" : "text-gray-400"
          }`}
        >
          {label}
        </p>
        <p
          className={`text-xs font-medium break-all ${
            highlight
              ? "text-violet-800"
              : linkColor
                ? "text-blue-500"
                : "text-gray-800"
          }`}
        >
          {value ?? "—"}
        </p>
      </div>
    </div>
  );
};

/* ---------------- PDF TILE ---------------- */
const PdfTile = ({ label, url, setPdfViewer }) => (
  <div className="flex items-center gap-3 rounded-xl w-full bg-gray-100 px-3 py-2.5">
    <FileText size={18} className="text-indigo-400" />

    <div>
      <p className="text-[10px] text-gray-400">PDF</p>
      <p className="text-xs font-medium text-gray-800">{label}</p>
    </div>

    <button onClick={() => setPdfViewer({ url, label })} className="ml-auto">
      <ExternalLink size={14} className="text-indigo-400" />
    </button>
  </div>
);

/* ---------------- SECTION ---------------- */
const SectionCard = ({ children }) => (
  <div className="bg-white rounded-2xl border border-gray-100 p-4">
    {children}
  </div>
);

const SectionTitle = ({ children }) => (
  <p className="text-sm font-semibold text-gray-700 mb-3">{children}</p>
);

/* ---------------- STATUS ---------------- */
const STATUS_STYLES = {
  "Offer Released": "bg-blue-500 text-white",
  Accepted: "bg-green-500 text-white",
  Pending: "bg-yellow-400 text-yellow-900",
  Rejected: "bg-red-100 text-red-700",
};

/* ---------------- MAIN COMPONENT ---------------- */
export const OfferViewModal = ({ offer = {}, onDismiss }) => {
  const [pdfViewer, setPdfViewer] = useState(null);

  const {
    name = "—",
    role = "—",
    status = "Pending",
    gender,
    dob,
    documents,
    noticePeriod,
    email,
    linkedin,
    phone,
    location,
    ctcMin,
    ctcMax,
    skills = [],
    employmentType,
    workingHours,
    reportingTo,
    reportingRole,
    officeLocation,
    offerReleasedDate,
    acceptanceDeadline,
    expectedJoining,
    message,
  } = offer;

  const normalizedSkills = Array.isArray(skills)
    ? skills.map((s) => (typeof s === "object" ? Object.values(s)[0] : s))
    : [];

  const initials = name
    ?.split(" ")
    ?.map((n) => n[0])
    ?.join("")
    ?.slice(0, 2)
    ?.toUpperCase();

  return (
    <div className="w-full h-full max-h-[90vh] flex flex-col bg-white rounded-2xl overflow-hidden">
      {/* PDF Viewer */}
      {pdfViewer && (
        <PdfViewer
          url={pdfViewer.url}
          label={pdfViewer.label}
          onClose={() => setPdfViewer(null)}
        />
      )}

      {/* Header */}
      <div className="bg-red-600 p-4 flex items-center gap-4  sticky">
        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white font-semibold">
          {initials || "NA"}
        </div>

        <div>
          <h1 className="text-lg font-semibold text-white">{name}</h1>
          <div className="flex items-center gap-3">
            <p className="text-xs text-red-100">{role}</p>
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full ${
                STATUS_STYLES[status] ?? STATUS_STYLES.Pending
              }`}
            >
              {status}
            </span>
          </div>
        </div>

        <button
          onClick={onDismiss}
          className="absolute top-3 right-3 text-white/70 hover:text-white"
        >
          ✕
        </button>
      </div>

      {/* Personal Info */}
      <div className="overflow-y-auto h-175">
        <SectionCard>
          <SectionTitle>Personal information</SectionTitle>
          <div className="grid grid-cols-2 gap-2">
            <InfoTile label="Gender" value={gender} />
            <InfoTile label="DOB" value={dob} highlight />
            <InfoTile label="Notice period" value={noticePeriod} highlight />

            {documents?.map((doc, i) => (
              <PdfTile
                key={i}
                label={doc?.file_name}
                url={doc?.file_url}
                setPdfViewer={setPdfViewer}
              />
            ))}
          </div>
        </SectionCard>

        {/* Contact Info */}
        <SectionCard>
          <SectionTitle>Contact information</SectionTitle>
          <div className="grid grid-cols-2 gap-2">
            <InfoTile label="Email" value={email} />
            <InfoTile label="LinkedIn" value={linkedin} linkColor />
            <InfoTile label="Phone" value={phone} />
            <InfoTile label="Location" value={location} />
          </div>
        </SectionCard>

        {/* Compensation */}
        {(ctcMin || ctcMax) && (
          <SectionCard>
            <SectionTitle>Compensation</SectionTitle>
            <div className="bg-red-50 rounded-xl px-4 py-3">
              <p className="text-[10px] text-red-400">Offered CTC</p>
              <p className="text-sm font-semibold text-red-900">
                ₹{ctcMin} – ₹{ctcMax} LPA
              </p>
            </div>
          </SectionCard>
        )}

        {/* Skills */}
        {normalizedSkills.length > 0 && (
          <SectionCard>
            <SectionTitle>Skills & expertise</SectionTitle>
            <div className="flex flex-wrap gap-2">
              {normalizedSkills.map((skill, i) => (
                <span
                  key={i}
                  className="bg-violet-50 text-violet-800 text-xs px-3 py-1.5 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </SectionCard>
        )}

        {/* Employment */}
        <SectionCard>
          <SectionTitle>Employment details</SectionTitle>
          <div className="grid grid-cols-3 gap-2">
            <InfoTile label="Employment type" value={employmentType} />
            <InfoTile label="Notice period" value={`${noticePeriod} Days`} />
            <InfoTile label="Working hours" value={workingHours} />
          </div>
        </SectionCard>

        {/* Dates */}
        <SectionCard>
          <SectionTitle>Important dates</SectionTitle>
          <div className="grid grid-cols-3 gap-2">
            <InfoTile label="Offer released" value={offerReleasedDate} />
            <InfoTile label="Deadline" value={acceptanceDeadline} />
            <InfoTile label="Joining" value={expectedJoining} />
          </div>
        </SectionCard>

        {/* Message */}
        {message && (
          <SectionCard>
            <SectionTitle>Message</SectionTitle>
            <p className="text-xs text-gray-600">{message}</p>
          </SectionCard>
        )}
      </div>
    </div>
  );
};
