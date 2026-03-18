import { useEffect, useContext, useState, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Label from "../../common/Label";
import { signup_stage_context } from "../../../context/SignupFormContext";
import TopHeader from "./TopHeader";

function Signup_form() {
  const { pathname } = useLocation();
  const { stage, setStage } = useContext(signup_stage_context);
  const name = pathname.split("/").at(-1);

  // Loading state management
  const [isLoading, setIsLoading] = useState(false);
  const [direction, setDirection] = useState("forward");
  const prevPathnameRef = useRef(pathname);
  const timeoutRef = useRef(null);

  // Determine navigation direction
  useEffect(() => {
    const prevPathname = prevPathnameRef.current;
    const currentPath = pathname;

    // Determine if navigating forward or backward
    const sections = [
      "signup_form",
      "contact_information",
      "address_information",
      "account_credentials",
    ];
    const prevIndex = sections.indexOf(prevPathname.split("/").pop());
    const currentIndex = sections.indexOf(currentPath.split("/").pop());

    if (prevIndex < currentIndex) {
      setDirection("forward");
    } else if (prevIndex > currentIndex) {
      setDirection("backward");
    } else {
      setDirection("forward"); // Default to forward for same level navigation
    }

    prevPathnameRef.current = currentPath;
  }, [pathname]);

  // Handle loading state with smooth transitions
  useEffect(() => {
    // Set loading state when pathname changes
    setIsLoading(true);

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Update stage after a brief delay to allow loading animation
    timeoutRef.current = setTimeout(() => {
      const sections = [
        "signup_form",
        "contact_information",
        "address_information",
        "account_credentials",
      ];
      const currentIndex = sections.indexOf(name);
      const currentStageIndex = stage.indexOf(name);

      let newArr;
      if (currentStageIndex === -1) {
        // Forward navigation - add new stage
        newArr = [...stage, name];
      } else if (currentStageIndex < stage.length - 1) {
        // Backward navigation - truncate to current stage
        newArr = stage.slice(0, currentStageIndex + 1);
      } else {
        // Already at this stage
        newArr = stage;
      }

      setStage(newArr);

      // End loading after stage update
      setTimeout(() => {
        setIsLoading(false);
      }, 100); // Small delay for smooth transition
    }, 200); // Loading duration

    // Cleanup timeout on unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [name, stage, setStage]);

  // credintials
  const section_visuals = [
    { label: 1, info: "Company Info", id: "signup_form" },
    { label: 2, info: "Contact Info", id: "contact_information" },
    { label: 3, info: "Address", id: "address_information" },
    { label: 4, info: "Account Credentials", id: "account_credentials" },
  ];

  // Calculate progress percentage
  const currentStageIndex = section_visuals.findIndex((v) => v.id === name);
  const totalStages = section_visuals.length;
  const progressPercentage = ((currentStageIndex + 1) / totalStages) * 100;

  const form_style =
    "w-[80%] h-[80%] sm:max-w-[60%] md:max-w-[55%] lg:max-w-[40%] bg-white rounded-2xl shadow-sm border border-gray-100 p-4 space-y-4 relative overflow-hidden";

  return (
    <div
      className={`w-full h-dvh flex flex-col relative space-y-8 items-center justify-start ${isLoading ? "relative" : ""}`}
    >
      <TopHeader />
      <div className={` ${form_style}`}>
        {/* Loading Overlay */}
        {isLoading && (
          <div
            className={`absolute inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center transition-all duration-300 ${
              direction === "forward"
                ? "animate-slide-up"
                : "animate-slide-down"
            }`}
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <div className="w-12 h-12 border-4 border-nevy_blue/20 border-t-nevy_blue rounded-full animate-spin"></div>
                <div
                  className="absolute inset-0 w-12 h-12 border-4 border-nevy_blue/20 border-b-nevy_blue rounded-full animate-spin"
                  style={{
                    animationDirection: "reverse",
                    animationDuration: "1.5s",
                  }}
                ></div>
              </div>
              <Label
                text="Loading next step..."
                class_name="text-sm text-gray-600 font-medium"
              />
            </div>
          </div>
        )}

        {/* Progress Header with Unified Container */}
        <div className="w-full bg-b_white sticky z-200 top-0 text-xs flex flex-row items-center justify-between transition-all duration-300">
          {/* Progress Bar Container */}
          <div className="w-full relative">
            {/* Stage Markers */}
            <div className="flex justify-between mb-2">
              {section_visuals.map((visual, i) => {
                const isActive = stage.includes(visual.id);
                const isCompleted = i < currentStageIndex || isActive;
                const isCurrent = i === currentStageIndex;

                return (
                  <div
                    key={visual.label}
                    className="flex flex-col items-center gap-2"
                  >
                    {/* Stage Circle */}
                    <div
                      className={`relative flex items-center justify-center h-10 w-10 rounded-full transition-all duration-300 border-2 ${
                        isCurrent
                          ? "bg-red text-text_white border-red shadow-lg shadow-red/30 scale-110"
                          : isCompleted
                            ? "bg-green-500 text-text_white border-green-500"
                            : "bg-white text-gray-400 border-gray-300"
                      }`}
                    >
                      {isCompleted && !isCurrent ? (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      ) : (
                        visual.label
                      )}
                    </div>

                    {/* Stage Label */}
                    <Label
                      text={visual.info}
                      class_name={`text-xs transition-all duration-300 ${
                        isCurrent
                          ? "font-bold text-red"
                          : "font-medium text-gray-500"
                      }`}
                    />
                  </div>
                );
              })}
            </div>
            {/* Progress Fill */}
            <div
              className="absolute bottom-0 left-0 h-1 bg-red transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />

            {/* Progress Track */}
            <div className="w-full h-1 bg-gray-200 rounded-full"></div>
          </div>
        </div>

        {/* Form Content with Transition */}
        <div
          className={`transition-all duration-400 h-80 no-scrollbar overflow-y-auto px-2 ${
            isLoading ? "opacity-0 scale-95" : "opacity-100 scale-100"
          }`}
        >
          <Outlet />
        </div>

        {/* Navigation Direction Indicators (Optional subtle hints) */}
      </div>
    </div>
  );
}

export default Signup_form;
