const API_ROUTES = import.meta.env.VITE_URL;
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

    const fullURL = `${API_ROUTES}/${URL}`;

    const res = await fetch(fullURL, {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    const text = await res.text();

    console.log(text);

    try {
      return JSON.parse(text);
    } catch {
      throw new Error("Server did not return JSON");
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};
