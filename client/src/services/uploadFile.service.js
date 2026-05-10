const API_ROUTES = import.meta.env.VITE_URL;

export const uploadAgreementService = async ({
  signatureFile,
  stampFile,
  user_id,
  company_name,
  authority_name,
  service_charge,
}) => {
  const formData = new FormData();
  formData.append("signature", signatureFile);
  formData.append("stamp", stampFile);
  formData.append("user_id", user_id);
  formData.append("company_name", company_name);
  formData.append("authority_name", authority_name);
  formData.append("service_charge", service_charge);

  const res = await fetch(`${API_ROUTES}/api/users/upload/agreement`, {
    method: "POST",
    body: formData,
    credentials: "include",
  });

  const text = await res.text();

  let data;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error("Server did not return valid JSON");
  }

  if (!res.ok) {
    throw new Error(data?.message || `Upload failed (${res.status})`);
  }

  return data;
};
