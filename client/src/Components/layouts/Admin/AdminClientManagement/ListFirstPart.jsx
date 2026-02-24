import React from "react";
import Label from "../../../common/Label";
import NameInitials from "../../../common/NameInitials";
import FollowLabel from "../common/FollowLabel";

function ListFirstPart({
  handleFollowChange,
  companyId,
  name,
  field,
  status,
  follow_status,
}) {
  const isActive = status === "Active";

  return (
    <div className="flex gap-2 flex-1 flex-row items-center justify-between">
      <div className="flex flex-row items-center justify-start gap-2">
        <NameInitials name={name} bg="5629dc" class_name="w-10 h-10" />
        <div className="flex flex-col items-start justify-center overflow-hidden flex-1">
          <Label
            text={name}
            class_name="text-sm font-bold text-text_b truncate w-full leading-tight"
          />

          <div className="flex flex-1 w-full flex-row text-[8px] font-semibold items-center justify-start gap-3 mt-0.5 uppercase tracking-wide">
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
      <div
        onClick={() => handleFollowChange(companyId)}
        className="w-fit ml-auto flex items-center justify-center mx-auto"
      >
        <FollowLabel
          status={follow_status}
          class_name={"text-[clamp(1em,1vw,1.2em)]"}
        />
      </div>
    </div>
  );
}

export default ListFirstPart;
