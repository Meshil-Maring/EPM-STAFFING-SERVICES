import React from "react";
import NameInitials from "../../../common/NameInitials";
import Label from "../../../common/Label";
import Button from "../../../common/Button";
import CandidateCardCommon from "./CandidateCardCommon";

function CandidateCard({ data, id }) {
  const commondata = [
    {
      label: data.skill,
      icon: "ri-briefcase-line",
      value: data.minSalary,
    },
    {
      label: "Package",
      icon: "ri-line-chart-line",
      value: data.maxSalary,
    },
    {
      label: "Joining Date",
      icon: "ri-calendar-line",
      value: data.joiningDate,
    },
    {
      label: "Released on",
      icon: "ri-time-line",
      value: data.releasedDate,
    },
  ];

  const handleViewOffer = () => alert(`${data.name} offer clicked`);
  const handleFollowup = () => alert(`${data.name} follow-up clicked!`);

  return (
    <div className="w-full flex flex-row items-start justify-center gap-6 p-6 rounded-xl border border-lighter bg-white hover:border-nevy_blue/30 hover:shadow-lg transition-all duration-300 group">
      {/* Avatar Section */}
      <div className="pt-1">
        <NameInitials name={data.name} id={id} />
      </div>

      <div className="flex-1 flex flex-col gap-5">
        {/* Header Section */}
        <div className="flex flex-row items-start justify-between w-full">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
              <Label
                text={data.name}
                class_name="text-lg font-bold text-text_b tracking-tight"
              />
              <Label
                text={data.status}
                class_name={`py-0.5 px-3 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  data.status === "Accepted"
                    ? "text-green-700 bg-green-50 border border-green-100"
                    : data.status === "Rejected"
                    ? "text-red-700 bg-red-50 border border-red-100"
                    : "text-amber-700 bg-amber-50 border border-amber-100"
                }`}
              />
            </div>
            <Label
              text={`Candidate ID: ${data.candidateId}`}
              class_name="text-xs font-medium text-text_l_b opacity-60"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-row items-center gap-3">
            <Button
              type="button"
              onclick={handleViewOffer}
              text="View Offer"
              class_name="border border-lighter py-2 px-5 rounded-lg hover:bg-gray-50 font-semibold text-xs text-text_b transition-all active:scale-95"
            />
            {data.status === "Pending" && (
              <Button
                type="button"
                text="Follow-Up"
                onclick={handleFollowup}
                class_name="bg-nevy_blue text-white py-2 px-5 rounded-lg hover:bg-opacity-90 font-semibold text-xs shadow-md shadow-nevy_blue/20 transition-all active:scale-95"
              />
            )}
          </div>
        </div>

        {/* Info Grid Section */}
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-lg bg-gray-50/50 border border-lighter/50">
          {commondata.map((item, index) => (
            <CandidateCardCommon key={index} data={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CandidateCard;
