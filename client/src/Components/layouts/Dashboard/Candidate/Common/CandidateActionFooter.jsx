import React from "react";
import Icon from "../../../../common/Icon";
import candidate_icons from "../../../../dummy_data_structures/candidate_icons.json";

/**
 * CandidateActionFooter renders the interactive bottom bar of a candidate card.
 * It dynamically generates action buttons (Schedule, Comment, Offer)
 * and a toggle for the detailed view.
 */
const CandidateActionFooter = ({ onAction, toggleDetails, activeView }) => (
  <footer
    /* Prevents clicking the footer from triggering the parent card's click event */
    onClick={(e) => e.stopPropagation()}
    className="flex flex-wrap items-center justify-start gap-3 w-fit pt-2 border-t border-lighter/50 mt-2"
  >
    {Object.keys(candidate_icons.buttons).map((key) => {
      const btn = candidate_icons.buttons[key];

      /* Map of category-specific Tailwind styles for distinct button branding */
      const styles = {
        schedule: "bg-blue text-white hover:bg-darkBlue",
        comment: "bg-blueBackground text-blue hover:bg-blue/10",
        offer: "bg-Darkgold text-white hover:bg-Darkgold-hover",
        default: "border border-lighter text-secondary hover:bg-lighter",
      };

      /* Check if this specific button's action is currently active in the UI */
      const isActive = activeView?.toLowerCase().includes(key);

      return (
        <button
          key={key}
          onClick={() => onAction(btn.btn_name)}
          /* Dynamically applies styles based on key; adds a ring if the action is active */
          className={`flex flex-row items-center text-xs font-bold px-4 py-1.5 cursor-pointer rounded-small transition-all duration-200 active:scale-95 
            ${styles[key] || styles.default} 
            ${isActive ? "ring-2 ring-offset-1 ring-blue-400" : ""}`}
        >
          <Icon icon={btn.icon} class_name="mr-2" />
          {btn.btn_name}
        </button>
      );
    })}

    {/* Detail View Toggle Button - Anchored to the right */}
    <button
      onClick={toggleDetails}
      title={activeView === "details" ? "Hide Details" : "Show Details"}
      className="ml-auto cursor-pointer p-2 text-xl text-secondary hover:text-primary transition-colors duration-200"
    >
      <i
        /* Switches icon based on whether the detail drawer is open */
        className={activeView === "details" ? "ri-eye-line" : "ri-eye-off-line"}
      />
    </button>
  </footer>
);

export default CandidateActionFooter;
