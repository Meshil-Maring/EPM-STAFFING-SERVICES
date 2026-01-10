import React, { useState } from "react";
import Label from "../../common/Label";
import Icon from "../../common/Icon";
import Button from "../../common/Button";

function CompanyCardBottomPart({ email, joined_date }) {
  const [clicked, setClicked] = useState(false);

  return (
    <div className="flex flex-col items-center justify-between gap-2 w-full">
      <div className="flex flex-row text-xs w-full gap-4 items-center justify-between">
        <div className="flex flex-row w-full items-center justify-start gap-1 overflow-hidden">
          <Icon icon="ri-mail-line" class_name="text-sm" />
          <span className="truncate">{email}</span>
        </div>
        <div className="flex flex-row items-center justify-start w-full gap-1">
          <Icon icon="ri-calendar-line" class_name="text-sm" />
          <Label text={joined_date} />
        </div>
      </div>

      <div className="flex flex-row w-full gap-4 items-center justify-between">
        <div
          onClick={() => setClicked(!clicked)}
          className="w-full cursor-pointer hover:bg-hover-light transition-all duration-120 ease-in-out flex flex-row gap-2 items-center justify-center border border-light p-1 rounded-extra_small"
        >
          <Icon
            icon={clicked ? "ri-eye-line" : "ri-eye-off-line"}
            class_name="text-md w-4 h-4"
          />
          <Label text="View Details" class_name="text-xs" />
        </div>
        <Button
          type="button"
          class_name="w-full text-xs bg-Darkgold hover:bg-Darkgold-hover transition-all duration-120 ease-in-out text-text_white shadow-sm p-1 rounded-extra_small"
          text="Manage"
        />
      </div>
    </div>
  );
}

export default CompanyCardBottomPart;
