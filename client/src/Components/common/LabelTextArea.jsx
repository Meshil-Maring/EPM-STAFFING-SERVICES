import React, { useId } from "react";
import Label from "./Label";
import TextArea from "./TextArea";

function LabelBasicInput({ text, placeholder, type }) {
  const inputId = useId();
  const jobDescriptionPlaceholder = placeholder;

  return (
    <div className="flex flex-col flex-1 w-full gap-2 items-start justify-start">
      <Label
        htmlFor={inputId}
        text={text}
        font_size="base"
        font_family="inter"
        color="primary"
        weight="semibold"
        class_name="text-text_b_l font-semibold font-poppins text-sm"
      />

      <div className="w-full flex-1">
        <TextArea
          id={inputId}
          type={type}
          placeholder={jobDescriptionPlaceholder}
        />
      </div>
    </div>
  );
}

export default LabelBasicInput;
