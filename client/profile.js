document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const uploadBtn = document.getElementById('upload-btn');
    const profileUpload = document.getElementById('profile-upload');
    const profilePic = document.getElementById('profile-pic');
    const addSkillBtn = document.getElementById('add-skill');
    const skillInput = document.getElementById('skill-input');
    const skillsList = document.getElementById('skills-list');
    const addProjectBtn = document.getElementById('add-project');
    const projectsContainer = document.getElementById('projects-container');
    const saveProfileBtn = document.getElementById('save-profile');
    const previewProfileBtn = document.getElementById('preview-profile');
    const projectModal = document.getElementById('project-modal');
    const previewModal = document.getElementById('preview-modal');
    const closeButtons = document.querySelectorAll('.close');
    const saveProjectBtn = document.getElementById('save-project');
    
    // Skills array to store added skills
    let skills = [];
    
    // Projects array to store added projects
    let projects = [];
    
    // Upload profile picture
    uploadBtn.addEventListener('click', function() {
        profileUpload.click();
    });
    
    profileUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                profilePic.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
    
    // Add skill
    addSkillBtn.addEventListener('click', function() {
        const skill = skillInput.value.trim();
        if (skill && !skills.includes(skill)) {
            skills.push(skill);
            renderSkills();
            skillInput.value = '';
        }
    });
    
    // Allow adding skill with Enter key
    skillInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addSkillBtn.click();
        }
    });
    
    // Render skills list
    function renderSkills() {
        skillsList.innerHTML = '';
        skills.forEach(skill => {
            const skillTag = document.createElement('div');
            skillTag.className = 'skill-tag';
            skillTag.innerHTML = `
                ${skill}
                <span class="remove-skill" data-skill="${skill}">&times;</span>
            `;
            skillsList.appendChild(skillTag);
        });
        
        // Add event listeners to remove buttons
        document.querySelectorAll('.remove-skill').forEach(btn => {
            btn.addEventListener('click', function() {
                const skillToRemove = this.getAttribute('data-skill');
                skills = skills.filter(skill => skill !== skillToRemove);
                renderSkills();
            });
        });
    }
    
    // Project modal
    addProjectBtn.addEventListener('click', function() {
        projectModal.style.display = 'block';
    });
    
    // Save project
    saveProjectBtn.addEventListener('click', function() {
        const title = document.getElementById('project-title').value.trim();
        const description = document.getElementById('project-description').value.trim();
        const skillsUsed = document.getElementById('project-skills').value.trim();
        const link = document.getElementById('project-link').value.trim();
        const imageFile = document.getElementById('project-image').files[0];
        
        if (!title || !description) {
            alert('Please fill in all required fields');
            return;
        }
        
        const project = {
            title,
            description,
            skills: skillsUsed,
            link,
            image: null
        };
        
        if (imageFile) {
            const reader = new FileReader();
            reader.onload = function(e) {
                project.image = e.target.result;
                addProjectToList(project);
            };
            reader.readAsDataURL(imageFile);
        } else {
            addProjectToList(project);
        }
    });
    
    function addProjectToList(project) {
        projects.push(project);
        renderProjects();
        closeModal(projectModal);
        clearProjectForm();
    }
    
    function renderProjects() {
        projectsContainer.innerHTML = '';
        projects.forEach((project, index) => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            projectCard.innerHTML = `
                <h3>${project.title}</h3>
                ${project.image ? `<img src="${project.image}" class="project-image" alt="${project.title}">` : ''}
                <p>${project.description}</p>
                ${project.skills ? `<p class="project-skills"><strong>Skills used:</strong> ${project.skills}</p>` : ''}
                ${project.link ? `<a href="${project.link}" target="_blank" class="project-link">View Project</a>` : ''}
                <div class="project-actions">
                    <button class="btn edit-project" data-index="${index}">Edit</button>
                    <button class="btn btn-danger delete-project" data-index="${index}">Delete</button>
                </div>
            `;
            projectsContainer.appendChild(projectCard);
        });
        
        // Add event listeners to edit and delete buttons
        document.querySelectorAll('.edit-project').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                editProject(index);
            });
        });
        
        document.querySelectorAll('.delete-project').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                deleteProject(index);
            });
        });
    }
    
    function editProject(index) {
        const project = projects[index];
        document.getElementById('project-title').value = project.title;
        document.getElementById('project-description').value = project.description;
        document.getElementById('project-skills').value = project.skills || '';
        document.getElementById('project-link').value = project.link || '';
        
        // Store the index of the project being edited
        saveProjectBtn.setAttribute('data-edit-index', index);
        
        projectModal.style.display = 'block';
    }
    
    function deleteProject(index) {
        if (confirm('Are you sure you want to delete this project?')) {
            projects.splice(index, 1);
            renderProjects();
        }
    }
    
    function clearProjectForm() {
        document.getElementById('project-title').value = '';
        document.getElementById('project-description').value = '';
        document.getElementById('project-skills').value = '';
        document.getElementById('project-link').value = '';
        document.getElementById('project-image').value = '';
        saveProjectBtn.removeAttribute('data-edit-index');
    }
    
    // Close modal
    closeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal);
        });
    });
    
    function closeModal(modal) {
        modal.style.display = 'none';
    }
    
    // Click outside modal to close
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target);
        }
    });
    
    // Save profile
    saveProfileBtn.addEventListener('click', function() {
        const profileData = getProfileData();
        // In a real app, you would send this to your backend
        console.log('Profile data to save:', profileData);
        alert('Profile saved successfully!');
    });
    
    // Preview profile
    previewProfileBtn.addEventListener('click', function() {
        const profileData = getProfileData();
        renderPreview(profileData);
        previewModal.style.display = 'block';
    });
    
    function getProfileData() {
        return {
            name: document.getElementById('name').value,
            title: document.getElementById('title').value,
            location: document.getElementById('location').value,
            about: document.getElementById('about').value,
            skills: [...skills],
            projects: [...projects],
            contact: {
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                website: document.getElementById('website').value,
                linkedin: document.getElementById('linkedin').value,
                github: document.getElementById('github').value
            },
            profilePic: profilePic.src
        };
    }
    
    function renderPreview(profileData) {
        const previewContainer = document.getElementById('profile-preview');
        previewContainer.innerHTML = `
            <div class="preview-header" style="text-align: center; margin-bottom: 30px;">
                <img src="${profileData.profilePic}" style="width: 150px; height: 150px; border-radius: 50%; object-fit: cover; border: 3px solid #3498db; margin-bottom: 15px;">
                <h1 style="color: #2c3e50; margin-bottom: 5px;">${profileData.name}</h1>
                <h2 style="color: #3498db; margin-bottom: 10px; font-size: 1.5rem;">${profileData.title}</h2>
                <p style="color: #7f8c8d;"><i class="fas fa-map-marker-alt"></i> ${profileData.location}</p>
            </div>
            
            <div style="margin-bottom: 30px;">
                <h2 style="color: #2c3e50; border-bottom: 2px solid #eee; padding-bottom: 10px; margin-bottom: 15px;">About Me</h2>
                <p style="white-space: pre-line;">${profileData.about || 'No about information provided.'}</p>
            </div>
            
            <div style="margin-bottom: 30px;">
                <h2 style="color: #2c3e50; border-bottom: 2px solid #eee; padding-bottom: 10px; margin-bottom: 15px;">Skills</h2>
                <div style="display: flex; flex-wrap: wrap; gap: 10px;">
                    ${profileData.skills.length > 0 ? 
                        profileData.skills.map(skill => `<span style="background-color: #e0f7fa; color: #00838f; padding: 5px 15px; border-radius: 20px;">${skill}</span>`).join('') : 
                        '<p>No skills added yet.</p>'}
                </div>
            </div>
            
            <div style="margin-bottom: 30px;">
                <h2 style="color: #2c3e50; border-bottom: 2px solid #eee; padding-bottom: 10px; margin-bottom: 15px;">Portfolio</h2>
                ${profileData.projects.length > 0 ? 
                    profileData.projects.map(project => `
                        <div style="background-color: #f9f9f9; border-radius: 6px; padding: 20px; margin-bottom: 15px; border-left: 4px solid #3498db;">
                            <h3 style="color: #2c3e50; margin-bottom: 10px;">${project.title}</h3>
                            ${project.image ? `<img src="${project.image}" style="max-width: 100%; height: auto; border-radius: 4px; margin-bottom: 15px;">` : ''}
                            <p style="white-space: pre-line; margin-bottom: 10px;">${project.description}</p>
                            ${project.skills ? `<p style="font-style: italic; color: #7f8c8d; margin-bottom: 10px;"><strong>Skills used:</strong> ${project.skills}</p>` : ''}
                            ${project.link ? `<a href="${project.link}" target="_blank" style="display: inline-block; color: #3498db; text-decoration: none;">View Project</a>` : ''}
                        </div>
                    `).join('') : 
                    '<p>No projects added yet.</p>'}
            </div>
            
            <div>
                <h2 style="color: #2c3e50; border-bottom: 2px solid #eee; padding-bottom: 10px; margin-bottom: 15px;">Contact</h2>
                <ul style="list-style: none;">
                    ${profileData.contact.email ? `<li style="margin-bottom: 10px;"><i class="fas fa-envelope"></i> ${profileData.contact.email}</li>` : ''}
                    ${profileData.contact.phone ? `<li style="margin-bottom: 10px;"><i class="fas fa-phone"></i> ${profileData.contact.phone}</li>` : ''}
                    ${profileData.contact.website ? `<li style="margin-bottom: 10px;"><i class="fas fa-globe"></i> <a href="${profileData.contact.website}" target="_blank">${profileData.contact.website}</a></li>` : ''}
                    ${profileData.contact.linkedin ? `<li style="margin-bottom: 10px;"><i class="fab fa-linkedin"></i> <a href="${profileData.contact.linkedin}" target="_blank">LinkedIn Profile</a></li>` : ''}
                    ${profileData.contact.github ? `<li style="margin-bottom: 10px;"><i class="fab fa-github"></i> <a href="${profileData.contact.github}" target="_blank">GitHub Profile</a></li>` : ''}
                </ul>
            </div>
        `;
    }
});