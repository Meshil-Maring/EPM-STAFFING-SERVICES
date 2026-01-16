import React, { useContext, useMemo } from "react";
import { Job_Form_Data_Context } from "../../context/Job_Form_data_authContext";
import Label from "./Label";
import Input from "./Input";

function TextInput({
  label,
  type = "text",
  placeholder = "input",
  class_name = "w-full py-2 px-3 border text-sm border-lighter rounded-small tracking-wide focus:ring-2 focus:ring-blue/20 focus:outline-none transition-all",
}) {
  const { form_details, setform_details } = useContext(Job_Form_Data_Context);

  const handleChange = (e) => {
    const { value } = e.target;
    setform_details((prev) => ({
      ...prev,
      label: value,
    }));
  };

  return (
    <div className="flex flex-col w-full gap-1.5">
      {label && (
        <Label
          htmlFor={label}
          text={label}
          class_name="text-xs font-bold text-text_b ml-1 tracking-wider"
        />
      )}

      <Input
        id={label}
        name={label}
        value={label || ""}
        onChange={handleChange}
        type={type}
        class_name={class_name}
        placeholder={`Eg. ${placeholder}`}
      />
    </div>
  );
}

export default TextInput;
