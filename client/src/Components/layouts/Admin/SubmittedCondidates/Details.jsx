import React, { useContext } from "react";
import Label from "../../../common/Label";
import { Jobs_context } from "../../../../context/JobsContext";
import { getSalaryRange } from "../common/GetSalaryRange";

/**
 * Details component - Displays job or candidate details based on view mode
 * @param {Object} props - Component props
 * @param {Object} props.data - Job or candidate data
 * @param {boolean} props.isListed_jobs - Flag indicating if we're in listed_jobs view
 * @returns {JSX.Element} Rendered details component
 */
function Details({ data, isListed_jobs = false }) {
  // Get jobs context for accessing job data
  const { jobs } = useContext(Jobs_context) || {};

  // Get job data for candidate view
  const jobIds = Array.isArray(data["job id"]) ? data["job id"] : [];
  const jobData = jobIds.length > 0 ? jobs?.[jobIds[0]] : null;
  const salary = jobData?.["expected ctc"] || "N/A - N/A";

  // Define label elements based on view mode
  const label_elements = isListed_jobs
    ? [
        { label: "Experience", value: data?.["experience required"] || "N/A" },
        {
          label: "Salary Range",
          id: "salary_range",
          value: getSalaryRange(data["expected ctc"]) || "N/A",
        },
        { label: "Job Type", value: data?.["contract type"] || "N/A" },
      ]
    : [
        { label: "Experience", value: data?.["experience required"] || "N/A" },
        {
          label: "Expected",
          id: "salary_range",
          value: getSalaryRange(salary),
        },
        { label: "Submitted", value: data["date applied"] || "N/A" },
      ];

  return (
    <div className="w-full flex flex-row items-start justify-between gap-4">
      {label_elements.map((label, i) => {
        return (
          <div
            key={i}
            className={`w-full flex flex-col py-1 items-center justify-center bg-b_light_blue rounded-small ${label.id === "salary_range" ? "flex-2" : "flex-1"}`}
          >
            <Label
              text={label.label}
              class_name="text-xs font-lighter text-primary mt-1"
            />
            <Label text={label.value} class_name={"text-xs font-semibold"} />
          </div>
        );
      })}
    </div>
  );
}

export default Details;
