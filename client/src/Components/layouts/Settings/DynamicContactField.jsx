import React from "react";
import LabelInput2 from "../../common/LabelInput2";

function DynamicContactField({ field, onChange, onRemove, index }) {
  return (
    <div className="relative group">
      <LabelInput2
        text={field.label}
        id={field.id}
        placeholder={`Enter ${field.label.toLowerCase()}`}
        type="text"
        onChange={(value) => onChange(value, field.id)}
        input_value={field.value}
      />
      <button
        type="button"
        onClick={() => onRemove(field.id)}
        className="absolute -top-1 -right-2 group-hover:opacity-100 opacity-0 transition-opacity bg-red text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-dark font-semibold"
        title="Remove contact"
      >
        <span className="text-xs ">✕</span>
      </button>
    </div>
  );
}

export default DynamicContactField;
