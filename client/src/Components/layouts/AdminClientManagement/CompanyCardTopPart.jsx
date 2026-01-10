import React from "react";
import Label from "../../common/Label";

function CompanyCardTopPart({
  name_prefix,
  field,
  status,
  positions,
  company_name,
}) {
  return (
    <div className="flex gap-2 flex-row w-full items-center justify-start">
      <span className="h-12 w-12 text-text_white bg-d_blue rounded-small text-2xl flex items-center justify-center shrink-0">
        <span>{name_prefix}</span>
      </span>

      <div className="flex flex-col items-start justify-center overflow-hidden">
        <Label
          text={company_name}
          class_name="text-lg font-semibold truncate w-full"
        />
        <div className="flex flex-row text-xs font-semibold items-center justify-between gap-4">
          <Label
            text={field}
            class_name="px-2 py-0.5 rounded-small bg-lighter"
          />
          <Label
            text={status}
            class_name={`${
              status === "Active" ? "after:bg-Darkgold" : "after:bg-nevy_blue"
            } relative after:absolute after:w-1.5 after:h-1.5 after:rounded-full after:left-0 after:top-0 after:bottom-0 pl-2 after:my-auto`}
          />
        </div>
      </div>
      <div className="flex flex-col items-center ml-auto justify-center p-1 rounded-small shrink-0">
        <Label text={positions} class_name="text-lg font-bold" />
        <Label text="Positions" class_name="text-xs" />
      </div>
    </div>
  );
}

export default CompanyCardTopPart;
