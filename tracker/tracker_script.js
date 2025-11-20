<script>
document.getElementById("help-btn").onclick = function() {
    document.getElementById("help-modal-bg").style.display = "flex";
};
document.getElementById("close-help-btn").onclick = function() {
    document.getElementById("help-modal-bg").style.display = "none";
};
document.getElementById("close-modal-btn") && (document.getElementById("close-modal-btn").onclick = function() {
    document.getElementById("modal-bg").style.display = "none";
});
document.getElementById("home-btn").onclick = function() {
    window.location.href = "index.html";
};

const QUESTIONS_PER_PAGE = 8;
const SKILL_DATA = [
    { name: 'Body', symbol: '' },
    { name: 'Mind', symbol: '' },
    { name: 'Heart', symbol: '' },
    { name: 'Hand', symbol: '⚒' },
    { name: 'Finance', symbol: '$' },
    { name: 'Soul', symbol: '' },
    { name: 'Status', symbol: '' },
    { name: 'Space', symbol: '⿻' },
    { name: 'Time', symbol: '' },
    { name: 'World', symbol: '🌏︎' },
    { name: 'Creative', symbol: 'ᝰ' },
    { name: 'Tech', symbol: '🖳' }
];
const SKILL_QUESTIONS = {
    'Body': [
        { label: 'How many days per week do you exercise?', type: 'number', min: 0, max: 7 },
        { label: 'How long have you consistently trained (months)?', type: 'number', min: 0, max: 120 },
        { label: 'Do you follow a structured workout program?', type: 'yn' },
        { label: 'Do you track your progress (RPE, weights, reps)?', type: 'yn' },
        { label: 'Do you perform both resistance and cardio training?', type: 'yn' },
        { label: 'Do you work on flexibility/mobility weekly?', type: 'yn' },
        { label: 'Do you regularly hit plateaus and overcome them?', type: 'yn' },
        { label: 'Do you consistently get at least 7 hours of sleep per night?', type: 'yn' },
        { label: 'Do you avoid screens or caffeine before bed?', type: 'yn' },
        { label: 'Do you eat mostly whole foods and prep meals?', type: 'yn' },
        { label: 'Do you track calories or macros?', type: 'yn' },
        { label: 'Do you eat sufficient protein daily?', type: 'yn' },
        { label: 'Do you drink mostly water (limit soda/juice/alcohol)?', type: 'yn' },
        { label: 'Do you limit processed foods?', type: 'yn' },
        { label: 'Do you take time for recovery (stretching, foam rolling, deload weeks)?', type: 'yn' },
        { label: 'Do you mentor or teach others about fitness?', type: 'yn' },
        { label: 'Describe your workout and diet in more detail:', type: 'textarea' }
    ],
    'Mind': [
        { label: 'How many hours/week do you study or learn new things?', type: 'number', min: 0, max: 50 },
        { label: 'Do you have a structured learning plan?', type: 'yn' },
        { label: 'Do you read books regularly?', type: 'yn' },
        { label: 'Do you take notes or journal your learning?', type: 'yn' },
        { label: 'Do you apply new concepts to real life?', type: 'yn' },
        { label: 'Do you teach or mentor others?', type: 'yn' },
        { label: 'Describe your learning process:', type: 'textarea' },
        { label: 'Do you do mental exercises (puzzles, strategy games)?', type: 'yn' }
    ]
};
const SKILL_RANKS = {
    'Body': [
        { name: 'Novice', desc: 'Basic routine or just started.', min: 0, max: 25 },
        { name: 'Intermediate', desc: 'Consistent, tracks progress.', min: 26, max: 50 },
        { name: 'Advanced', desc: 'Block periodization, solid nutrition/sleep.', min: 51, max: 75 },
        { name: 'Expert', desc: 'Advanced programming, optimal habits.', min: 76, max: 100 }
    ],
    'Mind': [
        { name: 'Novice', desc: 'Occasional learning, no system.', min: 0, max: 25 },
        { name: 'Intermediate', desc: 'Consistent learner, some structure.', min: 26, max: 50 },
        { name: 'Advanced', desc: 'Deep learning, projects, teaching.', min: 51, max: 75 },
        { name: 'Expert', desc: 'Creates frameworks, mentors others.', min: 76, max: 100 }
    ]
};

let currentPage = 0;
let totalPages = 1;
let selectedSkillIndex = null;
let skillsData = SKILL_DATA.map(skill => ({
    name: skill.name,
    symbol: skill.symbol,
    score: 0,
    blog: "",
    uploads: [],
    answers: {}
}));

const elements = {
    grid: document.getElementById('grid-container'),
    modalBg: document.getElementById('modal-bg'),
    modal: document.getElementById('modal'),
    form: document.getElementById('modal-form'),
    questions: document.getElementById('modal-questions'),
    nav: document.getElementById('modal-nav'),
    recommendations: document.getElementById('recommendation-section'),
    blog: document.getElementById('blog-text'),
    proofInput: document.getElementById('proof-file-input'),
    output: document.getElementById('modal-output'),
    saveMsg: document.getElementById('saved-message'),
    closeBtn: document.getElementById('close-modal-btn'),
    saveLinkBtn: document.getElementById('saveLinkBtn'),
    saveLinkModal: document.getElementById('saveLinkModal'),
    saveLinkField: document.getElementById('saveLinkField'),
    copyLinkBtn: document.getElementById('copyLinkBtn'),
    openLinkBtn: document.getElementById('openLinkBtn'),
    closeSaveModalBtn: document.getElementById('closeSaveModalBtn'),
    loadLinkBtn: document.getElementById('loadLinkBtn'),
    loadLinkModal: document.getElementById('loadLinkModal'),
    loadLinkInner: document.getElementById('loadLinkInner'),
    loadLinkField: document.getElementById('loadLinkField'),
    submitLoadBtn: document.getElementById('submitLoadBtn'),
    closeLoadModalBtn: document.getElementById('closeLoadModalBtn'),
    loadLinkStatus: document.getElementById('loadLinkStatus'),
    createPostBtn: document.getElementById('createPostBtn')
};

function updateButtonDisplay(index) {
    const skill = skillsData[index];
    const box = elements.grid.querySelector(`[data-index="${index}"] .inner-square`);
    if (box) {
        let logoHtml;
        if (skill.name === "Body") {
            logoHtml = `<img src="Dumbell_finished (2).png" alt="Dumbbell_finished" class="pixel-icon">`;
        } else if (skill.name === "Heart") {
            logoHtml = `<img src="heart_remade(2).png" alt="Heart" class="heart2-icon">`;
        } else if (skill.name === "Soul") {
            logoHtml = `<img src="anchor.png" alt="Soul" class="anchor-icon">`;
        } else if (skill.name === "Status") {
            logoHtml = `<img src="status.png" alt="Status" class="status-icon">`;
        } else if (skill.name === "Time") {
            logoHtml = `<img src="hour glass (3).png" alt="Hourglass" class="hourglass-icon">`;
        } else if (skill.name === "Hand") {
            logoHtml = `<img src="hand2.2.png" alt="Hand" class="hand2-icon">`;
        } else if (skill.name === "Mind") {
            logoHtml = `<img src="mind2.png" alt="Mind" class="mind-icon">`;
        } else if (skill.name === "Finance") {
            logoHtml = `<img src="finance_2.png" alt="Finance" class="finance-icon">`;
        } else {
            logoHtml = `<span class="skill-symbol">${skill.symbol}</span>`;
        }
        box.innerHTML = `
            <div class="skill-name">${skill.name}</div>
            <div class="skill-logo">${logoHtml}</div>
            <div class="skill-score">${skill.score}/100</div>
        `;
    }
}

function renderQuestionsPage(skillIndex, page) {
    const skill = SKILL_DATA[skillIndex];
    const questions = SKILL_QUESTIONS[skill.name] || [];
    totalPages = Math.ceil(questions.length / QUESTIONS_PER_PAGE);
    const start = page * QUESTIONS_PER_PAGE;
    const end = Math.min(start + QUESTIONS_PER_PAGE, questions.length);
    elements.questions.innerHTML = '';
    for (let qi = start; qi < end; qi++) {
        const q = questions[qi];
        let prev = skillsData[skillIndex].answers["q"+qi] || "";
        const group = document.createElement('div');
        group.className = 'question-group';
        if (q.type === 'number') {
            group.innerHTML = `
                <label>${q.label}</label>
                <input type="number" name="q${qi}" min="${q.min}" max="${q.max}" value="${prev}" required>
            `;
        } else if (q.type === 'yn') {
            group.innerHTML = `
                <label>${q.label}</label>
                <div class="yn-group">
                    <label><input type="radio" name="q${qi}" value="yes" ${prev==="yes"?"checked":""} required> Yes</label>
                    <label><input type="radio" name="q${qi}" value="no" ${prev==="no"?"checked":""} required> No</label>
                </div>
            `;
        } else if (q.type === 'textarea') {
            group.innerHTML = `
                <label>${q.label}</label>
                <textarea name="q${qi}" rows="3" required>${prev}</textarea>
            `;
        }
        elements.questions.appendChild(group);
    }
    if (totalPages > 1) {
        elements.nav.innerHTML = `
            <button type="button" class="nav-btn" id="prev-btn" ${page === 0 ? 'disabled' : ''}>Previous</button>
            <span>Page ${page + 1} of ${totalPages}</span>
            <button type="button" class="nav-btn" id="next-btn" ${page === totalPages - 1 ? 'disabled' : ''}>Next</button>
        `;
        document.getElementById('prev-btn')?.addEventListener('click', () => {
            currentPage = Math.max(0, currentPage - 1);
            renderQuestionsPage(selectedSkillIndex, currentPage);
        });
        document.getElementById('next-btn')?.addEventListener('click', () => {
            currentPage = Math.min(totalPages - 1, currentPage + 1);
            renderQuestionsPage(selectedSkillIndex, currentPage);
        });
    } else {
        elements.nav.innerHTML = '';
    }
}

function openSkillModal(index) {
    selectedSkillIndex = index;
    currentPage = 0;
    elements.questions.innerHTML = '';
    elements.recommendations.innerHTML = '';
    elements.blog.value = skillsData[index].blog || '';
    elements.proofInput.value = '';
    elements.output.innerHTML = '';
    elements.saveMsg.textContent = '';
    elements.form.reset();
    renderQuestionsPage(index, currentPage);
    elements.modalBg.style.display = 'flex';
}

function getRank(score, skillName) {
    const ranks = SKILL_RANKS[skillName] || SKILL_RANKS['Body'];
    for (let i = ranks.length - 1; i >= 0; i--) {
        if (score >= ranks[i].min) return { ...ranks[i], rankIndex: i };
    }
    return { ...ranks[0], rankIndex: 0 };
}

elements.form.onsubmit = function(e) {
    e.preventDefault();
    if (currentPage < totalPages - 1) {
        currentPage++;
        renderQuestionsPage(selectedSkillIndex, currentPage);
        return;
    }
    const skillObj = skillsData[selectedSkillIndex];
    const skillName = skillObj.name;
    let score = 0;
    let answers = {};
    const formData = new FormData(elements.form);
    for (let [k, v] of formData.entries()) {
        if (k.startsWith('q')) {
            answers[k] = v;
        }
    }
    skillObj.answers = answers;
    if (skillName === 'Body') {
        const days = Number(answers.q0) || 0;
        const months = Number(answers.q1) || 0;
        let ynScore = 0;
        for (let i = 2; i <= 15; i++) {
            if (answers['q'+i] === 'yes') ynScore += 4;
        }
        const detail = (answers.q16 || "").toLowerCase();
        if (/block periodization|advanced|mentor|teach|deload/.test(detail)) ynScore += 12;
        else if (/double progression|macros|protein|sleep|foam rolling/.test(detail)) ynScore += 6;
        score = Math.min(100, Math.round(days*3 + months*0.7 + ynScore));
    }
    else if (skillName === 'Mind') {
        const hrs = Number(answers.q0) || 0;
        let ynScore = 0;
        for (let i = 1; i <= 6; i++) {
            if (answers['q'+i] === 'yes') ynScore += 6;
        }
        const detail = (answers.q6 || "").toLowerCase();
        if (/teach|framework|deep dive|project|mentor/.test(detail)) ynScore += 10;
        score = Math.min(100, Math.round(hrs*2 + ynScore));
    }
    else {
        score = 25 + Math.floor(Math.random()*50);
    }
    skillObj.score = score;
    skillObj.blog = elements.blog.value;
    skillObj.proofs = Array.from(elements.proofInput.files).map(f => f.name);
    updateButtonDisplay(selectedSkillIndex);
    const rank = getRank(score, skillName);
    elements.recommendations.innerHTML = `
        <strong>Your Ranking:</strong> ${rank.name} (${score}/100)<br>
        <em>${rank.desc}</em>
    `;
    elements.saveMsg.textContent = "Progress saved!";
    elements.output.innerHTML = `
        <strong>Blog:</strong> ${skillObj.blog ? skillObj.blog.replace(/\n/g,'<br>') : '(none)'}<br>
        <strong>Proof files:</strong> ${skillObj.proofs.length ? skillObj.proofs.join(', ') : '(none)'}
    `;
};

elements.closeBtn.onclick = () => elements.modalBg.style.display = 'none';

// --- MAIN NEW BUTTON RENDERING ---
function createButtons() {
    elements.grid.innerHTML = "";
    SKILL_DATA.forEach((skill, index) => {
        const wrapper = document.createElement('div');
        wrapper.className = 'square-skill-box';
        wrapper.setAttribute('data-index', index);

        const inner = document.createElement('div');
        inner.className = 'inner-square';

        wrapper.appendChild(inner);
        elements.grid.appendChild(wrapper);

        updateButtonDisplay(index);

        wrapper.onclick = () => openSkillModal(index);
    });
}
createButtons();

// Save/Load functionality
function base64UrlEncode(str) {
    return btoa(unescape(encodeURIComponent(str)))
        .replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}
function base64UrlDecode(str) {
    str = str.replace(/-/g, "+").replace(/_/g, "/");
    while (str.length % 4) str += "=";
    return decodeURIComponent(escape(atob(str)));
}
function getAppState() {
    return skillsData;
}
function restoreAppWith(state) {
    if (!Array.isArray(state) || state.length !== skillsData.length) return;
    for (let i = 0; i < SKILL_DATA.length; ++i) {
        skillsData[i] = Object.assign({}, skillsData[i], state[i]);
        updateButtonDisplay(i);
    }
}

elements.saveLinkBtn.onclick = function() {
    const json = JSON.stringify(getAppState());
    const encoded = base64UrlEncode(json);
    const url = `${location.origin}${location.pathname}#data=${encoded}`;
    elements.saveLinkField.value = url;
    elements.saveLinkModal.style.display = "flex";
    elements.saveLinkField.select();
};
document.getElementById("copyLinkBtn").onclick = function() {
    elements.saveLinkField.select();
    document.execCommand && document.execCommand('copy');
    this.textContent = "Copied!";
    setTimeout(() => { this.textContent = "Copy"; }, 1500);
};
document.getElementById("openLinkBtn").onclick = function() {
    window.open(elements.saveLinkField.value, '_blank');
};
document.getElementById("closeSaveModalBtn").onclick = function() {
    elements.saveLinkModal.style.display = "none";
};

elements.loadLinkBtn.onclick = function() {
    elements.loadLinkField.value = "";
    elements.loadLinkModal.style.display = "flex";
    elements.loadLinkStatus.textContent = "";
    elements.loadLinkField.focus();
};
elements.closeLoadModalBtn.onclick = function() {
    elements.loadLinkModal.style.display = "none";
    elements.loadLinkField.value = "";
    elements.loadLinkStatus.textContent = "";
};
elements.submitLoadBtn.onclick = function() {
    const val = elements.loadLinkField.value.trim();
    elements.loadLinkStatus.textContent = "";
    let m = val.match(/#data=([^#]+)/);
    let hashData = m ? m[1] : (val.match(/^[-\w_=]+$/) ? val : null);
    if (!hashData) {
        elements.loadLinkStatus.textContent = "Not a valid save link. Paste the full link or just the data part.";
        return;
    }
    try {
        const decoded = base64UrlDecode(hashData);
        const state = JSON.parse(decoded);
        restoreAppWith(state);
        elements.loadLinkModal.style.display = "none";
        elements.loadLinkField.value = "";
        elements.loadLinkStatus.textContent = "";
        alert("Progress loaded! The current page will now reflect your saved data.");
    } catch(e) {
        elements.loadLinkStatus.textContent = "Failed to load data from link. Data may be corrupt or outdated.";
    }
};

// Restore from #data= if present
window.addEventListener("DOMContentLoaded", function() {
    const m = location.hash.match(/^#data=(.+)$/);
    if (m) {
        try {
            const decoded = base64UrlDecode(m[1]);
            const state = JSON.parse(decoded);
            restoreAppWith(state);
        } catch (e) {
            alert("Could not restore your save data from the URL. It may be corrupt or outdated.");
        }
    }
});
</script>