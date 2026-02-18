import React, { useContext, useEffect, useState } from "react";
import Label from "../../../common/Label";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "../../../common/Icon";
import LabelInput from "../../../common/LabelInput";
import Button from "../../../common/Button";
import LabelTextArea from "../../../common/LabelTextArea";
import { Company_context } from "../../../../context/AccountsContext";

function CompanyManageOverlay({ company, setClosing }) {
  if (!company)
    return (
      <div className="w-full h-full flex items-center justify-center bg-lighter p-2">
        <p className="font-semibold text-lg text-text_l_b">
          No Information Loaded about this Company
        </p>
      </div>
    );

  const { updateWholeCompany, deleteCompany, companyAccounts } =
    useContext(Company_context);
  const comp_id = Object.keys(companyAccounts || {}).find(
    (key) => (companyAccounts?.[key] || {}) === company,
  );
  const elements = [
    { label: "Email", value: company?.email, id: "email" },
    { label: "Phone", value: company?.["phone number"], id: "phone number" },
    { label: "Location", value: company?.address, id: "address" },
    {
      label: "CIN",
      value: company?.["registration number"],
      id: "registration number",
    },
  ];

  const [company_form, setCompany_form] = useState({
    ...company,
    name: "",
    email: "",
    "phone number": "",
    address: "",
    "registration number": "",
    description: "",
  });

  useEffect(() => {
    setCompany_form({
      ...company,
      name: company?.name,
      email: company?.email,
      "phone number": company?.["phone number"],
      address: company?.address,
      "registration number": company?.["registration number"],
      description: company?.description,
    });
  }, [company]);

  const handleInputChange = (value, id) => {
    setCompany_form((prev) => ({ ...prev, [id]: value }));
  };

  const input_class =
    "px-2 py-1 w-full rounded-small text-sm focus:border-none border border-light/60 focus:ring-2 ring-nevy_blue";
  const label_class = "text-sm font-semibold";

  const [deleteOverlay, setDeleteOverlay] = useState(false);
  const [saveUpdates, setSaveUpdates] = useState(false);
  const [error, setError] = useState({ type: "", text: "" });
  const handleClicking = (name) => {
    switch (name) {
      case "Delete Client":
        setDeleteOverlay(true);
        break;
      case "Save Updates":
        setSaveUpdates(true);
        const changed_fields_keys = Object.keys(company_form).filter(
          (key) => company_form[key] !== company[key],
        );
        try {
          if (changed_fields_keys.length > 0) {
            updateWholeCompany(comp_id, company_form);
            setError({ type: "success", text: "Changes saved successfully" });
            setSaveUpdates(false);
            setTimeout(() => {
              setError({ type: "", text: "" });
              setTimeout(() => {
                setClosing(false);
              }, [500]);
            }, [2000]);
          } else {
            setError({ type: "success", text: "No Changes were made" });
            setSaveUpdates(false);
            setTimeout(() => {
              setError({ type: "", text: "" });
              setTimeout(() => {
                setClosing(false);
              }, [500]);
            }, [2000]);
          }
        } catch (err) {
          setError({ type: "error", text: "Failed to save changes" + err });
        }
    }
  };

  const handleConfirm = () => {
    setError({ type: "success", text: "Deleting..." });
    setTimeout(() => {
      try {
        setError({ type: "success", text: "Company deleted successfully" });
        setTimeout(() => {
          setError({ type: "", text: "" });
          deleteCompany(comp_id);
        }, 2000);
      } catch (e) {
        console.log(`Error: ${e}`);
        setError({ type: "error", text: "Error, Delete action failed" });
        setTimeout(() => {
          setError({ type: "", text: "" });
        }, 2000);
      }
    }, 2000);
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
            {error.text !== "" && (
              <div
                className={`w-[80%] mx-auto flex flex-col items-center font-semibold text-sm rounded-small p-2 justify-center ${error.type === "error" ? "text-red-dark bg-red-light " : "text-text_green bg-light_green "}`}
              >
                <span>{error.text}</span>
              </div>
            )}
            <LabelInput
              onchange={handleInputChange}
              default_value={company.name}
              id={"name"}
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
                    default_value={el.value}
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
              onchange={handleInputChange}
              default_value={company["description"]}
              id={"description"}
              text={"Description"}
              label_class_name={label_class}
              textarea_class_name={input_class}
              type={"text"}
            />
            <div className="w-full items-center justify-center gap-4 flex flex-row">
              {["Delete Client", "Save Updates"].map((btn, i) => {
                const isSave = btn === "Save Updates";
                return (
                  <Button
                    onclick={handleClicking}
                    text={
                      isSave ? (saveUpdates ? "Saving Updates..." : btn) : btn
                    }
                    type="button"
                    key={`btn-${i}`}
                    class_name={`w-full flex items-center justify-center text-center bg-g_btn text-text_white p-2 rounded-small tracking-wide`}
                  />
                );
              })}
            </div>
            {deleteOverlay && (
              <div
                onClick={() => setDeleteOverlay(false)}
                className="w-full h-full p-4 bg-light_black absolute top-0 left-0 flex items-center justify-center"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                    type: "spring",
                    stiffness: 150,
                  }}
                  onClick={(e) => e.stopPropagation()}
                  className="w-full bg-b_white p-2  top-0 left-0 rounded-small items-center justify-center flex flex-col"
                >
                  <Label
                    text={`⚠ Are you sure you want to delete "${company.name}"`}
                  />
                  <div className="flex flex-row items-center justify-center gap-2">
                    {["Confirm", "Cancel"].map((btn) => {
                      const handleBtnClick = (name) => {
                        switch (name) {
                          case "Confirm":
                            handleConfirm();
                            break;
                          case "Cancel":
                            setDeleteOverlay(false);
                            setError({
                              type: "success",
                              text: "Canceled deletion",
                            });
                            setTimeout(() => {
                              setError({ type: "", text: "" });
                            }, [2000]);
                            break;
                        }
                      };
                      const isConfirm = btn === "Confirm";
                      return (
                        <Button
                          onclick={handleBtnClick}
                          key={btn}
                          text={btn}
                          class_name={`px-2 py-1 rounded-small ${isConfirm ? "text-text_white bg-g_btn" : "border border-lighter"}`}
                        />
                      );
                    })}
                  </div>
                </motion.div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default CompanyManageOverlay;
