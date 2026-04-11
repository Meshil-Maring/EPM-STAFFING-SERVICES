import React from "react";
import LabelInput2 from "../../common/LabelInput2";
import SettingsHeaders from "./SettingsHeaders";

/**
 * Company Information section component
 *
 * Maps to backend data structure:
 * - company_name: Company name field
 * - registration_number: Company registration number
 * - city: City location
 * - state: State/Province location
 * - industry_type: Industry type (not currently displayed but available)
 * - company_description: Company description (not currently displayed but available)
 */
function CompanyInformation({ company_information, onCompanyUpdate }) {
  if (!company_information) return;
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
            id="company_name"
            placeholder="e.g. EMP Services"
            type="text"
            onChange={onCompanyUpdate}
            value={company_information?.company_name || "N/A"}
          />
          <LabelInput2
            text="Registration Number"
            id="registration_number"
            placeholder="CIN / Registration No."
            type="text"
            onChange={onCompanyUpdate}
            value={company_information?.registration_number || "N/A"}
          />
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          <LabelInput2
            text="City"
            id="city"
            placeholder="City"
            type="text"
            onChange={onCompanyUpdate}
            value={company_information?.city || "N/A"}
          />
          <LabelInput2
            text="State"
            id="state"
            placeholder="State / Province"
            type="text"
            onChange={onCompanyUpdate}
            value={company_information?.state || "N/A"}
          />
        </div>

        {/* Industry Type field - available in backend but not currently displayed */}

        <div className="w-full">
          <LabelInput2
            text="Industry Type"
            id="industry_type"
            placeholder="e.g. Technology, Banking, Healthcare"
            type="text"
            onChange={onCompanyUpdate}
            value={company_information?.industry_type || "N/A"}
          />
        </div>
      </div>
    </section>
  );
}

export default CompanyInformation;
