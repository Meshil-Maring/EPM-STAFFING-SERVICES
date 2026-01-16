import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Label from "../../common/Label";

function Already_have_account() {
  return (
    <div className="flex flex-row items-center justify-center gap-2 w-full">
      <Label
        as="span"
        text="Already have an account?"
        class_name="text-sm text-text_b_l"
      />

      <Link
        to="/auth/signin"
        aria-label="Navigate to the login page"
        className="outline-none focus-visible:ring-2 focus-visible:ring-nevy_blue rounded-sm"
      >
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
          <Label
            as="span"
            text="Log in"
            class_name="font-semibold text-sm text-nevy_blue border-b border-nevy_blue hover:text-blue-700 transition-colors"
          />
        </motion.span>
      </Link>
    </div>
  );
}

export default Already_have_account;
