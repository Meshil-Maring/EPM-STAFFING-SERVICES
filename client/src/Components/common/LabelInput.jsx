import React from "react";

function LabelInput({
  text,
  id,
  type = "text",
  default_value,
  onchange,
  input_class_name,
  label_class_name,
  placeholder,
}) {
  return (
    <div className="flex flex-col gap-1 w-full items-start justify-start">
      {text && (
        <label htmlFor={id} className={label_class_name}>
          {text}
        </label>
      )}
      <input
        id={id}
        type={type}
        defaultValue={default_value}
        placeholder={placeholder || ""}
        onChange={(e) => onchange && onchange(e.target.value, id)}
        className={input_class_name}
      />
    </div>
  );
}

export default LabelInput;
