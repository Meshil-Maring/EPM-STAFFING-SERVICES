import React, { useContext } from "react";
import { Company_context } from "../../../shared/context/AccountsContext";
import Icon from "../../../shared/components/ui/Icon";
import Label from "../ui/Label";
import { Candidates_context } from "../../../shared/context/CandidatesContext";
import { Jobs_context } from "../../../shared/context/JobsContext";

function OverviewHeading() {
  const { companyAccounts } = useContext(Company_context);
  const { jobs } = useContext(Jobs_context);
  const { candidates } = useContext(Candidates_context);

  // Defensive checks: ensure job_id exists
  const selected_job_id = sessionStorage.getItem("selected_job_id");
  if (!selected_job_id || !jobs[selected_job_id]) {
    return (
      <div className="w-full flex border-b border-lighter flex-row items-center p-4 justify-between text-[clamp(1em,1.2vw,1.2em)] font-semibold">
        <Label
          text={"Loading..."}
          class_name={"text-[clamp(1.2em,2vw,1.4em)]"}
        />
      </div>
    );
  }

  const comp_id = jobs?.[selected_job_id]?.["company id"];
  const company = companyAccounts > [comp_id];

  if (!company) {
    return (
      <div className="w-full flex border-b border-lighter flex-row items-center p-4 justify-between text-[clamp(1em,1.2vw,1.2em)] font-semibold">
        <Label
          text={"Company data unavailable"}
          class_name={"text-[clamp(1.2em,2vw,1.4em)]"}
        />
      </div>
    );
  }

  const potential_candidates = Object.values(candidates).filter(
    (candidate) =>
      Array.isArray(candidate["job id"]) &&
      candidate["job id"].includes(selected_job_id),
  );

  const total_candidates = potential_candidates.length;

  return (
    <div className="w-full flex border-b border-lighter flex-row items-center p-4 justify-between text-[clamp(1em,1.2vw,1.2em)] font-semibold">
      <div className="flex flex-col items-start justify-start">
        <Label
          text={`${company.name} - Candidate Pipeline`}
          class_name={"text-[clamp(1.2em,2vw,1.4em)]"}
        />
        <Label
          text={"Manage candidates for this company"}
          class_name="text-[clamp(0.7em,1vw,0.9em)] uppercase tracking-tighter text-text_b_l opacity-70 tracking-wide"
        />
      </div>
      <div className="ml-auto py-1 rounded-small shadow-sm bg-nevy_blue/10 px-2 flex items-center justify-center flex-row">
        <Icon icon={"ri-group-line"} class_name="font-semibold" />
        <Label text={`${total_candidates} Total`} class_name={""} />
      </div>
    </div>
  );
}

export default OverviewHeading;
