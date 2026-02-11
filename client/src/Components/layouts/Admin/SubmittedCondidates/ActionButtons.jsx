import { motion } from "framer-motion";
import Label from "../../../common/Label";

function ActionButtons({ onButtonClick }) {
  return (
    <div className="w-full flex flex-row items-center justify-center gap-4">
      {["Delete Candidate", "Save Changes"].map((text, index) => (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            delay: index * 0.5,
            type: "tween",
          }}
          key={index}
          onClick={() => onButtonClick(text)}
          className="w-full flex items-center justify-center cursor-pointer"
        >
          <Label
            text={text}
            class_name={`py-2 px-4 w-full text-center font-semibold rounded-small text-[clamp(1em,1.5vw,1.2em)] text-text_white bg-g_btn`}
          />
        </motion.div>
      ))}
    </div>
  );
}

export default ActionButtons;
