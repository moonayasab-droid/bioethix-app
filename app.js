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

  if (!analyzeBtn || !scenarioInput || !feedbackOutput) {
    console.error('Required analysis elements are missing.');
    return;
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