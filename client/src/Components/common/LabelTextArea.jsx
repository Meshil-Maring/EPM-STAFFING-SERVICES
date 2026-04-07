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
  default_value,
}) {
  const words = value?.trim().split(" ").length;
  return (
    <div className="flex flex-col flex-1 w-full gap-2 items-start justify-start text-text_l_b">
      <Label htmlFor={text} text={text} class_name={label_class_name} />

      <div className="w-full relative flex-1">
        <TextArea
          class_name={textarea_class_name}
          id={id}
          type={type}
          onchange={onchange}
          value={value}
          default_value={default_value}
          placeholder={placeholder}
          max_words={600}
        />
        <span
          className={`font-lighter absolute bottom-1 right-1 text-xs ${words === 100 || value.length > 500 ? "text-red" : "text-green-800"}`}
        >{`${words}/100 words`}</span>
      </div>
    </div>
  );
}

export default LabelBasicInput;
