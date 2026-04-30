const API_ROUTES = import.meta.env.VITE_URL;

export const getInterviewPipelineService = async (id, stage) => {
  try {
    const res = await fetch(
      `${API_ROUTES}/api/interviews/get/interviews-pipeline/${id}?stage=${stage}`,
      {
        method: "GET",
        credentials: "include",
      },
    );

    if (!res.ok) throw new Error(`Request failed with status ${res.status}`);

    const data = await res.json();

    return data;
  } catch (err) {
    console.error(err);
    return null; // ← this line
  }
};
