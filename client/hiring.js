document.addEventListener('DOMContentLoaded', function() {
    const freelancersContainer = document.getElementById('freelancers-container');
    
    // Simulate fetching freelancer data (in a real app, use localStorage/API)
    function loadFreelancers() {
        // Check if profiles exist in localStorage
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
                <p class="title">${freelancer.title}</p>
                <p class="rate">$${freelancer.rate || 'Not specified'}/hour</p>
                <div class="skills">
                    ${freelancer.skills.map(skill => `<span class="skill">${skill}</span>`).join('')}
                </div>
                <p class="rating">${'⭐'.repeat(Math.floor(freelancer.rating || 0))}${freelancer.rating || 'No ratings'}</p>
                <button class="view-btn" onclick="viewProfile('${freelancer.name}')">View Profile</button>
            `;
            
            freelancersContainer.appendChild(card);
        });
    }

    // Search/filter functionality (simplified)
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

    // Load freelancers when page opens
    loadFreelancers();
});

// For viewing full profile (could link to a dedicated profile page)
function viewProfile(name) {
    alert(`Viewing profile of ${name}`);
    // In a real app: window.location.href = `profile.html?name=${encodeURIComponent(name)}`;
}