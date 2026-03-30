import React from "react";
import LabelInput from "../../../common/LabelInput";
import LabelTextArea from "../../../common/LabelTextArea";
import CardFooter from "../../Admin/SubmittedCondidates/CardFooter";

function EditComponentAnchor({ card, handleInputChange }) {
  const input_class =
    "border border-light/60 focus:outline-none focus:ring-1 ring-nevy_blue w-full rounded-small p-2 placeholder-lighter";

  const label_class = "font-semibold text-sm text-text";

  // calculating the min and max values or the Expected CTC
  const getCTC = (min_or_max) => {
    const range = card?.["expected ctc"];
    if (!range) return "N/A";

    const parts = range.split("-");
    const min = parts[0]?.trim();
    const max = parts[1]?.trim();

    if (min_or_max === "min") return min || "N/A";
    return max || "N/A";
  };

  // getting the application deadline
  const get_Date = () => {
    const j_date = card?.["application deadline"];
    if (!j_date) return "N/A";
    const [day, month, year] = j_date.split("/");
    return `${year}-${month}-${day}`;
  };

  const jobPostingElements = [
    {
      id1: "location",
      label1: "Location",
      type1: "text",
      value1: card?.location,

      id2: "contract_type",
      label2: "Contract Type",
      type2: "text",
      value2: card?.["contract type"],
    },

    {
      id1: "expected ctc min",
      label1: "Offer CTC Min (PA)",
      type1: "number",
      value1: getCTC("min") || "N/A",

      id2: "expected ctc max",
      label2: "Offer CTC Max (PA)",
      type2: "number",
      value2: getCTC("max") || "N/A",
    },

    {
      id1: "experience required",
      label1: "Experience Required",
      type1: "text",
      value1: card?.["experience required"],

      id2: "max applications",
      label2: "Max Applications",
      type2: "number",
      value2: card?.["max applications"],
    },

    {
      id1: "application deadline",
      label1: "Application Deadline",
      type1: "date",
      value1: get_Date(),
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
            default_value={el.value1 || ""}
            onchange={handleInputChange}
            input_class_name={input_class}
            label_class_name={label_class}
          />

          {el.id2 && (
            <LabelInput
              text={el.label2}
              id={el.id2}
              type={el.type2}
              default_value={el.value2 || ""}
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
        default_value={card?.["job description"]}
        onchange={handleInputChange}
        placeholder={"Type the Job description here..."}
        label_class_name={label_class}
        textarea_class_name="w-full focus:outline-none focus:ring-1 ring-nevy_blue p-2 min-h-40 rounded-small border border-light/60"
      />
    </div>
  );
}

export default EditComponentAnchor;
