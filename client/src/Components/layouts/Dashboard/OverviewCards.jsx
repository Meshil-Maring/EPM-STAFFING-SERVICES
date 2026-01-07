import React, { useState } from "react";
import Image from "../../common/image";
import Label from "../../common/Label";
import SpanLabel from "../../common/SpanLabel";
import Icon from "../../common/Icon";
import { motion } from "framer-motion";
function OverviewCards({ candidate, id }) {
  const [flip_eye, setFlip_eye] = useState(false);
  const handleFlipEye = () => {
    setFlip_eye(!flip_eye);
  };
  const isRedColor = candidate.status.toLowerCase().endsWith("scheduled");
  const [card_hover, setCard_Hover] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setCard_Hover(true)}
      onMouseLeave={() => setCard_Hover(false)}
      initial={{ opacity: 0, scale: 0.2 }}
      animate={{ opacity: 1, scale: card_hover ? 1.02 : 1 }}
      transition={{ duration: 0.2, type: "tween" }}
      className="flex border border-lighter shadow-sm rounded-small w-full flex-row items-start justify-start gap-4 px-4 py-8"
    >
      <span
        style={{ "--cand_index": `'#${id + 1}'` }}
        className={`h-12 w-12 rounded-small after:absolute relative after:content-(--cand_index) after:top-[70%] after:left-[70%] after:text-xs after:w-4 after:h-4 after:rounded-xs after:bg-whiter after:shadow-sm after:flex after:items-center after:justify-center`}
      >
        <Image
          link={`https://ui-avatars.com/api/?name=M&background=dd6b20&color=fff`}
          class_name="w-full h-full rounded-small border border-lighter"
        />
      </span>
      <div className="flex flex-col items-start justify-center gap-4">
        <div className="flex flex-row items-center justify-start gap-4">
          <Label
            text={candidate.cand_name}
            class_name="text-sm text-secondary tracking-wide"
          />
          <SpanLabel
            text={candidate.status}
            class_name={`text-sm p-1 ${
              isRedColor
                ? "text-blue text-lg font-semibold bg-blueBackground px-2 rounded-small"
                : "text-red-dark text-lg font-semibold bg-red-light px-2 rounded-small"
            }`}
          />
        </div>
        <div className="flex flex-row items-center justify-start gap-2">
          {candidate.skills.map((skill, index) => (
            <Label
              key={index}
              text={skill}
              class_name="text-sm font-lighter bg-lighter px-2 rounded-small text-primary"
            />
          ))}
        </div>
        <div className="flex flex-row items-center justify-start gap-6 rounded-small">
          {Object.keys(candidate.more_info).map((key, index) => (
            <div
              className="p-4 gap-2 text-sm shadow-sm border border-lighter rounded-small flex flex-col items-start justify-center"
              key={index}
            >
              <div className="flex flex-row items-center text-sm text-blue justify-start gap-4 ">
                <Icon
                  icon={candidate.more_info[key].icon}
                  class_name="p-1 flex h-5 w-5"
                />
                <Label text={candidate.more_info[key].label} class_name="" />
              </div>
              <Label text={candidate.more_info[key].value} />
            </div>
          ))}
        </div>
        <div className="flex flex-row items-center justify-start gap-6 rounded-small w-full">
          {Object.keys(candidate.buttons).map((key, index) => (
            <div
              key={index}
              className={`flex flex-row items-center text-sm  ${
                key === "schedule"
                  ? "bg-blue text-white hover:bg-darkBlue"
                  : key === "comment"
                  ? "bg-blueBackground text-white hover:bg-blueBackground-hover"
                  : key === "offer"
                  ? "bg-Darkgold text-white hover:bg-Darkgold-hover"
                  : key === "reject"
                  ? "border border-lighter text-secondary hover:bg-lighter"
                  : ""
              } justify-center gap-1 px-3 py-1 rounded-small cursor-pointer transition-all duration-200 ease-in-out`}
            >
              <Icon
                icon={candidate.buttons[key].icon}
                class_name="p-1 flex h-5 w-5"
              />
              <Label text={candidate.buttons[key].btn_name} class_name="" />
            </div>
          ))}
          <i
            onClick={handleFlipEye}
            className={`ml-auto ${
              flip_eye ? "ri-eye-line" : "ri-eye-off-line"
            }`}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default OverviewCards;
