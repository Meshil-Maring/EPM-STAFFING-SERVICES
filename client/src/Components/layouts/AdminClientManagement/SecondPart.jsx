import React from "react";
import Label from "../../common/Label";
import Icon from "../../common/Icon";

function SecondPart({ active_jobs, pending_jobs }) {
  return (
    <div className="flex flex-row items-center gap-6 ml-auto">
      <div className="flex text-[0.6em] flex-row bg-lighter rounded-small px-1 w-fit items-center justify-start gap-1 ">
        <div className="flex flex-row items-center justify-center">
          <Icon icon="ri-suitcase-line" class_name="text-xs" />
          <Label text="Active jobs" class_name="text-nowrap" />
        </div>
        <Label text={active_jobs} class_name="font-lighter" />
      </div>
      <div className="flex px-1 text-[0.6em] bg-lighter rounded-small flex-row w-fit items-center justify-start gap-1">
        <div className="flex flex-row items-center justify-center gap-1">
          <Icon icon="ri-time-line" class_name="text-xs" />
          <Label text="Pending jobs" class_name="text-nowrap" />
        </div>
        <Label text={pending_jobs} class_name="font-lighter" />
      </div>
    </div>
  );
}

export default SecondPart;
