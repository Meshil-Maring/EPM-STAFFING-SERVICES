import React from "react";

function SignaturesSection({ clientData }) {
  return (
    <div className="mt-12 flex gap-2 justify-between tracking-wide">
      {/* proposed section */}
      <div className="w-1/2 pt-2 gap-4 space-y-4">
        <p className="">
          <strong>Proposed</strong>
        </p>
        <div className="flex flex-row items-center justify-start gap-6 ">
          <div className="border border-light/80 border-dashed h-22 w-22 text-text_l_b/80 text-xs flex items-center justify-center rounded-sm">
            Stamp
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <p>................................... </p>
            <p>{clientData?.client_name || "Dangshapipa Angrung"}</p>
            <p>Director</p>
          </div>
        </div>
        <div className="flex flex-row items-center justify-start gap-6">
          <div className="border h-14 w-14 text-text_l_b/80 border-light/80 text-xs flex items-center justify-center rounded-full">
            Stamp
          </div>
          <p>
            <strong>EPM Staffing Services OPC Private Limited</strong>
          </p>
        </div>
      </div>
      {/* accepted section */}
      <div className="w-1/2 pt-2">
        <p className="mb-4">
          <strong>Accepted</strong>
        </p>
        <p>Signature: ........................................</p>
        <p>
          Name of Competent Authority: ........................................
        </p>
        <p>Designation: ........................................</p>
        <p>Your Company Name: ........................................</p>
        <p>CIN: ........................................</p>
      </div>
    </div>
  );
}

export default SignaturesSection;
