import React, { useContext } from "react";
import { selected_company_id_context } from "../../../../context/SelectedJobContext";
import { Company_context } from "../../../../context/AccountsContext";
import Icon from "../../../common/Icon";
import Label from "../../../common/Label";
import { Candidates_context } from "../../../../context/CandidatesContext";

function OverviewHeading() {
  const { selected_company_id } = useContext(selected_company_id_context);
  const { companyAccounts } = useContext(Company_context);
  const company = companyAccounts[selected_company_id];

  const { candidates } = useContext(Candidates_context);
  const potential_candidates = Object.values(candidates).filter(
    (candidate) => candidate["company id"] === selected_company_id,
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
