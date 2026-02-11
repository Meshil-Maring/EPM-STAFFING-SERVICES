import React, { useContext, useState } from "react";
import LabelInput from "../../../common/LabelInput";
import LabelTextArea from "../../../common/LabelTextArea";
import { Jobs_context } from "../../../../context/JobsContext";

function EditComponentAnchor({ card, Card_index, handleInputChange }) {
  const input_class =
    "border border-light focus:outline-none focus:ring-1 ring-nevy_blue w-full rounded-small py-1 px-2 placeholder-gray-400";
  const label_class = "font-semibold text-sm text-text";

  const jobPostingElements = [
    {
      id1: "location",
      label1: "Location",
      id2: "contract_type",
      label2: "Contract Type",
    },
    {
      id1: "salary_range",
      label1: "Salary Range",
      id2: "experience_required",
      label2: "Experience Required",
    },
    {
      id1: "max_applications",
      label1: "Max Applications",
      id2: "application_deadline",
      label2: "Application Deadline",
    },
  ];

  return (
    <div className="w-full flex flex-col items-center justify-start gap-4 ">
      {jobPostingElements.map((el, i) => (
        <div
          key={i}
          className="flex gap-4 flex-row items-start justify-between w-full"
        >
          <LabelInput
            text={el.label1}
            id={el.id1}
            default_value={card[el.id1] || ""}
            onchange={handleInputChange}
            input_class_name={input_class}
            label_class_name={label_class}
          />

          <LabelInput
            text={el.label2}
            id={el.id2}
            default_value={card[el.id2] || ""}
            onchange={handleInputChange}
            input_class_name={input_class}
            label_class_name={label_class}
          />
        </div>
      ))}

      <LabelTextArea
        id={"job_description"}
        text={"Job Description"}
        default_value={card.job_description}
        onchange={handleInputChange}
        placeholder={"Type the Job description here..."}
        label_class_name={label_class}
        textarea_class_name="w-full focus:outline-none focus:ring-1 ring-nevy_blue p-2 min-h-40 rounded-small border border-light"
      />
    </div>
  );
}

export default EditComponentAnchor;
