import { Briefcase, IndianRupee, MapPin, Clock } from "lucide-react";
import { getSalaryRange } from "../Admin/common/GetSalaryRange";

export default function PositionRequirementsCard({ data }) {
  const details = [
    {
      icon: <IndianRupee size={16} strokeWidth={2} className="text-red-600" />,
      iconBg: "bg-red-50 border border-red-200",
      label: "Salary range",
      value:
        data.salary_min != null && data.salary_max != null
          ? `₹${data.salary_min}–${data.salary_max} LPA`
          : "—",
    },
    {
      icon: <MapPin size={16} strokeWidth={2} className="text-red-600" />,
      iconBg: "bg-red-50 border border-red-200",
      label: "Location",
      value: data.location || "—",
    },
    {
      icon: <Clock size={16} strokeWidth={2} className="text-blue-600" />,
      iconBg: "bg-blue-50 border border-blue-200",
      label: "Experience",
      value: data.experience_years ? `${data.experience_years} years` : "—",
    },
    {
      icon: <Briefcase size={16} strokeWidth={2} className="text-blue-600" />,
      iconBg: "bg-blue-50 border border-blue-200",
      label: "Job type",
      value: data.job_type
        ? data.job_type.charAt(0).toUpperCase() + data.job_type.slice(1)
        : "—",
    },
  ];

  return (
    <div className="bg-yellow-50 border border-yellow-200 p-6 max-w-full rounded-2xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-5">
        <div className="w-14 h-14 rounded-xl bg-linear-to-br from-amber-400 to-orange-500 flex items-center justify-center shrink-0">
          <Briefcase size={24} strokeWidth={2} className="text-white" />
        </div>
        <div>
          <h2 className="text-xl font-medium text-stone-900">
            {data.job_name || "Untitled Position"}
          </h2>
          <p className="text-sm text-stone-500 mt-0.5">
            {data.description
              ? data.description.split(" ").length > 20
                ? data.description.split(" ").slice(0, 20).join(" ") + "…"
                : data.description
              : "No description provided."}
          </p>
        </div>
      </div>

      <div className="border-t border-yellow-200 mb-5" />

      {/* Detail chips */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {details.map(({ icon, iconBg, label, value }) => (
          <div
            key={label}
            className="flex items-center gap-3 bg-white border border-yellow-200 rounded-xl px-4 py-3"
          >
            <div
              className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${iconBg}`}
            >
              {icon}
            </div>
            <div>
              <p className="text-[11px] text-stone-400 leading-tight">
                {label}
              </p>
              <p className="text-sm font-medium text-stone-900">{value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
