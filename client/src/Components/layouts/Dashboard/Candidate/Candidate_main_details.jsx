import React, { useState } from "react";
import Icon from "../../../common/Icon";
import Label from "../../../common/Label";

/**
 * Candidate_main_details
 * * Renders individual contact/info tiles for the candidate (Email, Phone, LinkedIn, etc.).
 * It dynamically handles "Actionable" tiles vs "Display-only" tiles.
 */
function Candidate_main_details({ candidate, icon }) {
  const [hovered, setHovered] = useState(false);

  // Normalize label for object key lookup and logic checks
  const label = icon.label?.toLowerCase();

  // Define which fields should behave like interactive links
  const isClickable = ["email", "phone number", "linkedin"].includes(label);

  /**
   * Internal click handler to perform actions based on label type.
   * Contributor Note: Expand this switch case for new interactive fields.
   */
  const handleClicking = (e) => {
    e.stopPropagation();
    const value = candidate[label];
    if (!value) return;

    switch (label) {
      case "email":
        window.location.href = `mailto:${value}`;
        break;
      case "phone number":
        window.location.href = `tel:${value}`;
        break;
      case "linkedin":
        window.open(
          value.startsWith("http") ? value : `https://${value}`,
          "_blank",
        );
        break;
      default:
        break;
    }
  };

  return (
    <div
      onClick={isClickable ? handleClicking : undefined}
      onMouseEnter={() => isClickable && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      /* Dynamic styling: 
         Clickable tiles get a 'lighter' background and pointer cursor.
         'transition-all' ensures the hover/underline effect is smooth.
      */
      className={`w-full items-start justify-start flex flex-row gap-3 px-3 py-2 rounded-small border border-border1 transition-all duration-200 
        ${isClickable ? "bg-lighter cursor-pointer hover:shadow-sm" : "bg-white"}`}
    >
      {/* Icon representing the data type (from candidate_icons.json) */}
      <Icon icon={icon.icon} class_name="w-5 h-5 text-secondary" />

      <div className="flex flex-col items-start justify-start w-full overflow-hidden">
        {/* The Field Category (e.g., "Email") */}
        <Label
          text={icon.label}
          class_name="text-[clamp(0.8em,1vw,0.9em)] font-medium text-text_l_b opacity-70"
        />
        {/* The Actual Data (e.g., "john@doe.com") 
            'truncate' is vital here to prevent long emails from breaking the drawer width.
        */}
        <Label
          text={candidate[label] || "Not provided"}
          class_name={`text-[clamp(0.7em,0.8vw,0.85em)] w-full truncate font-semibold text-text_b 
            ${hovered ? "underline text-blue" : ""}`}
        />
      </div>
    </div>
  );
}

export default Candidate_main_details;
