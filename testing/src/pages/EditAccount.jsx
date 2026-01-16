import React, { useState } from "react";

const CompanySettings = () => {
  const [settings, setSettings] = useState({
    // Account Settings
    email: "admin@company.com",
    password: "••••••••",

    // Company Settings
    companyName: "TechFlow Solutions",
    address: "123 Business Park, Sector 5",
    city: "Bangalore",
    state: "Karnataka",

    // Contact Information
    contactEmail: "info@techflow.com",
    phone: "+91 98765 43210",
    website: "https://techflow.com",
    linkedin: "https://linkedin.com/company/techflow",

    // Branch Locations
    branches: [
      { id: 1, city: "Bangalore", type: "Headquarters" },
      { id: 2, city: "Mumbai", type: "Regional Office" },
    ],
  });

  const [isEditingPassword, setIsEditingPassword] = useState(false);

  // General Input Handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  // Branch Handlers
  const handleBranchChange = (id, field, value) => {
    const updatedBranches = settings.branches.map((branch) =>
      branch.id === id ? { ...branch, [field]: value } : branch
    );
    setSettings((prev) => ({ ...prev, branches: updatedBranches }));
  };

  const addBranch = () => {
    const newBranch = { id: Date.now(), city: "", type: "" };
    setSettings((prev) => ({
      ...prev,
      branches: [...prev.branches, newBranch],
    }));
  };

  const removeBranch = (id) => {
    setSettings((prev) => ({
      ...prev,
      branches: prev.branches.filter((b) => b.id !== id),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Settings:", settings);
    alert("Settings saved successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">
            Manage your account, company details, and office locations.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section 1: Account Setting */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-gray-50">
              <h2 className="text-lg font-bold text-gray-800">
                Account Setting
              </h2>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Account Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={settings.email}
                  onChange={handleChange}
                  className="w-full border-gray-300 rounded-lg border p-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Password
                </label>
                <div className="flex gap-2">
                  <input
                    type="password"
                    value={settings.password}
                    disabled
                    className="w-full border-gray-300 rounded-lg border p-2.5 bg-gray-50 text-gray-500"
                  />
                  <button
                    type="button"
                    onClick={() => setIsEditingPassword(!isEditingPassword)}
                    className="px-4 py-2 text-sm font-bold text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50"
                  >
                    Change
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Company Setting */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-gray-50">
              <h2 className="text-lg font-bold text-gray-800">
                Company Setting
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={settings.companyName}
                  onChange={handleChange}
                  className="w-full border-gray-300 rounded-lg border p-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={settings.address}
                  onChange={handleChange}
                  className="w-full border-gray-300 rounded-lg border p-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={settings.city}
                    onChange={handleChange}
                    className="w-full border-gray-300 rounded-lg border p-2.5"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={settings.state}
                    onChange={handleChange}
                    className="w-full border-gray-300 rounded-lg border p-2.5"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Contact Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-gray-50">
              <h2 className="text-lg font-bold text-gray-800">
                Contact Information
              </h2>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Public Contact Email
                </label>
                <input
                  type="email"
                  name="contactEmail"
                  value={settings.contactEmail}
                  onChange={handleChange}
                  className="w-full border-gray-300 rounded-lg border p-2.5"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={settings.phone}
                  onChange={handleChange}
                  className="w-full border-gray-300 rounded-lg border p-2.5"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Website
                </label>
                <input
                  type="url"
                  name="website"
                  value={settings.website}
                  onChange={handleChange}
                  className="w-full border-gray-300 rounded-lg border p-2.5"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  LinkedIn Profile
                </label>
                <input
                  type="url"
                  name="linkedin"
                  value={settings.linkedin}
                  onChange={handleChange}
                  className="w-full border-gray-300 rounded-lg border p-2.5"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Branch Location */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
              <h2 className="text-lg font-bold text-gray-800">
                Branch Locations
              </h2>
              <button
                type="button"
                onClick={addBranch}
                className="text-sm font-bold text-blue-600 hover:text-blue-800"
              >
                + Add Branch
              </button>
            </div>
            <div className="p-6 space-y-4">
              {settings.branches.map((branch) => (
                <div
                  key={branch.id}
                  className="flex gap-4 items-end border-b border-gray-50 pb-4 last:border-0"
                >
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      value={branch.city}
                      placeholder="e.g. Pune"
                      onChange={(e) =>
                        handleBranchChange(branch.id, "city", e.target.value)
                      }
                      className="w-full border-gray-300 rounded-lg border p-2"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                      Type
                    </label>
                    <input
                      type="text"
                      value={branch.type}
                      placeholder="e.g. Sales Office"
                      onChange={(e) =>
                        handleBranchChange(branch.id, "type", e.target.value)
                      }
                      className="w-full border-gray-300 rounded-lg border p-2"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeBranch(branch.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Final Save Button */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              className="px-6 py-3 font-semibold text-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-10 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-100"
            >
              Save All Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanySettings;
