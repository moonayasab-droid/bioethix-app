document.addEventListener('DOMContentLoaded', () => {

    // 1. LIVE SEARCH FILTERING
    const searchInput = document.getElementById('search-input');
    const caseCards = document.querySelectorAll('.card, .case-card'); // Handles both card classes

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();

            caseCards.forEach(card => {
                const text = card.textContent.toLowerCase();
                if (text.includes(query)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // 2. ETHICS SCENARIO FORM GENERATOR
    const scenarioForm = document.getElementById('scenario-form');
    const outputContainer = document.getElementById('feedback-output');

    if (scenarioForm && outputContainer) {
        scenarioForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get selected category and user inputs
            const categoryInput = document.getElementById('category-select');
            const detailsInput = document.getElementById('scenario-details');

            const category = categoryInput ? categoryInput.value : 'General Bioethics';
            const details = detailsInput ? detailsInput.value : 'No specific details provided.';

            // Render structured bioethical framework outline
            outputContainer.innerHTML = `
                <div class="analysis-result" style="margin-top: 1.5rem; padding: 1.5rem; background: #f8f9fa; border-left: 4px solid #2b6cb0; border-radius: 6px;">
                    <h3 style="margin-top: 0; color: #2b6cb0;">Bioethical Assessment Outline: ${category}</h3>
                    <p><strong>Case Input:</strong> "${details}"</p>
                    <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 1rem 0;">
                    <ul style="padding-left: 1.2rem; line-height: 1.6;">
                        <li><strong>Autonomy Check:</strong> Evaluate patient capacity, informed consent, and decision-making rights.</li>
                        <li><strong>Beneficence vs. Non-Maleficence:</strong> Weigh the clinical benefits against potential physical or psychological harms.</li>
                        <li><strong>Justice & Distribution:</strong> Review allocation of care resources and equitable treatment access.</li>
                        <li><strong>Legal & MedLaw Precedent:</strong> Cross-reference local health authority statutes, institutional policy, and liability guidelines.</li>
                    </ul>
                </div>
            `;
        });
    }
});

// Grab the form elements
const analyzeButton = document.getElementById('analyze-btn');
const caseTextarea = document.getElementById('case-textarea');
const resultDiv = document.getElementById('analysis-result');

// Function to handle case analysis
function analyzeCase() {
    const userText = caseTextarea ? caseTextarea.value.trim() : '';

    if (!userText) {
        resultDiv.textContent = "Please enter a case summary or dilemma first!";
        resultDiv.style.color = "red";
        return;
    }

    // Display a simulated bioethical assessment
    resultDiv.style.color = "#1a365d";
    resultDiv.innerHTML = `
        <h3>Bioethical Analysis Result</h3>
        <p><strong>Submitted Case:</strong> "${userText}"</p>
        <p><strong>Key Considerations:</strong></p>
        <ul>
            <li><strong>Autonomy:</strong> Ensuring patient informed consent is fully documented.</li>
            <li><strong>Beneficence & Non-Maleficence:</strong> Balancing innovation risks against standard patient outcomes.</li>
            <li><strong>Legal Liability:</strong> Reviewing institutional oversight and manufacturer responsibility.</li>
        </ul>
    `;
}

// Attach event listener to the Analyze Case button
if (analyzeButton) {
    analyzeButton.addEventListener('click', analyzeCase);
}
 
