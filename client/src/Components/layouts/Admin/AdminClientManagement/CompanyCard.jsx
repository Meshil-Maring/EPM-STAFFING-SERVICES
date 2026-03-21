import React, { useMemo, useState } from "react";
import Active_Pending_jobs from "./Active_Pending_jobs";
import CompanyCardTopPart from "./CompanyCardTopPart";
import CompanyCardBottomPart from "./CompanyCardBottomPart";
import CompanyViewOverlay from "./CompanyViewOverlay";
import CompanyManageOverlay from "./CompanyManageOverlay";

const CompanyCard = ({ companyId, company, handleFollowChange }) => {
  // Don't render if company data is invalid
  if (
    !company ||
    !company.name ||
    !company.name.trim() ||
    typeof company["follow status"] !== "boolean"
  ) {
    return null;
  }

  const view = sessionStorage.getItem("view_type");
  const name_prefix = useMemo(() => {
    if (!company?.name) return "";
    const splitted_name = company.name.trim().split(/\s+/);
    const letter1 = splitted_name[0] ? splitted_name[0].charAt(0) : "";
    const letter2 = splitted_name[1] ? splitted_name[1].charAt(0) : "";
    return (letter1 + letter2).toUpperCase();
  }, [company?.name]);
  const [showView, setShowView] = useState(false);
  const [showManage, setShowManage] = useState(false);

  const handleBtnClick = (name) => {
    if (name === "Manage") return setShowManage(true);
    else setShowView(true);
  };

  const isGrid = view === "grid";

  return (
    <article
      className={`rounded-small bg-white shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center justify-between w-full h-full ${isGrid ? "p-3" : "p-5"}`}
    >
      <CompanyCardTopPart
        isGrid={isGrid}
        companyId={companyId}
        handleFollowChange={handleFollowChange}
        follow_status={company["follow status"]}
        name_prefix={name_prefix}
        field={company.field}
        status={company.status}
        positions={company.positions}
        company_name={company.name}
      />

      <div
        className={`flex flex-row w-full gap-4 items-center justify-between`}
        role="group"
        aria-label="Job Statistics"
      >
        <Active_Pending_jobs
          isGrid={isGrid}
          icon="ri-suitcase-line"
          label="Active Jobs"
          number_of_jobs={company["active jobs"]}
        />
        <Active_Pending_jobs
          isGrid={isGrid}
          icon="ri-time-line"
          label="Pending Jobs"
          number_of_jobs={company["pending jobs"]}
        />
      </div>

      <div className="w-full pt-4 border-t border-lighter/50">
        <CompanyCardBottomPart
          isGrid={isGrid}
          email={company.email}
          joined_date={company["joined date"]}
          company_id={companyId}
          handleBtnClick={handleBtnClick}
        />
      </div>

      {showView && (
        <CompanyViewOverlay company={company} setClosing={setShowView} />
      )}
      {showManage && (
        <CompanyManageOverlay company={company} setClosing={setShowManage} />
      )}
    </article>
  );
};

export default CompanyCard;
