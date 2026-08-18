// ==========================================
// EVENT LISTENERS & INITIALIZATION
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  console.log("BioEthix & MedLaw app initializing...");

  // 1. Theme Switcher Button
  initTheme();
  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }

  // 2. Custom Case Analyzer Buttons
  const analyzeBtn = document.getElementById("analyzeBtn") || document.querySelector("button[onclick*='analyzeCustomCase']");
  const clearBtn = document.getElementById("clearCaseBtn") || document.querySelector("button[onclick*='clearCustomCase']");

  if (analyzeBtn) {
    analyzeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      analyzeCustomCase();
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener("click", (e) => {
      e.preventDefault();
      clearCustomCase();
    });
  }

  // 3. Category Filter Buttons
  const filterBtns = document.querySelectorAll(".filter-btn");
  filterBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      const category = btn.getAttribute("data-category") || btn.innerText.toLowerCase().trim();
      filterCategory(category, btn);
    });
  });

  // 4. Community Vote Buttons
  const voteAgreeBtn = document.getElementById("voteAgree") || document.querySelector("button[onclick*='up']");
  const voteDisagreeBtn = document.getElementById("voteDisagree") || document.querySelector("button[onclick*='down']");

  if (voteAgreeBtn) {
    voteAgreeBtn.addEventListener("click", () => vote("up"));
  }
  if (voteDisagreeBtn) {
    voteDisagreeBtn.addEventListener("click", () => vote("down"));
  }

  // 5. Submit Feedback Button
  const feedbackBtn = document.getElementById("submitFeedbackBtn") || document.querySelector("button[onclick*='submitFeedback']");
  if (feedbackBtn) {
    feedbackBtn.addEventListener("click", (e) => {
      e.preventDefault();
      submitFeedback();
    });
  }

  // 6. Close Modal when clicking outside
  const modal = document.getElementById("case-modal");
  if (modal) {
    window.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    
  }

  console.log("✅ All buttons successfully attached and active!");
});