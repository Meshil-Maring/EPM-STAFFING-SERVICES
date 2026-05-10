const ConfirmDeleteOverlay = ({
  isOpen,
  onClose,
  onConfirm,
  candidateName,
  isDeleting = false,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/45"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-sm mx-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Red header */}
        <div className="bg-red-600 px-5 py-4 flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-red-700 flex items-center justify-center shrink-0">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="8" r="3.5" stroke="white" strokeWidth="1.8" />
              <path
                d="M5 20c0-3.866 3.134-7 7-7s7 3.134 7 7"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <path
                d="M15.5 15l3 3m0-3l-3 3"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <h2 className="flex-1 text-white text-xl font-medium">
            Delete Candidate
          </h2>
          <button onClick={onClose} className="text-white p-1">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M2 2l14 14M16 2L2 16"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-8 flex flex-col items-center gap-2">
          <p className="text-base text-gray-900 text-center">
            Are you sure to delete{" "}
            <span className="font-semibold">"{candidateName}"</span>?
          </p>
          <p className="text-sm text-gray-400 text-center">
            This action can't be undone
          </p>
        </div>

        {/* Footer */}
        <div className="px-5 pb-6">
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="w-full py-4 rounded-2xl bg-red-600 text-white text-base font-medium hover:bg-red-700 transition-colors disabled:opacity-60"
          >
            {isDeleting ? "Deleting..." : "Confirm Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteOverlay;
