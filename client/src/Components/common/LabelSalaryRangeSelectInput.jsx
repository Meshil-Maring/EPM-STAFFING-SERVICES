import React, { useMemo } from "react";
import Label from "./Label";
import SelectSalaryRangeInput from "./SelectSalaryRangeInput";

function LabelSalaryRangeSelectInput({ text, placeholder }) {
  const salaryPlaceholder = useMemo(() => {
    return placeholder?.Salary_range || {};
  }, [placeholder]);

  return (
    <fieldset className="w-full flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between border-none p-0 m-0">
      <legend className="contents">
        <Label
          text={text}
          font_size="base"
          font_family="inter"
          color="primary"
          weight="semibold"
          class_name="whitespace-nowrap"
        />
      </legend>

      <div className="w-full sm:w-auto ml-auto flex justify-end min-h-[44px]">
        <SelectSalaryRangeInput placeholder={salaryPlaceholder} />
      </div>
    </fieldset>
  );
}

export default LabelSalaryRangeSelectInput;
