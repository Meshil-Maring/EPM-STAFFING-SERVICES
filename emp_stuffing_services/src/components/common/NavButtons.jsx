import React from "react";

function NavButtons({ button }) {
  return (
    <div className="w-60 h-fit flex text-primary gap-2 flex-row items-center justify-start text-xl py-1 px-3 rounded-md bg-btn-gradient text-btn-primary font-sans ">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d={button.path}
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <button>{button.name}</button>
    </div>
  );
}

export default NavButtons;
