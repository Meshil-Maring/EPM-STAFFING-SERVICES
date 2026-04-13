import React, { useContext, useState } from "react";
import Label from "../../../common/Label";
import FollowLabel from "../common/FollowLabel";
import GridViewHeader from "./GridViewHeader";
import Image from "../../../common/Image";
import { getInitials } from "../../../../utils/getAvatar";
import { AuthContext } from "../../../../context/AuthContext";

function CompanyCardTopPart({
  handleFollowChange,
  isGrid,
  companyId,
  company,
}) {
  // user data
  const { user } = useContext(AuthContext);
  const isActive = company.active;
  // Calculate total open positions from all jobs
  const totalOpenings = company.jobs?.length || 0;

  // check if admin follows a client
  const getFollowStatus = (companyId, admin_id) => {
    const following_user = (company?.following || []).find((item) => {
      return item?.followeing_id === companyId;
    });
    if (!following_user) return false;

    return true;
  };

  // check if the company is on the follow list
  const isFollow = getFollowStatus(companyId, user?.id);

  // toggle follow status : passing the companyId and and the follow status
  const toggle_follow = (status) => {
    handleFollowChange(companyId, user?.id, status);
  };

  return !isGrid ? (
    <header
      className={`flex gap-2 flex-row w-full items-center justify-start border-b border-lighter/30 pb-3`}
    >
      <div
        className="h-12 w-12 text-white bg-d_blue rounded-large text-sm font-semibold flex items-center justify-center shrink-0 shadow-sm"
        aria-hidden="true"
      >
        <Image
          link={getInitials(company?.company_name || "N/A")}
          class_name={"w-[80%] h-[80%]"}
        />
      </div>

      <div className="flex flex-col items-start justify-center overflow-hidden flex-1">
        <Label
          text={company?.company_name || "N/A"}
          class_name="text-[clamp(1.2em,1vw,1.4em)] font-semibold truncate w-full text-text_b leading-tight"
        />

        <div className="flex flex-row text-[10px] font-semibold items-center justify-start gap-2 mt-1 uppercase tracking-wide">
          <Label
            text={company?.industry_type || "N/A"}
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
              status={isFollow}
              class_name={"text-[clamp(1em,1vw,1.2em)]"}
              onToggle={toggle_follow}
            />
          </div>
        </div>
      </div>

      <div
        className="flex flex-col items-center ml-auto justify-center px-2 py-1 bg-hover-light/50 rounded-large shrink-0 border border-lighter/50"
        aria-label={`${totalOpenings} open positions`}
      >
        <Label
          as="span"
          text={totalOpenings}
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
      hasFollowers={isFollow}
      totalOpenings={totalOpenings}
      handleFollowChange={handleFollowChange}
    />
  );
}

export default CompanyCardTopPart;
