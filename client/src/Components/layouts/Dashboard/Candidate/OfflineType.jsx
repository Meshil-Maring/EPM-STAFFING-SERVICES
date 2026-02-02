import React, { useEffect } from "react";
import LabelInput from "../../../common/LabelInput";
import Label from "../../../common/Label";

function OfflineType({
  error,
  handleInputChange,
  input_class_style,
  resetForm,
}) {
  const types = ["Address", "Phone Number"];
  useEffect(() => {
    resetForm();
  }, []);
  return types.map((label) => {
    const isAddress = label === "Address";
    const isPhoneNumber = label === "Phone Number";
    const placeholder = isAddress ? "Delhi, India" : "";
    return (
      <div key={label} className="w-full flex flex-col items-end">
        <LabelInput
          onchange={handleInputChange}
          id={label.toLocaleLowerCase()}
          text={label}
          placeholder={placeholder}
          label_class_name=""
          input_class_name={input_class_style}
          type={isPhoneNumber ? "tel" : ""}
          auto_complete="off"
        />
        {error && isPhoneNumber && (
          <Label
            text={error}
            class_name={
              "text-red-dark font-lighter text-[clamp(0.8em,1vw,1em)]"
            }
          />
        )}
      </div>
    );
  });
}

export default OfflineType;
