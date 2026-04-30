import React, { useContext, useState, useEffect } from "react";
import { LoaderCircle } from "lucide-react";
import Label from "../../../common/Label";
import FollowLabel from "../common/FollowLabel";
import GridViewHeader from "./GridViewHeader";
import Image from "../../../common/Image";
import { getInitials } from "../../../../utils/getAvatar";
import { useAuth } from "../../../../hooks/useAuth";
import { updateFollowClient } from "./end-point-function/client_management";

function CompanyCardTopPart({ companyId, company }) {
  // tracking if user follow the client or not

  // is company still active
  const isActive = company.active;
  // Calculate total open positions from all jobs
  const totalOpenings = company.jobs?.length || 0;

  const [isLoading, setIsLoading] = useState(false);

  // State of the follow and unfollow
  const [follow, setFollow] = useState(false);
  // Check user is auth
  const { user } = useAuth();

  // useEffect
  useEffect(() => {
    const followers = company?.followers || [];
    const isFollowing = !!followers.find(
      (follower) => follower.follower_id === user?.id,
    );
    setFollow(isFollowing);
  }, []);

  // toggle follow status : passing the companyId and and the follow status
  const toggle_follow = async () => {
    if (!user) return;
    setIsLoading(true);

    const res = await updateFollowClient(companyId, user.id, !follow);

    res.success && setFollow((prev) => !prev);

    setIsLoading(false);
  };

  return (
    <header
      className={`flex gap-2 flex-row w-full items-center justify-start border-b border-lighter/30 pb-3`}
    >
      <div
        className="h-12 w-12 text-white bg-d_blue rounded-small text-xl font-semibold flex items-center justify-center shrink-0 shadow-sm"
        aria-hidden="true"
      >
        <Image link={getInitials(company.company_name || "N/A")} />
      </div>
      <div className="flex flex-col items-start justify-center overflow-hidden flex-1 relative">
        <Label
          text={company.company_name || "N/A"}
          class_name="text-[clamp(1.2em,1vw,1.4em)] font-semibold truncate w-full text-text_b leading-tight"
        />

        <div
          className={`flex items-center gap-1.5 ml-1 absolute right-0 top-0 rounded-full text-sm p-1.5 py-0 ${isActive ? "bg-blue/20" : "bg-red"}`}
        >
          <Label
            text={isActive ? "Active" : "Inactive"}
            class_name={!isActive ? "text-Darkgold" : "text-nevy_blue"}
          />
        </div>

        <div className="flex flex-row text-[10px] font-semibold items-center justify-start gap-2 mt-1 uppercase tracking-wide">
          <Label
            text={company.industry_type || "N/A"}
            class_name="px-2 py-0.5 rounded-small bg-lighter text-text_b_l border border-lighter"
          />

          <div className="w-fit flex items-center justify-center cursor-pointer">
            <button onClick={toggle_follow}>
              {isLoading ? (
                <button
                  type="button"
                  className="inline-flex items-center px-2 py-1 font-semibold leading-6 text-xs shadow rounded-large text-white bg-indigo-500 hover:bg-indigo-400 transition ease-in-out duration-150 cursor-not-allowed"
                  disabled
                >
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </button>
              ) : follow ? (
                "Unfollow"
              ) : (
                "Follow"
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default CompanyCardTopPart;
