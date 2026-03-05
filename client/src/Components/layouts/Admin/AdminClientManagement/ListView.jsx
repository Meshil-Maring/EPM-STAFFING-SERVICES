import React, { useState } from "react";
import Label from "../../../common/Label";
import ListFirstPart from "./ListFirstPart";
import SecondPart from "./SecondPart";
import ButtonsPart from "./ButtonsPart";
import CompanyManageOverlay from "./CompanyManageOverlay";
import CompanyViewOverlay from "./CompanyViewOverlay";

function ListView({ company, handleFollowChange, companyId }) {
  const [showDetails, setShowDetails] = useState(false);
  const [manage, setManage] = useState(false);
  const handleBtnClicking = (name) => {
    if (name.toLocaleLowerCase() === "view details") {
      setShowDetails(true);
    } else if (name.toLocaleLowerCase() === "manage") {
      setManage(true);
    }
  };
  return (
    <div className="flex flex-row items-center justify-between transition-all duration-200">
      <div className="flex flex-row items-center justify-start gap-2 flex-1">
        <ListFirstPart
          field={company.field}
          name={company.name}
          status={company.status}
          follow_status={company["follow status"]}
          companyId={companyId}
          handleFollowChange={handleFollowChange}
        />
      </div>

      <div className="flex flex-row items-center justify-between gap-2">
        <SecondPart
          active_jobs={company["active jobs"]}
          pending_jobs={company["pending jobs"]}
        />

        <div className="flex font-semibold flex-col items-center justify-center shrink-0">
          <Label text={company.positions} class_name="text-sm text-text_b" />
          <Label
            text="Openings"
            class_name="text-[10px] text-text_b_l opacity-60 uppercase tracking-wide"
          />
        </div>

        <ButtonsPart
          handleBtnClicking={handleBtnClicking}
          email={company.email}
          joined_date={company["joined date"]}
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
