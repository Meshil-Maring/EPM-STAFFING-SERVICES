import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Label from "../../common/Label";

function Already_have_account() {
  const [spanHover, setSpanHover] = useState(false);

  return (
    <div className="flex flex-row items-center justify-center gap-2 w-full">
      <Label text="Already have an account?" />
      <Link to={"/api/auth/signin"}>
        <motion.span
          whileHover={{
            scale: spanHover ? 1.08 : 1,
            transition: {
              ease: "easeInOut",
              duration: 0.2,
              type: "tween",
            },
          }}
          onMouseEnter={() => setSpanHover(true)}
          onMouseLeave={() => setSpanHover(false)}
          className="cursor-pointer"
        >
          <Label
            text="Log in"
            class_name="font-semibold hover:font-bold transition-all ease-in-out duration-120 text-sm text-nevy_blue border-b border-nevy_blue"
          />
        </motion.span>
      </Link>
    </div>
  );
}

export default Already_have_account;
