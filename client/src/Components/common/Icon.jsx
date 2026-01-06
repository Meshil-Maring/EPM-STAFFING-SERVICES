import React from "react";

function Icon({ icon, class_name = "text-md" }) {
  return !icon || !icon.startsWith("ri-") ? (
    <p className={`${class_name} flex items-center justify-center p-1`}>
      {icon}
    </p>
  ) : (
    <i
      className={`${icon} ${class_name} flex items-center justify-center p-1`}
    />
  );
}

export default Icon;
