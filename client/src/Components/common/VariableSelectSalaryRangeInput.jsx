import React, { useContext } from "react";
import YearMonthHourButton from "./YearMonthHourButton";
import { Job_Form_Data_Context } from "../../context/Job_Form_data_authContext";
import Input from "./Input";

function VariableSelectSalaryRangeInput({ placeholder }) {
  const { from_ = "15", to_ = "30" } = placeholder;
  const { form_details, setform_details } = useContext(Job_Form_Data_Context);

  const handleInputChange = (e, id) => {
    const { value } = e.target;
    setform_details((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  return (
    <fieldset className="flex flex-row items-center justify-start gap-1 border-none p-0 m-0">
      <div className="flex flex-row items-center justify-start gap-2">
        <div className="flex flex-col">
          <Input
            id="salary min"
            value={form_details.salary_min || ""}
            onChange={handleInputChange}
            type="number"
            inputMode="numeric"
            placeholder={`Eg: ${from_}`}
            class_name="border w-24 rounded-small px-3 py-1.5 border-lighter focus:ring-2 focus:ring-blue/20 focus:outline-none text-sm font-medium transition-all"
          />
        </div>

        <span
          className="text-sm font-semibold text-text_b_l opacity-60 px-1"
          aria-hidden="true"
        >
          to
        </span>

        <div className="flex flex-col">
          <label htmlFor="salary_max" className="sr-only">
            Maximum Salary
          </label>
          <Input
            id="salary max"
            value={form_details.salary_max || ""}
            onChange={handleInputChange}
            type="number"
            inputMode="numeric"
            placeholder={`Eg: ${to_}`}
            class_name="border w-24 rounded-small px-3 py-1.5 border-lighter focus:ring-2 focus:ring-blue/20 focus:outline-none text-sm font-medium transition-all"
          />
        </div>
      </div>

      <YearMonthHourButton />
    </fieldset>
  );
}

export default VariableSelectSalaryRangeInput;
