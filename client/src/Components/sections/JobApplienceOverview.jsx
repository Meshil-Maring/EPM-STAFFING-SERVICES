import React from "react";
import ButtonIcon from "../common/ButtonIcon";
import InforCards from "../layouts/Dashboard/InforCards";
import Label from "../common/Label";
import CardJobDetails from "../layouts/Dashboard/CardJobDetails";
import OverviewCards from "../layouts/Dashboard/OverviewCards";

function JobApplienceOverview() {
  const handlePostJob = () => {
    alert("Hello");
  };

  const candidate_details = [
    {
      cand_name: "Meshil",
      status: "Interview Scheduled",
      skills: ["React", "Node.js", "MongoDB"],
      more_info: {
        current_ctc: {
          icon: "₹",
          label: "Current CTC",
          value: "20 LPA",
        },
        expected_ctc: {
          icon: "ri-line-chart-line",
          label: "Expected CTC",
          value: "22 LPA",
        },
        notice_period: {
          icon: "ri-time-line",
          label: "Notice Period",
          value: "20 Days",
        },
        location: {
          icon: "ri-map-pin-line",
          label: "Location",
          value: "Gurgaon",
        },
        notice_date: {
          icon: "ri-calendar-line",
          label: "Notice Date",
          value: "23/11/2025",
        },
      },
      buttons: {
        schedule: {
          icon: "ri-vidicon-line",
          btn_name: "Schedule Interview",
        },
        comment: {
          icon: "ri-chat-2-line",
          btn_name: "Add Comment",
        },
        offer: {
          icon: "ri-file-text-line",
          btn_name: "Release Offer",
        },
        reject: {
          icon: "ri-user-unfollow-line",
          btn_name: "Reject",
        },
      },
    },
    {
      cand_name: "Desire",
      status: "Offer Released",
      skills: ["React", "Node.js", "MongoDB"],
      more_info: {
        current_ctc: {
          icon: "₹",
          label: "Current CTC",
          value: "22 LPA",
        },
        expected_ctc: {
          icon: "ri-line-chart-line",
          label: "Expected CTC",
          value: "24 LPA",
        },
        notice_period: {
          icon: "ri-time-line",
          label: "Notice Period",
          value: "14 Days",
        },
        location: {
          icon: "ri-map-pin-line",
          label: "Location",
          value: "Delhi",
        },
        notice_date: {
          icon: "ri-calendar-line",
          label: "Notice Date",
          value: "25/12/2025",
        },
      },
      buttons: {
        schedule: {
          icon: "ri-vidicon-line",
          btn_name: "Schedule Interview",
        },
        comment: {
          icon: "ri-chat-2-line",
          btn_name: "Add Comment",
        },
        offer: {
          icon: "ri-file-text-line",
          btn_name: "Release Offer",
        },
        reject: {
          icon: "ri-user-unfollow-line",
          btn_name: "Reject",
        },
      },
    },
  ];

  return (
    <div className="w-full h-full items-start justify-start flex flex-col px-6 py-8 overflow-y-auto gap-8">
      <div className="sticky w-full top-0 z-10 flex flex-row items-center justify-between bg-white backdrop-blur-md rounded-small shadow-lg p-4">
        <span className="flex flex-1 flex-col items-start leading-4 justify-center">
          <Label
            text="Full Stack Developer - Candidate Pipeline"
            class_name="text-xl text-heavy"
          />
          <Label
            text="Manage candidates for this position"
            class_name="text-sm text-heavy"
          />
        </span>
        <span className="w-40 flex h-10">
          <ButtonIcon
            text="32 Total"
            id="nav"
            icon="ri-group-line"
            onSelect={handlePostJob}
          />
        </span>
      </div>
      <div className="mt-4 py-2 w-full">
        <InforCards />
      </div>
      <div className="py-2 w-full">
        <CardJobDetails />
      </div>
      {candidate_details.map((candidate, index) => (
        <OverviewCards candidate={candidate} key={index} id={index} />
      ))}
    </div>
  );
}

export default JobApplienceOverview;
