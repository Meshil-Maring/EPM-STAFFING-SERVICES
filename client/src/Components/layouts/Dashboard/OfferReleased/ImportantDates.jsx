import React from "react";
import Label from "../../../common/Label";
import Icon from "../../../common/Icon";

function ImportantDates({ data }) {
  // important dates section - matches the image requirements for OfferReleased
  const important_dates = [
    {
      label: "Offer Release",
      id: "offer_release",
      value: data?.["released date"] || "N/A", // Using the correct key from data
    },
    {
      label: "Acceptance Deadline",
      id: "acceptance_deadline",
      value: data?.["acceptance_deadline"] || "N/A",
    },
    {
      label: "Joining Date",
      id: "joining_date",
      value: data?.["joining date"] || "N/A", // Using the correct key from data
    },
  ];
  return (
    <div className="w-full flex flex-col text-xs items-start justify-start gap-2 border p-4 rounded-small border-light/60">
      <div className="flex flex-row items-center justify-start gap-1 text-sm">
        <Icon
          icon={"ri-time-line"}
          class_name="p-1 w-8 h-8 rounded-small bg-red text-text_white text-lg"
        />
        <Label text={"Important Dates"} class_name={"font-semibold"} />
      </div>
      <div className="w-full grid grid-cols-3 gap-4 items-center justify-center">
        {important_dates.map((date, i) => (
          <div
            key={`important_date-${i}`}
            className="w-full p-2 flex flex-row items-center gap-1 rounded-small border border-lighter bg-blue/5"
          >
            <Icon icon="ri-calendar-line" class_name="text-xl" />
            <div className="flex w-full flex-col leading-3 items-start justify-start">
              <Label text={date.label} class_name={""} />
              <Label text={date.value} class_name={""} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImportantDates;
