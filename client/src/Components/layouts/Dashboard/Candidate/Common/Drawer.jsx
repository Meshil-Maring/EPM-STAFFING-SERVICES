import React from "react";

/**
 * Drawer is a generic layout wrapper that provides a sliding side-panel effect.
 * It handles the background overlay, click-to-close logic, and entry/exit animations.
 */
const Drawer = ({ children, closeOverlay }) => (
  <div
    /* Background overlay: Click anywhere outside the panel to close it */
    onClick={(e) => {
      (closeOverlay(), e.stopPropagation());
    }}
    className="fixed inset-0 z-200 shadow-2xl bg-light_black flex items-center justify-center p-4"
  >
    <div
      /* Prevents clicks inside the drawer from bubbling up and closing the overlay */
      onClick={(e) => e.stopPropagation()}
      className={`w-[34%] max-h-full bg-b_white rounded-small overflow-y-auto overflow-x-hidden no-scrollbar shadow-2xl`}
    >
      <div
        /* Add click handler to close modal when clicking the drawer content area */
        onClick={(e) => {
          // Stop event propagation to prevent triggering parent onClick handlers
          e.stopPropagation();
          // Only close if clicking the drawer background, not interactive elements
          if (e.target === e.currentTarget) {
            closeOverlay();
          }
        }}
        className="h-full"
      >
        {children}
      </div>
    </div>
  </div>
);

export default Drawer;
