import React from "react";
import Label from "./Label";
import TextArea from "./TextArea";

function LabelBasicInput({
  id,
  text,
  placeholder,
  type,
  label_class_name = "",
  textarea_class_name = "",
  value,
  onchange,
}) {
  return (
    <div className="flex flex-col flex-1 w-full gap-2 items-start justify-start text-text_l_b">
      <Label htmlFor={text} text={text} class_name={label_class_name} />

      <div className="w-full flex-1">
        <TextArea
          class_name={textarea_class_name}
          id={id}
          type={type}
          onchange={onchange}
          value={value}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}

export default LabelBasicInput;
