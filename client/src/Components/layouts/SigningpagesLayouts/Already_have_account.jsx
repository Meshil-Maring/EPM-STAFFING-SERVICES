import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Label from "../../common/Label";
import Button from "../../common/Button";
import { useNavigate } from "react-router-dom";

function Already_have_account() {
  const navigate = useNavigate();
  const handleClicking = (name) => {
    if (name === "Log in") {
      const path = "/api/auth/signin";
      navigate(path);
    }
  };
  return (
    <div className="flex flex-row items-center justify-center gap-2 w-full">
      <Label
        as="span"
        text="Already have an account?"
        class_name="text-sm text-text_b_l"
      />

      <motion.span
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 17,
        }}
        className="inline-block cursor-pointer"
      >
        <Button
          text="Log in"
          onclick={handleClicking}
          class_name="font-semibold text-sm text-nevy_blue border-b border-nevy_blue hover:text-blue-700 transition-colors"
        />
      </motion.span>
    </div>
  );
}

export default Already_have_account;
