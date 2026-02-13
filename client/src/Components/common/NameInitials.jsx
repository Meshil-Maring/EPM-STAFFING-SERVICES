import React from "react";
import Image from "./Image";
function NameInitials({ name, id, class_name = "h-12 w-12", bg = "dd6b20" }) {
  return (
    <div className={`relative shrink-0 ${class_name || ""}`}>
      <div className=" rounded-small overflow-hidden border border-lighter shadow-sm">
        <Image
          link={`https://ui-avatars.com/api/?name=${name}&background=${bg}&color=fff`}
          alt={`${name}'s avatar`}
          width="56"
          height="56"
          class_name="w-full h-full object-cover"
        />
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
