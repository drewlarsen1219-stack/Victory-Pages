document.addEventListener('DOMContentLoaded', function() {

    // --- INITIALIZE: Close side columns on page load ---
    const paracleteContent = document.getElementById('paraclete-content');
    const pagesContent = document.getElementById('pages-content');
    
    if (paracleteContent) {
        paracleteContent.classList.add('hidden-content');
        paracleteContent.style.display = 'none';
    }
    if (pagesContent) {
        pagesContent.classList.add('hidden-content');
        pagesContent.style.display = 'none';
    }
    
    // Show placeholder images
    const pImg = document.getElementById('paraclete-closed-image');
    const pgImg = document.getElementById('pages-closed-image');
    if (pImg) pImg.style.display = 'block';
    if (pgImg) pgImg.style.display = 'block';

    // --- SKILL DATA FOR GRID ---
    const SKILL_DATA = [
        { name: 'Body', symbol: '💪' },
        { name: 'Mind', symbol: '🧠' },
        { name: 'Heart', symbol: '❤️' },
        { name: 'Hand', symbol: '✍️' },
        { name: 'Finance', symbol: '💰' },
        { name: 'Soul', symbol: '⚓' },
        { name: 'Status', symbol: '👑' },
        { name: 'Space', symbol: '🏠' },
        { name: 'Time', symbol: '⏳' },
        { name: 'World', symbol: '🌏' },
        { name: 'Creative', symbol: '🎨' },
        { name: 'Tech', symbol: '⚙️' }
    ];

    let skillsData = SKILL_DATA.map(skill => ({
        name: skill.name,
        symbol: skill.symbol,
        score: 0
    }));

    // --- 1. ASSESSMENT QUESTIONS ---
    const myQuestions = [
        { id: 1, text: "How many days per week do you engage in 30+ minutes of intentional physical activity?", type: "select", options: [0, 1, 2, 3, 4, 5, 6, 7], weight: 10 },
        { id: 2, text: "Do you consistently get at least 7 hours of sleep per night?", type: "yn", weight: 10 },
        { id: 3, text: "Do you currently experience chronic joint or muscle pain that limits training?", type: "yn", weight: 8 },
        { id: 4, text: "Do you actively manage stress (meditation, journaling, regular breaks, etc.)?", type: "yn", weight: 7 },
        { id: 5, text: "Do you eat mostly whole, minimally processed foods?", type: "yn", weight: 10 },
        { id: 6, text: "Do you drink mostly water (limiting soda and alcohol)?", type: "yn", weight: 8 },
        { id: 7, text: "How many servings of vegetables/fruit do you eat per day?", type: "select", options: [0, 1, 2, 3, 4, 5], weight: 7 },
        { id: 8, text: "Do you take a daily multivitamin or essential supplement?", type: "yn", weight: 3 },
        { id: 9, text: "Do you take time for active recovery at least 2x per week?", type: "yn", weight: 5 },
        { id: 10, text: "Do you track calories, macros, or portions?", type: "yn", weight: 5 },
        { id: 11, text: "How many months have you been consistently training?", type: "number", weight: 9 },
        { id: 12, text: "Do you follow a structured, progressive workout program?", type: "yn", weight: 6 },
        { id: 13, text: "Rate your performance relative to peers (1=Poor, 5=Elite):", type: "select", options: [1, 2, 3, 4, 5], weight: 5 },
        { id: 14, text: "Do you track your workout progress (weights, reps, RPE)?", type: "yn", weight: 4 },
        { id: 15, text: "Do you actively test and try to improve your mobility?", type: "yn", weight: 3 },
        { id: 16, text: "Do you regularly hit plateaus and overcome them?", type: "yn", weight: 3 },
        { id: 17, text: "Do you mentor or teach others about fitness?", type: "yn", weight: 2 },
        { id: 18, text: "Rate your current energy levels (1=Low, 5=High):", type: "select", options: [1, 2, 3, 4, 5], weight: 5 },
        { id: 19, text: "Please describe your typical workout and diet in detail:", type: "text", weight: 0 }
    ];

    let currentStep = 0;
    let userAnswers = {};
    const quizContainer = document.getElementById('quiz-container');

    // --- 2. THE MASTER HIDE FUNCTION ---
    window.hideSideColumns = function() {
        const paraclete = document.getElementById('paraclete-content');
        const pages = document.getElementById('pages-content');
        
        // Hide the expandable content
        if (paraclete) {
            paraclete.classList.add('hidden-content');
            paraclete.style.display = 'none';
        }
        if (pages) {
            pages.classList.add('hidden-content');
            pages.style.display = 'none';
        }

        // Update Toggle Buttons
        const pBtn = document.getElementById('paraclete-content-toggle');
        const pgBtn = document.getElementById('pages-content-toggle');
        if (pBtn) pBtn.innerHTML = 'Open ▼';
        if (pgBtn) pgBtn.innerHTML = 'Open ▼';

        // HIDE Placeholder Images and text
        const pImg = document.getElementById('paraclete-closed-image');
        const pgImg = document.getElementById('pages-closed-image');
        if (pImg) pImg.style.display = 'none';
        if (pgImg) pgImg.style.display = 'none';
    };

    // --- 2B. THE MASTER SHOW FUNCTION ---
    window.showSideColumns = function() {
        const paraclete = document.getElementById('paraclete-content');
        const pages = document.getElementById('pages-content');
        
        // Keep them hidden but make them toggleable again
        if (paraclete) {
            paraclete.classList.add('hidden-content');
            paraclete.style.display = 'none';
        }
        if (pages) {
            pages.classList.add('hidden-content');
            pages.style.display = 'none';
        }

        // Update Toggle Buttons to show "Open" state
        const pBtn = document.getElementById('paraclete-content-toggle');
        const pgBtn = document.getElementById('pages-content-toggle');
        if (pBtn) pBtn.innerHTML = 'Open ▼';
        if (pgBtn) pgBtn.innerHTML = 'Open ▼';

        // Show Placeholder Images (columns are closed)
        const pImg = document.getElementById('paraclete-closed-image');
        const pgImg = document.getElementById('pages-closed-image');
        if (pImg) pImg.style.display = 'block';
        if (pgImg) pgImg.style.display = 'block';
    };

    // --- SHOW SKILL GRID IN PARACLETE ---
    window.showSkillGrid = function() {
        const paracleteContent = document.getElementById('paraclete-content');
        if (!paracleteContent) return;
        
        // Show Paraclete column
        paracleteContent.classList.remove('hidden-content');
        paracleteContent.style.display = 'block';
        
        // Update button
        const pBtn = document.getElementById('paraclete-content-toggle');
        if (pBtn) pBtn.innerHTML = 'Close ▲';
        
        // Hide placeholder
        const pImg = document.getElementById('paraclete-closed-image');
        if (pImg) pImg.style.display = 'none';
        
        // Create grid content
        paracleteContent.innerHTML = `
            
                <p style="text-align: center; font-weight: bold; color: black; margin: 5px 0; font-size: 0.85rem;">Skills Tracker</p>
                <hr style="margin: 5px 0;">
                <div id="skill-grid" style="display: flex; flex-direction: column; gap: 4px; padding: 5px; flex: 1; justify-content: space-evenly;">
                    ${SKILL_DATA.map((skill, index) => `
                        <div class="skill-grid-item retro-inset-panel" data-index="${index}" style="padding: 5px; display: flex; align-items: center; justify-content: space-between; cursor: pointer; flex: 1;">
                            <div style="display: flex; align-items: center; gap: 8px; flex: 1;">
                                <div style="font-size: 1.1rem; line-height: 1;">${skill.symbol}</div>
                                <div style="font-size: 0.75rem; font-weight: bold; color: black;">${skill.name}</div>
                            </div>
                            <div style="font-size: 0.7rem; color: black; white-space: nowrap;">${skillsData[index].score}/100</div>
                        </div>
                    `).join('')}
                </div>
                <hr style="margin: 5px 0;">
                <div style="text-align: center; margin: 5px 0;">
                    <button class="classic-3d-button" onclick="closeSkillGrid()" style="font-size: 0.75rem; padding: 4px 10px;">Back to Menu</button>
                </div>
            </div>
        `;
        
        // Add click handlers to grid items
        document.querySelectorAll('.skill-grid-item').forEach(item => {
            item.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                alert(`Clicked on ${SKILL_DATA[index].name}. Skills assessment coming soon!`);
            });
        });
    };

    // --- CLOSE SKILL GRID ---
    window.closeSkillGrid = function() {
        const paracleteContent = document.getElementById('paraclete-content');
        if (paracleteContent) {
            paracleteContent.classList.add('hidden-content');
            paracleteContent.style.display = 'none';
        }
        
        // Update button
        const pBtn = document.getElementById('paraclete-content-toggle');
        if (pBtn) pBtn.innerHTML = 'Open ▼';
        
        // Show placeholder
        const pImg = document.getElementById('paraclete-closed-image');
        if (pImg) pImg.style.display = 'block';
    };

    // --- 3. BUTTONS ---
    const assessmentBtn = document.getElementById('open-assessment-btn');
    if (assessmentBtn) {
        assessmentBtn.addEventListener('click', function() {
            hideSideColumns();
            showSkillGrid(); // Show grid in Paraclete
            document.getElementById('paths-finder-view').style.display = 'block'; 
            document.getElementById('landing-screen').style.display = 'none';
            document.getElementById('paths-finder-view').scrollIntoView({ behavior: 'smooth' });
            currentStep = 0;
            renderQuestion();
        });
    }

    window.openExistingUser = function() {
        hideSideColumns();
        showSkillGrid(); // Show grid in Paraclete
        document.getElementById('landing-screen').style.display = 'none';
    };

    window.switchToMenu = function() {
        // Hide the assessment view
        document.getElementById('paths-finder-view').style.display = 'none';
        // Show the landing screen
        document.getElementById('landing-screen').style.display = 'block';
        // Restore the side columns
        showSideColumns();
        // Close skill grid
        closeSkillGrid();
    };

    // --- 4. ASSESSMENT ENGINE ---
    function renderQuestion() {
        const q = myQuestions[currentStep];
        let html = '';

        if (q.type === 'select') {
            html = q.options.map((opt, i) => `
                <div class="option">
                    <input type="radio" name="q${q.id}" id="opt${i}" value="${opt}">
                    <label for="opt${i}">${opt}</label>
                </div>`).join('');
        } else if (q.type === 'yn') {
            html = `
                <div class="option"><input type="radio" name="q${q.id}" id="opt-y" value="yes"><label for="opt-y">Yes</label></div>
                <div class="option"><input type="radio" name="q${q.id}" id="opt-n" value="no"><label for="opt-n">No</label></div>`;
        } else if (q.type === 'number') {
            html = `<input type="number" name="q${q.id}" class="num-input" style="width: 80%; padding: 10px;">`;
        } else {
            html = `<textarea name="q${q.id}" class="text-input" style="width: 90%; height: 60px;"></textarea>`;
        }

quizContainer.innerHTML = `
    <p class="question-text"><strong>Q${currentStep + 1}/${myQuestions.length}</strong> <br>${q.text}</p>
    <div class="options-group">${html}</div>`;
    }

    const nextBtn = document.getElementById('next-btn');
    if (nextBtn) {
        nextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const q = myQuestions[currentStep];
            
            // Capture Answer
            if (q.type === 'text' || q.type === 'number') {
                const input = quizContainer.querySelector('textarea') || quizContainer.querySelector('input');
                userAnswers[q.id] = input ? input.value : null;
            } else {
                const checked = quizContainer.querySelector('input:checked');
                userAnswers[q.id] = checked ? checked.value : null;
            }

            if (currentStep < myQuestions.length - 1) {
                currentStep++;
                renderQuestion();
            } else {
                showScore();
            }
        });
    }
	
	const backBtn = document.getElementById('back-btn');
if (backBtn) {
    backBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Only go back if not on first question
        if (currentStep > 0) {
            currentStep--;
            renderQuestion();
            
            // Re-populate the answer if user already answered this question
            const q = myQuestions[currentStep];
            const previousAnswer = userAnswers[q.id];
            
            if (previousAnswer) {
                if (q.type === 'text' || q.type === 'number') {
                    const input = quizContainer.querySelector('textarea') || quizContainer.querySelector('input');
                    if (input) input.value = previousAnswer;
                } else {
                    const radio = quizContainer.querySelector(`input[value="${previousAnswer}"]`);
                    if (radio) radio.checked = true;
                }
            }
        } else {
            // On first question, go back to menu
            switchToMenu();
        }
    });
}

    function showScore() {
        let total = 0, earned = 0;
        myQuestions.forEach(q => {
            if (q.weight > 0) {
                total += q.weight;
                const ans = userAnswers[q.id];
                if (!ans) return;
                if (q.type === 'yn' && ans === 'yes') earned += q.weight;
                if (q.type === 'select') earned += (q.weight * (parseInt(ans) / Math.max(...q.options)));
            }
        });

        const score = Math.round((earned / total) * 100);
        quizContainer.innerHTML = `
            <div style="text-align: center; padding: 20px;">
                <h3 style="color:black">Assessment Complete</h3>
                <h1 style="font-size: 4rem; color: #4CAF50;">${score}/100</h1>
                <p style="color:black">Check your email for your breakdown.</p>
                <button onclick="location.reload()" class="classic-3d-button">Restart</button>
            </div>`;
        if (nextBtn) nextBtn.style.display = 'none';
    }
});

// Original Toggle logic (remains active for manual clicks)
function toggleColumn(columnId) {
    const content = document.getElementById(columnId);
    const button = document.getElementById(columnId + '-toggle'); 
    const imageContainer = document.getElementById(columnId.split('-')[0] + '-closed-image');

    if (content.style.display === 'none' || content.classList.contains('hidden-content')) {
        content.classList.remove('hidden-content');
        content.style.display = 'block'; // Force visibility
        if (button) button.innerHTML = button.innerHTML.replace('Open', 'Close').replace('▼', '▲');
        if (imageContainer) imageContainer.style.display = 'none'; 
    } else {
        content.classList.add('hidden-content');
        content.style.display = 'none'; // Force hide
        if (button) button.innerHTML = button.innerHTML.replace('Close', 'Open').replace('▲', '▼');
        if (imageContainer) imageContainer.style.display = 'block'; 
    }
}