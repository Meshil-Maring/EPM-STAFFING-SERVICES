/**
 * Input component
 */

import React, { useState } from "react";
import Icon from "./Icon";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "../../styles/index.css";

function Input({
  default_value,
  read_only = false,
  require,
  id,
  placeholder,
  type,
  class_name,
  onchange,
  autoComplete = "off",
  input_target,
  value,
}) {
  const isPassword = type === "password" || type === "confirm password";
  const [clicked, setClicked] = useState(false);
  const input_type = isPassword ? (clicked ? "text" : "password") : type;

  const ischeckbox = type === "checkbox";
  const isfocus = id === "email" || id === "company_name";

  // ==============================
  // NORMAL INPUT HANDLER
  // ==============================
  const onChangingValue = (e) => {
    if (ischeckbox) {
      onchange(e.target.checked, id);
    } else {
      onchange(e.target.value, id);
    }
  };

  // ==============================
  // PHONE INPUT HANDLER (FIXED)
  // ==============================
  const handlePhoneInputChange = (val, country) => {
    if (!val) {
      onchange("", id);
      return;
    }

    const dialCode = country?.dialCode || "";
    const numberPart = val.slice(dialCode.length);

    const formatted = `+${dialCode}-${numberPart}`;

    onchange(formatted, id);
  };

  return type === "tel" ? (
    <div className="relative w-full p-0.2 flex items-center border rounded-small border-[#E3E3E3] bg-[#F6F3F3]">
      <PhoneInput
        country={"in"}
        value={value || default_value || ""}
        onChange={handlePhoneInputChange}
        containerStyle={{ zIndex: 5 }}
        containerClass="text-sm w-full rounded-small"
        dropdownStyle={{
          padding: 4,
          position: "absolute",
          top: "80%",
          left: 0,
          height: "208px",
          zIndex: 1000,
        }}
        buttonStyle={{
          border: "none",
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          backgroundColor: "transparent",
        }}
        inputStyle={{
          width: "100%",
          paddingTop: "4px",
          paddingBottom: "4px",
          paddingLeft: "3em",
          border: "none",
          backgroundColor: "transparent",
        }}
        inputClass="focus:ring-2 ring-[#d6d6d6]"
      />
    </div>
  ) : (
    <div className={`flex relative h-fit ${ischeckbox ? "w-fit" : "w-full"}`}>
      <input
        readOnly={read_only}
        autoFocus={isfocus}
        onChange={onChangingValue}
        type={input_type}
        autoComplete={isPassword ? "current-password" : autoComplete}
        placeholder={placeholder}
        className={`${class_name} ${isPassword ? "pr-8" : ""}`}
        required={require || false}
        value={value !== undefined ? value : default_value}
        id={input_target}
      />

      {isPassword && (
        <span
          onClick={() => setClicked(!clicked)}
          className="absolute right-2 top-0 bottom-0 text-lg cursor-pointer"
        >
          <Icon icon={clicked ? "ri-eye-off-line" : "ri-eye-line"} />
        </span>
      )}
    </div>
  );
}

export default Input;
