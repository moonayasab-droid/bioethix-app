// Data model matching exact layout items
const casesData = [
{
id: 1,
title: "Autonomous Surgical Robotics in Dental Practice",
category: "robotics",
categoryLabel: "Robotics",
badgeIcon: "🤖",
description: "Evaluating liability and patient consent when robotic systems perform invasive procedures.",
link: "#"
},
{
id: 2,
title: "Pediatric Blood Transfusion Refusal",
category: "pediatrics",
categoryLabel: "Pediatrics",
badgeIcon: "👤",
description: "Evaluating parental proxy rights versus pediatric assent when lifesaving care is declined.",
link: "#"
},
{
id: 3,
title: "AI Diagnostics & Patient Data Sovereignty",
category: "data-privacy",
categoryLabel: "Data Privacy",
badgeIcon: "🔒",
description: "Analyzing privacy rights and consent requirements when training diagnostic ML models.",
link: "#"
}
];

// Voting state management
let votes = {
agree: 84,
disagree: 40
};

document.addEventListener("DOMContentLoaded", () => {
renderCases(casesData);
setupFilters();
setupSearch();
setupVoting();
setupAnalyzer();
});

// Render dynamic cards to grid
function renderCases(cases) {
const container = document.getElementById("cases-grid");
container.innerHTML = "";

if (cases.length === 0) {
container.innerHTML = `<p class="no-results">No cases found matching your search.</p>`;
return;
}

cases.forEach(item => {
const card = document.createElement("div");
card.className = "case-card";
card.innerHTML = `
<div class="card-header">
<span class="badge badge-${item.category}">
<span class="badge-icon">${item.badgeIcon}</span> ${item.categoryLabel}
</span>
</div>
<h3 class="card-title">${item.title}</h3>
<p class="card-description">${item.description}</p>
<a href="${item.link}" class="card-link">Read case →</a>
`;
container.appendChild(card);
});
}

// Category filter interaction
function setupFilters() {
const pills = document.querySelectorAll("#filter-pills .pill");

pills.forEach(pill => {
pill.addEventListener("click", () => {
pills.forEach(p => p.classList.remove("active"));
pill.classList.add("active");

const category = pill.getAttribute("data-category");
if (category === "all") {
renderCases(casesData);
} else {
const filtered = casesData.filter(c => c.category === category);
renderCases(filtered);
}
});
});
}

// Real-time search filter
function setupSearch() {
const searchInput = document.getElementById("case-search");
searchInput.addEventListener("input", (e) => {
const query = e.target.value.toLowerCase().trim();
const filtered = casesData.filter(c =>
c.title.toLowerCase().includes(query) ||
c.description.toLowerCase().includes(query)
);
renderCases(filtered);
});
}

// Voting interactive bar updater
function setupVoting() {
const agreeBtn = document.getElementById("vote-agree");
const disagreeBtn = document.getElementById("vote-disagree");

const updateUI = () => {
const total = votes.agree + votes.disagree;
const agreePercent = Math.round((votes.agree / total) * 100);
const disagreePercent = 100 - agreePercent;

document.getElementById("agree-percent").innerText = `${agreePercent}%`;
document.getElementById("disagree-percent").innerText = `${disagreePercent}%`;
document.getElementById("progress-fill").style.width = `${agreePercent}%`;
document.getElementById("total-votes").innerText = `Based on ${total} votes`;
};

agreeBtn.addEventListener("click", () => {
votes.agree += 1;
agreeBtn.disabled = true;
disagreeBtn.disabled = true;
updateUI();
});

disagreeBtn.addEventListener("click", () => {
votes.disagree += 1;
agreeBtn.disabled = true;
disagreeBtn.disabled = true;
updateUI();
});
}

// Custom Case Analyzer Submission logic
function setupAnalyzer() {
const form = document.getElementById("analyzer-form");
const input = document.getElementById("analyzer-input");
const results = document.getElementById("analyzer-results");

form.addEventListener("submit", (e) => {
e.preventDefault();
const query = input.value.trim();
if (!query) return;

results.style.display = "block";
results.innerHTML = `<p class="loading">🔍 Analyzing ethical frameworks and legal precedents...</p>`;

setTimeout(() => {
results.innerHTML = `
<div class="analysis-box">
<h4>Analysis Summary</h4>
<p><strong>Primary Conflict:</strong> ${query}</p>
<p><strong>Ethical Frameworks:</strong> Autonomy vs. Beneficence.</p>
<p><strong>Legal Implications:</strong> Requires evaluating informed consent standards and local regulatory guidelines.</p>
</div>
`;
}, 1200);
  });
 }


