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
  default_value,
}) {
  return (
    <LabelInput2
      text={text}
      id={id}
      default_value={default_value}
      placeholder={placeholder}
      type={type}
      onChange={onChange}
      input_value={input_value}
      required={required}
    />
  );
}

export default ContactField;
