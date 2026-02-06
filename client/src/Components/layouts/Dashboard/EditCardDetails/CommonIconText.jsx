import React, { useContext, useEffect, useState } from "react";
import Icon from "../../../common/Icon";
import Label from "../../../common/Label";
import { Jobs_context } from "../../../../context/JobsContext";

function CommonIconText({
  priority,
  Card_index,
  heading,
  label,
  bg_color = "",
  id,
}) {
  const { updateJobs } = useContext(Jobs_context);
  //local checking or unchecking the urgent checkbox
  const [check, setCheck] = useState(priority);
  const onCheckboxChange = () => {
    const newValue = !check;
    setCheck(newValue);
    if (id === "checkbox") {
      updateJobs(Card_index, { priority: newValue });
    }
  };
  useEffect(() => {
    setCheck(priority);
  }, [priority]);

  return (
    <div
      className={`flex text-text_b flex-row gap-4 p-2 rounded-small w-full items-center justify-start border border-highLightBorder ${bg_color}`}
    >
      {id === "checkbox" ? (
        <input
          type={id}
          className={"w-5 h-5"}
          onChange={onCheckboxChange}
          checked={check}
        />
      ) : (
        <Icon
          icon={check ? "ri-check-line" : "ri-close-line"}
          class_name="font-semibold w-5 h-5 text-lg bg-b_white text-text border border-light"
        />
      )}
      <div className="flex flex-col items-start justify-start">
        <Label text={heading} class_name={"font-semibold text-lg"} />
        <Label text={label} class_name={"text-sm"} />
      </div>
    </div>
  );
}

export default CommonIconText;
