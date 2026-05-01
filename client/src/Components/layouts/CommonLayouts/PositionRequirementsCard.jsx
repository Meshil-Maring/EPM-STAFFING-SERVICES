import {
  Briefcase,
  IndianRupee,
  MapPin,
  Clock,
  Users,
  AlertCircle,
} from "lucide-react";

export default function PositionRequirementsCard({ data }) {
  const deadlineFormatted = data.deadline
    ? new Date(data.deadline).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : null;

  const chips = [
    {
      icon: <IndianRupee size={12} strokeWidth={2} />,
      label:
        data.salary_min != null && data.salary_max != null
          ? `₹${data.salary_min}–${data.salary_max} LPA`
          : "—",
    },
    {
      icon: <MapPin size={12} strokeWidth={2} />,
      label: data.location || "—",
    },
    {
      icon: <Clock size={12} strokeWidth={2} />,
      label: data.experience_years ? `${data.experience_years} yrs exp.` : "—",
    },
    ...(data.max_applications
      ? [
          {
            icon: <Users size={12} strokeWidth={2} />,
            label: `Max ${data.max_applications} applicants`,
          },
        ]
      : []),
  ];

  return (
    <div className="bg-white border border-black/10 rounded-xl p-3.5 flex flex-col gap-2.5 w-full">
      {/* Row 1 — icon + title + badges + deadline */}
      <div className="flex items-center gap-2.5">
        {/* Icon */}
        <div className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center shrink-0">
          <Briefcase size={16} strokeWidth={2} className="text-white" />
        </div>

        {/* Title + description */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-sm font-medium text-stone-900 leading-tight">
              {data.job_name || "Untitled Position"}
            </span>

            {/* Job type badge */}
            {data.job_type && (
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                {data.job_type.charAt(0).toUpperCase() + data.job_type.slice(1)}
              </span>
            )}

            {/* Urgent badge */}
            {data.urgent && (
              <span className="flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-200">
                <AlertCircle size={10} strokeWidth={2.5} />
                Urgent
              </span>
            )}

            {/* Active / Inactive badge */}
            <span
              className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${
                data.active
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : "bg-slate-100 text-slate-500 border-slate-200"
              }`}
            >
              {data.active ? "Active" : "Inactive"}
            </span>
          </div>

          {/* Description — single line truncated */}
          {data.description && (
            <p className="text-xs text-stone-400 mt-0.5 truncate leading-tight">
              {data.description}
            </p>
          )}
        </div>

        {/* Deadline — far right */}
        {deadlineFormatted && (
          <div className="flex flex-col items-end shrink-0">
            <span className="text-[10px] text-stone-400 leading-tight">
              Deadline
            </span>
            <span className="text-xs font-medium text-stone-700">
              {deadlineFormatted}
            </span>
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="border-t border-black/[0.06]" />

      {/* Row 2 — chips */}
      <div className="flex items-center gap-1.5 flex-wrap">
        {chips.map(({ icon, label }) => (
          <div
            key={label}
            className="flex items-center gap-1.5 bg-stone-50 border border-black/[0.08] rounded-md px-2.5 py-1"
          >
            <span className="text-stone-400">{icon}</span>
            <span className="text-xs text-stone-500">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
