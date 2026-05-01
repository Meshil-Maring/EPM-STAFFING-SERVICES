import React, { useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Icon from "../../common/Icon";
import Label from "../../common/Label";
import { useAuth } from "../../../hooks/useAuth";

function Signup_Feedback({ role, onClose }) {
  const navigate = useNavigate();
  const { refetch } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleNavigation = async () => {
    if (loading) return;
    setLoading(true);

    const freshSession = await refetch();
    const freshRole = freshSession?.data?.role ?? role;

    onClose(false);
    navigate(freshRole === "admin" ? "/admin/management" : "/client/dashboard");
  };

  return createPortal(
    <div className="absolute p-4 text-sm top-0 left-0 inset-0 bg-light_black z-200 flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2, ease: "easeInOut", type: "tween" }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="bg-b_white p-4 w-74 rounded-xl gap-4 flex flex-col items-center justify-center"
        >
          <span className="w-14 h-14 flex items-center justify-center rounded-full font-lighter text-text_white bg-bg_brown">
            <Icon icon="ri-check-line" class_name="text-4xl" />
          </span>

          <Label
            text="Registration Successful"
            class_name="font-bold text-lg"
          />

          <Label
            text="Thank you for registering your company. Your account has been created and is ready to use."
            class_name="w-full text-center"
          />

          <div
            onClick={handleNavigation}
            className={`w-full bg-g_btn transition-all duration-150 ease-in-out text-text_white rounded-sm flex flex-row items-center justify-center gap-1 py-1 font-lighter text-lg ${
              loading
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer hover:scale-[1.02]"
            }`}
          >
            <Label text={loading ? "Loading..." : "Go to Dashboard"} />
            <Icon icon="ri-arrow-right-line" />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>,
    document.body,
  );
}

export default Signup_Feedback;
