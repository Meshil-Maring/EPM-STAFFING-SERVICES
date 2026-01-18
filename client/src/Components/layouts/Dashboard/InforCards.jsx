import React from "react";
import StatCard from "./StatCard";

const info_cards = [
  {
    name: "Interview",
    total: "12",
    status: "Scheduled",
    icon: "ri-vidicon-line",
    color: "bg-blueGradient",
  },
  {
    name: "Offer",
    total: "5",
    status: "Released",
    icon: "ri-file-text-line",
    color: "bg-greenGradient",
  },
  {
    name: "In Review",
    total: "7",
    status: "Pending",
    icon: "ri-search-line",
    color: "bg-grayGradient",
  },
  {
    name: "Rejected",
    total: "8",
    status: "Not Fit",
    icon: "ri-close-circle-line",
    color: "bg-g_red",
  },
];

function InforCards() {
  return (
    <section className="w-full py-4">
      <ul className="w-full h-fit flex flex-row flex-wrap items-center justify-center gap-6 list-none p-0">
        {info_cards.map((card, index) => (
          <StatCard key={index} card={card} />
        ))}
      </ul>
    </section>
  );
}

export default InforCards;
