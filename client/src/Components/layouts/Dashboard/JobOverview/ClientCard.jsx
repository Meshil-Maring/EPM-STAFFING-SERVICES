import React from "react";
import {
  IndianRupee,
  TrendingUp,
  Clock,
  MapPin,
  Calendar,
  Download,
  CalendarCheck,
  MessageSquare,
  FileText,
  X,
  Eye,
} from "lucide-react";

const CandidateCard = ({
  name = "Meshil",
  rank = 1,
  status = "Interview Scheduled",
  skills = ["React", "Node.js", "MongoDB"],
  currentCTC = "20 LPA",
  expectedCTC = "22 LPA",
  noticePeriod = "20 Days",
  location = "Gurgaon",
  availableFrom = "23/11/25",
}) => {
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
      label: "Available From",
      value: availableFrom,
      icon: <Calendar size={11} />,
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 sm:p-6 w-full max-w-full mx-auto font-sans">
      {/* Header */}
      <div className="flex items-start gap-3 mb-4 w-full">
        {/* Avatar */}
        <div className="relative shrink-0">
          <div className="w-11 h-11 rounded-xl bg-gray-900 text-white text-base font-semibold flex items-center justify-center">
            {name.charAt(0)}
          </div>
          <span className="absolute -bottom-1.5 -right-1.5 bg-gray-900 border-2 border-white text-white text-[9px] font-mono font-medium rounded px-1 py-0.5 leading-none">
            #{rank}
          </span>
        </div>

        {/* Name + Status + Skills */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="text-base font-semibold text-gray-900 tracking-tight">
              {name}
            </span>
            <span className="bg-green-50 text-green-700 border border-green-200 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {status}
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {skills.map((skill) => (
              <span
                key={skill}
                className="bg-gray-50 border border-gray-200 text-gray-500 text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-md"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 mb-5">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5"
          >
            <div className="flex items-center gap-1 text-gray-400 text-[10px] font-medium uppercase tracking-wide mb-1">
              {stat.icon}
              {stat.label}
            </div>
            <div className="text-gray-900 text-sm font-semibold font-mono tracking-tight">
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100 mb-4" />

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Download Resume */}
        <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200 transition-colors cursor-pointer">
          <Download size={13} />
          <span className="hidden sm:inline">Download Resume</span>
          <span className="sm:hidden">Resume</span>
        </button>

        {/* Schedule Interview */}
        <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-gray-900 text-white hover:bg-gray-800 transition-colors cursor-pointer">
          <CalendarCheck size={13} />
          <span className="hidden sm:inline">Schedule Interview</span>
          <span className="sm:hidden">Schedule</span>
        </button>

        {/* Add Comment */}
        <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200 transition-colors cursor-pointer">
          <MessageSquare size={13} />
          <span className="hidden sm:inline">Add Comment</span>
          <span className="sm:hidden">Comment</span>
        </button>

        {/* Release Offer */}
        <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200 transition-colors cursor-pointer">
          <FileText size={13} />
          <span className="hidden sm:inline">Release Offer</span>
          <span className="sm:hidden">Offer</span>
        </button>

        {/* Reject */}
        <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-white text-red-600 border border-red-200 hover:bg-red-50 transition-colors cursor-pointer">
          <X size={13} />
          Reject
        </button>

        {/* View icon — pushed to end */}
        <button className="ml-auto inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 border border-gray-200 text-gray-500 hover:bg-gray-200 transition-colors cursor-pointer">
          <Eye size={14} />
        </button>
      </div>
    </div>
  );
};

export default CandidateCard;
