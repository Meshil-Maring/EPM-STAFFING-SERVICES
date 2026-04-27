const API_ROUTES = import.meta.env.VITE_URL;

export const uploadPdfService = async (
  URL,
  file,
  candidate_id,
  application_id,
  folder_name,
) => {
  try {
    const formData = new FormData();
    formData.append("pdf", file);
    formData.append("candidate_id", candidate_id);
    formData.append("application_id", application_id);
    formData.append("folder_name", folder_name);

    const res = await fetch(`${API_ROUTES}/${URL}`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const searchCandiateService = async (candidate_name) => {
  try {
    const res = await fetch(
      `${API_ROUTES}/api/candidates/search/candidate-name?search=${candidate_name}`,
      {
        method: "GET",
        credentials: "include",
      },
    );

    const data = await res.json();

    return data;
  } catch (err) {
    console.log(err);
  }
};
