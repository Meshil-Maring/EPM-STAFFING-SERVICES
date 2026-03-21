import React from "react";
import Icon from "../../../common/Icon";

function Arrow({ icon, id, onArrowClick }) {
  return (
    <button
      onClick={() => onArrowClick(id)}
      className="text-xs text-nevy_blue hover:text-nevy_blue_hover cursor-pointer transition-all duration-200 ease-in-out"
    >
      <Icon icon={icon} />
    </button>
  );
}

export default Arrow;
