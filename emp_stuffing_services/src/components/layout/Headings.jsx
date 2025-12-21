import React from "react";

function Headings({
  font_size = 4,
  font_family = "sans",
  flex_direction = "col",
  align_items = "center",
  justify_items = "center",
}) {
  return (
    <h1
      className={`flex flex-${flex_direction}  items-${align_items} justify-${justify_items} font-${font_family} text-${font_size}`}
    >
      <span>Total consultancy</span>
      <span className={`text-xs`}>Service Platform</span>
    </h1>
  );
}

export default Headings;
