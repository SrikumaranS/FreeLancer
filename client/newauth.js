// Import Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAtS4zK8_K6JB2ymnhXsjRGTDBjpG2zrFI",
  authDomain: "freelancer-55011.firebaseapp.com",
  projectId: "freelancer-55011",
  storageBucket: "freelancer-55011.firebasestorage.app",
  messagingSenderId: "114603248055",
  appId: "1:114603248055:web:ee97ffab39941e28690032"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Helper: Show error message for a field by ID
function showError(id, show) {
  const el = document.getElementById(id);
  if (el) el.style.display = show ? "block" : "none";
}

// -------- SIGN UP --------
const signupForm = document.getElementById("signup-form");
if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Get values
    const email = document.getElementById("signup-email").value.trim();
    const password = document.getElementById("signup-password").value;
    const confirmPassword = document.getElementById("signup-confirm-password").value;

    // Validate inputs
    showError("signup-email-error", !email || !email.includes("@"));
    showError("signup-password-error", password.length < 8);
    showError("signup-confirm-password-error", password !== confirmPassword);

    if (!email || !email.includes("@") || password.length < 8 || password !== confirmPassword) {
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      console.log("User created:", user);
      alert(`Account created successfully for ${user.email}`);
      signupForm.reset();
      window.location.href = "login.html";

    } catch (error) {
      console.error("Signup error:", error);
      alert(`Error: ${error.message}`);
    }
  });
}

// -------- LOGIN --------
const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;

    // Validate inputs
    showError("login-email-error", !email || !email.includes("@"));
    showError("login-password-error", password.length < 8);

    if (!email || !email.includes("@") || password.length < 8) {
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      console.log("User logged in:", user);
      alert(`Welcome back, ${user.email}!`);
      window.location.href = "index.html";

    } catch (error) {
      console.error("Login error:", error);
      alert(`Login failed: ${error.message}`);
    }
  });
}