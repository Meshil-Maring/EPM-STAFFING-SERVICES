import React, { useState } from "react";
import Button from "../../common/Button";
import LabelInput2 from "../../common/LabelInput2";

function AddOtherContactInfo({ onAddContact }) {
  const [showForm, setShowForm] = useState(false);
  const [labelText, setLabelText] = useState("");
  const [contactValue, setContactValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (labelText.trim() && contactValue.trim()) {
      onAddContact({
        id: labelText.toLowerCase().replace(/\s+/g, "_"),
        label: labelText,
        value: contactValue,
      });
      setLabelText("");
      setContactValue("");
      setShowForm(false);
    }
  };

  const handleCancel = () => {
    setLabelText("");
    setContactValue("");
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
          onSubmit={handleSubmit}
          className="w-full space-y-4 p-4 border border-lighter rounded-small bg-gray-50"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <LabelInput2
              text="Label Name"
              id="label_name"
              placeholder="e.g. Twitter, WhatsApp, Skype"
              type="text"
              onChange={(value) => setLabelText(value)}
              input_value={labelText}
              required
            />
            <LabelInput2
              text="Contact Value"
              id="contact_value"
              placeholder="e.g. @username, +91 00000 00000"
              type="text"
              onChange={(value) => setContactValue(value)}
              input_value={contactValue}
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
            <Button
              onclick={handleSubmit}
              text="Add Contact"
              class_name="px-4 py-2 bg-blue text-white rounded-small hover:bg-blue-dark transition-colors"
              type="submit"
            />
          </div>
        </form>
      )}
    </div>
  );
}

export default AddOtherContactInfo;
