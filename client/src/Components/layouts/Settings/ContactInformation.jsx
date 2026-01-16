import React from "react";
import LabelInput2 from "../../common/LabelInput2";
import SettingsHeaders from "./SettingsHeaders";

function ContactInformation({ contact_information }) {
  const handleInputChange = (value) => {
    // Logic for updating state goes here
  };

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
            placeholder="e.g. contact@company.com"
            type="email"
            onChange={handleInputChange}
            input_value={contact_information.email}
            required
          />
          <LabelInput2
            text="Phone"
            placeholder="+91 00000 00000"
            type="tel"
            onChange={handleInputChange}
            input_value={contact_information.phone}
          />
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          <LabelInput2
            text="Website"
            placeholder="https://www.company.com"
            type="url"
            onChange={handleInputChange}
            input_value={contact_information.website}
          />
          <LabelInput2
            text="LinkedIn"
            placeholder="linkedin.com/company/name"
            type="url"
            onChange={handleInputChange}
            input_value={contact_information.linked_in}
          />
        </div>
      </div>
    </section>
  );
}

export default ContactInformation;
