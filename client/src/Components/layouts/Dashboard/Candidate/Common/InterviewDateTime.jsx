import React from "react";
import LabelInput from "../../../common/LabelInput";

/**
 * Renders the Date and Time pickers side-by-side.
 * Contributor Note: ID must match the keys in the parent 'schedule_data' state.
 */
function InterviewDateTime({ onInputChange, style }) {
  const fields = [
    { label: "Interview Date", type: "date", id: "interview date" },
    { label: "Interview Time", type: "time", id: "interview time" },
  ];

  return (
    <div className="w-full gap-4 my-2 flex flex-row items-center justify-between">
      {fields.map((field) => (
        <LabelInput
          key={field.id}
          onchange={onInputChange}
          id={field.id}
          text={field.label}
          input_class_name={style}
          type={field.type}
          auto_complete="off"
        />
      ))}
    </div>
  );
}

export default InterviewDateTime;
