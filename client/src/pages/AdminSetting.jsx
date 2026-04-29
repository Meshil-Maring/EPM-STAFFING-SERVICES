import { useState } from "react";
import { Lock, Mail, Save, Eye, EyeOff, User } from "lucide-react";
import { showError, showSuccess } from "../utils/toastUtils";
import {
  updatePassword,
  updateUser,
  verifyPassword,
} from "../Components/layouts/Client/Setting/setting";
import { useAuth } from "../hooks/useAuth";

// ─── Shared card styles ───────────────────────────────────────────────────────
const card =
  "bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden";
const hdr =
  "px-7 py-5 border-b border-slate-100 bg-linear-to-r from-slate-50 to-white";
const body = "px-7 py-6 flex flex-col gap-5";

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
function SaveBtn({ loading }) {
  return (
    <div className="flex justify-end">
      <button
        type="submit"
        disabled={loading}
        className="flex items-center gap-2 bg-linear-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white text-sm font-semibold px-6 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-60"
      >
        <Save size={14} />
        {loading ? "Saving…" : "Save Changes"}
      </button>
    </div>
  );
}

// ─── AdminSettings ────────────────────────────────────────────────────────────
export default function AdminSettings() {
  const { user } = useAuth();
  const [busy, setBusy] = useState(false);
  const [creds, setCreds] = useState({
    email: "",
    currentPwd: "",
    newPwd: "",
    confirmPwd: "",
  });

  async function handleCredentials(e) {
    e.preventDefault();
    if (!user?.id) return;

    const emailTouched = creds.email.trim() !== "";
    const pwdTouched = creds.currentPwd || creds.newPwd || creds.confirmPwd;

    if (!emailTouched && !pwdTouched)
      return showError("Please fill in at least one section to save.");

    if (emailTouched) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(creds.email.trim()))
        return showError("Enter a valid email address (e.g. you@example.com).");
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
      setBusy(true);

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
    } catch {
      showError("Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
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
              Manage your login credentials
            </p>
          </div>
        </div>
      </div>

      {/* Card */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        <form className={card} autoComplete="off" onSubmit={handleCredentials}>
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
            <SaveBtn loading={busy} />
          </div>
        </form>
      </div>
    </div>
  );
}
