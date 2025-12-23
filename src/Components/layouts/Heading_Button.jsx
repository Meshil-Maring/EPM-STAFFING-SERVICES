import React from "react";
import ColumnHeadings from "./ColumnHeadings";
import ButtonIcon from "../common/ButtonIcon";
import { useNavigate } from "react-router-dom";

function Heading_Button() {
  const navigate = useNavigate();
  const handlePostJob = () => {
    navigate("/JobForm");
  };
  return (
    <div className="w-full h-fit py-2 flex flex-row items-center justify-center ">
      <ColumnHeadings
        main_text="Active Job Listings"
        main_font_size="xl"
        main_color="heavy"
        sub_text="Recruitement Management Dashboard"
        sub_font_size="sm"
      />
      <ButtonIcon
        text="Post New Job"
        id="nav"
        pathData="M12 5V19M5 12H19"
        onSelect={handlePostJob}
        width="fit"
        set_gradient={true}
        shadow={true}
      />
    </div>
  );
}

export default Heading_Button;
