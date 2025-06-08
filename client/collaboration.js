// collaboration.js

document.addEventListener("DOMContentLoaded", () => {
  const appliedJobsList = document.getElementById("applied-jobs");
  const activeContractsList = document.getElementById("active-contracts");

  const appliedJobs = JSON.parse(localStorage.getItem("appliedJobs")) || [];
  const activeContracts = JSON.parse(localStorage.getItem("activeContracts")) || [];

  function renderList(listElement, jobs, emptyMessage) {
    if (jobs.length === 0) {
      listElement.innerHTML = `<li>${emptyMessage}</li>`;
      return;
    }

    listElement.innerHTML = jobs
      .map(
        (job) => `
        <li>
          <h3>${job.title}</h3>
          <p><strong>Company:</strong> ${job.company}</p>
          <p><strong>Budget:</strong> ${job.budget}</p>
          <p><strong>Status:</strong> ${job.status || "Pending"}</p>
        </li>`
      )
      .join("");
  }

  renderList(appliedJobsList, appliedJobs, "No jobs applied.");
  renderList(activeContractsList, activeContracts, "No active contracts.");
});
