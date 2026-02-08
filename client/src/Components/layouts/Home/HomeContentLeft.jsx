import React, { useContext } from "react";
import Label from "../../common/Label";
import Button from "../../common/Button";
import Icon from "../../common/Icon";
import { useNavigate } from "react-router-dom";

function HomeContentLeft() {
  const navigate = useNavigate();
  const handleNavigation = (name) => {
    if (name === "Get Started") {
      const path = "/api/auth/signup";
      navigate(path);
    } else if (name === "Sign In") {
      const path = "/api/auth/signin";
      navigate(path);
    }
  };
  const stats = [
    { label: "Active Jobs", value: "500+" },
    { label: "Candidates", value: "1200+" },
    { label: "Success Rate", value: "98%" },
  ];

  const description =
    "Transform your hiring process with our comprehensive staffing platform. Manage jobs, track offers, and streamline your interview pipeline all in one place.";

  return (
    <article className="w-full flex flex-col items-start justify-center gap-8">
      <Label
        as="span"
        text="Professional Staffing Solutions"
        class_name="text-md font-lighter text-red bg-red-light border border-red/20 py-1.5 px-4 rounded-full"
      />

      <header className="flex flex-col items-start justify-start gap-1">
        <Label
          as="h1"
          text="Find The Perfect Talent Match"
          class_name="text-text_b_l text-4xl md:text-5xl font-bold leading-tight"
        />
      </header>

      <Label
        as="p"
        text={description}
        class_name="text-lg text-text_b_l/80 max-w-lg leading-relaxed"
      />

      <div className="flex flex-wrap items-center justify-start gap-4">
        <button
          onClick={() => handleNavigation("Get Started")}
          className="group bg-red shadow-lg shadow-red/20 text-text_white flex items-center justify-center px-6 py-3 gap-2 rounded-small hover:bg-red-dark transition-all duration-300 focus:ring-4 focus:ring-red/30 outline-none"
          aria-label="Get started now and create an account"
        >
          <span className="font-semibold">Get Started now</span>
          <Icon
            icon="ri-arrow-right-line"
            class_name="w-5 h-5 group-hover:translate-x-1 transition-transform"
          />
        </button>
      </div>

      <section className="w-full md:w-[80%] grid grid-cols-3 gap-8 py-4 border-t border-lighter mt-4">
        {stats.map((item, index) => (
          <div key={index} className="flex flex-col items-start justify-start">
            <Label
              as="span"
              text={item.value}
              class_name="text-2xl font-bold text-red"
            />
            <Label
              as="span"
              text={item.label}
              class_name="text-xs uppercase tracking-wider font-medium text-text_b_l/60"
            />
          </div>
        ))}
      </section>
    </article>
  );
}

export default HomeContentLeft;
