import React from "react";
import HomeFeature from "./HomeFeature";

const features = [
  {
    icon: "ri-suitcase-line",
    head: "Job Management",
    description:
      "Effortlessly create, edit, and track all your active job postings in real-time.",
  },
  {
    icon: "ri-group-line",
    head: "Candidate Sourcing",
    description:
      "Access a diverse pool of talent and manage applications through a central hub.",
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
    <section className="w-full lg:w-fit ml-auto">
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 list-none p-0 m-0">
        {features.map((feature, index) => (
          <HomeFeature feature={feature} key={index} />
        ))}
      </ul>
    </section>
  );
}

export default HomeContentRight;
