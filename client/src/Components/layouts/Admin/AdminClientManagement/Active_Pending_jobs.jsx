import React from "react";
import Icon from "../../../common/Icon";
import Label from "../../../common/Label";

function Active_Pending_jobs({ icon, label, number_of_jobs }) {
  return (
    <div
      className={`flex bg-lighter/40 rounded-small flex-row w-full items-center justify-between text-[9px] font-semibold px-2`}
    >
      <div className="flex flex-row items-center justify-start opacity-80">
        <Icon
          icon={icon}
          class_name="text-sm text-primary"
          aria-hidden="true"
        />
        <Label
          text={label}
          class_name="font-semibold uppercase tracking-wider text-text_b_l"
        />
      </div>

      <Label
        text={number_of_jobs}
        class_name={`text-text_b pl-1 leading-none text-sm font-semibold`}
      />
    </div>
  );
}

export default Active_Pending_jobs;
