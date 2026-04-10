import { createPortal } from "react-dom";
import {
  X,
  MapPin,
  Briefcase,
  CreditCard,
  Clock,
  Users,
  CalendarDays,
  FileText,
} from "lucide-react";
import { motion } from "framer-motion";

/* Helper to safely render any value */
const safeValue = (value) => {
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "object" && value !== null)
    return Object.values(value).join(", ");
  return value || "N/A";
};

const InfoCard = ({ icon: Icon, label, value }) => (
  <div className="border border-gray-200 rounded-2xl p-3 flex items-center gap-3">
    <Icon size={15} className="text-gray-400 shrink-0" />
    <div className="min-w-0">
      <p className="text-xs text-gray-400">{label}</p>
      <p className="text-sm font-medium text-gray-900 truncate">
        {safeValue(value)}
      </p>
    </div>
  </div>
);

const BulletList = ({ items, color }) => {
  const safeItems = Array.isArray(items)
    ? items
    : typeof items === "object" && items !== null
      ? Object.values(items)
      : [];

  return (
    <div className="flex flex-col gap-1.5">
      {safeItems.map((item, i) => (
        <div key={i} className="flex items-center gap-2.5">
          <span
            className="mt-1.5 w-2 h-2 rounded-full shrink-0"
            style={{ background: color }}
          />
          <p className="text-sm text-gray-500 leading-relaxed">
            {safeValue(item)}
          </p>
        </div>
      ))}
    </div>
  );
};

export default function ViewJobDetailsOverlay({ job, onClose }) {
  if (!job) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -16 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-red-600 px-5 py-4 flex items-center gap-3 shrink-0">
          <div className="w-11 h-11 rounded-xl bg-orange-500 flex items-center justify-center text-white font-semibold text-sm shrink-0">
            {job.company_name?.slice(0, 2).toUpperCase() || "NA"}
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-white font-medium text-sm truncate">
              {safeValue(job.company_name)}
            </p>
            <p className="text-red-200 text-xs truncate">
              {safeValue(job.job_title)}
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-white hover:text-red-200 transition-colors p-1 rounded-lg hover:bg-red-700"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-5 py-5 [&::-webkit-scrollbar]:hidden space-y-5">
          {/* Info grid */}
          <div className="grid grid-cols-2 gap-2.5">
            <InfoCard icon={MapPin} label="Location" value={job.location} />
            <InfoCard icon={Briefcase} label="Job Type" value={job.job_type} />
            <InfoCard
              icon={CreditCard}
              label="Salary Range"
              value={job.salary_range}
            />
            <InfoCard icon={Clock} label="Experience" value={job.experience} />
            <InfoCard
              icon={Users}
              label="Applicants"
              value={`${job.applicants ?? 0} candidates`}
            />
            <InfoCard
              icon={CalendarDays}
              label="Application Deadline"
              value={job.deadline}
            />
          </div>

          {/* Description */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <FileText size={15} className="text-gray-700" />
              <p className="text-sm font-medium text-gray-900">
                Job description
              </p>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              {safeValue(job.description)}
            </p>
          </div>

          {/* Requirements */}
          {job.requirements && (
            <div>
              <p className="text-sm font-medium text-gray-900 mb-2">
                Requirements
              </p>
              <BulletList items={job.requirements} color="#dc2626" />
            </div>
          )}

          {/* Responsibilities */}
          {job.responsibilities && (
            <div>
              <p className="text-sm font-medium text-gray-900 mb-2">
                Key responsibilities
              </p>
              <BulletList items={job.responsibilities} color="#2563eb" />
            </div>
          )}

          {/* Benefits */}
          {job.benefits && (
            <div>
              <p className="text-sm font-medium text-gray-900 mb-2">
                Benefits &amp; perks
              </p>
              <BulletList items={job.benefits} color="#ea580c" />
            </div>
          )}
        </div>
      </motion.div>
    </div>,
    document.body,
  );
}
