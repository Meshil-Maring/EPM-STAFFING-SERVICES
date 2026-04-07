import React from "react";
import Icon from "./Icon";
import Label from "./Label";
import { getSalaryRange } from "../layouts/Admin/common/GetSalaryRange";

function CardIcons({ job_card }) {
  const icons = {
    location: "ri-map-pin-line",
    job_type: "ri-suitcase-line",
    salary: "₹",
  };
  return (
    <div className="w-full text-sm flex flex-wrap items-center justify-start gap-8">
      {Object.keys(icons).map((key, index) => {
        const [min, max] = job_card?.salary?.split("-");
        let value = "undefined";
        switch (key) {
          case "location":
            value = job_card[key];
            break;
          case "job_type":
            value = job_card[key];
            break;
          case "salary":
            value = getSalaryRange(min, max);
            break;
        }
        return (
          <div
            key={index}
            className="flex flex-row items-center justify-start gap-2"
          >
            <Icon
              class_name="text-xl text-primary w-8 h-8 rounded-small bg-black/5"
              icon={icons[key]}
            />
            <Label class_name="text-xs font-medium" text={value} />
          </div>
        );
      })}
    </div>
  );
}

export default CardIcons;
