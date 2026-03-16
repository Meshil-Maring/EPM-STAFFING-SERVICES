const URL = import.meta.env.VITE_URL;

// POST: create jobs
export const postJobs = async (data) => {
  const res = await fetch(`${URL}/api/jobs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res;
};

// GET : fetch jobs by user id
export const getJobsByUserID = async (user_id) => {
  const res = await fetch(`${URL}/api/jobs/:$${user_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = res.json();

  return data;
};
