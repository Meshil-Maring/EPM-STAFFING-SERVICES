import React from "react";
import Label from "./Label";
import TextArea from "./TextArea";

function LabelBasicInput({ text, placeholder, type = "text" }) {
  const jobDescriptionPlaceholder = placeholder;

  return (
    <div className="flex flex-col flex-1 w-full gap-2 items-start justify-start">
      <Label
        htmlFor={text}
        text={text}
        class_name="text-text_b_l font-semibold font-poppins text-sm"
      />

      <div className="w-full flex-1">
        <TextArea
          id={text}
          type={type}
          placeholder={jobDescriptionPlaceholder}
        />
      </div>
    </div>
  );
}

export default LabelBasicInput;
