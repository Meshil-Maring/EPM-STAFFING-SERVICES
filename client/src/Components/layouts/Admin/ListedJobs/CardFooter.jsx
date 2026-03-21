import React from "react";
import Icon from "../../../common/Icon";
import Label from "../../../common/Label";

function CardFooter({ icons, job_index, job }) {
  return (
    <div className="w-full flex flex-row items-center justify-between">
      <div className="flex flex-row items-center justify-start gap-2">
        <Icon icon={icons.user_edit} class_name="text-nevy_blue" />
        <Label
          text={`Applicants: ${job["total applicants"] || "0"}`}
          class_name="text-xs"
        />
      </div>
      <div className="flex flex-row items-center justify-start gap-2">
        <Icon icon={icons.eye} class_name="text-nevy_blue" />
        <Label
          text={`Views: ${job["total views"] || "0"}`}
          class_name="text-xs"
        />
      </div>
    </div>
  );
}

export default CardFooter;
