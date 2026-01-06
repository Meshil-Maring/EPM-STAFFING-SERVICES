import React from "react";
import ButtonColor from "../common/ButtonColor";
import ButtonPlain from "../common/ButtonPlain";
import Label from "../common/Label";
import SpanLabel from "../common/SpanLabel";
import CardIcons from "../common/CardIcons";
import CardLabels from "../common/CardLabels";
function Job_Card({
  job_name,
  status,
  location,
  contract_type,
  stipend_range,
  slots_available,
  date_posted,
}) {
  const handleSelecting = (name) => {
    alert(`Button ${name} clicked! in Job Editing`);
  };
  return (
    <div className="w-full p-4 rounded-lg shadow-xl gap-4 flex flex-col items-start justify-center">
      <div className="w-full flex flex-wrap items-center justify-start gap-4">
        <Label text={job_name} class_name="text-sm text-secondary" />
        <span className="text-xs">
          <SpanLabel text={status} />
        </span>
        <div className="flex w-fit text-md flex-row items-center justify-center gap-4 ml-auto">
          <Link to={"JobApplienceOverview"}>
            <ButtonPlain text="View Details" />
          </Link>
          <ButtonColor text="Edit" onSelect={handleSelecting} />
        </div>
      </div>
      <CardIcons {...rest} />
      <span className="flex flex-row gap-4 items-center justify-start">
        <Label text={slots_available} class_name="text-xs" />
        <Label text={date_posted} class_name="text-xs" />
      </span>
    </div>
  );
}

export default Job_Card;
