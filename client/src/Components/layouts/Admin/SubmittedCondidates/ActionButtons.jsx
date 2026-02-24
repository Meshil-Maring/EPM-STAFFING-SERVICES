import { motion } from "framer-motion";
import Label from "../../../common/Label";

function ActionButtons({ onButtonClick }) {
  return (
    <div className="w-full flex flex-row items-center justify-center gap-4">
      {["Delete Candidate", "Save Changes"].map((text, index) => (
        <div
          key={index}
          onClick={() => onButtonClick(text)}
          className="w-full flex items-center justify-center cursor-pointer"
        >
          <Label
            text={text}
            class_name={`py-2 px-4 w-full text-center font-semibold rounded-small text-[clamp(1em,1.5vw,1.2em)] text-text_white bg-g_btn`}
          />
        </div>
      ))}
    </div>
  );
}

export default ActionButtons;
