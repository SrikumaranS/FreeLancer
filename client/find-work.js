// find-work.js

document.addEventListener('DOMContentLoaded', function () {
    const postJobBtn = document.getElementById('post-job-btn');
    const postJobModal = document.getElementById('post-job-modal');
    const closeBtn = postJobModal.querySelector('.close');
    const jobForm = document.getElementById('job-form');

    postJobBtn.addEventListener('click', () => {
        postJobModal.style.display = 'flex';
        postJobModal.scrollTop = 0;
    });

    closeBtn.addEventListener('click', () => {
        postJobModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === postJobModal) {
            postJobModal.style.display = 'none';
        }
    });

    jobForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const job = {
            id: Date.now().toString(),
            title: document.getElementById('job-title').value,
            company: document.getElementById('job-company').value,
            description: document.getElementById('job-description').value,
            type: document.getElementById('job-type').value,
            budget: document.getElementById('job-budget').value,
            location: document.getElementById('job-location').value,
            experience: document.getElementById('job-experience').value,
            skills: document.getElementById('job-skills').value.split(',').map(skill => skill.trim()),
            contactEmail: document.getElementById('job-email').value,
            postedDate: new Date().toISOString(),
            applicants: 0
        };

        saveJob(job);
        jobForm.reset();
        postJobModal.style.display = 'none';
        loadJobs();
    });

    loadJobs();
});

function saveJob(job) {
    const jobs = JSON.parse(localStorage.getItem('freelanceJobs')) || [];
    jobs.push(job);
    localStorage.setItem('freelanceJobs', JSON.stringify(jobs));
}

function loadJobs() {
    const jobs = JSON.parse(localStorage.getItem('freelanceJobs')) || [];
    const jobList = document.querySelector('.job-list');

    if (!jobList) return;

    if (jobs.length === 0) {
        jobList.innerHTML = '<p>No jobs found. Be the first to post one!</p>';
        return;
    }

    jobList.innerHTML = jobs.reverse().map(job => `
        <div class="job-card" data-id="${job.id}">
            <span class="job-type">${job.type}</span>
            <div class="job-header">
                <div class="job-info">
                    <h3 class="job-title">${job.title}</h3>
                    <p class="job-company">${job.company}</p>
                </div>
                <div class="job-budget">${job.budget}</div>
            </div>
            <p class="job-description">${job.description}</p>
            <div class="job-details">
                <div class="job-detail"><i class="fas fa-map-marker-alt"></i><span>${job.location}</span></div>
                <div class="job-detail"><i class="fas fa-clock"></i><span>Posted ${formatDate(job.postedDate)}</span></div>
                <div class="job-detail"><i class="fas fa-briefcase"></i><span>${job.experience} level</span></div>
            </div>
            <div class="job-skills">
                ${job.skills.map(skill => `<span class="tag">${skill}</span>`).join('')}
            </div>
            <div class="job-actions">
                <span>${job.applicants} applicant${job.applicants !== 1 ? 's' : ''}</span>
                <button class="btn btn-primary apply-btn" data-id="${job.id}">Apply Now</button>
            </div>
        </div>
    `).join('');

    document.querySelectorAll('.apply-btn').forEach(button => {
        button.addEventListener('click', function () {
            const jobId = this.getAttribute('data-id');
            showJobModal(jobId);
        });
    });
}

function showJobModal(jobId) {
    const jobs = JSON.parse(localStorage.getItem('freelanceJobs')) || [];
    const job = jobs.find(j => j.id === jobId);

    if (!job) return;

    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'flex';

    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>${job.title}</h2>
            <p><strong>Company:</strong> ${job.company}</p>
            <p><strong>Location:</strong> ${job.location}</p>
            <p><strong>Experience:</strong> ${job.experience}</p>
            <p><strong>Budget:</strong> ${job.budget}</p>
            <p><strong>Type:</strong> ${job.type}</p>
            <p><strong>Description:</strong><br>${job.description}</p>
            <p><strong>Skills:</strong><br> ${job.skills.join(', ')}</p>
            <p><strong>Contact Email:</strong> ${job.contactEmail}</p>
        </div>
    `;

    document.body.appendChild(modal);

    modal.querySelector('.close').addEventListener('click', () => {
        document.body.removeChild(modal);
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    if (diffInDays === 0) return 'today';
    if (diffInDays === 1) return 'yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} week${Math.floor(diffInDays / 7) !== 1 ? 's' : ''} ago`;
    return date.toLocaleDateString();
}
