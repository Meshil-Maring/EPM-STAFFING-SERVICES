import React from "react";
import Label from "../../common/Label";
import Icon from "../../common/Icon";

function SecondPart({ active_jobs, pending_jobs }) {
  return (
    <div
      className="flex flex-row items-center gap-4 "
      role="group"
      aria-label="Job Statistics"
    >
      <div className="flex flex-row bg-lighter text-text_b_l rounded-small px-2 items-center justify-start gap-2">
        <div className="flex flex-row items-center justify-center opacity-80">
          <Icon
            icon="ri-suitcase-line"
            class_name="text-sm"
            aria-hidden="true"
          />
          <Label
            as="span"
            text="Active"
            class_name="text-[10px] font-bold uppercase tracking-wide whitespace-nowrap"
          />
        </div>
        <Label
          as="span"
          text={active_jobs}
          class_name="text-xs font-extrabold text-text_b"
        />
      </div>

      <div className="flex flex-row bg-lighter text-text_b_l rounded-small px-2 items-center justify-center gap-2">
        <div className="flex flex-row items-center justify-center gap-1 opacity-80">
          <Icon icon="ri-time-line" class_name="text-sm" aria-hidden="true" />
          <Label
            as="span"
            text="Pending"
            class_name="text-[10px] font-bold uppercase tracking-wide whitespace-nowrap"
          />
        </div>
        <Label
          as="span"
          text={pending_jobs}
          class_name="text-xs font-extrabold text-text_b"
        />
      </div>
    </div>
  );
}

export default SecondPart;
