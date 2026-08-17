document.addEventListener('DOMContentLoaded', () => {
  const analyzeBtn = document.getElementById('analyze-btn');
  const scenarioInput = document.getElementById('scenario-details');
  const feedbackOutput = document.getElementById('feedback-output');
  const searchInput = document.getElementById('search-input');
  const searchBtn = document.getElementById('search-btn');
  const clearCaseBtn = document.getElementById('clear-case-btn');
  const clearSearchBtn = document.getElementById('clear-search-btn');
  const resetFiltersBtn = document.getElementById('reset-filters-btn');
  const caseCount = document.getElementById('case-count');
  const caseGrid = document.getElementById('case-grid');
  const caseCards = Array.from(document.querySelectorAll('.case-card'));
  const filterButtons = Array.from(document.querySelectorAll('.filter-btn'));
  const caseModal = document.getElementById('case-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  const themeToggle = document.getElementById('theme-toggle');
  const contrastToggle = document.getElementById('contrast-toggle');

  let activeCategory = 'all';
  let highContrast = false;
  let currentTheme = 'light';

  function applyTheme(theme) {
    currentTheme = theme;
    document.body.dataset.theme = theme;
    document.documentElement.style.setProperty('--bg-color', theme === 'dark' ? '#0f172a' : '#f7fafc');
    document.documentElement.style.setProperty('--card-bg', theme === 'dark' ? '#111827' : '#ffffff');
    document.documentElement.style.setProperty('--text', theme === 'dark' ? '#f8fafc' : '#2d3748');
    document.documentElement.style.setProperty('--border', theme === 'dark' ? '#334155' : '#e2e8f0');
    document.documentElement.style.setProperty('--primary', theme === 'dark' ? '#60a5fa' : '#2b6cb0');
    document.documentElement.style.setProperty('--primary-hover', theme === 'dark' ? '#93c5fd' : '#2c5282');
  }

  function applyContrast(enabled) {
    highContrast = enabled;
    document.body.classList.toggle('high-contrast', enabled);
    document.documentElement.style.setProperty('--bg-color', enabled ? '#000000' : (currentTheme === 'dark' ? '#0f172a' : '#f7fafc'));
    document.documentElement.style.setProperty('--card-bg', enabled ? '#111111' : (currentTheme === 'dark' ? '#111827' : '#ffffff'));
    document.documentElement.style.setProperty('--text', enabled ? '#ffffff' : (currentTheme === 'dark' ? '#f8fafc' : '#2d3748'));
    document.documentElement.style.setProperty('--border', enabled ? '#ffffff' : (currentTheme === 'dark' ? '#334155' : '#e2e8f0'));
    document.documentElement.style.setProperty('--primary', enabled ? '#1e3a8a' : (currentTheme === 'dark' ? '#60a5fa' : '#2b6cb0'));
    document.documentElement.style.setProperty('--primary-hover', enabled ? '#274c8f' : (currentTheme === 'dark' ? '#93c5fd' : '#2c5282'));
  }

  function setThemeFromTime() {
    const hour = new Date().getHours();
    const isNight = hour < 6 || hour >= 18;
    applyTheme(isNight ? 'dark' : 'light');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
      if (highContrast) {
        applyContrast(true);
      }
    });
  }

  if (contrastToggle) {
    contrastToggle.addEventListener('click', () => {
      applyContrast(!highContrast);
    });
  }

  setThemeFromTime();
  // Inside DOMContentLoaded:
    if (analyzeBtn) {
      analyzeBtn.addEventListener('click', async () => {
        const scenarioText = scenarioInput.value.trim();
        
        if (!scenarioText) {
          alert('Please enter a scenario to analyze.')
          return; // 
        }

      document.addEventListener('DOMContentLoaded', () => {
  // Grab DOM elements
  const analyzeBtn = document.getElementById('analyzeBtn'); // Make sure ID matches your HTML
  const scenarioInput = document.getElementById('scenarioInput'); // Make sure ID matches your HTML
  const feedbackOutput = document.getElementById('feedbackOutput'); // Make sure ID matches your HTML

  setThemeFromTime();

  // Validate that required UI elements exist on the page
  if (!analyzeBtn || !scenarioInput || !feedbackOutput) {
    console.error('Required analysis elements are missing.');
    return;
  }

  // Handle button click for analysis
  analyzeBtn.addEventListener('click', async () => {
    const scenarioText = scenarioInput.value.trim();

    // Check if user entered text before proceeding
    if (!scenarioText) {
      alert('Please enter a scenario to analyze.');
      return;
    }

    // 1. Define your system prompt
    const systemPrompt = `You are an expert Bioethics & Medical Law AI Assistant.
Analyze the provided scenario systematically using the following 10-part framework.
Format each section with clear Markdown headers (e.g., ### Section Name) and bullet points:

1. ### Primary Ethical Dilemma
State the core tension clearly in 1-2 sentences.

2. ### Key Stakeholders
List all affected parties (e.g., patient, family, clinicians, institution, public).

3. ### Four Principles of Biomedical Ethics
- **Autonomy:**
- **Beneficence:**
- **Non-Maleficence:**
- **Justice:**

4. ### Relevant Legal Questions & Frameworks
Key statutory, regulatory, or liability considerations.

5. ### Arguments FOR Action
Key ethical/legal reasons supporting the primary proposed course.

6. ### Arguments AGAINST Action
Key ethical/legal reasons opposing the primary proposed course.

7. ### Potential Compromises / Alternative Options
Middle-ground solutions, policy adjustments, or ethics committee recommendations.

8. ### Recommended Action / Next Steps
A clear, justified resolution path.

9. ### Key Policy or Precedent References
Relevant landmark cases, laws, or professional guidelines (e.g., HIPAA, Common Rule).

10. ### Educational Disclaimer
Include a standard reminder that this analysis is for educational purposes only.`;

    // 2. Display loading state in the output UI
    feedbackOutput.textContent = 'Analyzing scenario...';

    try {
      // 3. Make the fetch request to your API or backend server
      const response = await fetch('YOUR_API_ENDPOINT_HERE', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt: systemPrompt,
          userScenario: scenarioText
        })
      });

      const data = await response.json();

      // 4. Render the result into feedbackOutput
      feedbackOutput.innerHTML = data.result;

    } catch (error) {
      console.error('Error:', error);
      feedbackOutput.textContent = 'Failed to analyze scenario. Please try again.';
    }
  });
});

// Helper functions outside DOMContentLoaded
function showNoResultsMessage(term) {
  const existingStatus = document.getElementById('search-status');
  if (existingStatus) {
    existingStatus.remove();
  }
}
         

        
          

  function showNoResultsMessage(term) {
    const existingStatus = document.getElementById('search-status');
    if (existingStatus) {
      existingStatus.remove();
    }

    if (!caseGrid) {
      return;
    }

    const message = document.createElement('p');
    message.id = 'search-status';
    message.className = 'no-results';
    message.textContent = term
      ? `No case studies matched "${term}" in the selected category.`
      : 'No case studies matched the selected category.';
    caseGrid.appendChild(message);
  }

  function updateCaseCount(visibleCount) {
    if (caseCount) {
      caseCount.textContent = `Showing ${visibleCount} case${visibleCount === 1 ? '' : 's'}`;
    }
  }

  function filterCases(query = '') {
    const term = query.toLowerCase().trim();
    let visibleCount = 0;

    caseCards.forEach((card) => {
      const text = card.textContent.toLowerCase();
      const matchesCategory = activeCategory === 'all' || card.dataset.category === activeCategory;
      const matchesQuery = !term || text.includes(term);
      const matches = matchesCategory && matchesQuery;
      card.style.display = matches ? 'block' : 'none';

      if (matches) {
        visibleCount += 1;
      }
    });

    const existingStatus = document.getElementById('search-status');
    if (existingStatus) {
      existingStatus.remove();
    }

    if (visibleCount === 0 && caseGrid) {
      showNoResultsMessage(term);
    }

    updateCaseCount(visibleCount);
  }

  function openModal(card) {
    if (!caseModal || !modalTitle || !modalBody) {
      return;
    }

    modalTitle.textContent = card.dataset.title || 'Case Details';
    modalBody.innerHTML = `
      <p>${card.dataset.content || 'No additional details available.'}</p>
      <div class="modal-section">
        <h4>Legal Background</h4>
        <p>Focus on duty of care, consent, liability allocation, and applicable standards of practice.</p>
      </div>
      <div class="modal-section">
        <h4>Relevant Precedents</h4>
        <p>Comparable cases often emphasize informed consent, emergency treatment exceptions, and expert testimony.</p>
      </div>
      <div class="modal-section">
        <h4>Ethical Analysis</h4>
        <p>Consider autonomy, beneficence, justice, transparency, and the responsibility of clinicians when using emerging technologies.</p>
      </div>
    `;

    caseModal.classList.remove('hidden');
    caseModal.setAttribute('aria-hidden', 'false');
  }

  function closeModal() {
    if (!caseModal) {
      return;
    }

    caseModal.classList.add('hidden');
    caseModal.setAttribute('aria-hidden', 'true');
  }

  if (searchInput && searchBtn && caseGrid) {
    searchBtn.addEventListener('click', () => {
      filterCases(searchInput.value);
    });

    searchInput.addEventListener('input', () => {
      filterCases(searchInput.value);
    });

    searchInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        filterCases(searchInput.value);
      }
    });

    filterButtons.forEach((button) => {
      button.addEventListener('click', () => {
        activeCategory = button.dataset.category || 'all';

        filterButtons.forEach((btn) => {
          btn.classList.toggle('active', btn === button);
        });

        filterCases(searchInput.value);
      });
    });

    if (clearSearchBtn) {
      clearSearchBtn.addEventListener('click', () => {
        if (searchInput) {
          searchInput.value = '';
        }
        filterCases('');
      });
    }

    if (resetFiltersBtn) {
      resetFiltersBtn.addEventListener('click', () => {
        activeCategory = 'all';
        if (searchInput) {
          searchInput.value = '';
        }
        filterButtons.forEach((btn) => {
          btn.classList.toggle('active', btn.dataset.category === 'all');
        });
        filterCases('');
      });
    }

    filterCases('');
  }

  caseCards.forEach((card) => {
    card.addEventListener('click', () => openModal(card));
  });

  if (caseModal) {
    caseModal.addEventListener('click', (event) => {
      if (event.target === caseModal) {
        closeModal();
      }
    });
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeModal();
    }
  });

  if (clearCaseBtn) {
    clearCaseBtn.addEventListener('click', () => {
      scenarioInput.value = '';
      feedbackOutput.innerHTML = '';
    });
  }

  analyzeBtn.addEventListener('click', () => {
    const caseText = scenarioInput.value.trim();

    if (!caseText) {
      feedbackOutput.innerHTML = `
        <div class="analysis-error">
          <p>Please enter a case summary first before analyzing.</p>
        </div>
      `;
      return;
    }

    if (caseText.length < 15) {
      feedbackOutput.innerHTML = `
        <div class="analysis-error">
          <p>Please provide a bit more detail before analyzing. Share at least 15 characters.</p>
        </div>
      `;
      return;
    }

    feedbackOutput.innerHTML = `
      <div class="analysis-loading">
        <div class="spinner"></div>
        <p>Analyzing ethical frameworks...</p>
      </div>
    `;

    setTimeout(() => {
      const dilemma = caseText.length > 80
        ? 'Balancing patient autonomy, beneficence, and duty of care in a high-stakes clinical decision.'
        : 'Balancing patient autonomy with professional responsibility and institutional obligations.';

      const stakeholders = ['Patient', 'Clinician', 'Hospital/Institution', 'Software Vendor'];
      const framework = 'Use a combined approach of autonomy-based informed consent principles, beneficence/non-maleficence, and applicable medical law standards.';

      feedbackOutput.innerHTML = `
        <div class="analysis-dashboard">
          <h3>Structured Ethical Breakdown</h3>
          <div class="dashboard-section">
            <h4>Primary Ethical Dilemma</h4>
            <p>${dilemma}</p>
          </div>
          <div class="dashboard-section">
            <h4>Key Stakeholders</h4>
            <ul>
              ${stakeholders.map((stakeholder) => `<li>${stakeholder}</li>`).join('')}
            </ul>
          </div>
          <div class="dashboard-section">
            <h4>Recommended Legal/Ethical Framework</h4>
            <p>${framework}</p>
          </div>
        </div>
      `;
    }, 1500);
  });
});

// Academic Case Studies Data
const caseStudies = [
  {
    id: "surgical-robotics",
    title: "Autonomous Surgical Robotics in Dental Practice",
    category: "Robotics",
    summary: "Evaluating liability and patient consent when robotic systems perform invasive procedures autonomously.",
    dilemma: "Who bears legal and moral responsibility when an autonomous surgical robot causes unexpected tissue damage during a procedure?",
    stakeholders: ["Patient", "Dental Surgeon", "Robotic Software Developer", "Medical Device Regulator"],
    principles: {
      autonomy: "Did the patient give informed consent specifically for fully autonomous operation versus AI-assisted surgery?",
      beneficence: "The robot offers higher mechanical precision and reduced operation times.",
      nonMaleficence: "Risk of hardware malfunction, software bugs, or unexpected tissue injury.",
      justice: "High technological costs may limit access to high-income clinics, creating healthcare inequality."
    },
    legal: "Medical malpractice law varies by jurisdiction. Key questions center on strict product liability for manufacturers versus clinical negligence for surgeons.",
    sources: [
      "WHO Guidance on Ethics & Governance of Artificial Intelligence for Health",
      "AMA Code of Medical Ethics: Autonomous Technologies"
    ]
  },
  {
    legal: "Medical malpractice law varies by jurisdiction. Key questions center on strict product liability for manufacturers versus clinical negligence for surgeons.",
    sources: [
      "WHO Guidance on Ethics & Governance of Artificial Intelligence for Health",
      "AMA Code of Medical Ethics: Autonomous Technologies"
    ]
  },
  {
    id: "pediatric-transfusion",
    title: "Pediatric Blood Transfusion Refusal",
    category: "Pediatrics",
    summary: "Evaluating parental proxy rights versus pediatric assent when lifesaving blood products are declined on religious grounds.",
    dilemma: "Should state intervention override parental religious choices to administer a lifesaving blood transfusion to a minor?",
    stakeholders: ["Pediatric Patient", "Parents / Guardians", "Attending Physicians", "Hospital Ethics Committee"],
    principles: {
      autonomy: "Parental proxy decision-making versus the emerging autonomy and assent of the child.",
      beneficence: "Administering transfusion prevents immediate mortal risk.",
      nonMaleficence: "Failure to treat leads to preventable death; forced treatment may cause familial trauma.",
      justice: "Balancing state interest in protecting vulnerable minors with constitutional freedoms."
    },
    legal: "Under established legal doctrine, parental authority generally does not extend to withholding lifesaving treatment from a child in immediate danger.",
    sources: [
      "American Academy of Pediatrics (AAP) Guidelines",
      "UN Convention on the Rights of the Child (Article 24)"
    ]
  }
];

// Open Detailed Academic Modal
function openCaseModal(caseId) {
  const item = caseStudies.find(c => c.id === caseId);
  if (!item) return;

  document.getElementById("modal-title").innerText = item.title;
  document.getElementById("modal-category").innerText = item.category;

  const body = document.getElementById("modal-body");
  body.innerHTML = `
    <hr style="margin: 1rem 0;">
    <p><strong>Core Dilemma:</strong> ${item.dilemma}</p>
    <p><strong>Stakeholders:</strong> ${item.stakeholders.join(", ")}</p>
    
    <h3 style="margin-top:1rem;">Ethical Principles (4 Pillars)</h3>
    <ul>
      <li><strong>Autonomy:</strong> ${item.principles.autonomy}</li>
      <li><strong>Beneficence:</strong> ${item.principles.beneficence}</li>
      <li><strong>Non-Maleficence:</strong> ${item.principles.nonMaleficence}</li>
      <li><strong>Justice:</strong> ${item.principles.justice}</li>
    </ul>

    <h3 style="margin-top:1rem;">Legal Considerations</h3>
    <p>${item.legal}</p>

    <h3 style="margin-top:1rem;">Academic Sources</h3>
    <ul>
      ${item.sources.map(s => `<li>${s}</li>`).join("")}
    </ul>
  `;

  document.getElementById("case-modal").style.display = "flex";
}

// Close Modal Controls
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("case-modal");
  const closeBtn = document.querySelector(".close-modal");

  if (closeBtn) {
    closeBtn.onclick = () => modal.style.display = "none";
  }
  window.onclick = (e) => {
    if (e.target === modal) modal.style.display = "none";
  };
});

// Live Analyzer Submission Logic
async function analyzeCustomCase() {
  const input = document.getElementById("custom-case-input").value;
  const output = document.getElementById("analysis-output");

  if (!input.trim()) {
    output.innerText = "Please enter a case scenario to analyze.";
    return;
  }

  output.innerText = "Generating 10-part ethical analysis...";

  try {
    const API_URL = "YOUR_BACKEND_ENDPOINT_HERE"; 
    
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: input })
    });
    
    const data = await response.json();
    output.innerText = data.result || "Analysis complete.";
  } catch (err) {
    output.innerText = "API endpoint not connected yet. System prompt is structured and ready for backend integration.";
  }
}

// Ethics Poll Interactive Voting Engine
let votes = { clinician: 61, developer: 24, shared: 15 };

function castVote(option) {
  votes[option] += 1;
  const total = votes.clinician + votes.developer + votes.shared;

  const clinicianPct = Math.round((votes.clinician / total) * 100);
  const developerPct = Math.round((votes.developer / total) * 100);
  const sharedPct = Math.round((votes.shared / total) * 100);

  document.getElementById("count-clinician").innerText = clinicianPct + "%";
  document.getElementById("count-developer").innerText = developerPct + "%";
  document.getElementById("count-shared").innerText = sharedPct + "%";

  document.getElementById("bar-clinician").style.width = clinicianPct + "%";
  document.getElementById("bar-developer").style.width = developerPct + "%";
  document.getElementById("bar-shared").style.width = sharedPct + "%";

  document.getElementById("poll-options").style.display = "none";
  document.getElementById("poll-results").style.display = "block";
}

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
    summary: "Evaluating liability and patient consent when robotic systems perform invasive procedures autonomously.",
    background: "During a routine implant procedure, an autonomous robotic guidance unit experienced a sub-millimeter calibration error, resulting in minor soft tissue trauma.",
    dilemma: "Balancing the technological efficiency and precision of autonomous systems against physician oversight and duty of care.",
    stakeholders: ["Patient", "Dental Surgeon", "Robotic Software Developer", "Regulatory Authorities"],
    principles: {
      autonomy: "Did the patient consent specifically to autonomous execution versus human-guided AI assistance?",
      beneficence: "Robotic systems offer superior mechanical accuracy and lower procedural fatigue.",
      nonMaleficence: "Risk of unexpected mechanical failure, software bugs, or latent calibration drift.",
      justice: "High technological costs could restrict access exclusively to affluent urban clinics."
    },
    legal: "Key questions focus on whether injuries fall under medical malpractice (clinician negligence) or strict product liability (manufacturer error).",
    arguments: {
      pro: "The clinician selected and supervised the technology, maintaining ultimate duty of care to intervene.",
      con: "The software operating as a 'black box' places liability on the developer for unanticipated algorithm behavior."
    },
    questions: [
      "At what threshold of software autonomy does a clinician cease to be legally responsible for execution error?",
      "How should informed consent forms explicitly detail AI algorithmic risk?"
    ],
    sources: [
      "WHO Guidance on Governance of AI for Health",
      "AMA Code of Medical Ethics: Autonomous Systems in Practice"
    ]
  },
  {  
  id: "pediatric-transfusion",
    title: "Pediatric Blood Transfusion Refusal",
    category: "Pediatrics & Law",
    summary: "Evaluating parental proxy decision-making versus pediatric assent during critical care.",
    background: "Parents refuse a lifesaving blood transfusion for a 12-year-old child experiencing severe acute anemia based on fundamental religious convictions.",
    dilemma: "Reconciling constitutional protections for parental religious freedoms with the state's interest in preserving the life of a minor.",
    stakeholders: ["Pediatric Patient", "Parents / Guardians", "Attending Physicians", "Hospital Ethics Committee"],
    principles: {
      autonomy: "Parental proxy rights versus the developing autonomy and personal assent of the minor.",
      beneficence: "Administering transfusion prevents imminent biological harm and death.",
      nonMaleficence: "Failure to intervene leads to preventable mortality; forced treatment creates familial psychological trauma.",
      justice: "Consistent legal application of state protection over vulnerable minors."
    },
    legal: "Established legal doctrine holds that parental authority does not grant the right to withhold life-saving care from a minor in immediate life-threatening situations.",
    arguments: {
      pro: "The state has a compelling interest (parens patriae) to override parental refusal to protect minor life.",
      con: "Parental autonomy in fundamental religious and medical choices must remain protected from excessive state intrusion."
    },
    questions: [
      "At what age or developmental stage should a minor's refusal or assent override parental directives?",
      "How can medical teams balance immediate interventions with long-term trust in clinical settings?"
    ],
    sources: [
      "American Academy of Pediatrics Guidelines on Refusal of Treatment",
      "UN Convention on the Rights of the Child (Article 24)"
    ]
  }
];
function openCaseModal(caseId) {
  const item = caseStudies.find(c => c.id === caseId);
  if (!item) return;

  document.getElementById("modal-title").innerText = item.title;
  document.getElementById("modal-category").innerText = item.category;

  const body = document.getElementById("modal-body");
  body.innerHTML = `
    <hr style="margin: 1rem 0;">
    <p><strong>Case Background:</strong> ${item.background}</p>
    <p><strong>Core Dilemma:</strong> ${item.dilemma}</p>
    <p><strong>Key Stakeholders:</strong> ${item.stakeholders.join(", ")}</p>
    
    <h4 style="margin-top:1.2rem; color:#0056b3;">Ethical Principles Breakdown</h4>
    <ul>
      <li><strong>Autonomy:</strong> ${item.principles.autonomy}</li>
      <li><strong>Beneficence:</strong> ${item.principles.beneficence}</li>
      <li><strong>Non-Maleficence:</strong> ${item.principles.nonMaleficence}</li>
      <li><strong>Justice:</strong> ${item.principles.justice}</li>
    </ul>

    <h4 style="margin-top:1.2rem; color:#0056b3;">Legal Considerations</h4>
    <p>${item.legal}</p>

    <h4 style="margin-top:1.2rem; color:#0056b3;">Perspective Arguments</h4>
    <p><strong>Clinician/State Perspective:</strong> ${item.arguments.pro}</p>
    <p><strong>Developer/Parent Perspective:</strong> ${item.arguments.con}</p>

    <h4 style="margin-top:1.2rem; color:#0056b3;">Discussion Questions</h4>
    <ul>
      ${item.questions.map(q => `<li>${q}</li>`).join("")}
    </ul>

    <h4 style="margin-top:1.2rem; color:#0056b3;">Academic Sources & Further Reading</h4>
    <ul>
      ${item.sources.map(s => `<li>${s}</li>`).join("")}
    </ul>
  `;

  document.getElementById("case-modal").style.display = "flex";
}
caseStudies.push(...additionalCaseStudies);
      
document.addEventListener('DOMContentLoaded', () => {
  // 1. Analyze Case Button
 const analyzeBtn = document.getElementById('analyze-btn');
  if (analyzeBtn) {
    analyzeBtn.addEventListener('click', (e) => {
});

  // 1. Analyze Case Button
  const analyzeBtn = document.getElementById('analyze-btn');
  if (analyzeBtn) {
    analyzeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      console.log("Analyze clicked!");
      analyzeCase(); // Runs your AI analysis function
    });
  }

  // 2. Clear / Reset Scenario Button
  const clearBtn = document.getElementById('clear-case-btn');
  if (clearBtn) {
    clearBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const inputArea = document.getElementById('scenario-details');
      if (inputArea) inputArea.value = '';
    });
  }

  // 3. Search / Filter Buttons
  const searchBtn = document.getElementById('search-btn');
  if (searchBtn) {
    searchBtn.addEventListener('click', (e) => {
      e.preventDefault();
      console.log("Search clicked!");
      searchCases(); // Runs your case search function
    });
  }

  const resetFiltersBtn = document.getElementById('reset-filters-btn');
  if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener('click', (e) => {
      e.preventDefault();
      resetFilters(); // Runs your reset function
    });
  }
} 
