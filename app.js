// ========================================
// THEME SWITCHER
// ========================================
function initTheme() {
  const savedTheme = localStorage.getItem("theme") || "light";
  const themeToggle = document.getElementById("themeToggle");

  if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
    themeToggle.textContent = "☀️";
  } else {
    document.body.classList.remove("dark-theme");
    themeToggle.textContent = "🌙";
  }
}

function toggleTheme() {
  const themeToggle = document.getElementById("themeToggle");
  
  if (document.body.classList.contains("dark-theme")) {
    document.body.classList.remove("dark-theme");
    localStorage.setItem("theme", "light");
    themeToggle.textContent = "🌙";
  } else {
    document.body.classList.add("dark-theme");
    localStorage.setItem("theme", "dark");
    themeToggle.textContent = "☀️";
  }
}

// ========================================
// CASE STUDIES DATA
// ========================================
const caseStudies = [
  {
    id: "surgical-robotics",
    title: "Autonomous Surgical Robotics in Dental Practice",
    category: "robotics",
    summary: "Evaluating liability and patient consent when robotic systems perform invasive procedures.",
    background: "During a routine implant procedure, an autonomous robotic guidance unit encountered an unexpected anatomical variation.",
    dilemma: "Balancing technological efficiency with human accountability.",
    stakeholders: ["Patient", "Dental Surgeon", "Robotic Software Developer", "Regulatory Authorities"],
    sources: ["FDA Medical Device Guidance 2024", "Journal of Dental Ethics Vol. 12"]
  },
  {
    id: "pediatric-transfusion",
    title: "Pediatric Blood Transfusion Refusal",
    category: "pediatrics",
    summary: "Evaluating parental proxy rights versus pediatric assent.",
    background: "A 14-year-old patient requires a blood transfusion but parents refuse based on religious grounds.",
    dilemma: "Determining state intervention boundaries when parental beliefs conflict with life-saving care.",
    stakeholders: ["Patient", "Parents", "Surgical Team", "Hospital Legal Counsel"],
    sources: ["American Academy of Pediatrics Ethics 2023"]
  },
  {
    id: "data-sovereignty",
    title: "AI Diagnostics & Patient Data Sovereignty",
    category: "data-privacy",
    summary: "Analyzing HIPAA compliance and consent requirements when training diagnostic ML models.",
    background: "A hospital uses patient scans to train an AI model without explicit consent.",
    dilemma: "Balancing innovation with patient data ownership.",
    stakeholders: ["Patient", "Hospital IT", "AI Vendor", "Regulators"],
    sources: ["HIPAA Privacy Rule 2024", "Journal of Medical Informatics"]
  },
  {
    id: "scarce-robotics",
    title: "Allocation of Scarce Robotic Surgical Facilities",
    category: "robotics",
    summary: "Balancing utilitarian outcomes against egalitarian access.",
    background: "A hospital has one robotic surgical unit and must prioritize cases.",
    dilemma: "Should priority be based on urgency, fairness, or projected outcomes?",
    stakeholders: ["Patients", "Hospital Admin", "Surgeons"],
    sources: ["Ethics of Resource Allocation 2023"]
  }
];

// ========================================
// OPEN MODAL
// ========================================
function openCaseModal(id) {
  const item = caseStudies.find(c => c.id === id);
  if (!item) return;

  const content = document.getElementById("modal-body");
  content.innerHTML = `
    <h3>${item.title}</h3>
    <p><strong>Category:</strong> ${item.category}</p>
    <p>${item.summary}</p>
    <hr>
    <h4>Background</h4>
    <p>${item.background}</p>
    <h4>Ethical Dilemma</h4>
    <p>${item.dilemma}</p>
    <h4>Key Stakeholders</h4>
    <ul>${item.stakeholders.map(s => `<li>${s}</li>`).join("")}</ul>
    <h4>Sources</h4>
    <ul>${item.sources.map(s => `<li>${s}</li>`).join("")}</ul>
  `;
  document.getElementById("case-modal").style.display = "flex";
}

// ========================================
// CUSTOM CASE ANALYZER
// ========================================
function analyzeCustomCase() {
  const input = document.getElementById("custom-case-input").value.trim();
  const output = document.getElementById("feedback-output");

  if (!input) {
    output.innerHTML = "<p>Please enter a case summary.</p>";
    return;
  }

  output.innerHTML = `
    <div class="analysis-dashboard">
      <h3>Preliminary Ethical Analysis</h3>
      <p><strong>Your Case:</strong> ${input}</p>
      <div class="dashboard-section">
        <h4>Ethical Principles Involved:</h4>
        <ul>
          <li>Autonomy - Individual choice and self-determination</li>
          <li>Beneficence - Acting in the best interest of patients</li>
          <li>Non-maleficence - Avoiding harm</li>
          <li>Justice - Fair distribution of resources and treatment</li>
        </ul>
      </div>
      <p style="margin-top: 1rem; font-size: 0.9rem;"><em>Note: This is a preliminary analysis for educational purposes. Always consult qualified professionals for real cases.</em></p>
    </div>
  `;
}

function clearCustomCase() {
  document.getElementById("custom-case-input").value = "";
  document.getElementById("feedback-output").innerHTML = "";
}

// ========================================
// SEARCH & FILTERS
// ========================================
function filterCases() {
  const query = document.getElementById("search-input").value.toLowerCase();
  const cards = document.querySelectorAll(".case-card");
  let visibleCount = 0;

  cards.forEach(card => {
    const title = card.dataset.title.toLowerCase();
    if (title.includes(query)) {
      card.style.display = "block";
      visibleCount++;
    } else {
      card.style.display = "none";
    }
  });

  updateCaseCount(visibleCount);
}

function clearSearchInput() {
  document.getElementById("search-input").value = "";
  filterCases();
}

function filterCategory(category, btn) {
  const cards = document.querySelectorAll(".case-card");
  const buttons = document.querySelectorAll(".filter-btn");
  let visibleCount = 0;

  buttons.forEach(b => b.classList.remove("active"));
  btn.classList.add("active");

  cards.forEach(card => {
    if (category === "all") {
      card.style.display = "block";
      visibleCount++;
    } else {
      if (card.dataset.category === category) {
        card.style.display = "block";
        visibleCount++;
      } else {
        card.style.display = "none";
      }
    }
  });

  updateCaseCount(visibleCount);
}

function resetAllFilters() {
  document.getElementById("search-input").value = "";
  const allBtn = document.querySelector(".filter-btn");
  filterCategory("all", allBtn);
}

function updateCaseCount(count) {
  const countDisplay = document.getElementById("case-count");
  if (countDisplay) {
    countDisplay.textContent = `Showing ${count} case${count !== 1 ? "s" : ""}`;
  }
}

// ========================================
// COMMUNITY VOTE SYSTEM
// ========================================
let votes = { up: 0, down: 0 };

function vote(type) {
  const result = document.getElementById("vote-result");

  if (type === "up") votes.up++;
  if (type === "down") votes.down++;

  const total = votes.up + votes.down;

  if (total === 0) {
    result.innerHTML = "<p>No votes yet.</p>";
    return;
  }

  const upPercent = Math.round((votes.up / total) * 100);
  const downPercent = Math.round((votes.down / total) * 100);

  result.innerHTML = `
    <p><strong>Community Response:</strong></p>
    <p>👍 ${upPercent}% agree &nbsp; | &nbsp; 👎 ${downPercent}% disagree</p>
    <p style="font-size: 0.9rem; margin-top: 0.5rem;">Based on ${total} community vote${total !== 1 ? "s" : ""}.</p>
  `;
}

// ========================================
// FEEDBACK SYSTEM
// ========================================
function submitFeedback() {
  const text = document.getElementById("feedback-text").value.trim();
  const msg = document.getElementById("feedback-message");

  if (!text) {
    msg.innerHTML = "<p style='color: #dc2626;'>Please write feedback before submitting.</p>";
    return;
  }

  msg.innerHTML = "<p style='color: #059669; font-weight: 600;'>✓ Thank you for your feedback! Your response has been recorded.</p>";
  document.getElementById("feedback-text").value = "";

  // Clear message after 3 seconds
  setTimeout(() => {
    msg.innerHTML = "";
  }, 3000);
}

// ========================================
// EVENT LISTENERS & INITIALIZATION
// ========================================
document.addEventListener("DOMContentLoaded", () => {
  // Initialize theme from localStorage
  initTheme();

  // Attach theme toggle listener
  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }

  // Close modal when clicking outside
  window.addEventListener("click", (event) => {
    const modal = document.getElementById("case-modal");
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  console.log("BioEthix & MedLaw app loaded successfully");
});
