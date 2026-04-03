import { useState } from "react";
import {
  Search,
  LayoutGrid,
  List,
  Building2,
  TrendingUp,
  Users,
  Layers,
  SlidersHorizontal,
  Bell,
  CircleDot,
  XCircle,
  Plus,
  ChevronDown,
} from "lucide-react";

// import CompanyInfoCard from "./CompanyInfoCard"; // ← uncomment in your project
// ↓ Inline for demo — remove when using the separate file
import {
  Mail,
  CalendarDays,
  Briefcase,
  Clock4,
  ChevronRight,
  Settings2,
  UserMinus,
  UserPlus,
  Trash2,
  CheckCircle2,
} from "lucide-react";

const ACCENTS = [
  "#4f46e5",
  "#0ea5e9",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
];
const accent = (id) => ACCENTS[(id - 1) % ACCENTS.length];
const getInitials = (name) =>
  name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
const StatChip = ({ icon, label, value }) => (
  <div className="flex items-center gap-2.5 flex-1 bg-slate-50 border border-slate-100 rounded-xl px-3 py-2.5">
    <span className="text-slate-400">{icon}</span>
    <div>
      <p className="text-[9px] font-black tracking-widest text-slate-400 uppercase">
        {label}
      </p>
      <p className="text-[17px] font-black text-slate-800 leading-none">
        {value}
      </p>
    </div>
  </div>
);
const CompanyInfoCard = ({
  company,
  onViewDetails,
  onManage,
  onToggleFollow,
  onDelete,
}) => {
  const {
    id,
    name,
    industry,
    status,
    email,
    createdAt,
    activeJobs,
    pendingJobs,
    openings,
    isFollowing,
  } = company;
  const color = accent(id);
  const isActive = status === "ACTIVE";
  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 overflow-hidden">
      <div
        className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
        style={{ background: color }}
      />
      <div className="pl-5 pr-5 pt-4 pb-4">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3 min-w-0">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-sm"
              style={{
                background: `${color}18`,
                border: `1.5px solid ${color}40`,
              }}
            >
              <span
                className="text-sm font-black tracking-tight"
                style={{ color }}
              >
                {getInitials(name)}
              </span>
            </div>
            <div className="min-w-0">
              <h3 className="font-extrabold text-slate-800 text-sm truncate leading-snug">
                {name}
              </h3>
              <div className="flex flex-wrap items-center gap-1.5 mt-1">
                <span
                  className="text-[9px] font-black tracking-widest px-2 py-0.5 rounded-md uppercase"
                  style={{
                    background: `${color}14`,
                    color,
                    border: `1px solid ${color}30`,
                  }}
                >
                  {industry}
                </span>
                <span
                  className="flex items-center gap-1 text-[9px] font-black tracking-widest px-2 py-0.5 rounded-md uppercase"
                  style={
                    isActive
                      ? {
                          background: "#dcfce7",
                          color: "#16a34a",
                          border: "1px solid #bbf7d0",
                        }
                      : {
                          background: "#f1f5f9",
                          color: "#64748b",
                          border: "1px solid #e2e8f0",
                        }
                  }
                >
                  {isActive ? <CheckCircle2 size={8} /> : <XCircle size={8} />}
                  {status}
                </span>
                <button
                  onClick={() => onToggleFollow?.(company)}
                  className="text-[9px] font-black tracking-widest px-2 py-0.5 rounded-md uppercase transition-all hover:opacity-80"
                  style={
                    isFollowing
                      ? {
                          background: "#fff7ed",
                          color: "#ea580c",
                          border: "1px solid #fed7aa",
                        }
                      : {
                          background: "#f8fafc",
                          color: "#64748b",
                          border: "1px solid #e2e8f0",
                        }
                  }
                >
                  {isFollowing ? (
                    <span className="flex items-center gap-1">
                      <UserMinus size={8} />
                      Unfollow
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <UserPlus size={8} />
                      Follow
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
          <div
            className="shrink-0 flex flex-col items-center justify-center w-[52px] h-[52px] rounded-xl"
            style={{
              background: `${color}12`,
              border: `1.5px solid ${color}30`,
            }}
          >
            <span className="text-xl font-black leading-none" style={{ color }}>
              {openings}
            </span>
            <span
              className="text-[8px] font-black tracking-widest uppercase leading-tight mt-0.5"
              style={{ color: `${color}99` }}
            >
              Open
            </span>
          </div>
        </div>
        <div className="flex gap-2 mb-4">
          <StatChip
            icon={<Briefcase size={12} />}
            label="Active Jobs"
            value={activeJobs}
          />
          <StatChip
            icon={<Clock4 size={12} />}
            label="Pending Jobs"
            value={pendingJobs}
          />
        </div>
        <div className="flex items-center justify-between text-xs text-slate-500 mb-4 gap-3">
          <span className="flex items-center gap-1.5 truncate min-w-0">
            <Mail size={12} className="shrink-0 text-slate-400" />
            <span className="truncate font-medium">{email}</span>
          </span>
          <span className="flex items-center gap-1.5 shrink-0">
            <CalendarDays size={12} className="text-slate-400" />
            <span className="font-medium">{createdAt}</span>
          </span>
        </div>
        <div className="border-t border-slate-100 mb-4" />
        <div className="flex items-center gap-2">
          <button
            onClick={() => onViewDetails?.(company)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold text-slate-600 bg-white border border-slate-200 hover:border-slate-400 hover:text-slate-800 transition-all duration-200"
          >
            <ChevronRight size={13} />
            View Details
          </button>
          <button
            onClick={() => onManage?.(company)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold text-white transition-all duration-200 hover:opacity-90"
            style={{ background: color, boxShadow: `0 4px 14px ${color}44` }}
          >
            <Settings2 size={13} />
            Manage
          </button>
          <button
            onClick={() => onDelete?.(company)}
            title="Delete"
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 w-9 h-9 flex items-center justify-center rounded-xl bg-red-50 border border-red-100 text-red-400 hover:bg-red-100 hover:text-red-600"
          >
            <Trash2 size={13} />
          </button>
        </div>
      </div>
    </div>
  );
};
// ↑ Remove everything above this line when importing CompanyInfoCard from "./CompanyInfoCard"

// ─────────────────────────────────────────────────────────────
//  MOCK DATA  (replace with real API / Supabase fetch)
// ─────────────────────────────────────────────────────────────
const MOCK_COMPANIES = [
  {
    id: 1,
    name: "Nexus Tech Solutions",
    industry: "IT SERVICES",
    status: "ACTIVE",
    email: "hr@nexustech.com",
    createdAt: "12 Jan 2023",
    activeJobs: 8,
    pendingJobs: 4,
    openings: 12,
    isFollowing: true,
  },
  {
    id: 2,
    name: "Global Finance Corp",
    industry: "FINANCE",
    status: "CLOSED",
    email: "admin@globalfin.io",
    createdAt: "12 Jan 2023",
    activeJobs: 8,
    pendingJobs: 4,
    openings: 18,
    isFollowing: true,
  },
  {
    id: 3,
    name: "GreenEnergy India",
    industry: "TECHNOLOGY",
    status: "ACTIVE",
    email: "hiring@greenenergy.in",
    createdAt: "12 Jan 2023",
    activeJobs: 8,
    pendingJobs: 4,
    openings: 19,
    isFollowing: true,
  },
  {
    id: 4,
    name: "BluePixel Creative",
    industry: "CREATIVE",
    status: "ACTIVE",
    email: "careers@bluepixel.studio",
    createdAt: "12 Jan 2023",
    activeJobs: 6,
    pendingJobs: 3,
    openings: 12,
    isFollowing: false,
  },
  {
    id: 5,
    name: "Swift Logistics",
    industry: "LOGISTICS",
    status: "CLOSED",
    email: "ops@swiftlogistics.com",
    createdAt: "12 Jan 2023",
    activeJobs: 5,
    pendingJobs: 2,
    openings: 18,
    isFollowing: true,
  },
  {
    id: 6,
    name: "HealthSync Systems",
    industry: "HEALTHCARE",
    status: "ACTIVE",
    email: "info@healthsync.co",
    createdAt: "12 Jan 2023",
    activeJobs: 9,
    pendingJobs: 5,
    openings: 18,
    isFollowing: false,
  },
];

// ─────────────────────────────────────────────────────────────
//  API LAYER  — uncomment & wire up
// ─────────────────────────────────────────────────────────────
/*
// REST
const fetchCompanies  = async ()          => (await fetch("/api/companies")).json();
const deleteCompany   = async (id)        => (await fetch(`/api/companies/${id}`, { method:"DELETE" })).json();
const updateCompany   = async (id, patch) => (await fetch(`/api/companies/${id}`, {
  method:"PATCH", headers:{"Content-Type":"application/json"}, body:JSON.stringify(patch),
})).json();

// Supabase
import { supabase } from "@/lib/supabase";
const fetchCompanies  = async ()          => { const { data } = await supabase.from("companies").select("*"); return data; };
const deleteCompany   = async (id)        => supabase.from("companies").delete().eq("id", id);
const updateCompany   = async (id, patch) => supabase.from("companies").update(patch).eq("id", id);

// React Query example
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
const { data: companies } = useQuery({ queryKey:["companies"], queryFn: fetchCompanies });
const qc = useQueryClient();
const deleteMutation = useMutation({ mutationFn: deleteCompany, onSuccess: () => qc.invalidateQueries(["companies"]) });
*/

// ─────────────────────────────────────────────────────────────
//  TOAST
// ─────────────────────────────────────────────────────────────
const Toast = ({ message, onClose }) => (
  <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl text-sm font-semibold">
    <CircleDot size={14} className="text-emerald-400 shrink-0" />
    <span>{message}</span>
    <button
      onClick={onClose}
      className="text-slate-500 hover:text-white ml-2 transition-colors"
    >
      <XCircle size={14} />
    </button>
  </div>
);

// ─────────────────────────────────────────────────────────────
//  CLIENT MANAGEMENT — main page
// ─────────────────────────────────────────────────────────────
export default function ClientManagement() {
  const [companies, setCompanies] = useState(MOCK_COMPANIES);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState(null);
  const [viewMode, setViewMode] = useState("grid");
  const [filter, setFilter] = useState("ALL");
  const [sortBy, setSortBy] = useState("name");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // ── filtered + sorted list ──
  const displayed = companies
    .filter((c) => {
      const q = search.toLowerCase();
      const matchSearch =
        c.name.toLowerCase().includes(q) ||
        c.industry.toLowerCase().includes(q) ||
        c.status.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q);
      const matchFilter = filter === "ALL" || c.status === filter;
      return matchSearch && matchFilter;
    })
    .sort((a, b) =>
      sortBy === "name"
        ? a.name.localeCompare(b.name)
        : sortBy === "openings"
          ? b.openings - a.openings
          : sortBy === "active"
            ? b.activeJobs - a.activeJobs
            : 0,
    );

  // ── handlers ──
  const handleViewDetails = (c) => {
    showToast(`Viewing ${c.name}`); /* navigate(`/clients/${c.id}`) */
  };
  const handleManage = (c) => {
    showToast(`Managing ${c.name}`); /* open drawer / modal */
  };
  const handleToggleFollow = (c) => {
    setCompanies((prev) =>
      prev.map((x) =>
        x.id === c.id ? { ...x, isFollowing: !x.isFollowing } : x,
      ),
    );
    showToast(
      c.isFollowing ? `Unfollowed ${c.name}` : `Now following ${c.name}`,
    );
    // updateCompany(c.id, { isFollowing: !c.isFollowing });
  };
  const handleDelete = (c) => {
    if (!window.confirm(`Delete "${c.name}"?`)) return;
    setCompanies((prev) => prev.filter((x) => x.id !== c.id));
    showToast(`Deleted ${c.name}`);
    // deleteCompany(c.id);
  };

  // ── summary stats ──
  const totalOpenings = companies.reduce((s, c) => s + c.openings, 0);
  const activeCount = companies.filter((c) => c.status === "ACTIVE").length;
  const closedCount = companies.filter((c) => c.status === "CLOSED").length;
  const followingCount = companies.filter((c) => c.isFollowing).length;

  const STATS = [
    {
      icon: <Building2 size={18} />,
      label: "Total Clients",
      value: companies.length,
      color: "#4f46e5",
      bg: "#eef2ff",
      border: "#c7d2fe",
    },
    {
      icon: <TrendingUp size={18} />,
      label: "Active",
      value: activeCount,
      color: "#16a34a",
      bg: "#dcfce7",
      border: "#bbf7d0",
    },
    {
      icon: <Users size={18} />,
      label: "Closed",
      value: closedCount,
      color: "#dc2626",
      bg: "#fee2e2",
      border: "#fecaca",
    },
    {
      icon: <Layers size={18} />,
      label: "Job Openings",
      value: totalOpenings,
      color: "#d97706",
      bg: "#fef3c7",
      border: "#fde68a",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-5 py-8">
        {/* ── PAGE HEADER ── */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-[10px] font-black tracking-widest text-indigo-500 uppercase mb-1">
              Recruitment CRM
            </p>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight leading-tight">
              Client Management
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">
              {companies.length} clients · {followingCount} following ·{" "}
              {totalOpenings} openings
            </p>
          </div>

          <button
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 shadow-sm"
            style={{ background: "#4f46e5", boxShadow: "0 4px 14px #4f46e544" }}
          >
            <Plus size={15} />
            Add Client
          </button>
        </div>

        {/* ── STATS STRIP ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-7">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="bg-white rounded-2xl border px-4 py-3.5 flex items-center gap-3 shadow-sm"
              style={{ borderColor: s.border }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: s.bg, color: s.color }}
              >
                {s.icon}
              </div>
              <div>
                <p className="text-2xl font-black text-slate-900 leading-none">
                  {s.value}
                </p>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">
                  {s.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ── TOOLBAR ── */}
        <div className="flex items-center gap-2.5 mb-6 flex-wrap">
          {/* Search */}
          <div className="relative flex-1 min-w-52">
            <Search
              size={14}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search clients by name, industry, status, or email…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm text-slate-700 placeholder-slate-400 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300 shadow-sm transition-all"
            />
          </div>

          {/* Status filter */}
          {["ALL", "ACTIVE", "CLOSED"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="px-3.5 py-2.5 text-[10px] font-black tracking-widest rounded-xl uppercase transition-all shadow-sm"
              style={
                filter === f
                  ? {
                      background: "#4f46e5",
                      color: "#fff",
                      border: "1.5px solid #4f46e5",
                    }
                  : {
                      background: "#fff",
                      color: "#64748b",
                      border: "1.5px solid #e2e8f0",
                    }
              }
            >
              {f}
            </button>
          ))}

          {/* Sort */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2.5 text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-200 shadow-sm cursor-pointer"
            >
              <option value="name">Sort: Name</option>
              <option value="openings">Sort: Openings</option>
              <option value="active">Sort: Active Jobs</option>
            </select>
            <ChevronDown
              size={12}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
          </div>

          {/* Filters button */}
          <button className="flex items-center gap-2 px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:border-slate-400 hover:text-slate-800 transition-all shadow-sm">
            <SlidersHorizontal size={13} />
            Filters
          </button>

          {/* Notification */}
          <button className="relative p-2.5 bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-slate-800 hover:border-slate-400 transition-all shadow-sm">
            <Bell size={15} />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-black rounded-full flex items-center justify-center">
              3
            </span>
          </button>

          {/* Grid / List toggle */}
          <div className="flex bg-white border border-slate-200 rounded-xl p-1 gap-1 shadow-sm">
            {[
              { m: "grid", i: <LayoutGrid size={14} /> },
              { m: "list", i: <List size={14} /> },
            ].map(({ m, i }) => (
              <button
                key={m}
                onClick={() => setViewMode(m)}
                className="p-2 rounded-lg transition-all"
                style={
                  viewMode === m
                    ? { background: "#4f46e5", color: "#fff" }
                    : { background: "transparent", color: "#94a3b8" }
                }
              >
                {i}
              </button>
            ))}
          </div>
        </div>

        {/* ── RESULTS LABEL ── */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            {displayed.length} {displayed.length === 1 ? "client" : "clients"}{" "}
            found
          </p>
        </div>

        {/* ── CARD GRID ── */}
        {displayed.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-slate-400">
            <Search size={40} className="mb-4 opacity-20" />
            <p className="text-base font-bold text-slate-500">
              No clients found
            </p>
            <p className="text-sm mt-1 text-slate-400">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                : "flex flex-col gap-3"
            }
          >
            {displayed.map((company) => (
              <CompanyInfoCard
                key={company.id}
                company={company}
                onViewDetails={handleViewDetails}
                onManage={handleManage}
                onToggleFollow={handleToggleFollow}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

        {/* ── FOOTER ── */}
        <p className="text-center text-[10px] font-bold tracking-widest uppercase text-slate-400 mt-10">
          Showing {displayed.length} of {companies.length} clients
        </p>
      </div>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
