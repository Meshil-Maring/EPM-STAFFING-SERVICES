import React from "react";

function Label({ class_name, text, type = "text" }) {
  return (
    <p type={type} className={class_name}>
      {text}
    </p>
  );
}

export default Label;
