import React, { useState } from "react";
import SettingsHeaders from "./SettingsHeaders";
import ContactField from "./ContactField";
import AddOtherContactInfo from "./AddOtherContactInfo";
import DynamicContactField from "./DynamicContactField";

function ContactInformation({ contact_information, onCompanyUpdate }) {
  const [dynamicContacts, setDynamicContacts] = useState([]);

  const handleAddContact = (newContact) => {
    setDynamicContacts((prev) => [...prev, newContact]);
  };

  const handleRemoveContact = (contactId) => {
    setDynamicContacts((prev) =>
      prev.filter((contact) => contact.id !== contactId),
    );
  };

  const handleDynamicContactChange = (value, contactId) => {
    setDynamicContacts((prev) =>
      prev.map((contact) =>
        contact.id === contactId ? { ...contact, value } : contact,
      ),
    );
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
          <ContactField
            text="Email"
            id="email"
            placeholder="e.g. contact@company.com"
            type="email"
            onChange={onCompanyUpdate}
            input_value={contact_information?.email || ""}
            required
          />
          <ContactField
            text="Phone"
            id="phone_number"
            placeholder="+91 00000 00000"
            type="tel"
            onChange={onCompanyUpdate}
            input_value={contact_information?.phone_number || ""}
          />
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          <ContactField
            text="Website"
            id="website"
            placeholder="https://www.company.com"
            type="url"
            onChange={onCompanyUpdate}
            input_value={contact_information?.website || ""}
          />
          <ContactField
            text="LinkedIn"
            id="linkedIn"
            placeholder="linkedin.com/company/name"
            type="url"
            onChange={onCompanyUpdate}
            input_value={contact_information?.linkedIn || ""}
          />
        </div>

        {dynamicContacts.length > 0 && (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
            {dynamicContacts.map((contact, index) => (
              <DynamicContactField
                key={contact.id}
                field={contact}
                onChange={handleDynamicContactChange}
                onRemove={handleRemoveContact}
                index={index}
              />
            ))}
          </div>
        )}

        <AddOtherContactInfo onAddContact={handleAddContact} />
      </div>
    </section>
  );
}

export default ContactInformation;
