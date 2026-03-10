import React from "react";
import { getAvatar } from "../../utils/getAvatar";

function Image({ alt = "", link, class_name, name = "EMP STAFFING SERVICES" }) {
  return (
    <img
      src={link || getAvatar(name)}
      alt={alt}
      className={class_name}
      loading="lazy"
    />
  );
}

export default Image;
