import React from "react";
import Label from "../../../common/Label";
import Icon from "../../../common/Icon";
import Button from "../../../common/Button";

function CompanyCardBottomPart({
  isGrid,
  email,
  joined_date,
  handleButtonClick,
}) {
  const btn_class = `w-full text-sm font-semibold cursor-pointer transition-all duration-200 flex flex-row items-center justify-center rounded-small outline-none ${isGrid ? "gap-2 py-1" : "grid-4 h-9"}`;

  return (
    <div
      className={`flex flex-col items-center justify-between w-full pt-1 ${isGrid ? "gap-2" : "grid-4"}`}
    >
      <div
        className={`flex flex-row w-full gap-3 items-center justify-between text-text_b_l ${isGrid ? "text-standard" : "text-[13px]"}`}
      >
        <div className="flex flex-row flex-1 items-center justify-start gap-2 overflow-hidden min-w-0">
          <Icon
            icon="ri-mail-line"
            class_name="text-base shrink-0 opacity-70"
            aria-hidden="true"
          />
          <span className="truncate font-medium" title={email}>
            {email}
          </span>
        </div>

        <div className="flex flex-row items-center justify-end gap-2 shrink-0">
          <Icon
            icon="ri-calendar-line"
            class_name="text-base opacity-70"
            aria-hidden="true"
          />
          <Label text={joined_date} class_name="font-medium" />
        </div>
      </div>

      <div className="flex flex-row w-full gap-4 items-center justify-between">
        <Button
          text={"View Details"}
          type="button"
          onclick={handleButtonClick}
          class_name={`bg-white text-primary hover:bg-hover-light border border-lighter focus:ring-2 focus:ring-blue/20 ${btn_class}`}
        />

        <Button
          type="button"
          onclick={handleButtonClick}
          class_name={`bg-Darkgold text-text_white hover:bg-Darkgold-hover focus:ring-2 focus:ring-Darkgold/40 ${btn_class}`}
          text="Manage"
        />
      </div>
    </div>
  );
}

export default CompanyCardBottomPart;
