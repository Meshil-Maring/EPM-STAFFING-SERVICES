import React, { useState } from "react";
import Icon from "./Icon";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "../../styles/index.css";
function Input({ autocomplete, id, placeholder, type, class_name, onchange }) {
  const isPassword =
    placeholder === "Password" || placeholder === "Confirm Password";
  const [clicked, setClicked] = useState(false);
  isPassword ? (clicked ? (type = "text") : (type = "password")) : "";

  const ischeckbox = type === "checkbox";

  const isfocus = id === "email" || id === "company_name";
  const isphone_number = type === "tel";
  const onChange = (e) => {
    ischeckbox
      ? onchange(e.target.checked)
      : isphone_number
      ? onchange(phone_number)
      : onchange(e.target.value, id);
  };

  const [phone_number, set_phone_number] = useState("");
  return type === "tel" ? (
    <div className="relative w-full p-0.2 flex items-center border rounded-small border-[#E3E3E3] bg-[#F6F3F3]">
      <PhoneInput
        country={"in"}
        value={phone_number}
        onChange={(phone) => set_phone_number(phone)}
        containerStyle={{ zIndex: 5 }}
        containerClass="text-sm w-full focus:outline-none focus:ring-2 ring-[#d6d6d6] rounded-small"
        dropdownStyle={{
          padding: 4,
          position: "absolute",
          top: "80%",
          left: 0,
          height: "208px",
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
          backgroundColor: "transparent",
          border: "4em",
          borderColor: "[#d6d6d6]",
        }}
      />
      {phone_number.length <= 2 && (
        <span
          className="absolute text-center left-18 text-[rgba(61,61,61,0.5)] font-lighter"
          style={{ zIndex: 2 }}
        >
          eg. 47563-74829
        </span>
      )}
    </div>
  ) : (
    <>
      <input
        autoComplete={autocomplete}
        autoFocus={isfocus}
        onChange={(e) => onChange(e)}
        type={type}
        placeholder={placeholder}
        className={`${class_name} ${isPassword ? "pr-8" : ""}`}
        required
      />
      {isPassword && (
        <span onClick={() => setClicked(!clicked)} className="absolute right-1">
          <Icon icon={clicked ? "ri-eye-off-line" : "ri-eye-line"} />
        </span>
      )}
    </>
  );
}

export default Input;
