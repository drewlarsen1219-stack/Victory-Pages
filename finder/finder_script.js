// finder_script.js

// --- 1. QUIZ DATA STRUCTURE ---
const healthAssessmentQuestions = [
    // Pillar I: Foundational Habits & Consistency 
    {
        category: "Foundational Habits & Consistency",
        text: "How many days per week do you engage in 30+ minutes of intentional physical activity?",
        id: "q1_exercise_days",
        type: "select", 
        options: [0, 1, 2, 3, 4, 5, 6, 7],
        weight: 10 
    },
    {
        category: "Foundational Habits & Consistency",
        text: "Do you consistently get at least 7 hours of sleep per night?",
        id: "q2_sleep",
        type: "yn",
        weight: 10 
    },
    {
        category: "Foundational Habits & Consistency",
        text: "Do you currently experience chronic joint or muscle pain that limits training?",
        id: "q3_chronic_pain",
        type: "yn",
        weight: 8
    },
    {
        category: "Foundational Habits & Consistency",
        text: "Do you actively manage stress (meditation, journaling, regular breaks, etc.)?",
        id: "q4_stress_manage",
        type: "yn",
        weight: 7
    },

    // Pillar II: Nutrition & Recovery Structure 
    {
        category: "Nutrition & Recovery Structure",
        text: "Do you eat mostly whole, minimally processed foods (i.e., less than 50% from packages)?",
        id: "q5_whole_foods",
        type: "yn",
        weight: 10 
    },
    {
        category: "Nutrition & Recovery Structure",
        text: "Do you drink mostly water (limiting soda, juice, and alcoholic beverages)?",
        id: "q6_hydration",
        type: "yn",
        weight: 8
    },
    {
        category: "Nutrition & Recovery Structure",
        text: "How many servings of vegetables/fruit do you eat per day?",
        id: "q7_veg_fruit_servings",
        type: "select", 
        options: [0, 1, 2, 3, 4, 5],
        weight: 7
    },
    {
        category: "2. Nutrition & Recovery Structure",
        text: "Do you take a daily multivitamin or relevant essential micronutrient supplement (e.g., Vitamin D, B12)?",
        id: "q8_multivitamin",
        type: "yn",
        weight: 3
    },
    {
        category: "Nutrition & Recovery Structure",
        text: "Do you take time for active recovery (stretching, mobility work) at least 2 times per week?",
        id: "q9_active_recovery",
        type: "yn",
        weight: 5
    },
    {
        category: "Nutrition & Recovery Structure",
        text: "Do you track *either* calories, macros, or portions for the majority of the week?",
        id: "q10_track_nutrition",
        type: "yn",
        weight: 5
    },

    // Pillar III: Objective Performance & Mastery
    {
        category: "Objective Performance & Mastery",
        text: "How long have you been consistently training (in months)?",
        id: "q11_training_duration",
        type: "number", // Kept as number
        min: 0,
        max: 800,
        weight: 9 
    },
    {
        category: "Objective Performance & Mastery",
        text: "Do you follow a structured, progressive workout program (i.e., not just 'showing up')?",
        id: "q12_structured_program",
        type: "yn",
        weight: 6
    },
    {
        category: "Objective Performance & Mastery",
        text: "How would you rate your current maximal strength/endurance relative to your peers (1=Poor, 5=Elite)?",
        id: "q13_performance_rating",
        type: "select", 
        options: [1, 2, 3, 4, 5],
        weight: 5
    },
    {
        category: "Objective Performance & Mastery",
        text: "Do you track your workout progress (weights, reps, RPE, or distance/time)?",
        id: "q14_track_progress",
        type: "yn",
        weight: 4
    },
    {
        category: "Objective Performance & Mastery",
        text: "Do you actively test and try to improve your flexibility and mobility?",
        id: "q15_mobility_test",
        type: "yn",
        weight: 3
    },
    {
        category: "Objective Performance & Mastery",
        text: "Do you regularly hit plateaus and overcome them?",
        id: "q16_overcome_plateaus",
        type: "yn",
        weight: 3
    },
    {
        category: "Objective Performance & Mastery",
        text: "Do you mentor or teach others about fitness or healthy habits?",
        id: "q17_mentor_others",
        type: "yn",
        weight: 2
    },

    // Pillar 4: Qualitative & Context (Non-Scoring)
    {
        category: "Qualitative & Next Steps",
        text: "How would you describe your current energy levels throughout the day (1=Low/Fuzzy, 5=High/Clear)?",
        id: "q18_energy_level",
        type: "select", 
        options: [1, 2, 3, 4, 5],
        weight: 0
    },
    {
        category: "Qualitative & Next Steps",
        text: "Please describe your typical workout and diet in more detail:",
        id: "q19_description",
        type: "text",
        weight: 0
    }
];

const MAX_RAW_SCORE = 103;
let currentQuestionIndex = 0;

// --- 2. DYNAMIC RENDERING FUNCTION ---

function renderQuiz() {
    const form = document.getElementById('quiz-form');
    const quizContainer = document.getElementById('quiz-container');

    if (!form || !quizContainer) return;

    let currentCategory = '';
    
    healthAssessmentQuestions.forEach((q, index) => {
        const block = document.createElement('div');
        block.className = 'question-block';
        block.id = `question-${index}`;
        block.style.display = 'none'; 

        // Render Category Heading only if it changes
        if (q.category !== currentCategory) {
            const heading = document.createElement('h2');
            heading.textContent = q.category;
            block.appendChild(heading);
            currentCategory = q.category;
        }
        
        const label = document.createElement('label');
        label.setAttribute('for', q.id);
        label.textContent = `${index + 1}/${healthAssessmentQuestions.length}. ${q.text}`;
        block.appendChild(label);
        
        // Add spacing after the question text (label)
        block.appendChild(document.createElement('br'));

        // Render Input based on type
        if (q.type === 'number') {
            const input = document.createElement('input');
            input.type = 'number';
            input.id = q.id;
            input.name = q.id;
            input.min = q.min;
            input.max = q.max; 
            input.required = (q.weight > 0); 
            block.appendChild(input);

        } else if (q.type === 'select') {
            const select = document.createElement('select');
            select.id = q.id;
            select.name = q.id;
            select.required = (q.weight > 0);
            
            const defaultOption = document.createElement('option');
            defaultOption.value = "";
            defaultOption.textContent = "Select an option...";
            defaultOption.disabled = true;
            defaultOption.selected = true;
            select.appendChild(defaultOption);

            q.options.forEach(optionValue => {
                const option = document.createElement('option');
                option.value = optionValue;
                option.textContent = optionValue;
                select.appendChild(option);
            });

            block.appendChild(select);

        } else if (q.type === 'yn') {
            // Radio button rendering without extra space span, relying on CSS for spacing
            ['yes', 'no'].forEach(val => {
                const radio = document.createElement('input');
                radio.type = 'radio';
                radio.id = `${q.id}_${val}`;
                radio.name = q.id;
                radio.value = val;
                radio.required = (q.weight > 0);
                
                const radioLabel = document.createElement('label');
                radioLabel.setAttribute('for', `${q.id}_${val}`);
                radioLabel.textContent = val.charAt(0).toUpperCase() + val.slice(1);
                
                block.appendChild(radio);
                block.appendChild(radioLabel);
            });

        } else if (q.type === 'text') {
            const textarea = document.createElement('textarea');
            textarea.id = q.id;
            textarea.name = q.id;
            textarea.rows = 3;
            textarea.required = (q.weight > 0); 
            block.appendChild(textarea);
        }

        // Add extra spacing before the button
        block.appendChild(document.createElement('br'));
        block.appendChild(document.createElement('br'));

        quizContainer.appendChild(block);
    });

    showQuestion(0);
}

// --- 3. NAVIGATION LOGIC ---

function showQuestion(index) {
    const questionBlocks = document.querySelectorAll('.question-block');
    const nextBtn = document.getElementById('next-btn');
    const questionBlock = questionBlocks[index];

    questionBlocks.forEach(block => {
        block.style.display = 'none';
    });
    
    nextBtn.textContent = 'Next Question ❯';
    nextBtn.onclick = handleNext;
    nextBtn.style.display = 'block';

    if (questionBlock) {
        questionBlock.style.display = 'block';
    }
    
    if (index === healthAssessmentQuestions.length - 1) {
        nextBtn.textContent = 'Calculate Score 💯';
        nextBtn.onclick = handleCalculate; 
    }
}

function handleNext() {
    const currentQuestionBlock = document.getElementById(`question-${currentQuestionIndex}`);
    if (!currentQuestionBlock) return;

    let isValid = true;
    
    // Find required radio groups
    const requiredRadioGroups = currentQuestionBlock.querySelectorAll('[type="radio"][required]');
    if (requiredRadioGroups.length > 0) {
        const groupName = requiredRadioGroups[0].name;
        if (!document.querySelector(`input[name="${groupName}"]:checked`)) {
             isValid = false;
        }
    }
    
    // Find required select/number/textarea fields
    const requiredOtherInputs = currentQuestionBlock.querySelectorAll('select[required], input[type="number"][required], textarea[required]');
    requiredOtherInputs.forEach(input => {
        if (!input.value.trim()) {
             isValid = false;
        }
        // Specific check for number input against max/min attributes
        if (input.type === 'number' && input.value.trim()) {
            const value = parseFloat(input.value);
            if (value < parseFloat(input.min) || value > parseFloat(input.max)) {
                isValid = false;
                alert(`The value entered for question ${currentQuestionIndex + 1} is outside the allowed range of ${input.min} to ${input.max}.`);
                // Use input.reportValidity() if available to show native browser error
                if(input.reportValidity) input.reportValidity(); 
            }
        }
    });

    if (!isValid) {
        if (!document.querySelector('.alert-shown')) {
             alert("Please answer all required questions before proceeding.");
             // Add a temporary class to prevent multiple alerts on repeat clicks if the user tries again quickly
             document.querySelector('body').classList.add('alert-shown');
             setTimeout(() => document.querySelector('body').classList.remove('alert-shown'), 1000);
        }
        return;
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < healthAssessmentQuestions.length) {
        showQuestion(currentQuestionIndex);
    } 
}

// --- 4. SCORING LOGIC ---

function calculateHealthScore(answers, questions) {
    let totalScore = 0;

    questions.forEach(q => {
        const answer = answers[q.id];
        
        if (q.weight === 0 || !answer) {
            return;
        }

        if (q.type === 'yn') {
            if (q.id === 'q3_chronic_pain') {
                 if (answer.toLowerCase() === 'no') {
                    totalScore += q.weight;
                }
            } else {
                if (answer.toLowerCase() === 'yes') {
                    totalScore += q.weight;
                }
            }
        } else if (q.type === 'number') {
            const userValue = parseFloat(answer);
            
            if (!isNaN(userValue) && userValue >= q.min) { 
                // Cap training duration (q11) score at 3 years (36 months)
                const scoreMax = (q.id === 'q11_training_duration') ? 36 : q.max; 
                
                const cappedValue = Math.min(userValue, scoreMax);
                
                const proportionalScore = (cappedValue / scoreMax) * q.weight;
                totalScore += proportionalScore;
            }
        } else if (q.type === 'select') {
             const userValue = parseFloat(answer);
             
             if (!isNaN(userValue)) {
                 const maxOptionValue = q.options[q.options.length - 1];
                 const proportionalScore = (userValue / maxOptionValue) * q.weight;
                 totalScore += proportionalScore;
             }
        }
    });
    
    // Scale the score from MAX_RAW_SCORE (103) to 100 and cap at 100.
    const scaledScore = (totalScore / MAX_RAW_SCORE) * 100;
    const finalScore = Math.round(Math.min(100, scaledScore));
    
    return finalScore;
}


// --- 5. CALCULATE HANDLER ---

function handleCalculate(event) {
    event.preventDefault(); 
    
    // 1. Run final validation using handleNext's logic
    const isLastQuestionAnswered = document.querySelector(`input[name="${healthAssessmentQuestions[currentQuestionIndex].id}"]:checked`) || 
                                  document.querySelector(`select[name="${healthAssessmentQuestions[currentQuestionIndex].id}"]`)?.value.trim() ||
                                  document.querySelector(`textarea[name="${healthAssessmentQuestions[currentQuestionIndex].id}"]`)?.value.trim();

    if (!isLastQuestionAnswered && healthAssessmentQuestions[currentQuestionIndex].weight > 0) {
        // Only run handleNext (which shows the alert) if the field is required and empty.
        handleNext(); 
        return; 
    }
    
    // 2. Proceed with calculation
    const form = document.getElementById('quiz-form');
    const scoreResultDiv = document.getElementById('score-result');
    const quizContainer = document.getElementById('quiz-container');
    const nextBtn = document.getElementById('next-btn');

    const formData = new FormData(form);
    const answers = {};
    formData.forEach((value, key) => { answers[key] = value; });
    
    const finalScore = calculateHealthScore(answers, healthAssessmentQuestions);
    
    // Hide the quiz and show the result
    if (quizContainer) quizContainer.style.display = 'none';
    if (nextBtn) nextBtn.style.display = 'none';
    
    if (scoreResultDiv) {
        scoreResultDiv.innerHTML = `Your Health Assessment Score: <span>${finalScore}/100</span>`;
        scoreResultDiv.style.display = 'block';
        scoreResultDiv.style.borderColor = (finalScore >= 80) ? '#28a745' : (finalScore >= 50) ? '#ffc107' : '#dc3545';
    }
}

// --- 6. INITIALIZATION ---

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('quiz-form') && document.getElementById('quiz-container')) {
        renderQuiz(); 
    }
});