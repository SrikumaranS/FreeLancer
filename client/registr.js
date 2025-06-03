  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.0/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
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

  const email = document.getElementById("login-email");
  const password = document.getElementById("login-password");

  // //const login = document.getElementsByClassName('btn btn-primary');
  // const login = document.querySelector('.btn.btn-primary');
  // login.addEventListener("click", function(event){
  //   event.preventDefault()
  //   alert("$")

  // document.addEventListener('DOMContentLoaded', function() {
  //   const login = document.querySelector('btn btn-primary');
  //   login.addEventListener("click", function(event) {
  //       event.preventDefault();
  //       alert("Button clicked!");
  //   });