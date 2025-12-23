import React from "react";
import Label from "../common/Label";

function ColumnHeadings({
  main_text,
  main_font_size,
  main_color,
  sub_text,
  sub_font_size,
  sub_color,
  main_font_weight = "bold",
  sub_font_weight = "semibold",
}) {
  return (
    <div className="flex flex-1 flex-col items-start leading-4 justify-center">
      <Label
        text={main_text}
        font_size={main_font_size}
        color={main_color}
        weight={main_font_weight}
      />
      <Label
        text={sub_text}
        font_size={sub_font_size}
        color={sub_color}
        weight={sub_font_weight}
      />
    </div>
  );
}

export default ColumnHeadings;
