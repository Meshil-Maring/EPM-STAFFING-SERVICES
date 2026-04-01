import React, { useRef } from "react";
import Input from "../../../common/Input";
import Icon from "../../../common/Icon";
import Label from "../../../common/Label";

function RequirementsEditComponent({
  data_prop,
  updateReq_Res_Ben,
  icon_class,
  button,
  deletingReq_Res_Ben,
  addingReq_Res_Ben,
  id,
}) {
  // Stable keys — never change on typing, only on add/delete
  const stableKeysRef = useRef(
    data_prop.map((_, i) => `${id}-${i}-${Date.now() + i}`),
  );

  // Sync keys array length if data_prop grows (safety net)
  while (stableKeysRef.current.length < data_prop.length) {
    stableKeysRef.current.push(
      `${id}-${stableKeysRef.current.length}-${Date.now()}`,
    );
  }

  const handleDelete = (index) => {
    // Remove key at the deleted index so remaining keys stay in sync
    stableKeysRef.current.splice(index, 1);
    deletingReq_Res_Ben(id, index);
  };

  const handleAdd = () => {
    // Push a new unique key for the new item
    stableKeysRef.current.push(
      `${id}-${stableKeysRef.current.length}-${Date.now()}`,
    );
    addingReq_Res_Ben();
  };

  return (
    <div className="flex flex-col gap-3 w-full items-start justify-start">
      {data_prop.map((text, i) => (
        <div
          key={stableKeysRef.current[i]} // stable — never changes on typing
          className="w-full flex gap-1 flex-row items-center justify-start"
        >
          <Input
            id={`${i}:${id}`}
            default_value={text || ""}
            onchange={updateReq_Res_Ben}
            class_name="py-1 px-2 rounded-small border border-light/60 focus:outline-none focus:ring-1 ring-nevy_blue w-full"
          />
          <span
            className={`cursor-pointer transition-opacity ${
              data_prop.length === 1 ? "opacity-30 pointer-events-none" : ""
            }`}
            onClick={() => data_prop.length > 1 && handleDelete(i)}
          >
            <Icon icon="ri-close-line" class_name={icon_class} />
          </span>
        </div>
      ))}

      <div
        onClick={handleAdd}
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
