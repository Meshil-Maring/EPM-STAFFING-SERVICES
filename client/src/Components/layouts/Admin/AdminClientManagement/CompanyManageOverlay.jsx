import React, { useState } from "react";
import Label from "../../../common/Label";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "../../../common/Icon";
import LabelInput from "../../../common/LabelInput";
import Button from "../../../common/Button";
import LabelTextArea from "../../../common/LabelTextArea";
import { Company_context } from "../../../../context/AccountsContext";
import DeleteComponent from "../common/DeleteComponent";
import { showError, showSuccess, showInfo } from "../../../../utils/toastUtils";

import {
  deleteClient,
  saveClients,
} from "./end-point-function/client_management";

function CompanyManageOverlay({ company, refresh, setClosing }) {
  // fallback display for missing company information
  if (!company)
    return (
      <div className="w-full h-full flex items-center justify-center bg-lighter p-2">
        <p className="font-semibold text-lg text-text_l_b">
          No Information Loaded about this Company
        </p>
      </div>
    );

  //  distructuring important information
  const {
    user_id,
    company_description,
    company_name,
    email,
    phone,
    street,
    city,
    state,
    pin_code,
    registration_number,
  } = company;

  // local company information : to allow editing
  const [company_form, setCompany_form] = useState({
    company_name: company_name,
    email: email,
    phone: phone,
    street: street,
    city: city,
    state: state,
    pin_code: pin_code,
    registration_number: registration_number,
    company_description: company_description,
  });

  // Input elements
  const elements = [
    { label: "Email", value: company_form?.email || "N/A", id: "email" },
    { label: "Phone", value: company_form?.phone, id: "phone" },
    { label: "Street", value: company_form?.street, id: "street" },
    { label: "City", value: company_form?.city, id: "city" },
    { label: "State", value: company_form?.state, id: "state" },
    { label: "Pin Code", value: company_form?.pin_code, id: "pin_code" },
    {
      label: "CIN",
      value: company_form?.registration_number || "N/A",
      id: "registration_number",
    },
  ];

  //
  const handleInputChange = (value, id) => {
    setCompany_form((prev) => ({ ...prev, [id]: value }));
  };

  const input_class =
    "px-2 py-1 w-full rounded-small text-sm focus:border-none border border-light/60 focus:ring-2 ring-nevy_blue";
  const label_class = "text-sm font-semibold";

  const [deleteOverlay, setDeleteOverlay] = useState(false);
  const [clicked, setClicked] = useState(false);

  const handleClicking = async (name) => {
    setClicked(true);
    if (name === "Delete Client") {
      setDeleteOverlay(true);
    } else if (name === "Save Updates") {
      const changed_fields_keys = Object.keys(company_form).filter(
        (key) => company_form[key] !== company[key],
      );
      if (changed_fields_keys.length === 0) {
        setClicked(false);
        setClosing(false);
        return showInfo("No Changes were made");
      }
      try {
        await saveClients(
          user_id,
          company_form.company_name,
          company_form.company_description,
          company_form.registration_number,
          company_form.email,
          company_form.phone,
          company_form.street,
          company_form.city,
          company_form.state,
          company_form.pin_code,
        );
        showSuccess("Changes saved successfully");
        setClosing(false);
      } catch (err) {
        return showError("Failed to save changes: " + err);
      } finally {
        setClicked(false);
        refresh();
      }
    }
  };

  // confirming deletion
  const handleConfirm = async (name, companyId) => {
    if (name === "Confirm") {
      const res = await deleteClient(companyId);
      if (!res.success) return showError(res.message);
      refresh();
      showSuccess("Company deleted successfully");
    } else {
      showInfo("Deletion action canceled");
    }
    setClosing(false);
    setClicked(false);
  };

  return (
    <AnimatePresence>
      <div
        onClick={() => setClosing(false)}
        className="w-full h-full overflow-hidden absolute p-4 top-0 left-0 flex items-center justify-center bg-light_black z-200"
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2, type: "tween", ease: "easeInOut" }}
          className="w-[40%] overflow-hidden max-h-full rounded-small bg-b_white flex flex-col justify-start"
        >
          <header className="w-full px-4 py-2 flex flex-row items-center justify-between bg-g_btn text-text_white">
            <div className="flex-1 font-semibold flex flex-col items-start justify-start">
              <Label
                text={"Manage Client"}
                class_name={"text-[clamp(1.4em,1vw,1.8em) font-bold"}
              />
              <Label
                text={"Update client Information"}
                class_name={"text-sm"}
              />
            </div>
            <span
              onClick={() => setClosing(false)}
              className="font-semibold text-sm rounded-full hover:bg-lighter hover:text-red-dark transition-all ease-in-out duration-200 flex items-center justify-center"
            >
              <Icon
                icon={"ri-close-line"}
                class_name="p-4 rounded-full h-5 w-5"
              />
            </span>
          </header>

          <div className="w-full p-4 overflow-y-auto no-scrollbar flex flex-col gap-4 relative">
            <LabelInput
              onchange={handleInputChange}
              value={company_form?.company_name}
              id={"company_name"}
              text={"Company Name"}
              label_class_name={label_class}
              input_class_name={input_class}
              type={"text"}
            />
            <div className="w-full grid grid-cols-2 gap-4 items-center justify-center">
              {elements.map((el, i) => {
                return (
                  <LabelInput
                    key={`el-${i}`}
                    onchange={handleInputChange}
                    value={el.value}
                    id={el.id}
                    text={el.label}
                    label_class_name={label_class}
                    input_class_name={input_class}
                    type={"text"}
                  />
                );
              })}
            </div>
            <LabelTextArea
              value={company_form?.company_description}
              onchange={handleInputChange}
              id={"company_description"}
              text={"Description"}
              label_class_name={label_class}
              textarea_class_name={input_class}
              type={"text"}
              isMax={false}
            />
            <div className="w-full items-center justify-center gap-4 flex flex-row">
              {["Delete Client", "Save Updates"].map((btn, i) => {
                return (
                  <Button
                    onclick={handleClicking}
                    text={btn}
                    type="button"
                    key={`btn-${i}`}
                    class_name={`w-full flex items-center justify-center cursor-pointer text-center bg-g_btn text-text_white p-2 rounded-small tracking-wide ${clicked ? "cursor-none pointer-events-none opacity-60" : ""}`}
                  />
                );
              })}
            </div>
            {deleteOverlay && (
              <DeleteComponent
                Close={setDeleteOverlay}
                item={company_form?.company_name}
                company_id={company?.user_id}
                handleConfirm={handleConfirm}
              />
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default CompanyManageOverlay;
