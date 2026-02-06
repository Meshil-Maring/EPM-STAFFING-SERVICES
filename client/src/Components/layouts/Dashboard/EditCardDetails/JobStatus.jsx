import React, { useContext, useEffect, useState } from "react";
import Icon from "../../../common/Icon";
import Label from "../../../common/Label";

function JobStatus({ handle_update_form, heading, label, selected_job }) {
  //local checking or unchecking the urgent checkbox
  const isAcive = selected_job.status.toLowerCase() === "active";
  const [check, setCheck] = useState(isAcive);

  return (
    <div
      className={`flex text-text_b flex-row gap-4 p-2 rounded-small w-full items-center justify-start border border-highLightBorder`}
    >
      <input
        type={"checkbox"}
        className={"w-5 h-5"}
        onChange={(e) => {
          (setCheck(e.target.checked),
            handle_update_form(e.target.checked, "status"));
        }}
        checked={check}
      />
      <div className="flex flex-1 flex-col items-start justify-start">
        <Label text={heading} class_name={"font-semibold text-lg"} />
        <Label text={label} class_name={"text-sm"} />
      </div>
    </div>
  );
}

export default JobStatus;
