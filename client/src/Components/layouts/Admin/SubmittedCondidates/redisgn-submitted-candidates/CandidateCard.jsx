import { MapPin, Briefcase, CalendarDays, Eye, UserCog } from "lucide-react";

const CandidateCard = ({
  data,
  viewProfileHandler,
  editHandler,
  viewJobHandler,
}) => {
  /* ── Helpers ── */
  const timeConvertor = (date) =>
    new Date(date).toLocaleString("en-IN").split(",")[0];

  const job = data?.job?.[0];
  const client = data?.client?.[0];
  const interview = data?.interviews?.[0];
  const application = data?.applications?.[0];

  const candidate = {
    initials: data?.candidate_name?.slice(0, 2)?.toUpperCase() || "NA",
    name: data?.candidate_name,
    location: data?.location,
    status: application?.status,

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

    skills: Object.values(data?.skills || {}),
  };

  /* ── Handlers ── */
  const viewProfile = () => {
    if (typeof viewProfileHandler === "function") viewProfileHandler(data);
  };

  const openEdit = () => {
    if (typeof editHandler === "function") editHandler(data);
  };

  //  NEW: View Job Details handler
  const viewJob = () => {
    if (typeof viewJobHandler === "function") viewJobHandler(data);
  };

  if (!data) return <p className="text-sm text-gray-500">No candidate data.</p>;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 w-full shadow-sm flex flex-col gap-3">
      {/* ── Header ── */}
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-xl bg-orange-600 flex items-center justify-center text-white font-semibold text-sm shrink-0">
          {candidate.initials}
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-base font-semibold text-gray-900 truncate">
            {candidate.name}
          </p>
          <p className="text-sm text-gray-500 flex items-center gap-1 mt-0.5">
            <MapPin size={12} className="shrink-0" />
            <span className="truncate">{candidate.location}</span>
          </p>
        </div>

        {candidate.status && (
          <span className="text-xs font-medium text-green-700 bg-green-100 px-3 py-1 rounded-full whitespace-nowrap shrink-0">
            {candidate.status}
          </span>
        )}
      </div>

      {/* ── Company Box ── */}
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

          {/* FIXED BUTTON */}
          <button
            onClick={viewJob}
            className="text-xs text-gray-700 border border-gray-300 rounded-full px-3 py-1 hover:bg-gray-50 shrink-0 transition-colors"
          >
            View Details
          </button>
        </div>
      </div>

      {/* ── Stats Row ── */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "Experience", value: candidate.experience },
          { label: "Expected LPA", value: candidate.expected },
          { label: "Submitted", value: candidate.submitted },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-purple-100 rounded-lg px-2.5 py-2"
          >
            <p className="text-xs text-purple-600 truncate">{stat.label}</p>
            <p className="text-sm font-semibold text-purple-900 truncate">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* ── Interview ── */}
      <div className="flex items-center justify-between bg-orange-50 rounded-lg px-3.5 py-2.5 gap-2 flex-wrap">
        <span className="text-sm text-orange-800">
          Interview | {candidate.interview.type}
        </span>
        <div className="flex items-center gap-1.5 text-sm font-medium text-orange-800">
          <CalendarDays size={13} />
          {candidate.interview.date}
        </div>
      </div>

      {/* ── Skills ── */}
      <div className="flex flex-wrap gap-1.5 min-h-8">
        {candidate.skills.length > 0 ? (
          candidate.skills.map((skill, i) => (
            <span
              key={i}
              className="text-xs text-gray-600 border border-gray-300 rounded-full px-3 py-1"
            >
              {skill}
            </span>
          ))
        ) : (
          <span className="text-xs text-gray-400">No skills listed</span>
        )}
      </div>

      {/* ── Actions ── */}
      <div className="grid grid-cols-2 gap-2.5 mt-auto">
        <button
          onClick={viewProfile}
          className="flex items-center justify-center gap-1.5 text-sm font-medium text-gray-700 border border-gray-300 rounded-full py-2.5 hover:bg-gray-50 transition-colors"
        >
          <Eye size={14} />
          View Profile
        </button>

        <button
          onClick={openEdit}
          className="flex items-center justify-center gap-1.5 text-sm font-medium text-white bg-orange-600 rounded-full py-2.5 hover:bg-orange-700 transition-colors"
        >
          <UserCog size={14} />
          Manage
        </button>
      </div>
    </div>
  );
};

export default CandidateCard;
