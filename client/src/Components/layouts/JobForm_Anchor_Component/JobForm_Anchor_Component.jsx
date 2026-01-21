import React from "react";
import Label from "../../common/Label";
import Icon from "../../common/Icon";
import Input from "../../common/Input";
import LabelInput from "../../common/LabelInput";
import LabelTextArea from "../../common/LabelTextArea";
import { Job_posting_elements } from "../../dummy_data_structures/Job_Posting_elements";
import { useNavigate } from "react-router-dom";
function JobForm_Anchor_Component({ icon_class, handleInputChange }) {
  const navigate = useNavigate();
  // styles
  const input_class =
    "border border-lighter focus:outline-none focus:ring-1 ring-nevy_blue w-full rounded-small py-1 px-2 placeholder-gray-400";
  const label_class = "font-semibold text-sm text-text";

  // Closing the post job modal
  const handleClosing = () => {
    navigate("/client/dashboard");
  };
  return (
    <div className="w-full flex flex-col items-center justify-start gap-4 ">
      <div className="flex items-center justify-between w-full border-b bg-b_white sticky top-0 border-lighter pt-3 ">
        <Label class_name="w-full font-bold text-lg" text={"Post a New Job"} />
        <span className="w-fit h-fit" onClick={handleClosing}>
          <Icon icon={"ri-close-line"} class_name={icon_class} />
        </span>
      </div>
      <div className="flex items-start justify-center flex-col w-full">
        <Label text={"Job Title"} class_name={label_class} />
        <Input
          onchange={handleInputChange}
          placeholder={"e.g. Senior Full Stack Developer"}
          class_name={input_class}
          require={true}
        />
      </div>
      <div className="w-full bg-red-light p-2 rounded-small flex flex-row items-start justify-start gap-2">
        <Input
          onchange={handleInputChange}
          type={"checkbox"}
          class_name={"w-4 h-4 mt-1.5"}
        />
        <div className="flex flex-col items-start  justify-center text-text">
          <Label text={"Mark as Urgent"} class_name={"font-semibold text-xl"} />
          <Label
            text={"This will add a priority badge to your listing"}
            class_name={"text-sm"}
          />
        </div>
      </div>
      {Job_posting_elements.map((el, index) => {
        return (
          <div
            key={index}
            className="flex gap-4 flex-row items-start justify-between w-full"
          >
            <LabelInput
              text={el.label1}
              placeholder={el.placeholder1}
              id={el.id1}
              onchange={handleInputChange}
              input_class_name={input_class}
              label_class_name={label_class}
            />
            <LabelInput
              text={el.label2}
              placeholder={el.placeholder2}
              id={el.id2}
              onchange={handleInputChange}
              input_class_name={input_class}
              label_class_name={label_class}
            />
          </div>
        );
      })}
      <LabelTextArea
        text={"Job Description"}
        placeholder={"Type the Job description here..."}
        type={"text"}
        label_class_name={label_class}
        textarea_class_name="w-full focus:outline-none focus:ring-1 ring-nevy_blue p-2 min-h-40 rounded-small border border-lighter"
      />
    </div>
  );
}

export default JobForm_Anchor_Component;
