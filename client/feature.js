// featured-projects.js

document.addEventListener("DOMContentLoaded", () => {
  const projectList = document.getElementById("project-list");
  const filterButtons = document.querySelectorAll(".filter-btn");

  let allProjects = JSON.parse(localStorage.getItem("freelanceJobs")) || [];

  function renderProjects(projects) {
    if (!projects.length) {
      projectList.innerHTML = "<p>No featured projects yet.</p>";
      return;
    }

    projectList.innerHTML = projects
      .map(
        (job) => `
      <div class="project-card" data-category="${job.category || 'general'}">
        <h3>${job.title}</h3>
        <p><strong>Company:</strong> ${job.company}</p>
        <p><strong>Budget:</strong> ${job.budget}</p>
        <p class="desc">${job.description.slice(0, 100)}...</p>
      </div>
    `
      )
      .join("");
  }

  // Initial render
  renderProjects(allProjects);

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelector(".filter-btn.active").classList.remove("active");
      btn.classList.add("active");
      const filter = btn.dataset.filter;

      if (filter === "all") {
        renderProjects(allProjects);
      } else {
        const filtered = allProjects.filter((p) =>
          (p.category || "").toLowerCase().includes(filter.toLowerCase())
        );
        renderProjects(filtered);
      }
    });
  });
});
