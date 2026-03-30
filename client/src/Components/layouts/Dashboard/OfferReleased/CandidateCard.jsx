import React, { useContext, useMemo, useState } from "react";
import NameInitials from "../../../common/NameInitials";
import Label from "../../../common/Label";
import Button from "../../../common/Button";
import CandidateCardCommon from "./CandidateCardCommon";
import Candidates_Information from "../../../dummy_data_structures/Candidate_information.json";
import { formatValue } from "../../../common/formatText";
import { showWarning } from "../../../../utils/toastUtils";
import { Candidates_context } from "../../../../context/CandidatesContext";
import ViewProfile from "../../Admin/SubmittedCondidates/ViewProfile";

function CandidateCard({ candidate, id }) {
  const [viewOffer, setViewOffer] = useState(false);
  const cand_id = candidate
    ? Object.keys(Candidates_Information).find(
        (key) => Candidates_Information[key] === candidate,
      )
    : null;
  const isFollow = candidate?.follow_status;
  const { toggleFollowStatus } = useContext(Candidates_context);
  const getSalary = (salary) => {
    return formatValue(salary);
  };
  const commondata = [
    {
      label: candidate?.["applied position"] || "N/A",
      icon: "ri-briefcase-line",
      value: getSalary(candidate?.["current ctc"]) || "N/A",
    },
    {
      label: "Package",
      icon: "ri-line-chart-line",
      value: getSalary(candidate?.["expected ctc"]) || "N/A",
    },
    {
      label: "Joining Date",
      icon: "ri-calendar-line",
      value: candidate?.["joining date"] || "N/A",
    },
    {
      label: "Released on",
      icon: "ri-time-line",
      value: candidate?.["released date"] || "N/A",
    },
  ];

  // card button styles
  const follow_btn_style = `border border-lighter py-2 px-5 rounded-lg font-semibold text-xs text-text_b transition-all active:scale-95 bg-g_btn text-text_white`;
  const view_offer_btn_style =
    "border border-lighter py-2 px-5 rounded-lg hover:bg-gray-50 font-semibold text-xs text-text_b transition-all active:scale-95";
  const follow_up_btn_style =
    "bg-nevy_blue text-white py-2 px-5 rounded-lg hover:bg-opacity-90 font-semibold text-xs shadow-md shadow-nevy_blue/20 transition-all active:scale-95";

  // Card button: Follow / UnFollow handler
  const handleFollow = () => {
    return toggleFollowStatus(cand_id);
  };

  // Card button: Follow-up handler
  const handleFollowup = (name) =>
    showWarning(`${candidate.name} not implemented!`);

  // Card buttons: Follow, View Offer, and Follow-up
  const buttons = [
    {
      label: "Follow",
      class_name: follow_btn_style,
      type: "button",
      id: "follow",
    },
    {
      label: "View Offer",
      class_name: view_offer_btn_style,
      type: "button",
      id: "view_offer",
    },
    {
      label: "Follow-up",
      class_name: follow_up_btn_style,
      type: "button",
      id: "follow_up",
    },
  ];

  return (
    <>
      <div className="w-full flex flex-row items-start justify-center gap-6 p-6 rounded-small border border-light/60 bg-white hover:border-nevy_blue/40 hover:shadow-xl transition-all duration-300 group">
        {/* Avatar Section */}
        <div className="pt-1">
          <NameInitials name={candidate.name} id={id} />
        </div>

        <div className="flex-1 flex flex-col gap-5">
          {/* Header Section */}
          <div className="flex flex-row items-start justify-between w-full">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-3">
                <Label
                  text={candidate.name}
                  class_name="text-lg font-bold text-text_b tracking-tight"
                />
                <Label
                  text={candidate["offer status"]}
                  class_name={`py-0.5 px-3 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    candidate["offer status"] === "Accepted"
                      ? "text-green-700 bg-green-50 border border-green-100"
                      : candidate["offer status"] === "Rejected"
                        ? "text-red-700 bg-red-50 border border-red-100"
                        : "text-amber-700 bg-amber-50 border border-amber-100"
                  }`}
                />
              </div>
              <Label
                text={`Candidate ID: ${cand_id || "N/A"}`}
                class_name="text-xs font-medium text-text_l_b opacity-60"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-row items-center gap-3">
              {buttons.map((btn) => {
                const is_follow_btn = btn.id === "follow";
                const is_follow_up_btn = btn.id === "follow_up";
                return candidate["offer status"] === "Pending" &&
                  is_follow_up_btn ? (
                  <Button
                    key={btn.id}
                    type={btn.type}
                    text={btn.label}
                    onclick={handleFollowup}
                    class_name={btn.class_name}
                  />
                ) : (
                  <Button
                    key={btn.id}
                    text={
                      isFollow && btn.id === "follow" ? "Unfollow" : btn.label
                    }
                    onclick={() =>
                      is_follow_btn ? handleFollow : setViewOffer(true)
                    }
                    type={btn.type}
                    class_name={btn.class_name}
                  />
                );
              })}
            </div>
          </div>

          {/* Info Grid Section */}
          <div className="w-full flex flex-row gap-4">
            {commondata.map((item, index) => (
              <CandidateCardCommon key={index} data={item} />
            ))}
          </div>
        </div>
      </div>
      {viewOffer && <ViewProfile data={candidate} setClosing={setViewOffer} />}
    </>
  );
}

export default CandidateCard;
