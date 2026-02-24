import React, { useContext } from "react";
import NameInitials from "../../../common/NameInitials";
import Label from "../../../common/Label";
import { Jobs_context } from "../../../../context/JobsContext";
import { Company_context } from "../../../../context/AccountsContext";
import Icon from "../../../common/Icon";
import { motion, AnimatePresence } from "framer-motion";
import { getSalaryRange } from "../common/GetSalaryRange";
import ManageOverlayHeader from "./ManageOverlay/ManageOverlayHeader";
import PersonalInfo from "./ManageOverlay/PersonalInfo";
import ContactInfo from "./ManageOverlay/ContactInfo";
import SubmissionDetails from "./ManageOverlay/SubmissionDetails";
import Compensation from "./ManageOverlay/Compensation";
import Skills from "./ManageOverlay/Skills";

function ViewProfile({ candidate, setClosing }) {
  if (!candidate) return null;
  const { jobs } = useContext(Jobs_context) || {};
  const { companyAccounts } = useContext(Company_context) || {};
  const company = companyAccounts?.[candidate["company id"]] || {};
  const job = jobs?.[candidate["job id"]] || {};
  const job_name = job["job title"] || "-";
  const exp = candidate.experience || "-";
  const cand_status = candidate["offer status"] || "-";
  const heading_class =
    "font-semibold mb-2 border-b border-lighter pb-2 w-full";

  const notes = "Awaiting client feed back on portfolio";
  const submission_details = [
    {
      label: "Client Company",
      val1: company.name || "-",
      val2: candidate["date applied"] || "-",
    },
    { label: "Current Stage", val: candidate["hiring stage"] || "-" },
    { label: "Job Type", val: job["contract type"] || "-" },
  ];
  const contact_info = [
    {
      label: "Email",
      icon: "ri-mail-line",
      value: candidate.email || "Not provided",
    },
    {
      label: "Linkedin",
      icon: "ri-linkedin-line",
      value: candidate.linkedin || "Not provided",
    },
    {
      label: "Phone",
      icon: "ri-phone-line",
      value: candidate["phone number"] || "Not provided",
    },
    {
      label: "Location",
      icon: "ri-map-pin-line",
      value: candidate.location || candidate.address || "Not provided",
    },
  ];
  const skills = Array.isArray(candidate.skills) ? candidate.skills : [];
  const personal_info = [
    {
      label: "Gender",
      icon: "ri-user-smile-line",
      value: candidate.gender || "N/A",
    },
    {
      label: "D.O.B",
      icon: "ri-calendar-line",
      value: candidate["date of birth"] || "N/A",
    },
    {
      label: "Notice Period",
      icon: "ri-calendar-line",
      value: candidate["notice period"] || "Not provided",
    },
    {
      label: "Resume",
      icon: "ri-file-pdf-2-fill",
      value: candidate.resume || "Not provided",
    },
    {
      label: "Cover Letter",
      icon: "ri-file-pdf-2-fill",
      value: candidate["cover letter"] || "Not provided",
    },
  ];
  return (
    <div
      onClick={() => setClosing(false)}
      className="w-full h-full absolute top-0 left-0 flex items-center justify-center bg-light_black z-20"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[40%] overflow-hidden h-[80%] rounded-small bg-b_white flex flex-col justify-start gap-4"
      >
        <ManageOverlayHeader
          candidate={candidate}
          job_name={job_name}
          exp={exp}
          cand_status={cand_status}
          setClosing={setClosing}
        />
        <div className="w-full p-4 gap-6 flex flex-col items-start justify-start text-sm overflow-y-auto no-scrollbar">
          <PersonalInfo
            personal_info={personal_info}
            heading_class={heading_class}
          />
          <ContactInfo
            contact_info={contact_info}
            heading_class={heading_class}
          />
          <SubmissionDetails
            submission_details={submission_details}
            company={company}
            heading_class={heading_class}
          />
          <Skills heading_class={heading_class} skills={skills} />
          <Compensation
            heading_class={heading_class}
            job={job}
            candidate={candidate}
          />
          <div className="w-full flex flex-col items-start justify-start gap-2">
            <Label text={"Notes"} class_name={heading_class} />
            <div className="p-2 rounded-small w-full bg-b_light_blue flex flex-row items-center justify-start">
              <Icon icon={"ri-file-text-line"} class_name="text-xl" />
              <Label text={notes} class_name={""} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewProfile;
