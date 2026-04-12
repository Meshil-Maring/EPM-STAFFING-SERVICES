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

  // contact elements
  const elements = [
    {
      label: "Company Name",
      id: "company_name",
      type: "text",
      value: company_information?.company_name || "N/A",
    },
    {
      label: "Registration Number",
      id: "registration_number",
      type: "text",
      value: company_information?.registration_number || "N/A",
    },
    {
      label: "Street",
      id: "street",
      type: "text",
      value: company_information?.street || "N/A",
    },
    {
      label: "City",
      id: "city",
      type: "text",
      value: company_information?.city || "N/A",
    },
    {
      label: "State",
      id: "state",
      type: "text",
      value: company_information?.state || "N/A",
    },
    {
      label: "Pin Code",
      id: "pin_code",
      type: "text",
      value: company_information?.pin_code || "N/A",
    },
  ];

  return (
    <section className="w-full flex flex-col border p-6 md:p-8 rounded-small border-lighter shadow-sm items-center justify-start gap-8 bg-white">
      <SettingsHeaders
        icon="ri-building-line"
        icon_bg="bg-nevy_blue"
        heading="Company Information"
        label="Basic details about your organization"
      />

      <div className="w-full grid grid-cols-2 items-start justify-start gap-6">
        {elements.map((el, i) => (
          <LabelInput2
            key={i}
            text={el.label}
            id={el.id}
            placeholder={`e.g. ${el.label}`}
            type={el.type}
            onChange={onCompanyUpdate}
            value={el.value}
          />
        ))}
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
    </section>
  );
}

export default CompanyInformation;
