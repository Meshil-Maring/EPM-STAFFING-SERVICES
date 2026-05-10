export const filterJobs = (jobs, s_key) => {
  return Object.keys(jobs || {}).reduce((acc, key) => {
    const job = jobs[key];
    const name =
      typeof job?.name === "string" ? job.name.toLocaleLowerCase() : "";
    const status =
      typeof job?.["status"] === "string" ? job.status.toLocaleLowerCase() : "";
    const job_title =
      typeof job?.["job title"] === "string"
        ? job?.["job title"].toLocaleLowerCase()
        : "";

    if (
      name.includes(s_key) ||
      status.includes(s_key) ||
      job_title.includes(s_key)
    ) {
      acc[key] = job;
    }
    return acc;
  }, {});
};
