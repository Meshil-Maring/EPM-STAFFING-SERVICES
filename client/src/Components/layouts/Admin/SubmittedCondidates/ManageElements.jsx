import React from "react";
import { getSalaryRange } from "../common/GetSalaryRange";
import Icon from "../../../common/Icon";
import { motion, AnimatePresence } from "framer-motion";
import Label from "../../../common/Label";
import ReqResBen from "./ReqResBen";

/**
 * ManageElements component - Displays detailed job information and requirements
 * @param {Object} props - Component props
 * @param {Object} props.company - Company data
 * @param {Object} props.currentJob - Current job data
 * @returns {JSX.Element} Rendered manage elements component
 */
function ManageElements({ company, currentJob }) {
  // Job information elements to display
  const elements = [
    {
      label: "Location",
      icon: "ri-map-pin-line",
      value: company?.address || "N/A",
    },
    {
      label: "Job Type",
      icon: "ri-suitcase-line",
      value: currentJob?.["contract type"] || "Not specified",
    },
    {
      label: "Current CTC",
      icon: "ri-wallet-line",
      value: currentJob
        ? getSalaryRange(currentJob["expected ctc"])
        : "Not specified",
    },
    {
      label: "Experience",
      icon: "ri-time-line",
      value: currentJob?.["experience required"] || "Not specified",
    },
    {
      label: "Applicants",
      icon: "ri-group-line",
      value: currentJob?.applicants || "Not specified",
    },
    {
      label: "Application Deadline",
      icon: "ri-calendar-line",
      value: currentJob?.["application deadline"] || "Not specified",
    },
  ];

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Job information grid */}
      <div className="w-full gap-4 grid grid-cols-2 items-start justify-start">
        {elements.map((el, i) => {
          return (
            <div
              key={`manage-${el.label}`}
              className="w-full border bg-gray-100 border-lighter rounded-small p-1 text-xs flex flex-row items-start justify-start gap-2"
            >
              <Icon icon={el.icon} />
              <div className="flex flex-col items-start justify-start">
                <Label text={el.label} class_name={""} />
                <Label text={el.value} class_name={""} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Job description section */}
      <div className="w-full flex flex-col bg-blue-50 p-2 rounded-small border border-lighter gap-1">
        <div className="w-full border-b border-lighter font-semibold flex flex-row items-center">
          <Icon icon={"ri-file-text-line"} class_name="" />
          <Label text={"Job Description"} class_name={""} />
        </div>
        <Label
          text={
            currentJob?.["currentJob description"] || "No description available"
          }
          class_name={""}
        />
      </div>

      {/* Requirements, responsibilities, and benefits section */}
      {((Array.isArray(currentJob?.requirements) &&
        currentJob.requirements.length > 0) ||
        (Array.isArray(currentJob?.responsibilities) &&
          currentJob.responsibilities.length > 0) ||
        (Array.isArray(currentJob?.benefits) &&
          currentJob.benefits.length > 0)) && (
        <ReqResBen currentJob={currentJob} />
      )}
    </div>
  );
}

export default ManageElements;
