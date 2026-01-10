import { number } from "framer-motion";
import React from "react";
import Icon from "../../common/Icon";
import Label from "../../common/Label";

function Active_Pending_jobs({ icon, label, number_of_jobs }) {
  return (
    <div className="flex bg-g_light_blue border-light p-2 rounded-small  flex-col w-full items-start justify-start gap-1 ">
      <div className="flex flex-row items-center justify-center gap-1">
        <Icon icon={icon} class_name="text-sm" />
        <Label text={label} class_name="text-xs" />
      </div>
      <Label text={number_of_jobs} class_name="text-sm font-bold pl-1" />
    </div>
  );
}

export default Active_Pending_jobs;
