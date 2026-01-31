import React from "react";
import Label from "../../../../common/Label";
import Icon from "../../../../common/Icon";

function Header({ heading, candidate_name, handleClosingModal }) {
  return (
    <div className="flex py-2 flex-col items-center justify-start w-full">
      <header className="flex border-b border-lighter w-full stick rounded-tl-small rounded-tr-small flex-row items-center justify-between bg-b_white px-4 pt-2 pb-1 mb-1">
        <Label
          text={heading}
          class_name={"text-[clamp(1em,2vw,1.2em)] font-bold"}
        />
        <span
          className="font-semibold cursor-pointer hover:text-red flex items-center justify-center"
          onClick={handleClosingModal}
        >
          <Icon
            icon={"ri-close-line"}
            class_name="font-lighter transition-all duration-200 ease-in-out w-6 h-6 flex items-center justify-center"
          />
        </span>
      </header>
      <div className="flex w-full px-4 flex-row items-center justify-start gap-1">
        <span>Candidate: </span>
        <Label
          text={candidate_name}
          class_name={"font-semibold text-[clamp(1em,2vwm,1.2em)]"}
        />
      </div>
    </div>
  );
}

export default Header;
