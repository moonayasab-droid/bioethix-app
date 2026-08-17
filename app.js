// -----------------------------
// CASE STUDIES DATA
// -----------------------------
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

// -----------------------------
// OPEN MODAL
// -----------------------------
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

// -----------------------------
// CUSTOM CASE ANALYZER
// -----------------------------
function analyzeCustomCase() {
  const input = document.getElementById("custom-case-input").value.trim();
  const output = document.getElementById("feedback-output");

  if (!input) {
    output.innerHTML = "<p>Please enter a case summary.</p>";
    return;
  }

  output.innerHTML = `
    <h3>Preliminary Ethical Analysis</h3>
    <p><strong>Your Case:</strong> ${input}</p>
    <p>This case likely involves autonomy, beneficence, non-maleficence, and justice.</p>
  `;
}

function clearCustomCase() {
  document.getElementById("custom-case-input").value = "";
  document.getElementById("feedback-output").innerHTML = "";
}

// -----------------------------
// SEARCH & FILTERS
// -----------------------------
function filterCases() {
  const query = document.getElementById("search-input").value.toLowerCase();
  const cards = document.querySelectorAll(".case-card");

  cards.forEach(card => {
    const title = card.dataset.title.toLowerCase();
    card.style.display = title.includes(query) ? "block" : "none";
  });
}

function clearSearchInput() {
  document.getElementById("search-input").value = "";
  filterCases();
}

function filterCategory(category, btn) {
  const cards = document.querySelectorAll(".case-card");
  const buttons = document.querySelectorAll(".filter-btn");

  buttons.forEach(b => b.classList.remove("active"));
  btn.classList.add("active");

  cards.forEach(card => {
    if (category === "all") {
      card.style.display = "block";
    } else {
      card.style.display = card.dataset.category === category ? "block" : "none";
    }
  });
}

function resetAllFilters() {
  document.getElementById("search-input").value = "";
  filterCategory("all", document.querySelector(".filter-btn"));
}

// -----------------------------
// EVENT LISTENERS
// -----------------------------
document.addEventListener("DOMContentLoaded", () => {
  console.log("App loaded successfully");
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