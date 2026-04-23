import React from "react";
import Icon from "./Icon";

function Image({ alt = "", link, class_name, name = "EMP STAFFING SERVICES" }) {
  return link ? (
    <img src={link} alt={alt} className={class_name} loading="lazy" />
  ) : (
    <Icon icon="ri-user-line" class_name={class_name} />
  );
}

export default Image;
