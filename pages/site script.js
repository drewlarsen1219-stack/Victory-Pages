document.addEventListener('DOMContentLoaded', function() {

    // --- INITIALIZE:     Close side columns on page load ---
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
        { name: 'Status', symbol: '👑' },
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

    // --- PATHWAYS DATA ---
    const PATHWAYS_DATA = {
        // 0: BODY
        0: [
            {
                id: 'body_foundation',
                title: 'Foundation of Strength',
                description: 'Build basic physical habits that honor the temple God gave you.',
                difficulty: 'beginner',
                scoreThreshold: 40,
                tasks: [
                    { id:  'b1_1', text: 'Take a 20-minute walk today', completed: false },
                    { id: 'b1_2', text: 'Drink 8 glasses of water', completed: false },
                    { id: 'b1_3', text: 'Get to bed 30 minutes earlier', completed: false },
                    { id: 'b1_4', text:  'Do 10 bodyweight squats', completed: false },
                    { id: 'b1_5', text: 'Stretch for 5 minutes', completed: false }
                ],
                reward: 5,
                scriptureRef: '1 Corinthians 6:19-20',
                scriptureText: 'Do you not know that your bodies are temples of the Holy Spirit? '
            },
            {
                id: 'body_consistency',
                title: 'Consistent Movement',
                description: 'Build the habit of regular, intentional exercise.',
                difficulty: 'intermediate',
                scoreThreshold: 65,
                tasks: [
                    { id: 'b2_1', text: 'Exercise for 30 minutes, 3 times this week', completed: false },
                    { id: 'b2_2', text: 'Track your workouts in a journal or app', completed: false },
                    { id: 'b2_3', text: 'Try a new form of exercise', completed: false },
                    { id: 'b2_4', text: 'Stretch for 10 minutes after each workout', completed: false },
                    { id: 'b2_5', text: 'Get 7+ hours of sleep for 5 consecutive nights', completed: false }
                ],
                reward: 7,
                scriptureRef: '1 Timothy 4:8',
                scriptureText: 'For physical training is of some value, but godliness has value for all things.'
            }
        ],
        // 1: MIND
        1: [
            {
                id: 'mind_awakening',
                title: 'Mind Awakening',
                description:  'Begin cultivating a disciplined and curious mind.',
                difficulty: 'beginner',
                scoreThreshold:  40,
                tasks: [
                    { id: 'm1_1', text: 'Read for 15 minutes today', completed: false },
                    { id: 'm1_2', text: 'Write down 3 things you learned this week', completed: false },
                    { id: 'm1_3', text: 'Limit social media to 30 minutes today', completed: false },
                    { id: 'm1_4', text: 'Do a puzzle or brain game', completed: false },
                    { id: 'm1_5', text: 'Listen to an educational podcast', completed: false }
                ],
                reward: 5,
                scriptureRef: 'Proverbs 18:15',
                scriptureText: 'The heart of the discerning acquires knowledge, for the ears of the wise seek it out.'
            }
        ],
        // 2: HEART
        2: [
            {
                id: 'heart_connection',
                title: 'Heart Connection',
                description: 'Build and strengthen meaningful relationships.',
                difficulty: 'beginner',
                scoreThreshold:  40,
                tasks: [
                    { id: 'h1_1', text: 'Call or visit a family member today', completed: false },
                    { id: 'h1_2', text: 'Write down 5 things you are grateful for', completed: false },
                    { id: 'h1_3', text: 'Send an encouraging message to a friend', completed: false },
                    { id: 'h1_4', text: 'Practice active listening in your next conversation', completed: false },
                    { id: 'h1_5', text: 'Pray for someone who has wronged you', completed: false }
                ],
                reward: 5,
                scriptureRef: 'Proverbs 17:17',
                scriptureText: 'A friend loves at all times, and a brother is born for a time of adversity.'
            }
        ],
        // 3: HAND
        3: [
            {
                id: 'hand_basics',
                title: 'Skillful Hands',
                description: 'Begin developing practical skills.',
                difficulty: 'beginner',
                scoreThreshold:  40,
                tasks: [
                    { id: 'hd1_1', text: 'Cook a meal from scratch', completed: false },
                    { id: 'hd1_2', text: 'Fix something broken in your home', completed: false },
                    { id: 'hd1_3', text: 'Learn a new practical skill (YouTube tutorial)', completed: false },
                    { id: 'hd1_4', text: 'Organize a drawer or closet', completed: false },
                    { id: 'hd1_5', text:  'Complete a small DIY project', completed: false }
                ],
                reward: 5,
                scriptureRef: 'Proverbs 22:29',
                scriptureText: 'Do you see someone skilled in their work? They will serve before kings.'
            }
        ],
        // 4: FINANCE
        4: [
            {
                id: 'finance_foundation',
                title: 'Financial Foundation',
                description: 'Establish basic financial stewardship.',
                difficulty: 'beginner',
                scoreThreshold: 40,
                tasks: [
                    { id:  'f1_1', text: 'Track all spending for one week', completed: false },
                    { id: 'f1_2', text: 'Create a simple monthly budget', completed: false },
                    { id: 'f1_3', text: 'Identify one expense to cut or reduce', completed: false },
                    { id: 'f1_4', text: 'Set up automatic savings (even $10/week)', completed: false },
                    { id: 'f1_5', text: 'Give to your church or a charity this month', completed: false }
                ],
                reward: 5,
                scriptureRef: 'Proverbs 21:5',
                scriptureText: 'The plans of the diligent lead to profit as surely as haste leads to poverty.'
            }
        ],
        // 5: SOUL
        5: [
            {
                id: 'soul_foundation',
                title: 'Foundation of Faith',
                description: 'Ground yourself in the basics of Christian faith.',
                difficulty: 'beginner',
                scoreThreshold: 50,
                tasks: [
                    { id: 's1_1', text: 'Read the Gospel of John', completed: false },
                    { id: 's1_2', text: 'Learn the Apostles Creed', completed: false },
                    { id: 's1_3', text: 'Speak with a pastor about your faith questions', completed: false },
                    { id: 's1_4', text: 'Attend a church service this week', completed: false },
                    { id: 's1_5', text: 'Memorize John 3:16', completed: false }
                ],
                reward:  5,
                scriptureRef: 'Ephesians 2:8-9',
                scriptureText: 'For it is by grace you have been saved, through faith—and this is not from yourselves, it is the gift of God.'
            }
        ],
        // 6: VITALITY
        6: [
            {
                id: 'vitality_growth',
                title: 'Spiritual Growth',
                description: 'Develop daily spiritual disciplines.',
                difficulty: 'beginner',
                scoreThreshold:  40,
                tasks: [
                    { id: 'v1_1', text: 'Read Scripture for 10 minutes daily this week', completed: false },
                    { id: 'v1_2', text: 'Pray using the Lord\'s Prayer each morning', completed: false },
                    { id: 'v1_3', text: 'Attend church this Sunday', completed: false },
                    { id: 'v1_4', text: 'Confess a specific sin and receive forgiveness', completed: false },
                    { id: 'v1_5', text: 'Serve someone in your household today', completed: false }
                ],
                reward: 5,
                scriptureRef: '2 Peter 3:18',
                scriptureText: 'But grow in the grace and knowledge of our Lord and Savior Jesus Christ.'
            }
        ],
        // 7: STATUS
        7: [
            {
                id: 'status_integrity',
                title: 'Path of Integrity',
                description: 'Build a reputation of trustworthiness.',
                difficulty: 'beginner',
                scoreThreshold: 40,
                tasks: [
                    { id: 'st1_1', text: 'Keep every promise you make this week', completed: false },
                    { id: 'st1_2', text: 'Speak only truthfully today (no exaggerations)', completed: false },
                    { id: 'st1_3', text: 'Refuse to gossip or speak negatively about others', completed: false },
                    { id: 'st1_4', text:  'Admit a mistake publicly', completed: false },
                    { id: 'st1_5', text: 'Encourage someone with sincere words', completed: false }
                ],
                reward: 5,
                scriptureRef: 'Proverbs 22:1',
                scriptureText: 'A good name is more desirable than great riches; to be esteemed is better than silver or gold.'
            }
        ],
        // 8: SPACE
        8: [
            {
                id: 'space_order',
                title: 'Order from Chaos',
                description: 'Create a peaceful and organized home.',
                difficulty: 'beginner',
                scoreThreshold:  40,
                tasks: [
                    { id: 'sp1_1', text: 'Declutter one room or area', completed: false },
                    { id: 'sp1_2', text: 'Deep clean your bedroom', completed: false },
                    { id: 'sp1_3', text: 'Create a designated workspace', completed: false },
                    { id: 'sp1_4', text: 'Fix one thing that has been broken', completed: false },
                    { id: 'sp1_5', text: 'Donate items you no longer need', completed:  false }
                ],
                reward: 5,
                scriptureRef: '1 Corinthians 14:40',
                scriptureText: 'But everything should be done in a fitting and orderly way.'
            }
        ],
        // 9: TIME
        9: [
            {
                id: 'time_stewardship',
                title: 'Time Stewardship',
                description: 'Learn to manage your time wisely.',
                difficulty: 'beginner',
                scoreThreshold: 40,
                tasks:  [
                    { id: 't1_1', text: 'Track how you spend your time for 3 days', completed: false },
                    { id: 't1_2', text: 'Create a simple daily schedule', completed: false },
                    { id: 't1_3', text: 'Identify your top 3 time-wasters', completed: false },
                    { id: 't1_4', text: 'Be on time to every commitment this week', completed: false },
                    { id: 't1_5', text: 'Set and accomplish 3 daily priorities', completed: false }
                ],
                reward: 5,
                scriptureRef: 'Ephesians 5:15-16',
                scriptureText: 'Be very careful, then, how you live—not as unwise but as wise, making the most of every opportunity.'
            }
        ],
        // 10: WORLD
        10: [
            {
                id: 'world_neighbor',
                title: 'Love Your Neighbor',
                description:  'Engage with and serve your community.',
                difficulty: 'beginner',
                scoreThreshold: 40,
                tasks: [
                    { id:  'w1_1', text: 'Introduce yourself to a neighbor you don\'t know', completed: false },
                    { id: 'w1_2', text: 'Volunteer for 2 hours this month', completed: false },
                    { id: 'w1_3', text: 'Support a local business', completed: false },
                    { id: 'w1_4', text: 'Donate to a local charity or food bank', completed: false },
                    { id: 'w1_5', text: 'Pray for your neighborhood and community', completed: false }
                ],
                reward: 5,
                scriptureRef: 'Mark 12:31',
                scriptureText: 'Love your neighbor as yourself.  There is no commandment greater than these.'
            }
        ],
        // 11: CREATIVE
        11: [
            {
                id: 'creative_spark',
                title: 'Creative Spark',
                description: 'Awaken your God-given creativity.',
                difficulty: 'beginner',
                scoreThreshold: 40,
                tasks: [
                    { id: 'c1_1', text: 'Spend 30 minutes on a creative activity', completed: false },
                    { id: 'c1_2', text: 'Try a new creative medium you\'ve never explored', completed: false },
                    { id: 'c1_3', text: 'Appreciate art:  visit a museum or listen to a symphony', completed: false },
                    { id: 'c1_4', text: 'Create something and share it with someone', completed: false },
                    { id: 'c1_5', text: 'Write, draw, or compose for 15 minutes with no judgment', completed: false }
                ],
                reward: 5,
                scriptureRef: 'Genesis 1:27',
                scriptureText: 'So God created mankind in his own image, in the image of God he created them.'
            }
        ],
        // 12: TECH
        12: [
            {
                id: 'tech_literacy',
                title: 'Digital Literacy',
                description: 'Master the basics of technology.',
                difficulty: 'beginner',
                scoreThreshold: 40,
                tasks: [
                    { id: 'tc1_1', text: 'Update all your passwords to be secure and unique', completed: false },
                    { id: 'tc1_2', text: 'Back up your important files', completed: false },
                    { id: 'tc1_3', text: 'Learn a new feature of a tool you use daily', completed: false },
                    { id: 'tc1_4', text: 'Set screen time limits on your devices', completed: false },
                    { id: 'tc1_5', text: 'Unsubscribe from 10 unnecessary emails', completed: false }
                ],
                reward: 5,
                scriptureRef: 'Proverbs 1:5',
                scriptureText: 'Let the wise listen and add to their learning, and let the discerning get guidance.'
            }
        ]
    };

    // Track completed pathways and tasks
    let completedPathways = [];
    let pathwayProgress = {};

    // --- ALL ASSESSMENT QUESTIONS BY CATEGORY ---
    const allAssessments = {
        // 0: BODY
        0: {
            title: "Body Assessment",
            questions: [
                { id: 1, text: "How many days per week do you engage in 30+ minutes of intentional physical activity?", type: "select", options: [0, 1, 2, 3, 4, 5, 6, 7], weight: 10 },
                { id: 2, text: "Do you consistently get at least 7 hours of sleep per night?", type: "yn", weight: 10 },
                { id: 3, text: "Do you currently experience chronic joint or muscle pain that limits training?", type: "yn", weight: 8, reverse: true },
                { id:  4, text: "Do you actively manage stress (meditation, journaling, regular breaks, etc.)?", type: "yn", weight: 7 },
                { id: 5, text: "Do you eat mostly whole, minimally processed foods?", type: "yn", weight: 10 },
                { id: 6, text: "Do you drink mostly water (limiting soda and alcohol)?", type: "yn", weight: 8 },
                { id: 7, text:  "How many servings of vegetables/fruit do you eat per day?", type: "select", options: [0, 1, 2, 3, 4, 5], weight: 7 },
                { id: 8, text: "Do you take a daily multivitamin or essential supplement?", type: "yn", weight: 3 },
                { id: 9, text: "Do you take time for active recovery at least 2x per week?", type: "yn", weight: 5 },
                { id: 10, text: "Do you track calories, macros, or portions?", type: "yn", weight: 5 },
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
                { id: 3, text: "Do you struggle with focus or concentration?", type: "yn", weight: 8, reverse: true },
                { id: 4, text: "Do you practice critical thinking when consuming information?", type: "yn", weight: 7 },
                { id: 5, text:  "Do you engage in mentally stimulating activities (puzzles, strategy games, etc.)?", type: "yn", weight: 6 },
                { id: 6, text: "Do you take notes or journal to process your thoughts?", type: "yn", weight: 5 },
                { id: 7, text:  "How would you rate your memory retention (1=Poor, 5=Excellent)?", type: "select", options: [1, 2, 3, 4, 5], weight: 7 },
                { id: 8, text: "Do you limit mindless screen time (social media, TV)?", type: "yn", weight:  8 },
                { id: 9, text: "Do you seek out perspectives different from your own?", type:  "yn", weight: 6 },
                { id: 10, text: "Do you have a system for organizing information and ideas?", type: "yn", weight: 5 },
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
                { id: 8, text: "Do you experience frequent loneliness? ", type: "yn", weight:  7, reverse: true },
                { id: 9, text: "Do you celebrate others' successes genuinely?", type: "yn", weight: 5 },
                { id: 10, text:  "Rate your emotional awareness (1=Poor, 5=Excellent):", type: "select", options: [1, 2, 3, 4, 5], weight: 8 },
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
                { id: 5, text: "Do you take pride in the quality of your work?", type: "yn", weight: 7 },
                { id: 6, text: "Rate your proficiency in your primary skill (1=Beginner, 5=Expert):", type: "select", options: [1, 2, 3, 4, 5], weight: 10 },
                { id: 7, text: "Do you teach your skills to others?", type: "yn", weight: 5 },
                { id: 8, text: "Do you finish projects you start?", type: "yn", weight: 8 },
                { id: 9, text: "Do you invest in tools or resources to improve your craft?", type:  "yn", weight: 5 },
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
                { id: 7, text:  "Rate your financial stress level (1=Very Stressed, 5=No Stress):", type: "select", options: [1, 2, 3, 4, 5], weight: 8 },
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
            questions:  [
                { id: 1, text: "Do you trust in Jesus Christ alone for the forgiveness of your sins?", type: "yn", weight: 100 },
            ]
        },
        // 6: VITALITY (Sanctification)
        6: {
            title: "Vitality Assessment (Sanctification)",
            questions: [
                { id: 1, text: "Do you regularly hear or read God's Word (Scripture)?", type: "yn", weight: 10 },
                { id: 2, text: "Do you attend Divine Service to receive the Word and Sacraments?", type:  "yn", weight: 10 },
                { id: 3, text: "Do you repent of your sins and trust God's promise of forgiveness?", type: "yn", weight: 9 },
                { id: 4, text: "Do you believe that in the Lord's Supper you receive the true Body and Blood of Christ?", type:  "yn", weight: 10 },
                { id: 5, text: "Do you seek to live according to God's Ten Commandments out of love for Him?", type: "yn", weight: 10 },
                { id: 6, text: "Do you confess your sins and receive absolution? ", type: "yn", weight:  8 },
                { id: 7, text: "Do you serve your neighbor in your daily vocations (work, family, community)?", type: "yn", weight: 8 },
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
                { id: 3, text: "Do you gossip or speak negatively about others? ", type: "yn", weight:  8, reverse: true },
                { id: 4, text: "Do you keep your commitments and promises?", type: "yn", weight: 10 },
                { id: 5, text: "Do you lead or mentor others?", type: "yn", weight: 8 },
                { id: 6, text:  "Rate your influence in your workplace or community (1=None, 5=Significant):", type: "select", options: [1, 2, 3, 4, 5], weight: 7 },
                { id: 7, text:  "Do you act with integrity even when no one is watching?", type: "yn", weight: 10 },
                { id: 8, text: "Do you receive recognition for your contributions?", type: "yn", weight: 5 },
                { id: 9, text: "Do you build others up with your words? ", type: "yn", weight:  7 },
                { id: 10, text: "Do you take responsibility for your mistakes publicly?", type: "yn", weight: 8 },
                { id: 11, text: "Are you respected by your peers?", type: "yn", weight: 7 },
                { id: 12, text:  "Do you use your influence to help others?", type: "yn", weight: 8 }
            ]
        },
        // 8: SPACE
        8: {
            title: "Space Assessment (Home & Environment)",
            questions: [
                { id: 1, text:  "Is your living space clean and organized?", type: "yn", weight: 10 },
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
                { id: 8, text:  "Do you stay informed about current events?", type:  "yn", weight: 5 },
                { id: 9, text: "Do you advocate for justice and righteousness?", type: "yn", weight: 8 },
                { id: 10, text: "Do you participate in a church or community group?", type: "yn", weight: 9 },
                { id: 11, text: "Rate your impact on those around you (1=None, 5=Significant):", type: "select", options: [1, 2, 3, 4, 5], weight:  8 },
                { id: 12, text: "Do you pray for or actively support missionaries or global causes?", type: "yn", weight: 6 }
            ]
        },
        // 11: CREATIVE
        11: {
            title: "Creative Assessment",
            questions: [
                { id: 1, text: "Do you engage in creative activities regularly (art, music, writing, etc.)?", type: "yn", weight:  10 },
                { id: 2, text: "How many hours per week do you spend on creative pursuits?", type: "select", options: [0, 1, 2, 3, 4, 5, 6, 7], weight: 9 },
                { id: 3, text:  "Do you feel creatively blocked or uninspired?", type: "yn", weight: 7, reverse:  true },
                { id: 4, text: "Do you share your creative work with others?", type: "yn", weight: 6 },
                { id: 5, text: "Do you try new creative mediums or techniques?", type: "yn", weight: 7 },
                { id: 6, text: "Rate your creative confidence (1=None, 5=Very Confident):", type: "select", options: [1, 2, 3, 4, 5], weight: 8 },
                { id: 7, text: "Do you find creative solutions to problems?", type:  "yn", weight: 8 },
                { id: 8, text: "Do you appreciate and consume art, music, or literature?", type: "yn", weight: 5 },
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
    let currentPathway = null;
    let isInPathwaysMode = false;
    const quizContainer = document.getElementById('quiz-container');

    // --- SAVE/LOAD FUNCTIONS ---
    
    window.generateSaveCode = function() {
        const scores = skillsData.map(s => s.score);
        const completed = skillsData.map(s => s.completed ?  1 : 0);
        const saveData = {
            v: 3,
            s: scores,
            c: completed,
            cp: completedPathways,
            pp: pathwayProgress,
            d: Date.now()
        };
        const jsonStr = JSON.stringify(saveData);
        const base64 = btoa(jsonStr);
        return 'VP-' + base64;
    };
    
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
            
            saveData.s.forEach((score, index) => {
                if (index < skillsData.length) {
                    skillsData[index].score = Math.min(100, Math.max(0, parseInt(score) || 0));
                    skillsData[index].completed = saveData.c ?  saveData.c[index] === 1 : (score > 0);
                }
            });
            
            if (saveData.cp) {
                completedPathways = saveData.cp;
            }
            if (saveData.pp) {
                pathwayProgress = saveData.pp;
            }
            
            const saveDate = saveData.d ?  new Date(saveData.d).toLocaleDateString() : 'Unknown';
            return { success: true, date: saveDate };
        } catch (e) {
            return { success:  false, error: 'Could not parse save code' };
        }
    };
    
    window.saveToLocalStorage = function() {
        const saveCode = generateSaveCode();
        localStorage.setItem('victoryPagesProgress', saveCode);
        return saveCode;
    };
    
    window.loadFromLocalStorage = function() {
        const savedCode = localStorage.getItem('victoryPagesProgress');
        if (savedCode) {
            return loadFromSaveCode(savedCode);
        }
        return { success: false, error: 'No saved data found' };
    };
    
    window.getIncompleteCategories = function() {
        const incomplete = [];
        skillsData.forEach((skill, index) => {
            if (!skill.completed) {
                incomplete.push(index);
            }
        });
        return incomplete;
    };
    
    window.getFirstIncompleteCategory = function() {
        for (let i = 0; i < skillsData.length; i++) {
            if (!skillsData[i].completed) {
                return i;
            }
        }
        return -1;
    };

    window.showSaveScreen = function() {
        const saveCode = generateSaveCode();
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
        
        const nextBtn = document.getElementById('next-btn');
        const backBtn = document.getElementById('back-btn');
        if (nextBtn) nextBtn.style.display = 'none';
        if (backBtn) backBtn.style.display = 'none';
    };
    
    window.copySaveCode = function() {
        const textarea = document.getElementById('save-code-display');
        textarea.select();
        document.execCommand('copy');
        alert('Save code copied to clipboard!');
    };
    
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

    window.hideSideColumns = function() {
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

        const pBtn = document.getElementById('paraclete-content-toggle');
        const pgBtn = document.getElementById('pages-content-toggle');
        if (pBtn) pBtn.innerHTML = 'Open ▼';
        if (pgBtn) pgBtn.innerHTML = 'Open ▼';

        const pImg = document.getElementById('paraclete-closed-image');
        const pgImg = document.getElementById('pages-closed-image');
        if (pImg) pImg.style.display = 'none';
        if (pgImg) pgImg.style.display = 'none';
    };

    window. showSideColumns = function() {
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
        paracleteContent.style. display = 'block';
        
        const pBtn = document.getElementById('paraclete-content-toggle');
        if (pBtn) pBtn.innerHTML = 'Close ▲';
        
        const pImg = document.getElementById('paraclete-closed-image');
        if (pImg) pImg.style.display = 'none';
        
        const totalScore = skillsData.reduce((sum, skill) => sum + skill.score, 0);
        const overallScore = Math.round(totalScore / TOTAL_SKILLS);
        
        paracleteContent.innerHTML = `
            <p style="text-align: center; color: darkred; margin:  2px 0; font-size: 1rem;">Overall:  <strong>${overallScore}/100</strong></p>
            <br>
            <hr style="margin: 5px 0;">
            <div id="skill-grid" style="display: flex; flex-direction: column; gap: 3px; padding: 5px; flex:  1; justify-content: space-evenly;">
                ${SKILL_DATA.map((skill, index) => `
                    <div class="skill-grid-item retro-inset-panel" data-index="${index}" style="padding: 4px; display: flex; align-items: center; justify-content: space-between; cursor: pointer; flex:  1; ${currentCategory === index ? 'background-color: #B8B8B8; border-color: #606060;' : ''}">
                        <div style="display: flex; align-items: center; gap: 6px; flex: 1;">
                            <div style="font-size: 1.25rem; line-height: 1;">${skill.symbol}</div>
                            <div style="font-size: .85rem; font-weight: none; color: black;">${skill.name}</div>
                        </div>
                        <div class="skill-score" style="font-size: 1rem; color: darkred; white-space: nowrap;">
                            ${skillsData[index].completed ? skillsData[index].score + '/100' : '---'}
                        </div>
                    </div>
                `).join('')}
            </div>
            <hr style="margin: 5px 0;">
            <div style="text-align: center; margin:  5px 0;"></div>
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
        
        const pImg = document.getElementById('paraclete-closed-image');
        if (pImg) pImg.style.display = 'block';
    };

    // --- PATHWAYS HELPER FUNCTIONS ---

    function getRecommendedPathways() {
        const recommended = [];
        
        skillsData.forEach((skill, index) => {
            if (skill.completed && PATHWAYS_DATA[index]) {
                const pathways = PATHWAYS_DATA[index];
                pathways.forEach(pathway => {
                    if (skill.score < pathway.scoreThreshold && ! completedPathways.includes(pathway.id)) {
                        recommended.push({
                            ... pathway,
                            skillIndex: index,
                            skillName: skill.name,
                            skillSymbol: skill.symbol,
                            currentScore: skill.score
                        });
                    }
                });
            }
        });
        
        recommended.sort((a, b) => a.currentScore - b.currentScore);
        return recommended;
    }

    function getPathwayProgress(pathwayId) {
        if (!pathwayProgress[pathwayId]) {
            pathwayProgress[pathwayId] = {};
        }
        return pathwayProgress[pathwayId];
    }

    function isPathwayComplete(pathway) {
        const progress = getPathwayProgress(pathway.id);
        return pathway.tasks.every(task => progress[task.id] === true);
    }

    function countCompletedTasks(pathway) {
        const progress = getPathwayProgress(pathway.id);
        return pathway.tasks.filter(task => progress[task.id] === true).length;
    }

    window.toggleTask = function(pathwayId, taskId) {
        if (!pathwayProgress[pathwayId]) {
            pathwayProgress[pathwayId] = {};
        }
        pathwayProgress[pathwayId][taskId] = !pathwayProgress[pathwayId][taskId];
        
        if (currentPathway && currentPathway.id === pathwayId) {
            showPathwayDetail(currentPathway);
        }
        
        saveToLocalStorage();
    };

    window.completePathway = function(pathwayId) {
        const pathway = findPathwayById(pathwayId);
        if (!pathway) return;
        
        if (! isPathwayComplete(pathway)) {
            alert('Please complete all tasks first! ');
            return;
        }
        
        completedPathways.push(pathwayId);
        
        const skillIndex = pathway.skillIndex;
        skillsData[skillIndex].score = Math.min(100, skillsData[skillIndex].score + pathway.reward);
        
        saveToLocalStorage();
        showSkillGrid();
        
        quizContainer.innerHTML = `
            <div style="text-align:  center; padding: 20px;">
                <h3 style="color: black;">🎉 Pathway Complete!</h3>
                <hr style="margin: 15px 0;">
                <p style="color: black;">${pathway.skillSymbol} <strong>${pathway.title}</strong></p>
                <p style="color: green; font-size: 1.2rem; margin: 15px 0;">+${pathway.reward} ${pathway.skillName} Points! </p>
                <p style="color: black; font-size: 0.85rem;">New Score: ${skillsData[skillIndex].score}/100</p>
                <hr style="margin: 15px 0;">
                <p style="font-style: italic; color: #666; font-size: 0.85rem;">"${pathway.scriptureText}"</p>
                <p style="color: #888; font-size: 0.75rem;">— ${pathway.scriptureRef}</p>
                <hr style="margin: 15px 0;">
                <button onclick="showPathwaysList()" class="classic-3d-button" style="margin: 5px;">← Back to Pathways</button>
            </div>
        `;
    };

    function findPathwayById(pathwayId) {
        for (let skillIndex in PATHWAYS_DATA) {
            const pathways = PATHWAYS_DATA[skillIndex];
            for (let pathway of pathways) {
                if (pathway.id === pathwayId) {
                    return {
                        ...pathway,
                        skillIndex: parseInt(skillIndex),
                        skillName: SKILL_DATA[skillIndex].name,
                        skillSymbol: SKILL_DATA[skillIndex].symbol,
                        currentScore: skillsData[skillIndex].score
                    };
                }
            }
        }
        return null;
    }

    window.findPathwayById = findPathwayById;

    window.showPathwaysList = function() {
        isInPathwaysMode = true;
        const recommended = getRecommendedPathways();
        
        const titleEl = document.querySelector('#paths-finder-view > p');
        if (titleEl) {
            titleEl.innerHTML = '🛤️ Your Pathways';
        }
        
        if (recommended.length === 0) {
            quizContainer.innerHTML = `
                <div style="text-align: center; padding: 20px;">
                    <h3 style="color: black;">🌟 Excellent Work!</h3>
                    <hr style="margin: 15px 0;">
                    <p style="color: black;">You've completed all available pathways or your scores are already high! </p>
                    <p style="color: #666; font-size: 0.85rem; margin-top: 10px;">Continue living out your faith and check back for new pathways.</p>
                    <hr style="margin: 15px 0;">
                    <button onclick="showSaveScreen()" class="classic-3d-button" style="margin:  5px;">💾 Save Progress</button>
                    <button onclick="location.reload()" class="classic-3d-button" style="margin: 5px;">← Return Home</button>
                </div>
            `;
            return;
        }
        
        const priorityPathways = recommended;
        
        let pathwaysHTML = priorityPathways.map(pathway => {
            const completedCount = countCompletedTasks(pathway);
            const totalTasks = pathway.tasks.length;
            const progressPercent = Math.round((completedCount / totalTasks) * 100);
            const difficultyColors = {
                'beginner': '#4CAF50',
                'intermediate': '#FF9800',
                'advanced':  '#f44336'
            };
            
            return `
                <div style="padding: 3px 5px; margin-bottom: 3px; cursor: pointer; width: 100%; box-sizing: border-box;" onclick="showPathwayDetail(findPathwayById('${pathway.id}'))">
                    <div style="display:  flex; justify-content: space-between; align-items: center; width: 100%;">
                        <div style="flex: 1; min-width: 0;">
                            <p style="margin: 0; font-size: 1rem; color: black; white-space: nowrap; text-overflow:  ellipsis;">
                                ${pathway.skillSymbol} ${pathway.title}
                            </p>
                            <p style="margin: 0; font-size: .75rem; color: #666;">
                                ${pathway.skillName} • <span style="color: ${difficultyColors[pathway.difficulty]}">${pathway.difficulty}</span>
                            </p>
                        </div>
                        <div style="display: flex; align-items: center; gap: 8px; flex-shrink: 0;">
                            <span style="font-size: 0.75rem; color: #666;">${completedCount}/${totalTasks}</span>
                            <span style="font-size: 0.85rem; color: darkred; font-weight: bold;">+${pathway.reward}</span>
                        </div>
                    </div>
                    <div style="background: #ccc; height: 3px; border-radius: 2px; margin-top: 2px; width: 100%;">
                        <div style="background: #4CAF50; height: 100%; width: ${progressPercent}%; border-radius: 2px;"></div>
                    </div>
                </div>
            `;
        }).join('');
        
        quizContainer. innerHTML = `
            <div style="padding: 2px; width: 100%; box-sizing:  border-box; overflow:  hidden;">
                <p style="color: black; font-size: 0.75rem; margin:  0 0 3px 0; text-align: center;">
                    <strong>Pathways</strong> <span style="color: #666; font-size: 0.70rem;">(${priorityPathways.length} available)</span>
                </p>
                                <hr style="margin: 3px 0;">
                <div style="width: 100%; box-sizing:  border-box; display: flex; flex-direction: column; gap: 0;">
                    ${pathwaysHTML}
                </div>
                <hr style="margin: 3px 0;">
                <div style="text-align: center; margin-top: 2px;">
                    <button onclick="showSaveScreen()" class="classic-3d-button" style="margin:  2px; font-size: 0.6rem; padding: 3px 6px;">💾</button>
                    <button onclick="location.reload()" class="classic-3d-button" style="margin: 2px; font-size: 0.6rem; padding: 3px 6px;">🏠</button>
                </div>
            </div>
        `;
    };

    window.showPathwayDetail = function(pathway) {
        if (!pathway) return;
        
        currentPathway = pathway;
        const progress = getPathwayProgress(pathway.id);
        const completedCount = countCompletedTasks(pathway);
        const allComplete = isPathwayComplete(pathway);
        
        const titleEl = document.querySelector('#paths-finder-view > p');
        if (titleEl) {
            titleEl. innerHTML = `${pathway.skillSymbol} ${pathway.title}`;
        }
        
        const tasksHTML = pathway.tasks.map(task => {
            const isComplete = progress[task.id] === true;
            return `
                <div style="padding: 3px 5px; margin-bottom: 2px; display: flex; align-items: flex-start; gap: 4px; cursor: pointer; width:  100%; box-sizing: border-box; ${isComplete ? 'background-color: #d4edda;' : ''}" onclick="toggleTask('${pathway.id}', '${task. id}')">
                    <div style="font-size: 0.8rem; flex-shrink: 0;">${isComplete ? '☑️' : '⬜'}</div>
                    <div style="flex: 1; font-size: 0.65rem; color: ${isComplete ? '#666' : 'black'}; ${isComplete ? 'text-decoration: line-through;' : ''} line-height: 1.2; word-wrap: break-word;">
                        ${task.text}
                    </div>
                </div>
            `;
        }).join('');
        
        quizContainer.innerHTML = `
            <div style="padding: 3px; width: 100%; box-sizing: border-box; overflow: hidden;">
                <p style="color: #666; font-size: 0.85rem; margin: 0;">${pathway.skillName} • ${pathway.difficulty} • <span style="color: darkred;">+${pathway.reward} pts</span></p>
                <p style="color: black; font-size: 0.80rem; margin: 3px 0;">${pathway.description}</p>
                <hr style="margin: 5px 0;">
                <p style="color: black; font-size: 0.75rem; margin-bottom: 5px;"><strong>Tasks (${completedCount}/${pathway.tasks. length}):</strong></p>
                <div style="overflow:  visible;">
                    ${tasksHTML}
                </div>
                <hr style="margin: 5px 0;">
                <div style="background: #f5f5f5; padding: 5px; border-radius: 3px; margin-bottom: 5px;">
                    <p style="font-style: italic; color: #555; font-size: 0.75rem; margin: 0;">"${pathway.scriptureText}"</p>
                    <p style="color: #888; font-size: 0.7rem; margin: 2px 0 0 0; text-align: right;">— ${pathway.scriptureRef}</p>
                </div>
                <div style="text-align: center;">
                    ${allComplete ? `
                        <button onclick="completePathway('${pathway.id}')" class="classic-3d-button" style="background-color: #90EE90; margin: 3px; font-size: 0.75rem; padding: 5px 10px;">
                            ✅ Claim (+${pathway.reward})
                        </button>
                    ` : `
                        <p style="color: #888; font-size: 0.65rem; margin: 2px 0;">Complete all tasks to claim reward</p>
                    `}
                    <button onclick="showPathwaysList()" class="classic-3d-button" style="margin: 3px; font-size: 0.7rem; padding: 4px 8px;">← Back</button>
                </div>
            </div>
        `;
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
        
        const nextBtn = document.getElementById('next-btn');
        const backBtn = document.getElementById('back-btn');
        if (nextBtn) nextBtn.style.display = 'none';
        if (backBtn) backBtn.style.display = 'none';
        
        const titleEl = document.querySelector('#paths-finder-view > p');
        if (titleEl) {
            titleEl.innerHTML = '🔑 Load Your Progress';
        }
        
        const localSave = loadFromLocalStorage();
        
        quizContainer.innerHTML = `
            <div style="text-align: center; padding: 5px;">
                ${localSave. success ? `
                    <div style="background: #d4edda; border: 2px solid #28a745; padding: 10px; margin: 10px 0;">
                        <p style="color: #155724; margin: 0;"><strong>✅ Found saved progress in this browser!</strong></p>
                        <p style="color: #155724; font-size: 0.85rem; margin: 5px 0;">Last saved: ${localSave.date}</p>
                        <button onclick="loadLocalAndShow()" class="classic-3d-button" style="margin-top: 10px; background-color: #90EE90;">Load Browser Save</button>
                    </div>
                    <hr style="margin: 15px 0;">
                    <p style="color: black; font-size: 0.9rem;"><strong>Or enter a save code:</strong></p>
                ` : `
                    <p style="color: black; font-size: 0.9rem; margin-bottom: 10px;">Enter your save code below to restore your progress:</p>
                `}
                <textarea id="load-code-input" placeholder="Paste your VP-...  save code here" style="width: 100%; height: 60px; font-family: monospace; font-size:  0.75rem; padding: 8px; margin:  10px 0; resize: none; "></textarea>
                <button onclick="loadFromCodeInput()" class="classic-3d-button" style="margin:  5px;">📥 Load from Code</button>
                <button onclick="loadFromFileUpload()" class="classic-3d-button" style="margin:  5px;">📁 Load from File</button>
                <input type="file" id="file-upload-input" accept=".txt" style="display: none;" onchange="handleFileUpload(event)">
                <div id="load-error-msg" style="color: red; margin-top: 10px; display:  none;"></div>
                <hr style="margin: 15px 0;">
                <button onclick="backToLanding()" class="classic-3d-button">← Back</button>
            </div>
        `;
    };
    
    window.loadLocalAndShow = function() {
        const result = loadFromLocalStorage();
        if (result.success) {
            showLoadedProgressScreen(result.date);
        }
    };
    
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
                <p style="color: black; font-size: 0.85rem; margin-top: 10px;">
                    <strong>${completedCount}/${TOTAL_SKILLS}</strong> assessments completed
                </p>
                ${incompleteCount > 0 ? `
                    <hr style="margin: 15px 0;">
                    <p style="color: black; font-size: 0.85rem;"><strong>Incomplete assessments:</strong></p>
                    <p style="color: #666; font-size: 0.8rem; margin:  5px 0;">${incompleteList}</p>
                    <button onclick="continueIncomplete()" class="classic-3d-button" style="margin: 10px; background-color: #90EE90;">
                        ▶ Continue Assessments (${incompleteCount} remaining)
                    </button>
                ` : `
                    <hr style="margin: 15px 0;">
                    <p style="color: green; font-size: 0.9rem;"><strong>🎉 All assessments complete!</strong></p>
                    <button onclick="showPathwaysList()" class="classic-3d-button" style="margin: 10px; background-color: #90EE90;">
                        🛤️ View Pathways
                    </button>
                `}
                <hr style="margin: 15px 0;">
                <p style="color: black; font-size: 0.9rem;">Other options: </p>
                <button onclick="startRetake()" class="classic-3d-button" style="margin: 10px;">🔄 Retake All Assessments</button>
                <hr style="margin: 15px 0;">
                <button onclick="location.reload()" class="classic-3d-button">← Return Home</button>
            </div>
        `;
    };
    
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
    
    window. loadFromCodeInput = function() {
        const input = document.getElementById('load-code-input');
        const errorMsg = document.getElementById('load-error-msg');
        const code = input.value. trim();
        
        if (! code) {
            errorMsg. textContent = 'Please enter a save code. ';
            errorMsg.style. display = 'block';
            return;
        }
        
        const result = loadFromSaveCode(code);
        
        if (result.success) {
            saveToLocalStorage();
            showLoadedProgressScreen(result.date);
        } else {
            errorMsg.textContent = result.error;
            errorMsg.style.display = 'block';
        }
    };
    
    window.loadFromFileUpload = function() {
        document.getElementById('file-upload-input').click();
    };
    
    window.handleFileUpload = function(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = function(e) {
            const code = e.target.result. trim();
            document.getElementById('load-code-input').value = code;
            loadFromCodeInput();
        };
        reader.readAsText(file);
    };
    
    window. startRetake = function() {
        skillsData. forEach(skill => {
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
            
            const nextBtn = document. getElementById('next-btn');
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

    window.startNextCategory = function() {
        let nextCategory = currentCategory + 1;
        
        while (nextCategory < TOTAL_SKILLS && skillsData[nextCategory]. completed) {
            nextCategory++;
        }
        
        if (nextCategory >= TOTAL_SKILLS) {
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

    window.finishAllAssessments = function() {
        const totalScore = skillsData.reduce((sum, skill) => sum + skill.score, 0);
        const averageScore = Math.round(totalScore / TOTAL_SKILLS);
        
        saveToLocalStorage();
        
        const recommended = getRecommendedPathways();
        const pathwayCount = recommended.length;
        
        const sortedSkills = [...skillsData]
            .map((s, i) => ({ ...s, index: i, symbol: SKILL_DATA[i]. symbol }))
            .filter(s => s.completed)
            .sort((a, b) => a.score - b.score);
        
        const lowestSkills = sortedSkills.slice(0, 3);
        const lowestSkillsHTML = lowestSkills.map(s => 
            `<span style="margin: 0 5px;">${s.symbol} ${s. name}:  ${s.score}</span>`
        ).join('');
        
        quizContainer. innerHTML = `
            <div style="text-align: center; padding: 15px;">
                <h3 style="color: black">🎉 All Assessments Complete!  🎉</h3>
                <p style="color:  green; font-size: 0.85rem;">✅ Progress auto-saved to browser! </p>
                <hr style="margin: 15px 0;">
                <p style="color: black; font-size:  0.9rem;">Overall Score: <strong style="color: darkred; font-size: 1.1rem;">${averageScore}/100</strong></p>
                ${pathwayCount > 0 ?  `
                    <hr style="margin: 15px 0;">
                    <p style="color: black; font-size: 0.85rem;"><strong>Areas for Growth:</strong></p>
                    <p style="color: #666; font-size: 0.8rem;">${lowestSkillsHTML}</p>
                    <p style="color: black; font-size: 0.85rem; margin-top: 10px;">
                        <strong>${pathwayCount} Pathways</strong> available to help you improve! 
                    </p>
                    <button onclick="showPathwaysList()" class="classic-3d-button" style="margin-top: 15px; background-color: #90EE90; font-size: 1rem; padding: 10px 20px;">
                        🛤️ Begin Pathways
                    </button>
                ` : `
                    <hr style="margin: 15px 0;">
                    <p style="color: black;">Excellent work! Your scores are high across all areas. </p>
                `}
                <hr style="margin: 5px 0;">
                <div style="text-align: center;">
                    <button onclick="showSaveScreen()" class="classic-3d-button" style="margin: 3px; font-size: 0.7rem; padding: 4px 8px;">💾 Save</button>
                    <button onclick="location.reload()" class="classic-3d-button" style="margin: 3px; font-size: 0.7rem; padding: 4px 8px;">← Home</button>
                </div>
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
                const previousAnswer = userAnswers[q. id];
                
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
        
        skillsData[currentCategory].score = score;
        skillsData[currentCategory].completed = true;
        
        saveToLocalStorage();
        showSkillGrid();

        let nextIncomplete = -1;
        for (let i = currentCategory + 1; i < TOTAL_SKILLS; i++) {
            if (! skillsData[i].completed) {
                nextIncomplete = i;
                break;
            }
        }
        
        const allComplete = getIncompleteCategories().length === 0;
        
        quizContainer.innerHTML = `
            <div style="text-align:  center; padding: 20px;">
                <h3 style="color: black">${SKILL_DATA[currentCategory].symbol} ${SKILL_DATA[currentCategory].name} Complete!</h3>
                <p style="color: green; font-size: 0.8rem;">✅ Progress auto-saved</p>
                <hr style="margin: 15px 0;">
                ${allComplete ? `
                    <p style="color: black; font-weight: bold;">🎉 All categories complete!</p>
                    <button onclick="finishAllAssessments()" class="classic-3d-button" style="margin-top: 15px; background-color: #90EE90;">Begin Pathways</button>
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
        content.style. display = 'none';
        if (button) button.innerHTML = button.innerHTML.replace('Close', 'Open').replace('▲', '▼');
        if (imageContainer) imageContainer.style.display = 'block'; 
    }
}