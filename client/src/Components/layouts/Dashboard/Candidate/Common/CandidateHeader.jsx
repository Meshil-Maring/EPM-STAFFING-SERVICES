import React from "react";
import Label from "../../../../common/Label";
import SpanLabel from "../../../../common/SpanLabel";
/**
 * CandidateHeader displays the candidate's name and their current application status.
 * It features a color-coded status badge to provide immediate visual context.
 */
const CandidateHeader = ({ name, status }) => {
  /* Logic to determine the badge color scheme based on the candidate's current status */
  const isScheduled = status.toLowerCase() === "scheduled";

  return (
    <header className="flex flex-wrap items-center justify-start gap-4 w-full">
      {/* Candidate Name: Rendered as an H3 for semantic HTML structure */}
      <Label
        as="h3"
        text={name}
        class_name="text-base font-bold text-text_b tracking-tight"
      />

      {/* Status Badge: Uses conditional logic for dynamic color styling */}
      <SpanLabel
        text={status}
        class_name={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
          isScheduled
            ? "text-blue bg-blueBackground" // Blue theme for active/scheduled status
            : "text-red-dark bg-red-light" // Red theme for rejection or critical status
        }`}
      />
    </header>
  );
};

export default CandidateHeader;
