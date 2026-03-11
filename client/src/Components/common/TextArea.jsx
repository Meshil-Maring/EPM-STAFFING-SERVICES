import React from "react";

function TextArea({
  type,
  id,
  default_value,
  placeholder,
  value,
  onchange,
  max_words,
  class_name = "flex-1 p-3 w-full border border-lighter rounded-small text-sm tracking-wide bg-white focus:ring-2 focus:ring-blue/20 focus:outline-none transition-all resize-y min-h-[120px]",
}) {
  return (
    <textarea
      defaultValue={default_value}
      maxLength={max_words}
      type={type}
      id={id}
      name={id}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onchange(e.target.value, id)}
      className={class_name}
    />
  );
}

export default TextArea;
