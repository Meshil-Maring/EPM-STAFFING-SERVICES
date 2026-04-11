import React, { useState, useEffect } from "react";
import SettingsHeaders from "./SettingsHeaders";
import ContactField from "./ContactField";
import AddOtherContactInfo from "./AddOtherContactInfo";
import DynamicContactField from "./DynamicContactField";

function ContactInformation({ contact_information, onCompanyUpdate }) {
  const [otherContacts, setOtherContacts] = useState([]);

  const handleAddContact = (newContact) => {
    const updatedContacts = [
      ...otherContacts,
      [newContact?.label_name, newContact?.value],
    ];
    // adding the new contact into the form
    setOtherContacts(updatedContacts);
    onCompanyUpdate(Object.fromEntries(updatedContacts), "others");
  };

  useEffect(() => {
    const otherContactInformation = contact_information?.others
      ? Object.entries(contact_information?.others)
      : [];
    setOtherContacts(otherContactInformation);
  }, []);

  const handleRemoveContact = (contactLabel) => {
    const { [contactLabel]: deleted, ...rest } = otherContacts;
    onCompanyUpdate(rest, "others");
  };

  const handleDynamicContactChange = (val, contactLabel) => {
    // Create new others object with updated value
    const currentContacts = Object.fromEntries(otherContacts);

    const updated = {
      ...currentContacts,
      [contactLabel]: val,
    };

    setOtherContacts(Object.entries(updated));
    // Update parent state
    onCompanyUpdate(updated, "others");
  };

  // fallback for no contact information
  if (!contact_information) return;

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
            text="Contact Email"
            id="email"
            placeholder="e.g. contact@company.com"
            type="email"
            onChange={onCompanyUpdate}
            value={contact_information?.email || "N/A"}
            required
          />
          <ContactField
            text="Phone"
            id="phone"
            placeholder="+91 00000 00000"
            type="tel"
            onChange={onCompanyUpdate}
            value={contact_information?.phone || "N/A"}
          />
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          <ContactField
            text="Website"
            id="website"
            placeholder="https://www.company.com"
            type="url"
            onChange={onCompanyUpdate}
            value={contact_information?.website || "N/A"}
          />
          <ContactField
            text="LinkedIn"
            id="linkedIn"
            placeholder="linkedin.com/company/name"
            type="url"
            onChange={onCompanyUpdate}
            value={contact_information?.linkedIn || "N/A"}
          />
        </div>

        {otherContacts.length > 0 && (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
            {otherContacts.map(([label, value], i) => (
              <DynamicContactField
                key={i}
                field={{ lbl: label, val: value }}
                onChange={handleDynamicContactChange}
                onRemove={handleRemoveContact}
                index={label}
              />
            ))}
          </div>
        )}

        <AddOtherContactInfo
          otherContacts={otherContacts}
          onAddContact={handleAddContact}
        />
      </div>
    </section>
  );
}

export default ContactInformation;
