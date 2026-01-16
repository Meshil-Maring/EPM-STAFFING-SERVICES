import React from "react";
import Icon from "./Icon";
import Label from "./Label";

function CardIcons({ card }) {
  const icons = {
    location: "ri-map-pin-line",
    contract_type: "ri-suitcase-line",
    stipend_range: "₹",
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
                  ? card.location
                  : key === "contract_type"
                  ? card.contract_type
                  : key === "stipend_range"
                  ? card.stipend_range
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
