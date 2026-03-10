import React, { useContext, useState } from "react";
import Label from "../../../common/Label";
import FollowLabel from "../common/FollowLabel";
import GridViewHeader from "./GridViewHeader";

function CompanyCardTopPart({
  name_prefix,
  follow_status,
  handleFollowChange,
  companyId,
  field,
  status,
  positions,
  company_name,
  isGrid,
}) {
  const isActive = status === "Active";
  return !isGrid ? (
    <header
      className={`flex gap-2 flex-row w-full items-center justify-start border-b border-lighter/30 pb-3`}
    >
      <div
        className="h-12 w-12 text-white bg-d_blue rounded-small text-xl font-semibold flex items-center justify-center shrink-0 shadow-sm"
        aria-hidden="true"
      >
        <span>{name_prefix}</span>
      </div>

      <div className="flex flex-col items-start justify-center overflow-hidden flex-1">
        <Label
          text={company_name}
          class_name="text-[clamp(1.2em,1vw,1.4em)] font-semibold truncate w-full text-text_b leading-tight"
        />

        <div className="flex flex-row text-[10px] font-semibold items-center justify-start gap-2 mt-1 uppercase tracking-wide">
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
              class_name={"text-[clamp(1em,1vw,1.2em)]"}
            />
          </div>
        </div>
      </div>

      <div
        className="flex flex-col items-center ml-auto justify-center px-2 py-1 bg-hover-light/50 rounded-small shrink-0 border border-lighter/50"
        aria-label={`${positions} open positions`}
      >
        <Label
          as="span"
          text={positions}
          class_name="text-lg font-extrabold text-text_b"
        />
        <Label
          as="span"
          text="Openings"
          class_name="text-[10px] font-bold opacity-70"
        />
      </div>
    </header>
  ) : (
    <GridViewHeader
      company_name={company_name}
      companyId={companyId}
      field={field}
      isActive={isActive}
      status={status}
      handleFollowChange={handleFollowChange}
      follow_status={follow_status}
      positions={positions}
    />
  );
}

export default CompanyCardTopPart;
