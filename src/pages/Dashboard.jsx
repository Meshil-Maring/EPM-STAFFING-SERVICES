import HeaderLayouts from "../Components/layouts/HeaderLayouts";
import Heading_Button from "../Components/layouts/Heading_Button";
import NavBar from "../Components/layouts/NavBar";
import SearchInput from "../Components/common/SearchInput";
import Job_Card from "../Components/layouts/Job_Card";

function Dashboard() {
  const cardDetails = [
    {
      job_name: "Senior Software Engineer",
      status: "Active",
      location: "Bangalore, India",
      contract_type: "Full-time",
      stipend_range: "15-20 LPA",
      slots_available: "25",
      date_posted: "4 days ago",
    },
    {
      job_name: "Product Manager",
      status: "Active",
      location: "Mumbai, India",
      contract_type: "Full-time",
      stipend_range: "20-30 LPA",
      slots_available: "10",
      date_posted: "5 days ago",
    },
    {
      job_name: "DevOps",
      status: "Active",
      location: "Pune, India",
      contract_type: "Contract",
      stipend_range: "18-28 LPA",
      slots_available: "25",
      date_posted: "6 days ago",
    },
  ];
  return (
    <div className="w-full h-full flex flex-row overflow-y-hidden">
      <NavBar />
      <div className="flex flex-col w-full h-full">
        <HeaderLayouts />
        <div className="w-full gap-4 p-6 flex flex-col overflow-y-auto shadow-inner-lighter">
          <Heading_Button />
          <SearchInput />
          <div className="flex flex-col items-center justify-center gap-4">
            {cardDetails.map((card, index) => {
              return (
                <Job_Card
                  key={index}
                  job_name={card.job_name}
                  status={card.status}
                  location={card.location}
                  contract_type={card.contract_type}
                  stipend_range={card.stipend_range}
                  slots_available={card.slots_available}
                  date_posted={card.date_posted}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
