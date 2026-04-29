import { useState, useEffect } from "react";
import {
  X,
  ChevronDown,
  FileText,
  Plus,
  Trash2,
  Save,
  ExternalLink,
  Upload,
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Calendar,
  Link2,
  AlignLeft,
  DollarSign,
  Clock,
  Star,
  Loader2,
} from "lucide-react";
import { deleteCandidate } from "../end-point-function/submitted_candidates";
import ConfirmDeleteOverlay from "./ConfirmDeleteOverlay";

/* ─── helpers ─────────────────────────────────────────────────────────── */
const parseSkills = (raw) => {
  if (!raw) return [];
  let arr = [];
  if (Array.isArray(raw)) arr = raw;
  else if (typeof raw === "object") arr = Object.values(raw);
  else return [];

  return arr
    .filter(Boolean)
    .map((s) => {
      if (typeof s === "string") return s;
      if (typeof s === "object") return s?.name || s?.skill || s?.label || "";
      return String(s);
    })
    .filter(Boolean);
};

const getDoc = (docs, type) => docs?.find((d) => d.file_name === type) || null;

/* ─── sub-components ──────────────────────────────────────────────────── */

const SectionLabel = ({ icon: Icon, label }) => (
  <div className="flex items-center gap-2 mb-3">
    <div className="w-6 h-6 rounded-lg bg-violet-50 flex items-center justify-center shrink-0">
      <Icon size={12} className="text-violet-500" />
    </div>
    <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest">
      {label}
    </p>
  </div>
);

const Field = ({ label, children }) => (
  <div className="w-full">
    <p className="text-[11px] font-medium text-gray-400 mb-1.5 tracking-wide">
      {label}
    </p>
    {children}
  </div>
);

const inputCls =
  "w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 bg-white/80 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all placeholder:text-slate-300 hover:border-indigo-200";

const Input = ({ value, onChange, placeholder, type = "text" }) => (
  <input
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className={inputCls}
  />
);

const UploadZone = ({ label, file, setFile }) => {
  const isExisting = file && !(file instanceof File);
  const isNew = file instanceof File;
  const fileName = isExisting
    ? decodeURIComponent(file.file_url.split("/").pop())
    : isNew
      ? file.name
      : null;

  return (
    <div>
      <p className="text-[10px] font-medium text-gray-400 mb-1.5 tracking-wide">
        {label}
      </p>
      <label
        className={`relative flex flex-col items-center justify-center gap-1.5 min-h-[76px] border-2 border-dashed rounded-xl cursor-pointer transition-all group
        ${file ? "border-indigo-300 bg-indigo-50/60" : "border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/40"}`}
      >
        <input
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />

        {file ? (
          <>
            <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center">
              <FileText size={14} className="text-indigo-500" />
            </div>
            <span className="text-[10px] text-indigo-600 font-medium text-center px-1 line-clamp-2 leading-tight max-w-full">
              {fileName}
            </span>
            {isExisting && (
              <a
                href={file.file_url}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-0.5 text-[10px] text-blue-500 underline hover:text-blue-700 transition-colors"
              >
                View <ExternalLink size={8} />
              </a>
            )}
            {isNew && (
              <span className="text-[9px] text-emerald-500 font-bold uppercase tracking-wider">
                New ✓
              </span>
            )}
          </>
        ) : (
          <>
            <div className="w-7 h-7 rounded-lg bg-slate-100 group-hover:bg-indigo-100 flex items-center justify-center transition-colors">
              <Upload
                size={13}
                className="text-slate-300 group-hover:text-indigo-400 transition-colors"
              />
            </div>
            <span className="text-[10px] text-slate-300 group-hover:text-indigo-400 text-center px-2 leading-tight transition-colors font-medium">
              Upload PDF
            </span>
          </>
        )}
      </label>
    </div>
  );
};

/* ─── main component ──────────────────────────────────────────────────── */
export default function EditCandidateOverlay({
  data,
  onClose,
  onSave,
  onDelete,
}) {
  const [form, setForm] = useState({
    candidate_name: data?.candidate_name || "",
    email: data?.email || "",
    phone: data?.phone || "",
    location: data?.location || "",
    job_type: data?.job_type || "Full-time",
    expected_ctc: data?.expected_ctc || "",
    current_ctc: data?.current_ctc || "",
    notice_period: data?.notice_period_days || "",
    date_of_birth: data?.date_of_birth
      ? new Date(data.date_of_birth).toISOString().split("T")[0]
      : "",
    gender: data?.gender || "",
    linkedin: data?.linkedin || "",
    experience: data?.experience || "",
    description: data?.description || "",
  });

  const [skills, setSkills] = useState(() => parseSkills(data?.skills));
  const [newSkill, setNewSkill] = useState("");
  const [editingSkillIdx, setEditingSkillIdx] = useState(null);
  const [confirmDeleteOverlay, setConfirmDeleteOverlay] = useState(false);

  const [resume, setResume] = useState(() =>
    getDoc(data?.candidate_documents, "resumes"),
  );
  const [cover, setCover] = useState(() =>
    getDoc(data?.candidate_documents, "letters"),
  );
  const [portfolio, setPortfolio] = useState(() =>
    getDoc(data?.candidate_documents, "portfolios"),
  );
  const [isSaving, setIsSaving] = useState(false);

  /* scroll lock */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  /* escape key */
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const addSkill = () => {
    const trimmed = newSkill.trim();
    if (trimmed) {
      setSkills((s) => [...s, trimmed]);
      setNewSkill("");
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave?.({
        ...data,
        ...form,
        skills,
        existingFiles: {
          resume: resume instanceof File ? null : resume,
          cover: cover instanceof File ? null : cover,
          portfolio: portfolio instanceof File ? null : portfolio,
        },
        newFiles: {
          resume: resume instanceof File ? resume : null,
          cover: cover instanceof File ? cover : null,
          portfolio: portfolio instanceof File ? portfolio : null,
        },
      });
    } finally {
      setIsSaving(false);
    }
  };

  const selectCls =
    "w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 bg-white/80 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all hover:border-indigo-200";

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Confirm Delete */}
      {confirmDeleteOverlay && (
        <ConfirmDeleteOverlay
          isOpen={!!confirmDeleteOverlay}
          onClose={() => setConfirmDeleteOverlay(null)}
          onConfirm={() => {
            onDelete(data.id);
            setConfirmDeleteOverlay(false);
          }}
          candidateName={data?.candidate_name}
        />
      )}

      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl shadow-slate-900/20 flex flex-col max-h-[92vh] overflow-hidden border border-slate-100">
        {/* ── Header ──────────────────────────────────────────────── */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-5 py-4 flex items-center gap-3 shrink-0">
          {/* Avatar */}
          <div
            className="w-10 h-10 rounded-2xl shrink-0 flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #fb923c, #ef4444)" }}
          >
            <User size={18} className="text-white" />
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-white font-semibold text-sm leading-tight">
              Edit Candidate
            </p>
            <p className="text-slate-400 text-xs truncate mt-0.5">
              {data?.candidate_name || "Update candidate information"}
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-all"
          >
            <X size={16} />
          </button>
        </div>

        {/* ── Progress strip ──────────────────────────────────────── */}
        <div className="h-0.5 bg-slate-100">
          <div className="h-full w-2/3 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full" />
        </div>

        {/* ── Scrollable Body ─────────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto px-5 py-5 [&::-webkit-scrollbar]:hidden space-y-5 bg-slate-50/30">
          {/* — Personal Info — */}
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm shadow-slate-100">
            <SectionLabel icon={User} label="Personal Info" />
            <div className="space-y-3">
              <Field label="Full Name">
                <Input
                  value={form.candidate_name}
                  onChange={set("candidate_name")}
                  placeholder="e.g. Arjun Sharma"
                />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Email">
                  <Input
                    value={form.email}
                    onChange={set("email")}
                    placeholder="email@domain.com"
                  />
                </Field>
                <Field label="Phone">
                  <Input
                    value={form.phone}
                    onChange={set("phone")}
                    placeholder="+91 XXXXXXXXXX"
                  />
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Date of Birth">
                  <input
                    type="date"
                    value={form.date_of_birth}
                    onChange={set("date_of_birth")}
                    className={inputCls}
                  />
                </Field>
                <Field label="Gender">
                  <div className="relative">
                    <select
                      value={form.gender}
                      onChange={set("gender")}
                      className={selectCls}
                    >
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Others</option>
                    </select>
                    <ChevronDown
                      size={13}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                    />
                  </div>
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Location">
                  <Input
                    value={form.location}
                    onChange={set("location")}
                    placeholder="City, State"
                  />
                </Field>
                <Field label="LinkedIn">
                  <Input
                    value={form.linkedin}
                    onChange={set("linkedin")}
                    placeholder="linkedin.com/in/..."
                  />
                </Field>
              </div>
            </div>
          </div>

          {/* — Professional — */}
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm shadow-slate-100">
            <SectionLabel icon={Briefcase} label="Professional Details" />
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <Field label="Job Type">
                  <div className="relative">
                    <select
                      value={form.job_type}
                      onChange={set("job_type")}
                      className={selectCls}
                    >
                      <option value="full-time">Full-time</option>
                      <option value="part-time">Part-time</option>
                      <option value="contract">Contract</option>
                      <option value="freelance">Freelance</option>
                      <option value="internship">Internship</option>
                    </select>
                    <ChevronDown
                      size={13}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                    />
                  </div>
                </Field>
                <Field label="Experience (yrs)">
                  <Input
                    value={form.experience}
                    onChange={set("experience")}
                    placeholder="e.g. 4"
                  />
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Expected CTC (LPA)">
                  <Input
                    value={form.expected_ctc}
                    onChange={set("expected_ctc")}
                    placeholder="e.g. 35"
                  />
                </Field>
                <Field label="Current CTC (LPA)">
                  <Input
                    value={form.current_ctc}
                    onChange={set("current_ctc")}
                    placeholder="e.g. 24"
                  />
                </Field>
              </div>
              <Field label="Notice Period (days)">
                <Input
                  value={form.notice_period}
                  onChange={set("notice_period")}
                  placeholder="e.g. 30"
                />
              </Field>
            </div>
          </div>

          {/* — Skills — */}
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm shadow-slate-100">
            <SectionLabel icon={Star} label="Skills & Expertise" />

            {/* Pill display */}
            {skills.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-3">
                {skills.map((skill, i) =>
                  editingSkillIdx === i ? (
                    <input
                      key={i}
                      autoFocus
                      value={
                        typeof skills[i] === "string"
                          ? skills[i]
                          : String(skills[i] ?? "")
                      }
                      onChange={(e) => {
                        const updated = [...skills];
                        updated[i] = e.target.value;
                        setSkills(updated);
                      }}
                      onBlur={() => {
                        if (!skills[i]?.trim())
                          setSkills((s) => s.filter((_, idx) => idx !== i));
                        setEditingSkillIdx(null);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === "Escape") {
                          if (!skills[i]?.trim())
                            setSkills((s) => s.filter((_, idx) => idx !== i));
                          setEditingSkillIdx(null);
                        }
                      }}
                      className="bg-violet-100 text-violet-700 border border-violet-300 rounded-full px-3 py-1 text-[11px] font-medium focus:outline-none focus:ring-2 focus:ring-violet-400 min-w-[60px] max-w-[160px]"
                    />
                  ) : (
                    <span
                      key={i}
                      className="flex items-center gap-1.5 bg-violet-50 text-violet-700 border border-violet-100 rounded-full px-3 py-1 text-[11px] font-medium group cursor-text hover:bg-violet-100 hover:border-violet-300 transition-all"
                      onClick={() => setEditingSkillIdx(i)}
                      title="Click to edit"
                    >
                      {typeof skill === "string" ? skill : String(skill ?? "")}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSkills((s) => s.filter((_, idx) => idx !== i));
                        }}
                        className="text-violet-300 hover:text-violet-600 transition-colors"
                      >
                        <X size={10} />
                      </button>
                    </span>
                  ),
                )}
              </div>
            )}

            {/* Add skill input */}
            <div className="flex items-center gap-2">
              <input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addSkill()}
                placeholder="Type a skill and press Enter..."
                className="flex-1 border border-dashed border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-600 bg-white focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition-all placeholder:text-slate-300 hover:border-violet-200"
              />
              <button
                onClick={addSkill}
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-violet-500 hover:bg-violet-600 text-white transition-all active:scale-95 shrink-0"
              >
                <Plus size={15} />
              </button>
            </div>
          </div>

          {/* — Documents — */}
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm shadow-slate-100">
            <SectionLabel icon={FileText} label="Documents" />
            <div className="grid grid-cols-3 gap-2.5">
              <UploadZone
                label="Resume* (PDF)"
                file={resume}
                setFile={setResume}
              />
              <UploadZone
                label="Cover Letter"
                file={cover}
                setFile={setCover}
              />
              <UploadZone
                label="Portfolio"
                file={portfolio}
                setFile={setPortfolio}
              />
            </div>
          </div>

          {/* — Description — */}
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm shadow-slate-100">
            <SectionLabel icon={AlignLeft} label="Description" />
            <textarea
              value={form.description}
              onChange={set("description")}
              rows={3}
              placeholder="Add additional notes about this candidate..."
              className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 bg-white/80 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all placeholder:text-slate-300 hover:border-indigo-200"
            />
          </div>
        </div>

        {/* ── Footer ──────────────────────────────────────────────── */}
        <div className="px-5 py-4 flex items-center gap-2.5 shrink-0 border-t border-slate-100 bg-white">
          <button
            onClick={() => setConfirmDeleteOverlay(true)}
            disabled={isSaving}
            className="flex items-center justify-center gap-1.5 border border-red-200 hover:bg-red-50 text-red-500 hover:text-red-600 font-semibold rounded-xl py-2.5 px-4 text-sm transition-all active:scale-95 disabled:opacity-40 disabled:pointer-events-none"
          >
            <Trash2 size={13} />
            Delete
          </button>

          <button
            onClick={onClose}
            disabled={isSaving}
            className="flex-1 border border-slate-200 hover:bg-slate-50 text-slate-500 font-semibold rounded-xl py-2.5 text-sm transition-all active:scale-95 disabled:opacity-40 disabled:pointer-events-none"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex-1 flex items-center justify-center gap-1.5 text-white font-semibold rounded-xl py-2.5 text-sm transition-all active:scale-95 disabled:opacity-80 disabled:cursor-not-allowed"
            style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
          >
            {isSaving ? (
              <>
                <Loader2 size={13} className="animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save size={13} />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
