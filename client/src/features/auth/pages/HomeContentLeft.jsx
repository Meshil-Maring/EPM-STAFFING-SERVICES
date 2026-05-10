import React from "react";
import Label from "../../../shared/components/ui/Label";

function HomeContentLeft() {
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
        text="Professional Staffing Solutions"
        class_name="text-md font-lighter text-red bg-red-light border border-red/20 py-1.5 px-4 rounded-full"
      />

      <header className="flex flex-col items-start justify-start gap-1">
        <Label
          text="Find The Perfect Talent Match"
          class_name="text-text_b_l text-4xl md:text-5xl font-bold leading-tight"
        />
      </header>

      <Label
        text={description}
        class_name="text-lg text-text_b_l/80 max-w-lg leading-relaxed"
      />

      <section className="w-full md:w-[80%] grid grid-cols-3 gap-8 py-4 border-t border-lighter mt-4">
        {stats.map((item, index) => (
          <div key={index} className="flex flex-col items-start justify-start">
            <Label text={item.value} class_name="text-2xl font-bold text-red" />
            <Label
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
