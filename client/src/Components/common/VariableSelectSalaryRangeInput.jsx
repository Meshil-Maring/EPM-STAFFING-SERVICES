import React from "react";
import YearMonthHourButton from "./YearMonthHourButton";
import { useJobForm } from "../../context/Job_Form_data_authContext";

function VariableSelectSalaryRangeInput({ placeholder }) {
  const { from_ = "15", to_ = "30" } = placeholder;
  const { form_details, setform_details } = useJobForm();

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    const numericValue = value.replace(/[^0-9]/g, "");

    setform_details((prev) => ({
      ...prev,
      [id]: numericValue,
    }));
  };

  return (
    <fieldset className="flex flex-row flex-wrap items-center justify-start gap-3 border-none p-0 m-0">
      <div className="flex flex-row items-center justify-start gap-2">
        <div className="flex flex-col">
          <input
            id="salary_min"
            value={form_details.salary_min || ""}
            onChange={handleInputChange}
            type="number"
            inputMode="numeric"
            placeholder={`Eg: ${from_}`}
            className="border w-24 rounded-small px-3 py-1.5 border-lighter focus:ring-2 focus:ring-blue/20 focus:outline-none text-sm font-medium transition-all"
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
          <input
            id="salary_max"
            value={form_details.salary_max || ""}
            onChange={handleInputChange}
            type="number"
            inputMode="numeric"
            placeholder={`Eg: ${to_}`}
            className="border w-24 rounded-small px-3 py-1.5 border-lighter focus:ring-2 focus:ring-blue/20 focus:outline-none text-sm font-medium transition-all"
          />
        </div>
      </div>

      <YearMonthHourButton />
    </fieldset>
  );
}

export default VariableSelectSalaryRangeInput;
