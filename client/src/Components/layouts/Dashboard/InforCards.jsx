import React from "react";
import Label from "../../common/Label";
import Icon from "../../common/Icon";

function InforCards() {
  const info_cards = [
    {
      name: "Interview",
      total: "12",
      status: "Scheduled",
    },
    {
      name: "Offer",
      total: "5",
      status: "Released",
    },
    {
      name: "In Review",
      total: "7",
      status: "Pending",
    },
    {
      name: "Rejected",
      total: "8",
      status: "Not Fit",
    },
  ];
  return (
    <div className="w-full h-fit flex flex-row flex-wrap items-center justify-between">
      {info_cards.map((card, index) => {
        return (
          <div
            key={index}
            className={`flex p-4 text-whiter overflow-hidden relative rounded-standard flex-col items-center justify-between w-40 h-30 ${
              index === 0
                ? "bg-blueGradient"
                : index === 1
                ? "bg-greenGradient"
                : index === 2
                ? "bg-grayGradient"
                : "bg-redGradient"
            }`}
          >
            <div className="w-16 h-16 absolute -top-6 -right-6 rounded-full bg-md_white" />
            <span className="flex items-center flex-row justify-between w-full">
              <span className="font-poppins font-semibold">{card.name}</span>
              <Icon
                icon={
                  card.name === "Offer"
                    ? "ri-file-text-line"
                    : "ri-vidicon-line"
                }
                class_name="w-8 h-8 text-xl"
              />
            </span>
            <Label
              text={card.total}
              class_name="font-poppins font-bold text-2xl"
            />
            <Label
              text={card.status}
              class_name="font-poppins font-lighter text-xs"
            />
          </div>
        );
      })}
    </div>
  );
}

export default InforCards;
