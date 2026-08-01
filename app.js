document.addEventListener('DOMContentLoaded', () => {
  const analyzeBtn = document.getElementById('analyze-btn');
  const scenarioInput = document.getElementById('scenario-details');
  const feedbackOutput = document.getElementById('feedback-output');

  if (analyzeBtn) {
    analyzeBtn.addEventListener('click', () => {
      const caseText = scenarioInput ? scenarioInput.value.trim() : '';

      if (!caseText) {
        alert('Please enter a case summary first before analyzing!');
        return;
      }

      // Display response on screen
      feedbackOutput.innerHTML = `
        <div style="padding: 15px; background-color: #eef6ff; border-left: 4px solid #1a365d; border-radius: 4px;">
          <h3 style="margin-top: 0; color: #1a365d;">Analysis Result</h3>
          <p><strong>Input Received:</strong> ${caseText}</p>
          <p><strong>Status:</strong> Case successfully submitted for ethical and legal evaluation.</p>
        </div>
      `;
    });
  }
}); 