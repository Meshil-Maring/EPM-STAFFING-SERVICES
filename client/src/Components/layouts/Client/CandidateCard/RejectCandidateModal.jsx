import { useState } from "react";
import { X, TriangleAlert } from "lucide-react";
import { saveComment } from "./CandidateCard";

export default function RejectCandidateModal({ application, onClose }) {
  const candidateName = application?.candidate?.[0]?.candidate_name ?? "—";
  const [message, setMessage] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const handleReject = async () => {
    const res = await saveComment(
      application?.id,
      application?.candidate[0]?.id,
      "Rejection",
      "client",
      message,
      "rejected",
    );

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 flex items-start justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Reject candidate
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Candidate:{" "}
              <span className="font-medium text-gray-800">{candidateName}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="cursor-pointer text-gray-400 hover:text-gray-600 transition-colors mt-0.5"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 flex flex-col gap-4">
          {/* Message */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-800">
              Message to candidate{" "}
              <span className="font-normal text-gray-400">(optional)</span>
            </label>
            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Thank you for your time and interest..."
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-200 resize-none transition"
            />
          </div>

          {/* Warning
          <div className="flex items-start gap-2.5 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
            <TriangleAlert size={15} className="text-red-500 mt-0.5 shrink-0" />
            <p className="text-xs text-red-600 leading-relaxed">
              This action is irreversible. The candidate will be notified via
              email.
            </p>
          </div> */}

          {/* Confirm checkbox */}
          <label className="flex items-center gap-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 accent-red-500 cursor-pointer"
            />
            <span className="text-sm text-gray-700">
              I confirm this rejection is final
            </span>
          </label>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-1">
            <button
              onClick={onClose}
              className="cursor-pointer px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>

            <button
              onClick={handleReject}
              disabled={!confirmed}
              className="cursor-pointer px-6 py-2.5 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Reject candidate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
