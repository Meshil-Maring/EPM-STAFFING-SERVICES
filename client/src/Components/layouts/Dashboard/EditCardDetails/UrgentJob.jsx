import React, { useState } from "react";
import Icon from "../../../common/Icon";
import Label from "../../../common/Label";

function UrgentJob({ priority, heading, label, handle_update_form }) {
  //local checking or unchecking the urgent checkbox
  const [check, setCheck] = useState(priority);

  // updater function to update the parent form state when checkbox is toggled
  const updater = () => {
    handle_update_form(check, "job_urgent");
  };

  return (
    <div
      className={`flex text-text_b flex-row gap-4 p-2 rounded-small w-full items-center justify-start border border-highLightBorder bg-red-light/40`}
    >
      <input
        type={"checkbox"}
        className={"w-5 h-5"}
        onChange={(e) => {
          setCheck(e.target.checked);
          updater();
        }}
        checked={check}
      />
      <div className="flex flex-col items-start justify-start">
        <Label text={heading} class_name={"font-semibold text-lg"} />
        <Label text={label} class_name={"text-sm"} />
      </div>
    </div>
  );
}

export default UrgentJob;
