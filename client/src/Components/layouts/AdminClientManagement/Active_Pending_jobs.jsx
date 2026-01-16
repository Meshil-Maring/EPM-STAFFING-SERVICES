import React from "react";
import Icon from "../../common/Icon";
import Label from "../../common/Label";

function Active_Pending_jobs({ icon, label, number_of_jobs }) {
  return (
    <div className="flex bg-g_light_blue border border-lighter p-3 rounded-small flex-col w-full items-start justify-start gap-2 shadow-sm">
      <div className="flex flex-row items-center justify-start gap-2 opacity-80">
        <Icon
          icon={icon}
          class_name="text-sm text-primary"
          aria-hidden="true"
        />
        <Label
          text={label}
          class_name="text-xs font-medium uppercase tracking-wider text-text_b_l"
        />
      </div>

      <Label
        text={number_of_jobs}
        class_name="text-lg font-bold text-text_b pl-0.5 leading-none"
      />
    </div>
  );
}

export default Active_Pending_jobs;
