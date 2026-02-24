import React from "react";
import Label from "../../../common/Label";
import Icon from "../../../common/Icon";

function CandidateCardCommon({ data }) {
  return (
    <div className="w-full flex flex-col items-start justify-center rounded-lg bg-white border border-nevy_blue/40 p-2 hover:border-nevy_blue/80 transition-all duration-200">
      <div className="flex flex-row items-center justify-start gap-2 text-blue opacity-80 mb-1">
        <Icon icon={data.icon} class_name="text-lg p-2 w-8 h-8 rounded-sm" />
        <Label
          text={data.label}
          class_name="text-[10px] uppercase font-bold tracking-wider"
        />
      </div>
      <Label
        text={data.value}
        class_name="text-sm font-semibold text-text_b truncate w-full"
      />
    </div>
  );
}

export default CandidateCardCommon;
