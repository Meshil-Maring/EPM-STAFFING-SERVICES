import React, { useState } from "react";
import Icon from "../../common/Icon";
import Label from "../../common/Label";
import Requirements from "./Requirements";
import { motion } from "framer-motion";

function CardJobDetails() {
  const [hover, set_hover] = useState(false);
  return (
    <motion.div
      onMouseEnter={() => set_hover(true)}
      onMouseLeave={() => set_hover(false)}
      initial={{ opacity: 0, scale: 0.2 }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{ duration: 0.2, type: "tween", duration: 0.2 }}
      className={`gap-2 flex flex-row items-start justify-center my-4 w-full p-4 rounded-small bg-highlightBackground border-2 border-highLightBorder`}
    >
      <Icon
        icon="ri-suitcase-line"
        class_name="text-3xl rounded-small bg-goldGradient text-whiter w-10 h-10"
      />
      <div className="flex-1 flex flex-col items-start justify-center gap-4">
        <div className="w-full flex flex-col">
          <Label
            text="Position requirements"
            class_name="text-lg font-lighter tracking-wide"
          />
          <Label
            text="Full Stack Developer with 3-7 years of experience"
            class_name="text-xs tracking-wide text- font-lighter"
          />
        </div>
        <Requirements />
      </div>
    </motion.div>
  );
}

export default CardJobDetails;
