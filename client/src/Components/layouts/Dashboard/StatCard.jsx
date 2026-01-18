import React from "react";
import Icon from "../../common/Icon";
import Label from "../../common/Label";

function StatCard({ card }) {
  return (
    <li
      className={`flex p-4 text-white overflow-hidden relative rounded-small flex-col items-center justify-between min-w-[160px] w-full md:w-52 h-36 shadow-md ${card.color}`}
    >
      <div
        className="w-16 h-16 absolute -top-6 -right-6 rounded-full bg-white/20"
        aria-hidden="true"
      />

      <div className="flex items-center flex-row justify-between w-full z-10">
        <span className="font-medium text-lg">{card.name}</span>
        <Icon icon={card.icon} class_name="w-8 h-8 text-2xl opacity-90" />
      </div>

      <Label text={card.total} class_name="font-bold text-4xl z-10" />
      <Label
        text={card.status}
        class_name="font-light text-sm opacity-90 z-10"
      />
    </li>
  );
}
export default StatCard;
