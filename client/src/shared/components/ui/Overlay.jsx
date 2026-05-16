import React from "react";

function Overlay({ onClose, children, className = "" }) {
  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center ${className}`}
    >
      <div onClick={(e) => e.stopPropagation()} className="contents">
        {children}
      </div>
    </div>
  );
}

export default Overlay;
