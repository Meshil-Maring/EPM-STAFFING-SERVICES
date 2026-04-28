import React, { useState } from "react";
import LabelInput from "../../../common/LabelInput";
import UrgentJob from "./UrgentJob";
import EditComponentAnchor from "./EditJobComponentAnchor";
import RequirementsEditComponent from "./RequirementsEditComponent";
import JobStatus from "./JobStatus";
import { motion, AnimatePresence } from "framer-motion";
import { showError, showSuccess } from "../../../../utils/toastUtils";
import {
  Loader2,
  Save,
  Briefcase,
  X,
  ListChecks,
  ShieldCheck,
  Gift,
  Plus,
} from "lucide-react";
import {
  updateByColumnNameIdService,
  updateByIdService,
} from "../../../../utils/server_until/service";

const SECTIONS = [
  { id: "requirements", label: "Requirements", icon: ListChecks },
  { id: "responsibilities", label: "Responsibilities", icon: ShieldCheck },
  { id: "benefits", label: "Benefits & Perks", icon: Gift },
];

function EditCardDetails({ setEditJobPost, card, onMutate }) {
  if (!card) {
    showError("Job data missing!");
    return null;
  }

  const [newForm_data, setNewForm_data] = useState(card);
  const [isSaving, setIsSaving] = useState(false);
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
  const dataMap = { requirements, responsibilities, benefits };

  const handle_update_form = (value, id) =>
    setNewForm_data((p) => ({ ...p, [id]: value }));
  const handleUpdateReq_Res_Ben = (section, index, val) =>
    setterMap[section]?.((p) => p.map((v, i) => (i === index ? val : v)));
  const deleteReq_Res_Ben = (section, idx) =>
    setterMap[section]?.((p) => p.filter((_, i) => i !== idx));
  const addingReq_Res_Ben = (section) =>
    setterMap[section]?.((p) => [...p, ""]);

  const handleSaveChanges = async () => {
    if (isSaving) return;
    setIsSaving(true);
    const toISO = (d) => {
      if (!d) return null;
      const dt = new Date(d);
      return isNaN(dt) ? null : dt.toISOString();
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
      onMutate?.();
      setEditJobPost(false);
    } catch (err) {
      console.error(err);
      showError("Failed to save changes. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const input_class =
    "px-3 py-2 w-full rounded-lg text-sm border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all bg-white text-slate-700 placeholder-slate-400";
  const label_class =
    "text-xs font-semibold text-slate-700 uppercase tracking-wide";
  const icon_class =
    "font-semibold text-sm rounded-full hover:text-red-500 transition-all duration-200 w-6 h-6 p-2";

  return (
    <AnimatePresence>
      {/* ── Backdrop ── */}
      <motion.div
        key="edit-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={() => setEditJobPost(false)}
        className="fixed inset-0 z-[300] flex items-center justify-center p-4"
        style={{ background: "rgba(15, 23, 42, 0.45)" }}
      >
        {/* ── Panel ── */}
        <motion.div
          key="edit-panel"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, y: 28, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.97 }}
          transition={{
            duration: 0.25,
            type: "spring",
            stiffness: 300,
            damping: 28,
          }}
          className="relative flex flex-col rounded-2xl bg-white"
          style={{
            width: "clamp(380px, 42vw, 540px)",
            maxHeight: "92vh",
            height: "92vh",
            boxShadow:
              "0 24px 64px rgba(0,0,0,0.14), 0 0 0 1px rgba(99,102,241,0.1)",
          }}
        >
          {/* Top accent bar */}
          <div
            className="h-[3px] w-full shrink-0 rounded-t-2xl"
            style={{
              background: "linear-gradient(90deg, #6366f1, #8b5cf6, #a78bfa)",
            }}
          />

          {/* ── Header ── */}
          <div
            className="flex items-center justify-between px-5 py-4 shrink-0"
            style={{
              background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
            }}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  boxShadow: "0 4px 12px rgba(99,102,241,0.4)",
                }}
              >
                <Briefcase size={15} className="text-white" />
              </div>
              <div className="min-w-0">
                <p className="text-white font-bold text-sm leading-tight truncate">
                  {card?.job_name || "Edit Job"}
                </p>
                <p className="text-slate-400 text-xs mt-0.5">Edit Job Post</p>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.15 }}
              onClick={() => setEditJobPost(false)}
              className="w-8 h-8 rounded-full cursor-pointer  flex items-center justify-center text-slate-400 hover:text-white transition-colors shrink-0"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <X size={14} />
            </motion.button>
          </div>

          {/* ── Scrollable body ── */}
          <div
            className="flex-1 min-h-0 overflow-y-auto flex flex-col gap-5 p-5"
            style={{ scrollbarWidth: "none" }}
          >
            {/* Job Status toggle */}
            <SectionCard title="Job Status" icon={ShieldCheck}>
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
            </SectionCard>

            {/* Job Title */}
            <div className="flex flex-col gap-1.5">
              <label className={label_class}>Job Title</label>
              <LabelInput
                onchange={handle_update_form}
                id="job_name"
                text=""
                value={newForm_data?.job_name ?? ""}
                label_class_name="hidden"
                input_class_name={`${input_class} font-semibold text-slate-800`}
                type="text"
              />
            </div>

            {/* Urgent toggle */}
            <SectionCard title="Priority" icon={Briefcase}>
              <UrgentJob
                heading="Mark as Urgent"
                label="This will assign a priority badge to your listing"
                priority={newForm_data?.urgent}
                handle_update_form={handle_update_form}
              />
            </SectionCard>

            {/* Anchor fields (location, type, salary, etc.) */}
            <SectionCard title="Job Details" icon={Briefcase}>
              <EditComponentAnchor
                card={newForm_data}
                handleInputChange={handle_update_form}
              />
            </SectionCard>

            {/* ── Dynamic list sections ── */}
            {SECTIONS.map(({ id, label, icon: SectionIcon }) => (
              <div
                key={id}
                className="rounded-xl"
                style={{ border: "1px solid #e2e8f0" }}
              >
                {/* Section header */}
                <div
                  className="flex items-center justify-between px-4 py-2.5 rounded-t-xl"
                  style={{
                    background: "#f8fafc",
                    borderBottom: "1px solid #e2e8f0",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-5 h-5 rounded-md flex items-center justify-center shrink-0"
                      style={{
                        background: "linear-gradient(135deg, #ede9fe, #ddd6fe)",
                      }}
                    >
                      <SectionIcon size={11} style={{ color: "#8b5cf6" }} />
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-wide text-slate-700">
                      {label}
                    </span>
                    <span
                      className="text-xs font-semibold px-1.5 py-0.5 rounded-full"
                      style={{
                        background: "#ede9fe",
                        color: "#7c3aed",
                        border: "1px solid #ddd6fe",
                      }}
                    >
                      {dataMap[id].length}
                    </span>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => addingReq_Res_Ben(id)}
                    className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors"
                    style={{
                      background: "#eef2ff",
                      color: "#6366f1",
                      border: "1px solid #c7d2fe",
                    }}
                  >
                    <Plus size={11} />
                    Add
                  </motion.button>
                </div>

                <div className="p-4 pb-5">
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

            <div className="h-1" />
          </div>

          {/* ── Sticky footer ── */}
          <div
            className="shrink-0 px-5 py-4"
            style={{ borderTop: "1px solid #e2e8f0", background: "#fff" }}
          >
            <motion.button
              whileHover={{ scale: isSaving ? 1 : 1.01 }}
              whileTap={{ scale: isSaving ? 1 : 0.98 }}
              onClick={handleSaveChanges}
              disabled={isSaving}
              className="w-full flex items-center justify-center bg-g_btn  gap-2 py-3 rounded-xl text-sm font-bold text-white transition-all"
              style={{
                boxShadow: isSaving
                  ? "none"
                  : "0 4px 16px rgba(99,102,241,0.4)",
                cursor: isSaving ? "not-allowed" : "pointer",
              }}
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
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ── Reusable section card (no overflow-hidden) ──
function SectionCard({ title, icon: Icon, children }) {
  return (
    <div className="rounded-xl" style={{ border: "1px solid #e2e8f0" }}>
      <div
        className="flex items-center gap-2 px-4 py-2.5 rounded-t-xl"
        style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}
      >
        <div
          className="w-5 h-5 rounded-md flex items-center justify-center shrink-0"
          style={{ background: "linear-gradient(135deg, #ede9fe, #ddd6fe)" }}
        >
          <Icon size={11} style={{ color: "#8b5cf6" }} />
        </div>
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-700">
          {title}
        </span>
      </div>
      <div className="p-4 pb-5">{children}</div>
    </div>
  );
}

export default EditCardDetails;
