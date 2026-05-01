import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import { pushNotification } from "../../Notifications/notification.js";
import { useAuth } from "../../../../hooks/useAuth.js";
import {
  X,
  ChevronDown,
  Link,
  User,
  MapPin,
  Phone,
  FileText,
  Calendar,
  Clock,
  Video,
  Building2,
  PhoneCall,
  AlertCircle,
} from "lucide-react";
import { showError, showSuccess } from "../../../../utils/toastUtils.js";
import { rescheduleInterview, scheduleInterview } from "./CandidateCard.js";

// ─── Constants ───────────────────────────────────────────────────────────────

const INTERVIEW_TYPES = [
  { value: "Online", label: "Online", icon: Video },
  { value: "In-Person", label: "In-Person", icon: Building2 },
  { value: "Telephone", label: "Telephone", icon: PhoneCall },
];

const REQUIRED_FIELDS = {
  Online: ["date", "time", "meetingLink"],
  "In-Person": ["date", "time", "phone"],
  Telephone: ["date", "time", "phone"],
};

const INITIAL_FORM = {
  date: "",
  time: "",
  round: "round1",
  type: "Online",
  meetingLink: "",
  interviewer: "",
  address: "",
  phone: "",
  notes: "",
};

// ─── Shared helpers ───────────────────────────────────────────────────────────

const inputBase =
  "w-full border rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200 bg-white";

const inputClass = (errors, key) =>
  `${inputBase} ${
    errors[key]
      ? "border-red-300 focus:ring-red-200 bg-red-50/40"
      : "border-gray-200 focus:ring-indigo-200 focus:border-indigo-300"
  }`;

// ─── Shared sub-components ────────────────────────────────────────────────────

const Field = ({ label, fieldKey, required, errors, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm font-semibold text-slate-700 flex items-center gap-1">
      {label}
      {required && <span className="text-red-500 text-xs">*</span>}
    </label>
    {children}
    {errors[fieldKey] && (
      <p className="flex items-center gap-1 text-xs text-red-500 mt-0.5">
        <AlertCircle size={11} />
        This field is required
      </p>
    )}
  </div>
);

// Extracted: repeated across In-Person & Telephone
const PhoneField = ({ form, setForm, errors }) => (
  <Field label="Phone Number" fieldKey="phone" required errors={errors}>
    <PhoneInput
      country="in"
      specialLabel={null}
      value={form.phone}
      onChange={(phone) => setForm((prev) => ({ ...prev, phone }))}
      inputClass={`!w-full !border !rounded-xl !px-4 !py-3 !text-sm !text-gray-800 !placeholder-gray-400 !bg-white !h-auto !outline-none focus:!ring-2 focus:!transition-all focus:!duration-200 ${
        errors.phone
          ? "!border-red-300 !bg-red-50/40 focus:!ring-red-200"
          : "!border-gray-200 focus:!ring-indigo-200 focus:!border-indigo-300"
      }`}
      containerClass="w-full"
      inputProps={{ name: "phone", required: true }}
    />
  </Field>
);

// Extracted: repeated across all three type branches
const InterviewerField = ({ form, onChange, errors }) => (
  <Field label="Interviewer" fieldKey="interviewer" errors={errors}>
    <div className="relative">
      <input
        type="text"
        value={form.interviewer}
        onChange={onChange("interviewer")}
        placeholder="HR / Technical Panel"
        className={`${inputClass(errors, "interviewer")} pl-10`}
      />
      <User
        size={15}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
      />
    </div>
  </Field>
);

// ─── Main component ───────────────────────────────────────────────────────────

export default function ScheduleInterviewModal({
  candidate,
  user_id,
  job,
  onClose,
}) {
  const candidateName = candidate?.candidate?.[0]?.candidate_name ?? "—";
  const isInterview = candidate?.status === "interview";
  const interviewId = candidate?.interviews?.[0]?.id;

  const { user } = useAuth();

  const [form, setForm] = useState(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // Generic field setter — clears the error for that field on change
  const set = (key) => (e) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: false }));
  };

  const handleTypeChange = (val) => {
    setForm((prev) => ({ ...INITIAL_FORM, type: val }));
    setErrors({});
  };

  const validate = () => {
    const required = REQUIRED_FIELDS[form.type] || [];
    const newErrors = Object.fromEntries(
      required.filter((key) => !form[key]?.trim()).map((key) => [key, true]),
    );
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const scheduleHandler = async () => {
    if (!validate()) return showError("Please fill in all required fields.");

    setIsSubmitting(true);

    try {
      let res;

      if (isInterview) {
        res = await rescheduleInterview(
          interviewId,
          user_id,
          candidate.id,
          form,
        );
      } else {
        res = await scheduleInterview(candidate.id, user_id, form);
      }

      console.log(res);

      if (!res.success || !res?.data?.application_id) {
        showError("Failed to schedule");
        return;
      }

      pushNotification(
        res.data.application_id,
        user.id,
        "schedule_interview",
        `Interview ${isInterview ? "Rescheduled" : "Scheduled"}`,
        `An interview has been ${isInterview ? "rescheduled" : "scheduled"} for "${candidateName || "candidate"}" for "${job.job_name || "this job"}".`,
        "client",
        "candidate",
      );

      showSuccess(res.message);
      onClose(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isOnline = form.type === "Online";
  const isInPerson = form.type === "In-Person";
  const isTelephone = form.type === "Telephone";

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl relative max-h-[95vh] overflow-y-auto">
        {/* ── Header ── */}
        <div className="sticky top-0 z-10 px-8 pt-7 pb-6 rounded-t-2xl bg-linear-to-br from-slate-800 to-slate-900">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-linear-to-br from-indigo-500 to-violet-500">
                  <Calendar size={14} className="text-white" />
                </div>
                <h2 className="text-xl font-bold text-white tracking-tight">
                  Schedule Interview
                </h2>
              </div>
              <p className="text-slate-400 text-xs pl-9">
                Candidate:{" "}
                <span className="text-slate-200 font-medium">
                  {candidateName}
                </span>
              </p>
            </div>
            <button
              onClick={onClose}
              className="cursor-pointer w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-150"
            >
              <X size={18} />
            </button>
          </div>

          {/* Type tabs */}
          <div className="flex gap-2 mt-5">
            {INTERVIEW_TYPES.map(({ value, label, icon: Icon }) => (
              <button
                key={value}
                onClick={() => handleTypeChange(value)}
                className={`cursor-pointer flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  form.type === value
                    ? "bg-white text-slate-800 shadow-md"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/10"
                }`}
              >
                <Icon size={13} />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Body ── */}
        <div className="px-8 py-6 flex flex-col gap-5">
          {/* Date / Time / Round */}
          <div className="grid grid-cols-3 gap-4">
            <Field
              label="Interview Date"
              fieldKey="date"
              required
              errors={errors}
            >
              <div className="relative">
                <input
                  type="date"
                  value={form.date}
                  onChange={set("date")}
                  className={`${inputClass(errors, "date")} pl-10`}
                />
                <Calendar
                  size={15}
                  className={`absolute left-3 top-1/2 -translate-y-1/2 ${errors.date ? "text-red-400" : "text-gray-400"}`}
                />
              </div>
            </Field>

            <Field
              label="Interview Time"
              fieldKey="time"
              required
              errors={errors}
            >
              <div className="relative">
                <input
                  type="time"
                  value={form.time}
                  onChange={set("time")}
                  className={`${inputClass(errors, "time")} pl-10`}
                />
                <Clock
                  size={15}
                  className={`absolute left-3 top-1/2 -translate-y-1/2 ${errors.time ? "text-red-400" : "text-gray-400"}`}
                />
              </div>
            </Field>

            <Field
              label="Interview Round"
              fieldKey="round"
              required
              errors={errors}
            >
              <div className="relative">
                <select
                  value={form.round}
                  onChange={set("round")}
                  className={`${inputClass(errors, "round")} pl-4 appearance-none`}
                >
                  <option value="round1">Round 1</option>
                  <option value="round2">Round 2</option>
                  <option value="round3">Round 3</option>
                </select>
                <ChevronDown
                  size={15}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none ${
                    errors.round ? "text-red-400" : "text-gray-400"
                  }`}
                />
              </div>
            </Field>
          </div>

          <div className="border-t border-gray-100" />

          {/* ── Online fields ── */}
          {isOnline && (
            <>
              <Field
                label="Meeting Link"
                fieldKey="meetingLink"
                required
                errors={errors}
              >
                <div className="relative">
                  <input
                    type="url"
                    value={form.meetingLink}
                    onChange={set("meetingLink")}
                    placeholder="https://meet.google.com/..."
                    className={`${inputClass(errors, "meetingLink")} pl-10`}
                  />
                  <Link
                    size={15}
                    className={`absolute left-3 top-1/2 -translate-y-1/2 ${errors.meetingLink ? "text-red-400" : "text-indigo-400"}`}
                  />
                </div>
              </Field>
              <InterviewerField form={form} onChange={set} errors={errors} />
            </>
          )}

          {/* ── In-Person fields ── */}
          {isInPerson && (
            <>
              <Field label="Address" fieldKey="address" errors={errors}>
                <div className="relative">
                  <input
                    type="text"
                    value={form.address}
                    onChange={set("address")}
                    placeholder="Delhi, India"
                    className={`${inputClass(errors, "address")} pl-10`}
                  />
                  <MapPin
                    size={15}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                </div>
              </Field>
              <PhoneField form={form} setForm={setForm} errors={errors} />
              <InterviewerField form={form} onChange={set} errors={errors} />
            </>
          )}

          {/* ── Telephone fields ── */}
          {isTelephone && (
            <>
              <PhoneField form={form} setForm={setForm} errors={errors} />
              <InterviewerField form={form} onChange={set} errors={errors} />
            </>
          )}

          {/* Notes */}
          <Field label="Notes (optional)" fieldKey="notes" errors={errors}>
            <div className="relative">
              <textarea
                value={form.notes}
                onChange={set("notes")}
                placeholder="Any instructions for the candidate..."
                rows={3}
                className={`${inputClass(errors, "notes")} resize-none pl-10 pt-3`}
              />
              <FileText
                size={15}
                className="absolute left-3 top-3.5 text-gray-400"
              />
            </div>
          </Field>

          {/* ── Actions ── */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <p className="text-xs text-gray-400 flex items-center gap-1">
              <span className="text-red-400 font-bold">*</span>
              Required fields
            </p>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="cursor-pointer px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 hover:border-gray-300 transition-all duration-150"
              >
                Cancel
              </button>

              <button
                onClick={scheduleHandler}
                disabled={isSubmitting}
                className="cursor-pointer px-6 py-2.5 rounded-xl text-white text-sm font-semibold transition-all duration-150 shadow-md hover:opacity-90 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed bg-linear-to-br from-orange-400 to-red-500 shadow-red-300/40"
              >
                {isSubmitting
                  ? "Saving..."
                  : isInterview
                    ? "Reschedule Interview"
                    : "Schedule Interview"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
