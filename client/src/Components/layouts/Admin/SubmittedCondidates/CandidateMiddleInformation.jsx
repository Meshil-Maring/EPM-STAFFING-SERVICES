import React, { useState } from "react";
import Icon from "../../../common/Icon";
import Jobs from "../../../dummy_data_structures/Jobs.json";
import Accounts from "../../../dummy_data_structures/Accounts.json";
import NameInitials from "../../../common/NameInitials";
import Label from "../../../common/Label";
import Button from "../../../common/Button";
function CandidateMiddleInformation({ icons, candidate }) {
  const [viewDetails, setViewDetails] = useState(false);
  const handleViewDetails = () => {
    setViewDetails((prev) => !prev);
    alert("Not yet implemented");
  };

  // Safe access to job data with fallback values
  const jobData = Jobs[candidate["job id"]];
  const job_name = jobData ? jobData["job title"] : "Job not found";
  const company_name = Accounts[candidate["company id"]]
    ? Accounts[candidate["company id"]].name
    : "N/A";
  const contract_type = jobData
    ? jobData["contract type"]
    : "Contract type not available";
  return (
    <div className="w-full flex flex-row items-end gap-2 p-2 rounded-small border border-light">
      <div className="w-full flex flex-col items-start gap-2">
        <span className="text-xs text-text_l_b flex flex-row items-center gap-2 justify-start">
          <NameInitials name={job_name} class_name="w-8 h-8" bg="5629dc" />
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
      <div
        onClick={handleViewDetails}
        className="flex flex-row hover:bg-lighter cursor-pointer transition-all duration-200 ease-in-out items-center justify-center gap-1 border border-light px-1 rounded-small"
      >
        <Icon icon={"ri-eye-line"} class_name="" />
        <Label text={"View Details"} class_name="text-xs whitespace-nowrap" />
      </div>
    </div>
  );
}

export default CandidateMiddleInformation;
