import React, { useEffect, useRef, useState } from "react";
import Input from "../Components/common/Input";
import Icon from "../Components/common/Icon";
import Label from "../Components/common/Label";

function ContractType_input({
  element,
  handleInputChange,
  input_class,
  label_class,
}) {
  const targetRef = useRef(null);
  const [show, setShow] = useState(false);
  const [contract, setContract] = useState("Full-time");
  useEffect(() => {
    handleInputChange(contract, "contract type");
  }, []);

  useEffect(() => {
    const target = targetRef.current;

    const updateClick = (e) => {
      if (!target) return;
      if (!target.contains(e.target)) {
        setShow(false);
      }
    };

    window.addEventListener("mousedown", updateClick);
    return () => window.removeEventListener("mousedown", updateClick);
  }, []);
  return (
    <div className="w-full flex flex-col">
      <Label text={element.label} class_name={label_class} />
      <div
        ref={targetRef}
        onClick={() => setShow((prev) => !prev)}
        className="w-full flex relative cursor-pointer"
      >
        <Input
          read_only={true}
          value={contract}
          id={element.id}
          class_name={`cursor-pointer ${input_class}`}
        />
        <div
          className={`h-4 w-4 absolute top-0 bottom-0 right-2 flex items-center justify-center my-auto transition-transform duration-200 ${
            show ? "rotate-180" : ""
          }`}
        >
          <Icon
            icon={"ri-arrow-down-s-line"}
            class_name="w-full h-full flex items-center justify-center font-lighter text-lg"
          />
        </div>
        {show && (
          <div className="w-fit p-2 absolute gap-1 right-0 top-full z-20 rounded-small bg-lighter shadow-sm flex flex-col items-center justify-start">
            {["Full-time", "Part-time", "Freelencer"].map((el, i) => {
              return (
                <div
                  onClick={(e) => {
                    (e.stopPropagation(),
                      (setContract(el),
                      handleInputChange(el, "contract type"),
                      setShow(false)));
                  }}
                  key={el}
                  className="w-full hover:scale-[1.05] transition-all duration-120 ease-in-out cursor-pointer"
                >
                  <Label
                    text={el}
                    class_name={
                      "w-full hover:bg-lighter transition-all duration-200 ease-in-out"
                    }
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default ContractType_input;
