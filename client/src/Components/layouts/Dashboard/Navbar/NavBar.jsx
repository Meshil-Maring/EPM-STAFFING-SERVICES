import React from "react";
import NavButtons from "./NavButtons";
import Icon from "../../../common/Icon";
import Label from "../../../common/Label";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <aside className="w-64 lg:w-80 px-4 py-4 gap-6 h-full flex flex-col items-center justify-start border-r border-lighter bg-white sticky top-0">
      <div
        onClick={() => navigate("/")}
        className="flex border-b pb-4 border-lighter w-full flex-row items-center justify-start gap-3 cursor-pointer group transition-all"
        role="banner"
      >
        <div
          className="bg-g_btn text-white rounded-small p-1.5 shadow-md group-hover:shadow-lg transition-shadow"
          aria-hidden="true"
        >
          <Icon icon="ri-building-line" class_name="text-2xl w-8 h-8" />
        </div>

        <div className="flex flex-col items-start justify-center">
          <Label
            as="h2"
            text="Total Consultancy"
            class_name="text-base font-bold text-text_b leading-none"
          />
          <Label
            as="span"
            text="Service Platform"
            class_name="text-xs text-text_b_l opacity-70 mt-1"
          />
        </div>
      </div>

      <nav
        className="w-full flex-1 overflow-y-auto"
        aria-label="Sidebar Navigation"
      >
        <NavButtons />
      </nav>
    </aside>
  );
}

export default Navbar;
