import React from "react";
import Input from "../../../common/Input";
import Icon from "../../../common/Icon";
import Button from "../../../common/Button";
import Label from "../../../common/Label";

function SkillsSection({
  skills,
  handleSkillChange,
  handleAddSkill,
  handleRemoveSkill,
  input_class,
  label_class,
}) {
  return (
    <div className="w-full flex flex-col items-start justify-start gap-2">
      <Label
        text={"Skills & Expertise"}
        class_name={`${label_class} border-b border-lighter w-full pb-1 mb-2`}
      />
      <div className="w-full flex flex-col items-center justify-start gap-2">
        {skills.map((value, i) => (
          <div
            key={`skill-${i}`}
            className="w-full flex flex-row items-center justify-between gap-1"
          >
            <Input
              id={i}
              type={"text"}
              class_name={input_class}
              value={value || ""}
              onchange={handleSkillChange}
            />
            <span
              onClick={() => handleRemoveSkill(i)}
              className={`w-5 h-5 p-2 cursor-pointer rounded-full overflow-hidden font-semibold text-sm hover:text-red-dark hover:bg-red-light transition-all ease-in-out duration-200 flex items-center justify-center ${skills.length === 1 ? "pointer-events-none opacity-60" : ""}`}
            >
              <Icon
                icon={"ri-close-line"}
                class_name="w-full h-full rounded-full"
              />
            </span>
          </div>
        ))}
      </div>
      <Button
        onclick={handleAddSkill}
        text={"+ Add Skill"}
        class_name="text-nevy_blue font-lighter"
      />
    </div>
  );
}

export default SkillsSection;
