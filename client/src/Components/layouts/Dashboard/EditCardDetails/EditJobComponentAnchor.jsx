import React, { useContext, useState } from "react";
import LabelInput from "../../../common/LabelInput";
import LabelTextArea from "../../../common/LabelTextArea";
import { getSalaryRange } from "../../Admin/common/GetSalaryRange";

function EditComponentAnchor({ selected_job, handleInputChange }) {
  const input_class =
    "border border-light/60 focus:outline-none focus:ring-1 ring-nevy_blue w-full rounded-small py-1 px-2 placeholder-lighter";
  const label_class = "font-semibold text-sm text-text";

  const jobPostingElements = [
    {
      id1: "location",
      label1: "Location",
      id2: "contract type",
      label2: "Contract Type",
    },
    {
      id1: "expected ctc",
      label1: "Expected CTC",
      id2: "experience required",
      label2: "Experience Required",
    },
    {
      id1: "max applications",
      label1: "Max Applications",
      id2: "application deadline",
      label2: "Application Deadline",
    },
  ];

  return (
    <div className="w-full flex flex-col items-center justify-start gap-4 ">
      {jobPostingElements.map((el, i) => {
        const isSalary = el.id1 === "expected ctc";
        const value = isSalary
          ? getSalaryRange(selected_job[el.id1])
          : selected_job[el.id1];

        return (
          <div
            key={i}
            className="flex gap-4 flex-row items-start justify-between w-full"
          >
            <LabelInput
              text={el.label1}
              id={el.id1}
              default_value={value || ""}
              onchange={handleInputChange}
              input_class_name={input_class}
              label_class_name={label_class}
            />

            <LabelInput
              text={el.label2}
              id={el.id2}
              default_value={selected_job[el.id2] || ""}
              onchange={handleInputChange}
              input_class_name={input_class}
              label_class_name={label_class}
            />
          </div>
        );
      })}

      <LabelTextArea
        id={"job description"}
        text={"Job Description"}
        default_value={selected_job["job description"]}
        onchange={handleInputChange}
        placeholder={"Type the Job description here..."}
        label_class_name={label_class}
        textarea_class_name="w-full focus:outline-none focus:ring-1 ring-nevy_blue p-2 min-h-40 rounded-small border border-light/60"
      />
    </div>
  );
}

export default EditComponentAnchor;
