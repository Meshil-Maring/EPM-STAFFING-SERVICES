import { useState } from "react";
import { CalendarX2, X, Loader2, AlertTriangle } from "lucide-react";
import { cancelInterview } from "../CandidateCard/candidateCard.js";
import { showSuccess } from "../../../../utils/toastUtils.js";

const CancelInterviewModal = ({ candidate, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const candidateData = candidate?.candidate?.[0] ?? {};
  const interview = candidateData?.interviews?.[0] ?? null;
  const name = candidateData?.candidate_name ?? "—";

  const handleCancel = async () => {
    if (!interview?.id) return;

    try {
      setLoading(true);
      setError(null);
      const res = await cancelInterview(interview.id);

      if (!res.success) return showSuccess(res.message);

      showSuccess("Interview cancel successfully");

      onClose();
    } catch (err) {
      console.error(err);
      setError("Failed to cancel the interview. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={18} />
        </button>

        {/* Icon + Title */}
        <div className="flex flex-col items-center text-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
            <CalendarX2 size={22} className="text-red-600" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-gray-900">
              Cancel Interview
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Are you sure you want to cancel the scheduled interview for{" "}
              <span className="font-medium text-gray-700">{name}</span>?
            </p>
          </div>
        </div>

        {/* Interview details */}
        {interview && (
          <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 mb-5 text-sm text-gray-700 space-y-1.5">
            <div className="flex justify-between">
              <span className="text-gray-400 text-xs uppercase tracking-wide font-medium">
                Stage
              </span>
              <span className="font-medium capitalize">
                {interview.stage?.replace("round", "Round ") ?? "—"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 text-xs uppercase tracking-wide font-medium">
                Type
              </span>
              <span className="font-medium capitalize">
                {interview.type ?? "—"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 text-xs uppercase tracking-wide font-medium">
                Date
              </span>
              <span className="font-medium font-mono">
                {interview.interview_date ?? "—"}
              </span>
            </div>
          </div>
        )}

        {/* Warning */}
        <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-5">
          <AlertTriangle size={14} className="text-amber-500 mt-0.5 shrink-0" />
          <p className="text-xs text-amber-700">
            This action cannot be undone. The candidate's interview status will
            be removed and they will need to be rescheduled.
          </p>
        </div>

        {/* Error */}
        {error && (
          <p className="text-xs text-red-600 text-center mb-4">{error}</p>
        )}

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="py-2.5 rounded-xl text-sm font-medium text-gray-700 border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            Keep Interview
          </button>
          <button
            onClick={handleCancel}
            disabled={loading}
            className="py-2.5 rounded-xl text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 size={13} className="animate-spin" />
                Cancelling...
              </>
            ) : (
              <>
                <CalendarX2 size={13} />
                Yes, Cancel
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelInterviewModal;
