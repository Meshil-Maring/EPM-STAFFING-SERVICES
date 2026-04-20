import React, { useState } from "react";
import Label from "../../../common/Label";
import LabelInput from "../../../common/LabelInput";
import UrgentJob from "./UrgentJob";
import Button from "../../../common/Button";
import EditComponentAnchor from "./EditJobComponentAnchor";
import RequirementsEditComponent from "./RequirementsEditComponent";
import JobStatus from "./JobStatus";
import Header from "../Candidate/Common/Header";
import { motion, AnimatePresence } from "framer-motion"; // ✅ removed unused isBezierDefinition
import { showError, showInfo, showSuccess } from "../../../../utils/toastUtils";
import { Loader2, Save, Briefcase } from "lucide-react";
import {
  updateByColumnNameIdService,
  updateByIdService,
} from "../../../../utils/server_until/service";

const SECTIONS = [
  { id: "requirements", label: "Requirements" },
  { id: "responsibilities", label: "Responsibilities" },
  { id: "benefits", label: "Benefits & Perks" },
];

function EditCardDetails({ setEditJobPost, card, onMutate }) {
  // ✅ onMutate in props
  if (!card) {
    showError("Job Data missing!");
    return null;
  }

  const [newForm_data, setNewForm_data] = useState(card);
  const [isSaving, setIsSaving] = useState(false);

  // ── Separate state for dynamic lists ────────────────────────────────────────
  const [requirements, setRequirements] = useState(
    Object.values(card?.requirements?.[0] || {}),
  );
  const [responsibilities, setResponsibilities] = useState(
    Object.values(card?.responsibilities?.[0] || {}),
  );
  const [benefits, setBenefits] = useState(
    Object.values(card?.benefits?.[0] || {}),
  );

  const setterMap = {
    requirements: setRequirements,
    responsibilities: setResponsibilities,
    benefits: setBenefits,
  };

  // ── Generic field handler ────────────────────────────────────────────────────
  const handle_update_form = (value, id) =>
    setNewForm_data((prev) => ({ ...prev, [id]: value }));

  // ── List handlers ────────────────────────────────────────────────────────────
  const handleUpdateReq_Res_Ben = (section, index, newValue) =>
    setterMap[section]?.((prev) =>
      prev.map((v, i) => (i === index ? newValue : v)),
    );

  const deleteReq_Res_Ben = (section, indexToDelete) =>
    setterMap[section]?.((prev) => prev.filter((_, i) => i !== indexToDelete));

  const addingReq_Res_Ben = (section) =>
    setterMap[section]?.((prev) => [...prev, ""]);

  // ── Save ─────────────────────────────────────────────────────────────────────
  const handleSaveChanges = async () => {
    if (isSaving) return;

    // validate against the actual state variables, not newForm_data
    const stateMap = { requirements, responsibilities, benefits };
    for (const { id, label } of SECTIONS) {
      const data = stateMap[id];
      // if (!data.length)
      //   return showInfo(`At least one ${label} item is required`);
      // if (!data.some((v) => v?.trim()))
      //   return showInfo(`Please fill in at least one ${label} item`);
    }

    setIsSaving(true);

    const toISO = (dateStr) => {
      if (!dateStr) return null;
      const d = new Date(dateStr);
      return isNaN(d) ? null : d.toISOString();
    };

    const readyJobs = {
      active: newForm_data?.active,
      urgent: newForm_data?.urgent,
      job_name: newForm_data?.job_name,
      job_type: newForm_data?.job_type,
      salary_min: newForm_data?.salary_min ?? null,
      salary_max: newForm_data?.salary_max ?? null,
      experience_years: newForm_data?.experience_years,
      max_applications: Number(newForm_data?.max_applications),
      deadline: toISO(newForm_data?.deadline),
      description: newForm_data?.description,
      location: newForm_data?.location,
    };

    try {
      await updateByIdService(
        "api/dr/update/id",
        readyJobs,
        "jobs",
        newForm_data?.id,
      );

      await Promise.all([
        updateByColumnNameIdService(
          "api/dr/update/id",
          { requirements: { ...requirements } },
          "job_requirements",
          "job_id",
          newForm_data?.id,
        ),
        updateByColumnNameIdService(
          "api/dr/update/id",
          { responsibilities: { ...responsibilities } },
          "job_responsibilities",
          "job_id",
          newForm_data?.id,
        ),
        updateByColumnNameIdService(
          "api/dr/update/id",
          { benefits: { ...benefits } },
          "job_benefits",
          "job_id",
          newForm_data?.id,
        ),
      ]);

      showSuccess("Job updated successfully!");
      onMutate?.(); // ✅ refetch the jobs list in parent
      setEditJobPost(false);
    } catch (error) {
      console.error("Failed to save job:", error);
      showError("Failed to save changes. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  // ── Styles ───────────────────────────────────────────────────────────────────
  const input_class =
    "border border-slate-200 w-full px-3 py-2 text-sm rounded-lg bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition";
  const label_class = "font-semibold text-sm text-slate-700";
  const icon_class =
    "font-semibold text-sm rounded-full hover:text-red-500 transition-all duration-200 w-6 h-6 p-2";

  const dataMap = { requirements, responsibilities, benefits };

  return (
    <AnimatePresence>
      <div
        onClick={() => setEditJobPost(false)}
        className="flex items-center justify-center p-4 absolute inset-0 bg-slate-900/70 backdrop-blur-sm z-50 overflow-hidden"
      >
        <motion.div
          initial={{ opacity: 0, x: "100%", scale: 0.97 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: "100%" }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="h-full w-[42%] rounded-xl shadow-2xl flex flex-col bg-white overflow-hidden border border-slate-100"
        >
          {/* ── Header ───────────────────────────────────────────────────── */}
          <div className="flex-shrink-0 bg-gradient-to-r from-slate-800 to-slate-900 px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                <Briefcase size={16} className="text-indigo-400" />
              </div>
              <div>
                {/* ✅ display card.job_name only in header — not bound to input */}
                <p className="text-white font-semibold text-sm">
                  {card?.job_name || "Edit Job"}
                </p>
                <p className="text-slate-400 text-xs">Edit Job Post</p>
              </div>
            </div>
            <button
              onClick={() => setEditJobPost(false)}
              className="w-8 h-8 rounded-lg bg-slate-700 hover:bg-slate-600 flex items-center justify-center transition-colors"
            >
              <span className="text-slate-300 text-lg leading-none">×</span>
            </button>
          </div>

          {/* ── Scrollable Body ───────────────────────────────────────────── */}
          <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col gap-5 p-5">
            <JobStatus
              job_status={newForm_data?.active}
              handle_update_form={handle_update_form}
              heading="Job Status"
              label={
                newForm_data?.active
                  ? "This job is active and candidates can apply."
                  : "This job has been deactivated."
              }
            />

            {/* ✅ value falls back to "" not "N/A" so user can freely clear it */}
            <LabelInput
              onchange={handle_update_form}
              id="job_name"
              text="Job Title"
              value={newForm_data?.job_name ?? ""}
              label_class_name={label_class}
              input_class_name={input_class}
              type="text"
            />

            <UrgentJob
              heading="Mark as Urgent"
              label="This will assign a priority badge to your listing"
              priority={newForm_data?.urgent}
              handle_update_form={handle_update_form}
            />

            <EditComponentAnchor
              card={newForm_data}
              handleInputChange={handle_update_form}
            />

            {/* ── Dynamic Sections ──────────────────────────────────────── */}
            {SECTIONS.map(({ id, label }) => (
              <div
                key={id}
                className="rounded-xl border border-slate-100 bg-slate-50/60 overflow-hidden"
              >
                {/* Section header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-white">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100">
                      {label}
                    </span>
                    <span className="text-xs text-slate-400">
                      {dataMap[id].length} item
                      {dataMap[id].length !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => addingReq_Res_Ben(id)}
                    className="flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-lg text-indigo-500 hover:text-indigo-700 hover:bg-indigo-50 transition-colors"
                  >
                    + Add
                  </button>
                </div>

                <div className="px-3 py-2">
                  <RequirementsEditComponent
                    section_id={id}
                    icon_class={icon_class}
                    data_prop={dataMap[id]}
                    updateReq_Res_Ben={handleUpdateReq_Res_Ben}
                    deletingReq_Res_Ben={deleteReq_Res_Ben}
                    addingReq_Res_Ben={addingReq_Res_Ben}
                  />
                </div>
              </div>
            ))}

            {/* ── Save Button ───────────────────────────────────────────── */}
            <button
              type="button"
              onClick={handleSaveChanges}
              disabled={isSaving}
              className={`w-full py-2.5 rounded-xl font-semibold text-sm text-white flex items-center justify-center gap-2 transition-all duration-200 ${
                isSaving
                  ? "bg-slate-400 cursor-not-allowed"
                  : "bg-linear-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 hover:scale-[1.01] shadow-md shadow-indigo-200"
              }`}
            >
              {isSaving ? (
                <>
                  <Loader2 size={15} className="animate-spin" /> Saving...
                </>
              ) : (
                <>
                  <Save size={15} /> Save Changes
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default EditCardDetails;
