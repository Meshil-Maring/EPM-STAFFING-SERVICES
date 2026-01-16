import React from "react";
import Label from "../../common/Label";
import Icon from "../../common/Icon";

function HomeFeature({ feature }) {
  return (
    <li className="group p-6 bg-white hover:bg-white border border-lighter rounded-small shadow-sm hover:shadow-md flex flex-col items-start gap-4 transition-all duration-300">
      <div
        className="p-3 bg-red-50 rounded-small flex items-center justify-center transition-colors group-hover:bg-red-100"
        aria-hidden="true"
      >
        <Icon icon={feature.icon} class_name="text-2xl text-red-600 w-6 h-6" />
      </div>

      <div className="flex flex-col gap-2">
        <Label
          as="h3"
          text={feature.head}
          class_name="font-bold text-xl text-text_b tracking-tight"
        />
        <Label
          as="p"
          text={feature.description}
          class_name="text-sm leading-relaxed text-text_b_l opacity-90"
        />
      </div>
    </li>
  );
}

export default HomeFeature;
