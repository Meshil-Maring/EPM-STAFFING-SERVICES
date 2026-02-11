import React from "react";
import Icon from "../../common/Icon";
import Label from "../../common/Label";

/**
 * Action buttons component for Settings page (Cancel and Save All Changes)
 */
function SettingsActions({ onSave, onCancel }) {
  const buttons = ["Cancel", "Save All Changes"];
  const handleBtnClick = (name) => {
    switch (name) {
      case "Cancel":
        onCancel();
        break;
      case "Save All Changes":
        onSave();
        break;
      default:
        alert("Error");
    }
  };
  return (
    <div className="sticky bottom-0 ml-auto flex items-center justify-center gap-4 flex-row bg-b_white/50 p-2 rounded-small">
      {buttons.map((btn) => {
        const isCancel = btn === "Cancel";
        return (
          <div
            key={btn}
            onClick={() => handleBtnClick(btn)}
            className={`shadow-sm font-lighter text-[clamp(1em,2vw,1.2em)] hover:scale-[1.05] transition-all duration-120 ease-in-out cursor-pointer rounded-small flex flex-row items-center justify-center py-1.5 px-4 ${isCancel ? "border border-lighter" : "bg-g_btn text-text_white"}`}
          >
            {!isCancel && (
              <Icon icon={"ri-save-line"} class_name="w-5 h-5 mr-1" />
            )}
            <Label text={btn} class_name={``} />
          </div>
        );
      })}
    </div>
  );
}

export default SettingsActions;
