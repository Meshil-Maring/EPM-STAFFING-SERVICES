import { MapPin, Briefcase, CalendarDays, Eye, UserCog } from "lucide-react";

import { deleteCandidate } from "../end-point-function/submitted_candidates";

const CandidateCard = ({
  data,
  viewProfileHandler,
  editHandler,
  viewJobHandler,
}) => {
  const timeConvertor = (date) =>
    date ? new Date(date).toLocaleString("en-IN").split(",")[0] : "N/A";

  const job = data?.job?.[0];
  const client = data?.client?.[0];
  const interview = data?.interviews?.[0];
  const application = data?.applications?.[0];
  const comments = data?.candidate_comments;

  const skills = Array.isArray(data?.skills)
    ? data.skills.flatMap((s) =>
        typeof s === "string" || typeof s === "number"
          ? s
          : typeof s === "object" && s !== null
            ? Object.values(s).filter(
                (v) => typeof v === "string" || typeof v === "number",
              )
            : [],
      )
    : Object.values(data?.skills || {}).filter(
        (s) => s !== null && s !== undefined && typeof s !== "object",
      );

  const candidate = {
    initials: data?.candidate_name?.slice(0, 2)?.toUpperCase() || "NA",
    name: data?.candidate_name || "Unknown",
    location: data?.location || "—",
    status: application?.status || null,

    company: {
      initials:
        client?.company?.company_name?.slice(0, 2)?.toUpperCase() || "NA",
      name: client?.company?.company_name || "N/A",
      type: client?.company?.industry_type || "N/A",
    },

    jobTitle: job?.job_name || "N/A",
    experience: data?.experience || "N/A",
    expected: data?.expected_ctc || "N/A",
    submitted: timeConvertor(data?.created_at),

    interview: {
      type: interview?.type || "N/A",
      date:
        interview?.interview_date && interview?.interview_time
          ? `${interview.interview_date} ${interview.interview_time}`
          : "--/--/---- --:--",
    },

    comments,
  };

  // count unread comments
  const unreadCount = (data?.comments || []).filter(
    (c) => c && c.is_read === false && c.sender_type === "client",
  ).length;

  const viewProfile = () =>
    typeof viewProfileHandler === "function" && viewProfileHandler(data);

  const openEdit = () => typeof editHandler === "function" && editHandler(data);

  const viewJob = () =>
    typeof viewJobHandler === "function" && viewJobHandler(data);

  if (!data) return <p className="text-sm text-gray-500">No candidate data.</p>;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 w-full shadow-sm flex flex-col gap-3 h-fit">
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="w-11 h-11 rounded-xl bg-orange-600 flex items-center justify-center text-white font-medium text-sm shrink-0">
          {candidate.initials}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-base font-semibold text-gray-900 truncate">
            {candidate.name}
          </p>
          <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
            <MapPin size={11} className="shrink-0" />
            <span className="truncate">{candidate.location}</span>
          </p>
        </div>

        {candidate.status && (
          <span className="text-xs capitalize font-medium text-green-700 bg-green-100 px-3 py-1 rounded-full whitespace-nowrap shrink-0">
            {candidate.status === "interview"
              ? interview?.status
              : candidate.status}
          </span>
        )}
      </div>

      {/* Company box */}
      <div className="border border-gray-200 rounded-xl p-3">
        <div className="flex items-center gap-2 mb-2.5">
          <div className="w-9 h-9 rounded-lg bg-purple-600 flex items-center justify-center text-white text-xs font-semibold shrink-0">
            {candidate.company.initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">
              {candidate.company.name}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {candidate.company.type}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-gray-500 min-w-0">
            <Briefcase size={13} className="shrink-0" />
            <p className="text-sm truncate">{candidate.jobTitle}</p>
          </div>
          <button
            onClick={viewJob}
            className="text-xs text-gray-700 border border-gray-300 rounded-full px-3 py-1 hover:bg-gray-50 shrink-0 transition-colors"
          >
            View Details
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "Experience", value: candidate.experience + " Years" },
          { label: "Expected CTC", value: "₹ " + candidate.expected + " LPA" },
          { label: "Submitted", value: candidate.submitted },
        ].map((stat) => (
          <div key={stat.label} className="bg-purple-50 rounded-lg px-2.5 py-2">
            <p className="text-xs text-purple-600 truncate">{stat.label}</p>
            <p className="text-sm font-semibold text-purple-900 truncate">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Interview */}
      <div className="flex items-center justify-between bg-orange-50 rounded-lg px-3.5 py-2.5 gap-2 flex-wrap">
        <span className="text-sm text-orange-800">
          Interview | {candidate.interview.type}
        </span>
        <div className="flex items-center gap-1.5 text-sm font-medium text-orange-800">
          <CalendarDays size={13} />
          {candidate.interview.date}
        </div>
      </div>

      {/* Skills safe render */}
      <div className="flex flex-wrap gap-1.5">
        {skills.length > 0 ? (
          skills.map((skill, i) => (
            <span
              key={i}
              className="text-xs  text-gray-600 border border-gray-300 rounded-full px-3 py-1"
            >
              {String(skill)}
            </span>
          ))
        ) : (
          <span className="text-xs text-gray-400">No skills listed</span>
        )}
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-2.5 mt-auto w-full">
        <button
          onClick={viewProfile}
          className="flex relative items-center justify-center gap-1.5 text-sm font-medium text-gray-700 border border-gray-300 rounded-full py-2.5 hover:bg-gray-50 transition-colors"
        >
          <Eye size={14} /> View Profile
          {unreadCount ? (
            <span className="absolute -top-2 -right-1 flex items-center justify-center">
              <span className="absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75 animate-ping" />
              <span className="relative flex items-center justify-center bg-orange-600 text-white text-[10px] font-bold min-w-[18px] h-[18px] px-1 rounded-full ring-2 ring-white shadow-sm">
                {unreadCount}
              </span>
            </span>
          ) : (
            ""
          )}
        </button>

        <button
          onClick={openEdit}
          className="flex items-center justify-center gap-1.5 text-sm font-medium text-white bg-orange-600 rounded-full py-2.5 hover:bg-orange-700 transition-colors"
        >
          <UserCog size={14} /> Manage
        </button>
      </div>
    </div>
  );
};

export default CandidateCard;
