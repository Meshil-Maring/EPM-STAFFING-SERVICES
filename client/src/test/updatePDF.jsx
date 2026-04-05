import { useState } from "react";
import { submitCandidates } from "../Components/layouts/Admin/AdminClientManagement/end-point-function/client_management";

export default function CandidateForm() {
  const [form, setForm] = useState({
    email: "",
    phone: "",
    location: "",
    job_type: "",
    expected_ctc: "",
    current_ctc: "",
    gender: "",
    date_of_birth: "",
    linkedin: "",
    notice_period_days: "",
    description: "",
  });

  const [resumeFile, setResumeFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // handle file
  const handleFileChange = (e) => {
    setResumeFile(e.target.files[0]);
  };

  // submit form
  const handleSubmit = async () => {
    setLoading(true);
    setMessage("");

    try {
      const res = await submitCandidates(
        true,
        "352550c0-d299-469c-9ed6-93cbaa0a9186",
        form.name,
        form.email,
        form.phone,
        form.location,
        form.job_type,
        form.expected_ctc,
        form.current_ctc,
        form.gender,
        form.date_of_birth,
        form.linkedin,
        form.notice_period_days,
        form.description,
        resumeFile,
        null,
        null,
      );

      if (!res.success) {
        setMessage(res.message);
      } else {
        setMessage("Candidate submitted successfully");
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-[400px] space-y-4">
        <h2 className="text-2xl font-bold text-center">Candidate Form</h2>

        {/* Inputs */}
        <input
          name="name"
          placeholder="name"
          onChange={handleChange}
          className="input"
        />

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="input"
        />
        <input
          name="phone"
          placeholder="Phone"
          onChange={handleChange}
          className="input"
        />
        <input
          name="location"
          placeholder="Location"
          onChange={handleChange}
          className="input"
        />
        <input
          name="job_type"
          placeholder="Job Type"
          onChange={handleChange}
          className="input"
        />
        <input
          name="expected_ctc"
          placeholder="Expected CTC"
          onChange={handleChange}
          className="input"
        />
        <input
          name="current_ctc"
          placeholder="Current CTC"
          onChange={handleChange}
          className="input"
        />

        <select name="gender" onChange={handleChange} className="input">
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <input
          type="date"
          name="date_of_birth"
          onChange={handleChange}
          className="input"
        />
        <input
          name="linkedin"
          placeholder="LinkedIn URL"
          onChange={handleChange}
          className="input"
        />
        <input
          name="notice_period_days"
          placeholder="Notice Period (days)"
          onChange={handleChange}
          className="input"
        />

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          className="input"
        />

        {/* File Upload */}
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="text-sm file:bg-purple-600 file:text-white file:px-4 file:py-2 file:rounded-lg"
        />

        {resumeFile && (
          <p className="text-sm text-gray-300">Selected: {resumeFile.name}</p>
        )}

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-purple-600 hover:bg-purple-700 py-2 rounded-lg font-semibold"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>

        {/* Message */}
        {message && (
          <p className="text-center text-sm text-green-400">{message}</p>
        )}
      </div>
    </div>
  );
}
