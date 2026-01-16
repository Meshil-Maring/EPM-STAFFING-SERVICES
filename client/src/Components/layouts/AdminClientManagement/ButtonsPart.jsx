import React, { useState } from "react";
import Icon from "../../common/Icon";
import Label from "../../common/Label";
import Button from "../../common/Button";

function ButtonsPart({ email, joined_date }) {
  const [isExpanded, setIsExpanded] = useState(false);

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
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
          className="flex flex-row text-xs font-lighter text-text_b whitespace-nowrap items-center justify-center px-2 py-0.5 border border-lighter rounded-small bg-white hover:bg-hover-light transition-all duration-200 outline-none focus:ring-2 focus:ring-blue/20"
        >
          <Icon
            icon={isExpanded ? "ri-eye-line" : "ri-eye-off-line"}
            class_name=" "
            aria-hidden="true"
          />
          <Label text={"View Details"} class_name="font-lighter text-primary" />
        </div>

        <Button
          type="button"
          text="Manage"
          class_name="px-4 py-1.5 text-xs font-semibold bg-Darkgold hover:bg-Darkgold-hover text-white rounded-small shadow-sm transition-all focus:ring-2 focus:ring-Darkgold/30"
        />
      </div>
    </div>
  );
}

export default ButtonsPart;
