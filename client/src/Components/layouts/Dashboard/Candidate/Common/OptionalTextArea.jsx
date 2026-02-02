import React from "react";
import LabelTextArea from "../../../../common/LabelTextArea";

/**
 * OptionalTextArea
 * * A specialized wrapper for the base LabelTextArea component.
 * Designed to handle multi-line optional input (like messages or notes)
 * while maintaining a consistent height and preventing manual resizing.
 */
function OptionalTextArea({
  input_class_style, // Custom styling for the textarea element
  label_class_style, // Custom styling for the label element
  id, // Unique identifier for the input
  text, // Label text to be displayed
  handleInputChange, // Function to update parent state on change
  placeholder, // Hint text displayed when empty
  value, // Current controlled value from parent state
}) {
  return (
    /* Container ensures full-width layout and aligns children to the start (left) */
    <div className="w-full flex flex-col items-start justify-start">
      <LabelTextArea
        id={id}
        value={value}
        text={text}
        placeholder={placeholder}
        type="text"
        label_class_name={label_class_style}
        textarea_class_name={`min-h-[100px] resize-none ${input_class_style}`}
        /* Callback for state synchronization */
        onchange={handleInputChange}
      />
    </div>
  );
}

export default OptionalTextArea;
