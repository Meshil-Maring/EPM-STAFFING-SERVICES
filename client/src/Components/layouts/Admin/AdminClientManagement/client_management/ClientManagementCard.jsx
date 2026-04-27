import { useState } from "react";
import { Briefcase, Clock, Mail, Calendar, Eye } from "lucide-react";

export const CompanyCard = () => {
  const [followed, setFollowed] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div
        className="bg-white rounded-3xl shadow-md p-6 w-full max-w-md"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-3">
            {/* Logo */}
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-lg"
              style={{
                background: "linear-gradient(135deg, #4f46e5, #6d28d9)",
              }}
            >
              TCS
            </div>
            {/* Name & Tags */}
            <div>
              <h2 className="text-lg font-bold text-gray-900 leading-tight">
                Tata Consultancy Services
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                  IT Services
                </span>
                <span className="flex items-center gap-1 text-xs text-gray-500">
                  <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
                  Active
                </span>
              </div>
            </div>
          </div>

          {/* Follow + Positions */}
          <div className="flex flex-col items-end gap-1 shrink-0 ml-2">
            <button
              onClick={() => setFollowed(!followed)}
              className={`px-4 py-1.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                followed ? "bg-gray-200 text-gray-700" : "text-white"
              }`}
              style={
                followed
                  ? {}
                  : { background: "linear-gradient(135deg, #f97316, #ea580c)" }
              }
            >
              {followed ? "Following" : "Follow"}
            </button>
            <div className="text-right mt-1">
              <span className="text-2xl font-extrabold text-gray-900">12</span>
              <p className="text-xs text-gray-400 font-medium leading-none">
                Positions
              </p>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          {/* Active Jobs */}
          <div className="border border-red-100 rounded-2xl p-4 flex items-center justify-between bg-red-50/30">
            <div className="flex items-center gap-2 text-indigo-700">
              <Briefcase className="w-5 h-5" strokeWidth={1.8} />
              <span className="text-sm font-semibold">Active Jobs</span>
            </div>
            <span className="text-2xl font-extrabold text-gray-800">8</span>
          </div>

          {/* Pending */}
          <div className="border border-red-100 rounded-2xl p-4 flex items-center justify-between bg-red-50/30">
            <div className="flex items-center gap-2 text-indigo-700">
              <Clock className="w-5 h-5" strokeWidth={1.8} />
              <span className="text-sm font-semibold">Pending</span>
            </div>
            <span className="text-2xl font-extrabold text-gray-800">4</span>
          </div>
        </div>

        {/* Info Row */}
        <div className="flex items-center justify-between px-1 mb-5">
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <Mail className="w-5 h-5" strokeWidth={1.8} />
            <span>hr@tc.com</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <Calendar className="w-5 h-5" strokeWidth={1.8} />
            <span>Joined Jan 2024</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center gap-2 border border-gray-200 rounded-2xl py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
            <Eye className="w-5 h-5" strokeWidth={1.8} />
            View Details
          </button>
          <button
            className="rounded-2xl py-3 text-sm font-bold text-white transition-all duration-200 hover:opacity-90 active:scale-95"
            style={{ background: "linear-gradient(135deg, #f97316, #ea580c)" }}
          >
            Manage
          </button>
        </div>
      </div>
    </div>
  );
};
