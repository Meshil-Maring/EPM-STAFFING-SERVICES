import React, { useEffect, useMemo, useState } from "react";
import Active_Pending_jobs from "./Active_Pending_jobs";
import CompanyCardTopPart from "./CompanyCardTopPart";
import CompanyCardBottomPart from "./CompanyCardBottomPart";
import CompanyViewOverlay from "./CompanyViewOverlay";
import CompanyManageOverlay from "./CompanyManageOverlay";

/**
 * CompanyCard - Displays a company card with stats and action buttons
 * Shows company information including active jobs, CIN number, email, and join date.
 *
 * @param {Object} props - Component props
 * @param {string} props.companyId - Unique identifier for the company (user_id)
 * @param {Function} props.refresh - Function to refresh the parent component data
 * @param {Object} props.company - Company data object with all company details
 */
const CompanyCard = ({ companyId, refresh, company }) => {
  // Don't render if company data is invalid
  if (!company || !companyId) {
    return null;
  }
  // control view and manage overlays
  const [showView, setShowView] = useState(false);
  const [showManage, setShowManage] = useState(false);

  // handling button clicks to show respective overlays
  const handleBtnClick = (name) => {
    if (name === "Manage") return setShowManage(true);
    else setShowView(true);
  };

  // formatting the joined date
  const [date, time] = company?.user_created_at?.split("T") || [];

  return (
    <article
      className={`rounded-small bg-white shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center justify-between w-full h-full p-3`}
    >
      {/* Top Part */}
      <CompanyCardTopPart companyId={companyId} company={company} />
      <div
        className={`flex flex-row w-full gap-4 items-center justify-between`}
        role="group"
        aria-label="Company Statistics"
      >
        {/* Number of active jobs */}
        <Active_Pending_jobs
          icon="ri-suitcase-line"
          label="Active Jobs"
          number_of_jobs={company?.jobs?.length || 0}
        />

        {/* Registration Number */}
        <Active_Pending_jobs
          icon="ri-id-card-line"
          label="CIN Number"
          number_of_jobs={company?.registration_number || "N/A"}
        />
      </div>

      <div className="w-full pt-4 border-t border-lighter/50">
        <CompanyCardBottomPart
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
