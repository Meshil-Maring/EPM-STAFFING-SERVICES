import React from "react";
import LabelInput2 from "../../common/LabelInput2";
import SettingsHeaders from "./SettingsHeaders";

function CompanyInformation({ company_information, onCompanyUpdate }) {
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
            id="name"
            placeholder="e.g. EMP Services"
            type="text"
            onChange={onCompanyUpdate}
            default_value={company_information.name || ""}
          />
          <LabelInput2
            text="Registration Number"
            id="registration_number"
            placeholder="CIN / Registration No."
            type="text"
            onChange={onCompanyUpdate}
            default_value={company_information.registration_number || ""}
          />
        </div>

        <div className="w-full">
          <LabelInput2
            text="Address"
            id="address"
            placeholder="Full office address"
            type="text"
            input_style="w-full min-h-20 text-left py-2 border border-lighter px-3 rounded-extra_small focus:outline-none focus:ring-2 focus:ring-nevy_blue transition-all"
            onChange={onCompanyUpdate}
            default_value={company_information.address || ""}
          />
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          <LabelInput2
            text="City"
            id="city"
            placeholder="City"
            type="text"
            onChange={onCompanyUpdate}
            default_value={company_information.city || ""}
          />
          <LabelInput2
            text="State"
            id="state"
            placeholder="State / Province"
            type="text"
            onChange={onCompanyUpdate}
            default_value={company_information.state || ""}
          />
        </div>
      </div>
    </section>
  );
}

export default CompanyInformation;
