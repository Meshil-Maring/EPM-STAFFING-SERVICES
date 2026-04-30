import React, { useState } from "react";
import { motion } from "framer-motion";
import LabelInput from "../../../common/LabelInput";
import LabelTextArea from "../../../common/LabelTextArea";
import SkillsSection from "./SkillsSection";
import FileUploadSection from "./FileUploadSection";
import {
  validateRequiredFields,
  CANDIDATE_FORM_INITIAL_STATE,
  FORM_ELEMENTS,
} from "../../../../utils/candidateFormHelpers";
import ContractType_input from "../../../../utils/ContractType_input";
import { showError, showInfo, showSuccess } from "../../../../utils/toastUtils";
import { submitCandidates } from "./end-point-function/client_management";
import Label from "../../../common/Label";
import GenderComponent from "./GenderComponent";
import { useAuth } from "../../../../hooks/useAuth";
import {
  pushNotification,
  updateNotification,
} from "../../Notifications/notification.js";
import {
  UserPlus,
  X,
  Building2,
  Briefcase,
  User,
  FileText,
  Layers,
  Paperclip,
  Send,
  Loader2,
} from "lucide-react";

function CompanyOverlay_SubmitCandidate({ job, company, setClosing }) {
  const { user } = useAuth();
  const [submitting, setSubmitting] = useState(false);

  const company_id = company?.user_id;
  const job_id = job?.job_id;

  const [fileNames, setFileNames] = useState({
    resume: "",
    cover_letter: "",
    portfolio: "",
  });
  const [candidate_skills, setSkills] = useState([""]);
  const [resumeFile, setResume] = useState("");
  const [coverFile, setCover_letter] = useState("");
  const [portfolioFile, setPortfolio] = useState("");
  const [candidate_form, setCandidate_form] = useState(
    CANDIDATE_FORM_INITIAL_STATE(job_id, company_id),
  );

  const clearFiles = () =>
    setFileNames({ resume: "", cover_letter: "", portfolio: "" });
  const clearForm = () => {
    setCandidate_form(CANDIDATE_FORM_INITIAL_STATE(job_id, company_id));
    setSkills([""]);
    setResume("");
    setCover_letter("");
    setPortfolio("");
  };

  const handleInputChange = (value, id) => {
    if (id === "notice_period_days" && value < 0)
      return showError("Notice period can't be negative!");
    setCandidate_form((prev) => ({ ...prev, [id]: value }));
  };

  const handleSkillChange = (value, i) => {
    setSkills((prev) => {
      const n = [...prev];
      n[i] = value;
      return n;
    });
  };
  const handleAddSkill = () => {
    const last = candidate_skills[candidate_skills.length - 1];
    if (last && last.trim() !== "") setSkills((prev) => [...prev, ""]);
  };
  const handleRemoveSkill = (index) => {
    if (candidate_skills.length === 1)
      return showInfo("At least one skill required!");
    setSkills(candidate_skills.filter((_, i) => i !== index));
  };

  // Submit candidate Handler
  const handleSubmit = async (e) => {
    if (submitting) return;
    setSubmitting(true);
    if (e?.preventDefault) e.preventDefault();
    const missing = validateRequiredFields(candidate_form);
    if (missing.length > 0) {
      setSubmitting(false);
      return showError(`Please fill: ${missing.join(", ")}`);
    }
    if (!resumeFile) {
      setSubmitting(false);
      return showInfo("Resume required");
    }
    if (candidate_skills.length === 0) {
      setSubmitting(false);
      return showInfo("At least 1 skill required");
    }
    if (candidate_skills.some((s) => s === "")) {
      setSubmitting(false);
      return showInfo("Fill or remove empty skill fields");
    }

    const skills = [{ ...candidate_skills }];
    const {
      candidate_name,
      email,
      location,
      phone,
      experience,
      job_type,
      expected_ctc,
      current_ctc,
      gender,
      date_of_birth,
      linkedin,
      notice_period_days,
      description,
    } = candidate_form;

    const result = await submitCandidates(
      job_id,
      user.id,
      true,
      candidate_name,
      email,
      phone,
      location,
      job_type,
      expected_ctc,
      current_ctc,
      gender,
      date_of_birth,
      experience,
      linkedin,
      notice_period_days,
      skills,
      description,
      resumeFile,
      coverFile,
      portfolioFile,
    );

    await pushNotification(
      result.data.id,
      user.id,
      "candidate_applied",
      `${result.data.candidate_name} Submitted`,
      `${result.data.candidate_name} has been submitted for ${job.job_name}.`,
      "candidate",
      "candidate",
    );

    if (!result.success) {
      setSubmitting(false);
      return showError(result.message);
    }
    showSuccess("Candidate submitted successfully");
    setSubmitting(false);
    clearForm();
    clearFiles();
  };

  // shared input/label styles
  const input_class =
    "px-3 py-2 w-full rounded-lg text-sm border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all bg-white text-slate-700 placeholder-slate-400";
  const label_class =
    "text-xs font-semibold text-slate-700 uppercase tracking-wide";

  return (
    <motion.div
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
      {/* ── Top accent bar ── */}
      <div
        className="h-[3px] w-full shrink-0"
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
            <UserPlus size={15} className="text-white" />
          </div>
          <div className="min-w-0">
            <p className="text-white font-bold text-sm leading-tight truncate">
              {company?.company_name || "Submit Candidate"}
            </p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <Briefcase size={10} className="text-indigo-400 shrink-0" />
              <p className="text-indigo-300 text-xs truncate">
                {job?.job_name || "N/A"}
              </p>
            </div>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.15 }}
          onClick={() => setClosing(false)}
          className="w-8 h-8 rounded-full cursor-pointer flex items-center justify-center text-slate-400 hover:text-white transition-colors shrink-0"
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
        {/* ── Candidate Name ── */}
        <div className="flex flex-col gap-1.5">
          <label className={label_class}>Candidate Name *</label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400 pointer-events-none">
              <User size={14} />
            </div>
            <LabelInput
              onchange={handleInputChange}
              id="candidate_name"
              text=""
              label_class_name="hidden"
              input_class_name={`${input_class} pl-4 font-semibold text-slate-800`}
              type="text"
              value={candidate_form?.candidate_name}
            />
          </div>
        </div>

        {/* ── Personal & Job Details ── */}
        <SectionCard title="Personal & Job Details" icon={Briefcase}>
          <div className="grid grid-cols-2 gap-3">
            {FORM_ELEMENTS.map((el, i) => {
              const isContract = el.id === "contract_type";
              const isGender = el.id === "gender";
              return isContract ? (
                <ContractType_input
                  key={`el-${i}`}
                  element={el}
                  label_class={label_class}
                  input_class={input_class}
                  value={candidate_form?.[el.id]}
                  handleInputChange={handleInputChange}
                />
              ) : isGender ? (
                <div key={`el-${i}`} className="flex flex-col gap-1.5">
                  <Label text={el.label} class_name={label_class} />
                  <GenderComponent
                    handleInputChange={handleInputChange}
                    el={el}
                    class_name={input_class}
                    gender={candidate_form?.[el.id]}
                  />
                </div>
              ) : (
                <div key={`el-${i}`} className="flex flex-col gap-1.5">
                  <label className={label_class}>{el.label}</label>
                  <LabelInput
                    onchange={handleInputChange}
                    id={el.id}
                    text=""
                    label_class_name="hidden"
                    input_class_name={input_class}
                    type={el.type}
                    value={candidate_form?.[el.id]}
                  />
                </div>
              );
            })}
          </div>
        </SectionCard>

        {/* ── Skills ── */}
        <SectionCard title="Skills" icon={Layers}>
          <SkillsSection
            candidate_skills={candidate_skills}
            handleSkillChange={handleSkillChange}
            handleAddSkill={handleAddSkill}
            handleRemoveSkill={handleRemoveSkill}
            input_class={input_class}
            label_class={label_class}
          />
        </SectionCard>

        {/* ── File Uploads ── */}
        <SectionCard title="Documents" icon={Paperclip}>
          <FileUploadSection
            label_class={label_class}
            setResume={setResume}
            setPortfolio={setPortfolio}
            setCover_letter={setCover_letter}
            fileNames={fileNames}
            setFileNames={setFileNames}
          />
        </SectionCard>

        {/* ── Description ── */}
        <SectionCard title="Description" icon={FileText}>
          <LabelTextArea
            id="description"
            text=""
            type="text"
            label_class_name="hidden"
            textarea_class_name={`${input_class} resize-none min-h-[80px]`}
            onchange={handleInputChange}
            value={candidate_form.description}
          />
        </SectionCard>

        {/* bottom spacing */}
        <div className="h-1" />
      </div>

      {/* ── Sticky footer submit ── */}
      <div
        className="shrink-0 px-5 py-4"
        style={{ borderTop: "1px solid #e2e8f0", background: "#fff" }}
      >
        <motion.button
          whileHover={{ scale: submitting ? 1 : 1.01 }}
          whileTap={{ scale: submitting ? 1 : 0.98 }}
          onClick={handleSubmit}
          disabled={submitting}
          className="w-full flex bg-g_btn items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white transition-all"
          style={{
            boxShadow: submitting ? "none" : "0 4px 16px rgba(99,102,241,0.4)",
            cursor: submitting ? "not-allowed" : "pointer",
          }}
        >
          {submitting ? (
            <>
              <Loader2 size={15} className="animate-spin" />
              Validating...
            </>
          ) : (
            <>
              <Send size={15} />
              Submit Candidate
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
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

export default CompanyOverlay_SubmitCandidate;
