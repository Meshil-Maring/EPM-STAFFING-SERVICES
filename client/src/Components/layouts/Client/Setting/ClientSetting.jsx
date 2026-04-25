import { useState } from "react";
import {
  Lock,
  Mail,
  Phone,
  Globe,
  Linkedin,
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
          value={value}
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
  "IT & Software",
  "Healthcare",
  "Finance & Banking",
  "Manufacturing",
  "Retail & E-Commerce",
  "Education",
  "Logistics & Supply Chain",
  "Construction & Real Estate",
  "Media & Entertainment",
  "Other",
];

// ─── Settings ─────────────────────────────────────────────────────────────────
export default function Settings() {
  const [tab, setTab] = useState("credentials");
  const [toast, setToast] = useState({ msg: "", type: "success" });
  const [busy, setBusy] = useState(false);

  const [creds, setCreds] = useState({
    email: "",
    currentPwd: "",
    newPwd: "",
    confirmPwd: "",
  });
  const [contacts, setContacts] = useState({
    email: "",
    phone: "",
    website: "",
    linkedin: "",
  });
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    pin_code: "",
  });
  const [company, setCompany] = useState({
    company_name: "",
    industry_type: "",
    registration_number: "",
    description: "",
  });

  function notify(msg, type = "success") {
    setToast({ msg, type });
    setTimeout(() => setToast({ msg: "", type: "success" }), 3000);
  }

  function save() {
    setBusy(true);
    setTimeout(() => {
      setBusy(false);
      notify("Changes saved successfully!");
    }, 900);
  }

  function handleCredentials(e) {
    e.preventDefault();
    if (creds.newPwd && creds.newPwd !== creds.confirmPwd) {
      notify("Passwords do not match.", "error");
      return;
    }
    save();
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-linear-to-r from-slate-800 to-slate-900 px-8 py-6 shadow-lg">
        <div className="max-w-5xl mx-auto flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-linear-to-br from-indigo-500 to-violet-500 flex items-center justify-center">
            <User size={18} className="text-white" />
          </div>
          <div>
            <h1 className="text-white font-bold text-lg">Account Settings</h1>
            <p className="text-slate-400 text-xs">
              Manage your profile, credentials, and company details
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 flex gap-6">
        {/* Sidebar */}
        <aside className="w-60 shrink-0">
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
          {/* ── Credentials ──────────────────────────────────────────────────────
              Single <form> that owns BOTH the email field AND all password fields.
              Chrome requires email + password in the same form for autofill/
              password-manager support. The <form> is the outermost card element —
              no wrapping <div> sits between the card shell and the <form>.
          ─────────────────────────────────────────────────────────────────────── */}
          {tab === "credentials" && (
            <form
              className={card}
              autoComplete="on"
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
                {/*
                  Hidden username input — tells Chrome's password manager which
                  account these password fields belong to.
                */}
                <input
                  type="hidden"
                  autoComplete="username"
                  value={creds.email}
                  readOnly
                />

                {/* Email */}
                <Field
                  label="Email Address"
                  icon={Mail}
                  type="email"
                  value={creds.email}
                  onChange={(v) => setCreds({ ...creds, email: v })}
                  placeholder="you@example.com"
                  autoComplete="email"
                />

                <hr className="border-slate-100" />

                {/* Password fields */}
                <Field
                  label="Current Password"
                  icon={Lock}
                  type="password"
                  value={creds.currentPwd}
                  onChange={(v) => setCreds({ ...creds, currentPwd: v })}
                  placeholder="Enter current password"
                  autoComplete="current-password"
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
                <SaveBtn loading={busy} />
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
                    icon={Linkedin}
                    value={contacts.linkedin}
                    onChange={(v) => setContacts({ ...contacts, linkedin: v })}
                    placeholder="linkedin.com/in/profile"
                  />
                </div>
                <SaveBtn onClick={save} loading={busy} />
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
                <SaveBtn onClick={save} loading={busy} />
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
                <SaveBtn onClick={save} loading={busy} />
              </div>
            </div>
          )}
        </main>
      </div>

      <Toast msg={toast.msg} type={toast.type} />
    </div>
  );
}
