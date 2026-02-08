import React, { useState } from "react";
import Label from "../../../common/Label";
import Icon from "../../../common/Icon";
import Button from "../../../common/Button";

function CompanyCardBottomPart({ email, joined_date }) {
  const [showDetails, setShowDetails] = useState(false);
  const handleBtnClicking = (name) => {
    switch (name) {
      case "Manage":
        alert("Not yet implemented");
        break;
      default:
        alert("Not yet implemented");
        break;
    }
  };
  return (
    <div className="flex flex-col items-center justify-between gap-4 w-full pt-1">
      <div className="flex flex-row text-[13px] w-full gap-3 items-center justify-between text-text_b_l">
        <div className="flex flex-row flex-1 items-center justify-start gap-2 overflow-hidden min-w-0">
          <Icon
            icon="ri-mail-line"
            class_name="text-base shrink-0 opacity-70"
            aria-hidden="true"
          />
          <span className="truncate font-medium" title={email}>
            {email}
          </span>
        </div>

        <div className="flex flex-row items-center justify-end gap-2 shrink-0">
          <Icon
            icon="ri-calendar-line"
            class_name="text-base opacity-70"
            aria-hidden="true"
          />
          <Label text={joined_date} class_name="font-medium" />
        </div>
      </div>

      <div className="flex flex-row w-full gap-3 items-center justify-between">
        <button
          type="button"
          onClick={() => setShowDetails(!showDetails)}
          aria-expanded={showDetails}
          className="w-full h-9 cursor-pointer hover:bg-hover-light transition-all duration-200 flex flex-row gap-2 items-center justify-center border border-lighter rounded-small bg-white outline-none focus:ring-2 focus:ring-blue/20"
        >
          <Icon
            icon={showDetails ? "ri-eye-line" : "ri-eye-off-line"}
            class_name="text-base text-primary"
            aria-hidden="true"
          />
          <span className="text-xs font-bold text-primary">View Details</span>
        </button>

        <Button
          type="button"
          onclick={handleBtnClicking}
          class_name="w-full h-9 text-xs font-bold bg-Darkgold hover:bg-Darkgold-hover transition-all duration-200 text-white shadow-sm rounded-small outline-none focus:ring-2 focus:ring-Darkgold/40"
          text="Manage"
        />
      </div>
    </div>
  );
}

export default CompanyCardBottomPart;
