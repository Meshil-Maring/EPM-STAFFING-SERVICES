import React, { useState } from "react";
import Icon from "../../common/Icon";
import Label from "../../common/Label";
import Button from "../../common/Button";

function ButtonsPart({ email, joined_date }) {
  const [clicked, setClicked] = useState(false);
  return (
    <div className="flex flex-row text-[0.6em] items-center justify-start gap-6 w-fit">
      <div className="flex flex-row items-center max-w-30 justify-start overflow-hidden">
        <Icon icon="ri-mail-line" class_name="text-xs" />
        <Label text={email} class_name="truncate text-nowrap" />
      </div>
      <div className="flex flex-row items-center justify-start">
        <Icon icon="ri-calendar-line" class_name="text-xs" />
        <Label text={joined_date} class_name="text-nowrap" />
      </div>

      <div
        onClick={() => setClicked(!clicked)}
        className="w-fit cursor-pointer hover:bg-lighter transition-all duration-120 ease-in-out flex flex-row items-center justify-center border border-light p-1 rounded-extra_small text-nowrap"
      >
        <Icon
          icon={clicked ? "ri-eye-line" : "ri-eye-off-line"}
          class_name="text-md w-4 h-4 flex items-center justify-center"
        />
        <Label text="View Details" class_name="" />
      </div>
      <Button
        type="button"
        class_name="w-fit text-xs bg-Darkgold hover:bg-Darkgold-hover transition-all duration-120 ease-in-out text-text_white shadow-sm p-1 rounded-extra_small"
        text="Manage"
      />
    </div>
  );
}

export default ButtonsPart;
