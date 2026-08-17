// -----------------------------
// CASE STUDIES DATA
// -----------------------------
const caseStudies = [
  {
    id: "surgical-robotics",
    title: "Autonomous Surgical Robotics in Dental Practice",
    category: "Robotics & AI",
    summary: "Evaluating liability and patient consent when robotic systems perform invasive procedures without direct real-time human supervision.",
    background: "During a routine implant procedure, an autonomous robotic guidance unit encountered an unexpected anatomical variation. The operator did not override the system, leading to temporary nerve involvement.",
    dilemma: "Balancing technological efficiency and precision of autonomous systems against the imperative for clear human accountability and informed consent.",
    stakeholders: ["Patient", "Dental Surgeon", "Robotic Software Developer", "Regulatory Authorities"],
    sources: ["FDA Medical Device Guidance 2024", "Journal of Dental Ethics Vol. 12"]
  },
  {
    id: "pediatric-transfusion",
    title: "Pediatric Blood Transfusion Refusal",
    category: "Pediatrics",
    summary: "Evaluating parental proxy rights versus pediatric assent when managing life-threatening emergencies.",
    background: "A 14-year-old patient requires a blood transfusion during surgery, but parents refuse based on religious grounds.",
    dilemma: "Determining state intervention boundaries when parental beliefs conflict with life-saving care.",
    stakeholders: ["Patient", "Parents", "Surgical Team", "Hospital Legal Counsel"],
    sources: ["American Academy of Pediatrics Ethics 2023"]
  }
];

// -----------------------------
// OPEN MODAL
// -----------------------------
function openCaseModal(id) {
  openModal(id);
}

function openModal(id) {
  const item = caseStudies.find(c => c.id === id);
  if (!item) return;

  const content = document.getElementById("modal-body");
  if (content) {
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
      <h4>Academic Sources & Further Reading</h4>
      <ul>${item.sources.map(s => `<li>${s}</li>`).join("")}</ul>
    `;
    document.getElementById("case-modal").style.display = "flex";
  }
}

// -----------------------------
// SEARCH CASES
// -----------------------------
function searchCases() {
  console.log("Search executed");
  const query = document.getElementById('search-input')?.value.toLowerCase();
  // You can add filtering logic here later
}

// -----------------------------
// RESET FILTERS
// -----------------------------
function resetFilters() {
  console.log("Filters reset");
  const searchInput = document.getElementById('search-input');
  if (searchInput) searchInput.value = '';
}

// -----------------------------
// ANALYZE CASE
// -----------------------------
function analyzeCase() {
  console.log("Analyzing case...");
  // Add your analysis logic later
}

// -----------------------------
// EVENT LISTENERS
// -----------------------------
document.addEventListener('DOMContentLoaded', () => {

  // Analyze Case Button
  const analyzeBtn = document.getElementById('analyze-btn');
  if (analyzeBtn) {
    analyzeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      analyzeCase();
    });
  }

  // Search Cases Button
  const searchBtn = document.getElementById('search-btn');
  if (searchBtn) {
    searchBtn.addEventListener('click', (e) => {
      e.preventDefault();
      searchCases();
    });
  }

  // Reset Filters Button
  const resetFiltersBtn = document.getElementById('reset-filters');
  if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener('click', (e) => {
      e.preventDefault();
      resetFilters();
    });
  }
});

  
// -----------------------------
// COMMUNITY VOTE SYSTEM
// -----------------------------
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
    <p>👍 ${upPercent}% agree &nbsp; | &nbsp; 👎 ${downPercent}% disagree</p>
    <p class="small-note">Based on ${total} community votes.</p>
  `;
}

// -----------------------------
// FEEDBACK SYSTEM
// -----------------------------
function submitFeedback() {
  const text = document.getElementById("feedback-text").value.trim();
  const msg = document.getElementById("feedback-message");

  if (!text) {
    msg.innerHTML = "<p>Please write feedback before submitting.</p>";
    return;
  }

  msg.innerHTML = "<p>Thank you for your feedback! Your response has been recorded.</p>";
  document.getElementById("feedback-text").value = "";
}

