import React from "react";
import Icon from "../../../common/Icon";
import Label from "../../../common/Label";

function JobDetails({ job }) {
  return (
    <div className="w-full flex flex-col items-start justify-start gap-2">
      <div className="flex flex-row items-center justify-start gap-2">
        <Icon icon="ri-calendar-line" class_name="text-nevy_blue" />
        <Label
          text={`Posted: ${job["posted date"] || "N/A"}`}
          class_name="text-xs"
        />
      </div>
      <div className="flex flex-row items-center justify-start gap-2">
        <Icon icon="ri-suitcase-line" class_name="text-nevy_blue" />
        <Label
          text={`Experience: ${job.experience || "N/A"}`}
          class_name="text-xs"
        />
      </div>
      <div className="flex flex-row items-center justify-start gap-2">
        <Icon icon="ri-money-dollar-circle-line" class_name="text-nevy_blue" />
        <Label text={`Salary: ${job.salary || "N/A"}`} class_name="text-xs" />
      </div>
    </div>
  );
}

export default JobDetails;
