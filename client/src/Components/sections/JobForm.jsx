import React, { useContext } from "react";
import { Job_Form_Data_Context } from "../../context/Job_Form_data_authContext";
import LabelInput from "../common/LabelInput";
import LabelVariableSalaryRangeSelectInput from "../common/LabelVariableSalaryRangeSelectInput";
import LabelTextArea from "../common/LabelTextArea";
import Button from "../common/Button";

function JobForm() {
  const { form_details, setform_details } = useContext(Job_Form_Data_Context);

  const placeholders = {
    Position: "Full Stack Developer",
    Location: "Mumbai, India",
    Salary_range: { from_: "8", to_: "8" },
    Number_of_Positions: "4",
    Years_of_Experience: "5",
    Job_description:
      "Hiring a Full Stack Developer to handle both frontend and backend tasks. You'll work on building reliable, responsive, and modern web applications",
  };

  const handleFormSubmission = (e) => {
    e.preventDefault();
    // Validation check before submission
    if (!form_details.position || !form_details.job_description) {
      return;
    }
    console.log("Form data:", form_details);
  };

  return (
    <form
      onSubmit={handleFormSubmission}
      className="w-[90%] h-fit rounded-small border border-whiter shadow-light p-8 gap-6 m-auto flex flex-col bg-white"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        <LabelInput
          onChange={setform_details}
          type="text"
          text="Position"
          required={true}
          placeholder={placeholders.Position}
        />
        <LabelInput
          onChange={setform_details}
          type="text"
          text="Location"
          required={true}
          placeholder={placeholders.Location}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        <LabelInput
          onChange={setform_details}
          type="number"
          text="Number of Positions"
          placeholder={placeholders.Number_of_Positions}
        />
        <LabelInput
          onChange={setform_details}
          type="number"
          text="Year(s) of Experience"
          placeholder={placeholders.Years_of_Experience}
        />
      </div>

      <div className="flex w-full flex-row gap-4">
        <LabelVariableSalaryRangeSelectInput
          onChange={setform_details}
          text="Salary range"
          placeholder={placeholders.Salary_range}
        />
        <LabelTextArea
          onChange={setform_details}
          text="Job description"
          required={true}
          placeholder={placeholders.Job_description}
        />
      </div>

      <Button
        text="Post Job"
        bg={true}
        type="submit"
        class_name="px-10 py-2 rounded-small border border-nevy_blue bg-nevy_blue text-text_white transition-all ease-in-out duration-120 w-fit"
      />
    </form>
  );
}

export default JobForm;
