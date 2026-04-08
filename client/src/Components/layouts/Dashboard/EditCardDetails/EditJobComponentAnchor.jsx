import React from "react";
import LabelInput from "../../../common/LabelInput";
import LabelTextArea from "../../../common/LabelTextArea";

function EditComponentAnchor({ card, handleInputChange }) {
  // input classes for consistent styling
  const input_class =
    "border border-light/60 focus:outline-none focus:ring-1 ring-nevy_blue w-full rounded-small p-2 placeholder-lighter";

  // label class for consistent styling
  const label_class = "font-semibold text-sm text-text";

  const get_Date = (date) => {
    if (!date) return "";
    // Handle ISO format (YYYY-MM-DDTHH:MM:SS...)
    if (typeof date === "string" && date.includes("T")) {
      return date.split("T")[0];
    }
    // Handle YYYY-MM-DD format (already correct)
    if (typeof date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return date;
    }
    // Handle MM/DD/YYYY format - convert to YYYY-MM-DD
    if (typeof date === "string") {
      const match = date.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
      if (match) {
        return `${match[3]}-${match[1]}-${match[2]}`;
      }
    }
    // For any other format, return empty string
    return "";
  };

  // Helper to get a safe number value for input fields
  const getNumberValue = (value) => {
    if (
      value === null ||
      value === undefined ||
      value === "" ||
      value === "N/A"
    ) {
      return "";
    }
    return value;
  };

  const jobTypeOptions = ["full-time", "part-time", "internship", "contract"];

  const jobPostingElements = [
    {
      id1: "location",
      label1: "Location",
      type1: "text",
      value1: card?.location || "",
      isSelect2: true,
      id2: "job_type",
      label2: "Contract Type",
      value2: card?.job_type || "",
    },
    {
      id1: "salary_min",
      label1: "Offer CTC Min (PA)",
      type1: "number",
      value1: getNumberValue(card?.salary_min),
      id2: "salary_max",
      label2: "Offer CTC Max (PA)",
      type2: "number",
      value2: getNumberValue(card?.salary_max),
    },
    {
      id1: "experience",
      label1: "Experience Required",
      type1: "text",
      value1: card?.experience_years || "",
      id2: "max_application",
      label2: "Max Applications",
      type2: "number",
      value2: getNumberValue(card?.max_application),
    },
    {
      id1: "deadline",
      label1: "Application Deadline",
      type1: "date",
      value1: get_Date(card?.deadline),
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
            value={
              el.value1 !== undefined && el.value1 !== null ? el.value1 : ""
            }
            onchange={handleInputChange}
            input_class_name={input_class}
            label_class_name={label_class}
          />

          {el.id2 &&
            (el.isSelect2 ? (
              <div className="w-full text-xs flex flex-col gap-1">
                <label htmlFor={el.id2} className={label_class}>
                  {el.label2}
                </label>
                <select
                  id={el.id2}
                  name={el.id2}
                  defaultValue={el.value2 || "N/A"}
                  onChange={handleInputChange}
                  className={input_class}
                >
                  <option value="" disabled>
                    -- Select type --
                  </option>
                  {jobTypeOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt.charAt(0).toUpperCase() + opt.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <LabelInput
                text={el.label2}
                id={el.id2}
                type={el.type2}
                value={el.value2 || ""}
                onchange={handleInputChange}
                input_class_name={input_class}
                label_class_name={label_class}
              />
            ))}
        </div>
      ))}

      <LabelTextArea
        id={"description"}
        text={"Job Description"}
        value={card?.job_description || ""}
        onchange={handleInputChange}
        placeholder={"Type the Job description here..."}
        label_class_name={label_class}
        textarea_class_name="w-full focus:outline-none focus:ring-1 ring-nevy_blue p-2 min-h-40 rounded-small border border-light/60"
      />
    </div>
  );
}

export default EditComponentAnchor;
