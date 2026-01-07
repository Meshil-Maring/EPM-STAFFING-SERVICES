import React from "react";

function Image({
  alt = "",
  link,
  class_name = "h-full object-cover rounded-full",
}) {
  return <img src={link} alt={alt} className={`${class_name}`} />;
}

export default Image;
