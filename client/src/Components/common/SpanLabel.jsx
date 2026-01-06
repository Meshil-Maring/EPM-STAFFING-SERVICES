import React from "react";

function SpanLabel({
  text,
  class_name = "bg-red-light text-red-dark rounded-lg px-2 py-1",
}) {
  return <span className={`${class_name}`}>{text}</span>;
}

export default SpanLabel;
