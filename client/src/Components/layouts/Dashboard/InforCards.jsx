import React, { useState } from "react";
import Label from "../../common/Label";
import Icon from "../../common/Icon";
import { motion } from "framer-motion";
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
    <div className="w-full h-fit flex font-poppins flex-row flex-wrap items-center justify-center gap-6">
      {info_cards.map((card, index) => {
        const [btn_hover, setBtn_Hover] = useState(false);
        return (
          <motion.div
            animate={{
              scale: btn_hover ? 1.05 : 1,
              cursor: btn_hover ? "pointer" : "default",
              transition: { type: "spring", duration: 0.2, stiffness: 120 },
            }}
            onMouseEnter={() => setBtn_Hover(true)}
            onMouseLeave={() => setBtn_Hover(false)}
            key={index}
            className={`flex p-2 m-2 text-whiter overflow-hidden relative rounded-small flex-col items-center justify-between min-w-40 w-50 max-w-50 h-30 ${

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
            <div className="flex items-center flex-row justify-between w-full">
              <span className="font-lighter text-xl">{card.name}</span>

              <Icon
                icon={
                  card.name === "Offer"
                    ? "ri-file-text-line"
                    : "ri-vidicon-line"
                }
                class_name="w-10 h-10 text-3xl"
              />
            </div>
            <Label text={card.total} class_name="font-bold text-4xl" />
            <Label text={card.status} class_name="font-lighter text-sm" />
          </motion.div>

        );
      })}
    </div>
  );
}

export default InforCards;
