import React, { useContext, useEffect, useRef, useState } from "react";
import Label from "../../../common/Label";
import { Candidates_context } from "../../../../context/CandidatesContext";
import CandidateCard from "./CandidateCard";
import { motion } from "framer-motion";
import Icon from "../../../common/Icon";

function OfferReleased() {
  const { candidates } = useContext(Candidates_context);
  const containerRef = useRef(null);
  const [isScroll, setIsScroll] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateScroll = () => {
      setIsScroll(container.scrollTop > 20);
    };

    container.addEventListener("scroll", updateScroll, { passive: true });
    return () => container.removeEventListener("scroll", updateScroll);
  }, []);

  const offeredCandidates = Object.values(candidates).filter(
    (candidate) => candidate["released date"] !== null,
  );

  return (
    <section
      ref={containerRef}
      className="w-full h-full overflow-y-auto flex flex-col items-start bg-white justify-start gap-2 scroll-smooth"
    >
      <motion.header
        animate={{
          backgroundColor: isScroll
            ? "rgba(255, 255, 255, 0.8)"
            : "rgba(255, 255, 255, 0)",
          boxShadow: isScroll
            ? "0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)"
            : "0 0px 0px rgba(0, 0, 0, 0)",
          borderBottom: isScroll
            ? "1px solid #f1f5f9"
            : "1px solid transparent",
        }}
        transition={{ duration: 0.2 }}
        className="w-full sticky top-0 z-20 flex flex-row items-center justify-between backdrop-blur-md px-10 py-6"
      >
        <div className="flex flex-col items-start justify-center gap-1">
          <Label
            text="Offer Management"
            class_name="text-2xl font-bold text-text_b tracking-tight"
          />
          <Label
            text={`Track and manage offer letters sent to candidates`}
            class_name="text-sm font-medium text-text_b_l opacity-60"
          />
        </div>

        <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-lighter transition-colors group">
          <Icon
            icon="ri-more-2-fill"
            class_name="text-xl group-hover:text-nevy_blue"
          />
        </button>
      </motion.header>

      <div className="w-full flex flex-col items-center justify-center gap-6 px-10 pb-20 pt-4">
        {offeredCandidates.map((candidate, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="w-full"
          >
            <CandidateCard id={index + 1} candidate={candidate} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default OfferReleased;
