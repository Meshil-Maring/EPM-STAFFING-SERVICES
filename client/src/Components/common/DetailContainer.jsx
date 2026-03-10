import React from "react";
import Label from "../common/Label";
import Icon from "../common/Icon";

function DetailContainer({ icon, label, value }) {
  return (
    <div className="flex rounded-small py-2 flex-row items-start justify-start gap-1 p-1 rounded-smalll bg-nevy_blue/10">
      <Icon icon={icon} class_name="text-lg font-lighter w-6 h-6" />
      <div className="flex flex-col itemsc-start justify-start">
        <Label text={label} class_name={"font-semibold text-sm"} />
        <Label text={value} class_name={"font-lighter text-xs tracking-wide"} />
      </div>
    </div>
  );
}

export default DetailContainer;
