import React from "react";
import ButtonIcon from "../../common/ButtonIcon";
import Icon from "../../common/Icon";
import LogoHeadings from "./LogoHeadings";
import Label from "../../common/Label";

function HeaderLayouts() {
  const handleAction = (name) => {
    toast.warning(`Action: ${name}`);
  };

  return (
    <header className="flex pr-9 pl-5 py-2 border-b border-lighter flex-row items-center justify-start shadow-lg sticky top-0 bg-white z-40">
      <nav
        className="w-full flex flex-row items-center justify-between"
        aria-label="Main Header"
      >
        <LogoHeadings />

        <div className="flex flex-row gap-5 items-center justify-end ml-auto">
          <a
            href="/Empanelment_Agreement.pdf"
            rel="noopener noreferrer"
            target="_blank"
            className="py-1 px-4 rounded-small flex flex-row items-center justify-center space-x-1 bg-g_btn text-text_white"
          >
            <Icon icon={"ri-file-text-line"} class_name="" />
            <Label text={"Agreement"} class_name={""} />
          </a>

          <div
            onClick={() => handleAction("Notifications")}
            className="relative w-8 h-8 flex items-center justify-center p-2 rounded-full hover:bg-gray-100 transition-colors outline-none focus:ring-2 focus:ring-Darkgold"
            aria-label="View 1 new notification"
          >
            <Icon
              icon="ri-notification-4-line"
              class_name="text-lg text-text_b"
            />
            <span
              className="absolute top-1 right-1 w-2 h-2 rounded-full bg-Darkgold border-2 border-white"
              aria-hidden="true"
            />
          </div>

          <div className="flex flex-row items-center gap-3">
            <div className="relative">
              <button
                type="button"
                onClick={() => handleAction("Profile")}
                className="w-10 h-10 rounded-full p-0.5 bg-g_btn text-white hover:opacity-90 transition-opacity outline-none focus:ring-2 focus:ring-Darkgold"
                aria-label="User Profile"
              >
                <div className="w-full h-full rounded-full flex items-center justify-center overflow-hidden">
                  <Icon icon="ri-user-line" class_name="text-2xl" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default HeaderLayouts;
