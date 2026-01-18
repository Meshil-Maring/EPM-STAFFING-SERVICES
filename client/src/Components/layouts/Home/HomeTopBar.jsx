import React, { useContext } from "react";
import Image from "../../common/Image";
import ColumnLabels from "./ColumnLabels";
import Button from "../../common/Button";
import { useNavigate } from "react-router-dom";

function HomeTopBar() {
  const navigate = useNavigate();
  const handleBtnClick = (name) => {
    if (name === "Login") {
      const path = "/api/auth/signin";
      navigate(path);
    } else if (name === "Get Started") {
      const path = "/api/auth/signup";
      navigate(path);
    }
  };

  return (
    <header className="w-full py-2 px-4 flex flex-row items-center justify-between sticky shadow-xl left-0 top-0 bg-hover-light backdrop-blur-md z-50 border-b border-lighter">
      <div
        className="flex flex-row items-center justify-center gap-3 cursor-pointer"
        onClick={() => navigate("/")}
        role="button"
        aria-label="Home"
        tabIndex={0}
      >
        <Image
          link="https://i.ibb.co/LDNxqKYW/Logo-EPM-1.png"
          alt="EMP Staffing Logo"
          width="64"
          height="64"
          class_name="w-12 h-12 md:w-14 md:h-14 rounded-full object-contain shadow-sm"
        />
        <ColumnLabels
          heading="EMP STAFFING SERVICES"
          label="OPC PVT. LTD."
          heading_style="text-lg md:text-2xl font-bold tracking-tight text-text_b"
          label_style="text-sm md:text-md text-text_b_l opacity-75"
        />
      </div>

      <nav
        className="flex flex-row gap-3 items-center"
        aria-label="Primary Navigation"
      >
        <Button
          onclick={() => handleBtnClick("Login")}
          type="button"
          text="Login"
          class_name="text-sm md:text-base font-medium text-text_b hover:text-red transition-colors px-4 py-2 focus:ring-2 focus:ring-red/20 outline-none"
        />

        <Button
          onclick={() => handleBtnClick("Get Started")}
          type="button"
          text="Get Started"
          class_name="text-sm md:text-base px-5 py-2.5 bg-red text-text_white font-semibold rounded-small shadow-md shadow-red/20 hover:bg-red-dark transition-all active:scale-95 focus:ring-4 focus:ring-red/30 outline-none"
        />
      </nav>
    </header>
  );
}

export default HomeTopBar;
