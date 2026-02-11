import React from "react";
import Label from "../../../common/Label";
import FollowLabel from "../common/FollowLabel";
import NameInitials from "../../../common/NameInitials";

function GridViewHeader({
  company_name,
  companyId,
  field,
  isActive,
  status,
  follow_status,
  positions,
  handleFollowChange,
}) {
  return (
    <header
      className={`flex gap-2 relative flex-row w-full items-center justify-start border-b border-lighter/30 pb-3`}
    >
      <NameInitials name={company_name} bg="5629dc" class_name="w-10 h-10" />

      <div className="flex flex-col items-start justify-center overflow-hidden flex-1">
        <Label
          text={company_name}
          class_name="text-md font-semibold truncate w-[70%] text-text_b leading-tight"
        />

        <div className="flex flex-row text-[8px] font-semibold items-center justify-start gap-2 mt-1 uppercase tracking-wide">
          <Label
            text={field}
            class_name="px-2 py-0.5 rounded-small bg-lighter text-text_b_l border border-lighter"
          />
          <div className="flex items-center gap-1.5 ml-1">
            <span
              className={`w-2 h-2 rounded-full ${
                isActive ? "bg-Darkgold" : "bg-nevy_blue"
              }`}
              aria-hidden="true"
            />
            <Label
              text={status}
              class_name={isActive ? "text-Darkgold" : "text-nevy_blue"}
            />
          </div>
          <div
            onClick={() => handleFollowChange(companyId)}
            className="w-fit flex items-center justify-center"
          >
            <FollowLabel
              status={follow_status}
              class_name={"text-[clamp(1em,1vw,1.2em)] py-0.5"}
            />
          </div>
        </div>
      </div>

      <div
        className="flex absolute -top-1 right-0 flex-row-reverse items-center ml-auto justify-center"
        aria-label={`${positions} open positions`}
      >
        <Label
          as="span"
          text={positions}
          class_name="text-lg font-bold text-text_b"
        />
        <Label
          as="span"
          text="Openings"
          class_name="text-[10px] font- opacity-70"
        />
      </div>
    </header>
  );
}

export default GridViewHeader;
