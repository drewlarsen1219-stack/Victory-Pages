document.addEventListener('DOMContentLoaded', function() {

    // --- INITIALIZE:    Close side columns on page load ---
    const paracleteContent = document.getElementById('paraclete-content');
    const pagesContent = document.getElementById('pages-content');
    
    if (paracleteContent) {
        paracleteContent. classList.add('hidden-content');
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

    // --- SKILL DATA FOR GRID (13 skills now) ---
    const SKILL_DATA = [
        { name: 'Body', symbol: '💪' },
        { name: 'Mind', symbol: '🧠' },
        { name: 'Heart', symbol: '❤️' },
        { name: 'Hand', symbol: '✍️' },
        { name:  'Finance', symbol: '💰' },
        { name: 'Soul', symbol: '⚓' },
        { name: 'Vitality', symbol: '🍇' },
        { name:  'Status', symbol: '👑' },
        { name:  'Space', symbol: '🏠' },
        { name:  'Time', symbol: '⏳' },
        { name: 'World', symbol: '🌏' },
        { name: 'Creative', symbol: '🎨' },
        { name: 'Tech', symbol: '⚙️' }
    ];

    const TOTAL_SKILLS = 13;

    let skillsData = SKILL_DATA.map(skill => ({
        name: skill.name,
        symbol: skill.symbol,
        score: 0,
        completed:  false
    }));

    // --- ALL ASSESSMENT QUESTIONS BY CATEGORY ---
    const allAssessments = {
        // 0: BODY
        0: {
            title: "Body Assessment",
            questions: [
                { id: 1, text: "How many days per week do you engage in 30+ minutes of intentional physical activity?", type: "select", options: [0, 1, 2, 3, 4, 5, 6, 7], weight: 10 },
                { id: 2, text: "Do you consistently get at least 7 hours of sleep per night?", type: "yn", weight: 10 },
                { id: 3, text: "Do you currently experience chronic joint or muscle pain that limits training?", type: "yn", weight: 8, reverse: true },
                { id: 4, text: "Do you actively manage stress (meditation, journaling, regular breaks, etc.)?", type: "yn", weight: 7 },
                { id: 5, text: "Do you eat mostly whole, minimally processed foods?", type: "yn", weight: 10 },
                { id: 6, text: "Do you drink mostly water (limiting soda and alcohol)?", type: "yn", weight: 8 },
                { id: 7, text:  "How many servings of vegetables/fruit do you eat per day?", type: "select", options: [0, 1, 2, 3, 4, 5], weight: 7 },
                { id: 8, text: "Do you take a daily multivitamin or essential supplement?", type: "yn", weight: 3 },
                { id: 9, text: "Do you take time for active recovery at least 2x per week?", type: "yn", weight: 5 },
                { id: 10, text: "Do you track calories, macros, or portions? ", type: "yn", weight:  5 },
                { id: 11, text: "Do you follow a structured, progressive workout program?", type: "yn", weight: 6 },
                { id: 12, text: "Rate your performance relative to peers (1=Poor, 5=Elite):", type: "select", options:  [1, 2, 3, 4, 5], weight: 5 },
                { id: 13, text: "Do you track your workout progress (weights, reps, RPE)?", type: "yn", weight: 4 },
                { id: 14, text: "Do you actively test and try to improve your mobility?", type: "yn", weight: 3 },
                { id: 15, text: "Do you regularly hit plateaus and overcome them?", type: "yn", weight: 3 },
                { id: 16, text: "Do you mentor or teach others about fitness?", type: "yn", weight: 2 },
                { id: 17, text: "Rate your current energy levels (1=Low, 5=High):", type: "select", options: [1, 2, 3, 4, 5], weight: 5 }
            ]
        },
        // 1: MIND
        1: {
            title: "Mind Assessment",
            questions: [
                { id: 1, text: "How many books or educational resources do you consume per month?", type: "select", options: [0, 1, 2, 3, 4, 5], weight: 10 },
                { id: 2, text:  "Do you actively learn new skills or subjects?", type: "yn", weight: 10 },
                { id: 3, text: "Do you struggle with focus or concentration?", type:  "yn", weight: 8, reverse: true },
                { id: 4, text: "Do you practice critical thinking when consuming information?", type: "yn", weight: 7 },
                { id: 5, text:  "Do you engage in mentally stimulating activities (puzzles, strategy games, etc.)?", type: "yn", weight: 6 },
                { id: 6, text: "Do you take notes or journal to process your thoughts?", type: "yn", weight: 5 },
                { id: 7, text:  "How would you rate your memory retention (1=Poor, 5=Excellent)?", type: "select", options: [1, 2, 3, 4, 5], weight: 7 },
                { id: 8, text: "Do you limit mindless screen time (social media, TV)?", type: "yn", weight:  8 },
                { id: 9, text: "Do you seek out perspectives different from your own?", type: "yn", weight: 6 },
                { id: 10, text:  "Do you have a system for organizing information and ideas?", type: "yn", weight: 5 },
                { id: 11, text:  "Rate your problem-solving ability (1=Poor, 5=Excellent):", type: "select", options: [1, 2, 3, 4, 5], weight: 8 },
                { id: 12, text: "Do you regularly challenge your own assumptions and beliefs?", type: "yn", weight: 6 }
            ]
        },
        // 2: HEART
        2: {
            title: "Heart Assessment",
            questions: [
                { id: 1, text: "Do you have deep, meaningful relationships with family or friends?", type: "yn", weight: 10 },
                { id: 2, text:  "Do you express gratitude regularly?", type: "yn", weight: 7 },
                { id: 3, text: "Do you struggle with anger or resentment?", type: "yn", weight: 8, reverse:  true },
                { id: 4, text: "Do you forgive others when they wrong you?", type: "yn", weight: 9 },
                { id: 5, text: "Do you show compassion to those in need?", type: "yn", weight: 8 },
                { id: 6, text:  "How often do you check in on loved ones per week?", type: "select", options: [0, 1, 2, 3, 4, 5, 6, 7], weight: 7 },
                { id: 7, text: "Do you practice active listening in conversations?", type: "yn", weight: 6 },
                { id: 8, text:  "Do you experience frequent loneliness? ", type: "yn", weight:  7, reverse: true },
                { id: 9, text: "Do you celebrate others' successes genuinely?", type: "yn", weight: 5 },
                { id: 10, text: "Rate your emotional awareness (1=Poor, 5=Excellent):", type: "select", options: [1, 2, 3, 4, 5], weight: 8 },
                { id: 11, text: "Do you apologize when you are wrong?", type: "yn", weight: 7 },
                { id: 12, text: "Do you feel loved and supported by others?", type: "yn", weight: 8 }
            ]
        },
        // 3: HAND
        3: {
            title: "Hand Assessment (Skills & Craftsmanship)",
            questions: [
                { id: 1, text: "Do you have a practical skill you actively develop (woodworking, cooking, coding, etc.)?", type: "yn", weight: 10 },
                { id: 2, text: "How many hours per week do you spend practicing a craft or skill?", type: "select", options: [0, 1, 2, 3, 4, 5, 6, 7], weight: 9 },
                { id: 3, text: "Can you perform basic home repairs? ", type: "yn", weight:  6 },
                { id: 4, text: "Do you create things with your hands regularly?", type: "yn", weight: 8 },
                { id: 5, text: "Do you take pride in the quality of your work?", type:  "yn", weight: 7 },
                { id: 6, text: "Rate your proficiency in your primary skill (1=Beginner, 5=Expert):", type: "select", options: [1, 2, 3, 4, 5], weight: 10 },
                { id: 7, text: "Do you teach your skills to others?", type: "yn", weight: 5 },
                { id: 8, text: "Do you finish projects you start?", type: "yn", weight: 8 },
                { id: 9, text: "Do you invest in tools or resources to improve your craft?", type: "yn", weight: 5 },
                { id: 10, text: "Can you cook a healthy meal from scratch?", type: "yn", weight: 6 },
                { id: 11, text: "Do you seek feedback to improve your work?", type: "yn", weight: 6 },
                { id: 12, text: "How many distinct practical skills do you possess?", type: "select", options: [0, 1, 2, 3, 4, 5], weight: 7 }
            ]
        },
        // 4: FINANCE
        4: {
            title: "Finance Assessment",
            questions: [
                { id: 1, text: "Do you have a monthly budget that you follow?", type: "yn", weight: 10 },
                { id: 2, text: "Do you have an emergency fund covering 3+ months of expenses?", type: "yn", weight: 10 },
                { id: 3, text: "Do you carry credit card debt month to month?", type: "yn", weight: 9, reverse: true },
                { id: 4, text: "Do you contribute to retirement savings regularly?", type: "yn", weight: 9 },
                { id: 5, text: "Do you track your spending? ", type: "yn", weight:  7 },
                { id: 6, text: "Do you tithe or give charitably?", type: "yn", weight: 8 },
                { id: 7, text: "Rate your financial stress level (1=Very Stressed, 5=No Stress):", type: "select", options: [1, 2, 3, 4, 5], weight: 8 },
                { id: 8, text: "Do you have financial goals written down?", type: "yn", weight: 6 },
                { id: 9, text:  "Do you live below your means?", type: "yn", weight: 9 },
                { id: 10, text: "Do you understand basic investing principles?", type: "yn", weight: 5 },
                { id: 11, text: "Do you have life insurance or estate planning in place?", type: "yn", weight: 5 },
                { id: 12, text: "How many sources of income do you have?", type: "select", options: [0, 1, 2, 3, 4, 5], weight: 6 }
            ]
        },
        // 5: SOUL (Justification/Faith)
        5: {
            title: "Soul Assessment (Faith & Justification)",
            questions: [
                { id: 1, text: "Do you trust in Jesus Christ alone for the forgiveness of your sins?", type: "yn", weight: 100 },
                { id: 2, text: "Which best describes your religious/spiritual background?", type: "select", options: ["None", "Christian", "Jewish", "Muslim", "Buddhist", "Hindu", "Other"], weight: 0, informational: true },
				{ id: 3, text: "Do you attend religious services or gatherings?", type: "yn", weight: 0, informational: true },
                { id: 4, text: "Do you practice meditation or contemplative prayer?", type: "yn", weight: 0, informational: true },
                { id: 5, text: "Do you read religious or spiritual texts? ", type: "yn", weight:  0, informational: true },
                { id: 6, text: "Do you believe in an afterlife?", type: "yn", weight: 0, informational: true },
                { id: 7, text: "Do you pray or communicate with a higher power?", type: "yn", weight: 0, informational: true },
                { id: 8, text: "Do you feel a sense of spiritual peace in your life?", type: "yn", weight: 0, informational: true },
                { id: 9, text: "Have you been baptized? ", type: "yn", weight:  0, informational: true },
                { id: 10, text: "Do you participate in communion/Lord's Supper?", type:  "yn", weight: 0, informational: true },
                { id: 11, text: "Do you belong to a specific denomination or faith tradition?", type: "yn", weight: 0, informational:  true },
                { id: 12, text: "Do you discuss spiritual matters with others?", type: "yn", weight: 0, informational: true }
            ]
        },
        // 6: VITALITY (Sanctification)
        6: {
            title: "Vitality Assessment (Sanctification)",
            questions: [
                { id: 1, text: "Do you regularly hear or read God's Word (Scripture)?", type: "yn", weight: 10 },
                { id: 2, text:  "Do you attend Divine Service to receive the Word and Sacraments?", type:  "yn", weight: 10 },
                { id: 3, text: "Do you repent of your sins and trust God's promise of forgiveness?", type: "yn", weight: 9 },
                { id: 4, text: "Do you believe that in the Lord's Supper you receive the true Body and Blood of Christ?", type:  "yn", weight: 10 },
                { id: 5, text: "Do you seek to live according to God's Ten Commandments out of love for Him?", type: "yn", weight: 10 },
                { id: 6, text: "Do you confess your sins and receive absolution?", type: "yn", weight: 8 },
                { id: 7, text:  "Do you serve your neighbor in your daily vocations (work, family, community)?", type: "yn", weight: 8 },
                { id: 8, text: "Do you pray regularly, casting your anxieties on Him?", type: "yn", weight: 8 },
                { id: 9, text: "Do you share the hope of the Gospel with others when given the opportunity?", type: "yn", weight: 6 },
                { id: 10, text: "Do you practice Sabbath rest and rely on God's provision rather than your own effort?", type: "yn", weight: 7 },
                { id: 11, text: "Do you trust God's promises even when your feelings or circumstances are troubled?", type: "yn", weight: 9 },
                { id: 12, text: "Do you find joy in the fact that your name is written in the Book of Life?", type: "yn", weight: 8 }
            ]
        },
        // 7: STATUS
        7: {
            title:  "Status Assessment (Reputation & Influence)",
            questions:  [
                { id: 1, text: "Do people seek your advice or counsel?", type: "yn", weight: 9 },
                { id: 2, text: "Do you have a good reputation in your community?", type:  "yn", weight: 10 },
                { id: 3, text: "Do you gossip or speak negatively about others?", type:  "yn", weight: 8, reverse: true },
                { id: 4, text: "Do you keep your commitments and promises?", type: "yn", weight: 10 },
                { id: 5, text: "Do you lead or mentor others?", type: "yn", weight: 8 },
                { id: 6, text:  "Rate your influence in your workplace or community (1=None, 5=Significant):", type: "select", options: [1, 2, 3, 4, 5], weight: 7 },
                { id: 7, text: "Do you act with integrity even when no one is watching?", type: "yn", weight: 10 },
                { id: 8, text: "Do you receive recognition for your contributions?", type: "yn", weight: 5 },
                { id: 9, text: "Do you build others up with your words? ", type: "yn", weight:  7 },
                { id: 10, text: "Do you take responsibility for your mistakes publicly?", type: "yn", weight: 8 },
                { id: 11, text: "Are you respected by your peers?", type: "yn", weight: 7 },
                { id: 12, text: "Do you use your influence to help others?", type: "yn", weight: 8 }
            ]
        },
        // 8: SPACE
        8: {
            title:  "Space Assessment (Home & Environment)",
            questions: [
                { id: 1, text: "Is your living space clean and organized?", type: "yn", weight: 10 },
                { id: 2, text: "Do you own your home or have stable housing?", type: "yn", weight: 8 },
                { id: 3, text: "Does clutter stress you out in your home?", type: "yn", weight: 6, reverse: true },
                { id: 4, text: "Do you have a dedicated workspace for productivity?", type: "yn", weight: 7 },
                { id: 5, text: "Is your home a place of peace and rest?", type: "yn", weight: 9 },
                { id: 6, text: "Do you maintain your home regularly (repairs, cleaning)?", type: "yn", weight: 8 },
                { id: 7, text: "Rate your satisfaction with your living situation (1=Poor, 5=Excellent):", type: "select", options: [1, 2, 3, 4, 5], weight:  9 },
                { id: 8, text: "Do you have outdoor space or access to nature?", type: "yn", weight: 5 },
                { id: 9, text: "Is your home welcoming for guests?", type: "yn", weight: 6 },
                { id: 10, text: "Do you feel safe in your neighborhood?", type: "yn", weight: 8 },
                { id: 11, text: "Do you regularly declutter and simplify your possessions?", type: "yn", weight: 7 },
                { id: 12, text:  "Is your bedroom optimized for quality sleep?", type: "yn", weight: 7 }
            ]
        },
        // 9: TIME
        9: {
            title: "Time Assessment (Productivity & Stewardship)",
            questions: [
                { id: 1, text: "Do you use a calendar or planner to manage your time?", type: "yn", weight: 9 },
                { id: 2, text: "Do you often feel rushed or behind schedule?", type: "yn", weight: 8, reverse: true },
                { id: 3, text: "Do you set daily priorities and accomplish them?", type: "yn", weight: 10 },
                { id: 4, text: "Do you waste significant time on unproductive activities?", type: "yn", weight: 8, reverse: true },
                { id: 5, text: "Do you have a morning routine? ", type: "yn", weight:  7 },
                { id: 6, text: "Rate your punctuality (1=Always Late, 5=Always On Time):", type: "select", options: [1, 2, 3, 4, 5], weight: 7 },
                { id: 7, text: "Do you schedule time for rest and recreation?", type: "yn", weight: 8 },
                { id: 8, text: "Do you batch similar tasks together for efficiency?", type: "yn", weight: 5 },
                { id: 9, text: "Do you say no to commitments that don't align with your priorities?", type: "yn", weight: 8 },
                { id: 10, text: "Do you review your week and plan ahead?", type: "yn", weight: 7 },
                { id: 11, text: "How many hours of productive work do you accomplish daily?", type: "select", options: [0, 1, 2, 3, 4, 5, 6, 7, 8], weight: 9 },
                { id: 12, text: "Do you protect time for your most important relationships?", type: "yn", weight: 9 }
            ]
        },
        // 10: WORLD
        10: {
            title: "World Assessment (Community & Impact)",
            questions: [
                { id: 1, text:  "Do you volunteer or serve in your community?", type: "yn", weight: 10 },
                { id: 2, text: "Do you vote and participate in civic duties?", type: "yn", weight: 6 },
                { id: 3, text: "Do you feel disconnected from your local community?", type: "yn", weight: 7, reverse: true },
                { id: 4, text: "Do you support local businesses? ", type: "yn", weight:  5 },
                { id: 5, text: "Do you know your neighbors?", type: "yn", weight: 7 },
                { id: 6, text: "How many hours per month do you give to serving others?", type: "select", options: [0, 1, 2, 3, 4, 5, 6, 7, 8], weight: 9 },
                { id: 7, text: "Do you donate to causes you believe in?", type: "yn", weight: 8 },
                { id: 8, text:  "Do you stay informed about current events?", type: "yn", weight: 5 },
                { id: 9, text: "Do you advocate for justice and righteousness?", type: "yn", weight: 8 },
                { id: 10, text: "Do you participate in a church or community group?", type: "yn", weight: 9 },
                { id: 11, text: "Rate your impact on those around you (1=None, 5=Significant):", type: "select", options: [1, 2, 3, 4, 5], weight: 8 },
                { id: 12, text: "Do you pray for or actively support missionaries or global causes?", type: "yn", weight: 6 }
            ]
        },
        // 11: CREATIVE
        11: {
            title: "Creative Assessment",
            questions: [
                { id: 1, text: "Do you engage in creative activities regularly (art, music, writing, etc.)?", type: "yn", weight: 10 },
                { id: 2, text: "How many hours per week do you spend on creative pursuits?", type: "select", options: [0, 1, 2, 3, 4, 5, 6, 7], weight: 9 },
                { id: 3, text:  "Do you feel creatively blocked or uninspired?", type: "yn", weight: 7, reverse: true },
                { id: 4, text: "Do you share your creative work with others?", type: "yn", weight: 6 },
                { id: 5, text: "Do you try new creative mediums or techniques?", type: "yn", weight: 7 },
                { id: 6, text: "Rate your creative confidence (1=None, 5=Very Confident):", type: "select", options: [1, 2, 3, 4, 5], weight: 8 },
                { id: 7, text: "Do you find creative solutions to problems?", type:  "yn", weight: 8 },
                { id: 8, text: "Do you appreciate and consume art, music, or literature?", type:  "yn", weight: 5 },
                { id: 9, text: "Do you have completed creative projects you're proud of?", type: "yn", weight: 8 },
                { id: 10, text: "Do you collaborate creatively with others?", type: "yn", weight: 5 },
                { id: 11, text: "Do you use creativity to glorify God or serve others?", type: "yn", weight: 9 },
                { id: 12, text: "Do you make time for creative play without pressure?", type: "yn", weight: 6 }
            ]
        },
        // 12: TECH
        12: {
            title: "Tech Assessment (Digital Literacy & Tools)",
            questions: [
                { id: 1, text:  "Are you comfortable using computers and smartphones?", type: "yn", weight: 8 },
                { id: 2, text: "Do you use technology to increase your productivity?", type: "yn", weight: 9 },
                { id: 3, text: "Do you feel overwhelmed or controlled by technology?", type: "yn", weight: 8, reverse: true },
                { id: 4, text: "Do you practice good digital security (passwords, backups)?", type: "yn", weight: 7 },
                { id: 5, text:  "Can you troubleshoot basic tech problems?", type: "yn", weight: 6 },
                { id: 6, text:  "Rate your tech proficiency (1=Novice, 5=Expert):", type: "select", options: [1, 2, 3, 4, 5], weight:  8 },
                { id: 7, text: "Do you learn new apps or tools when they could help you?", type: "yn", weight: 7 },
                { id: 8, text: "Do you set boundaries on your technology use?", type: "yn", weight: 9 },
                { id: 9, text: "Do you use technology to connect with others meaningfully?", type: "yn", weight: 6 },
                { id: 10, text: "Do you stay updated on relevant technology trends?", type: "yn", weight: 5 },
                { id: 11, text: "Do you use technology to grow spiritually (apps, podcasts, etc.)?", type: "yn", weight: 7 },
                { id: 12, text: "Can you identify and avoid online scams and misinformation?", type: "yn", weight: 7 }
            ]
        }
    };

    let currentCategory = 0;
    let currentStep = 0;
    let userAnswers = {};
    const quizContainer = document.getElementById('quiz-container');

    // --- SAVE/LOAD FUNCTIONS ---
    
    // Generate a save code from current scores
    window.generateSaveCode = function() {
        const scores = skillsData. map(s => s.score);
        const completed = skillsData.map(s => s.completed ?  1 : 0);
        const saveData = {
            v:  2, // Version 2 for 13 skills
            s: scores,
            c: completed,
            d: Date.now()
        };
        const jsonStr = JSON.stringify(saveData);
        const base64 = btoa(jsonStr);
        return 'VP-' + base64;
    };
    
    // Load scores from a save code
    window.loadFromSaveCode = function(code) {
        try {
            if (! code. startsWith('VP-')) {
                return { success: false, error: 'Invalid code format' };
            }
            const base64 = code.substring(3);
            const jsonStr = atob(base64);
            const saveData = JSON.parse(jsonStr);
            
            if (! saveData.s || saveData.s.length !== TOTAL_SKILLS) {
                return { success: false, error: 'Invalid save data' };
            }
            
            // Load scores and completed status into skillsData
            saveData.s.forEach((score, index) => {
                if (index < skillsData.length) {
                    skillsData[index].score = Math.min(100, Math.max(0, parseInt(score) || 0));
                    skillsData[index].completed = saveData.c ?  saveData.c[index] === 1 : (score > 0);
                }
            });
            
            const saveDate = saveData.d ?  new Date(saveData.d).toLocaleDateString() : 'Unknown';
            return { success: true, date: saveDate };
        } catch (e) {
            return { success:  false, error: 'Could not parse save code' };
        }
    };
    
    // Save to localStorage
    window.saveToLocalStorage = function() {
        const saveCode = generateSaveCode();
        localStorage. setItem('victoryPagesProgress', saveCode);
        return saveCode;
    };
    
    // Load from localStorage
    window.loadFromLocalStorage = function() {
        const savedCode = localStorage.getItem('victoryPagesProgress');
        if (savedCode) {
            return loadFromSaveCode(savedCode);
        }
        return { success: false, error: 'No saved data found' };
    };
    
    // Get incomplete categories
    window.getIncompleteCategories = function() {
        const incomplete = [];
        skillsData.forEach((skill, index) => {
            if (!skill.completed) {
                incomplete.push(index);
            }
        });
        return incomplete;
    };
    
    // Find first incomplete category
    window.getFirstIncompleteCategory = function() {
        for (let i = 0; i < skillsData.length; i++) {
            if (!skillsData[i]. completed) {
                return i;
            }
        }
        return -1; // All complete
    };

    // --- SHOW SAVE SCREEN ---
    window.showSaveScreen = function() {
        const saveCode = generateSaveCode();
        
        // Also save to localStorage automatically
        saveToLocalStorage();
        
        quizContainer.innerHTML = `
            <div style="text-align: center; padding: 15px;">
                <h3 style="color: black;">💾 Save Your Progress</h3>
                <hr style="margin: 10px 0;">
                
                <p style="color: black; font-size: 0.9rem; margin-bottom: 10px;">Your progress has been saved to this browser automatically.</p>
                
                <p style="color: black; font-size: 0.9rem; margin-bottom: 5px;"><strong>Copy this code to restore on any device:</strong></p>
                
                <textarea id="save-code-display" readonly style="width: 100%; height: 60px; font-family: monospace; font-size: 0.75rem; padding: 8px; margin:  10px 0; resize: none; background: #f5f5f5; border: 2px inset #ccc;">${saveCode}</textarea>
                
                <button onclick="copySaveCode()" class="classic-3d-button" style="margin:  5px;">📋 Copy Code</button>
                <button onclick="downloadSaveFile()" class="classic-3d-button" style="margin: 5px;">💾 Download File</button>
                
                <hr style="margin: 15px 0;">
                
                <button onclick="location.reload()" class="classic-3d-button" style="margin-top: 10px;">← Return Home</button>
            </div>
        `;
        
        // Hide nav buttons
        const nextBtn = document.getElementById('next-btn');
        const backBtn = document.getElementById('back-btn');
        if (nextBtn) nextBtn.style.display = 'none';
        if (backBtn) backBtn.style.display = 'none';
    };
    
    // Copy save code to clipboard
    window.copySaveCode = function() {
        const textarea = document.getElementById('save-code-display');
        textarea.select();
        document.execCommand('copy');
        alert('Save code copied to clipboard!');
    };
    
    // Download save as a text file
    window.downloadSaveFile = function() {
        const saveCode = document.getElementById('save-code-display').value;
        const blob = new Blob([saveCode], { type: 'text/plain' });
        const url = URL. createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'victory-pages-save-' + new Date().toISOString().split('T')[0] + '.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    // --- 2.  THE MASTER HIDE FUNCTION ---
    window.hideSideColumns = function() {
        const paraclete = document.getElementById('paraclete-content');
        const pages = document.getElementById('pages-content');
        
        if (paraclete) {
            paraclete.classList.add('hidden-content');
            paraclete.style.display = 'none';
        }
        if (pages) {
            pages. classList.add('hidden-content');
            pages.style.display = 'none';
        }

        const pBtn = document.getElementById('paraclete-content-toggle');
        const pgBtn = document.getElementById('pages-content-toggle');
        if (pBtn) pBtn.innerHTML = 'Open ▼';
        if (pgBtn) pgBtn.innerHTML = 'Open ▼';

        const pImg = document.getElementById('paraclete-closed-image');
        const pgImg = document.getElementById('pages-closed-image');
        if (pImg) pImg.style.display = 'none';
        if (pgImg) pgImg.style.display = 'none';
    };

    // --- 2B. THE MASTER SHOW FUNCTION ---
    window.showSideColumns = function() {
        const paraclete = document.getElementById('paraclete-content');
        const pages = document.getElementById('pages-content');
        
        if (paraclete) {
            paraclete.classList.add('hidden-content');
            paraclete.style.display = 'none';
        }
        if (pages) {
            pages.classList.add('hidden-content');
            pages.style.display = 'none';
        }

        const pBtn = document. getElementById('paraclete-content-toggle');
        const pgBtn = document.getElementById('pages-content-toggle');
        if (pBtn) pBtn.innerHTML = 'Open ▼';
        if (pgBtn) pgBtn.innerHTML = 'Open ▼';

        const pImg = document. getElementById('paraclete-closed-image');
        const pgImg = document.getElementById('pages-closed-image');
        if (pImg) pImg.style.display = 'block';
        if (pgImg) pgImg.style.display = 'block';
    };

    // --- SHOW SKILL GRID IN PARACLETE ---
    window.showSkillGrid = function() {
        const paracleteContent = document.getElementById('paraclete-content');
        if (!paracleteContent) return;
        
        paracleteContent.classList.remove('hidden-content');
        paracleteContent.style.display = 'block';
        
        const pBtn = document.getElementById('paraclete-content-toggle');
        if (pBtn) pBtn.innerHTML = 'Close ▲';
        
        const pImg = document.getElementById('paraclete-closed-image');
        if (pImg) pImg.style.display = 'none';
        
        // Calculate overall score
        const totalScore = skillsData.reduce((sum, skill) => sum + skill.score, 0);
        const overallScore = Math.round(totalScore / TOTAL_SKILLS);
        
        // Create grid content using current skillsData scores
        paracleteContent.innerHTML = `
            <p style="text-align: center; font-weight: bold; color: black; margin:  5px 0; font-size: 0.85rem;">Skills Tracker</p>
            <p style="text-align: center; color: black; margin: 2px 0; font-size:  0.75rem;">Overall: <strong>${overallScore}/100</strong></p>
            <hr style="margin: 5px 0;">
            <div id="skill-grid" style="display: flex; flex-direction: column; gap: 3px; padding: 5px; flex:  1; justify-content: space-evenly;">
                ${SKILL_DATA.map((skill, index) => `
                    <div class="skill-grid-item retro-inset-panel" data-index="${index}" style="padding: 4px; display: flex; align-items: center; justify-content: space-between; cursor: pointer; flex:  1; ${currentCategory === index ? 'background-color: #B8B8B8; border-color: #606060;' : ''}">
                        <div style="display: flex; align-items: center; gap: 6px; flex: 1;">
                            <div style="font-size: 1rem; line-height: 1;">${skill.symbol}</div>
                            <div style="font-size: 0.7rem; font-weight: bold; color: black;">${skill.name}</div>
                        </div>
                        <div class="skill-score" style="font-size: 0.65rem; color: black; white-space: nowrap;">
                            ${skillsData[index].completed ? skillsData[index].score + '/100' : '---'}
                        </div>
                    </div>
                `).join('')}
            </div>
            <hr style="margin: 5px 0;">
            <div style="text-align: center; margin:  5px 0;">
                <button class="classic-3d-button" onclick="closeSkillGrid()" style="font-size: 0.75rem; padding: 4px 10px;">Back to Menu</button>
            </div>
        `;
        
        document.querySelectorAll('.skill-grid-item').forEach(item => {
            item.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                if (skillsData[index].completed) {
                    alert(`${SKILL_DATA[index].name}:  ${skillsData[index].score}/100`);
                } else {
                    alert(`${SKILL_DATA[index].name}: Not yet assessed`);
                }
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
        
        const pBtn = document.getElementById('paraclete-content-toggle');
        if (pBtn) pBtn.innerHTML = 'Open ▼';
        
        const pImg = document. getElementById('paraclete-closed-image');
        if (pImg) pImg.style.display = 'block';
    };

    // --- UPDATE ASSESSMENT TITLE ---
    function updateAssessmentTitle() {
        const titleEl = document.querySelector('#paths-finder-view > p');
        if (titleEl) {
            titleEl.innerHTML = `${SKILL_DATA[currentCategory].symbol} ${allAssessments[currentCategory].title} (${currentCategory + 1}/${TOTAL_SKILLS})`;
        }
    }

    // --- SHOW EXISTING USER SCREEN ---
    window.showExistingUserScreen = function() {
        hideSideColumns();
        
        document.getElementById('landing-screen').style.display = 'none';
        document.getElementById('paths-finder-view').style.display = 'block';
        
        // Hide nav buttons for this screen
        const nextBtn = document.getElementById('next-btn');
        const backBtn = document.getElementById('back-btn');
        if (nextBtn) nextBtn.style.display = 'none';
        if (backBtn) backBtn.style.display = 'none';
        
        // Update title
        const titleEl = document.querySelector('#paths-finder-view > p');
        if (titleEl) {
            titleEl.innerHTML = '🔑 Load Your Progress';
        }
        
        // Check for localStorage save first
        const localSave = loadFromLocalStorage();
        
        quizContainer.innerHTML = `
            <div style="text-align:  center; padding: 5px;">
                ${localSave.success ? `
                    <div style="background:  #d4edda; border: 2px solid #28a745; padding: 10px; margin: 10px 0;">
                        <p style="color: #155724; margin: 0;"><strong>✅ Found saved progress in this browser!</strong></p>
                        <p style="color: #155724; font-size: 0.85rem; margin: 5px 0;">Last saved: ${localSave.date}</p>
                        <button onclick="loadLocalAndShow()" class="classic-3d-button" style="margin-top: 10px; background-color: #90EE90;">Load Browser Save</button>
                    </div>
                    <hr style="margin: 15px 0;">
                    <p style="color: black; font-size: 0.9rem;"><strong>Or enter a save code:</strong></p>
                ` : `
                    <p style="color: black; font-size: 0.9rem; margin-bottom: 10px;">Enter your save code below to restore your progress:</p>
                `}
                
                <textarea id="load-code-input" placeholder="Paste your VP-...  save code here" style="width: 100%; height: 60px; font-family: monospace; font-size: 0.75rem; padding: 8px; margin: 10px 0; resize: none; border: 2px inset #ccc;"></textarea>
                
                <button onclick="loadFromCodeInput()" class="classic-3d-button" style="margin: 5px;">📥 Load from Code</button>
                <button onclick="loadFromFileUpload()" class="classic-3d-button" style="margin:  5px;">📁 Load from File</button>
                <input type="file" id="file-upload-input" accept=".txt" style="display: none;" onchange="handleFileUpload(event)">
                
                <div id="load-error-msg" style="color: red; margin-top: 10px; display: none;"></div>
                
                <hr style="margin: 15px 0;">
                
                <button onclick="backToLanding()" class="classic-3d-button">← Back</button>
            </div>
        `;
    };
    
    // Load from localStorage and show grid
    window.loadLocalAndShow = function() {
        const result = loadFromLocalStorage();
        if (result.success) {
            showLoadedProgressScreen(result.date);
        }
    };
    
    // Show loaded progress screen with options
    window.showLoadedProgressScreen = function(saveDate) {
        showSkillGrid();
        
        const incompleteCount = getIncompleteCategories().length;
        const completedCount = TOTAL_SKILLS - incompleteCount;
        
        let incompleteList = '';
        if (incompleteCount > 0) {
            const incomplete = getIncompleteCategories();
            incompleteList = incomplete.map(i => `${SKILL_DATA[i].symbol} ${SKILL_DATA[i].name}`).join(', ');
        }
        
        quizContainer.innerHTML = `
            <div style="text-align:  center; padding: 0px;">
                <p style="color: black;">Your skills have been restored from ${saveDate}. </p>
                <p style="color: black; font-size:  0.85rem; margin-top: 10px;">
                    <strong>${completedCount}/${TOTAL_SKILLS}</strong> assessments completed
                </p>
                
                ${incompleteCount > 0 ? `
                    <hr style="margin: 15px 0;">
                    <p style="color: black; font-size: 0.85rem;"><strong>Incomplete assessments:</strong></p>
                    <p style="color: #666; font-size: 0.8rem; margin: 5px 0;">${incompleteList}</p>
                    <button onclick="continueIncomplete()" class="classic-3d-button" style="margin:  10px; background-color: #90EE90;">
                        ▶ Continue Assessments (${incompleteCount} remaining)
                    </button>
                ` : `
                    <hr style="margin: 15px 0;">
                    <p style="color: green; font-size: 0.9rem;"><strong>🎉 All assessments complete!</strong></p>
                `}
                
                <hr style="margin: 15px 0;">
                <p style="color: black; font-size: 0.9rem;">Other options:</p>
                <button onclick="startRetake()" class="classic-3d-button" style="margin: 10px;">🔄 Retake All Assessments</button>
                <hr style="margin: 15px 0;">
                <button onclick="location.reload()" class="classic-3d-button">← Return Home</button>
            </div>
        `;
    };
    
    // Continue from first incomplete category
    window.continueIncomplete = function() {
        const firstIncomplete = getFirstIncompleteCategory();
        
        if (firstIncomplete === -1) {
            alert('All assessments are already complete!');
            return;
        }
        
        currentCategory = firstIncomplete;
        currentStep = 0;
        userAnswers = {};
        updateAssessmentTitle();
        showSkillGrid();
        renderQuestion();
        
        const nextBtn = document.getElementById('next-btn');
        const backBtn = document.getElementById('back-btn');
        if (nextBtn) nextBtn.style.display = 'inline-block';
        if (backBtn) backBtn.style.display = 'inline-block';
    };
    
    // Load from code input
    window.loadFromCodeInput = function() {
        const input = document.getElementById('load-code-input');
        const errorMsg = document.getElementById('load-error-msg');
        const code = input.value.trim();
        
        if (! code) {
            errorMsg.textContent = 'Please enter a save code. ';
            errorMsg.style.display = 'block';
            return;
        }
        
        const result = loadFromSaveCode(code);
        
        if (result.success) {
            // Save to localStorage too
            saveToLocalStorage();
            showLoadedProgressScreen(result.date);
        } else {
            errorMsg.textContent = result. error;
            errorMsg.style.display = 'block';
        }
    };
    
    // Trigger file upload
    window.loadFromFileUpload = function() {
        document.getElementById('file-upload-input').click();
    };
    
    // Handle file upload
    window.handleFileUpload = function(event) {
        const file = event.target.files[0];
        if (! file) return;
        
        const reader = new FileReader();
        reader.onload = function(e) {
            const code = e.target.result. trim();
            document.getElementById('load-code-input').value = code;
            loadFromCodeInput();
        };
        reader.readAsText(file);
    };
    
    // Start retaking assessments
    window.startRetake = function() {
        // Reset all completed flags
        skillsData.forEach(skill => {
            skill.score = 0;
            skill. completed = false;
        });
        
        currentCategory = 0;
        currentStep = 0;
        userAnswers = {};
        updateAssessmentTitle();
        showSkillGrid();
        renderQuestion();
        
        const nextBtn = document.getElementById('next-btn');
        const backBtn = document. getElementById('back-btn');
        if (nextBtn) nextBtn.style.display = 'inline-block';
        if (backBtn) backBtn.style.display = 'inline-block';
    };
    
    // Back to landing
    window.backToLanding = function() {
        document.getElementById('paths-finder-view').style.display = 'none';
        document.getElementById('landing-screen').style.display = 'block';
        showSideColumns();
    };

    // --- 3. BUTTONS ---
    const assessmentBtn = document.getElementById('open-assessment-btn');
    if (assessmentBtn) {
        assessmentBtn.addEventListener('click', function() {
            hideSideColumns();
            showSkillGrid();
            document.getElementById('paths-finder-view').style.display = 'block'; 
            document.getElementById('landing-screen').style.display = 'none';
            document.getElementById('paths-finder-view').scrollIntoView({ behavior: 'smooth' });
            currentCategory = 0;
            currentStep = 0;
            userAnswers = {};
            updateAssessmentTitle();
            renderQuestion();
            
            // Show buttons
            const nextBtn = document.getElementById('next-btn');
            const backBtn = document.getElementById('back-btn');
            if (nextBtn) nextBtn.style.display = 'inline-block';
            if (backBtn) backBtn.style.display = 'inline-block';
        });
    }

    window.openExistingUser = function() {
        showExistingUserScreen();
    };

    window.switchToMenu = function() {
        document. getElementById('paths-finder-view').style.display = 'none';
        document.getElementById('landing-screen').style.display = 'block';
        showSideColumns();
        closeSkillGrid();
    };

    // --- START NEXT CATEGORY ---
    window.startNextCategory = function() {
        // Find next incomplete category instead of just incrementing
        let nextCategory = currentCategory + 1;
        
        // Skip already completed categories
        while (nextCategory < TOTAL_SKILLS && skillsData[nextCategory].completed) {
            nextCategory++;
        }
        
        if (nextCategory >= TOTAL_SKILLS) {
            // All done
            finishAllAssessments();
            return;
        }
        
        currentCategory = nextCategory;
        currentStep = 0;
        userAnswers = {};
        updateAssessmentTitle();
        showSkillGrid();
        renderQuestion();
        
        const nextBtn = document.getElementById('next-btn');
        const backBtn = document. getElementById('back-btn');
        if (nextBtn) nextBtn.style.display = 'inline-block';
        if (backBtn) backBtn.style.display = 'inline-block';
    };

    // --- FINISH ALL ASSESSMENTS ---
    window.finishAllAssessments = function() {
        const totalScore = skillsData.reduce((sum, skill) => sum + skill.score, 0);
        const averageScore = Math.round(totalScore / TOTAL_SKILLS);
        
        // Auto-save to localStorage
        saveToLocalStorage();
        
        quizContainer.innerHTML = `
            <div style="text-align:  center; padding: 20px;">
                <h3 style="color: black">🎉 All Assessments Complete!  🎉</h3>
                <p style="color:  green; font-size: 0.85rem;">✅ Progress auto-saved to browser! </p>
                <hr style="margin: 15px 0;">
                <button onclick="showSaveScreen()" class="classic-3d-button" style="margin-top: 10px;">💾 Export Save Code</button>
                <button onclick="location.reload()" class="classic-3d-button" style="margin-top: 10px;">← Return Home</button>
            </div>
        `;
    };

    // --- 4. ASSESSMENT ENGINE ---
    function renderQuestion() {
        const currentQuestions = allAssessments[currentCategory].questions;
        const q = currentQuestions[currentStep];
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
                <div class="option"><input type="radio" name="q${q. id}" id="opt-n" value="no"><label for="opt-n">No</label></div>`;
        }

        quizContainer.innerHTML = `
            <p class="question-text"><strong>Q${currentStep + 1}/${currentQuestions.length}</strong> <br>${q.text}</p>
            <div class="options-group">${html}</div>`;
    }

    const nextBtn = document.getElementById('next-btn');
    const backBtn = document.getElementById('back-btn');
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const currentQuestions = allAssessments[currentCategory].questions;
            const q = currentQuestions[currentStep];
            
            const checked = quizContainer.querySelector('input:checked');
            userAnswers[q.id] = checked ? checked.value : null;

            if (currentStep < currentQuestions.length - 1) {
                currentStep++;
                renderQuestion();
            } else {
                showCategoryScore();
            }
        });
    }
    
    if (backBtn) {
        backBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (currentStep > 0) {
                currentStep--;
                renderQuestion();
                
                const currentQuestions = allAssessments[currentCategory].questions;
                const q = currentQuestions[currentStep];
                const previousAnswer = userAnswers[q.id];
                
                if (previousAnswer) {
                    const radio = quizContainer.querySelector(`input[value="${previousAnswer}"]`);
                    if (radio) radio.checked = true;
                }
            } else {
                switchToMenu();
            }
        });
    }

    function showCategoryScore() {
        const currentQuestions = allAssessments[currentCategory].questions;
        let total = 0;
        let earned = 0;
        
        currentQuestions.forEach(q => {
            if (q.weight > 0) {
                total += q.weight;
                const ans = userAnswers[q.id];
                
                if (! ans) return;
                
                if (q.type === 'yn') {
                    if (q.reverse) {
                        if (ans === 'no') earned += q.weight;
                    } else {
                        if (ans === 'yes') earned += q.weight;
                    }
                }
                
                if (q.type === 'select') {
                    const maxOption = Math.max(...q.options);
                    const minOption = Math.min(...q. options);
                    const range = maxOption - minOption;
                    const answerValue = parseInt(ans) - minOption;
                    const points = (q.weight * (answerValue / range));
                    earned += points;
                }
            }
        });

        const score = Math.round((earned / total) * 100);
        
        // UPDATE THE CURRENT SKILL SCORE AND MARK AS COMPLETED
        skillsData[currentCategory].score = score;
        skillsData[currentCategory]. completed = true;
        
        // Auto-save after each category
        saveToLocalStorage();
        
        // RE-RENDER THE GRID WITH NEW SCORE
        showSkillGrid();

        // Find next incomplete category
        let nextIncomplete = -1;
        for (let i = currentCategory + 1; i < TOTAL_SKILLS; i++) {
            if (!skillsData[i].completed) {
                nextIncomplete = i;
                break;
            }
        }
        
        // Check if all are complete
        const allComplete = getIncompleteCategories().length === 0;
        
        quizContainer.innerHTML = `
            <div style="text-align:  center; padding: 20px;">
                <h3 style="color: black">${SKILL_DATA[currentCategory].symbol} ${SKILL_DATA[currentCategory].name} Complete!</h3>
                <p style="color: green; font-size: 0.8rem;">✅ Progress auto-saved</p>
                <hr style="margin: 15px 0;">
                ${allComplete ? `
                    <p style="color: black; font-weight: bold;">🎉 All categories complete!</p>
                    <button onclick="finishAllAssessments()" class="classic-3d-button" style="margin-top: 15px; background-color: #90EE90;">View Final Results</button>
                ` : `
                    <p style="color: black;">Next up: <strong>${SKILL_DATA[nextIncomplete]. symbol} ${SKILL_DATA[nextIncomplete].name}</strong></p>
                    <button onclick="startNextCategory()" class="classic-3d-button" style="margin-top: 15px;">Continue to ${SKILL_DATA[nextIncomplete].name} →</button>
                `}
                <br>
                <button onclick="showSaveScreen()" class="classic-3d-button" style="margin-top: 10px;">💾 Save & Exit</button>
            </div>`;
        
        if (nextBtn) nextBtn.style.display = 'none';
        if (backBtn) backBtn.style.display = 'none';
    }
});

// Original Toggle logic
function toggleColumn(columnId) {
    const content = document.getElementById(columnId);
    const button = document.getElementById(columnId + '-toggle'); 
    const imageContainer = document.getElementById(columnId. split('-')[0] + '-closed-image');

    if (content.style.display === 'none' || content.classList.contains('hidden-content')) {
        content.classList.remove('hidden-content');
        content.style.display = 'block';
        if (button) button.innerHTML = button.innerHTML. replace('Open', 'Close').replace('▼', '▲');
        if (imageContainer) imageContainer.style.display = 'none'; 
    } else {
        content.classList.add('hidden-content');
        content.style.display = 'none';
        if (button) button.innerHTML = button.innerHTML.replace('Close', 'Open').replace('▲', '▼');
        if (imageContainer) imageContainer.style. display = 'block'; 
    }
}