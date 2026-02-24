import React, { useContext, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "../../Dashboard/Candidate/Common/Header";
import LabelInput from "../../../common/LabelInput";
import { Jobs_context } from "../../../../context/JobsContext";
import { Company_context } from "../../../../context/AccountsContext";
import { Candidates_context } from "../../../../context/CandidatesContext";
import Button from "../../../common/Button";
import LabelTextArea from "../../../common/LabelTextArea";
import SkillsSection from "./SkillsSection";
import FileUploadSection from "./FileUploadSection";
import {
  computeAgeFromDOB,
  validateRequiredFields,
  CANDIDATE_FORM_INITIAL_STATE,
  FORM_ELEMENTS,
  getRequiredFieldIds,
} from "../../../../utils/candidateFormHelpers";
import Label from "../../../common/Label";
import ContractType_input from "../../../../utils/ContractType_input";

function CompanyOverlay_SubmitCandidate({ job, company, setClosing }) {
  const [error, setError] = useState({ type: "", text: "" });
  const [submitting, setSubmitting] = useState(false);
  const input_class =
    "py-2.2 bg-light/10 p-2 w-full focus:ring-1 ring-nevy_blue focus:outline-none border text-xs border-light/40 rounded-small";
  const label_class = "font-semibold text-sm";
  const { jobs } = useContext(Jobs_context);
  const { companyAccounts } = useContext(Company_context);
  const { addCandidate } = useContext(Candidates_context);
  const job_id = Object.keys(jobs).find((key) => jobs[key] === job);
  const company_id = Object.keys(companyAccounts).find(
    (key) => companyAccounts[key] === company,
  );

  const [skills, setSkills] = useState([""]);
  const [resume, setResume] = useState("");
  const [cover_letter, setCover_letter] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [candidate_form, setCandidate_form] = useState(
    CANDIDATE_FORM_INITIAL_STATE(job_id, company_id),
  );
  const requiredFieldIds = getRequiredFieldIds();

  const handleInputChange = (value, id) => {
    if (id === "date") {
      const age = computeAgeFromDOB(value);
      setCandidate_form((prev) => ({ ...prev, [id]: value, age }));
      return;
    }
    setCandidate_form((prev) => ({ ...prev, [id]: value }));
  };

  const handleSkillChange = (value, idOrIndex) => {
    if (typeof idOrIndex === "number") {
      setSkills((prev) => prev.map((s, i) => (i === idOrIndex ? value : s)));
    } else {
      setSkills((prev) => [...prev, value]);
    }
  };

  const handleAddSkill = () => {
    setSkills((prev) => [...prev, ""]);
  };

  const handleRemoveSkill = (index) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
  };

  const clearError = () =>
    setTimeout(() => {
      setError({ type: "", text: "" });
    }, 3000);

  const handleSubmit = (e) => {
    if (submitting) return;
    setSubmitting(true);
    if (e && e.preventDefault) e.preventDefault();
    try {
      const missing = validateRequiredFields(candidate_form, requiredFieldIds);
      if (missing.length > 0) {
        setError({
          type: "error",
          text: `Please fill required fields: ${missing.join(", ")}`,
        });
        const target = document.getElementById("error");
        if (target)
          target.scrollIntoView({ block: "start", behavior: "smooth" });
        clearError();
        return;
      }
      if (resume === "") {
        setError({ type: "error", text: "Resume required" });
        const target = document.getElementById("error");
        if (target)
          target.scrollIntoView({ block: "start", behavior: "smooth" });
        clearError();
        return;
      }
      if (skills.length === 0) {
        setError({ type: "error", text: "Atleast '1' skill required" });
        const target = document.getElementById("error");
        if (target)
          target.scrollIntoView({ block: "start", behavior: "smooth" });
        clearError();
        return;
      }

      const candidateToAdd = {
        ...candidate_form,
        skills,
        "job id": job_id,
        "company id": company_id,
        resume: resume ? resume : "",
        "cover letter": cover_letter ? cover_letter : "",
        portfolio: portfolio ? portfolio : "",
      };

      const newId = addCandidate(candidateToAdd);
      setError({ type: "success", text: "Candidate Submitted Successfully" });
      setTimeout(() => {
        setClosing(false);
      }, 3000);

      return newId;
    } catch (err) {
      console.error("Error submitting candidate:", err);
      setError({ type: "error", text: "An unexpected error occurred" });
      clearError();
    } finally {
      setSubmitting(false);
    }
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
        heading={company.name}
        candidate_name={job["job title"]}
        handleClosingModal={setClosing}
      />
      <div className="w-full relative flex flex-col items-center justify-start gap-6 p-4 overflow-y-auto no-scrollbar">
        <p id="error" className="absolute" />
        {error.text !== "" && (
          <div className="w-full flex p-4 items-center justify-center">
            <Label
              text={error.text}
              class_name={`w-full p-2 rounded-small text-[clamp(0.8em,2vw,1em)] text-sm font-lighter ${error.type === "error" ? "text-red-dark bg-red-light" : "text-text_green bg-green_light"}`}
            />
          </div>
        )}
        <LabelInput
          onchange={handleInputChange}
          id={"name"}
          text={"Name of the Candidate*"}
          label_class_name={label_class}
          input_class_name={input_class}
          type={"text"}
        />
        <div className="w-full grid grid-cols-2 items-center justify-center gap-4">
          {FORM_ELEMENTS.map((el, i) => {
            const isContract = el.id === "contract type";
            return isContract ? (
              <ContractType_input
                key={`element-${i}`}
                element={el}
                label_class={label_class}
                input_class={input_class}
                handleInputChange={handleInputChange}
              />
            ) : (
              <LabelInput
                key={`element-${i}`}
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
