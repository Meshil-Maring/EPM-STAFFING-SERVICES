import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
/**
 * Container component for Job Form with click-outside handling
 */
function JobFormContainer({ children }) {
  const targetRef = React.useRef(null);
  const containerRef = React.useRef(null);
  const navigate = useNavigate();

  // smooth popping of overlay manager
  useEffect(() => {
    const container = containerRef.current;
    const target = targetRef.current;
    if (!target || !container) return;

    const onclick = (e) => {
      if (!target.contains(e.target)) {
        navigate("/client/dashboard");
      }
    };

    container.addEventListener("mousedown", onclick);
    return () => container.removeEventListener("mousedown", onclick);
  }, [navigate]);

  return (
    <div
      ref={containerRef}
      className="w-full h-dvh absolute top-0 left-0 z-20000 flex items-center justify-end bg-slate-900/60"
    >
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: "30%", opacity: 1 }}
        exit={{
          width: 0,
          opacity: 0,
        }}
        transition={{ duration: 0.2, ease: "easeInOut", type: "tween" }}
        ref={targetRef}
        className="overflow-x-hidden overflow-y-auto bg-b_white border rounded-small mr-4 border-lighter h-[90%]"
      >
        {children}
      </motion.div>
    </div>
  );
}

export default JobFormContainer;
