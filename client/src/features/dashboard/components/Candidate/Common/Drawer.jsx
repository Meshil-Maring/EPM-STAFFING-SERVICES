import React from "react";
import Overlay from "../../../../../shared/components/ui/Overlay";

const Drawer = ({ children, closeOverlay }) => (
  <Overlay onClose={closeOverlay} className="z-200 p-4 items-center justify-center">
    <div
      onClick={(e) => e.stopPropagation()}
      className="w-[34%] max-h-full bg-b_white rounded-small overflow-y-auto overflow-x-hidden no-scrollbar shadow-2xl"
    >
      {children}
    </div>
  </Overlay>
);

export default Drawer;
