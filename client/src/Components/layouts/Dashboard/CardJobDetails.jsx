import React, { useState } from "react";
import Icon from "../../common/Icon";
import Label from "../../common/Label";
import Requirements from "./Requirements";

function CardJobDetails() {
  return (
    <section className="group gap-4 flex flex-col md:flex-row items-start justify-center my-4 w-full p-6 rounded-small bg-highlightBackground border border-highLightBorder shadow-sm">
      <div
        className="flex items-center justify-center rounded-small bg-goldGradient text-white w-12 h-12 shrink-0 shadow-md"
        aria-hidden="true"
      >
        <Icon icon="ri-suitcase-line" class_name="text-2xl" />
      </div>

      <div className="flex-1 flex flex-col items-start justify-start gap-4">
        <header className="w-full flex flex-col gap-0.5">
          <Label
            as="h2"
            text="Position Requirements"
            class_name="text-lg font-bold tracking-tight text-text_b"
          />
          <Label
            as="p"
            text="Full Stack Developer with 3-7 years of experience"
            class_name="text-sm tracking-normal text-text_b_l opacity-80"
          />
        </header>

        <div className="w-full border-t border-highLightBorder/50 pt-4">
          <Requirements />
        </div>
      </div>
    </section>
  );
}

export default CardJobDetails;
