import React from "react";
import Active_Pending_jobs from "./Active_Pending_jobs";
import CompanyCardTopPart from "./CompanyCardTopPart";
import CompanyCardBottomPart from "./CompanyCardBottomPart";
const CompanyCard = ({ company }) => {
  const splitted_name = company.name.split(" ");
  const letter1 = splitted_name[0] ? splitted_name[0].slice(0, 1) : "";
  const letter2 = splitted_name[1] ? splitted_name[1].slice(0, 1) : "";
  const name_prefix = (letter1 + letter2).toUpperCase();

  return (
    <div className="p-4 rounded-small border border-lighter shadow-md flex flex-col items-center justify-between gap-4">
      <CompanyCardTopPart
        name_prefix={name_prefix}
        field={company.field}
        status={company.status}
        positions={company.positions}
        company_name={company.name}
      />

      <div className="flex flex-row w-full gap-4 items-center justify-between">
        <Active_Pending_jobs
          icon="ri-suitcase-line"
          label="Active Jobs"
          number_of_jobs={company.active_jobs}
        />
        <Active_Pending_jobs
          icon="ri-time-line"
          label="Pending Jobs"
          number_of_jobs={company.pending_jobs}
        />
      </div>

      <CompanyCardBottomPart
        email={company.email}
        joined_date={company.joined_date}
      />
    </div>
  );
};

export default CompanyCard;
