import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../../common/Icon";
import Label from "../../../common/Label";
import { useLocation } from "react-router-dom";

function NavButtons() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [nav_btn, setNav_btn] = useState("jobs");
  // Sync navigation bar with current URL and browser navigation

  useEffect(() => {
    const section = pathname.split("/").at(-1);
    if (section.toLocaleLowerCase() === "dashboard") setNav_btn("jobs");
    else setNav_btn(section.toLocaleLowerCase());
    // to be finaliezed later
  }, [pathname]);

  const onSelect = (name) => {
    name === "jobs" ? navigate(`/client/dashboard`) : navigate(name);
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
          const isActive = button.id === nav_btn;
          return (
            <li
              onClick={() => (
                onSelect(button.id),
                sessionStorage.setItem("current_navbutton", button.id)
              )}
              key={button.name}
              className={`w-full cursor-pointer p-2 flex flex-row items-center jsutify-center rounded-large space-x-1  ${
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
