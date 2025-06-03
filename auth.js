import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCc5qSxrVoQ1uYml9tnn5vaaUQw2FGEAqI",
    authDomain: "movie-ea329.firebaseapp.com",
    projectId: "movie-ea329",
    storageBucket: "movie-ea329.appspot.com",
    messagingSenderId: "465701610247",
    appId: "1:465701610247:web:b46faeedff34a1d4701ba2",
    measurementId: "G-4VXJ6L9J42",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Registration functionality
const registerButton = document.getElementById("submit");
if (registerButton) {
    registerButton.addEventListener("click", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm-password").value;

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                alert("Account created successfully!");
                window.location.href = "login.html";
            })
            .catch((error) => {
                alert("Registration failed: " + error.message);
            });
    });
}

// Login functionality
const loginButton = document.getElementById("login");
if (loginButton) {
    loginButton.addEventListener("click", function (event) {
        event.preventDefault();

        const email = document.getElementById("lemail").value;
        const password = document.getElementById("lpassword").value;

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                alert("Login successful!");
                window.location.href = "index.html";
            })
            .catch((error) => {
                alert("Login failed: " + error.message);
            });
    });
}