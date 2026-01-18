import React, { useContext } from "react";
import Label from "../../common/Label";
import Icon from "../../common/Icon";
import { useNavigate } from "react-router-dom";

function GetStarted() {
  const navigate = useNavigate();
  const handleClicking = () => {
    const path = "/api/auth/signup";
    navigate(path);
  };
  return (
    <section
      className="w-full max-w-4xl mx-auto px-4"
      aria-labelledby="cta-heading"
    >
      <div className="rounded-large p-8 mb-10 bg-red-50 border border-red-200 flex flex-col gap-6 items-center justify-center text-center shadow-sm">
        <header className="flex flex-col gap-2">
          <Label
            as="h2"
            id="cta-heading"
            text="Ready to Transform Your Hiring?"
            class_name="text-2xl md:text-3xl font-bold text-text_b tracking-tight"
          />
          <Label
            as="p"
            text="Join hundreds of companies using EPM Staffing Services to build their dream teams."
            class_name="text-base md:text-lg text-text_b_l leading-relaxed max-w-2xl"
          />
        </header>

        <div
          onClick={handleClicking}
          className="group hover:cursor-pointer flex border flex-row items-center gap-2 px-8 py-2 rounded-small bg-red-600 text-white text-lg font-semibold transition-all duration-300 ease-in-out hover:bg-red-700 hover:shadow-lg focus:ring-4 focus:ring-red-200 outline-none"
        >
          <Label text="Get Started Now" />
          <Icon
            icon="ri-arrow-right-line"
            class_name="w-5 h-5 transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}

export default GetStarted;
