export const uploadPdfService = async (
  URL,
  file,
  user_id,
  folder_name,
  company_name,
) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("user_id", user_id);
    formData.append("folder_name", folder_name);
    formData.append("company_name", company_name);

    const res = await fetch(`${API_ROUTES}/${URL}`, {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    const data = await res.json();

    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
