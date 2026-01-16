import React, { useContext } from "react";
import Label from "../../common/Label";
import Icon from "../../common/Icon";
import Input from "../../common/Input";
import { signing_in_context } from "../../../context/SigningInDataContext";

function Signin_input({ element, display_data }) {
  const { set_signin_form } = useContext(signing_in_context);
  const handleInputChange = (value, id) => {
    set_signin_form((prev) => ({
      ...prev,
      [id]: value,
    }));
  };
  return (
    <div className="flex flex-col items-start justify-center gap-1.5 w-full">
      <Label
        as="label"
        htmlFor={element.type}
        class_name="text-sm text-text_l_b font-medium cursor-pointer"
        text={element.label}
      />

      <div className="w-full rounded-small flex items-center justify-start relative group">
        <div
          className="absolute left-0 flex items-center justify-center pointer-events-none z-10"
          aria-hidden="true"
        >
          <Icon icon={element.icon} class_name={display_data.icon_styles} />
        </div>

        <Input
          onchange={handleInputChange}
          require={true}
          id={element.type}
          autoComplete={`${element.type === "email"}`}
          placeholder={element.placeholder}
          type={element.type}
          class_name={`${display_data.input_element_styles} pl-10 w-full focus:ring-2 focus:ring-nevy_blue outline-none transition-all`}
        />
      </div>
    </div>
  );
}

export default Signin_input;
