import React, { useMemo, useState } from "react";
import Active_Pending_jobs from "./Active_Pending_jobs";
import CompanyCardTopPart from "./CompanyCardTopPart";
import CompanyCardBottomPart from "./CompanyCardBottomPart";
import CompanyViewOverlay from "./CompanyViewOverlay";
import CompanyManageOverlay from "./CompanyManageOverlay";

const CompanyCard = ({ companyId, refresh, company, handleFollowChange }) => {
  // Don't render if company data is invalid
  if (!company || !companyId || !handleFollowChange) {
    return null;
  }

  // extracting the view type from session storage: grid, list or apps
  const view = sessionStorage.getItem("view_type");

  // control view and manage overlays
  const [showView, setShowView] = useState(false);
  const [showManage, setShowManage] = useState(false);

  // handling button clicks to show respective overlays
  const handleBtnClick = (name) => {
    if (name === "Manage") return setShowManage(true);
    else setShowView(true);
  };

  // determining if the current view is grid for styling purposes
  const isGrid = view === "grid";

  // formatting the joined date
  const [date, time] = company?.user_created_at?.split("T") || [];

  return (
    <article
      className={`rounded-small bg-white shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center justify-between w-full h-full ${isGrid ? "p-3" : "p-5"}`}
    >
      {/* Top Part */}
      <CompanyCardTopPart
        isGrid={isGrid}
        companyId={companyId}
        company={company}
        handleFollowChange={handleFollowChange}
      />

      <div
        className={`flex flex-row w-full gap-4 items-center justify-between`}
        role="group"
        aria-label="Company Statistics"
      >
        {/* Number of active jobs */}
        <Active_Pending_jobs
          isGrid={isGrid}
          icon="ri-suitcase-line"
          label="Active Jobs"
          number_of_jobs={company?.jobs?.length || 0}
        />
        {/* Registration Number */}
        <Active_Pending_jobs
          isGrid={isGrid}
          icon="ri-id-card-line"
          label="CIN Number"
          number_of_jobs={company?.registration_number || "N/A"}
        />
      </div>

      <div className="w-full pt-4 border-t border-lighter/50">
        <CompanyCardBottomPart
          isGrid={isGrid}
          email={company?.email}
          joined_date={`${date || "N/A"} | ${time ? time.split(".")[0] : "N/A"}`}
          company_id={companyId}
          handleBtnClick={handleBtnClick}
        />
      </div>

      {showView && (
        <CompanyViewOverlay company={company} setClosing={setShowView} />
      )}
      {showManage && (
        <CompanyManageOverlay
          refresh={refresh}
          company={company}
          setClosing={setShowManage}
        />
      )}
    </article>
  );
};

export default CompanyCard;
