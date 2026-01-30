import React, { useState } from "react";
import Label from "./Label";
import Input from "./Input";
import Icon from "./Icon";
import { motion, AnimatePresence } from "framer-motion";
function LabelInput({
  onchange,
  id,
  text,
  placeholder,
  label_class_name = "",
  input_class_name = "",
  type,
  value,
  auto_complete,
}) {
  // re writing the date to YYYY-MM-DD
  const isDate = (value) => {
    if (!value || typeof value !== "string") return "";
    if (!value.includes("/")) return value;
  };
  if (id === "application_deadline") {
    if (isDate(value)) {
      const [day, month, year] = value.split("/");
      const fullYear = year?.length === 2 ? `20${year}` : year;
      const newValue = `${fullYear}-${month}-${day}`;
      value = newValue;
    }
  }

  const [isSelect, setIsSelect] = useState(false);
  const [selected, setSelected] = useState("Full-time");
  const handleSelecting = () => {
    setIsSelect(!isSelect);
  };
  const handleChoosing = (item) => {
    setSelected(item);
    setIsSelect(false);
  };
  const handleInputChange = (e) => {
    const value = e.target.value;
    onchange(value, id);
  };

  const list = ["Full-time", "Part-time", "Free-Lencer"];
  return (
    <div className="flex relative flex-col gap-0.5 items-start justify-start w-full">
      <Label text={text} class_name={label_class_name} />
      <div className="w-full">
        {id === "contract_type" ? (
          <div className={` relative w-full`}>
            <input
              placeholder={placeholder}
              className={input_class_name}
              id={id}
              type={"text"}
              value={selected}
              onChange={(e) => handleInputChange(e)}
            />
            <span
              onClick={handleSelecting}
              className="w-fit h-fit absolute top-0 right-1 cursor-pointer"
            >
              <Icon
                class_name=""
                icon={`${isSelect ? "ri-arrow-up-s-line" : "ri-arrow-down-s-line"}`}
              />
            </span>
            {isSelect && (
              <AnimatePresence>
                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  transition={{
                    duration: 0.5,
                    type: "spring",
                    stiffness: 120,
                    ease: "easeInOut",
                  }}
                  className="absolute top-full right-0 w-[60%] py-4 bg-b_white border border-lighter shadow-xl rounded-small p-2 flex flex-col items-center"
                >
                  <ul className="gap-2 flex flex-col w-full items-center justify-center">
                    {list.map((item, index) => (
                      <motion.li
                        initial={{
                          opacity: 0,
                          y: 40,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        transition={{
                          duration: 0.2,
                          delay: index * 0.2,
                        }}
                        className="w-full h-full pl-2 hover:bg-hover-light cursor-pointer"
                        key={index}
                        onClick={() => handleChoosing(item)}
                      >
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        ) : (
          <Input
            placeholder={placeholder}
            class_name={input_class_name}
            require={true}
            id={id}
            type={type || "text"}
            onchange={onchange}
            value={value}
            autoComplete={auto_complete}
          />
        )}
      </div>
    </div>
  );
}

export default LabelInput;
