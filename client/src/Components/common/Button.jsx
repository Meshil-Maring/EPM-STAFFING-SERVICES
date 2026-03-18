/**
 * Button component
 *
 * A reusable button component with hover effects and customizable styling.
 * Provides consistent button behavior and appearance throughout the application.
 */

import React from "react";

/**
 * Button component with hover effects and custom styling
 *
 * @param {Object} props - Component props
 * @param {string} [props.type="button"] - Button type attribute
 * @param {Function} props.onclick - Click handler function
 * @param {string} props.text - Button text content
 * @param {string} [props.class_name] - Additional CSS classes for styling
 * @returns {JSX.Element} Styled button element
 */
function Button({ type = "button", onclick, text, class_name }) {
  return (
    <button
      type={type}
      onClick={() => onclick(text)}
      className={`cursor-pointer hover:scale-[1.02] transition-all ease-in-out duration-120 ${class_name} `}
    >
      {text}
    </button>
  );
}

export default Button;
