import React from "react";
import Icon from "../common/Icon";
import Label from "../common/Label";
function Requirements() {
  const position_details = [
    {
      icon: "₹",
      name: "Salary Range",
      value: `₹15 -30 LPA`,
    },
    {
      icon: "ri-map-pin-line",
      name: "Location",
      value: `Bangalor, Mohali`,
    },
    {
      icon: "ri-time-line",
      name: "Experience",
      value: `3-7 years`,
    },
    {
      icon: "ri-suitcase-line",
      name: "Job Type",
      value: `Full-Time`,
    },
  ];
  return (
    <div className="flex flex-row items-start gap-8 justify-center">
      {position_details.map((item, index) => {
        return (
          <span
            key={index}
            className="flex flex-row items-start justify-center gap-2"
          >
            <span className="p-1 border border-whiter flex items-center justify-center rounded-small bg-white">
              {index === 0 ? (
                <p className="text-xl text-Darkgold flex items-center justify-center w-8 h-8">
                  {item.icon}
                </p>
              ) : (
                <Icon
                  icon={item.icon}
                  class_name={`text-xl w-8 items-center justify-center flex h-8 ${
                    index < 2 ? "text-Darkgold" : "text-blue"
                  }`}
                />
              )}
            </span>
            <div className="flex flex-col items-start justify-center w-full">
              <Label class_name="text-sm font-lighter" text={item.name} />
              <Label class_name="text-xs font-light" text={item.value} />
            </div>
          </span>
        );
      })}
    </div>
  );
}

export default Requirements;
