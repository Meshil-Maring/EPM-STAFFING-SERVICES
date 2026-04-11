import { formatValue } from "../../../common/formatText";

export const getSalaryRange = (max, min) => {
  if (!max || !min) return "N/A";
  const max_value = formatValue(max);
  const min_value = formatValue(min);

  return `${min_value} - ${max_value} LPA`;
};
