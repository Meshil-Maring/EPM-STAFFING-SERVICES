import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ButtonColor from "../../common/ButtonColor";
import ButtonPlain from "../../common/ButtonPlain";
import Label from "../../common/Label";
import SpanLabel from "../../common/SpanLabel";
import CardIcons from "../../common/CardIcons";
import Icon from "../../common/Icon";
import EditCardDetails from "./EditCardDetails/EditCardDetails";
import JobCardDeleteOverlay from "../JobCard/JobCardDeleteOverlay";
import JobCardMoreDetails from "./JobCardMoreDetails";
import { showError, showSuccess } from "../../../utils/toastUtils";

import { deleteByIdService } from "../../../utils/server_until/service";
import { formatDate } from "../../../utils/formatDate";

function Job_Card({ Card_index, card }) {
  const [moreDetails, setMoreDetails] = useState(false);
  const [edit_details, setEdit_details] = useState(false);
  const [deleteOverlay, setDeleteOverlay] = useState(false);

  const navigate = useNavigate();

  const handleConfirming = async (name) => {
    if (name === "Confirm") {
      // DELETE function here
      const res = await deleteByIdService("api/dr/delete/id", "jobs", card?.id);

      console.log(res);

      if (!res.success)
        return showError("Failed to delete job. Please try again.");

      showSuccess("Job deleted successfully!");

      setTimeout(() => {
        setDeleteOverlay(false);
      }, 1000);
    } else {
      setDeleteOverlay(false);
    }
  };

  const handle_card_action = (name) => {
    if (name === "View Details") setMoreDetails(true);
    if (name === "Edit") setEdit_details(true);
    if (name === "Delete") setDeleteOverlay(true);
    return sessionStorage.setItem("selected_job_id", Card_index);
  };

  // Calculate remaining spots
  const remainingSpots = Math.max(
    0,
    (card?.max_applications || 0) - (card?.applicants || 0),
  );

  return (
    <>
      <section
        onClick={() => navigate(`/client/dashboard/job-overview/${card?.id}`)}
        className="w-full p-5 rounded-[8px] cursor-pointer hover:scale-[1.02] hover:shadow-md border border-lighter transition-all duration-300 gap-4 flex flex-col items-start justify-center bg-white"
      >
        {/* HEADER - Title and Status */}
        <div className="w-full flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Label
              text={card?.job_name}
              class_name="text-md font-semibold text-text_b"
            />
            <SpanLabel
              text={card?.active ? "Active" : "Inactive"}
              class_name={`px-2 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                card?.active
                  ? "bg-b_light_blue text-nevy_blue"
                  : !card?.active
                    ? "text-red-dark bg-red-light"
                    : "text-Darkgold bg-gold_lighter"
              }`}
            />
          </div>

          {/* Actions - View Details, Edit, Delete */}
          <nav
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-4 ml-auto"
            aria-label="Job actions"
          >
            <ButtonPlain
              onclick={handle_card_action}
              text="View Details"
              class_name="px-2 py-1 cursor-pointer text-[14px] tracking-wider border border-light hover:bg-lighter transition-all duration-120 ease-in-out rounded-lg"
            />
            <ButtonColor
              text="Edit"
              onSelect={handle_card_action}
              class_name="px-4 py-1 text-white cursor-pointer rounded-lg tracking-wider bg-g_btn"
            />
            <ButtonColor
              text="Delete"
              onSelect={handle_card_action}
              class_name="px-4 py-1 text-white cursor-pointer rounded-lg tracking-wider bg-g_btn"
            />
          </nav>
        </div>

        {/* DIVIDER */}
        <div className="w-full py-2 border-y border-lighter/50">
          <CardIcons job_card={card} />
        </div>

        {/* FOOTER - Meta Information */}
        <footer className="flex relative flex-row flex-wrap gap-6 items-center justify-start w-full opacity-70">
          {/* Remaining Applications Spots */}
          <div className="flex items-center gap-1.5">
            <i className="ri-team-line text-xs" aria-hidden="true"></i>
            <Label
              text={`${remainingSpots} spots available`}
              class_name="text-xs font-medium"
            />
          </div>

          {/* Posted Date */}
          <div className="flex items-center gap-1.5">
            <i className="ri-calendar-line text-xs" aria-hidden="true"></i>
            <Label
              text={`Posted: ${formatDate(card?.created_at)}`}
              class_name="text-xs font-medium"
            />
          </div>

          {/* Priority Badge - Top Right */}
          {card?.priority && card?.active && (
            <div className="absolute flex text-nevy_blue flex-row flex-wrap items-center justify-center right-0 gap-2">
              <Label
                text={"Priority"}
                class_name={"text-[clamp(0.8em,0.8vw,1em)] font-semibold"}
              />
              <span
                title="This Opening is on High Priority Mode"
                className="flex items-center"
              >
                <Icon
                  icon={"ri-flashlight-line"}
                  class_name="font-md text-[clamp(1em,1.2vw,1.4em)] w-5 h-5"
                />
              </span>
            </div>
          )}
        </footer>
      </section>

      {/* Delete Confirmation Overlay */}
      {deleteOverlay && (
        <JobCardDeleteOverlay
          onConfirm={handleConfirming}
          card_name={card?.job_name}
        />
      )}

      {/* Edit Job Post Modal */}
      {edit_details && (
        <EditCardDetails
          card_index={Card_index}
          card={card}
          setEditJobPost={setEdit_details}
        />
      )}

      {/* View More Details Modal */}
      {moreDetails && (
        <JobCardMoreDetails
          card={card}
          card_index={Card_index}
          setMoreDetails={setMoreDetails}
        />
      )}
    </>
  );
}

export default Job_Card;
