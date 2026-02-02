import React from "react";
import Label from "./Label";
import SettingsInput from "./SettingsInput";

function LabelInput2({
  autoFocus,
  id,
  text,
  placeholder,
  type = "text",
  onChange,
  default_value,
  label_style = "font-bold text-xs text-text_b uppercase tracking-wider",
  input_style = "w-full text-sm py-2 border border-lighter px-3 rounded-small focus:outline-none focus:ring-2 focus:ring-blue/20 transition-all placeholder:opacity-50 bg-white",
}) {
  return (
    <div className="flex flex-col items-start justify-center w-full gap-1.5 group">
      <Label text={text} class_name={`${label_style} cursor-pointer`} />

      <SettingsInput
        autoFocus={autoFocus}
        id={id}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        class_name={input_style}
        default_value={default_value}
      />
    </div>
  );
}

export default LabelInput2;
