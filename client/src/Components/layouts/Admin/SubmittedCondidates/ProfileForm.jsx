import { motion } from "framer-motion";
import Label from "../../../common/Label";
import Input from "../../../common/Input";

function ProfileForm({ elements, input_class }) {
  return (
    <div className="w-full grid grid-cols-2 gap-4">
      {elements.map((el, i) => {
        const isDOB = el.label === "D.O.B";
        const isNoticeDate = el.label === "Notice Period";
        const type = isDOB || isNoticeDate ? "date" : "text";

        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05, type: "tween" }}
            key={i}
            className="flex flex-col w-full items-start justify-center"
          >
            <Label text={el.label} class_name={"text-sm font-medium"} />
            <Input
              default_value={el.value}
              type={type}
              class_name={input_class}
            />
          </motion.div>
        );
      })}
    </div>
  );
}

export default ProfileForm;
