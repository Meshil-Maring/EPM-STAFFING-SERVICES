import React from "react";
import Label from "./Label";
import SelectSalaryRangeInput from "./SelectSalaryRangeInput";

function LabelSalaryRangeSelectInput({ text, placeholder }) {
  const placehold = Object.keys(placeholder).map((key) => {
    if (key === "Salary_range") {
      return placeholder[key];
    }
  });
  return (
    <div className="border gap-4 flex flex-row flex-wrap items-center justify-start">
      <Label
        text={text}
        font_size="base"
        font_family="inter"
        color="primary"
        weight="semibold"
      />
      <span className="ml-auto ">
        <SelectSalaryRangeInput placeholder={placehold} />
      </span>
    </div>
  );
}

export default LabelSalaryRangeSelectInput;
