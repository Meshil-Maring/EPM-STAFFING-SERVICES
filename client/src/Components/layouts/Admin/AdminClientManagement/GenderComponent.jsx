import React, { useEffect, useState, useRef } from "react";
import Input from "../../../common/Input";
import Label from "../../../common/Label";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "../../../common/Icon";
function GenderComponent({ handleInputChange, el, class_name, gender }) {
  // targeting the dropdown menu for closing it when clicking outside
  const target_gender = useRef();
  // local value for gender
  const [value, setValue] = useState(gender);
  //   update parent component when value changes and on first render
  useEffect(() => {
    handleInputChange(value, "gender");
  }, [value]);

  //   useEffect: for closing the dropdown menu when clicking outside
  useEffect(() => {
    const target = target_gender.current;
    if (!target) return;
    const updateClick = (e) => {
      if (!target.contains(e.target)) {
        setExpand(false);
      }
    };

    document.addEventListener("mousedown", updateClick);
    return () => document.removeEventListener("mousedown", updateClick);
  }, []);

  //   state to toggle the expansion of the dropdown mennu
  const [expand, setExpand] = useState(false);

  const toggleExpand = () => {
    setExpand((prev) => !prev);
  };

  return (
    <AnimatePresence mode="wait">
      <div
        ref={target_gender}
        onClick={toggleExpand}
        className="w-full flex relative"
      >
        <Icon
          icon="ri-arrow-down-s-line"
          class_name={`font-light text-sm absolute right-2 top-0 bottom-0 flex items-center justify-center transition-all ease-in-out duration-150 ${expand ? "rotate-180" : ""}`}
        />
        <Input type={el.type} class_name={class_name} value={value} />
        <motion.div
          initial={{ opacity: 0, height: 0.95 }}
          animate={
            expand
              ? { opacity: 1, height: "auto" }
              : { opacity: 0, height: 0.95 }
          }
          transition={{
            ease: "easeInOut",
            type: "tween",
            duration: 0.2,
          }}
          className="flex min-w-[60%] z-200 bg-b_white absolute overflow-hidden top-full right-0 flex-col items-start justify-start px-2 py-1 rounded-small shadow-lg border-light border"
        >
          {["male", "female", "other"].map((item) => {
            return (
              <span onClick={() => setValue(item)} key={item}>
                <Label text={item} class_name=" w-full px-1 py-0.5" />
              </span>
            );
          })}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default GenderComponent;
