// Function to update authentication UI
function updateAuthUI() {
  const user = JSON.parse(localStorage.getItem('user'));
  const authButtons = document.querySelector('.auth-buttons');
  
  if (!authButtons) return;
  
  if (user) {
    // Replace auth buttons with user dropdown
    authButtons.innerHTML = `
      <div class="user-dropdown">
        <button class="user-btn" id="user-btn">
          <i class="fas fa-user-circle"></i>
          <span>${user.name.split(' ')[0]}</span>
          <i class="fas fa-chevron-down"></i>
        </button>
        <div class="dropdown-menu" id="dropdown-menu">
          <a href="profile.html">My Profile</a>
          <a href="#" id="logout-btn">Logout</a>
        </div>
      </div>
    `;
    
    // Add dropdown functionality
    const userBtn = document.getElementById('user-btn');
    const dropdownMenu = document.getElementById('dropdown-menu');
    
    if (userBtn && dropdownMenu) {
      userBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        dropdownMenu.classList.toggle('show');
      });
      
      // Logout functionality
      document.getElementById('logout-btn').addEventListener('click', function(e) {
        e.preventDefault();
        localStorage.removeItem('user');
        window.location.href = 'index.html';
      });
    }
  } else {
    // Show default auth buttons if no user
    authButtons.innerHTML = `
      <a href="login.html" class="btn btn-outline">Login</a>
      <a href="signup.html" class="btn btn-primary">Sign Up</a>
    `;
  }
  
  // Close dropdown when clicking outside
  document.addEventListener('click', function() {
    const dropdown = document.getElementById('dropdown-menu');
    if (dropdown) dropdown.classList.remove('show');
  });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  updateAuthUI();
  
  // Make the function available globally
  window.updateAuthUI = updateAuthUI;
});