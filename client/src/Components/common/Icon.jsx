/**
 * Icon component
 *
 * A flexible icon component that supports both Remix Icon classes and custom text content.
 * Automatically detects Remix Icon classes (starting with 'ri-') and renders them as <i> elements,
 * otherwise renders as a <p> element for custom text content.
 */

import React from "react";

/**
 * Icon component with support for Remix Icons and custom text
 *
 * @param {Object} props - Component props
 * @param {string} props.icon - Icon name or text content
 * @param {string} [props.class_name="text-md"] - CSS classes for styling
 * @returns {JSX.Element} Rendered icon element (i or p)
 */
function Icon({ icon, class_name = "text-md" }) {
  return !icon || !icon.startsWith("ri-") ? (
    <p className={`${class_name} flex items-center justify-center p-1`}>
      {icon}
    </p>
  ) : (
    <i
      className={`${icon} ${class_name} flex items-center justify-center p-1`}
    />
  );
}

export default Icon;
