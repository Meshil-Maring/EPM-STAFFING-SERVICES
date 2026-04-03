import React, { useContext, useState } from "react";
import Label from "../../../common/Label";
import FollowLabel from "../common/FollowLabel";
import GridViewHeader from "./GridViewHeader";
import Image from "../../../common/Image";
import { getInitials } from "../../../../utils/getAvatar";

function CompanyCardTopPart({
  handleFollowChange,
  isGrid,
  companyId,
  company,
}) {
  const { company_info } = company || {};
  const isActive = company_info.status === "Active" || false;

  return !isGrid ? (
    <header
      className={`flex gap-2 flex-row w-full items-center justify-start border-b border-lighter/30 pb-3`}
    >
      <div
        className="h-12 w-12 text-white bg-d_blue rounded-small text-xl font-semibold flex items-center justify-center shrink-0 shadow-sm"
        aria-hidden="true"
      >
        <Image link={getInitials(company_info[0].company_name || "N/As")} />
      </div>

      <div className="flex flex-col items-start justify-center overflow-hidden flex-1">
        <Label
          text={company_info[0].company_name || "N/A"}
          class_name="text-[clamp(1.2em,1vw,1.4em)] font-semibold truncate w-full text-text_b leading-tight"
        />

        <div className="flex flex-row text-[10px] font-semibold items-center justify-start gap-2 mt-1 uppercase tracking-wide">
          <Label
            text={company_info[0].industry_type || "N/A"}
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
              text={isActive ? "Active" : "Inactive"}
              class_name={isActive ? "text-Darkgold" : "text-nevy_blue"}
            />
          </div>
          <div className="w-fit flex items-center justify-center cursor-pointer">
            <FollowLabel
              status={company_info[0].follow_status || "N/A"}
              class_name={"text-[clamp(1em,1vw,1.2em)]"}
              onToggle={() => handleFollowChange(companyId)}
            />
          </div>
        </div>
      </div>

      <div
        className="flex flex-col items-center ml-auto justify-center px-2 py-1 bg-hover-light/50 rounded-small shrink-0 border border-lighter/50"
        aria-label={`${company_info[0].open_positions || "N/A"} open positions`}
      >
        <Label
          as="span"
          text={company_info[0].open_positions || "N/A"}
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
      company={company}
      companyId={companyId}
      isActive={isActive}
      handleFollowChange={handleFollowChange}
    />
  );
}

export default CompanyCardTopPart;
