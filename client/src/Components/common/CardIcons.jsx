import React from "react";
import Icon from "./Icon";
import Label from "./Label";
import { getSalaryRange } from "../layouts/Admin/common/GetSalaryRange";

function CardIcons({ job_card }) {
  const icons = {
    location: "ri-map-pin-line",
    "contract type": "ri-suitcase-line",
    "expected ctc": "₹",
  };
  return (
    <div className="w-full text-sm flex flex-wrap items-center justify-start gap-8">
      {Object.keys(icons).map((key, index) => {
        let value = "undefined";
        switch (key) {
          case "location":
            value = job_card[key];
            break;
          case "contract type":
            value = job_card[key];
            break;
          case "expected ctc":
            value = getSalaryRange(job_card["expected ctc"]);
            break;
        }
        return (
          <div
            key={index}
            className="flex flex-row items-center justify-start gap-2"
          >
            <Icon
              class_name="text-xl text-primary w-6 h-6 rounded-small bg-lighter"
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
