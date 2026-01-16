import React from "react";

function Image({
  alt = "",
  link,
  class_name = "h-full object-cover rounded-full",
  width,
  height,
}) {
  return (
    <img
      src={link || "https://placehold.co/400"}
      alt={alt}
      className={class_name}
      loading="lazy"
      width={width}
      height={height}
      decoding="async"
    />
  );
}

export default Image;
