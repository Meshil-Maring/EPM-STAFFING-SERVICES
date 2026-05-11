import React from "react";
import HomeFeature from "./HomeFeature";

const features = [
  {
    icon: "ri-rocket-line",
    head: "Streamlined Process",
    description:
      "Automate repetitive tasks and focus on what matters - finding the right talent.",
  },
  {
    icon: "ri-bar-chart-2-line",
    head: "Real-time Analytics",
    description:
      "Track performance metrics and make data-driven hiring decisions.",
  },
  {
    icon: "ri-team-line",
    head: "Seamless Collaboration",
    description:
      "Work together with your team to make better hiring decisions faster.",
  },
];

function Features() {
  return (
    <section className="w-full" aria-labelledby="features-grid-title">
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto p-0 list-none">
        {features.map((feature, index) => (
          <HomeFeature feature={feature} key={index} />
        ))}
      </ul>
    </section>
  );
}

export default Features;
