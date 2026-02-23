import React, { useContext, useEffect, useRef, useState } from "react";
import Label from "../../../common/Label";
import { Candidates_context } from "../../../../context/CandidatesContext";
import CandidateCard from "./CandidateCard";
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
      <header className="w-full sticky top-0 z-20 flex flex-row items-center justify-between backdrop-blur-md px-10 py-6">
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
      </header>

      <div className="w-full flex flex-col items-center justify-center gap-6 px-10 pb-20 pt-4">
        {offeredCandidates.map((candidate, index) => (
          <div key={index} className="w-full">
            <CandidateCard id={index + 1} candidate={candidate} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default OfferReleased;
