// Signup
const signupForm = document.getElementById('signup-form');
if (signupForm) {
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm-password').value;

    // Client-side validation
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      const data = await res.json();
      
      if (data.success) {
        // Redirect to login page after successful signup
        window.location.href = 'login.html';
      } else {
        alert('Signup Failed: ' + data.message);
      }
    } catch (error) {
      alert('An error occurred during signup');
      console.error('Signup Error:', error);
    }
  });
}

// Login
const loginForm = document.getElementById('login-form');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
      const res = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      
      if (data.success) {
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(data.user));
        // Call updateAuthUI if it exists (for immediate UI update)
        if (typeof window.updateAuthUI === 'function') {
          window.updateAuthUI();
        }
        // Redirect to home page
        window.location.href = 'index.html';
      } else {
        alert('Login Failed: ' + data.message);
      }
    } catch (error) {
      alert('An error occurred during login');
      console.error('Login Error:', error);
    }
  });
}

// Initialize auth UI if on a page with auth buttons
if (document.querySelector('.auth-buttons')) {
  if (typeof window.updateAuthUI === 'function') {
    window.updateAuthUI();
  }
}