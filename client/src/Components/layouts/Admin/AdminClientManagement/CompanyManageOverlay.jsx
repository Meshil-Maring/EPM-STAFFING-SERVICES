import React, { useState } from "react";
import Label from "../../../common/Label";
import { motion, AnimatePresence } from "framer-motion";
import LabelInput from "../../../common/LabelInput";
import Button from "../../../common/Button";
import LabelTextArea from "../../../common/LabelTextArea";
import DeleteComponent from "../common/DeleteComponent";
import { showError, showSuccess, showInfo } from "../../../../utils/toastUtils";
import {
  deleteClient,
  saveClients,
} from "./end-point-function/client_management";
import {
  Building2,
  X,
  Save,
  Trash2,
  Mail,
  Phone,
  MapPin,
  Hash,
  FileText,
  User,
  AlertCircle,
} from "lucide-react";

function CompanyManageOverlay({ company, refresh, setClosing }) {
  if (!company)
    return (
      <div className="w-full h-full flex items-center justify-center bg-slate-50 p-2">
        <div className="flex flex-col items-center gap-3 text-slate-400">
          <AlertCircle size={40} strokeWidth={1.5} />
          <p className="font-semibold text-base text-slate-500">
            No company information loaded
          </p>
        </div>
      </div>
    );

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

  const [company_form, setCompany_form] = useState({
    company_name,
    email,
    phone,
    street,
    city,
    state,
    pin_code,
    registration_number,
    company_description,
  });

  const [deleteOverlay, setDeleteOverlay] = useState(false);
  const [clicked, setClicked] = useState(false);

  const handleInputChange = (value, id) => {
    setCompany_form((prev) => ({ ...prev, [id]: value }));
  };

  const input_class =
    "px-3 py-2 w-full rounded-lg text-sm border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all bg-white text-slate-700 placeholder-slate-400";
  const label_class =
    "text-xs font-semibold text-slate-700 uppercase tracking-wide";

  // Field groups with icons
  const contactFields = [
    {
      label: "Email",
      value: company_form?.email || "",
      id: "email",
      icon: Mail,
    },
    {
      label: "Phone",
      value: company_form?.phone || "",
      id: "phone",
      icon: Phone,
    },
  ];
  const addressFields = [
    {
      label: "Street",
      value: company_form?.street || "",
      id: "street",
      icon: MapPin,
    },
    {
      label: "City",
      value: company_form?.city || "",
      id: "city",
      icon: MapPin,
    },
    {
      label: "State",
      value: company_form?.state || "",
      id: "state",
      icon: MapPin,
    },
    {
      label: "Pin Code",
      value: company_form?.pin_code || "",
      id: "pin_code",
      icon: Hash,
    },
  ];
  const legalFields = [
    {
      label: "CIN / Registration No.",
      value: company_form?.registration_number || "",
      id: "registration_number",
      icon: FileText,
    },
  ];

  const handleClicking = async (name) => {
    setClicked(true);
    if (name === "Delete Client") {
      setDeleteOverlay(true);
      setClicked(false);
    } else if (name === "Save Updates") {
      const changed = Object.keys(company_form).filter(
        (k) => company_form[k] !== company[k],
      );
      if (changed.length === 0) {
        setClicked(false);
        setClosing(false);
        return showInfo("No changes were made");
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

  const handleConfirm = async (name, companyId) => {
    if (name === "Cancel") {
      setDeleteOverlay(false);
      return setClicked(false);
    }
    if (name === "Confirm") {
      const res = await deleteClient(companyId);
      if (!res.success) return showError(res.message);
      refresh();
      showSuccess("Company deleted successfully");
    }
    setClosing(false);
    setClicked(false);
  };

  return (
    <AnimatePresence>
      {/* ── Simple backdrop ── */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={() => setClosing(false)}
        className="fixed inset-0 z-200 flex items-center justify-center p-4"
        style={{ background: "rgba(15, 23, 42, 0.45)" }}
      >
        {/* ── Panel ── */}
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.97 }}
          transition={{
            duration: 0.25,
            type: "spring",
            stiffness: 300,
            damping: 28,
          }}
          className="relative flex flex-col overflow-hidden rounded-2xl bg-white"
          style={{
            width: "clamp(380px, 42vw, 540px)",
            maxHeight: "92vh",
            height: "92vh",
            boxShadow:
              "0 20px 60px rgba(0,0,0,0.15), 0 0 0 1px rgba(99,102,241,0.1)",
          }}
        >
          {/* Top accent bar */}
          <div
            className="h-0.75 w-full shrink-0"
            style={{ background: "linear-gradient(90deg, #6366f1, #8b5cf6)" }}
          />

          {/* ── Header ── */}
          <div
            className="flex items-center justify-between px-5 py-4 shrink-0"
            style={{
              background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  boxShadow: "0 4px 12px rgba(99,102,241,0.35)",
                }}
              >
                <Building2 size={16} className="text-white" />
              </div>
              <div>
                <p className="text-white font-bold text-sm leading-tight">
                  Manage Client
                </p>
                <p className="text-slate-400 text-xs mt-0.5">
                  Update client information
                </p>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.15 }}
              onClick={() => setClosing(false)}
              className="w-8 h-8 cursor-pointer flex rounded-full items-center justify-center text-slate-400 hover:text-white transition-colors"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <X size={15} />
            </motion.button>
          </div>

          {/* ── Scrollable Body ── */}
          <div
            className="flex-1 min-h-0 overflow-y-auto flex flex-col gap-5 p-5"
            style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
          >
            {/* Company Name — full width hero input */}
            <div className="flex flex-col gap-1.5">
              <label className={label_class}>Company Name</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400">
                  <User size={14} />
                </div>
                <LabelInput
                  onchange={handleInputChange}
                  value={company_form?.company_name}
                  id="company_name"
                  text=""
                  label_class_name="hidden"
                  input_class_name={`${input_class} pl-3 font-semibold text-slate-800`}
                  type="text"
                />
              </div>
            </div>

            {/* ── Contact Section ── */}
            <SectionCard title="Contact Details" icon={Mail}>
              <div className="flex flex-col gap-3">
                {contactFields.map(({ label, value, id, icon: Icon }) => (
                  <FieldWithIcon
                    key={id}
                    label={label}
                    value={value}
                    id={id}
                    icon={Icon}
                    input_class={input_class}
                    label_class={label_class}
                    handleInputChange={handleInputChange}
                  />
                ))}
              </div>
            </SectionCard>

            {/* ── Address Section ── */}
            <SectionCard title="Address" icon={MapPin}>
              <div className="grid grid-cols-2 gap-3">
                {addressFields.map(({ label, value, id, icon: Icon }) => (
                  <FieldWithIcon
                    key={id}
                    label={label}
                    value={value}
                    id={id}
                    icon={Icon}
                    input_class={input_class}
                    label_class={label_class}
                    handleInputChange={handleInputChange}
                  />
                ))}
              </div>
            </SectionCard>

            {/* ── Legal Section ── */}
            <SectionCard title="Legal" icon={FileText}>
              {legalFields.map(({ label, value, id, icon: Icon }) => (
                <FieldWithIcon
                  key={id}
                  label={label}
                  value={value}
                  id={id}
                  icon={Icon}
                  input_class={input_class}
                  label_class={label_class}
                  handleInputChange={handleInputChange}
                />
              ))}
            </SectionCard>

            {/* ── Description ── */}
            <SectionCard title="Description" icon={FileText}>
              <LabelTextArea
                onchange={handleInputChange}
                value={company_form?.company_description || ""}
                id="company_description"
                text=""
                label_class_name="hidden"
                textarea_class_name={`${input_class} resize-none min-h-[80px]`}
                type="text"
                isMax={false}
              />
            </SectionCard>

            {/* ── Action Buttons ── */}
            <div className="flex gap-3 pt-1 pb-1">
              {/* Delete */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleClicking("Delete Client")}
                disabled={clicked}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold transition-all"
                style={{
                  border: "1.5px solid #fca5a5",
                  color: "#ef4444",
                  background: "#fff5f5",
                  opacity: clicked ? 0.6 : 1,
                }}
              >
                <Trash2 size={14} />
                Delete Client
              </motion.button>

              {/* Save */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleClicking("Save Updates")}
                disabled={clicked}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold text-white transition-all bg-g_btn"
                style={{
                  background: clicked ? "bg-g_btn" : "bg-g_btn",
                  boxShadow: clicked ? "none" : "0 4px 14px bg-g_btn",
                  opacity: clicked ? 0.7 : 1,
                }}
              >
                <Save size={14} />
                Save Updates
              </motion.button>
            </div>
          </div>

          {/* ── Delete Confirmation ── */}
          {deleteOverlay && (
            <div
              className="absolute inset-0 z-10 flex items-center justify-center p-6"
              style={{
                background: "rgba(15,23,42,0.4)",
                backdropFilter: "blur(3px)",
              }}
            >
              <DeleteComponent
                Close={setDeleteOverlay}
                item={company_form?.company_name}
                company_id={company?.user_id}
                handleConfirm={handleConfirm}
              />
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ── Reusable section card ──
function SectionCard({ title, icon: Icon, children }) {
  return (
    <div className="rounded-xl" style={{ border: "1px solid #e2e8f0" }}>
      {/* Section header */}
      <div
        className="flex items-center gap-2 px-4 py-2.5 rounded-t-xl"
        style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}
      >
        <div
          className="w-5 h-5 rounded-md flex items-center justify-center shrink-0"
          style={{ background: "linear-gradient(135deg, #ede9fe, #ddd6fe)" }}
        >
          <Icon size={11} style={{ color: "#8b5cf6" }} />
        </div>
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-700">
          {title}
        </span>
      </div>
      <div className="p-4 pb-5">{children}</div>
    </div>
  );
}

// ── Field with left icon ──
function FieldWithIcon({
  label,
  value,
  id,
  icon: Icon,
  input_class,
  label_class,
  handleInputChange,
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className={label_class}>{label}</label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
          <Icon size={13} />
        </div>
        <LabelInput
          onchange={handleInputChange}
          value={value}
          id={id}
          text=""
          label_class_name="hidden"
          input_class_name={`${input_class} pl-3`}
          type="text"
        />
      </div>
    </div>
  );
}

export default CompanyManageOverlay;
