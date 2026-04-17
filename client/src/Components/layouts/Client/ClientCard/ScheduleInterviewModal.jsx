import { useState } from "react";
import {
  X,
  ChevronDown,
  Link,
  User,
  MapPin,
  Phone,
  FileText,
} from "lucide-react";
import { showError, showSuccess } from "../../../../utils/toastUtils.js";

import { scheduleInterview } from "./../JobOverview/JobOverview";

const INTERVIEW_TYPES = ["Online", "In-Person", "Telephone"];

const inputClass =
  "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition bg-white";

const Field = ({ label, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-base font-medium text-gray-800">{label}</label>
    {children}
  </div>
);

export default function ScheduleInterviewModal({ candidate, onClose }) {
  const candidateName = candidate?.candidate?.[0]?.candidate_name ?? "—";

  const [form, setForm] = useState({
    date: "",
    time: "",
    type: "Online",
    meetingLink: "",
    interviewer: "",
    address: "",
    phone: "",
    notes: "",
  });

  // Generic setter
  const set = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  // Handle type change + reset unrelated fields
  const handleTypeChange = (e) => {
    const selectedType = e.target.value;

    setForm((prev) => ({
      ...prev,
      type: selectedType,

      // reset all conditional fields
      meetingLink: "",
      interviewer: "",
      address: "",
      phone: "",
    }));
  };

  const isOnline = form.type === "Online";
  const isInPerson = form.type === "In-Person";
  const isTelephone = form.type === "Telephone";

  // Schedule Function
  const scheduleHandler = async () => {
    const res = await scheduleInterview(candidate.id, form);

    if (!res.success) return showError(res.message);

    onClose(null);
    showSuccess(res.message);
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-8 relative max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Schedule Interview
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Candidate:{" "}
              <span className="font-semibold text-gray-800">
                {candidateName}
              </span>
            </p>
          </div>

          <button
            onClick={onClose}
            className="cursor-pointer text-gray-400 hover:text-gray-700 transition-colors mt-0.5"
          >
            <X size={22} />
          </button>
        </div>

        <div className="flex flex-col gap-5">
          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-4">
            <Field label="Interview Date">
              <input
                type="date"
                value={form.date}
                onChange={set("date")}
                className={inputClass}
              />
            </Field>

            <Field label="Interview Time">
              <input
                type="time"
                value={form.time}
                onChange={set("time")}
                className={inputClass}
              />
            </Field>
          </div>

          {/* Interview Type */}
          <Field label="Interview Type">
            <div className="relative">
              <select
                value={form.type}
                onChange={handleTypeChange}
                className={`${inputClass} pr-10 appearance-none cursor-pointer`}
              >
                {INTERVIEW_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>

              <ChevronDown
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
            </div>
          </Field>

          {/* Online */}
          {isOnline && (
            <>
              <Field label="Meeting Link">
                <div className="relative">
                  <input
                    type="url"
                    value={form.meetingLink}
                    onChange={set("meetingLink")}
                    placeholder="https://meet.google.com/..."
                    className={`${inputClass} pl-10`}
                  />
                  <Link
                    size={15}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                </div>
              </Field>

              <Field label="Interviewer">
                <div className="relative">
                  <input
                    type="text"
                    value={form.interviewer}
                    onChange={set("interviewer")}
                    placeholder="HR / Technical Panel"
                    className={`${inputClass} pl-10`}
                  />
                  <User
                    size={15}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                </div>
              </Field>
            </>
          )}

          {/* In-Person */}
          {isInPerson && (
            <>
              <Field label="Address">
                <div className="relative">
                  <input
                    type="text"
                    value={form.address}
                    onChange={set("address")}
                    placeholder="Delhi, India"
                    className={`${inputClass} pl-10`}
                  />
                  <MapPin
                    size={15}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                </div>
              </Field>

              <Field label="Phone Number">
                <div className="relative">
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={set("phone")}
                    placeholder="+91 87123 81320"
                    className={`${inputClass} pl-10`}
                  />
                  <Phone
                    size={15}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                </div>
              </Field>

              {/* interviewer also useful here (optional) */}
              <Field label="Interviewer">
                <div className="relative">
                  <input
                    type="text"
                    value={form.interviewer}
                    onChange={set("interviewer")}
                    placeholder="HR / Technical Panel"
                    className={`${inputClass} pl-10`}
                  />
                  <User
                    size={15}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                </div>
              </Field>
            </>
          )}

          {/* Telephone */}
          {isTelephone && (
            <>
              <Field label="Phone Number">
                <div className="relative">
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={set("phone")}
                    placeholder="+91 87123 81320"
                    className={`${inputClass} pl-10`}
                  />
                  <Phone
                    size={15}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                </div>
              </Field>

              {/* ✅ Interviewer added here */}
              <Field label="Interviewer">
                <div className="relative">
                  <input
                    type="text"
                    value={form.interviewer}
                    onChange={set("interviewer")}
                    placeholder="HR / Technical Panel"
                    className={`${inputClass} pl-10`}
                  />
                  <User
                    size={15}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                </div>
              </Field>
            </>
          )}

          {/* Notes */}
          <Field label="Notes (optional)">
            <div className="relative">
              <textarea
                value={form.notes}
                onChange={set("notes")}
                placeholder="Any instructions for the candidate..."
                rows={4}
                className={`${inputClass} resize-none pl-10 pt-3`}
              />
              <FileText
                size={15}
                className="absolute left-3 top-3.5 text-gray-400"
              />
            </div>
          </Field>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-1">
            <button
              onClick={onClose}
              className="cursor-pointer px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>

            <button
              onClick={scheduleHandler}
              className="cursor-pointer px-6 py-2.5 rounded-xl bg-linear-to-r from-orange-500 to-red-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity shadow-sm"
            >
              Schedule
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
