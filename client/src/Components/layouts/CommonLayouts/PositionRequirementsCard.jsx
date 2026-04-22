import { Briefcase, IndianRupee, MapPin, Clock } from "lucide-react";
import { getSalaryRange } from "../Admin/common/GetSalaryRange";

export default function PositionRequirementsCard({ job_card }) {
  const details = [
    {
      icon: <IndianRupee size={16} strokeWidth={2} className="text-red-600" />,
      iconBg: "bg-red-50 border border-red-200",
      label: "Salary range",
      value: getSalaryRange(job_card?.salary_max, job_card?.salary_min),
    },
    {
      icon: <MapPin size={16} strokeWidth={2} className="text-red-600" />,
      iconBg: "bg-red-50 border border-red-200",
      label: "Locations",
      value: job_card?.location || "N/A",
    },
    {
      icon: <Clock size={16} strokeWidth={2} className="text-blue-600" />,
      iconBg: "bg-blue-50 border border-blue-200",
      label: "Experience",
      value: job_card?.experience_years || "N/A",
    },
    {
      icon: <Briefcase size={16} strokeWidth={2} className="text-blue-600" />,
      iconBg: "bg-blue-50 border border-blue-200",
      label: "Job type",
      value: job_card?.job_type || "N/A",
    },
  ];
  console.log(job_card);
  return (
    <div className="bg-yellow-50 border border-yellow-200 p-6 max-w-full rounded-2xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-5">
        <div className="w-14 h-14 rounded-xl bg-linear-to-br from-amber-400 to-orange-500 flex items-center justify-center shrink-0">
          <Briefcase size={24} strokeWidth={2} className="text-white" />
        </div>
        <div>
          <h2 className="text-xl font-medium text-stone-900">
            {job_card?.job_name || "N/A"}
          </h2>
          <p className="text-sm text-stone-500 mt-0.5">
            {job_card?.experience_years || "N/A"}
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
