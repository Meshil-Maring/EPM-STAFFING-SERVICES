import React from "react";
import Label from "../../../common/Label";
import Icon from "../../../common/Icon";
/**
 * Bio section component for candidate details showing story and skills
 */
function CandidateBioSection({ bio, skills }) {
  return (
    <section className="w-full p-4 border-t border-lighter/30">
      {/* Bio/Story Section */}
      <div className="mb-6">
        <header className="flex items-center gap-2 mb-3">
          <Icon icon="ri-user-3-line" class_name="text-nevy_blue text-lg" />
          <Label
            as="h3"
            text="Candidate Story"
            class_name="font-semibold text-text_b"
          />
        </header>
        <p className="text-sm text-text_l_b leading-relaxed">
          {bio || "No bio available"}
        </p>
      </div>

      {/* Skills Section */}
      <div>
        <header className="flex items-center gap-2 mb-3">
          <Icon icon="ri-tools-line" class_name="text-nevy_blue text-lg" />
          <Label as="h3" text="Skills" class_name="font-semibold text-text_b" />
        </header>
        <div className="flex flex-wrap gap-2">
          {skills && skills.length > 0 ? (
            skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-lighter/50 text-text_b_l text-sm rounded-full border border-lighter"
              >
                {skill}
              </span>
            ))
          ) : (
            <span className="text-sm text-text_l_b">No skills listed</span>
          )}
        </div>
      </div>
    </section>
  );
}

export default CandidateBioSection;
