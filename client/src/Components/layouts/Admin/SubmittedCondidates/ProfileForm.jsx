import React from "react";
import Label from "../../../common/Label";
import Input from "../../../common/Input";

function ProfileForm({ elements, input_class, handleInputChange }) {
  return (
    <div className="w-full grid grid-cols-2 gap-4">
      {elements.map((el, i) => {
        const isDOB = el.label === "D.O.B";
        const isNoticeDate = el.label === "Notice Period";
        const type = isDOB || isNoticeDate ? "date" : "text";

        return (
          <div
            key={i}
            className="flex flex-col w-full items-start justify-center"
          >
            <Label text={el.label} class_name={"text-sm font-medium"} />
            <Input
              onchange={handleInputChange}
              default_value={el.value}
              type={type}
              id={el.id}
              class_name={input_class}
            />
          </div>
        );
      })}
    </div>
  );
}

export default ProfileForm;
