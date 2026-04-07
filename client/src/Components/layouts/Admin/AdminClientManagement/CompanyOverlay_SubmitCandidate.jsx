import React, { useContext, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "../../Dashboard/Candidate/Common/Header";
import LabelInput from "../../../common/LabelInput";
import Button from "../../../common/Button";
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

function CompanyOverlay_SubmitCandidate({ job, company, setClosing }) {
  const [submitting, setSubmitting] = useState(false);
  const input_class =
    "py-2.2 bg-light/10 p-2 w-full focus:ring-1 ring-nevy_blue focus:outline-none border text-xs border-light/40 rounded-small";
  const label_class = "font-semibold text-sm";

  // Find company_id from company_accounts array or object
  const company_id = company?.user_id;
  const job_id = job?.job_id;

  const [skills, setSkills] = useState([""]);
  const [resume, setResume] = useState("");
  const [cover_letter, setCover_letter] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [candidate_form, setCandidate_form] = useState(
    CANDIDATE_FORM_INITIAL_STATE(job_id, company_id),
  );

  const handleInputChange = (value, id) => {
    if (id === "notice_period_days" && value < 0)
      return showError("notice period cann't be negative!");
    setCandidate_form((prev) => ({ ...prev, [id]: value }));
  };

  const handleSkillChange = (value, i) => {
    setSkills((prev) => {
      const newSkills = [...prev];
      newSkills[i] = value;
      return newSkills;
    });
  };

  const handleAddSkill = () => {
    const lastSkill = skills[skills.length - 1];
    if (lastSkill && lastSkill.trim() !== 0)
      return setSkills((prev) => [...prev, ""]);
  };

  const handleRemoveSkill = (index) => {
    if (skills.length === 1) return showInfo("Atleast one skill required!");
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
  };

  const handleSubmit = async (e) => {
    if (submitting) return;
    // setting the submitting state to prevent multiple submission clicks
    setSubmitting(true);
    if (e && e.preventDefault) e.preventDefault();
    // checking for missing fields
    const missing = validateRequiredFields(candidate_form);
    console.log(candidate_form);
    if (missing.length > 0) {
      setSubmitting(false);
      return showError(`Please fill required fields: ${missing.join(", ")}`);
    }
    if (resume === "") {
      setSubmitting(false);

      return showInfo("Resume required");
    }
    // skills should be atleast one
    if (skills.length === 0) {
      setSubmitting(false);
      return showInfo("Atleast '1' skill required");
    }
    // checking is there is any initialized empty skill field
    if (skills.some((skill) => skill === "")) {
      setSubmitting(false);
      return showInfo(
        "Any initialized skill field must be filled or removed!!",
      );
    }

    // converting the array skills to object
    const skills_obj = { ...skills };

    // extracting values from the local candidate form
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

    // passing values for submission
    const result = await submitCandidates(
      job_id,
      candidate_name,
      email,
      phone,
      location,
      job_type?.toLocaleLowerCase(),
      expected_ctc,
      current_ctc,
      gender?.toLocaleLowerCase(),
      date_of_birth,
      experience,
      linkedin,
      notice_period_days,
      description,
      resume,
      cover_letter,
      portfolio,
      skills_obj,
    );

    console.log(candidate_form);

    if (!result.success) {
      setSubmitting(false);
      return showError("Failed to submit the candidate");
    }
    showSuccess("Candidate Submitted Successfully");
    setSubmitting(false);
    setCandidate_form(CANDIDATE_FORM_INITIAL_STATE(job_id, company_id));
  };

  return (
    <motion.div
      onClick={(e) => e.stopPropagation()}
      initial={{ opacity: 0, x: "100%" }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2, type: "tween", ease: "easeInOut" }}
      className="w-[40%] max-h-full bg-b_white flex flex-col text-sm rounded-small overflow-hidden items-center justify-start"
    >
      <Header
        heading={company?.company_name}
        candidate_name={job?.job_name}
        handleClosingModal={() => setClosing(false)}
      />
      <div className="w-full relative flex flex-col items-center justify-start gap-6 p-4 overflow-y-auto no-scrollbar">
        <LabelInput
          onchange={handleInputChange}
          id={"candidate_name"}
          text={"Name of the Candidate*"}
          label_class_name={label_class}
          input_class_name={input_class}
          type={"text"}
        />
        <div className="w-full grid grid-cols-2 items-center justify-center gap-4">
          {FORM_ELEMENTS.map((el, i) => {
            const isContract = el.id === "contract_type";
            const isGender = el.id === "gender";
            return isContract ? (
              <ContractType_input
                key={`element-${i}-${el.id}`}
                element={el}
                label_class={label_class}
                input_class={input_class}
                handleInputChange={handleInputChange}
              />
            ) : isGender ? (
              <div
                key={`element-${i}-${el.id}`}
                className="flex flex-col items-start justify-start w-full"
              >
                <Label text={el.label} class_name={label_class} />
                <GenderComponent
                  handleInputChange={handleInputChange}
                  el={el}
                  class_name={input_class}
                />
              </div>
            ) : (
              <LabelInput
                key={`element-${i}-${el.id}`}
                onchange={handleInputChange}
                id={el.id}
                text={el.label}
                label_class_name={label_class}
                input_class_name={input_class}
                type={el.type}
              />
            );
          })}
        </div>
        <SkillsSection
          skills={skills}
          handleSkillChange={handleSkillChange}
          handleAddSkill={handleAddSkill}
          handleRemoveSkill={handleRemoveSkill}
          input_class={input_class}
          label_class={label_class}
        />
        <FileUploadSection
          label_class={label_class}
          setResume={setResume}
          setPortfolio={setPortfolio}
          setCover_letter={setCover_letter}
        />
        <LabelTextArea
          id={"description"}
          text={"Description"}
          type={"text"}
          label_class_name={label_class}
          textarea_class_name={`min-h-30 ${input_class}`}
          onchange={handleInputChange}
          value={candidate_form.description}
        />
      </div>
      <div className="w-full flex items-center justify-center border-t border-lighter p-4">
        <Button
          onclick={handleSubmit}
          text={submitting ? "Validating..." : "Submit"}
          class_name="w-full py-1 rounded-small font-semibold text-[clamp(1.2em,1.2vw,1.4em)] text-text_white bg-g_btn"
        />
      </div>
    </motion.div>
  );
}

export default CompanyOverlay_SubmitCandidate;
