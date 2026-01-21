import React from "react";
import LabelInput2 from "../../common/LabelInput2";
import SettingsHeaders from "./SettingsHeaders";

function CompanyInformation({ company_information }) {
  const handleInputChange = (value) => {
    console.log("Updating company field");
  };

  return (
    <section className="w-full flex flex-col border p-6 md:p-8 rounded-small border-lighter shadow-sm items-center justify-start gap-8 bg-white">
      <SettingsHeaders
        icon="ri-building-line"
        icon_bg="bg-nevy_blue"
        heading="Company Information"
        label="Basic details about your organization"
      />

      <div className="w-full flex flex-col items-start justify-start gap-6">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          <LabelInput2
            text="Company Name"
            placeholder="e.g. EMP Services"
            type="text"
            onChange={handleInputChange}
            input_value={company_information.company_name}
          />
          <LabelInput2
            text="Registration Number"
            placeholder="CIN / Registration No."
            type="text"
            onChange={handleInputChange}
            input_value={company_information.registration_number}
          />
        </div>

        <div className="w-full">
          <LabelInput2
            text="Address"
            placeholder="Full office address"
            type="text"
            input_style="w-full min-h-[100px] text-left py-2 border border-lighter px-3 rounded-extra_small focus:outline-none focus:ring-2 focus:ring-nevy_blue transition-all"
            onChange={handleInputChange}
            input_value={company_information.address}
          />
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          <LabelInput2
            text="City"
            placeholder="City"
            type="text"
            onChange={handleInputChange}
            input_value={company_information.city}
          />
          <LabelInput2
            text="State"
            placeholder="State / Province"
            type="text"
            onChange={handleInputChange}
            input_value={company_information.state}
          />
        </div>
      </div>
    </section>
  );
}

export default CompanyInformation;
