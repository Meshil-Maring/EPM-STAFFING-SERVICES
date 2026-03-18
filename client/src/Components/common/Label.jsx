/**
 * Label component
 *
 * A simple reusable component for displaying text labels with customizable styling.
 * This component provides a consistent way to render text content throughout the application.
 */

import React from "react";

/**
 * Label component for displaying text with custom styling
 *
 * @param {Object} props - Component props
 * @param {string} props.class_name - CSS classes for styling the label
 * @param {string} props.text - The text content to display
 * @param {string} [props.type="text"] - The type attribute for the paragraph element
 * @returns {JSX.Element} Styled paragraph element with the provided text
 */
function Label({ class_name, text, type = "text" }) {
  return (
    <p type={type} className={class_name}>
      {text}
    </p>
  );
}

export default Label;
