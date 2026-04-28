import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getUserInfo,
  upateCompanyInfo,
  updatePassword,
  updateUser,
  updateUserAddress,
  updateUserContact,
  verifyPassword,
} from "./setting";
import { useAuth } from "../../../../hooks/useAuth";

import {
  Lock,
  Mail,
  Phone,
  Globe,
  Link,
  MapPin,
  Building2,
  User,
  ChevronRight,
  Save,
  Eye,
  EyeOff,
  Check,
  AlertCircle,
} from "lucide-react";
import { showError, showSuccess } from "../../../../utils/toastUtils";

// ─── Shared card styles ───────────────────────────────────────────────────────
const card =
  "bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden";
const hdr =
  "px-7 py-5 border-b border-slate-100 bg-linear-to-r from-slate-50 to-white";
const body = "px-7 py-6 flex flex-col gap-5";

// ─── Toast ────────────────────────────────────────────────────────────────────
function Toast({ msg, type }) {
  if (!msg) return null;
  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-xl shadow-2xl text-sm font-medium ${type === "error" ? "bg-red-500" : "bg-emerald-500"} text-white`}
    >
      {type === "error" ? <AlertCircle size={16} /> : <Check size={16} />}
      {msg}
    </div>
  );
}

// ─── Field ────────────────────────────────────────────────────────────────────
function Field({
  label,
  icon: Icon,
  type = "text",
  value,
  onChange,
  placeholder,
  autoComplete,
}) {
  const [show, setShow] = useState(false);
  const isPwd = type === "password";
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
        {label}
      </label>
      <div className="relative flex items-center">
        {Icon && (
          <Icon
            size={15}
            className="absolute left-3.5 text-slate-400 pointer-events-none"
          />
        )}
        <input
          type={isPwd && !show ? "password" : "text"}
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={`w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 py-2.5 text-sm text-slate-700 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 focus:border-indigo-400 transition ${isPwd ? "pr-10" : "pr-4"}`}
        />
        {isPwd && (
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute right-3.5 text-slate-400 hover:text-slate-600 transition"
          >
            {show ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        )}
      </div>
    </div>
  );
}

// ─── SaveBtn ──────────────────────────────────────────────────────────────────
function SaveBtn({ onClick, loading }) {
  return (
    <div className="flex justify-end">
      <button
        type={onClick ? "button" : "submit"}
        onClick={onClick}
        disabled={loading}
        className="flex items-center gap-2 bg-linear-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white text-sm font-semibold px-6 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-60"
      >
        <Save size={14} />
        {loading ? "Saving…" : "Save Changes"}
      </button>
    </div>
  );
}

// ─── Nav tabs ─────────────────────────────────────────────────────────────────
const TABS = [
  { id: "credentials", label: "Email & Password", icon: Lock },
  { id: "contacts", label: "User Contacts", icon: Phone },
  { id: "address", label: "User Address", icon: MapPin },
  { id: "company", label: "Company Info", icon: Building2 },
];

const INDUSTRY_TYPES = [
  "Banking",
  "IT Services",
  "Insurance",
  "Healthcare",
  "Education",
  "Manufacturing",
  "Retail",
  "Logistics",
  "Consulting",
  "Marketing",
  "Construction",
  "Other",
];

// ─── Settings ─────────────────────────────────────────────────────────────────
export default function Settings() {
  const [tab, setTab] = useState("credentials");
  const [toast, setToast] = useState({ msg: "", type: "success" });

  const [busyCredentials, setBusyCredentials] = useState(false);
  const [busyContacts, setBusyContacts] = useState(false);
  const [busyAddress, setBusyAddress] = useState(false);
  const [busyCompany, setBusyCompany] = useState(false);

  const { user } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ["user_info"],
    queryFn: () => getUserInfo(user.id),
    enabled: !!user?.id,
  });

  const userData = data?.data;

  // ── Credentials state ────────────────────────────────────────────────────────
  const [creds, setCreds] = useState({
    email: "",
    currentPwd: "",
    newPwd: "",
    confirmPwd: "",
  });

  // ── Contacts state ───────────────────────────────────────────────────────────
  const [contacts, setContacts] = useState({
    email: "",
    phone: "",
    website: "",
    linkedin: "",
  });

  // ── Address state ────────────────────────────────────────────────────────────
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    pin_code: "",
  });

  // ── Company state ────────────────────────────────────────────────────────────
  const [company, setCompany] = useState({
    company_name: "",
    industry_type: "",
    registration_number: "",
    description: "",
  });

  // ── Sync all state once userData is available ────────────────────────────────
  useEffect(() => {
    if (!userData) return;

    setContacts({
      email: userData.contact_email ?? "",
      phone: userData.phone ?? "",
      website: userData.website ?? "",
      linkedin: userData.linkedin ?? "",
    });

    setAddress({
      street: userData.street ?? "",
      city: userData.city ?? "",
      state: userData.state ?? "",
      pin_code: userData.pin_code ?? "",
    });

    setCompany({
      company_name: userData.company_name ?? "",
      industry_type: userData.industry_type ?? "",
      registration_number: userData.registration_number ?? "",
      description: userData.company_description ?? "",
    });
  }, [userData]);

  function notify(msg, type = "success") {
    setToast({ msg, type });
    setTimeout(() => setToast({ msg: "", type: "success" }), 3000);
  }

  // ── Save: Credentials ────────────────────────────────────────────────────────
  async function handleCredentials(e) {
    e.preventDefault();
    if (!user?.id) return;

    const emailTouched = creds.email.trim() !== "";
    const pwdTouched = creds.currentPwd || creds.newPwd || creds.confirmPwd;

    if (!emailTouched && !pwdTouched) {
      return showError("Please fill in at least one section to save.");
    }

    if (emailTouched) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(creds.email.trim())) {
        return showError("Enter a valid email address (e.g. you@example.com).");
      }
    }

    if (pwdTouched) {
      if (!creds.currentPwd)
        return showError(
          "Current password is required to change your password.",
        );
      if (!creds.newPwd) return showError("Please enter a new password.");
      if (creds.newPwd.length < 6)
        return showError("New password must be at least 6 characters.");
      if (!/\d/.test(creds.newPwd))
        return showError("New password must contain at least one number.");
      if (!creds.confirmPwd)
        return showError("Please confirm your new password.");
      if (creds.newPwd !== creds.confirmPwd)
        return showError("New password and confirm password do not match.");
    }

    try {
      setBusyCredentials(true);

      if (emailTouched) {
        const res = await updateUser(user.id, creds.email.trim());
        if (!res?.user) return showError("Failed to update email. Try again.");
        showSuccess("Email updated successfully.");
      }

      if (pwdTouched) {
        const verify = await verifyPassword(user.id, creds.currentPwd);
        if (!verify?.success)
          return showError("Current password is incorrect.");

        await updatePassword(user.id, creds.confirmPwd);
        showSuccess("Password changed successfully.");

        setCreds((prev) => ({
          ...prev,
          currentPwd: "",
          newPwd: "",
          confirmPwd: "",
        }));
      }
    } catch (err) {
      showError("Something went wrong. Please try again.");
    } finally {
      setBusyCredentials(false);
    }
  }

  // ── Save: Contacts ───────────────────────────────────────────────────────────
  async function handleContacts() {
    if (!user?.id) return;

    try {
      setBusyContacts(true);

      const res = await updateUserContact(
        user.id,
        contacts.email,
        contacts.phone,
        contacts.linkedin,
        contacts.website,
      );

      if (!res.success) return showError("Save Changes failed");

      showSuccess("Save Changes successfully");
    } catch (err) {
      notify("Failed to save contacts.", "error");
    } finally {
      setBusyContacts(false);
    }
  }

  // ── Save: Address ────────────────────────────────────────────────────────────
  async function handleAddress() {
    if (!user?.id) return;
    try {
      setBusyAddress(true);

      const res = await updateUserAddress(
        user.id,
        address.street,
        address.city,
        address.state,
        address.pin_code,
      );

      if (!res.success) return showError("Save Changes Failed");

      showSuccess("Save Changes Successfully");
    } catch (err) {
      notify("Failed to save address.", "error");
    } finally {
      setBusyAddress(false);
    }
  }

  // ── Save: Company ────────────────────────────────────────────────────────────
  async function handleCompany() {
    if (!user?.id) return;

    try {
      setBusyCompany(true);

      const res = await upateCompanyInfo(
        user.id,
        company.company_name,
        company.registration_number,
        company.description,
        company.industry_type,
      );

      if (!res.success) return showError("Save changes Failed");

      showSuccess("Save Changes Successfully");
    } catch (err) {
      notify("Failed to save company info.", "error");
    } finally {
      setBusyCompany(false);
    }
  }

  // ── Loading skeleton ─────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-slate-400">
          <div className="w-8 h-8 border-2 border-indigo-300 border-t-indigo-600 rounded-full animate-spin" />
          <span className="text-sm">Loading settings…</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full">
      {/* Header */}
      <div className="px-8 py-6 w-full">
        <div className="max-w-full mx-auto flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-linear-to-br from-indigo-500 to-violet-500 flex items-center justify-center">
            <User size={18} className="text-white" />
          </div>
          <div>
            <h1 className="text-black font-bold text-lg">Account Settings</h1>
            <p className="text-slate-400 text-xs">
              Manage your profile, credentials, and company details
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 flex gap-6">
        {/* Sidebar */}
        <aside className="shrink-0">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden sticky top-6">
            <div className="px-4 py-3 border-b border-slate-100">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                Settings
              </p>
            </div>
            <nav className="py-2">
              {TABS.map(({ id, label, icon: Icon }) => {
                const active = tab === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setTab(id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all ${active ? "bg-violet-50 text-violet-600 border-r-2 border-violet-500" : "text-slate-600 hover:bg-slate-50"}`}
                  >
                    <span
                      className={`p-1.5 rounded-lg ${active ? "bg-violet-100" : "bg-slate-100"}`}
                    >
                      <Icon
                        size={14}
                        className={
                          active ? "text-violet-500" : "text-slate-400"
                        }
                      />
                    </span>
                    <span className="flex-1 text-left">{label}</span>
                    {active && (
                      <ChevronRight size={14} className="text-violet-400" />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 min-w-0 flex flex-col gap-6">
          {/* ── Credentials ──────────────────────────────────────────────────── */}
          {tab === "credentials" && (
            <form
              className={card}
              autoComplete="off"
              onSubmit={handleCredentials}
            >
              <div className={hdr}>
                <h2 className="text-base font-semibold text-slate-800">
                  Email &amp; Password
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Update your login email or change your password
                </p>
              </div>
              <div className={body}>
                <Field
                  label="New Email Address"
                  icon={Mail}
                  type="email"
                  value={creds.email}
                  onChange={(v) => setCreds({ ...creds, email: v })}
                  placeholder="newemail@example.com"
                  autoComplete="off"
                />
                <hr className="border-slate-100" />
                <Field
                  label="Current Password"
                  icon={Lock}
                  type="password"
                  value={creds.currentPwd}
                  onChange={(v) => setCreds({ ...creds, currentPwd: v })}
                  placeholder="Enter current password"
                  autoComplete="new-password"
                />
                <div className="grid grid-cols-2 gap-4">
                  <Field
                    label="New Password"
                    icon={Lock}
                    type="password"
                    value={creds.newPwd}
                    onChange={(v) => setCreds({ ...creds, newPwd: v })}
                    placeholder="New password"
                    autoComplete="new-password"
                  />
                  <Field
                    label="Confirm Password"
                    icon={Lock}
                    type="password"
                    value={creds.confirmPwd}
                    onChange={(v) => setCreds({ ...creds, confirmPwd: v })}
                    placeholder="Confirm password"
                    autoComplete="new-password"
                  />
                </div>
                <SaveBtn loading={busyCredentials} />
              </div>
            </form>
          )}

          {/* ── Contacts ─────────────────────────────────────────────────────── */}
          {tab === "contacts" && (
            <div className={card}>
              <div className={hdr}>
                <h2 className="text-base font-semibold text-slate-800">
                  Contact Details
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  How people &amp; clients can reach you
                </p>
              </div>
              <div className={body}>
                <div className="grid grid-cols-2 gap-4">
                  <Field
                    label="Email"
                    icon={Mail}
                    type="email"
                    value={contacts.email}
                    onChange={(v) => setContacts({ ...contacts, email: v })}
                    placeholder="contact@example.com"
                    autoComplete="email"
                  />
                  <Field
                    label="Phone"
                    icon={Phone}
                    value={contacts.phone}
                    onChange={(v) => setContacts({ ...contacts, phone: v })}
                    placeholder="+91 98765 43210"
                    autoComplete="tel"
                  />
                  <Field
                    label="Website"
                    icon={Globe}
                    value={contacts.website}
                    onChange={(v) => setContacts({ ...contacts, website: v })}
                    placeholder="https://yourwebsite.com"
                    autoComplete="url"
                  />
                  <Field
                    label="LinkedIn"
                    icon={Link}
                    value={contacts.linkedin}
                    onChange={(v) => setContacts({ ...contacts, linkedin: v })}
                    placeholder="linkedin.com/in/profile"
                  />
                </div>
                <SaveBtn onClick={handleContacts} loading={busyContacts} />
              </div>
            </div>
          )}

          {/* ── Address ──────────────────────────────────────────────────────── */}
          {tab === "address" && (
            <div className={card}>
              <div className={hdr}>
                <h2 className="text-base font-semibold text-slate-800">
                  Address
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Your registered address details
                </p>
              </div>
              <div className={body}>
                <Field
                  label="Street"
                  icon={MapPin}
                  value={address.street}
                  onChange={(v) => setAddress({ ...address, street: v })}
                  placeholder="123 Main Street, Apt 4B"
                  autoComplete="street-address"
                />
                <div className="grid grid-cols-3 gap-4">
                  <Field
                    label="City"
                    icon={MapPin}
                    value={address.city}
                    onChange={(v) => setAddress({ ...address, city: v })}
                    placeholder="Ludhiana"
                    autoComplete="address-level2"
                  />
                  <Field
                    label="State"
                    icon={MapPin}
                    value={address.state}
                    onChange={(v) => setAddress({ ...address, state: v })}
                    placeholder="Punjab"
                    autoComplete="address-level1"
                  />
                  <Field
                    label="PIN Code"
                    icon={MapPin}
                    value={address.pin_code}
                    onChange={(v) => setAddress({ ...address, pin_code: v })}
                    placeholder="141001"
                    autoComplete="postal-code"
                  />
                </div>
                <SaveBtn onClick={handleAddress} loading={busyAddress} />
              </div>
            </div>
          )}

          {/* ── Company ──────────────────────────────────────────────────────── */}
          {tab === "company" && (
            <div className={card}>
              <div className={hdr}>
                <h2 className="text-base font-semibold text-slate-800">
                  Company Information
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Details about your organization
                </p>
              </div>
              <div className={body}>
                <div className="grid grid-cols-2 gap-4">
                  <Field
                    label="Company Name"
                    icon={Building2}
                    value={company.company_name}
                    onChange={(v) =>
                      setCompany({ ...company, company_name: v })
                    }
                    placeholder="EPM Staffing Services Pvt. Ltd."
                    autoComplete="organization"
                  />
                  <Field
                    label="Registration Number"
                    icon={Building2}
                    value={company.registration_number}
                    onChange={(v) =>
                      setCompany({ ...company, registration_number: v })
                    }
                    placeholder="CIN / GST / PAN"
                  />

                  {/* Industry Type select */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Industry Type
                    </label>
                    <div className="relative">
                      <Building2
                        size={15}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                      />
                      <select
                        value={company.industry_type}
                        onChange={(e) =>
                          setCompany({
                            ...company,
                            industry_type: e.target.value,
                          })
                        }
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-8 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 focus:border-indigo-400 transition appearance-none"
                      >
                        <option value="">Select industry…</option>
                        {INDUSTRY_TYPES.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                      <ChevronRight
                        size={14}
                        className="absolute right-3 top-1/2 -translate-y-1/2 rotate-90 text-slate-400 pointer-events-none"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="col-span-2 flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Description
                    </label>
                    <textarea
                      value={company.description}
                      onChange={(e) =>
                        setCompany({ ...company, description: e.target.value })
                      }
                      placeholder="Brief about your company, what you do, and your mission…"
                      rows={4}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 focus:border-indigo-400 transition resize-none"
                    />
                  </div>
                </div>
                <SaveBtn onClick={handleCompany} loading={busyCompany} />
              </div>
            </div>
          )}
        </main>
      </div>

      <Toast msg={toast.msg} type={toast.type} />
    </div>
  );
}
