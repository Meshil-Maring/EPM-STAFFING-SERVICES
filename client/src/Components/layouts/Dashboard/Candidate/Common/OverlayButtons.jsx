import React from "react";
import Button from "../../../../common/Button";

function OverlayButtons({ buttons, handleMainButton }) {
  return (
    <div className="w-full flex flex-row px-4 pb-4 items-center justify-end gap-4">
      {buttons.map((btn) => {
        const isCancel = btn === "Cancel";
        return (
          <Button
            onclick={handleMainButton}
            key={btn}
            text={btn}
            class_name={`px-2 py-1 rounded-small ${isCancel ? "border border-light hover:bg-lighter" : "bg-g_btn text-text_white"}`}
          />
        );
      })}
    </div>
  );
}

export default OverlayButtons;
