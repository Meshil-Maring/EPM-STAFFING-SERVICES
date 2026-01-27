import React from "react";
import LabelInput2 from "../../common/LabelInput2";
import SettingsHeaders from "./SettingsHeaders";

function ContactInformation({ contact_information, onCompanyUpdate }) {
  return (
    <section className="w-full flex flex-col border p-6 md:p-8 rounded-small border-lighter shadow-sm items-center justify-start gap-8 bg-white">
      <SettingsHeaders
        icon="ri-mail-line"
        icon_bg="bg-red-dark"
        heading="Contact Information"
        label="How clients and candidates can reach you"
      />

      <div className="w-full flex flex-col items-start justify-start gap-6">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          <LabelInput2
            text="Email"
            id="email"
            placeholder="e.g. contact@company.com"
            type="email"
            onChange={onCompanyUpdate}
            input_value={contact_information?.email || ""}
            required
          />
          <LabelInput2
            text="Phone"
            id="phone_number"
            placeholder="+91 00000 00000"
            type="tel"
            onChange={onCompanyUpdate}
            input_value={contact_information?.phone_number || ""}
          />
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          <LabelInput2
            text="Website"
            id="website"
            placeholder="https://www.company.com"
            type="url"
            onChange={onCompanyUpdate}
            input_value={contact_information?.website || ""}
          />
          <LabelInput2
            text="LinkedIn"
            id="linkedIn"
            placeholder="linkedin.com/company/name"
            type="url"
            onChange={onCompanyUpdate}
            input_value={contact_information?.linkedIn || ""}
          />
        </div>
      </div>
    </section>
  );
}

export default ContactInformation;
