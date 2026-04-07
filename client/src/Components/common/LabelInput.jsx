import React from "react";
import Input from "./Input";

function LabelInput({
  text,
  id,
  type = "text",
  onchange,
  input_class_name,
  label_class_name,
  placeholder,
  value,
}) {
  return (
    <div className="flex flex-col gap-1 w-full items-start justify-start">
      {text && (
        <label htmlFor={id} className={label_class_name}>
          {text}
        </label>
      )}
      <Input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder || ""}
        onchange={onchange}
        class_name={input_class_name}
      />
    </div>
  );
}

export default LabelInput;
