import React from "react";

function FollowLabel({ status, class_name, onToggle }) {
  const text = status ? "Follow" : "Unfollow";
  const classes = `px-2 cursor-pointer rounded-small ${class_name} ${status ? "bg-g_btn text-text_white" : "border border-lighter"}`;
  return (
    <button onClick={() => onToggle && onToggle(!status)} className={classes}>
      {text}
    </button>
  );
}

export default FollowLabel;
