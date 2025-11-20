// --- 1. DATA STRUCTURE (FIXED SYNTAX) ---
const QUESTIONNAIRES = [
    {
        title: "Bodily health",
        questions: [
            {
                text: "How many days per week do you exercise?",
                type: "number", min: 0, max: 7
            },
            {
                text: "How long have you consistently trained (months)?",
                type: "number", min: 0, max: 555
            },
            {
                text: "Do you follow a structured workout program?",
                type: "yn"
            },
            {
                text: "Do you track your progress (RPE, weights, reps)?",
                type: "yn"
            },
            {
                text: "Do you consistently get at least 7 hours of sleep per night?",
                type: "yn"
            },
            {
                text: "Do you regularly hit plateaus and overcome them?",
                type: "yn"
            },
            {
                text: "Do you eat mostly whole foods and prep meals?",
                type: "yn"
            },
            {
                text: "Do you track calories or macros?",
                type: "yn"
            },
            {
                text: "Do you drink mostly water (limit soda/juice/alcohol)?",
                type: "yn"
            },
            {
                text: "Do you limit processed foods?",
                type: "yn"
            },
            {
                text: "Do you take time for recovery (stretching, foam rolling, deload weeks)?",
                type: "yn"
            },
            {
                text: "Do you mentor or teach others about fitness?",
                type: "yn"
            },
            {
                text: "Describe your workout and diet in more detail:",
                type: "text"
            }
        ]
    },
    {
        title: "Tech Knowledge Quiz",
        questions: [
            {
                text: "What does 'HTML' stand for?",
                type: "radio",
                options: ["Hyper Text Markup Language", "Home Tool Management Language", "Hyperlink and Text Markup Language"],
            },
            {
                text: "Which browser do you primarily use?",
                type: "dropdown",
                options: ["Chrome", "Firefox", "Safari", "Edge", "Other"],
            },
        ]
    }
];

// --- 2. GLOBAL STATE & DOM ELEMENTS ---
// Get the three main containers from your HTML
const quizListContainer = document.getElementById('quiz-list');
const quizContentContainer = document.getElementById('quiz-content');
const resultsContainer = document.getElementById('results');
const mainHeader = document.querySelector('#app-container h1');

let currentQuizIndex = 0;
let currentQuestionIndex = 0;
let userAnswers = [];


// --- 3. CORE FUNCTIONS ---

/**
 * Initializes the page by displaying the list of available questionnaires.
 */
function init() {
    mainHeader.textContent = 'Welcome! Please select a questionnaire:';
    quizContentContainer.innerHTML = '';
    resultsContainer.innerHTML = '';
    
    // Ensure the list container is visible
    quizListContainer.style.display = 'block'; 
    quizListContainer.innerHTML = ''; 

    QUESTIONNAIRES.forEach((quiz, index) => {
        const quizButton = document.createElement('button');
        quizButton.textContent = quiz.title;
        quizButton.classList.add('quiz-select-button');
        
        // Attach the startQuiz handler
        quizButton.addEventListener('click', () => startQuiz(index)); 
        
        quizListContainer.appendChild(quizButton);
        quizListContainer.appendChild(document.createElement('br')); 
    });
}

/**
 * Starts the selected quiz, hides the list, and loads the first question.
 * @param {number} index - The index of the questionnaire in the QUESTIONNAIRES array.
 */
function startQuiz(index) {
    currentQuizIndex = index;
    currentQuestionIndex = 0;
    userAnswers = [];
    
    // Hide the list and show the content area
    quizListContainer.style.display = 'none'; 
    mainHeader.textContent = QUESTIONNAIRES[index].title;

    displayQuestion();
}

/**
 * Renders the current question based on its type.
 */
function displayQuestion() {
    quizContentContainer.innerHTML = ''; // Clear previous question
    
    const quiz = QUESTIONNAIRES[currentQuizIndex];
    const question = quiz.questions[currentQuestionIndex];

    // Check for end of quiz
    if (!question) {
        showResults();
        return;
    }

    // Question text
    const qText = document.createElement('h3');
    qText.textContent = `Q${currentQuestionIndex + 1}: ${question.text}`;
    quizContentContainer.appendChild(qText);
    
    // Input area based on type
    let inputHTML = '';
    
    switch (question.type) {
        
        case 'yn':
            inputHTML = `
                <div>
                    <input type="radio" id="optionY" name="q-answer" value="Yes" required>
                    <label for="optionY">Yes</label>
                </div>
                <div>
                    <input type="radio" id="optionN" name="q-answer" value="No" required>
                    <label for="optionN">No</label>
                </div>
            `;
            break;

        case 'number':
            // Read optional min/max values from the question object
            const minAttr = question.min !== undefined ? `min="${question.min}"` : '';
            const maxAttr = question.max !== undefined ? `max="${question.max}"` : '';
            
            // Generate the HTML for an input type="number"
            inputHTML = `
                <input type="number" 
                       id="q-answer" 
                       name="q-answer" 
                       ${minAttr} 
                       ${maxAttr} 
                       placeholder="Enter a number"
                       required>`;
            break;
            
        case 'radio':
            inputHTML = question.options.map((option, i) => `
                <div>
                    <input type="radio" id="option${i}" name="q-answer" value="${option}" required>
                    <label for="option${i}">${option}</label>
                </div>
            `).join('');
            break;
            
        case 'text':
            inputHTML = `<textarea id="q-answer" name="q-answer" rows="4" cols="50" required></textarea>`;
            break;
            
        case 'dropdown':
            inputHTML = `<select id="q-answer" name="q-answer" required>
                <option value="">-- Select an option --</option>
                ${question.options.map(option => `<option value="${option}">${option}</option>`).join('')}
            </select>`;
            break;

        default:
            // Handle cases where a question type is missing or invalid
            inputHTML = `<p style="color:red;">Error: Unknown question type (${question.type})</p>`;
            break;
    }
    
    // Add input elements and the Next button
    const form = document.createElement('form');
    form.innerHTML = inputHTML + `<br><button type="submit" class="next-button">Next</button>`;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Stop the form from submitting normally
        nextQuestion(form);
    });

    quizContentContainer.appendChild(form);
}

/**
 * Collects the answer, stores it, and moves to the next question.
 * @param {HTMLFormElement} form - The form element containing the answer input.
 */
function nextQuestion(form) {
    const question = QUESTIONNAIRES[currentQuizIndex].questions[currentQuestionIndex];
    let answer;

    // Logic to find the answer based on input type
    if (question.type === 'radio' || question.type === 'yn') {
        // For radio or yn, find the checked input
        const checkedRadio = form.querySelector('input[name="q-answer"]:checked');
        answer = checkedRadio ? checkedRadio.value : null;
    } else {
        // For text, number, or dropdown, use the value of the #q-answer element
        const inputElement = form.querySelector('#q-answer');
        answer = inputElement ? inputElement.value.trim() : null;

        // Basic check for number type to prevent text input if expecting a number
        if (question.type === 'number' && isNaN(answer) && answer !== '') {
            alert("Please enter a valid number.");
            return;
        }
    }
    
    // Simple validation
    if (!answer || answer === "") {
        alert("Please provide an answer before proceeding.");
        return;
    }
    
    // Store the answer
    userAnswers.push({
        qText: question.text,
        answer: answer,
        type: question.type
    });
    
    // Move to the next question
    currentQuestionIndex++;
    displayQuestion();
}


/**
 * Displays the final results of the questionnaire.
 */
function showResults() {
    quizContentContainer.innerHTML = '';
    mainHeader.textContent = 'Questionnaire Complete! Your Results:';
    
    // Create an ordered list for the results
    const resultsList = document.createElement('ol');
    
    userAnswers.forEach(item => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<strong>${item.qText}</strong>: ${item.answer}`;
        resultsList.appendChild(listItem);
    });
    
    resultsContainer.appendChild(resultsList);
    
    // Add a button to restart
    const restartButton = document.createElement('button');
    restartButton.textContent = 'Start New Questionnaire';
    restartButton.classList.add('restart-button');
    restartButton.addEventListener('click', init);
    
    resultsContainer.appendChild(restartButton);
}

// --- 4. INITIALIZATION ---
// Start the engine when the script loads
init();