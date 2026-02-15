import { motion } from "framer-motion";

function ConfirmationModal({ isOpen, title, message, onCancel, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-40" />
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="z-50 w-[40%] bg-white rounded-small p-6 shadow-lg"
      >
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-4">{message}</p>
        <div className="flex flex-row items-center justify-end gap-2">
          <button
            onClick={onCancel}
            className="py-2 px-4 rounded-small border border-light"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="py-2 px-4 rounded-small bg-red-lighter text-red-dark"
          >
            Confirm
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default ConfirmationModal;
