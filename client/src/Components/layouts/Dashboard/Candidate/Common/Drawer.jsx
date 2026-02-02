import React from "react";
import { motion } from "framer-motion";

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
    className="fixed inset-0 z-200 bg-light_black flex items-center justify-end"
  >
    <motion.div
      /* Prevents clicks inside the drawer from bubbling up and closing the overlay */
      onClick={(e) => e.stopPropagation()}
      /* Animation: Slides in from the right and fades in */
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      /* Animation: Slides back to the right when component is unmounted */
      exit={{ x: "100%", opacity: 0 }}
      /* Transition: 'tween' ensures a constant, smooth speed throughout the motion */
      transition={{ type: "tween", duration: 0.3 }}
      style={{ height }}
      /* Sidebar styling: Fixed width (32%), anchored to the right with a shadow */
      className="w-[32%] bg-b_white overflow-y-auto rounded-small mr-2 shadow-2xl"
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
    </motion.div>
  </div>
);

export default Drawer;
