import React, { useContext, useEffect, useRef } from "react";
import ButtonIcon from "../../../common/ButtonIcon";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Icon from "../../../common/Icon";
import Label from "../../../common/Label";

function NavButtons() {
  const navigate = useNavigate();
  // Sync navigation bar with current URL and browser navigation

  const current_navButton =
    sessionStorage.getItem("current_navbutton") || "jobs";

  const onSelect = (name) => {
    name === "jobs" ? navigate(`/client/dashboard`) : navigate(name);
    sessionStorage.setItem("current_navbutton", name);
  };

  const buttons = [
    { id: "jobs", name: "Jobs", icon: "ri-suitcase-line" },
    {
      id: "offer_released",
      name: "Offer released",
      icon: "ri-file-check-line",
    },
    {
      id: "interview_pipeline",
      name: "Interview pipeline",
      icon: "ri-group-line",
    },
    { id: "settings", name: "Settings", icon: "ri-settings-5-line" },
  ];

  // Find the index of the active button for the indicator

  return (
    <div className="relative w-full h-full">
      {/* Smooth indicator bar */}
      <ul className="w-full h-full flex flex-col items-center justify-start gap-2 list-none p-1 m-0 overflow-y-auto">
        {buttons.map((button) => {
          const isActive = button.id === current_navButton;
          return (
            <li
              onClick={() => (
                onSelect(button.id),
                sessionStorage.setItem("current_navbutton", button.id)
              )}
              key={button.name}
              className={`w-full cursor-pointer py-1.5 flex flex-row items-center jsutify-center px-2 rounded-small space-x-1  ${
                isActive
                  ? "bg-g_btn text-text_white shadow-md"
                  : "border border-lighter text-primary hover:bg-lighter hover:border-g_btn hover:text-g_btn"
              } ${button.name === "Settings" ? "mt-auto" : ""}`}
            >
              <Icon icon={button.icon} class_name="" />
              <Label text={button.name} class_name={""} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default NavButtons;
