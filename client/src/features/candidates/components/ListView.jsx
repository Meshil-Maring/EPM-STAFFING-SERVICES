import React, { useState } from "react";
import Label from "../../../shared/components/ui/Label";
import ListFirstPart from "./ListFirstPart";
import SecondPart from "./SecondPart";
import ButtonsPart from "./ButtonsPart";
import CompanyManageOverlay from "./CompanyManageOverlay";
import CompanyViewOverlay from "./CompanyViewOverlay";

function ListView({ company, handleFollowChange, companyId }) {
  const [showDetails, setShowDetails] = useState(false);
  const [manage, setManage] = useState(false);

  // Calculate derived values from backend data
  const activeJobs = company.jobs?.length || 0;
  const hasFollowers = company.followers?.length > 0;

  // Format the join date
  const formatDate = (rawDate) => {
    if (!rawDate) return "N/A";
    const [date] = rawDate.split("T");
    return date || "N/A";
  };
  const joinedDate = formatDate(company.user_created_at);

  const handleBtnClicking = (name) => {
    if (name.toLocaleLowerCase() === "view detailnchs") {
      setShowDetails(true);
    } else if (name.toLocaleLowerCase() === "manage") {
      setManage(true);
    }
  };

  return (
    <div className="flex flex-row items-center justify-between transition-all duration-200">
      <div className="flex flex-row items-center justify-start gap-2 flex-1">
        <ListFirstPart
          field={company.industry_type}
          name={company.company_name}
          status={company.active}
          follow_status={hasFollowers ? "Following" : "Not Following"}
          companyId={companyId}
          handleFollowChange={handleFollowChange}
        />
      </div>

      <div className="flex flex-row items-center justify-between gap-2">
        <SecondPart active_jobs={activeJobs} pending_jobs={0} />

        <div className="flex font-semibold flex-col items-center justify-center shrink-0">
          <Label text={activeJobs} class_name="text-sm text-text_b" />
          <Label
            text="Openings"
            class_name="text-[10px] text-text_b_l opacity-60 uppercase tracking-wide"
          />
        </div>

        <ButtonsPart
          handleBtnClicking={handleBtnClicking}
          email={company.email}
          joined_date={joinedDate}
        />
      </div>
      {showDetails && (
        <CompanyViewOverlay company={company} setClosing={setShowDetails} />
      )}
      {manage && (
        <CompanyManageOverlay company={company} setClosing={setManage} />
      )}
    </div>
  );
}

export default ListView;
