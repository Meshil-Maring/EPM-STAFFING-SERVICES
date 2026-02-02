import React, { useState } from "react";
import Icon from "../../../common/Icon";
import Input from "../../../common/Input";
import Label from "../../../common/Label";

function Common({ icon_class, heading, button, placeholder, onchange }) {
  const [data, setData] = useState([
    {
      text: placeholder,
    },
  ]);
  const handleDeleting = (i) => {
    const temp_data = [...data];
    if (temp_data.length != 1) {
      temp_data.splice(i, 1);
      setData(temp_data);
    }
  };
  const handleAdding = () => {
    setData([...data, { text: "" }]);
  };

  return (
    <div className="flex w-full flex-col items-start justify-start gap-0.5">
      <Label type="text" text={heading} class_name={"text-text_b_l"} />
      {data.map((el, i) => {
        return (
          <div
            key={i}
            className="flex flex-row items-center justify-center w-full gap-1"
          >
            <Input
              onchange={onchange}
              type={"text"}
              class_name={
                "border border-light focus:outline-none focus:ring-1 ring-nevy_blue w-full py-1 px-2 rounded-small"
              }
              placeholder={el.text}
            />
            <span
              type="icon"
              className="w-fit h-fit"
              onClick={() => handleDeleting(i)}
            >
              {i != 0 && (
                <Icon icon={"ri-close-line"} class_name={icon_class} />
              )}
            </span>
          </div>
        );
      })}
      <button
        onClick={handleAdding}
        type={"button"}
        className="text-nevy_blue cursor-pointer hover:font-medium transition-all ease-in-out duration-200 font-lighter"
      >
        {button}
      </button>
    </div>
  );
}

export default Common;
