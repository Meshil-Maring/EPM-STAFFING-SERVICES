import React from "react";
import LabelInput2 from "../../common/LabelInput2";

function ContactField({
  text,
  id,
  placeholder,
  type = "text",
  onChange,
  input_value,
  required = false,
  value,
}) {
  return (
    <LabelInput2
      text={text}
      id={id}
      value={value}
      placeholder={placeholder}
      type={type}
      onChange={onChange}
      input_value={input_value}
      required={required}
    />
  );
}

export default ContactField;
