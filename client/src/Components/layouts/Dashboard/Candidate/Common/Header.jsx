import React from "react";
import Label from "../../../../common/Label";
import Icon from "../../../../common/Icon";

/**
 * Common Header component used across all side-drawers (Offer, Comment, etc.).
 * Provides a clear title, candidate context, and a primary close action.
 */
function Header({ heading, candidate_name, handleClosingModal }) {
  return (
    <header className="flex sticky top-0 z-200 w-full bg-g_btn text-text_white border-b rounded-tl-small rounded-tr-small flex-row items-center justify-between px-4 pt-2 pb-1 mb-1">
      <div className="w-full flex flex-col items-start justify-start">
        <Label
          text={heading}
          class_name="text-[clamp(1em,2vw,1.2em)] font-bold"
        />
        <div className="flex w-full flex-row items-center justify-start gap-1 text-xs sm:text-sm">
          <span className="opacity-70">Candidate:</span>
          <Label
            text={candidate_name}
            class_name="font-semibold text-[clamp(0.9em,1.5vw,1.1em)]"
          />
        </div>
        {/* Close Icon: Features a hover color transition and scale effect */}
      </div>
      <span
        className="font-semibold cursor-pointer hover:bg-b_white hover:text-red-dark transition-colors duration-200 flex items-center justify-center p-1 rounded-full"
        onClick={handleClosingModal}
        title="Close"
      >
        <Icon
          icon="ri-close-line"
          class_name="transition-all duration-200 ease-in-out w-6 h-6 flex items-center justify-center"
        />
      </span>
    </header>
  );
}

export default Header;
