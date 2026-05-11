import React from "react";
import Icon from "../../../shared/components/ui/Icon";

const features = [
  {
    icon: "ri-suitcase-line",
    head: "Job Management",
    description:
      "Effortlessly create, edit, and track all your active job postings in real-time.",
  },
  {
    icon: "ri-award-line",
    head: "Offer Tracking",
    description:
      "Monitor the status of sent offers and streamline the final hiring stages.",
  },
  {
    icon: "ri-line-chart-line",
    head: "Interview Pipeline",
    description:
      "Visualize your recruitment funnel and move candidates across interview stages.",
  },
];

function HomeContentRight() {
  return (
    <section className="w-full flex flex-col gap-4" aria-label="Key features">
      {features.map((feature, index) => (
        <div
          key={index}
          className="group flex items-start gap-4 p-5 bg-white border border-lighter rounded-large shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
        >
          <div className="shrink-0 p-2.5 bg-red-lighter rounded-small group-hover:bg-red-light transition-colors">
            <Icon icon={feature.icon} class_name="text-xl text-red" />
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="font-bold text-base text-text_b">{feature.head}</h3>
            <p className="text-sm text-text_b opacity-55 leading-relaxed">
              {feature.description}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}

export default HomeContentRight;
