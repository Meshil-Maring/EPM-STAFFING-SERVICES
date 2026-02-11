export const formatValue = (val) => {
  const num = Number(val);

  if (isNaN(num)) return "N/A";

  if (num >= 100000) {
    const lakhs = num / 100000;
    return `${lakhs} Lakhs`;
  }

  if (num >= 1000) {
    const thousands = num / 1000;
    return `${thousands}K`;
  }

  return num.toString();
};
