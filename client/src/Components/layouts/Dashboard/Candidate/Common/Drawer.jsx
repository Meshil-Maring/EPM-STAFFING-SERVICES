import React from "react";

/**
 * Drawer is a generic layout wrapper that provides a sliding side-panel effect.
 * It handles the background overlay, click-to-close logic, and entry/exit animations.
 */
const Drawer = ({ children, closeOverlay, height = "90%" }) => (
  <div
    /* Background overlay: Click anywhere outside the panel to close it */
    onClick={(e) => {
      (closeOverlay(), e.stopPropagation());
    }}
    className="fixed inset-0 z-200 shadow-2xl flex items-center justify-center"
  >
    <div
      /* Prevents clicks inside the drawer from bubbling up and closing the overlay */
      onClick={(e) => e.stopPropagation()}
      style={{ height }}
      /* Sidebar styling: Fixed width (32%), anchored to the right with a shadow */
      className="w-[34%] bg-b_white rounded-small mr-2 shadow-2xl"
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
