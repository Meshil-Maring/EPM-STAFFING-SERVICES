import React from "react";

function Label({
  text,
  font_size = "xs",
  font_family = "inter",
  color = "primary",
  weight = "semibold",
}) {
  return (
    <p
      className={`text-${font_size} font-${weight} font-${font_family} text-${color}`}
    >
      {text}
    </p>
  );
}

export default Label;
