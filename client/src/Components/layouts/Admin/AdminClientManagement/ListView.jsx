import React, { useMemo } from "react";
import Label from "../../../common/Label";
import ListFirstPart from "./ListFirstPart";
import SecondPart from "./SecondPart";
import ButtonsPart from "./ButtonsPart";

function ListView({ company, handleFollowChange, companyId }) {
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
          email={company.email}
          joined_date={company["joined date"]}
        />
      </div>
    </div>
  );
}

export default ListView;
