import React, { useEffect } from "react";
import LabelInput from "../../../common/LabelInput";

function OnlineType({ handleInputChange, input_class_style, resetForm }) {
  useEffect(() => {
    resetForm();
  }, []);
  const types = ["Meeting Link", "Interviewer"];
  return types.map((label) => {
    const isLink = label === "Meeting Link";
    const isInterview = label === "Interviewer";
    const placeholder = isLink
      ? "https://meet.google.com/"
      : isInterview
        ? "HR/ Technical Panel"
        : "";
    return (
      <LabelInput
        key={label}
        onchange={handleInputChange}
        id={label.toLocaleLowerCase()}
        text={label}
        placeholder={placeholder}
        label_class_name=""
        input_class_name={input_class_style}
        type={""}
        auto_complete="off"
      />
    );
  });
}

export default OnlineType;
