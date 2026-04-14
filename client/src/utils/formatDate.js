export const formatDate = (rawDate) => {
  if (!rawDate) return "N/A";
  const [day, month, year] = rawDate.split("T")[0].split("-");
  return `${day}/${month}/${year}`;
};
