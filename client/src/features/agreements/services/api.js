import { getByIdService, getByUserIdService } from "../../../services/dynamic.service";

export const fetchAgreementData = async (userId) => {
  const [agreements, company] = await Promise.all([
    getByUserIdService("api/dr/get/user-id", "agreements", userId),
    getByIdService("api/dr/get", "user_info", userId),
  ]);

  if (!company.success) throw new Error("Failed to fetch agreement data");

  const c = company.data;
  const a = agreements.data?.[0];

  const clientCompanyName = c.company_name ?? "";
  const addressParts = [c.street, c.city, c.state].filter(Boolean).join(", ");
  const clientAddress = c.pin_code
    ? `${addressParts} – ${c.pin_code}`
    : addressParts;

  if (!a) return { clientCompanyName, clientAddress };

  let agreementDate = "DD-MM-YYYY";

  if (a.created_at) {
    const dt = new Date(a.created_at);
    const dd = String(dt.getDate()).padStart(2, "0");
    const mm = String(dt.getMonth() + 1).padStart(2, "0");
    const yyyy = dt.getFullYear();
    agreementDate = `${dd}-${mm}-${yyyy}`;
  }


  return {
    serviceChargePercent: a.service_charge ?? "___",
    authorityName: a.authority_name ?? "",
    signatureUrl: a.signature_url ?? "",
    stampUrl: a.stamp_url ?? "",
    fileName: a.file_name ?? "",
    clientCompanyName,
    clientAddress,
    agreementDate,
  };
};
