import {
  MapPin,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  EyeOff,
  UserCog,
} from "lucide-react";

const CandidateCard = () => {
  const candidate = {
    initials: "MM",
    name: "Meshil Maring",
    location: "Gurgaon",
    status: "Accepted",
    company: {
      initials: "NT",
      name: "Nexus Tech Solutions",
      type: "Client Company",
      currentPage: 1,
      totalPages: 3,
    },
    jobTitle: "Senior Software Engineer",
    experience: "N/A",
    expected: "N/A",
    submitted: "15/10/2025",
    interview: {
      type: "Online",
      date: "15/10/2025",
    },
    skills: ["React.js", "Tailwind CSS", "Node.js"],
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-2xl border border-gray-200 p-5 w-full max-w-sm shadow-sm">
        {/* Header */}
        <div className="flex items-start gap-3 mb-4">
          <div
            className="rounded-xl bg-orange-600 flex items-center justify-center text-white font-medium text-base flex-shrink-0"
            style={{ width: 52, height: 52 }}
          >
            {candidate.initials}
          </div>
          <div className="flex-1">
            <p className="text-base font-medium text-gray-900 m-0">
              {candidate.name}
            </p>
            <p className="text-sm text-gray-500 flex items-center gap-1 mt-0.5 m-0">
              <MapPin size={12} />
              {candidate.location}
            </p>
          </div>
          <span className="text-xs font-medium text-green-700 bg-green-100 px-3 py-1 rounded-full whitespace-nowrap">
            {candidate.status}
          </span>
        </div>

        {/* Company Box */}
        <div className="border border-gray-200 rounded-xl p-3 mb-3">
          <div className="flex items-center gap-2 mb-2.5">
            <div className="w-9 h-9 rounded-lg bg-purple-600 flex items-center justify-center text-white text-xs font-medium flex-shrink-0">
              {candidate.company.initials}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 m-0">
                {candidate.company.name}
              </p>
              <p className="text-xs text-gray-500 m-0">
                {candidate.company.type}
              </p>
            </div>
            <div className="flex items-center gap-1 border border-gray-200 rounded-full px-2 py-1">
              <button className="text-gray-400 flex items-center">
                <ChevronLeft size={13} />
              </button>
              <span className="text-xs text-gray-500">
                {candidate.company.currentPage} / {candidate.company.totalPages}
              </span>
              <button className="text-gray-400 flex items-center">
                <ChevronRight size={13} />
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-gray-500">
              <Briefcase size={13} />
              <p className="text-sm m-0">{candidate.jobTitle}</p>
            </div>
            <button className="text-xs text-gray-700 border border-gray-300 rounded-full px-3 py-1 hover:bg-gray-50 transition-colors">
              View Details
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          {[
            { label: "Experience", value: candidate.experience },
            { label: "Expected", value: candidate.expected },
            { label: "Submitted", value: candidate.submitted },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-purple-100 rounded-lg px-2.5 py-2"
            >
              <p className="text-xs text-purple-600 m-0 mb-0.5">{stat.label}</p>
              <p className="text-sm font-medium text-purple-900 m-0">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Interview Row */}
        <div className="flex items-center justify-between bg-orange-50 rounded-lg px-3.5 py-2.5 mb-3">
          <span className="text-sm text-orange-800">
            Interview | {candidate.interview.type}
          </span>
          <div className="flex items-center gap-1.5 text-sm font-medium text-orange-800">
            <CalendarDays size={13} />
            {candidate.interview.date}
          </div>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {candidate.skills.map((skill) => (
            <span
              key={skill}
              className="text-xs text-gray-600 border border-gray-300 rounded-full px-3 py-1"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2.5">
          <button className="flex items-center justify-center gap-1.5 text-sm font-medium text-gray-700 border border-gray-300 rounded-full py-2.5 hover:bg-gray-50 transition-colors">
            <EyeOff size={14} />
            View Profile
          </button>
          <button className="flex items-center justify-center gap-1.5 text-sm font-medium text-white bg-orange-600 rounded-full py-2.5 hover:bg-orange-700 transition-colors">
            <UserCog size={14} />
            Manage
          </button>
        </div>
      </div>
    </div>
  );
};

export default CandidateCard;
