import React, { useState } from "react";
import Icon from "../../../common/Icon";
import Label from "../../../common/Label";

function Candidate_main_details({ candidate, icon }) {
  const [hovered, setHovered] = useState(false);
  const label = icon.label?.toLowerCase();
  const isClickable =
    label === "email" || label === "phone number" || label === "linkedin";
  return (
    <div
      onClick={(e) => (isClickable ? handleClicking : "")}
      onMouseEnter={() => (isClickable ? setHovered(true) : setHovered(false))}
      onMouseLeave={() => (isClickable ? setHovered(false) : setHovered(false))}
      className={`w-full items-start justify-start flex flex-row px-1 py-2 rounded-small border border-border1 ${isClickable ? "bg-lighter cursor-pointer transition-all duration-200 ease-in-out" : ""}`}
    >
      <Icon icon={icon.icon} class_name="w-6 h-6" />
      <div className="flex flex-col items-start justify-start w-full">
        <Label text={icon.label} class_name={"text-[clamp(0.8em,1vw,1em)]"} />
        <Label
          text={candidate[label]}
          class_name={`text-[clamp(0.6em,0.8vw,0.8em)] w-full truncate ${hovered ? "underline" : ""}`}
        />
      </div>
    </div>
  );
}

export default Candidate_main_details;
