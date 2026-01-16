import React from "react";
import Label from "../../common/Label";

function ColumnLabels({
  heading,
  label,
  heading_style = "font-heading uppercase text-xl md:text-2xl text-text_b font-bold",
  label_style = "text-xs md:text-sm uppercase font-asap text-gold_lighter tracking-widest",
}) {
  return (
    <div className="w-full flex flex-col items-start justify-start gap-0.5">
      <header className="w-full">
        <Label text={heading} class_name={heading_style} />
      </header>
      <Label text={label} class_name={label_style} />
    </div>
  );
}

export default ColumnLabels;
