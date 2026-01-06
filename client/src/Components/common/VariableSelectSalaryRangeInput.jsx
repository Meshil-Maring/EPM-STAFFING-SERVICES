import React, { useState } from "react";
import YearMonthHourButton from "./YearMonthHourButton";
import { useJobForm } from "../../context/Job_Form_data_authContext";

function VariableSelectSalaryRangeInput({ placeholder }) {
  const from = placeholder.from_;
  const to = placeholder.to_;
  const min_id = "salary_min";
  const max_id = "salary_max";

  const { form_details, setform_details } = useJobForm();

  const handleMinChange = (e) => {
    const { min_id, value } = e.target;
    setform_details((prev) => ({
      ...prev,
      [min_id]: value,
    }));
  };
  const handleMaxChange = (e) => {
    const { max_id, value } = e.target.value;
    setform_details((prev) => ({
      ...prev,
      [max_id]: value,
    }));
  };

  return (
    <div className="flex flex-row flex-wrap items-center justify-start gap-2">
      <div className="gap-2 flex flex-row flex-wrap items-center justify-center">
        <input
          id={min_id}
          onChange={handleMinChange}
          type="text"
          placeholder={`Eg: ${from}`}
          className="border max-w-24 rounded-lg px-2 py-1 border-lighter focus:ring-1 focus:ring-lighter focus:outline-none"
        />{" "}
        <span type="text" className="text-lg text-center flex-1 text-lighter">
          to
        </span>{" "}
        <input
          onChange={handleMaxChange}
          id={max_id}
          type="text"
          placeholder={`Eg: ${to}`}
          className="border max-w-24 rounded-lg px-2 py-1 border-lighter focus:ring-1 focus:ring-lighter focus:outline-none"
        />
      </div>
      <YearMonthHourButton />
    </div>
  );
}

export default VariableSelectSalaryRangeInput;
