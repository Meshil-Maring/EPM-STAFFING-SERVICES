import React, { useState } from "react";

const CreateJobForm = () => {
  const [jobData, setJobData] = useState({
    jobTitle: "", // Added Job Title
    location: "",
    jobType: "Full-time",
    urgent: false,
    salaryRange: "",
    experience: "",
    applicantsLimit: "",
    deadline: "",
    description: "",
    requirements: [""],
    responsibilities: [""],
    benefits: [""],
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setJobData({
      ...jobData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleListChange = (index, value, field) => {
    const newList = [...jobData[field]];
    newList[index] = value;
    setJobData({ ...jobData, [field]: newList });
  };

  const addListItem = (field) => {
    setJobData({ ...jobData, [field]: [...jobData[field], ""] });
  };

  const removeListItem = (index, field) => {
    const newList = jobData[field].filter((_, i) => i !== index);
    setJobData({ ...jobData, [field]: newList });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Job Submitted:", jobData);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white shadow-sm border border-gray-200 rounded-xl p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">
          Post a New Job
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Main Job Title - Full Width */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Job Title
              </label>
              <input
                type="text"
                name="jobTitle"
                placeholder="e.g. Senior Full Stack Developer"
                className="w-full border-gray-300 rounded-lg border p-3 text-lg focus:ring-2 focus:ring-blue-500 outline-none"
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Urgent Toggle */}
            <div className="flex items-center space-x-3 p-3 border border-orange-100 bg-orange-50 rounded-lg">
              <input
                type="checkbox"
                name="urgent"
                id="urgent"
                checked={jobData.urgent}
                onChange={handleInputChange}
                className="h-5 w-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500 cursor-pointer"
              />
              <label htmlFor="urgent" className="cursor-pointer">
                <span className="text-sm font-bold text-orange-800">
                  Mark as Urgent
                </span>
                <span className="block text-xs text-orange-600">
                  This will add a priority badge to your listing.
                </span>
              </label>
            </div>
          </div>

          {/* Grid for Metadata */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                name="location"
                placeholder="e.g. Remote, Mumbai"
                className="w-full border-gray-300 rounded-lg border p-2.5 focus:ring-blue-500"
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Job Type
              </label>
              <select
                name="jobType"
                className="w-full border-gray-300 rounded-lg border p-2.5 bg-white"
                onChange={handleInputChange}
              >
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Contract</option>
                <option>Internship</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Salary Range
              </label>
              <input
                type="text"
                name="salaryRange"
                placeholder="e.g. ₹12L - ₹18L per annum"
                className="w-full border-gray-300 rounded-lg border p-2.5"
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Experience Required
              </label>
              <input
                type="text"
                name="experience"
                placeholder="e.g. 5+ years"
                className="w-full border-gray-300 rounded-lg border p-2.5"
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Max Applicants
              </label>
              <input
                type="number"
                name="applicantsLimit"
                placeholder="e.g. 100"
                className="w-full border-gray-300 rounded-lg border p-2.5"
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Application Deadline
              </label>
              <input
                type="date"
                name="deadline"
                className="w-full border-gray-300 rounded-lg border p-2.5"
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Description */}
          <div className="pt-4 border-t border-gray-100">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Job Description
            </label>
            <textarea
              name="description"
              rows="4"
              placeholder="Provide a high-level summary of the role..."
              className="w-full border-gray-300 rounded-lg border p-2.5 focus:ring-blue-500"
              onChange={handleInputChange}
            ></textarea>
          </div>

          {/* Dynamic List Sections */}
          {[
            { label: "Requirements", field: "requirements" },
            { label: "Key Responsibilities", field: "responsibilities" },
            { label: "Benefits & Perks", field: "benefits" },
          ].map((section) => (
            <div key={section.field} className="pt-4 border-t border-gray-100">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {section.label}
              </label>
              {jobData[section.field].map((item, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={item}
                    placeholder={`Add a ${section.label
                      .toLowerCase()
                      .slice(0, -1)}`}
                    className="flex-1 border-gray-300 rounded-lg border p-2.5 focus:ring-blue-500"
                    onChange={(e) =>
                      handleListChange(index, e.target.value, section.field)
                    }
                  />
                  <button
                    type="button"
                    onClick={() => removeListItem(index, section.field)}
                    className="text-gray-400 hover:text-red-500 px-2 transition-colors"
                  >
                    ✕
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addListItem(section.field)}
                className="text-blue-600 text-sm font-bold hover:text-blue-800 flex items-center gap-1"
              >
                + Add {section.label.toLowerCase().slice(0, -1)}
              </button>
            </div>
          ))}

          {/* Submit Button */}
          <div className="pt-8">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold py-4 px-6 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95"
            >
              Post Job Opening
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateJobForm;
