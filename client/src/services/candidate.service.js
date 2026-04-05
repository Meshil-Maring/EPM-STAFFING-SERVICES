const API_ROUTES = import.meta.env.VITE_URL;

export const uploadPdfService = async (
  URL,
  file,
  candidate_id,
  folder_name,
) => {
  try {
    const formData = new FormData();
    formData.append("pdf", file);
    formData.append("candidate_id", candidate_id);
    formData.append("folder_name", folder_name);

    const res = await fetch(`${API_ROUTES}/${URL}`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    console.log(data);
  } catch (err) {
    console.log(err);
    throw err;
  }
};
