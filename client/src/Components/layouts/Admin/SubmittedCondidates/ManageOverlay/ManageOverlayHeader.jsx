import React from "react";
import Icon from "../../../../common/Icon";
import Label from "../../../../common/Label";
import NameInitials from "../../../../common/NameInitials";

function ManageOverlayHeader({
  candidate,
  job_name,
  exp,
  cand_status,
  setClosing,
}) {
  return (
    <header className="w-full bg-g_btn text-text_white flex flex-row items-center justify-between p-2">
      <div className="flex flex-row items-center justify-start gap-1">
        <NameInitials name={candidate.name} class_name="h-10 w-10" />
        <div className="flex flex-col items-start justify-start">
          <Label
            text={candidate.name}
            class_name={"text-[clamp(1.2em,2vw,1.4em)]"}
          />
          <div className="w-full flex flex-row gap-2 items-start justify-start">
            <Label text={`${job_name} | ${exp} |`} class_name={""} />
            <Label
              text={cand_status}
              class_name={"bg-nevy_blue px-1 rounded-small"}
            />
          </div>
        </div>
      </div>
      <span
        onClick={() => setClosing(false)}
        className="hover:bg-lighter/70 hover:text-red-dark cursor-pointer rounded-full transition-all ease-in-out duration-200 p-1"
      >
        <Icon icon={"ri-close-line"} class_name="h-5 w-5 text-xl" />
      </span>
    </header>
  );
}

export default ManageOverlayHeader;
