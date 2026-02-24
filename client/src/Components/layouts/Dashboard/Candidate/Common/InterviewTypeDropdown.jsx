import React from "react";
import Label from "../../../common/Label";
import Icon from "../../../common/Icon";
import Input from "../../../common/Input";

/**
 * Custom dropdown for selecting the interview format (Online, Offline, On Call).
 * Contributor Note: Uses a Ref-based click-outside listener managed in the parent.
 */
function InterviewTypeDropdown({
  value,
  isOpen,
  setIsOpen,
  onSelect,
  innerRef,
  style,
}) {
  return (
    <div className="w-full flex flex-col items-start justify-start relative">
      <Label text="Interview Type" />
      <div
        ref={innerRef}
        className="flex relative w-full cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Input id="interview_type" read_only value={value} class_name={style} />
        <span className="absolute top-0 bottom-0 right-2 flex items-center">
          <Icon icon={isOpen ? "ri-arrow-up-s-line" : "ri-arrow-down-s-line"} />
        </span>

        {isOpen && (
          <div className="absolute bg-white border border-lighter shadow-lg z-[2000] rounded-small w-full top-full mt-1 overflow-hidden">
            {["Online", "Offline", "On Call"].map((type) => (
              <div
                key={type}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(type);
                  setIsOpen(false);
                }}
                className="w-full px-3 py-2 hover:bg-lighter transition-colors"
              >
                <Label text={type} class_name="cursor-pointer text-sm" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default InterviewTypeDropdown;
