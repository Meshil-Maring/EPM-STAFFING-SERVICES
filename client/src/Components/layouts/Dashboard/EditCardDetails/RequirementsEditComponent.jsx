import React from "react";
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
  return (
    <div className="flex flex-col gap-3 w-full items-start justify-start">
      {data_prop.map((text, i) => (
        <div
          key={i}
          className="w-full flex gap-1 flex-row items-center justify-start"
        >
          <Input
            id={`${i}:${id}`}
            default_value={text || ""}
            onchange={updateReq_Res_Ben}
            class_name="py-1 px-2 rounded-small border border-light/60 focus:outline-none focus:ring-1 ring-nevy_blue w-full"
          />
          {i !== 0 && (
            <span
              className="cursor-pointer"
              onClick={() => deletingReq_Res_Ben(id, i)}
            >
              <Icon icon="ri-close-line" class_name={icon_class} />
            </span>
          )}
        </div>
      ))}

      <div
        onClick={addingReq_Res_Ben}
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
