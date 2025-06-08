// payment.js
function updateDisplay() {
  const freelancer = localStorage.getItem("freelancerBalance") || 0;
  const escrow = localStorage.getItem("escrowBalance") || 0;
  const employer = localStorage.getItem("employerBalance") || 5000;

  document.getElementById("freelancer-balance").textContent = freelancer;
  document.getElementById("escrow-balance").textContent = escrow;
  document.getElementById("employer-balance").textContent = employer;
}

function getNumeric(id) {
  return parseFloat(document.getElementById(id).value) || 0;
}

function saveBalances({ freelancer, escrow, employer }) {
  localStorage.setItem("freelancerBalance", freelancer);
  localStorage.setItem("escrowBalance", escrow);
  localStorage.setItem("employerBalance", employer);
  updateDisplay();
}

document.addEventListener("DOMContentLoaded", () => {
  updateDisplay();

  document.getElementById("fund-escrow-form").addEventListener("submit", (e) => {
    e.preventDefault();
    let amount = getNumeric("escrow-amount");
    let escrow = parseFloat(localStorage.getItem("escrowBalance") || 0);
    let employer = parseFloat(localStorage.getItem("employerBalance") || 5000);

    if (amount <= 0 || amount > employer) {
      alert("Invalid amount. Must be less than employer balance.");
      return;
    }

    employer -= amount;
    escrow += amount;
    saveBalances({ freelancer: localStorage.getItem("freelancerBalance") || 0, escrow, employer });
  });

  document.getElementById("release-payment-form").addEventListener("submit", (e) => {
    e.preventDefault();
    let escrow = parseFloat(localStorage.getItem("escrowBalance") || 0);
    let freelancer = parseFloat(localStorage.getItem("freelancerBalance") || 0);

    freelancer += escrow;
    escrow = 0;
    saveBalances({ freelancer, escrow, employer: localStorage.getItem("employerBalance") || 0 });
  });

  document.getElementById("withdraw-form").addEventListener("submit", (e) => {
    e.preventDefault();
    let amount = getNumeric("withdraw-amount");
    let freelancer = parseFloat(localStorage.getItem("freelancerBalance") || 0);

    if (amount <= 0 || amount > freelancer) {
      alert("Invalid withdraw amount.");
      return;
    }

    freelancer -= amount;
    saveBalances({ freelancer, escrow: localStorage.getItem("escrowBalance") || 0, employer: localStorage.getItem("employerBalance") || 0 });
  });
});
