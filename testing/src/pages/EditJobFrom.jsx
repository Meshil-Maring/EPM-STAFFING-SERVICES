import React, { useState, useEffect } from "react";

const EditJobForm = ({ initialData, onSave, onCancel }) => {
  // Initialize state with initialData or default empty values
  const [jobData, setJobData] = useState({
    jobTitle: "",
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

  // Update state if initialData changes (e.g., after an API fetch)
  useEffect(() => {
    if (initialData) {
      setJobData(initialData);
    }
  }, [initialData]);

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
    onSave(jobData); // Send the updated data to the parent component/API
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white shadow-md border border-gray-200 rounded-xl p-8">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h1 className="text-2xl font-bold text-gray-800">Edit Job Listing</h1>
          <button
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700 font-medium"
          >
            Cancel
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Job Title & Urgency */}
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Job Title
              </label>
              <input
                type="text"
                name="jobTitle"
                value={jobData.jobTitle}
                className="w-full border-gray-300 rounded-lg border p-3 text-lg focus:ring-2 focus:ring-blue-500 outline-none"
                onChange={handleInputChange}
                required
              />
            </div>

            <div
              className={`flex items-center space-x-3 p-3 border rounded-lg transition-colors ${
                jobData.urgent
                  ? "border-orange-200 bg-orange-50"
                  : "border-gray-200 bg-gray-50"
              }`}
            >
              <input
                type="checkbox"
                name="urgent"
                id="urgent"
                checked={jobData.urgent}
                onChange={handleInputChange}
                className="h-5 w-5 text-orange-600 border-gray-300 rounded cursor-pointer"
              />
              <label htmlFor="urgent" className="cursor-pointer">
                <span
                  className={`text-sm font-bold ${
                    jobData.urgent ? "text-orange-800" : "text-gray-700"
                  }`}
                >
                  Priority: Urgent
                </span>
              </label>
            </div>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
            {["location", "salaryRange", "experience", "applicantsLimit"].map(
              (field) => (
                <div key={field}>
                  <label className="block text-sm font-semibold text-gray-700 mb-1 capitalize">
                    {field.replace(/([A-Z])/g, " $1")}
                  </label>
                  <input
                    type={field === "applicantsLimit" ? "number" : "text"}
                    name={field}
                    value={jobData[field]}
                    className="w-full border-gray-300 rounded-lg border p-2.5"
                    onChange={handleInputChange}
                  />
                </div>
              )
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Job Type
              </label>
              <select
                name="jobType"
                value={jobData.jobType}
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
                Application Deadline
              </label>
              <input
                type="date"
                name="deadline"
                value={jobData.deadline}
                className="w-full border-gray-300 rounded-lg border p-2.5"
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Description */}
          <div className="pt-4 border-t">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Job Description
            </label>
            <textarea
              name="description"
              rows="4"
              value={jobData.description}
              className="w-full border-gray-300 rounded-lg border p-2.5"
              onChange={handleInputChange}
            ></textarea>
          </div>

          {/* Dynamic List Sections */}
          {["requirements", "responsibilities", "benefits"].map((field) => (
            <div key={field} className="pt-4 border-t">
              <label className="block text-sm font-semibold text-gray-700 mb-2 capitalize">
                {field}
              </label>
              {jobData[field].map((item, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={item}
                    className="flex-1 border-gray-300 rounded-lg border p-2.5 focus:ring-blue-500"
                    onChange={(e) =>
                      handleListChange(index, e.target.value, field)
                    }
                  />
                  <button
                    type="button"
                    onClick={() => removeListItem(index, field)}
                    className="text-gray-400 hover:text-red-500 px-2"
                  >
                    ✕
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addListItem(field)}
                className="text-blue-600 text-sm font-bold hover:underline"
              >
                + Add {field.slice(0, -1)}
              </button>
            </div>
          ))}

          {/* Action Buttons */}
          <div className="pt-8 flex gap-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-white border border-gray-300 text-gray-700 font-bold py-4 px-6 rounded-xl hover:bg-gray-50 transition-all"
            >
              Discard Changes
            </button>
            <button
              type="submit"
              className="flex-[2] bg-green-600 text-white font-bold py-4 px-6 rounded-xl hover:bg-green-700 shadow-lg shadow-green-100 transition-all"
            >
              Update Job Listing
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditJobForm;
