import React from "react";
import Icon from "./Icon";
import Label from "./Label";

function CardIcons({ selected_job }) {
  const icons = {
    location: "ri-map-pin-line",
    "contract type": "ri-suitcase-line",
    "salary range": "₹",
  };
  return (
    <div className="w-full text-sm flex flex-wrap items-center justify-start gap-8">
      {Object.keys(icons).map((key, index) => {
        return (
          <div
            key={index}
            className="flex flex-row items-center justify-start gap-2"
          >
            <Icon
              class_name="text-xl text-primary w-6 h-6 rounded-small bg-lighter"
              icon={icons[key]}
            />
            <Label
              class_name=""
              text={
                key === "location"
                  ? selected_job[key]
                  : key === "contract type"
                    ? selected_job[key]
                    : key === "salary range"
                      ? selected_job[key]
                      : ""
              }
            />
          </div>
        );
      })}
    </div>
  );
}

export default CardIcons;
