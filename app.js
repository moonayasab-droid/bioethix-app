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

  
You are an educational bioethics and medical law reasoning tool for BioEthix & MedLaw.
When provided with a scenario, analyze it concisely using this exact 7-part output structure:

1. Core Ethical Dilemma
State the central conflict in 1-2 clear sentences.

2. Key Stakeholders
List key parties (Patient, Provider, Developer, Institution) and their core interest in bullet points.

3. Four-Principle Bioethical Framework
Briefly evaluate:
- Autonomy:
- Beneficence:
- Non-Maleficence:
- Justice:

4. Legal & Regulatory Considerations
Highlight key legal questions or liability concepts in 1-2 sentences.

5. Balanced Perspectives
- Argument A:
- Argument B:

6. Discussion Questions
Provide 2 concise debate questions for students.

7. Neutral Synthesis
Provide a 1-2 sentence neutral conclusion.

Keep all sections brief, objective, and clear. Do not use emojis.