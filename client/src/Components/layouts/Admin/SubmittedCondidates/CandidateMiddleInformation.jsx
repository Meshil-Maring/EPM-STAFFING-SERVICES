import React, { useState, useContext } from "react";
import Icon from "../../../common/Icon";
import { Jobs_context } from "../../../../context/JobsContext";
import { Company_context } from "../../../../context/AccountsContext";
import NameInitials from "../../../common/NameInitials";
import Label from "../../../common/Label";
import Button from "../../../common/Button";
import ViewDetailsOverlay from "./ViewDetailsOverlay";

function CandidateMiddleInformation({ icons, candidate }) {
  const [viewDetails, setViewDetails] = useState(false);
  const { jobs } = useContext(Jobs_context) || {};
  const { companyAccounts } = useContext(Company_context) || {};

  // Safe access to job data with fallback values
  const jobData = jobs?.[candidate["job id"]];
  const job_name = jobData ? jobData["job title"] : "Job not found";
  const company_name = companyAccounts?.[candidate["company id"]]
    ? companyAccounts[candidate["company id"]].name
    : "N/A";
  const contract_type = jobData
    ? jobData["contract type"]
    : "Contract type not available";
  return (
    <div className="w-full flex flex-row items-end gap-2 p-2 rounded-small border border-light">
      <div className="w-full flex flex-col items-start gap-2">
        <span className="text-xs text-text_l_b flex flex-row items-center gap-2 justify-start">
          <NameInitials
            name={company_name}
            class_name="w-8 h-8 text-text_white rounded-small flex items-center justify-center bg-[#5629dc]"
          />
          <div className="flex-1 flex flex-col items-start justify-start">
            <Label text={company_name} class_name={""} />
            <Label text={contract_type} class_name={""} />
          </div>
        </span>
        <span className="text-xs text-text_l_b flex flex-row items-center justifstart">
          <Icon icon={icons.suitcase} class_name={"text-nevy_blue"} />{" "}
          <Label text={job_name} class_name="ml-1" />
        </span>
      </div>

      <Button
        onclick={() => setViewDetails((prev) => !prev)}
        text={"View Details"}
        class_name="text-xs py-1 border border-light px-2 whitespace-nowrap hover:bg-lighter cursor-pointer transition-all duration-200 ease-in-out rounded-small"
      />
      {viewDetails && (
        <ViewDetailsOverlay candidate={candidate} setClosing={setViewDetails} />
      )}
    </div>
  );
}

export default CandidateMiddleInformation;
