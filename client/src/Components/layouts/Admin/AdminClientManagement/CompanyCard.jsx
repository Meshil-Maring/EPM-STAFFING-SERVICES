import React, { useMemo } from "react";
import Active_Pending_jobs from "./Active_Pending_jobs";
import CompanyCardTopPart from "./CompanyCardTopPart";
import CompanyCardBottomPart from "./CompanyCardBottomPart";

const CompanyCard = ({ company }) => {
  const name_prefix = useMemo(() => {
    const splitted_name = company.name.trim().split(/\s+/);
    const letter1 = splitted_name[0] ? splitted_name[0].charAt(0) : "";
    const letter2 = splitted_name[1] ? splitted_name[1].charAt(0) : "";
    return (letter1 + letter2).toUpperCase();
  }, [company.name]);

  return (
    <article className="p-5 rounded-small border border-lighter bg-white shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center justify-between gap-6 w-full">
      <CompanyCardTopPart
        name_prefix={name_prefix}
        field={company.field}
        status={company.status}
        positions={company.positions}
        company_name={company.name}
      />

      <div
        className="flex flex-row w-full gap-4 items-center justify-between"
        role="group"
        aria-label="Job Statistics"
      >
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

      <div className="w-full pt-4 border-t border-lighter/50">
        <CompanyCardBottomPart
          email={company.email}
          joined_date={company.joined_date}
        />
      </div>
    </article>
  );
};

export default CompanyCard;
