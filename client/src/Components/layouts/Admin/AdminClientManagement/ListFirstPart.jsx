import React from "react";
import Label from "../../../common/Label";

function ListFirstPart({ name_prefix, name, field, status }) {
  const isActive = status === "Active";

  return (
    <div className="flex gap-2 flex-row items-center justify-start min-w-0">
      <div
        className="h-10 w-10 text-white bg-d_blue rounded-small text-lg font-bold flex items-center justify-center shrink-0 shadow-sm"
        aria-hidden="true"
      >
        <span>{name_prefix}</span>
      </div>

      <div className="flex flex-col items-start justify-center overflow-hidden flex-1">
        <Label
          as="h4"
          text={name}
          class_name="text-sm font-bold text-text_b truncate w-full leading-tight"
        />

        <div className="flex flex-row text-[11px] font-bold items-center justify-start gap-3 mt-0.5 uppercase tracking-wide">
          <Label
            as="span"
            text={field}
            class_name="px-1.5 py-0.5 rounded-small bg-lighter text-text_b_l border border-lighter"
          />
          <div className="flex items-center gap-1.5 ml-1">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isActive ? "bg-Darkgold" : "bg-nevy_blue"
              }`}
              aria-hidden="true"
            />
            <Label
              as="span"
              text={status}
              class_name={isActive ? "text-Darkgold" : "text-nevy_blue"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListFirstPart;
