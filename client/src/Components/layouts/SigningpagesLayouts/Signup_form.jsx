import { useEffect, useContext, useState, useRef, useCallback } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Label from "../../common/Label";
import { signup_stage_context } from "../../../context/SignupFormContext";
import TopHeader from "./TopHeader";

const SECTIONS = [
  "signup_form",
  "company_information",
  "contact_information",
  "address_information",
];

const SECTION_VISUALS = [
  { label: 1, info: "Credentials", id: "signup_form" },
  { label: 2, info: "Company Info", id: "company_information" },
  { label: 3, info: "Contact Info", id: "contact_information" },
  { label: 4, info: "Address", id: "address_information" },
];

function Signup_form() {
  const { pathname } = useLocation();
  const { stage, setStage } = useContext(signup_stage_context);

  const name = pathname.split("/").at(-1);

  const [isLoading, setIsLoading] = useState(false);
  const [direction, setDirection] = useState("forward");

  // Refs to avoid stale closures inside timeouts
  const prevPathnameRef = useRef(pathname);
  const stageRef = useRef(stage);
  const timeoutRef = useRef(null);
  stageRef.current = stage;

  // ── Direction detection ──────────────────────────────────────────────────
  useEffect(() => {
    const prevIndex = SECTIONS.indexOf(
      prevPathnameRef.current.split("/").pop(),
    );
    const currIndex = SECTIONS.indexOf(pathname.split("/").pop());
    setDirection(prevIndex <= currIndex ? "forward" : "backward");
    prevPathnameRef.current = pathname;
  }, [pathname]);

  // ── Stage sync with loading animation ───────────────────────────────────
  useEffect(() => {
    setIsLoading(true);
    clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      const currentStage = stageRef.current;
      const idx = currentStage.indexOf(name);

      const newStage =
        idx === -1
          ? [...currentStage, name] // forward
          : idx < currentStage.length - 1
            ? currentStage.slice(0, idx + 1) // backward
            : currentStage; // same step

      setStage(newStage);
      setIsLoading(false);
    }, 200);

    return () => clearTimeout(timeoutRef.current);
  }, [name, setStage]); // ← `stage` intentionally excluded; read via ref

  // ── Keyboard: Enter → click the active submit button ────────────────────
  const handleKeyDown = useCallback((e) => {
    if (e.key !== "Enter") return;

    // Don't intercept Enter inside <textarea>
    if (e.target.tagName === "TEXTAREA") return;

    // Let browser handle Enter for <select> and <a>
    if (["SELECT", "A"].includes(e.target.tagName)) return;

    const submitBtn = document.querySelector(
      'button[type="submit"], button[data-submit="true"]',
    );
    submitBtn?.click();
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // ── Derived values ───────────────────────────────────────────────────────
  const currentStageIndex = SECTION_VISUALS.findIndex(
    (v) => v.id === name || name === "",
  );
  const progressPercentage =
    ((currentStageIndex + 1) / SECTION_VISUALS.length) * 100;

  return (
    <div className="w-full h-dvh overflow-hidden relative flex flex-col pt-14 items-center justify-center">
      <TopHeader />

      <div className="sm:max-w-[80%] md:w-[45%] lg:w-[50%] xl:w-[35%] h-[90%] flex flex-col overflow-y-auto no-scrollbar bg-white rounded-2xl shadow-sm border border-gray-100 p-4 pt-0 space-y-4">
        {/* ── Loading Overlay ── */}
        {isLoading && (
          <div
            className={`fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center transition-all duration-300 ${
              direction === "forward"
                ? "animate-slide-up"
                : "animate-slide-down"
            }`}
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="relative w-12 h-12">
                <div className="absolute inset-0 border-4 border-nevy_blue/20 border-t-nevy_blue rounded-full animate-spin" />
                <div
                  className="absolute inset-0 border-4 border-nevy_blue/20 border-b-nevy_blue rounded-full animate-spin"
                  style={{
                    animationDirection: "reverse",
                    animationDuration: "1.5s",
                  }}
                />
              </div>
              <Label
                text="Loading next step..."
                class_name="text-sm text-gray-600 font-medium"
              />
            </div>
          </div>
        )}

        {/* ── Progress Header ── */}
        <div className="w-full pt-4 z-2 bg-b_white sticky top-0 text-xs flex flex-row items-center justify-between transition-all duration-300">
          <div className="w-full relative">
            {/* Stage markers */}
            <div className="flex justify-between mb-2 px-4">
              {SECTION_VISUALS.map((visual, i) => {
                const isActive = stage.includes(visual.id);
                const isCompleted = i < currentStageIndex || isActive;
                const isCurrent = i === currentStageIndex;

                return (
                  <div
                    key={visual.label}
                    className="flex flex-col items-center gap-2"
                  >
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

            {/* Progress fill */}
            <div
              className="absolute bottom-0 left-0 h-1 bg-red transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
            <div className="w-full h-1 bg-gray-200 rounded-full" />
          </div>
        </div>

        {/* ── Form Content ── */}
        <div
          className={`transition-all  h-full duration-400 overflow-hidden px-2 space-y-2 ${
            isLoading ? "opacity-0 scale-95" : "opacity-100 scale-100"
          }`}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Signup_form;
