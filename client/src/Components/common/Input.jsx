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
  const isPassword =
    type === "password" ||
    type === "confirm password" ||
    type === "new password";
  const [clicked, setClicked] = useState(false);
  const input_type = isPassword ? (clicked ? "text" : "password") : type;

  const ischeckbox = type === "checkbox";
  const isfocus = id === "email" || id === "company_name";

  // If value prop is explicitly passed → controlled input
  // If only default_value is passed → uncontrolled input (user can type freely)
  const isControlled = value !== undefined;

  const onChangingValue = (e) => {
    if (!onchange) return;
    if (ischeckbox) {
      onchange(e.target.checked, id);
    } else {
      onchange(e.target.value, id);
    }
  };

  const handlePhoneInputChange = (val, country) => {
    if (!onchange) return;
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
        onChange={onChangingValue}
        type={input_type}
        autoComplete={
          type === "new password"
            ? autoComplete
            : isPassword
              ? "current-password"
              : autoComplete
        }
        placeholder={placeholder}
        className={`${class_name} ${isPassword ? "pr-8" : ""}`}
        required={require || false}
        id={input_target}
        // Controlled mode: value prop is passed (e.g. login/signup forms)
        // Uncontrolled mode: only default_value is passed (e.g. edit forms)
        {...(isControlled ? { value } : { defaultValue: default_value ?? "" })}
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
