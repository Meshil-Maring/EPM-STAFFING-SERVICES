import React from "react";
import SearchInput from "../common/SearchInput";
import Job_Card from "../layouts/Dashboard/Job_Card";
import Label from "../common/Label";
import ButtonIcon from "../common/ButtonIcon";
import { useNavigate } from "react-router-dom";

function Jobs() {
  const navigate = useNavigate();
  const cardDetails = [
    {
      job_name: "Senior Software Engineer",
      status: "Active",
      location: "Bangalore, India",
      contract_type: "Full-time",
      stipend_range: "15-20 LPA",
      slots_available: "25 available",
      date_posted: "4 days ago",
    },
    {
      job_name: "Product Manager",
      status: "Active",
      location: "Mumbai, India",
      contract_type: "Full-time",
      stipend_range: "20-30 LPA",
      slots_available: "10 available",
      date_posted: "5 days ago",
    },
    {
      job_name: "DevOps",
      status: "Active",
      location: "Pune, India",
      contract_type: "Contract",
      stipend_range: "18-28 LPA",
      slots_available: "25 available",
      date_posted: "6 days ago",
    },
  ];

  const handlePostJob = () => {
    navigate("/JobForm");
  };

  return (
    <div className="w-full gap-5 px-6 pt-4 pb-10 flex flex-col overflow-y-auto shadow-inner-lighter h-screen">
      <div className="sticky top-0 z-10 w-full gap-4 shadow-light flex flex-col p-4 rounded-small bg-white backdrop-blur-md">
        <div className="w-full flex flex-row items-center justify-start">
          <div className="flex w-full flex-1 flex-col items-start leading-4 justify-center">
            <Label class_name="text-lg" text="Active Job Listings" />
            <Label
              class_name="text-sm"
              text="Recruitment Management Dashboard"
            />
          </div>
          <span className="min-w-35 flex h-10">
            <ButtonIcon
              text="Post New Job"
              icon="ri-add-line"
              id="nav"
              onSelect={handlePostJob}
              clicked
              set_gradient={true}
              shadow={true}
            />
          </span>
        </div>
        <SearchInput />
      </div>
      <div className="flex flex-col items-start pb-10 justify-center gap-10">
        {cardDetails.map((card, index) => (
          <Job_Card key={index} {...card} />
        ))}
      </div>
    </div>
  );
}

export default Jobs;
