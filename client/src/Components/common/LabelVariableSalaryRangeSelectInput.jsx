import React from "react";
import Label from "./Label";
import VariableSelectSalaryRangeInput from "./VariableSelectSalaryRangeInput";

function LabelVariableSalaryRangeSelectInput({ text, placeholder }) {
  return (
    <fieldset className="flex flex-1 flex-col items-start justify-start gap-2 border-none p-0 m-0 w-full">
      <Label text={text} class_name="font-semibold text-sm text-text_b_l" />
      <div className="w-full flex items-center justify-start min-h-10">
        <VariableSelectSalaryRangeInput placeholder={placeholder} />
      </div>
    </fieldset>
  );
}

export default LabelVariableSalaryRangeSelectInput;
