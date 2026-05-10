export const fetchAgreementData = async (agreementId) => {
  const res = await fetch(`/api/agreements/${agreementId}`);
  if (!res.ok) throw new Error("Failed to fetch agreement data");
  return res.json();
};
