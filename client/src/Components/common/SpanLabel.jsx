import React from "react";

function SpanLabel({
  text,
  as: Component = "span",
  class_name = "bg-red-50 text-red-700 rounded-small px-2.5 py-1",
}) {
  return (
    <Component
      className={`inline-flex items-center justify-center text-xs font-bold tracking-wide leading-none ${class_name}`}
    >
      {text}
    </Component>
  );
}

export default SpanLabel;
