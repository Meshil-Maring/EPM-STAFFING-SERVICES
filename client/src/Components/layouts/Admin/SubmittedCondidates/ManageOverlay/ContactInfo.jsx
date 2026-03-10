import React from "react";
import Label from "../../../../common/Label";
import Icon from "../../../../common/Icon";

function ContactInfo({ contact_info, heading_class }) {
  return (
    <div className="flex flex-col items-start justify-start w-full">
      <Label text={"Contact Information"} class_name={heading_class} />
      <div className="w-full grid-cols-2 grid gap-4 items-center justify-center">
        {contact_info.map((info, i) => {
          return (
            <div
              className="w-full p-1 flex flex-row items-start justify-start bg-b_light_blue rounded-small border border-lighter overflow-hidden"
              key={`contact_info-${i}`}
            >
              <Icon
                icon={info.icon}
                class_name="font-lighter text-xl flex-shrink-0"
              />
              <div className="flex w-full leading-4 flex-col items-start overflow-hidden">
                <Label text={info.label} class_name={""} />
                <Label
                  text={info.value}
                  class_name={"truncate w-full text-ellipsis"}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ContactInfo;
