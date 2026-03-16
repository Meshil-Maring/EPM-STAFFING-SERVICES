import React from "react";
import LabelInput from "../../../common/LabelInput";
import LabelTextArea from "../../../common/LabelTextArea";

function EditComponentAnchor({ selected_job, handleInputChange }) {
  const input_class =
    "border border-light/60 focus:outline-none focus:ring-1 ring-nevy_blue w-full rounded-small py-1 px-2 placeholder-lighter";

  const label_class = "font-semibold text-sm text-text";

  const jobPostingElements = [
    {
      id1: "location",
      label1: "Location",
      type1: "text",

      id2: "contract_type",
      label2: "Contract Type",
      type2: "text",
    },

    {
      id1: "offer_ctc_min",
      label1: "Offer CTC Min (PA)",
      type1: "number",

      id2: "offer_ctc_max",
      label2: "Offer CTC Max (PA)",
      type2: "number",
    },

    {
      id1: "experience_required",
      label1: "Experience Required",
      type1: "text",

      id2: "max_applications",
      label2: "Max Applications",
      type2: "number",
    },

    {
      id1: "application_deadline",
      label1: "Application Deadline",
      type1: "date",

      id2: null,
    },
  ];

  return (
    <div className="w-full flex flex-col items-center justify-start gap-4">
      {jobPostingElements.map((el, i) => (
        <div
          key={i}
          className="flex gap-4 flex-row items-start justify-between w-full"
        >
          <LabelInput
            text={el.label1}
            id={el.id1}
            type={el.type1}
            default_value={selected_job[el.id1] || ""}
            onchange={handleInputChange}
            input_class_name={input_class}
            label_class_name={label_class}
          />

          {el.id2 && (
            <LabelInput
              text={el.label2}
              id={el.id2}
              type={el.type2}
              default_value={selected_job[el.id2] || ""}
              onchange={handleInputChange}
              input_class_name={input_class}
              label_class_name={label_class}
            />
          )}
        </div>
      ))}

      {/* Job Description */}

      <LabelTextArea
        id={"job_description"}
        text={"Job Description"}
        default_value={selected_job.job_description}
        onchange={handleInputChange}
        placeholder={"Type the Job description here..."}
        label_class_name={label_class}
        textarea_class_name="w-full focus:outline-none focus:ring-1 ring-nevy_blue p-2 min-h-40 rounded-small border border-light/60"
      />
    </div>
  );
}

export default EditComponentAnchor;
