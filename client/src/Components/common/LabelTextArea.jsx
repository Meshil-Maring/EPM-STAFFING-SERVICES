import React from "react";
import Label from "./Label";
import TextArea from "./TextArea";

function LabelBasicInput({
  text,
  placeholder,
  type,
  label_class_name = "",
  textarea_class_name = "",
}) {
  return (
    <div className="flex flex-col flex-1 w-full gap-2 items-start justify-start text-text_l_b">
      <Label htmlFor={text} text={text} class_name={label_class_name} />

      <div className="w-full flex-1">
        <TextArea
          class_name={textarea_class_name}
          id={text}
          type={type}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}

export default LabelBasicInput;
