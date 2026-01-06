import React from "react";
import Label from "./Label";
import VariableSelectSalaryRangeInput from "./VariableSelectSalaryRangeInput";

function LabelVariableSalaryRangeSelectInput({ text, placeholder }) {
  const placehold = placeholder.Salary_range;
  return (
    <div className="gap-1 flex flex-1 flex-col flex-wrap items-start justify-start">
      <Label
        text={text}
        font_size="base"
        font_family="inter"
        color="primary"
        weight="semibold"
      />
      <span className="">
        <VariableSelectSalaryRangeInput placeholder={placehold} />
      </span>
    </div>
  );
}

export default LabelVariableSalaryRangeSelectInput;
