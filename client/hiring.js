document.addEventListener('DOMContentLoaded', function() {
    const freelancersContainer = document.getElementById('freelancers-container');
    
    // Load freelancers when page opens
    loadFreelancers();

    // Search/filter functionality
    document.getElementById('search-btn').addEventListener('click', function() {
        const searchTerm = document.getElementById('search-input').value.toLowerCase();
        const cards = document.querySelectorAll('.freelancer-card');
        
        cards.forEach(card => {
            const name = card.querySelector('h3').textContent.toLowerCase();
            const skills = card.querySelector('.skills').textContent.toLowerCase();
            if (name.includes(searchTerm) || skills.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Load freelancers from localStorage
function loadFreelancers() {
    const freelancersContainer = document.getElementById('freelancers-container');
    const freelancers = JSON.parse(localStorage.getItem('freelancerProfiles')) || [];
    
    if (freelancers.length === 0) {
        freelancersContainer.innerHTML = '<p>No freelancers found. Check back later!</p>';
        return;
    }

    freelancersContainer.innerHTML = '';
    freelancers.forEach(freelancer => {
        const card = document.createElement('div');
        card.className = 'freelancer-card';
        
        card.innerHTML = `
            <img src="${freelancer.profilePic || 'https://via.placeholder.com/150'}" alt="${freelancer.name}">
            <h3>${freelancer.name}</h3>
            <p class="title">${freelancer.title || 'Freelancer'}</p>
            <p class="location"><i class="fas fa-map-marker-alt"></i> ${freelancer.location || 'Location not specified'}</p>
            <div class="skills">
                ${freelancer.skills && freelancer.skills.length > 0 ? 
                    freelancer.skills.map(skill => `<span class="skill">${skill}</span>`).join('') : 
                    '<p>No skills listed</p>'}
            </div>
            <p class="about">${freelancer.about ? freelancer.about.substring(0, 100) + '...' : 'No description provided'}</p>
            <button class="view-btn" onclick="viewProfile('${freelancer.name}')">View Profile</button>
        `;
        
        freelancersContainer.appendChild(card);
    });
}

// View full profile in a modal
function viewProfile(name) {
    const freelancers = JSON.parse(localStorage.getItem('freelancerProfiles')) || [];
    const freelancer = freelancers.find(f => f.name === name);
    
    if (freelancer) {
        // Create a modal or redirect to a profile page
        const profileHTML = `
            <div class="profile-modal">
                <div class="profile-content">
                    <img src="${freelancer.profilePic || 'https://via.placeholder.com/150'}" alt="${freelancer.name}">
                    <h2>${freelancer.name}</h2>
                    <h3>${freelancer.title || 'Freelancer'}</h3>
                    <p><i class="fas fa-map-marker-alt"></i> ${freelancer.location || 'Location not specified'}</p>
                    
                    <div class="section">
                        <h4>About</h4>
                        <p>${freelancer.about || 'No description provided'}</p>
                    </div>
                    
                    <div class="section">
                        <h4>Skills</h4>
                        <div class="skills">
                            ${freelancer.skills && freelancer.skills.length > 0 ? 
                                freelancer.skills.map(skill => `<span class="skill">${skill}</span>`).join('') : 
                                '<p>No skills listed</p>'}
                        </div>
                    </div>
                    
                    ${freelancer.projects && freelancer.projects.length > 0 ? `
                    <div class="section">
                        <h4>Portfolio</h4>
                        ${freelancer.projects.map(project => `
                            <div class="project">
                                <h5>${project.title}</h5>
                                ${project.description ? `<p>${project.description}</p>` : ''}
                                ${project.link ? `<a href="${project.link}" target="_blank">View Project</a>` : ''}
                            </div>
                        `).join('')}
                    </div>` : ''}
                    
                    <div class="section">
                        <h4>Contact</h4>
                        ${freelancer.contact.email ? `<p><i class="fas fa-envelope"></i> ${freelancer.contact.email}</p>` : ''}
                        ${freelancer.contact.phone ? `<p><i class="fas fa-phone"></i> ${freelancer.contact.phone}</p>` : ''}
                        ${freelancer.contact.website ? `<p><i class="fas fa-globe"></i> <a href="${freelancer.contact.website}" target="_blank">${freelancer.contact.website}</a></p>` : ''}
                    </div>
                    
                    <button class="close-btn">Close</button>
                </div>
            </div>
        `;
        
        // Create and show modal
        const modal = document.createElement('div');
        modal.innerHTML = profileHTML;
        document.body.appendChild(modal);
        
        // Add close button handler
        modal.querySelector('.close-btn').addEventListener('click', () => {
            document.body.removeChild(modal);
        });
    } else {
        alert('Freelancer not found');
    }
}