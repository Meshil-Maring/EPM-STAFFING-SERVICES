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
    alert(`Button ${name} clicked!`);
  };
  return (
    <div className="w-full p-6 rounded-lg border border-lighter shadow-lighter gap-4 flex flex-col items-start justify-center">
      <div className="w-full flex flex-wrap items-center justify-start gap-4">
        <Label text={job_name} font_size="sm" color="secondary" />
        <span className="text-xs">
          <SpanLabel text={status} />
        </span>
        <div className="flex w-fit text-md flex-row items-center justify-center gap-4 ml-auto">
          <ButtonPlain onSelect={handleSelecting} text="View Details" />
          <ButtonColor text="Edit" onSelect={handleSelecting} />
        </div>
      </div>
      <CardIcons
        location={location}
        contract_type={contract_type}
        stipend_range={stipend_range}
      />
      <CardLabels slots_available={slots_available} date_posted={date_posted} />
    </div>
  );
}

export default Job_Card;
