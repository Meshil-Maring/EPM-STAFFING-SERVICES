import React from "react";
import {
  IndianRupee,
  TrendingUp,
  Clock,
  MapPin,
  Download,
  CalendarCheck,
  Mail,
  MessageSquare,
  FileText,
  X,
  Eye,
} from "lucide-react";

const CandidateCard = (props) => {
  const data = props.data ?? props;
  console.log(data);

  const candidate = data?.candidate?.[0] ?? {};
  const job = data?.jobs?.[0] ?? {};

  const name = candidate.candidate_name ?? "—";
  const location = candidate.location ?? "—";
  const currentCTC = candidate.current_ctc
    ? `${candidate.current_ctc} LPA`
    : "—";
  const expectedCTC = candidate.expected_ctc
    ? `${candidate.expected_ctc} LPA`
    : "—";
  const experience = candidate.experience ? `${candidate.experience} yrs` : "—";
  const status = data.status ?? "—";
  const noticePeriod = candidate.notice_period + " Days" ?? "_";
  const email = candidate.email ?? "—";
  const skills = [];

  // Check rejected
  const isRejected = status?.toLowerCase() === "rejected";

  // Stats
  const stats = [
    {
      label: "Current CTC",
      value: currentCTC,
      icon: <IndianRupee size={11} />,
    },
    {
      label: "Expected CTC",
      value: expectedCTC,
      icon: <TrendingUp size={11} />,
    },
    { label: "Notice Period", value: noticePeriod, icon: <Clock size={11} /> },
    { label: "Location", value: location, icon: <MapPin size={11} /> },
    {
      label: "Email",
      value: email,
      icon: <Mail size={11} />,
    },
  ];

  // Download function
  const downloadPdf = async (data) => {
    if (!data?.file_url) return;

    const response = await fetch(data.file_url);
    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = data.file_name || "file.pdf";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.URL.revokeObjectURL(url);
  };

  return (
    <div
      className={`rounded-2xl border shadow-sm p-5 sm:p-6 w-full max-w-full mx-auto font-sans mb-4
      ${isRejected ? "bg-red-50 border-red-300" : "bg-white border-gray-200"}`}
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-4 w-full">
        <div className="relative shrink-0">
          <div className="w-11 h-11 rounded-xl bg-orange-400 text-white text-base font-semibold flex items-center justify-center">
            {name.charAt(0).toUpperCase()}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="text-base font-semibold text-gray-900 tracking-tight">
              {name}
            </span>

            {/*Dynamic status badge */}
            <span
              className={`text-xs font-medium px-2.5 py-0.5 rounded-full capitalize border
              ${
                isRejected
                  ? "bg-red-00 text-red-600 border-red-200"
                  : "bg-green-50 text-green-700 border-green-200"
              }`}
            >
              {status}
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {skills.length > 0 ? (
              skills.map((skill) => (
                <span
                  key={skill}
                  className="bg-gray-50 border border-gray-200 text-gray-500 text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-md"
                >
                  {skill}
                </span>
              ))
            ) : (
              <span className="text-gray-400 text-[11px]">
                {job.job_name} · {job.job_type} · {experience}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 mb-5">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 overflow-hidden"
          >
            <div className="flex items-center gap-1 text-gray-400 text-[10px] font-medium uppercase tracking-wide mb-1">
              {stat.icon}
              <span className="truncate">{stat.label}</span>
            </div>

            <div className="text-gray-900 text-sm font-semibold font-mono tracking-tight wrap-break-words">
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-100 mb-4" />

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => downloadPdf(candidate?.candidate_documents?.[0])}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200 transition-colors cursor-pointer"
        >
          <Download size={13} />
          <span className="hidden sm:inline">Download Resume</span>
          <span className="sm:hidden">Resume</span>
        </button>

        <button
          onClick={() => props.onScheduleInterview?.()}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-gray-900 text-white hover:bg-gray-800 transition-colors cursor-pointer"
        >
          <CalendarCheck size={13} />
          <span className="hidden sm:inline">Schedule Interview</span>
          <span className="sm:hidden">Schedule</span>
        </button>

        <button
          onClick={() => props.onAddComment?.()}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200 transition-colors cursor-pointer"
        >
          <MessageSquare size={13} />
          <span className="hidden sm:inline">Add Comment</span>
          <span className="sm:hidden">Comment</span>
        </button>

        <button
          onClick={() => props.onReleaseOffer?.()}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200 transition-colors cursor-pointer"
        >
          <FileText size={13} />
          <span className="hidden sm:inline">Release Offer</span>
          <span className="sm:hidden">Offer</span>
        </button>

        <button
          onClick={() => props.onRejectCandidate?.()}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-white text-red-600 border border-red-200 hover:bg-red-50 transition-colors cursor-pointer"
        >
          <X size={13} />
          Reject
        </button>

        <button className="ml-auto inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 border border-gray-200 text-gray-500 hover:bg-gray-200 transition-colors cursor-pointer">
          <Eye size={14} />
        </button>
      </div>
    </div>
  );
};

export default CandidateCard;
