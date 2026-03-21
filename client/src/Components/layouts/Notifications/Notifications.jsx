import React, { useState } from "react";
import Label from "../../common/Label";
import Icon from "../../common/Icon";

function Notifications({ onClose, notes }) {
  return (
    <div
      onClick={() => onClose(false)}
      className="absolute z-200 top-0 left-0 inset-0 flex items-center justify-center bg-light_black"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[80%] sm:w-[60%] max-h-[80%] md:w-[50%] overflow-hidden lg:w-[40%] bg-b_white rounded-sm"
      >
        <header className="w-full py-2 px-4 flex flex-row items-center justify-between bg-g_btn text-text_white text-sm font-semibold">
          <div className="flex flex-col items-start justify-start">
            <Label text="Notification" class_name="text-lg" />
            <div className="flex flex-row items-center justify-start space-x-1">
              <Label text={notes.length} class_name="text-sm font-lighter" />
              <Label
                text="sealed notifications"
                class_name="text-sm font-lighter"
              />
            </div>
          </div>
          <span
            onClick={() => onClose(false)}
            className="w-8 h-8 transition-all duration-150 ease-in-out hover:rotate-90 rounded-full cursor-pointer hover:bg-b_white/30 p-1 flex items-center justify-center"
          >
            <Icon
              icon="ri-close-line"
              class_name="w-full h-full flex items-center justify-center"
            />
          </span>
        </header>
        {notes.length === 0 ? (
          <div className="w-full h-full flex-col p-4 flex items-center justify-center bg-gray-200 text-light_black font-semibold text-sm space-y-2">
            <Icon
              icon="ri-notification-3-line"
              class_name="p-2 rounded-full text-lg bg-gray-300 w-10 h-10 text-text_b/60"
            />
            <Label text="No Notifications" />
          </div>
        ) : (
          <div className="flex-1 p-4 h-full w-full"></div>
        )}
      </div>
    </div>
  );
}

export default Notifications;
