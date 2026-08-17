// Function to submit feedback
function submitFeedback(event) {
  event.preventDefault();
  document.getElementById("feedback-status").style.display = "block";
  document.getElementById("feedback-form").reset();
}

const additionalCaseStudies = [
  {
    id: "surgical-robotics",
    title: "Autonomous Surgical Robotics in Dental Practice",
    category: "Robotics & AI",
    summary: "Evaluating liability and patient consent when robotic systems perform invasive procedures.",
    background: "During a routine implant procedure, an autonomous robotic guidance system experienced a micro-software lag...",
    dilemma: "Balancing the technological efficiency and precision of autonomous devices with human oversight...",
    stakeholders: ["Patient", "Dental Surgeon", "Robotic Software Developer"],
    principles: {
      autonomy: "Did the patient consent specifically to autonomous execution?",
      beneficence: "Robotic accuracy reduces human error margins.",
      nonMaleficence: "Risk of software glitches causing physical harm.",
      justice: "High-cost technology may limit equal access."
    },
    questions: [
      "Should clinicians be allowed to override real-time robotic adjustments?",
      "Who bears primary liability if an unrecorded software glitch causes injury?"
    ],
    sources: ["FDA Medical Device Guidance 2024", "Journal of Dental Ethics Vol. 12"]
  }
];

// Open modal function
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

// Push additional cases into main array
if (typeof caseStudies !== 'undefined') {
  caseStudies.push(...additionalCaseStudies);
}
// Function for Searching Cases
function searchCases() {
  console.log("Search executed");
  const query = document.getElementById('search-input')?.value.toLowerCase();
}

// Function for Resetting Filters
function resetFilters() {
  console.log("Filters reset");
  const searchInput = document.getElementById('search-input');
  if (searchInput) searchInput.value = '';
}

// Function for Analyzing Cases
function analyzeCase() {
  console.log("Analyzing case...");
}
// Initialize Event Listeners
document.addEventListener('DOMContentLoaded', () => {

  // 1. Analyze Case Button
  const analyzeBtn = document.getElementById('analyze-btn');
  if (analyzeBtn) {
    analyzeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (typeof analyzeCase === 'function') analyzeCase();
    });
  }

  // 2. Search Cases Button
  const searchBtn = document.getElementById('search-btn');
  if (searchBtn) {
    searchBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (typeof searchCases === 'function') searchCases();
    });
  }

  // 3. Reset Filters Button
  const resetFiltersBtn = document.getElementById('reset-filters');
  if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (typeof resetFilters === 'function') resetFilters();
    });
  }
});
