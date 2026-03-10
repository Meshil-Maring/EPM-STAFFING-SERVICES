import React from "react";
import Label from "../../../../common/Label";
import Icon from "../../../../common/Icon";

function PersonalInfo({ personal_info, heading_class }) {
  return (
    <div className="flex w-full flex-col items-start">
      <Label text={"Personal Information"} class_name={heading_class} />
      <div className="w-full grid-cols-2 grid items-center gap-4 justify-center">
        {personal_info.map((info, i) => {
          return (
            <div
              key={`personal_info-${i}`}
              className={`w-full flex flex-row text-xs items-center gap-1 p-2 rounded-small border border-lighter ${info.label === "Resume" || info.label === "Cover Letter" ? "" : "bg-b_light_blue"}`}
            >
              {info.label === "Resume" || info.label === "Cover Letter" ? (
                <>
                  <Icon
                    icon={info.icon}
                    class_name="w-8 h-8 text-2xl text-red-dark"
                  />
                  <div className="flex w-full flex-col leading-3 items-start justify-start">
                    <Label text={"PDF"} class_name={""} />
                    <Label text={info.label} class_name={""} />
                  </div>
                </>
              ) : (
                <>
                  <Icon
                    icon={info.icon}
                    class_name="w-8 h-8 text-xl font-light"
                  />
                  <div className="w-full flex flex-col items-start justify-start leading-3">
                    <Label text={info.label} class_name={""} />
                    <Label text={info.value} class_name={""} />
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PersonalInfo;
