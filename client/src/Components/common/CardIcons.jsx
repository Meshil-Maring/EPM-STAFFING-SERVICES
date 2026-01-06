import React from "react";
import Icon from "./Icon";
import Label from "./Label";

function CardIcons({ location, contract_type, stipend_range }) {
  const icons = {
    location: "ri-map-pin-line",
    contract_type: "ri-suitcase-line",
    stipend_range: "₹",
  };
  return (
    <div className="w-full text-sm flex flex-wrap items-center justify-start gap-8">
      {Object.keys(icons).map((key, index) => {
        return (
          <div className="flex flex-row items-center justify-start gap-2">
            <Icon
              key={index}
              class_name="text-xl text-primary w-6 h-6 rounded-small bg-lighter"
              icon={icons[key]}
            />
            <Label
              class_name=""
              text={
                key === "location"
                  ? location
                  : key === "contract_type"
                  ? contract_type
                  : key === "stipend_range"
                  ? stipend_range
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
