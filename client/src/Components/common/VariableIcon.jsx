import React from "react";
import Icon from "./Icon";

function VariableIcon({ Icon_path, b_radius = "md", ariaLabel = "icon" }) {
  const radiusMap = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full",
    small: "rounded-small",
  };

  const selectedRadius = radiusMap[b_radius] || radiusMap.md;

  return (
    <div
      className={`w-full h-full bg-g_btn text-white flex items-center justify-center p-2 ${selectedRadius} shadow-sm transition-transform active:scale-95`}
      role="img"
      aria-label={ariaLabel}
    >
      <Icon
        viewBox="0 0 24 24"
        fill="currentColor"
        class_name="w-full h-full"
        aria-hidden="true"
      >
        <path d={Icon_path} />
      </Icon>
    </div>
  );
}

export default VariableIcon;
