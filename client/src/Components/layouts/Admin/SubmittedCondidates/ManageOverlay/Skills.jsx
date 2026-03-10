import React from "react";
import Label from "../../../../common/Label";

function Skills({ skills, heading_class }) {
  return (
    <div className="w-full flex flex-col items-start justify-start">
      <Label text={"Skills"} class_name={heading_class} />
      <div className="w-full flex flex-row items-start justify-start gap-2">
        {skills.map((text, i) => {
          return (
            <Label
              key={`skill-${i}`}
              text={text}
              class_name={"px-2 py-1 rounded-small text-nevy_blue bg-blue-50"}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Skills;
