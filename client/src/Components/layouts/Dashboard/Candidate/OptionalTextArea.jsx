import React from "react";
import LabelTextArea from "../../../common/LabelTextArea";
function OptionalTextArea({
  input_class_style,
  id,
  text,
  handleInputChange,
  placeholder,
  value,
}) {
  return (
    <div className="w-full px-4 my-2 flex flex-col items-center justify-center">
      <LabelTextArea
        id={id}
        value={value}
        text={text}
        placeholder={placeholder}
        type={"text"}
        label_class_name=""
        textarea_class_name={`h-30 ${input_class_style}`}
        onchange={handleInputChange}
      />
    </div>
  );
}

export default OptionalTextArea;
