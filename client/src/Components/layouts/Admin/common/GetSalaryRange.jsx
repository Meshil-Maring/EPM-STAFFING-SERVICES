import { formatValue } from "../../../common/formatText";

export const getSalaryRange = (salary) => {
  // Handle null, undefined, or non-string values
  if (!salary || typeof salary !== "string") {
    return salary || "-";
  }

  const parts = salary.split("-");
  if (parts.length < 2) return `₹ ${salary}`;
  const [min, max] = parts;
  return `₹ ${formatValue(min.trim())} - ₹ ${formatValue(max.trim())}`;
};
