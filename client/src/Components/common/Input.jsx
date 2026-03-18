/**
 * Input component
 *
 * A versatile input component that handles various input types including text,
 * password, checkbox, and telephone inputs. It provides consistent styling and
 * behavior across different input types with special handling for phone numbers
 * and password visibility toggle.
 */

import React, { useState } from "react";
import Icon from "./Icon";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "../../styles/index.css";

/**
 * Input component with support for multiple input types
 *
 * @param {Object} props - Component props
 * @param {string} [props.default_value] - Default value for the input
 * @param {boolean} [props.read_only=false] - Whether the input is read-only
 * @param {boolean} [props.require=false] - Whether the input is required
 * @param {string} [props.id] - Input ID attribute
 * @param {string} [props.placeholder] - Input placeholder text
 * @param {string} [props.type="text"] - Input type (text, password, checkbox, tel, etc.)
 * @param {string} [props.class_name] - CSS classes for styling
 * @param {Function} [props.onchange] - Change handler function
 * @param {string} [props.autoComplete="off"] - AutoComplete attribute value
 * @param {string} [props.input_target] - Input target attribute
 * @param {string} [props.value] - Controlled input value
 * @returns {JSX.Element} Rendered input component
 */
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
  const [phone_number, set_phone_number] = useState("");
  const isPassword = type === "password" || type === "confirm password";
  const [clicked, setClicked] = useState(false);
  const input_type = isPassword ? (clicked ? "text" : "password") : type;

  const ischeckbox = type === "checkbox";
  const isfocus = id === "email" || id === "company_name";
  const isphone_number = type === "tel";

  /**
   * Handle input value changes with type-specific logic
   * @param {Event|String} e - Change event or phone number string
   */
  const onChangingValue = (e) => {
    if (ischeckbox) {
      onchange(e.target.checked, id);
    } else if (isphone_number) {
      onchange(e, id);
      set_phone_number(e);
    } else {
      onchange?.(e.target.value, id);
    }
  };

  return type === "tel" ? (
    <div className="relative w-full p-0.2 flex items-center border rounded-small border-[#E3E3E3] bg-[#F6F3F3]">
      <PhoneInput
        country={"in"}
        require={require || false}
        // value={phone_number}
        defaultValue={default_value}
        onChange={(e) => onChangingValue(e)}
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
      {phone_number.length <= 2 && (
        <span
          className="absolute text-center left-18 text-[rgba(61,61,61,0.5)] font-lighter"
          style={{ zIndex: 2 }}
        >
          Phone
        </span>
      )}
    </div>
  ) : (
    <div className={`flex relative h-fit ${ischeckbox ? "w-fit" : "w-full"}`}>
      <input
        readOnly={read_only}
        autoFocus={isfocus}
        onChange={(e) => onChangingValue(e)}
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
          className="absolute right-2 top-0 bottom-0 text-lg"
        >
          <Icon icon={clicked ? "ri-eye-off-line" : "ri-eye-line"} />
        </span>
      )}
    </div>
  );
}

export default Input;
