import React from "react";
import Label from "../../common/Label";

function ListFirstPart({ name_prefix, name, field, status }) {
  return (
    <div className="flex gap-2 flex-row items-center justify-start">
      <span className="h-8 w-8 text-text_white bg-d_blue rounded-small text-md flex items-center justify-center shrink-0">
        <span>{name_prefix}</span>
      </span>

      <div className="flex flex-col items-start justify-center overflow-hidden">
        <Label text={name} class_name="text-xs font-semibold truncate w-full" />
        <div className="flex flex-row text-[0.6em] font-lighter items-center justify-between gap-4">
          <Label text={field} class_name="p-0.5 rounded-small bg-lighter" />
          <Label
            text={status}
            class_name={`${
              status === "Active" ? "after:bg-Darkgold" : "after:bg-nevy_blue"
            } relative after:absolute after:w-1.5 after:h-1.5 after:rounded-full after:left-0 after:top-0 after:bottom-0 pl-2 after:my-auto`}
          />
        </div>
      </div>
    </div>
  );
}

export default ListFirstPart;
