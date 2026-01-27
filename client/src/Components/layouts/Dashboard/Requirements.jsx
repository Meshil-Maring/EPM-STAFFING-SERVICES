import React from "react";
import Icon from "../../common/Icon";
import Label from "../../common/Label";

function Requirements() {
  const position_details = [
    {
      icon: "₹",
      name: "Salary Range",
      value: "₹15 - 30 LPA",
    },
    {
      icon: "ri-map-pin-line",
      name: "Location",
      value: "Bangalore, Mohali",
    },
    {
      icon: "ri-time-line",
      name: "Experience",
      value: "3-7 years",
    },
    {
      icon: "ri-suitcase-line",
      name: "contract type",
      value: "Full-Time",
    },
  ];

  return (
    <dl className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start justify-center">
      {position_details.map((item, index) => (
        <div
          key={index}
          className="flex flex-row items-center justify-start gap-3 group"
        >
          <div
            className="shrink-0 p-2 border border-lighter flex items-center justify-center rounded-small bg-white shadow-sm transition-transform group-hover:scale-110"
            aria-hidden="true"
          >
            {index === 0 ? (
              <span className="text-xl font-bold text-Darkgold flex items-center justify-center w-8 h-8">
                {item.icon}
              </span>
            ) : (
              <Icon
                icon={item.icon}
                class_name={`text-xl w-8 h-8 items-center justify-center flex ${
                  index < 2 ? "text-Darkgold" : "text-blue"
                }`}
              />
            )}
          </div>

          <div className="flex flex-col items-start justify-center overflow-hidden">
            <dt>
              <Label
                class_name="text-xs font-semibold text-text_b_l opacity-70 uppercase tracking-wider"
                text={item.name}
              />
            </dt>
            <dd>
              <Label
                class_name="text-sm font-bold text-text_b truncate w-full"
                text={item.value}
              />
            </dd>
          </div>
        </div>
      ))}
    </dl>
  );
}

export default Requirements;
