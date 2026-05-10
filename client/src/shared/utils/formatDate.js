export const formatDate = (rawDate) => {
  const [day, month, year] = rawDate.split("T")[0].split("-");
  return `${day}/${month}/${year}`;
};
