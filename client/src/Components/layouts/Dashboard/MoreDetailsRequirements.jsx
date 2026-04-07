import React from "react";
import Label from "../../common/Label";
import Icon from "../../common/Icon";

// ─── Reusable List Section ────────────────────────────────────────────────────
const DetailSection = ({ icon, title, items, emptyText }) => {
  // Helper to extract string values from items
  // Items can be either:
  // 1. Array of strings: ["req1", "req2"]
  // 2. Array with object: [{0: "req1", 1: "req2"}]
  const extractStringItems = (itemsArray) => {
    if (!itemsArray || itemsArray.length === 0) return [];

    const firstItem = itemsArray[0];

    // If the first item is an object with numeric keys, extract values
    if (
      typeof firstItem === "object" &&
      firstItem !== null &&
      !Array.isArray(firstItem)
    ) {
      return Object.values(firstItem);
    }

    // Otherwise, return the array as-is (assuming it's an array of strings)
    return itemsArray;
  };

  const stringItems = extractStringItems(items);

  return (
    <div className="flex flex-col gap-1">
      {/* Section Header */}
      <div className="flex items-center gap-1">
        <div className="w-7 h-7 rounded-md bg-blue-50 flex items-center justify-center text-blue-500">
          <Icon icon={icon} />
        </div>
        <Label text={title} class_name="text-sm font-semibold text-text_b" />
      </div>

      {/* Items or Empty State */}
      {stringItems.length > 0 ? (
        <ul className="flex flex-row items-center gap-4 pl-2">
          {stringItems.map((item, i) => (
            <li
              key={i}
              className="flex items-center bg-blue/5 px-4 rounded-full gap-2.5"
            >
              <span className="text-sm text-text_l_b leading-relaxed">
                {typeof item === "string" ? item : String(item)}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="pl-2 text-sm text-text_l_b italic opacity-60">
          {emptyText}
        </p>
      )}
    </div>
  );
};

// ─── Salary & Meta Info Row ───────────────────────────────────────────────────
const MetaChip = ({ icon, label, value }) => (
  <div className="flex flex-col gap-1 px-4 py-3 bg-gray-50 rounded-lg border border-gray-100">
    <div className="flex items-center gap-1.5 text-text_l_b">
      <Icon icon={icon} />
      <Label text={label} class_name="text-xs font-medium text-text_l_b" />
    </div>
    <Label text={value} class_name="text-sm font-semibold text-text_b" />
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────
function MoreDetailsRequirements({ card }) {
  if (!card) return null;

  const hasRequirements = card.requirements?.length > 0;
  const hasResponsibility = card.responsibilities?.length > 0;
  const hasBenefits = card.benefits?.length > 0;

  return (
    <div className="flex flex-col gap-6">
      {/* ── Meta Info Grid ── */}
      <div>
        <Label
          text="Job Overview"
          class_name="text-xs font-semibold text-text_l_b uppercase tracking-wider mb-3"
        />
        <div className="grid grid-cols-2 gap-3">
          <MetaChip
            icon="ri-briefcase-line"
            label="Job Type"
            value={card?.job_type || "—"}
          />
          <MetaChip
            icon="ri-map-pin-line"
            label="Location"
            value={card?.location || "—"}
          />
          <MetaChip
            icon="ri-money-dollar-circle-line"
            label="Salary (LPA)"
            value={`₹${card?.salary}L` || "—"}
          />
          <MetaChip
            icon="ri-time-line"
            label="Experience"
            value={card?.experience || "—"}
          />
          <MetaChip
            icon="ri-calendar-line"
            label="Deadline"
            value={card?.deadline || "-"}
          />
          <MetaChip
            icon="ri-group-line"
            label="Slots"
            value={`${card?.applicants} / ${card?.max_applications} Applied`}
          />
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="border-t border-gray-200" />

      {/* ── Full Description ── */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-blue-50 flex items-center justify-center text-blue-500">
            <Icon icon="ri-file-text-line" />
          </div>
          <Label
            text="Full Description"
            class_name="text-sm font-semibold text-text_b"
          />
        </div>
        <p className="pl-2 text-sm text-text_l_b leading-relaxed">
          {card.description || "No description provided."}
        </p>
      </div>

      {/* ── Divider ── */}
      <div className="border-t border-gray-200" />

      {/* ── Requirements ── */}
      <DetailSection
        icon="ri-checkbox-circle-line"
        title="Requirements"
        items={card.requirements}
        emptyText="No requirements listed."
      />

      {/* ── Responsibilities ── */}
      <DetailSection
        icon="ri-task-line"
        title="Responsibilities"
        items={card.responsibilities}
        emptyText="No responsibilities listed."
      />

      {/* ── Benefits ── */}
      <DetailSection
        icon="ri-gift-line"
        title="Benefits"
        items={card.benefits}
        emptyText="No benefits listed."
      />

      {/* ── Bottom Status Strip ── */}
      <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-full ${
              card.status === "Active" ? "bg-green-500" : "bg-red-400"
            }`}
          />
          <Label
            text={
              card.status === "Active" ? "Actively Hiring" : "Hiring Closed"
            }
            class_name={`text-xs font-medium ${
              card.status === "Active" ? "text-green-600" : "text-red-500"
            }`}
          />
        </div>

        <Label
          text={`Posted on ${card["date posted"]}`}
          class_name="text-xs text-text_l_b opacity-70"
        />
      </div>
    </div>
  );
}

export default MoreDetailsRequirements;
