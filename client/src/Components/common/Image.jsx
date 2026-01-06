import React from "react";

function Image({ link, class_name = "h-full object-cover rounded-full" }) {
  return <img src={link} alt="" className={`${class_name}`} />;
}

export default Image;
