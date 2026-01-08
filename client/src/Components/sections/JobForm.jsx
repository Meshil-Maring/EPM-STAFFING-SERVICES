import React, { useState, useContext } from "react";
import LabelInput from "../common/LabelInput";
import LabelTextArea from "../common/LabelTextArea";
import LabelVariableSalaryRangeSelectInput from "../common/LabelVariableSalaryRangeSelectInput";
import Button from "../common/Button";
import { useJobForm } from "../../context/Job_Form_data_authContext";

function JobForm() {
  const { form_details, setform_details } = useJobForm();
  const placeholders = {
    Position: "Full Stack Developer",
    Location: "Mumbai, India",
    Salary_range: { from_: "8", to_: "8" },
    Number_of_Positions: "4",
    Years_of_Experience: "5 years",
    Job_description:
      "Hiring a Full Stack Developer to handling bith frontend and backend tasks. You'll work on building reliable, responsive, and morden web applications",
  };

  const handleFormSubmission = (e) => {
    e.preventDefault();
    alert("form submitted");
  };

  return (
    <form
      onSubmit={handleFormSubmission}
      className="w-[90%] rounded-lg border border-whiter shadow-light p-6 gap-6 m-auto flex flex-col"
    >
      <div className="flex w-full flex-row gap-4 flex-wrap">
        <LabelInput
          onChange={setform_details}
          type="text"
          text="Position"
          placeholder={placeholders}
        />
        <LabelInput
          onChange={setform_details}
          type="text"
          text="Location"
          placeholder={placeholders}
        />
      </div>
      <div className="flex w-full flex-row gap-4 flex-wrap">
        <LabelInput
          onChange={setform_details}
          type="text"
          text="Number of Positions"
          placeholder={placeholders}
        />
        <LabelInput
          onChange={setform_details}
          type="text"
          text="Year(s) of Experience"
          placeholder={placeholders}
        />
      </div>
      <div className="flex w-full flex-row gap-4 flex-wrap">
        <LabelVariableSalaryRangeSelectInput
          onChange={setform_details}
          type="text"
          text="Salary range"
          placeholder={placeholders}
        />
        <LabelTextArea
          onChange={setform_details}
          type="text"
          text="Job description"
          placeholder={placeholders}
        />
      </div>
      <Button text="Post Job" bg={true} type="submit" />
    </form>
  );
}

export default JobForm;
