import React, { useMemo } from "react";
import Image from "./Image";

function NameInitials({
  name,
  id,
  class_name = "h-12 bg-[#dd6b20] w-12 rounded-small border border-lighter font-semibold text-[clamp(1.2em,1.2vw,1.4em)] flex items-center justify-center",
}) {
  // Generate initials from name
  const initials = useMemo(() => {
    if (!name) return "?";
    const parts = name.trim().split(/\s+/);
    const first = parts[0]?.[0] || "";
    const second = parts[1]?.[0] || "";
    return (first + second).toUpperCase();
  }, [name]);

  return (
    <div className={`relative shrink-0 ${class_name || ""}`}>
      <div className="rounded-small overflow-hidden border-lighter shadow-sm ">
        <span className={`${class_name} `}>{initials}</span>
      </div>
      {id && (
        <span
          className="absolute -bottom-2 -right-2 p-1 rounded-small bg-whiter border border-lighter shadow-xs flex items-center justify-center text-[10px] font-bold text-secondary"
          aria-label={`Candidate number ${id}`}
        >
          #{id}
        </span>
      )}
    </div>
  );
}

export default NameInitials;
