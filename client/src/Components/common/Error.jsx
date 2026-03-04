import React from "react";
import Label from "./Label";
function Error({ error }) {
  return (
    <div className="w-full flex items-center justify-center px-4 py-2">
      <Label
        text={error.text}
        class_name={`w-full p-1 rounded-small ${error.type === "error" ? "text-red-dark bg-red-50" : "text-text_green bg-green-50"}`}
      />
    </div>
  );
}

export default Error;
