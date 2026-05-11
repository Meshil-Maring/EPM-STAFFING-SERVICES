import React from "react";
import Icon from "../../../shared/components/ui/Icon";

function HomeFeature({ feature }) {
  return (
    <li className="group p-6 bg-white border border-lighter rounded-large shadow-sm hover:shadow-lg hover:-translate-y-1 flex flex-col items-start gap-5 transition-all duration-300">
      <div
        className="p-3 bg-red-lighter rounded-large flex items-center justify-center group-hover:bg-red-light transition-colors"
        aria-hidden="true"
      >
        <Icon icon={feature.icon} class_name="text-2xl text-red" />
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="font-bold text-lg text-text_b tracking-tight">
          {feature.head}
        </h3>
        <p className="text-sm leading-relaxed text-text_b opacity-60">
          {feature.description}
        </p>
      </div>
    </li>
  );
}

export default HomeFeature;
