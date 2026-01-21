import React from "react";
import Icon from "../../common/Icon";
import Label from "../../common/Label";

function SettingsHeaders({ icon_bg, icon, heading, label }) {
  return (
    <header className="w-full flex flex-row items-center justify-start gap-4">
      <div
        className={`w-12 h-12 text-2xl text-text_white rounded-small flex items-center justify-center shrink-0 shadow-sm ${icon_bg}`}
        aria-hidden="true"
      >
        <Icon icon={icon} />
      </div>

      <div className="flex flex-col items-start justify-center">
        <Label
          as="h2"
          text={heading}
          class_name="text-lg md:text-xl font-bold text-text_b tracking-tight"
        />
        <Label
          as="p"
          text={label}
          class_name="text-sm text-text_b_l opacity-80 leading-tight"
        />
      </div>
    </header>
  );
}

export default SettingsHeaders;
