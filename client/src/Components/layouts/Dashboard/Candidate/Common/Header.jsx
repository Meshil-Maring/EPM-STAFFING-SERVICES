import React from "react";
import Label from "../../../../common/Label";
import Icon from "../../../../common/Icon";

/**
 * Common Header component used across all side-drawers (Offer, Comment, etc.).
 * Provides a clear title, candidate context, and a primary close action.
 */
function Header({ heading, candidate_name, handleClosingModal }) {
  return (
    /* Sticky container ensures header stays visible while user scrolls through long forms */
    <div className="flex py-2 z-[1000] flex-col sticky top-0 bg-b_white items-center justify-start w-full">
      {/* Top section: Title and Close button */}
      <header className="flex w-full border-b border-light rounded-tl-small rounded-tr-small flex-row items-center justify-between px-4 pt-2 pb-1 mb-1">
        <Label
          text={heading}
          class_name="text-[clamp(1em,2vw,1.2em)] font-bold text-text_b"
        />

        {/* Close Icon: Features a hover color transition and scale effect */}
        <span
          className="font-semibold cursor-pointer text-secondary hover:text-red-dark transition-colors duration-200 flex items-center justify-center p-1 rounded-full hover:bg-red-light/10"
          onClick={handleClosingModal}
          title="Close"
        >
          <Icon
            icon="ri-close-line"
            class_name="transition-all duration-200 ease-in-out w-6 h-6 flex items-center justify-center"
          />
        </span>
      </header>

      {/* Sub-section: Contextual information about which candidate is being viewed */}
      <div className="flex w-full px-4 flex-row items-center justify-start gap-1 text-xs sm:text-sm text-text_l_b">
        <span className="opacity-70">Candidate:</span>
        <Label
          text={candidate_name}
          class_name="font-semibold text-[clamp(0.9em,1.5vw,1.1em)]"
        />
      </div>
    </div>
  );
}

export default Header;
