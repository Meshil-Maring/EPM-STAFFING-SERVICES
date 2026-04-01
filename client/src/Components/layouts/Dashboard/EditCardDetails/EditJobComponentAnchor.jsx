import React from "react";
import LabelInput from "../../../common/LabelInput";
import LabelTextArea from "../../../common/LabelTextArea";

function EditComponentAnchor({ card, handleInputChange }) {
  const input_class =
    "border border-light/60 focus:outline-none focus:ring-1 ring-nevy_blue w-full rounded-small p-2 placeholder-lighter";

  const label_class = "font-semibold text-sm text-text";

  const getCTC = (min_or_max) => {
    const range = card?.salary;
    if (!range) return "";
    const parts = range.split("-");
    const min = parts[0]?.trim();
    const max = parts[1]?.trim();
    return min_or_max === "min" ? min || "" : max || "";
  };

  const get_Date = () => {
    const raw = card?.deadline;
    if (!raw) return "";
    const parsed = new Date(raw);
    if (isNaN(parsed)) return "";
    return parsed.toISOString().split("T")[0];
  };

  const jobTypeOptions = ["full-time", "part-time", "internship", "contract"];

  const jobPostingElements = [
    {
      id1: "location",
      label1: "Location",
      type1: "text",
      value1: card?.location,
      isSelect2: true,
      id2: "job_type",
      label2: "Contract Type",
      value2: card?.job_type,
    },
    {
      id1: "salary_min",
      label1: "Offer CTC Min (PA)",
      type1: "number",
      value1: getCTC("min"),
      id2: "salary_max",
      label2: "Offer CTC Max (PA)",
      type2: "number",
      value2: getCTC("max"),
    },
    {
      id1: "experience",
      label1: "Experience Required",
      type1: "text",
      value1: card?.experience,
      id2: "max applications",
      label2: "Max Applications",
      type2: "number",
      value2: card?.["max applications"],
    },
    {
      id1: "deadline",
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

          {el.id2 &&
            (el.isSelect2 ? (
              <div className="w-full flex flex-col gap-1">
                <label htmlFor={el.id2} className={label_class}>
                  {el.label2}
                </label>
                <select
                  id={el.id2}
                  name={el.id2}
                  defaultValue={el.value2 || ""}
                  onChange={handleInputChange}
                  className={input_class}
                >
                  <option value="" disabled>
                    Select type
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
                default_value={el.value2 || ""}
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
        default_value={card?.description || ""}
        onchange={handleInputChange}
        placeholder={"Type the Job description here..."}
        label_class_name={label_class}
        textarea_class_name="w-full focus:outline-none focus:ring-1 ring-nevy_blue p-2 min-h-40 rounded-small border border-light/60"
      />
    </div>
  );
}

export default EditComponentAnchor;
