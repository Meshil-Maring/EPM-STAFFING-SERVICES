import React, { useEffect } from "react";
import LabelInput from "../../../common/LabelInput";
import Label from "../../../common/Label";

function OnCallType({
  error,
  handleInputChange,
  input_class_style,
  resetForm,
}) {
  const label = "Phone number";
  useEffect(() => {
    resetForm();
  }, []);
  return (
    <div className="w-full flex flex-col items-end">
      <LabelInput
        onchange={handleInputChange}
        id={label.toLowerCase()}
        text={label}
        placeholder={""}
        label_class_name=""
        input_class_name={input_class_style}
        type={"tel"}
        auto_complete="off"
      />
      {error && (
        <Label
          text={error}
          class_name={"text-red-dark font-lighter text-[clamp(0.8em,1vw,1em)]"}
        />
      )}
    </div>
  );
}

export default OnCallType;
