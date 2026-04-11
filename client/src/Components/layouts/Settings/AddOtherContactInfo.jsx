import React, { useState } from "react";
import Button from "../../common/Button";
import LabelInput2 from "../../common/LabelInput2";
import { showError } from "../../../utils/toastUtils";

function AddOtherContactInfo({ onAddContact, otherContacts }) {
  const [showForm, setShowForm] = useState(false);

  const [newContactInfo, setNewContactInfo] = useState({
    label_name: "",
    contact_value: "",
  });

  const handleInputChange = (value, id) => {
    setNewContactInfo((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      newContactInfo.label_name.trim() &&
      newContactInfo.contact_value.trim()
    ) {
      const contact = {
        label_name: newContactInfo.label_name
          .toLowerCase()
          .replace(/\s+/g, "_"),
        value: newContactInfo.contact_value,
      };
      const exist = (otherContacts || [])?.find(
        ([key, value]) =>
          key.toLocaleLowerCase() === contact.label_name.toLocaleLowerCase(),
      );
      if (exist || exist?.length > 0)
        return showError("Contact already exist!");
      onAddContact(contact);
      setNewContactInfo({ label_name: "", contact_value: "" });
      setShowForm(false);
    }
  };

  const handleCancel = () => {
    setNewContactInfo({ label_name: "", contact_value: "" });
    setShowForm(false);
  };

  const handleAddingContactInfo = () => {
    setShowForm(true);
  };

  return (
    <div className="w-full">
      {!showForm ? (
        <Button
          text="Add Other Contact Info"
          class_name="w-full py-3 border border-lighter transition-all duration-200 ease-in-out text-text font-semibold rounded-small hover:bg-lighter"
          onclick={handleAddingContactInfo}
        />
      ) : (
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="w-full space-y-4 p-4 border border-lighter rounded-small bg-gray-50"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <LabelInput2
              text="Label Name"
              id="label_name"
              placeholder="e.g. Twitter, WhatsApp, Skype"
              type="text"
              onChange={handleInputChange}
              required
            />
            <LabelInput2
              text="Contact Value"
              id="contact_value"
              placeholder="e.g. @username, +91 00000 00000"
              type="text"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="flex gap-3 justify-end">
            <Button
              text="Cancel"
              class_name="px-4 py-2 bg-gray-200 text-gray-700 rounded-small hover:bg-gray-300 transition-colors"
              onclick={handleCancel}
              type="button"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue text-white rounded-small hover:bg-blue-dark transition-colors"
            >
              Add Contact
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default AddOtherContactInfo;
