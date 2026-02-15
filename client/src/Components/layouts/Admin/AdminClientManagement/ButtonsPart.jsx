import React, { useState } from "react";
import Label from "../../../common/Label";
import Button from "../../../common/Button";
import Icon from "../../../common/Icon";

function ButtonsPart({ email, joined_date }) {
  const [showDetails, setShowDetails] = useState(false);
  const handleBtnClicking = (name) => {
    alert("Not yet implemented");
  };
  const btn_class =
    "px-4 py-1.5 text-xs font-semibold rounded-small shadow-sm transition-all focus:ring-2";

  return (
    <div className="flex flex-row items-center justify-start gap-2 py-1">
      <div className="flex flex-row items-center justify-start min-w-0 max-w-16 truncate group">
        <Icon
          icon="ri-mail-line"
          class_name="text-sm text-text_b_l opacity-70"
          aria-hidden="true"
        />
        <Label
          as="span"
          text={email}
          class_name="truncate text-xs font-medium text-text_b_l"
          title={email}
        />
      </div>

      <div className="flex flex-row items-center justify-start gap-1.5">
        <Icon
          icon="ri-calendar-line"
          class_name="text-sm text-text_b_l opacity-70"
          aria-hidden="true"
        />
        <Label
          as="span"
          text={joined_date}
          class_name="text-xs font-medium text-text_b_l whitespace-nowrap"
        />
      </div>

      <div className="flex flex-row items-center gap-3 ml-auto md:ml-0">
        <Button
          text={"View Details"}
          class_name={`focus:ring-light/80 hover:bg-light/40 ${btn_class}`}
        />

        <Button
          onclick={handleBtnClicking}
          type="button"
          text="Manage"
          class_name={`focus:ring-Darkgold/30 bg-Darkgold hover:bg-Darkgold-hover text-white ${btn_class}`}
        />
      </div>
    </div>
  );
}

export default ButtonsPart;
