import React from "react";
import Image from "./Image";
function NameInitials({ name, id }) {
  return (
    <div className="relative shrink-0">
      <div className="h-14 w-14 rounded-small overflow-hidden border border-lighter shadow-sm">
        <Image
          link={`https://ui-avatars.com/api/?name=${name}&background=dd6b20&color=fff`}
          alt={`${name}'s avatar`}
          width="56"
          height="56"
          class_name="w-full h-full object-cover"
        />
      </div>
      <span
        className="absolute -bottom-2 -right-2 h-6 w-8 bg-whiter border border-lighter shadow-xs rounded-xs flex items-center justify-center text-[10px] font-bold text-secondary"
        aria-label={`Candidate number ${id + 1}`}
      >
        #{id + 1}
      </span>
    </div>
  );
}

export default NameInitials;
