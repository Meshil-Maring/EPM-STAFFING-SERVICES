import React from "react";
import Icon from "../../../../common/Icon";
import Label from "../../../../common/Label";
import candidate_icons from "../../../../dummy_data_structures/candidate_icons.json";
/**
 * CandidateInfoGrid displays a responsive grid of metadata for a candidate.
 * It maps through a configuration file to dynamically render icons, labels,
 * and values based on the candidate object keys.
 */
const CandidateInfoGrid = ({ candidate }) => (
  /* Responsive grid: 1 column on mobile, 2 on small screens, 3 on large screens */
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
    {candidate_icons.more_info.map((info, index) => {
      /* Dynamically access the candidate property using the label from JSON */
      const value = candidate[info.label.toLowerCase()];

      return (
        <div
          key={index}
          /* Card styling with a subtle background and hover transition */
          className="p-3 gap-1 bg-hover-light/30 border border-lighter rounded-small flex flex-col items-start justify-center transition-colors hover:bg-hover-light"
        >
          {/* Header section of the small info card containing the Icon and Title */}
          <div className="flex flex-row items-center text-blue gap-2">
            <Icon icon={info.icon} class_name="text-sm" />
            <Label
              as="span"
              text={info.label}
              class_name="text-[10px] font-bold uppercase opacity-70"
            />
          </div>

          {/* The actual data value retrieved from the candidate object */}
          <Label
            text={value || "N/A"}
            class_name="text-sm font-semibold text-text_b"
          />
        </div>
      );
    })}
  </div>
);

export default CandidateInfoGrid;
