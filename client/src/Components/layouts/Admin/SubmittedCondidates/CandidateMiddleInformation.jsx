import React, { useContext } from "react";
import Icon from "../../../common/Icon";
import NameInitials from "../../../common/NameInitials";
import Label from "../../../common/Label";
import { Company_context } from "../../../../context/AccountsContext";

/**
 * CandidateMiddleInformation component - Displays company information for listed_jobs view
 * and company/job information for candidates view with slideshow functionality
 * @param {Object} props - Component props
 * @param {Object} props.icons - Icon definitions for consistent styling
 * @param {Object} props.data - Main data object (job or candidate)
 * @param {Object} props.company - Company data for listed_jobs view
 * @param {Object} props.currentJob - Current job data for candidates view
 * @param {Object} props.relatedCompany - Related company data
 * @param {Function} props.handleViewDetails - Function to handle view details action
 * @returns {JSX.Element} Rendered middle information component
 */
function CandidateMiddleInformation({
  icons,
  currentJob,
  handleViewDetails,
  relatedCompany,
  isListed_jobs,
}) {
  const { company_accounts } = useContext(Company_context);
  // Safe access to company data with fallback values
  const companyName = isListed_jobs
    ? relatedCompany?.name
    : currentJob
      ? company_accounts?.[currentJob?.["company id"]]?.name ||
        "Company not found"
      : "No job assigned";

  return (
    <div className="w-full h-full flex flex-row items-end gap-2 p-2 rounded-large border border-light/80 shadow-sm">
      <div className="w-full flex flex-col items-start gap-2">
        <div className="text-xs text-text_l_b flex flex-row items-center gap-2 justify-start">
          {/* Display company name with initials */}
          <NameInitials
            name={companyName}
            class_name="w-10 h-10 text-text_white text-sm rounded-large flex items-center justify-center bg-[#5629dc]"
          />
          <div className="flex-1 flex flex-col items-start justify-start">
            {/* Display company name */}
            <Label text={companyName} class_name="font-medium" />
            {/* Display industry type for both views */}
            <Label text={"Client Company"} class_name="text-sm text-gray-600" />
          </div>
        </div>
        {/* Display company location - always show for better UX */}
        <span
          className={`text-sm text-text_l_b flex-row items-center justify-start ${isListed_jobs ? "hidden" : "flex"}`}
        >
          <Icon icon={icons.suitcase} class_name={"text-nevy_blue"} />{" "}
          <Label
            text={currentJob?.["job title"] || "No job assigned"}
            class_name="ml-1"
          />
        </span>
      </div>

      {/* View Details button for accessing more comprehensive company information */}
      <button
        onClick={() =>
          handleViewDetails(isListed_jobs ? relatedCompany : currentJob)
        }
        className="text-sm border border-light/80 px-3 py-2 whitespace-nowrap hover:bg-lighter cursor-pointer transition-all duration-200 ease-in-out rounded-large ml-auto font-semibold"
      >
        View Details
      </button>
    </div>
  );
}

export default CandidateMiddleInformation;
