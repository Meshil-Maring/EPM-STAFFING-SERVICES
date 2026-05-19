import React, { useContext, useState } from "react";
import Label from "../../../shared/components/ui/Label";
import Image from "../../../shared/components/ui/Image";
import { useNavigate, useLocation } from "react-router-dom";
import { signup_stage_context } from "../../../shared/context/SignupFormContext";

function TopHeader() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { isDirtyRef, setDirty } = useContext(signup_stage_context) ?? {};
  const [showConfirm, setShowConfirm] = useState(false);

  const isSignupRoute = pathname.startsWith("/auth/signup_form");

  const handleLogoClick = () => {
    if (isSignupRoute) {
      setShowConfirm(true);
    } else {
      navigate("/");
    }
  };

  const handleConfirmLeave = () => {
    // Clear the dirty ref synchronously so Signup_form's blocker doesn't
    // fire a second dialog after this navigate call
    if (isDirtyRef) isDirtyRef.current = false;
    if (setDirty) setDirty(false);
    setShowConfirm(false);
    navigate("/");
  };

  return (
    <>
      <header className="flex px-4 absolute py-2 space-x-2 top-0 items-center justify-start flex-row bg-white/80 backdrop-blur-md border border-gray-100/50 shadow-sm w-full z-50 rounded-b-xl">
        <button onClick={handleLogoClick}>
          <Image
            link="https://i.ibb.co/LDNxqKYW/Logo-EPM-1.png"
            alt="EPM Staffing Services Logo"
            width="50"
            height="50"
            class_name="object-cover w-10 h-10 md:w-12 md:h-12 rounded-full shadow-md border-2 border-gray-100"
          />
        </button>

        <div className="flex flex-col items-start">
          <Label
            text="EPM STAFFING SERVICES"
            class_name="text-base md:text-lg lg:text-xl font-bold tracking-tight text-gray-900"
          />
          <Label
            text="OPC PVT. LTD."
            class_name="text-[10px] md:text-xs font-medium text-gray-600 -mt-0.5"
          />
        </div>
      </header>

      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full flex flex-col items-center gap-4">
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-red/10">
              <i className="ri-error-warning-line text-3xl text-red" />
            </div>
            <div className="text-center space-y-1.5">
              <h2 className="text-lg font-bold text-gray-900">Leave sign up?</h2>
              <p className="text-sm text-gray-500">
                You haven&apos;t finished creating your account. Your progress
                may be lost if you leave now.
              </p>
            </div>
            <div className="flex flex-col w-full gap-2 pt-1">
              <button
                onClick={() => setShowConfirm(false)}
                className="w-full py-2.5 rounded-xl bg-nevy_blue text-white font-semibold text-sm hover:bg-nevy_blue/90 transition-all cursor-pointer"
              >
                Stay &amp; Continue
              </button>
              <button
                onClick={handleConfirmLeave}
                className="w-full py-2.5 rounded-xl border border-red text-red font-semibold text-sm hover:bg-red/5 transition-all cursor-pointer"
              >
                Leave anyway
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TopHeader;
