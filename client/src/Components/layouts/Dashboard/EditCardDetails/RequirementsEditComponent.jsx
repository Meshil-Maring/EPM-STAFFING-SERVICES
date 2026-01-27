import React, { useState, useEffect, useContext } from "react";
import Input from "../../../common/Input";
import Icon from "../../../common/Icon";
import Label from "../../../common/Label";
import { Jobs_context } from "../../../../context/JobsContext";

function RequirementsEditComponent({
  data_prop = [],
  icon_class,
  button,
  id,
  Card_index,
}) {
  const { updateJobs } = useContext(Jobs_context);
  const [data, setData] = useState(data_prop);

  useEffect(() => {
    setData(data_prop);
  }, [data_prop]);

  const handleUpdate = (newValue, index) => {
    const updated = data.map((item, i) => (i === index ? newValue : item));
    setData(updated);
    updateJobs(Card_index, id, updated);
  };

  const handleDeleting = (index) => {
    const updated = data.filter((_, i) => i !== index);
    setData(updated);
    updateJobs(Card_index, id, updated);
  };

  const handleAdding = () => {
    const updated = [...data, ""];
    setData(updated);
    updateJobs(Card_index, id, updated);
  };

  return (
    <div className="flex flex-col gap-3 w-full items-start justify-start">
      {data.map((text, i) => (
        <div
          key={i}
          className="w-full flex gap-1 flex-row items-center justify-start"
        >
          <Input
            id={i}
            value={text}
            onchange={handleUpdate}
            class_name="py-1 px-2 rounded-small border border-nevy_blue focus:outline-none focus:ring-1 ring-nevy_blue w-full"
          />
          {i !== 0 && (
            <span className="cursor-pointer" onClick={() => handleDeleting(i)}>
              <Icon icon="ri-close-line" class_name={icon_class} />
            </span>
          )}
        </div>
      ))}

      <div
        onClick={handleAdding}
        className="cursor-pointer hover:scale-105 transition-all"
      >
        <Label
          class_name="font-lighter text-sm text-nevy_blue"
          text={button || "+ Add Item"}
        />
      </div>
    </div>
  );
}

export default RequirementsEditComponent;
