const assessmentData = [

  // === BODY ===

  { id: 1, section: "Body", text: "How would you rate your current overall physical health?", type: "scale", weight: 8, scaleLabels: ["Very Poor", "Excellent"] },
  { id: 2, section: "Body", text: "Do you have any chronic health conditions (diabetes, heart disease, autoimmune, etc.)?", type: "yn", weight: 6, reverse: true },
  { id: 3, section: "Body", text: "Are your chronic conditions well-managed with your doctor?", type: "yn", weight: 5, showIf: { id: 2, answer: 'yes' } },
  { id: 4, section: "Body", text: "Have you had a physical checkup with a doctor in the past 12 months?", type: "yn", weight: 5 },
  { id: 5, section: "Body", text: "Do you know your key health numbers (blood pressure, cholesterol, blood sugar)?", type: "yn", weight: 4 },
  { id: 6, section: "Body", text: "Are you currently at a healthy weight for your height and frame?", type: "yn", weight: 6 },
  { id: 7, section: "Body", text: "How would you rate your energy levels throughout the day?", type: "scale", weight: 7, scaleLabels: ["Very Low", "High"] },

  { id: 8, section: "Body", text: "How many days per week do you engage in intentional physical movement (walking, exercise, sports, physical labor)?", type: "select", options: [0, 1, 2, 3, 4, 5, 6, 7], weight: 10 },
  { id: 9, section: "Body", text: "On active days, approximately how long do you move?", type: "select", options: [1, 2, 3, 4, 5], optionLabels: ["<15 min", "15-30 min", "30-45 min", "45-60 min", "60+ min"], weight: 8 },
  { id: 10, section: "Body", text: "Do you engage in strength or resistance training at least twice per week?", type: "yn", weight: 8 },
  { id: 11, section: "Body", text: "Do you engage in cardiovascular exercise at least 3 times per week?", type: "yn", weight: 7 },
  { id: 12, section: "Body", text: "Do you do flexibility or mobility work at least twice per week?", type: "yn", weight: 6 },
  { id: 13, section: "Body", text: "Is your daily life mostly sedentary (sitting 6+ hours)?", type: "yn", weight: 7, reverse: true },
  { id: 14, section: "Body", text: "Do you take movement breaks if sitting for extended periods?", type: "yn", weight: 5 },
  { id: 15, section: "Body", text: "Can you walk up 3 flights of stairs without significant breathlessness?", type: "yn", weight: 6 },
  { id: 16, section: "Body", text: "Can you perform basic functional movements without pain (squat, bend, reach overhead, get up from floor)?", type: "yn", weight: 7 },
  { id: 17, section: "Body", text: "Do you follow a structured, progressive workout program?", type: "yn", weight: 5 },
  { id: 18, section: "Body", text: "Do you track your workouts or physical activity?", type: "yn", weight: 4 },
  { id: 19, section: "Body", text: "Have you seen measurable improvement in your fitness in the past 6 months?", type: "yn", weight: 5 },

  { id: 20, section: "Body", text: "How many hours of sleep do you typically get per night?", type: "select", options: [1, 2, 3, 4, 5], optionLabels: ["<5 hrs", "5-6 hrs", "6-7 hrs", "7-8 hrs", "8+ hrs"], weight: 10 },
  { id: 21, section: "Body", text: "How would you rate your sleep quality?", type: "scale", weight: 9, scaleLabels: ["Very Poor — never rested", "Excellent — wake refreshed"] },
  { id: 22, section: "Body", text: "Do you have a consistent sleep schedule (within 30 minutes of the same bed/wake time)?", type: "yn", weight: 6 },
  { id: 23, section: "Body", text: "Do you have difficulty falling asleep (takes more than 20 minutes)?", type: "yn", weight: 6, reverse: true },
  { id: 24, section: "Body", text: "Do you wake up frequently during the night or too early?", type: "yn", weight: 6, reverse: true },
  { id: 25, section: "Body", text: "Do you use screens within 1 hour of bedtime?", type: "yn", weight: 4, reverse: true },
  { id: 26, section: "Body", text: "Is your bedroom dark at night?", type: "yn", weight: 4 },
  { id: 27, section: "Body", text: "Is your bedroom cool (65-68 F)?", type: "yn", weight: 3 },
  { id: 28, section: "Body", text: "Is your bedroom quiet or do you use white noise effectively?", type: "yn", weight: 3 },
  { id: 29, section: "Body", text: "Do you avoid caffeine within 8 hours of bedtime?", type: "yn", weight: 4 },
  { id: 30, section: "Body", text: "Do you have a wind-down routine before bed?", type: "yn", weight: 4 },

  { id: 31, section: "Body", text: "How many structured meals do you eat per day?", type: "select", options: [1, 2, 3, 4], optionLabels: ["1 or irregular", "2", "3", "3+ structured"], weight: 5 },
  { id: 32, section: "Body", text: "How often do you eat home-prepared meals vs. restaurant or takeout?", type: "scale", weight: 7, scaleLabels: ["Almost never cook", "Almost always cook"] },
  { id: 33, section: "Body", text: "How many servings of vegetables do you eat on a typical day?", type: "select", options: [0, 1, 2, 3, 4, 5], weight: 8 },
  { id: 34, section: "Body", text: "How many servings of fruit do you eat on a typical day?", type: "select", options: [0, 1, 2, 3, 4], weight: 5 },
  { id: 35, section: "Body", text: "Do you eat adequate protein with most meals?", type: "yn", weight: 6 },
  { id: 36, section: "Body", text: "Do you eat highly processed foods (fast food, chips, packaged snacks, candy) daily?", type: "yn", weight: 7, reverse: true },
  { id: 37, section: "Body", text: "Do you drink sugary beverages (soda, juice, sweetened coffee or tea) daily?", type: "yn", weight: 5, reverse: true },
  { id: 38, section: "Body", text: "How many glasses of water do you drink daily?", type: "select", options: [1, 2, 3, 4, 5], optionLabels: ["1-2", "3-4", "5-6", "7-8", "8+"], weight: 6 },
  { id: 39, section: "Body", text: "Do you eat breakfast or intentionally practice structured intermittent fasting?", type: "yn", weight: 4 },
  { id: 40, section: "Body", text: "Do you eat mindfully — sitting down, not distracted, aware of hunger and fullness?", type: "yn", weight: 4 },
  { id: 41, section: "Body", text: "Do you frequently eat past the point of fullness?", type: "yn", weight: 5, reverse: true },
  { id: 42, section: "Body", text: "Do you use food to cope with stress or emotions regularly?", type: "yn", weight: 6, reverse: true },

  { id: 43, section: "Body", text: "Do you smoke or use tobacco or nicotine products?", type: "yn", weight: 9, reverse: true },
  { id: 44, section: "Body", text: "How often do you consume alcohol?", type: "select", options: [1, 2, 3, 4, 5], optionLabels: ["Daily", "Several times/week", "Weekly", "Occasionally", "Rarely/Never"], weight: 6 },
  { id: 45, section: "Body", text: "When you drink, do you typically have more than 2 drinks?", type: "yn", weight: 5, reverse: true, showIf: { id: 44, answer: [1, 2, 3, 4] } },
  { id: 46, section: "Body", text: "Do you use recreational drugs?", type: "yn", weight: 6, reverse: true },
  { id: 47, section: "Body", text: "Do you rely on caffeine to function (more than 2-3 cups of coffee per day)?", type: "yn", weight: 3, reverse: true },

  { id: 48, section: "Body", text: "Do you experience chronic pain (back, neck, joints) that affects daily life?", type: "yn", weight: 7, reverse: true },
  { id: 49, section: "Body", text: "Do you have good posture when sitting and standing?", type: "yn", weight: 4 },
  { id: 50, section: "Body", text: "Do you experience frequent headaches or migraines?", type: "yn", weight: 4, reverse: true },
  { id: 51, section: "Body", text: "Can you touch your toes with straight legs?", type: "yn", weight: 3 },
  { id: 52, section: "Body", text: "Can you hold a 60-second plank with good form?", type: "yn", weight: 4 },
  { id: 53, section: "Body", text: "Can you do at least 10 proper pushups?", type: "yn", weight: 4 },

  { id: 54, section: "Body", text: "Do you brush your teeth at least twice daily?", type: "yn", weight: 3 },
  { id: 55, section: "Body", text: "Do you floss daily?", type: "yn", weight: 3 },
  { id: 56, section: "Body", text: "Have you had a dental checkup in the past year?", type: "yn", weight: 3 },
  { id: 57, section: "Body", text: "Do you protect your skin from sun damage?", type: "yn", weight: 3 },
  { id: 58, section: "Body", text: "Are you up to date on recommended health screenings for your age?", type: "yn", weight: 4 },

  { id: 59, section: "Body", text: "Do you take at least one full rest day per week from intense exercise?", type: "yn", weight: 4 },
  { id: 60, section: "Body", text: "Do you actively manage physical stress (massage, foam rolling, epsom baths, etc.)?", type: "yn", weight: 3 },
  { id: 61, section: "Body", text: "Do physical stress symptoms manifest in your body (tension, clenched jaw, shallow breathing)?", type: "yn", weight: 5, reverse: true },
  { id: 62, section: "Body", text: "Do you spend time outdoors in nature at least a few times per week?", type: "yn", weight: 4 },
  { id: 63, section: "Body", text: "Do you get adequate sunlight exposure or supplement Vitamin D?", type: "yn", weight: 4 },


  // === MIND ===

  { id: 64, section: "Mind", text: "In the past month, have you intentionally learned something new (book, course, tutorial, skill)?", type: "yn", weight: 8 },
  { id: 65, section: "Mind", text: "How many books or audiobooks have you read in the past 6 months?", type: "select", options: [0, 1, 2, 3, 4, 5], weight: 7 },
  { id: 66, section: "Mind", text: "Do you have a skill or subject you are actively trying to improve?", type: "yn", weight: 8 },
  { id: 67, section: "Mind", text: "When you face a difficult intellectual challenge, how do you respond?", type: "scale", weight: 7, scaleLabels: ["Give up quickly", "Always persist"] },
  { id: 68, section: "Mind", text: "Do you seek out perspectives and opinions different from your own?", type: "yn", weight: 6 },
  { id: 69, section: "Mind", text: "Do you genuinely enjoy learning new things?", type: "yn", weight: 5 },
  { id: 70, section: "Mind", text: "Have you taken any course, class, or structured learning in the past year?", type: "yn", weight: 6 },
  { id: 71, section: "Mind", text: "Do you regularly consume educational content (podcasts, documentaries, articles)?", type: "yn", weight: 5 },

  { id: 72, section: "Mind", text: "How would you rate your ability to focus on a single task without distraction?", type: "scale", weight: 9, scaleLabels: ["Very Poor", "Excellent"] },
  { id: 73, section: "Mind", text: "How often do you get distracted when trying to concentrate?", type: "scale", weight: 8, scaleLabels: ["Constantly", "Rarely"] },
  { id: 74, section: "Mind", text: "Can you engage in deep, focused work for 60+ minutes without interruption?", type: "yn", weight: 8 },
  { id: 75, section: "Mind", text: "Do you frequently start tasks but struggle to finish them?", type: "yn", weight: 7, reverse: true },
  { id: 76, section: "Mind", text: "Do you practice any form of attention training (meditation, mindfulness, focus exercises)?", type: "yn", weight: 6 },
  { id: 77, section: "Mind", text: "How in control of your attention do you feel day to day?", type: "scale", weight: 7, scaleLabels: ["Scattered — attention controls me", "In full control"] },
  { id: 78, section: "Mind", text: "Can you read for 30+ minutes without losing focus?", type: "yn", weight: 6 },
  { id: 79, section: "Mind", text: "Do you multitask frequently (multiple screens, tasks, conversations)?", type: "yn", weight: 5, reverse: true },

  { id: 80, section: "Mind", text: "How many hours per day do you spend on passive entertainment (social media, random browsing, TV)?", type: "select", options: [1, 2, 3, 4, 5], optionLabels: ["5+ hrs", "3-5 hrs", "1-3 hrs", "30 min-1 hr", "<30 min"], weight: 8 },
  { id: 80.5, section: "Mind", text: "Do you own a smartphone?", type: "yn", weight: 0 },
  { id: 81, section: "Mind", text: "Do you check your phone within 30 minutes of waking up?", type: "yn", weight: 5, reverse: true, showIf: { id: 80.5, answer: 'yes' } },
  { id: 82, section: "Mind", text: "Do you have set boundaries or screen time limits on your phone?", type: "yn", weight: 6, showIf: { id: 80.5, answer: 'yes' } },
  { id: 83, section: "Mind", text: "Do you feel addicted to or controlled by your phone?", type: "yn", weight: 7, reverse: true, showIf: { id: 80.5, answer: 'yes' } },
  { id: 84, section: "Mind", text: "How intentionally do you use your phone as a tool?", type: "scale", weight: 6, scaleLabels: ["Mindless consumption", "Fully intentional"], showIf: { id: 80.5, answer: 'yes' } },
  { id: 85, section: "Mind", text: "Do you take regular breaks from screens throughout the day?", type: "yn", weight: 5 },

  { id: 86, section: "Mind", text: "When you encounter new information, do you verify it from multiple sources before accepting it?", type: "yn", weight: 7 },
  { id: 87, section: "Mind", text: "Can you change your mind when presented with compelling evidence?", type: "yn", weight: 7 },
  { id: 88, section: "Mind", text: "Can you articulate the strongest arguments against your own opinions?", type: "yn", weight: 6 },
  { id: 89, section: "Mind", text: "When making important decisions, do you use a structured approach (research, pros/cons, criteria)?", type: "yn", weight: 6 },
  { id: 90, section: "Mind", text: "Do you tend to make impulsive decisions you later regret?", type: "yn", weight: 6, reverse: true },
  { id: 91, section: "Mind", text: "How confident are you in your ability to solve complex problems?", type: "scale", weight: 6, scaleLabels: ["Not confident at all", "Very confident"] },
  { id: 92, section: "Mind", text: "Do you consider long-term consequences when making decisions?", type: "yn", weight: 6 },
  { id: 93, section: "Mind", text: "Do you seek advice from wise or knowledgeable people before major decisions?", type: "yn", weight: 5 },

  { id: 94, section: "Mind", text: "How would you rate your memory for important information?", type: "scale", weight: 6, scaleLabels: ["Very Poor", "Excellent"] },
  { id: 95, section: "Mind", text: "Do you use any external system to capture and organize information (notes, apps, journals)?", type: "yn", weight: 6 },
  { id: 96, section: "Mind", text: "Do you regularly review and reflect on what you have learned?", type: "yn", weight: 5 },
  { id: 97, section: "Mind", text: "Do you write or journal to process your thoughts?", type: "yn", weight: 5 },
  { id: 98, section: "Mind", text: "Do you frequently forget important tasks, appointments, or commitments?", type: "yn", weight: 6, reverse: true },
  { id: 99, section: "Mind", text: "Can you clearly explain complex ideas in simple terms?", type: "yn", weight: 5 },

  { id: 100, section: "Mind", text: "How often do you feel mentally overwhelmed or unable to think clearly?", type: "scale", weight: 8, scaleLabels: ["Daily", "Rarely"] },
  { id: 101, section: "Mind", text: "Do you experience brain fog or difficulty concentrating regularly?", type: "yn", weight: 7, reverse: true },
  { id: 102, section: "Mind", text: "How would you rate your current mental clarity and sharpness?", type: "scale", weight: 7, scaleLabels: ["Very Foggy", "Very Sharp"] },
  { id: 103, section: "Mind", text: "Do you engage in activities specifically for cognitive health (puzzles, games, learning)?", type: "yn", weight: 5 },
  { id: 104, section: "Mind", text: "Do you feel curious about the world around you?", type: "yn", weight: 6 },
  { id: 105, section: "Mind", text: "Do you experience racing thoughts or mental anxiety frequently?", type: "yn", weight: 6, reverse: true },
  { id: 106, section: "Mind", text: "How mentally sharp do you feel in the morning?", type: "scale", weight: 5, scaleLabels: ["Takes hours to wake up", "Sharp immediately"] },

  { id: 107, section: "Mind", text: "Do you regularly read Scripture or wisdom literature?", type: "yn", weight: 7 },
  { id: 108, section: "Mind", text: "Do you seek God's guidance in your thinking and decisions?", type: "yn", weight: 7 },
  { id: 109, section: "Mind", text: "Do you have mentors or wise counselors you learn from?", type: "yn", weight: 6 },
  { id: 110, section: "Mind", text: "Can you discern between wisdom and foolishness in daily situations?", type: "yn", weight: 6 },
  { id: 111, section: "Mind", text: "How often do you think carefully before you speak?", type: "scale", weight: 6, scaleLabels: ["Often say things I regret", "Always think before speaking"] },
  { id: 112, section: "Mind", text: "Do you learn from your mistakes and avoid repeating them?", type: "yn", weight: 6 },
  { id: 113, section: "Mind", text: "Do you value truth even when it is uncomfortable?", type: "yn", weight: 6 },


  // === HEART ===

  { id: 114, section: "Heart", text: "Do you have at least one person you can share anything with and trust completely?", type: "yn", weight: 10 },
  { id: 115, section: "Heart", text: "How many close friends do you have that you speak with at least monthly?", type: "select", options: [0, 1, 2, 3, 4, 5], weight: 8 },
  { id: 116, section: "Heart", text: "Do you feel known and understood by the people closest to you?", type: "yn", weight: 9 },
  { id: 117, section: "Heart", text: "Do you regularly spend quality time with people you care about?", type: "yn", weight: 8 },
  { id: 118, section: "Heart", text: "How often do you have meaningful conversations (beyond small talk) per week?", type: "select", options: [0, 1, 2, 3, 4, 5], weight: 7 },
  { id: 119, section: "Heart", text: "Do you feel lonely often?", type: "yn", weight: 8, reverse: true },
  { id: 120, section: "Heart", text: "Do you have friends who challenge you to grow and hold you accountable?", type: "yn", weight: 7 },
  { id: 121, section: "Heart", text: "Are you satisfied with the depth and quality of your friendships?", type: "yn", weight: 7 },

  { id: 122, section: "Heart", text: "Do you have a healthy relationship with your parents, or have you made peace with the past?", type: "yn", weight: 8 },
  { id: 122.5, section: "Heart", text: "Do you have siblings?", type: "yn", weight: 0 },
  { id: 123, section: "Heart", text: "Do you have healthy relationships with your siblings?", type: "yn", weight: 6, showIf: { id: 122.5, answer: 'yes' } },
  { id: 124, section: "Heart", text: "Are you married?", type: "yn", weight: 0 },
  { id: 124.1, section: "Heart", text: "How would you rate your marriage overall?", type: "scale", weight: 10, scaleLabels: ["Struggling", "Thriving"], showIf: { id: 124, answer: 'yes' } },
  { id: 124.5, section: "Heart", text: "Do you have children?", type: "yn", weight: 0 },
  { id: 125, section: "Heart", text: "Do you have strong, healthy relationships with each of your children?", type: "yn", weight: 9, showIf: { id: 124.5, answer: 'yes' } },
  { id: 126, section: "Heart", text: "Do you prioritize family time in your schedule?", type: "yn", weight: 7 },
  { id: 127, section: "Heart", text: "Are there unresolved conflicts in your family that weigh on you?", type: "yn", weight: 7, reverse: true },
  { id: 128, section: "Heart", text: "Do you regularly express love and appreciation to family members?", type: "yn", weight: 6 },

  { id: 129, section: "Heart", text: "How would you rate your overall emotional health?", type: "scale", weight: 9, scaleLabels: ["Struggling", "Thriving"] },
  { id: 130, section: "Heart", text: "Are you able to identify and name your emotions when you feel them?", type: "yn", weight: 7 },
  { id: 131, section: "Heart", text: "Do you express your emotions in healthy ways?", type: "yn", weight: 8 },
  { id: 132, section: "Heart", text: "Do you suppress or bottle up your emotions?", type: "yn", weight: 7, reverse: true },
  { id: 133, section: "Heart", text: "Do you experience frequent anxiety or worry?", type: "yn", weight: 7, reverse: true },
  { id: 134, section: "Heart", text: "Do you experience depression or persistent sadness?", type: "yn", weight: 8, reverse: true },
  { id: 135, section: "Heart", text: "Are you able to regulate your emotions — calm yourself when upset?", type: "yn", weight: 7 },
  { id: 136, section: "Heart", text: "Do you have healthy coping mechanisms for stress?", type: "yn", weight: 7 },

  { id: 137, section: "Heart", text: "Are you holding grudges or unforgiveness toward anyone?", type: "yn", weight: 9, reverse: true },
  { id: 138, section: "Heart", text: "Do you forgive others when they wrong you?", type: "yn", weight: 8 },
  { id: 139, section: "Heart", text: "Is there anyone you need to ask forgiveness from?", type: "yn", weight: 7, reverse: true },
  { id: 140, section: "Heart", text: "Do you apologize when you are wrong?", type: "yn", weight: 7 },
  { id: 141, section: "Heart", text: "Are there broken relationships in your life that could be reconciled?", type: "yn", weight: 6, reverse: true },
  { id: 142, section: "Heart", text: "Do you deal with conflict directly rather than avoiding it?", type: "yn", weight: 6 },
  { id: 143, section: "Heart", text: "Can you separate a person from their behavior — hate the sin, love the sinner?", type: "yn", weight: 6 },

  { id: 144, section: "Heart", text: "Do you regularly practice gratitude — counting your blessings?", type: "yn", weight: 7 },
  { id: 145, section: "Heart", text: "Do you express thanks to others for what they do?", type: "yn", weight: 6 },
  { id: 146, section: "Heart", text: "Do you tend toward optimism or pessimism?", type: "scale", weight: 5, scaleLabels: ["Very Pessimistic", "Very Optimistic"] },
  { id: 147, section: "Heart", text: "Do you celebrate others' successes genuinely without envy?", type: "yn", weight: 6 },
  { id: 148, section: "Heart", text: "Do you tend to focus on what you have rather than what you lack?", type: "yn", weight: 6 },
  { id: 149, section: "Heart", text: "Do you find joy in everyday moments?", type: "yn", weight: 6 },

  { id: 150, section: "Heart", text: "Do you easily empathize with others' feelings and perspectives?", type: "yn", weight: 7 },
  { id: 160, section: "Heart", text: "Do you show compassion to those who are suffering?", type: "yn", weight: 7 },
  { id: 161, section: "Heart", text: "When someone is speaking, how well do you listen?", type: "scale", weight: 7, scaleLabels: ["Listen to respond", "Listen to understand"] },
  { id: 162, section: "Heart", text: "Do you give others the benefit of the doubt?", type: "yn", weight: 6 },
  { id: 163, section: "Heart", text: "Do you judge others harshly or critically?", type: "yn", weight: 6, reverse: true },
  { id: 164, section: "Heart", text: "Do you remember and follow up on what people share with you?", type: "yn", weight: 5 },

  { id: 165, section: "Heart", text: "Do you regularly perform acts of kindness for others?", type: "yn", weight: 7 },
  { id: 166, section: "Heart", text: "Do you give generously of your time to people who need it?", type: "yn", weight: 7 },
  { id: 167, section: "Heart", text: "Do you encourage and build others up with your words?", type: "yn", weight: 7 },
  { id: 168, section: "Heart", text: "Do you serve your family sacrificially?", type: "yn", weight: 8 },
  { id: 169, section: "Heart", text: "Do you love people who are difficult to love?", type: "yn", weight: 7 },
  { id: 170, section: "Heart", text: "Do you pray for others regularly?", type: "yn", weight: 6 },
  { id: 171, section: "Heart", text: "How often do you reach out to check on others without prompting?", type: "scale", weight: 6, scaleLabels: ["Rarely", "Daily"] },
  { id: 172, section: "Heart", text: "Do you put others' needs before your own preferences?", type: "yn", weight: 7 },


  // === HAND ===

  { id: 173, section: "Hand", text: "Do you have at least one practical skill you actively develop and practice?", type: "yn", weight: 10 },
  { id: 174, section: "Hand", text: "How many hours per week do you spend practicing or developing a skill?", type: "select", options: [0, 1, 2, 3, 4, 5, 6, 7], weight: 9 },
  { id: 175, section: "Hand", text: "How would you rate your proficiency in your primary skill?", type: "scale", weight: 8, scaleLabels: ["Beginner", "Expert"] },
  { id: 176, section: "Hand", text: "Do you create things with your hands regularly (not just consume)?", type: "yn", weight: 8 },
  { id: 177, section: "Hand", text: "Do you take pride in the quality of your work?", type: "yn", weight: 7 },
  { id: 178, section: "Hand", text: "Do you finish projects you start?", type: "yn", weight: 8 },
  { id: 179, section: "Hand", text: "How many distinct practical skills do you possess at a competent level?", type: "select", options: [0, 1, 2, 3, 4, 5], weight: 7 },

  { id: 180, section: "Hand", text: "Can you perform basic home repairs (fix a leaky faucet, patch a hole, unclog a drain)?", type: "yn", weight: 6 },
  { id: 181, section: "Hand", text: "Can you use basic hand tools competently (hammer, screwdriver, drill, saw)?", type: "yn", weight: 6 },
  { id: 182, section: "Hand", text: "Can you assemble furniture or follow technical instructions?", type: "yn", weight: 5 },
  { id: 183, section: "Hand", text: "Do you maintain your home and possessions proactively — not just when they break?", type: "yn", weight: 6 },
  { id: 184, section: "Hand", text: "Can you perform basic car maintenance (change a tire, check fluids, jump a battery)?", type: "yn", weight: 5 },
  { id: 185, section: "Hand", text: "Do you fix things yourself when possible rather than immediately hiring someone?", type: "yn", weight: 5 },

  { id: 186, section: "Hand", text: "Can you cook a healthy, complete meal from scratch?", type: "yn", weight: 7 },
  { id: 187, section: "Hand", text: "How many meals per week do you cook at home?", type: "select", options: [0, 1, 2, 3, 4, 5, 6, 7], weight: 7 },
  { id: 188, section: "Hand", text: "Do you know how to follow a recipe and adapt it?", type: "yn", weight: 5 },
  { id: 189, section: "Hand", text: "Can you cook at least 5 different meals without a recipe?", type: "yn", weight: 6 },
  { id: 190, section: "Hand", text: "Do you know basic knife skills and cooking techniques?", type: "yn", weight: 5 },
  { id: 191, section: "Hand", text: "Can you plan meals and shop efficiently for a week?", type: "yn", weight: 5 },
  { id: 192, section: "Hand", text: "Do you know how to properly store food and assess freshness?", type: "yn", weight: 4 },

  { id: 193, section: "Hand", text: "Are you currently learning or improving a skill?", type: "yn", weight: 8 },
  { id: 194, section: "Hand", text: "Do you seek feedback to improve your work?", type: "yn", weight: 6 },
  { id: 195, section: "Hand", text: "Do you invest in tools, resources, or training to improve your skills?", type: "yn", weight: 5 },
  { id: 196, section: "Hand", text: "Do you practice deliberately — focused improvement rather than just going through motions?", type: "yn", weight: 7 },
  { id: 197, section: "Hand", text: "Have you learned a new skill in the past year?", type: "yn", weight: 6 },
  { id: 198, section: "Hand", text: "Do you push yourself to improve rather than staying at a comfortable level?", type: "yn", weight: 6 },

  { id: 199, section: "Hand", text: "Do you teach or share your skills with others?", type: "yn", weight: 5 },
  { id: 200, section: "Hand", text: "Could you explain how to do your skill to a complete beginner?", type: "yn", weight: 5 },
  { id: 201, section: "Hand", text: "Have you mentored or helped someone develop a skill?", type: "yn", weight: 5 },

  { id: 202, section: "Hand", text: "Do you do quality work even when no one is watching?", type: "yn", weight: 8 },
  { id: 203, section: "Hand", text: "Do you take shortcuts that compromise quality?", type: "yn", weight: 6, reverse: true },
  { id: 204, section: "Hand", text: "Do you complete tasks thoroughly rather than just adequately?", type: "yn", weight: 7 },
  { id: 205, section: "Hand", text: "Do you clean up and organize after completing a project?", type: "yn", weight: 5 },
  { id: 206, section: "Hand", text: "Do you maintain your tools and equipment properly?", type: "yn", weight: 5 },
  { id: 207, section: "Hand", text: "Do you approach your work as service to God and others, not just obligation?", type: "yn", weight: 7 },


  // === FINANCE ===

  { id: 208, section: "Finance", text: "Do you have a written monthly budget that you follow?", type: "yn", weight: 10 },
  { id: 209, section: "Finance", text: "Do you track your spending regularly (at least weekly)?", type: "yn", weight: 8 },
  { id: 210, section: "Finance", text: "Do you know your net worth (assets minus liabilities)?", type: "yn", weight: 6 },
  { id: 211, section: "Finance", text: "Do you live below your means — spend less than you earn?", type: "yn", weight: 10 },
  { id: 212, section: "Finance", text: "Do you have financial goals written down?", type: "yn", weight: 7 },
  { id: 213, section: "Finance", text: "How would you rate your current financial stress level?", type: "scale", weight: 8, scaleLabels: ["Very Stressed", "No Stress"] },

  { id: 214, section: "Finance", text: "Do you have an emergency fund?", type: "yn", weight: 9 },
  { id: 215, section: "Finance", text: "How many months of expenses does your emergency fund cover?", type: "select", options: [0, 1, 2, 3, 4, 5, 6], weight: 10 },
  { id: 216, section: "Finance", text: "Do you save money consistently each month?", type: "yn", weight: 8 },
  { id: 217, section: "Finance", text: "Do you have automatic transfers to savings?", type: "yn", weight: 6 },
  { id: 218, section: "Finance", text: "Are you saving for specific future goals (house, car, vacation)?", type: "yn", weight: 6 },

  { id: 219, section: "Finance", text: "Do you carry credit card debt from month to month?", type: "yn", weight: 9, reverse: true },
  { id: 220, section: "Finance", text: "Do you have any debt other than a mortgage (car loans, student loans, personal loans)?", type: "yn", weight: 6, reverse: true },
  { id: 221, section: "Finance", text: "Do you know exactly how much total debt you have?", type: "yn", weight: 7 },
  { id: 222, section: "Finance", text: "Do you have a plan to become debt-free?", type: "yn", weight: 7 },
  { id: 223, section: "Finance", text: "Are you making more than minimum payments on any debt?", type: "yn", weight: 6 },
  { id: 224, section: "Finance", text: "Do you use debt to buy things you cannot afford?", type: "yn", weight: 8, reverse: true },

  { id: 225, section: "Finance", text: "Are you contributing to retirement savings (401k, IRA, etc.)?", type: "yn", weight: 9 },
  { id: 225.5, section: "Finance", text: "Does your employer offer a retirement contribution match?", type: "yn", weight: 0, showIf: { id: 225, answer: 'yes' } },
  { id: 226, section: "Finance", text: "Are you contributing enough to get the full employer match?", type: "yn", weight: 8, showIf: { id: 225.5, answer: 'yes' } },
  { id: 227, section: "Finance", text: "What percentage of your income do you save for retirement?", type: "select", options: [0, 1, 2, 3, 4, 5], optionLabels: ["0%", "1-3%", "4-6%", "7-10%", "11-14%", "15%+"], weight: 7 },
  { id: 228, section: "Finance", text: "Do you understand basic investing principles (diversification, compound interest)?", type: "yn", weight: 6 },
  { id: 229, section: "Finance", text: "Do you have investments outside of retirement accounts?", type: "yn", weight: 5 },
  { id: 230, section: "Finance", text: "Do you know what your retirement accounts are invested in?", type: "yn", weight: 5 },

  { id: 231, section: "Finance", text: "Do you tithe or give regularly to your church?", type: "yn", weight: 9 },
  { id: 232, section: "Finance", text: "Do you give to charitable causes beyond your church?", type: "yn", weight: 6 },
  { id: 233, section: "Finance", text: "Is giving a planned part of your budget — not just leftovers?", type: "yn", weight: 7 },
  { id: 234, section: "Finance", text: "Do you give generously when you see needs?", type: "yn", weight: 6 },
  { id: 235, section: "Finance", text: "What percentage of your income do you give away?", type: "select", options: [0, 1, 2, 3, 4, 5], optionLabels: ["0%", "1-3%", "4-6%", "7-10%", "11-14%", "15%+"], weight: 7 },

  { id: 236, section: "Finance", text: "Do you have adequate health insurance?", type: "yn", weight: 7 },
  { id: 237, section: "Finance", text: "Do you have life insurance?", type: "yn_na", weight: 7 },
  { id: 238, section: "Finance", text: "Do you have a will or estate plan?", type: "yn", weight: 6 },
  { id: 239, section: "Finance", text: "Do you have disability insurance or income protection?", type: "yn", weight: 5 },
  { id: 240, section: "Finance", text: "Are your important financial documents organized and accessible?", type: "yn", weight: 5 },

  { id: 241, section: "Finance", text: "Do you earn enough to meet your basic needs?", type: "yn", weight: 8 },
  { id: 242, section: "Finance", text: "Do you have multiple sources of income?", type: "yn", weight: 5 },
  { id: 243, section: "Finance", text: "Are you content with what you have — not always wanting more?", type: "yn", weight: 8 },
  { id: 244, section: "Finance", text: "Do you make purchases impulsively that you later regret?", type: "yn", weight: 7, reverse: true },
  { id: 245, section: "Finance", text: "Do you compare your financial situation to others?", type: "yn", weight: 5, reverse: true },
  { id: 246, section: "Finance", text: "Do you trust God with your finances?", type: "yn", weight: 8 },
  { id: 247, section: "Finance", text: "Do you see yourself as a steward — a manager rather than owner — of your money?", type: "yn", weight: 7 },


  // === SPIRIT ===
  { id: 247.5, section: "Spirit", text: "Do you trust in Jesus Christ alone for the forgiveness of your sins?", type: "yn", weight: 100 },


  // === VITALITY ===

  { id: 248, section: "Vitality", text: "Do you read or hear God's Word (Scripture) regularly?", type: "yn", weight: 10 },
  { id: 249, section: "Vitality", text: "How many days per week do you spend time in Scripture?", type: "select", options: [0, 1, 2, 3, 4, 5, 6, 7], weight: 9 },
  { id: 250, section: "Vitality", text: "Do you meditate on Scripture, letting it dwell in you richly?", type: "yn", weight: 7 },
  { id: 251, section: "Vitality", text: "Do you have Scripture passages memorized?", type: "yn", weight: 5 },
  { id: 252, section: "Vitality", text: "Do you study Scripture to understand its meaning in context?", type: "yn", weight: 6 },

  { id: 253, section: "Vitality", text: "Do you attend Divine Service (church) weekly?", type: "yn", weight: 10 },
  { id: 254, section: "Vitality", text: "Do you receive the Lord's Supper regularly?", type: "yn", weight: 10 },
  { id: 255, section: "Vitality", text: "Do you examine yourself before receiving the Sacrament?", type: "yn", weight: 7 },
  { id: 256, section: "Vitality", text: "Do you believe Christ's true body and blood are present in the Supper for forgiveness?", type: "yn", weight: 9 },
  { id: 257, section: "Vitality", text: "Do you value your Baptism and remember it daily?", type: "yn", weight: 8 },

  { id: 258, section: "Vitality", text: "Do you confess your sins regularly?", type: "yn", weight: 9 },
  { id: 259, section: "Vitality", text: "Do you believe God truly forgives you when absolution is spoken?", type: "yn", weight: 9 },
  { id: 260, section: "Vitality", text: "Have you made use of private confession and absolution?", type: "yn", weight: 5 },
  { id: 261, section: "Vitality", text: "Do you examine yourself using the Ten Commandments?", type: "yn", weight: 7 },
  { id: 262, section: "Vitality", text: "Do you struggle with guilt even after confessing sins?", type: "yn", weight: 6, reverse: true },

  { id: 263, section: "Vitality", text: "Do you pray daily?", type: "yn", weight: 9 },
  { id: 264, section: "Vitality", text: "Do you pray the Lord's Prayer regularly?", type: "yn", weight: 7 },
  { id: 265, section: "Vitality", text: "Do you bring your anxieties and needs to God in prayer?", type: "yn", weight: 7 },
  { id: 266, section: "Vitality", text: "Do you pray for others (intercession)?", type: "yn", weight: 6 },
  { id: 267, section: "Vitality", text: "Do you include thanksgiving and praise in your prayers?", type: "yn", weight: 6 },

  { id: 268, section: "Vitality", text: "How well do you know Luther's Small Catechism?", type: "scale", weight: 7, scaleLabels: ["No familiarity", "Can recite and explain"] },
  { id: 269, section: "Vitality", text: "Can you explain the Six Chief Parts of Christian doctrine?", type: "yn", weight: 6 },
  { id: 270, section: "Vitality", text: "Do you continue to grow in your understanding of Christian doctrine?", type: "yn", weight: 6 },
  { id: 271, section: "Vitality", text: "Do you attend Bible class or other Christian education?", type: "yn", weight: 5 },

  { id: 272, section: "Vitality", text: "Do you understand your daily work as service to God and neighbor?", type: "yn", weight: 8 },
  { id: 273, section: "Vitality", text: "Do you serve your neighbor in your vocations (family, work, community)?", type: "yn", weight: 8 },
  { id: 274, section: "Vitality", text: "Do you seek to live according to God's Commandments out of love for Him?", type: "yn", weight: 8 },
  { id: 275, section: "Vitality", text: "Do you struggle to see how faith connects to daily life?", type: "yn", weight: 6, reverse: true },

  { id: 276, section: "Vitality", text: "Do you trust God's promises even when feelings or circumstances are troubled?", type: "yn", weight: 8 },
  { id: 277, section: "Vitality", text: "Do you recognize the attacks of the devil, world, and flesh in your life?", type: "yn", weight: 6 },
  { id: 278, section: "Vitality", text: "Do you fight temptation with God's Word and prayer?", type: "yn", weight: 7 },
  { id: 279, section: "Vitality", text: "Do you find joy in the Gospel and your identity in Christ?", type: "yn", weight: 8 },
  { id: 280, section: "Vitality", text: "How consistently do you practice Sabbath rest, trusting God rather than your own efforts?", type: "scale", weight: 6, scaleLabels: ["Never", "Consistently"] },


  // === STATUS ===

  { id: 281, section: "Status", text: "Do you act with integrity even when no one is watching?", type: "yn", weight: 10 },
  { id: 282, section: "Status", text: "Do you keep your commitments and promises?", type: "yn", weight: 10 },
  { id: 283, section: "Status", text: "Do you tell the truth consistently, even when it is costly?", type: "yn", weight: 9 },
  { id: 284, section: "Status", text: "Do you exaggerate or embellish to make yourself look better?", type: "yn", weight: 7, reverse: true },
  { id: 285, section: "Status", text: "Do you take responsibility for your mistakes publicly?", type: "yn", weight: 8 },
  { id: 286, section: "Status", text: "Is there alignment between your private life and public image?", type: "yn", weight: 9 },

  { id: 287, section: "Status", text: "Do you have a good reputation in your community?", type: "yn", weight: 8 },
  { id: 288, section: "Status", text: "Would people who know you well say you are trustworthy?", type: "yn", weight: 9 },
  { id: 289, section: "Status", text: "Are you known more for your character than your achievements?", type: "yn", weight: 7 },
  { id: 290, section: "Status", text: "Do people speak well of you when you are not present?", type: "yn", weight: 6 },
  { id: 291, section: "Status", text: "Have you damaged relationships through broken trust?", type: "yn", weight: 7, reverse: true },
  { id: 292, section: "Status", text: "Are you respected by your peers?", type: "yn", weight: 7 },

  { id: 293, section: "Status", text: "Do you gossip or speak negatively about others?", type: "yn", weight: 8, reverse: true },
  { id: 294, section: "Status", text: "Do you build others up with your words?", type: "yn", weight: 7 },
  { id: 295, section: "Status", text: "Do you speak the truth in love, even when it is difficult?", type: "yn", weight: 7 },
  { id: 296, section: "Status", text: "Do you listen more than you speak?", type: "yn", weight: 6 },
  { id: 297, section: "Status", text: "Do you complain frequently?", type: "yn", weight: 5, reverse: true },
  { id: 298, section: "Status", text: "Can you keep confidential information confidential?", type: "yn", weight: 8 },

  { id: 299, section: "Status", text: "Do people seek your advice or counsel?", type: "yn", weight: 7 },
  { id: 300, section: "Status", text: "Do you lead or mentor others?", type: "yn", weight: 6 },
  { id: 301, section: "Status", text: "How would you rate your influence in your workplace or community?", type: "scale", weight: 6, scaleLabels: ["No influence", "Significant influence"] },
  { id: 302, section: "Status", text: "When you have influence, how do you tend to use it?", type: "scale", weight: 8, scaleLabels: ["Serve myself", "Help others"] },
  { id: 303, section: "Status", text: "Do people follow your example?", type: "yn", weight: 6 },
  { id: 304, section: "Status", text: "Are you comfortable leading when called upon?", type: "yn", weight: 5 },

  { id: 305, section: "Status", text: "Do you seek recognition and credit for your work?", type: "yn", weight: 6, reverse: true },
  { id: 306, section: "Status", text: "Do you celebrate others' successes genuinely?", type: "yn", weight: 7 },
  { id: 307, section: "Status", text: "Do you serve without expecting recognition?", type: "yn", weight: 8 },
  { id: 308, section: "Status", text: "Can you receive correction without becoming defensive?", type: "yn", weight: 7 },
  { id: 309, section: "Status", text: "Do you give credit to others who deserve it?", type: "yn", weight: 7 },
  { id: 310, section: "Status", text: "Do you consider yourself better than others?", type: "yn", weight: 7, reverse: true },

  { id: 311, section: "Status", text: "Do you address conflict directly and respectfully?", type: "yn", weight: 7 },
  { id: 312, section: "Status", text: "Do you hold grudges?", type: "yn", weight: 6, reverse: true },
  { id: 313, section: "Status", text: "Do you apologize when you are wrong?", type: "yn", weight: 8 },
  { id: 314, section: "Status", text: "Do you seek reconciliation in broken relationships?", type: "yn", weight: 7 },
  { id: 315, section: "Status", text: "Do you give others the benefit of the doubt?", type: "yn", weight: 6 },


  // === SPACE ===

  { id: 316, section: "Space", text: "Is your home generally clean and organized?", type: "yn", weight: 9 },
  { id: 317, section: "Space", text: "Do you have a place for everything you own?", type: "yn", weight: 8 },
  { id: 318, section: "Space", text: "Can you find things easily when you need them?", type: "yn", weight: 7 },
  { id: 319, section: "Space", text: "Do you have piles of clutter that have accumulated?", type: "yn", weight: 7, reverse: true },
  { id: 320, section: "Space", text: "Is your home a peaceful, restful environment?", type: "yn", weight: 8 },
  { id: 321, section: "Space", text: "Do you feel embarrassed when unexpected guests arrive?", type: "yn", weight: 6, reverse: true },
  { id: 322, section: "Space", text: "How would you rate the overall organization of your home?", type: "scale", weight: 8, scaleLabels: ["Chaotic", "Very Organized"] },

  { id: 323, section: "Space", text: "Do you have regular cleaning routines?", type: "yn", weight: 8 },
  { id: 324, section: "Space", text: "Is your kitchen clean and functional?", type: "yn", weight: 7 },
  { id: 325, section: "Space", text: "Is your bathroom clean and maintained?", type: "yn", weight: 7 },
  { id: 326, section: "Space", text: "Do you make your bed daily?", type: "yn", weight: 5 },
  { id: 327, section: "Space", text: "Do you wash dishes promptly — same day?", type: "yn", weight: 6 },
  { id: 328, section: "Space", text: "Do you do laundry regularly before it piles up?", type: "yn", weight: 6 },
  { id: 329, section: "Space", text: "Is your home free of deferred maintenance (broken things, needed repairs)?", type: "yn", weight: 6 },

  { id: 330, section: "Space", text: "Do you own things you never use?", type: "yn", weight: 6, reverse: true },
  { id: 331, section: "Space", text: "Do you regularly purge items you no longer need?", type: "yn", weight: 7 },
  { id: 332, section: "Space", text: "Is your closet organized with clothes you actually wear?", type: "yn", weight: 6 },
  { id: 333, section: "Space", text: "Do you have storage areas filled with things you have forgotten about?", type: "yn", weight: 5, reverse: true },
  { id: 334, section: "Space", text: "Do you struggle to let go of possessions?", type: "yn", weight: 6, reverse: true },
  { id: 335, section: "Space", text: "Do you buy things you do not need?", type: "yn", weight: 6, reverse: true },

  { id: 336, section: "Space", text: "Is your workspace (desk, office) organized and functional?", type: "yn", weight: 8 },
  { id: 337, section: "Space", text: "Can you work effectively without clutter distracting you?", type: "yn", weight: 7 },
  { id: 338, section: "Space", text: "Do you have a designated place for focused work?", type: "yn", weight: 6 },
  { id: 339, section: "Space", text: "Is your digital workspace organized (files, desktop, email)?", type: "yn", weight: 6 },

  { id: 340, section: "Space", text: "Do you have systems for managing mail and paperwork?", type: "yn", weight: 6 },
  { id: 341, section: "Space", text: "Do you put things away immediately after using them?", type: "yn", weight: 7 },
  { id: 342, section: "Space", text: "Do you have a daily reset or tidying routine?", type: "yn", weight: 7 },
  { id: 343, section: "Space", text: "Do you maintain your organizational systems over time, or does it always slip back?", type: "yn", weight: 7 },

  { id: 344, section: "Space", text: "Is your home ready to welcome guests?", type: "yn", weight: 6 },
  { id: 345, section: "Space", text: "Does your environment reflect your values?", type: "yn", weight: 6 },
  { id: 346, section: "Space", text: "Do you invest in making your space beautiful, not just functional?", type: "yn", weight: 5 },
  { id: 347, section: "Space", text: "Does your physical environment support your goals and well-being?", type: "yn", weight: 7 },
  { id: 349, section: "Space", text: "Do you feel at peace in your home?", type: "yn", weight: 8 },


  // === TIME ===

  { id: 350, section: "Time", text: "Do you plan your days intentionally?", type: "yn", weight: 9 },
  { id: 351, section: "Time", text: "Do you have clear priorities that guide how you spend your time?", type: "yn", weight: 10 },
  { id: 352, section: "Time", text: "Do you use a calendar to schedule your commitments?", type: "yn", weight: 8 },
  { id: 353, section: "Time", text: "Do you use a task management system (to-do list, app, etc.)?", type: "yn", weight: 7 },
  { id: 354, section: "Time", text: "Do you plan your week in advance?", type: "yn", weight: 8 },
  { id: 355, section: "Time", text: "Do you know your most important tasks each day?", type: "yn", weight: 9 },

  { id: 356, section: "Time", text: "Can you focus on a single task for extended periods without distraction?", type: "yn", weight: 8 },
  { id: 357, section: "Time", text: "Do you complete what you set out to do each day?", type: "yn", weight: 8 },
  { id: 358, section: "Time", text: "Do you frequently feel overwhelmed by all you have to do?", type: "yn", weight: 7, reverse: true },
  { id: 359, section: "Time", text: "Do you procrastinate on important tasks?", type: "yn", weight: 8, reverse: true },
  { id: 360, section: "Time", text: "How often do you get distracted during focused work?", type: "scale", weight: 7, scaleLabels: ["Constantly", "Rarely"] },
  { id: 361, section: "Time", text: "Do you batch similar tasks together for efficiency?", type: "yn", weight: 5 },

  { id: 362, section: "Time", text: "Do you know where your time actually goes?", type: "yn", weight: 7 },
  { id: 363, section: "Time", text: "Do you regularly review how you spent your time?", type: "yn", weight: 6 },
  { id: 364, section: "Time", text: "Are you often surprised by how much time has passed?", type: "yn", weight: 5, reverse: true },
  { id: 365, section: "Time", text: "Do you accurately estimate how long tasks will take?", type: "yn", weight: 6 },
  { id: 366, section: "Time", text: "Do you track time spent on different activities?", type: "yn", weight: 5 },

  { id: 367, section: "Time", text: "Do you protect time for your most important work?", type: "yn", weight: 8 },
  { id: 368, section: "Time", text: "Can you say no to requests that do not align with your priorities?", type: "yn", weight: 8 },
  { id: 369, section: "Time", text: "Do you have boundaries around your time (work hours, availability)?", type: "yn", weight: 7 },
  { id: 370, section: "Time", text: "Do you often overcommit and feel stretched too thin?", type: "yn", weight: 7, reverse: true },
  { id: 371, section: "Time", text: "Do interruptions frequently derail your plans?", type: "yn", weight: 6, reverse: true },

  { id: 372, section: "Time", text: "Do you practice Sabbath — regular rest from work?", type: "yn", weight: 8 },
  { id: 373, section: "Time", text: "Do you take breaks during work to maintain energy?", type: "yn", weight: 6 },
  { id: 374, section: "Time", text: "Do you have margin in your schedule — not every moment filled?", type: "yn", weight: 7 },
  { id: 375, section: "Time", text: "Do you feel rushed most of the time?", type: "yn", weight: 6, reverse: true },
  { id: 376, section: "Time", text: "Do you have regular rhythms and routines that structure your days?", type: "yn", weight: 7 },

  { id: 377, section: "Time", text: "Do you have written goals for this year?", type: "yn", weight: 7 },
  { id: 378, section: "Time", text: "Does how you spend your time align with what you say matters most?", type: "yn", weight: 9 },
  { id: 380, section: "Time", text: "Do you regularly review your goals and progress?", type: "yn", weight: 6 },
  { id: 381, section: "Time", text: "Do you feel your time is spent on meaningful activities?", type: "yn", weight: 8 },
  { id: 382, section: "Time", text: "Do you waste significant time on things that do not matter?", type: "yn", weight: 7, reverse: true },

  { id: 383, section: "Time", text: "Are you consistently on time for appointments and commitments?", type: "yn", weight: 7 },
  { id: 384, section: "Time", text: "Do you meet deadlines reliably?", type: "yn", weight: 8 },
  { id: 385, section: "Time", text: "Do you keep your time commitments to others?", type: "yn", weight: 7 },


  // === WORLD ===

  { id: 386, section: "World", text: "Can you clearly explain the Gospel message to someone?", type: "yn", weight: 10 },
  { id: 387, section: "World", text: "Have you shared your faith with someone in the past year?", type: "yn", weight: 9 },
  { id: 388, section: "World", text: "Do you pray regularly for unbelieving friends and family?", type: "yn", weight: 8 },
  { id: 389, section: "World", text: "Do you have relationships with people who do not know Christ?", type: "yn", weight: 8 },
  { id: 390, section: "World", text: "Are you comfortable talking about your faith when appropriate?", type: "yn", weight: 7 },
  { id: 391, section: "World", text: "Do you invite people to church or Christian events?", type: "yn", weight: 6 },

  { id: 392, section: "World", text: "Do you regularly serve others outside your family and church?", type: "yn", weight: 8 },
  { id: 393, section: "World", text: "Do you notice and respond to needs in your community?", type: "yn", weight: 7 },
  { id: 394, section: "World", text: "Have you volunteered for a charitable cause in the past year?", type: "yn", weight: 7 },
  { id: 395, section: "World", text: "Do you help the poor, hungry, or marginalized?", type: "yn", weight: 8 },
  { id: 396, section: "World", text: "Do you give to charitable causes beyond your church?", type: "yn", weight: 6 },
  { id: 397, section: "World", text: "How many hours per month do you spend serving others outside your family?", type: "select", options: [0, 1, 2, 3, 4, 5, 6, 7], weight: 7 },

  { id: 398, section: "World", text: "Do you actively serve in your local church?", type: "yn", weight: 9 },
  { id: 399, section: "World", text: "Do you use your gifts for the benefit of the congregation?", type: "yn", weight: 8 },
  { id: 400, section: "World", text: "Do you support your church's outreach and mission efforts?", type: "yn", weight: 7 },
  { id: 401, section: "World", text: "Do you welcome and connect with newcomers at church?", type: "yn", weight: 6 },
  { id: 402, section: "World", text: "Are you involved in a small group or ministry team?", type: "yn", weight: 6 },

  { id: 403, section: "World", text: "Do you pray for missionaries and global missions?", type: "yn", weight: 7 },
  { id: 404, section: "World", text: "Do you financially support missions?", type: "yn", weight: 7 },
  { id: 405, section: "World", text: "Are you aware of global needs and how the Church is responding?", type: "yn", weight: 5 },
  { id: 406, section: "World", text: "Have you participated in a mission trip or cross-cultural ministry?", type: "yn", weight: 5 },
  { id: 407, section: "World", text: "Do you care about the spread of the Gospel worldwide?", type: "yn", weight: 7 },

  { id: 408, section: "World", text: "Can you engage thoughtfully with cultural issues from a Christian perspective?", type: "yn", weight: 6 },
  { id: 409, section: "World", text: "Do you seek to be salt and light in your workplace and community?", type: "yn", weight: 8 },
  { id: 410, section: "World", text: "Do you live distinctively as a Christian in your daily life?", type: "yn", weight: 8 },
  { id: 411, section: "World", text: "Do you pray for your community and nation?", type: "yn", weight: 6 },
  { id: 412, section: "World", text: "Do you engage in civic responsibilities (voting, community involvement)?", type: "yn", weight: 5 },

  { id: 413, section: "World", text: "Do you know your neighbors by name?", type: "yn", weight: 6 },
  { id: 414, section: "World", text: "Do you look for ways to serve and bless your neighbors?", type: "yn", weight: 7 },
  { id: 415, section: "World", text: "Are you known as someone who helps others in your community?", type: "yn", weight: 6 },
  { id: 416, section: "World", text: "Do you show hospitality to those outside your normal circle?", type: "yn", weight: 7 },
  { id: 417, section: "World", text: "Do you love others in practical ways, not just in feeling?", type: "yn", weight: 8 },


  // === CREATIVE ===

  { id: 418, section: "Creative", text: "Do you regularly engage in creative activities?", type: "yn", weight: 9 },
  { id: 419, section: "Creative", text: "Do you have a creative hobby or artistic pursuit?", type: "yn", weight: 8 },
  { id: 420, section: "Creative", text: "How often do you create something — art, music, writing, crafts, etc.?", type: "select", options: [0, 1, 2, 3, 4, 5], optionLabels: ["Never", "Rarely", "Monthly", "Weekly", "Several times/week", "Daily"], weight: 8 },
  { id: 421, section: "Creative", text: "Do you make time for creative expression in your regular schedule?", type: "yn", weight: 7 },
  { id: 422, section: "Creative", text: "Have you created something you are proud of in the past year?", type: "yn", weight: 7 },

  { id: 423, section: "Creative", text: "Do you consider yourself a creative person?", type: "yn", weight: 7 },
  { id: 424, section: "Creative", text: "Do you believe creativity is a gift from God to be developed?", type: "yn", weight: 8 },
  { id: 425, section: "Creative", text: "Were you more creative as a child than you are now?", type: "yn", weight: 5, reverse: true },
  { id: 426, section: "Creative", text: "Do you feel that creativity is only for artistic people?", type: "yn", weight: 6, reverse: true },
  { id: 427, section: "Creative", text: "Do you suppress creative impulses because they seem impractical?", type: "yn", weight: 6, reverse: true },

  { id: 428, section: "Creative", text: "Have you developed skill in at least one creative medium?", type: "yn", weight: 8 },
  { id: 429, section: "Creative", text: "Do you continue to learn and grow in your creative abilities?", type: "yn", weight: 7 },
  { id: 430, section: "Creative", text: "Can you express yourself through at least one creative form?", type: "yn", weight: 7 },
  { id: 431, section: "Creative", text: "Have you taken classes or training to develop creative skills?", type: "yn", weight: 5 },
  { id: 432, section: "Creative", text: "Do you study and appreciate the creative work of others?", type: "yn", weight: 6 },

  { id: 433, section: "Creative", text: "Do you have dedicated space for creative work?", type: "yn", weight: 5 },
  { id: 434, section: "Creative", text: "Do you have the tools and materials you need for your creative pursuits?", type: "yn", weight: 5 },
  { id: 435, section: "Creative", text: "Do you finish creative projects you start?", type: "yn", weight: 7 },
  { id: 436, section: "Creative", text: "Do you share your creative work with others?", type: "yn", weight: 6 },
  { id: 437, section: "Creative", text: "Do you receive feedback on your creative work?", type: "yn", weight: 5 },

  { id: 438, section: "Creative", text: "Are you curious and open to new ideas?", type: "yn", weight: 7 },
  { id: 439, section: "Creative", text: "Do you see problems as opportunities for creative solutions?", type: "yn", weight: 7 },
  { id: 440, section: "Creative", text: "Are you willing to experiment and take creative risks?", type: "yn", weight: 6 },
  { id: 441, section: "Creative", text: "Do you embrace failure as part of the creative process?", type: "yn", weight: 6 },
  { id: 442, section: "Creative", text: "Do you find inspiration in everyday life?", type: "yn", weight: 6 },

  { id: 443, section: "Creative", text: "Does fear of failure or judgment prevent you from creating?", type: "yn", weight: 7, reverse: true },
  { id: 444, section: "Creative", text: "Do you feel too busy to be creative?", type: "yn", weight: 6, reverse: true },
  { id: 445, section: "Creative", text: "Do you compare your work to others and feel inadequate?", type: "yn", weight: 6, reverse: true },
  { id: 446, section: "Creative", text: "Do you struggle to start creative projects?", type: "yn", weight: 5, reverse: true },
  { id: 447, section: "Creative", text: "Do you believe it is too late for you to be creative?", type: "yn", weight: 5, reverse: true },

  { id: 448, section: "Creative", text: "Do you use your creativity to serve or bless others?", type: "yn", weight: 8 },
  { id: 449, section: "Creative", text: "Do you see your creativity as a way to glorify God?", type: "yn", weight: 8 },
  { id: 450, section: "Creative", text: "Does your creative work bring you joy and fulfillment?", type: "yn", weight: 7 },


  // === TECH ===

  { id: 451, section: "Tech", text: "Do you have healthy boundaries with your smartphone?", type: "yn", weight: 9, showIf: { id: 80.5, answer: 'yes' } },
  { id: 452, section: "Tech", text: "How many hours per day do you spend on screens (excluding work)?", type: "select", options: [1, 2, 3, 4, 5, 6, 7], optionLabels: ["7+ hrs", "6 hrs", "5 hrs", "4 hrs", "3 hrs", "2 hrs", "<1 hr"], weight: 8 },
  { id: 453, section: "Tech", text: "Do you check your phone first thing in the morning?", type: "yn", weight: 6, reverse: true, showIf: { id: 80.5, answer: 'yes' } },
  { id: 454, section: "Tech", text: "Do you use your phone during meals or conversations?", type: "yn", weight: 7, reverse: true, showIf: { id: 80.5, answer: 'yes' } },
  { id: 455, section: "Tech", text: "Can you go several hours without checking your phone?", type: "yn", weight: 7, showIf: { id: 80.5, answer: 'yes' } },
  { id: 456, section: "Tech", text: "Do you feel anxious when separated from your phone?", type: "yn", weight: 7, reverse: true, showIf: { id: 80.5, answer: 'yes' } },

  { id: 456.5, section: "Tech", text: "Do you use social media?", type: "yn", weight: 0 },
  { id: 457, section: "Tech", text: "Do you use social media intentionally rather than compulsively?", type: "yn", weight: 8, showIf: { id: 456.5, answer: 'yes' } },
  { id: 458, section: "Tech", text: "Does social media negatively affect your mood or self-image?", type: "yn", weight: 7, reverse: true, showIf: { id: 456.5, answer: 'yes' } },
  { id: 459, section: "Tech", text: "Do you compare yourself to others on social media?", type: "yn", weight: 6, reverse: true, showIf: { id: 456.5, answer: 'yes' } },
  { id: 460, section: "Tech", text: "Have you curated your social media feeds to be positive and helpful?", type: "yn", weight: 6, showIf: { id: 456.5, answer: 'yes' } },
  { id: 461, section: "Tech", text: "Can you take extended breaks from social media without difficulty?", type: "yn", weight: 6, showIf: { id: 456.5, answer: 'yes' } },
  { id: 462, section: "Tech", text: "Do you post thoughtfully rather than impulsively?", type: "yn", weight: 6, showIf: { id: 456.5, answer: 'yes' } },

  { id: 463, section: "Tech", text: "Do you have screen-free times built into your day?", type: "yn", weight: 8 },
  { id: 464, section: "Tech", text: "Do you have screen-free spaces in your home?", type: "yn", weight: 7 },
  { id: 465, section: "Tech", text: "Do you protect your sleep from screens — no screens before bed?", type: "yn", weight: 8 },
  { id: 466, section: "Tech", text: "Do you take regular breaks when using screens for extended periods?", type: "yn", weight: 6 },
  { id: 467, section: "Tech", text: "How much does technology enhance vs. dominate your life?", type: "scale", weight: 9, scaleLabels: ["Dominates my life", "Enhances my life"] },

  { id: 468, section: "Tech", text: "Do you use strong, unique passwords for your accounts?", type: "yn", weight: 7 },
  { id: 469, section: "Tech", text: "Do you use two-factor authentication where available?", type: "yn", weight: 6 },
  { id: 470, section: "Tech", text: "Are you cautious about what personal information you share online?", type: "yn", weight: 7 },
  { id: 471, section: "Tech", text: "Do you keep your devices and software updated?", type: "yn", weight: 5 },
  { id: 472, section: "Tech", text: "Have you reviewed your privacy settings on major platforms?", type: "yn", weight: 5 },

  { id: 473, section: "Tech", text: "Are you comfortable with the technology you need for work and life?", type: "yn", weight: 6 },
  { id: 474, section: "Tech", text: "Do you continue to learn new technology skills?", type: "yn", weight: 5 },
  { id: 475, section: "Tech", text: "Can you troubleshoot basic technology problems?", type: "yn", weight: 4 },
  { id: 476, section: "Tech", text: "Do you use technology to improve your productivity?", type: "yn", weight: 6 },

  { id: 477, section: "Tech", text: "Can you identify misinformation and unreliable sources online?", type: "yn", weight: 7 },
  { id: 478, section: "Tech", text: "Do you verify information before sharing it?", type: "yn", weight: 7 },
  { id: 479, section: "Tech", text: "Are you aware of how algorithms shape what you see online?", type: "yn", weight: 6 },
  { id: 480, section: "Tech", text: "Do you consume news and information from diverse, reliable sources?", type: "yn", weight: 6 },

  { id: 481, section: "Tech", text: "Do you use technology in ways that honor God?", type: "yn", weight: 8 },
  { id: 482, section: "Tech", text: "Does your online behavior reflect your Christian values?", type: "yn", weight: 8 },
  { id: 483, section: "Tech", text: "Do you protect yourself from harmful content online?", type: "yn", weight: 8 },
  { id: 484, section: "Tech", text: "Do you use technology to connect with and serve others?", type: "yn", weight: 6 },
  { id: 485, section: "Tech", text: "Are you teaching good digital habits to those in your care?", type: "yn_na", weight: 6 }

]; // end of assessmentData


// === STATE ===
let currentQuestionIndex = 0;
let userAnswers = {};


// === SKIP LOGIC ===

function shouldSkip(q) {
  if (!q.showIf) return false;
  const cond = q.showIf;
  const ans = userAnswers[cond.id];
  if (ans === undefined) return true;
  if (Array.isArray(cond.answer)) return !cond.answer.includes(ans);
  return ans !== cond.answer;
}

function advanceTo(idx) {
  while (idx < assessmentData.length && shouldSkip(assessmentData[idx])) idx++;
  return idx;
}

function retreatTo(idx) {
  while (idx >= 0 && shouldSkip(assessmentData[idx])) idx--;
  return idx;
}


// === CONTENT ROUTING ===

window.vpStartAssessment = function() {
  const input = document.getElementById('vp-name-input');
  const name = input ? input.value.trim() : '';
  if (!name) {
    if (input) input.style.borderColor = 'darkred';
    return;
  }
  window.vpUserName = name;
  currentQuestionIndex = 0;
  userAnswers = {};
  currentQuestionIndex = advanceTo(0);
  renderQuestion();
};

function showContent(section) {
  const pane = document.getElementById('display-pane');
  if (section === 'pathfinder') {
    pane.innerHTML = `
      <div class="assessment-container">
        <p><strong>Pathfinder Assessment</strong></p>
        <p>Before we begin, what is your name?</p>
        <hr>
        <input id="vp-name-input" type="text" placeholder="Your name"
          style="font-family:inherit;font-size:0.9em;padding:4px 8px;border:1px dotted #808080;background:#d4d0c8;width:200px;box-sizing:border-box;"
          onkeydown="if(event.key==='Enter')window.vpStartAssessment()">
        <div style="margin-top:10px;">
          <label class="link-button" style="cursor:pointer;" onclick="window.vpStartAssessment()">Begin &rarr;</label>
        </div>
      </div>`;
    setTimeout(function() {
      const input = document.getElementById('vp-name-input');
      if (input) input.focus();
    }, 50);
  } else if (section === 'about') {
    pane.innerHTML = `
      <div class="assessment-container">
        <p>About the Owner</p>
        <p>Follower of Jesus Christ. Confessional Lutheran (LCMS). Husband and Outdoor Guide based in Northwest Arkansas.</p>
        <hr>
        <p>About Victory Pages</p>
        <p>A Personal Operating System designed for intentional Christian living. Built on vocational stewardship and a progression system called Pathways. A new user starts with a questionaire that will determine the starting point. Existing users will log in with a saved file and continue where they left off. As the user completes and logs pathways by completing real-world tasks assigned by the site, new pathways and mini games are unlocked.</p>
        <hr>
        <p>Once finished reading the about section the New users will open <u>+Pathways</u>, select <u>New User</u>, and complete the questionaire to determine a starting point. The questionaire is an assesment of a users experiences in life and is in depth that will be measuring categories like health, faith, and status. A Save and Load function will be provided so that the questionaire will not need to be completed in one session and can be picked up later.</p>
      </div>`;
  } else if (section === 'library') {
    pane.innerHTML = `
      <div class="assessment-container">
        <p><strong>Library</strong></p>
        <p>Curated literature for the modern pilgrim.</p>
        <hr>
        <p><strong>Scripture Studies</strong></p>
        <p><a href="Psalms_study.html">Study on the Book of Psalms</a> &mdash; The site owner's personal study of the Psalms, updated as the study progresses.</p>
      </div>`;
  }
}


// === RENDER QUESTION ===

function renderQuestion() {
  const pane = document.getElementById('display-pane');
  const q = assessmentData[currentQuestionIndex];
  const answeredCount = Object.keys(userAnswers).length;
  const progress = Math.round((currentQuestionIndex / assessmentData.length) * 100);

  let inputHtml = '';

  if (q.type === 'yn') {
    const prev = userAnswers[q.id];
    inputHtml = `
      <label class="link-button" style="cursor:pointer;${prev==='yes'?' background:darkred;color:white;':''}" onclick="handleAnswer('yes')">Yes</label>
      <label class="link-button" style="cursor:pointer;${prev==='no'?' background:darkred;color:white;':''}" onclick="handleAnswer('no')">No</label>
    `;
  } else if (q.type === 'yn_na') {
    const prev = userAnswers[q.id];
    inputHtml = `
      <label class="link-button" style="cursor:pointer;${prev==='yes'?' background:darkred;color:white;':''}" onclick="handleAnswer('yes')">Yes</label>
      <label class="link-button" style="cursor:pointer;${prev==='no'?' background:darkred;color:white;':''}" onclick="handleAnswer('no')">No</label>
      <label class="link-button" style="cursor:pointer;${prev==='na'?' background:darkred;color:white;':''}" onclick="handleAnswer('na')">N/A</label>
    `;
  } else if (q.type === 'scale') {
    const labels = q.scaleLabels || ['', ''];
    const prev = userAnswers[q.id];
    const btns = [1,2,3,4,5].map(n =>
      `<label class="link-button" style="cursor:pointer;min-width:28px;text-align:center;${prev===n?' background:darkred;color:white;':''}" onclick="handleAnswer(${n})">${n}</label>`
    ).join(' ');
    inputHtml = `
      <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
        <span style="font-size:0.82em;color:#666;">${labels[0]}</span>
        ${btns}
        <span style="font-size:0.82em;color:#666;">${labels[1]}</span>
      </div>
    `;
  } else if (q.type === 'select') {
    const prev = userAnswers[q.id];
    inputHtml = q.options.map((opt, i) => {
      const label = q.optionLabels ? q.optionLabels[i] : opt;
      return `<label class="link-button" style="cursor:pointer;${prev===opt?' background:darkred;color:white;':''}" onclick="handleAnswer(${opt})">${label}</label>`;
    }).join(' ');
  }

  pane.innerHTML = `
    <div class="assessment-container">
      <h3>Pathfinder Assessment</h3>
      <p>Progress: ${progress}%</p>
      <hr>
      <p class="question-text">${q.text}</p>
      <br>
      <div class="answer-zone">${inputHtml}</div>
      <hr>
      <div class="save-load-zone">
        <label class="link-button" style="cursor:pointer;${currentQuestionIndex === 0 ? 'opacity:0.4;pointer-events:none;' : ''}" onclick="prevQuestion()">&#8592; Back</label>
        &nbsp;
        <label class="link-button" style="cursor:pointer;" onclick="saveProgress()">Save</label>
        &nbsp;
        <label class="link-button" style="cursor:pointer;">
          Load<input type="file" accept=".json" onchange="loadProgress(event)" style="display:none;">
        </label>
      </div>
    </div>
  `;
}


// === ANSWER HANDLING ===

function handleAnswer(val) {
  userAnswers[assessmentData[currentQuestionIndex].id] = val;
  const next = advanceTo(currentQuestionIndex + 1);
  if (next < assessmentData.length) {
    currentQuestionIndex = next;
    renderQuestion();
  } else {
    showResults();
  }
}

function prevQuestion() {
  const prev = retreatTo(currentQuestionIndex - 1);
  if (prev >= 0) {
    currentQuestionIndex = prev;
    renderQuestion();
  }
}


// === SAVE & LOAD ===

function saveProgress() {
  const saveData = {
    version: 2,
    savedAt: new Date().toISOString(),
    currentQuestionIndex: currentQuestionIndex,
    userAnswers: userAnswers
  };

  const blob = new Blob([JSON.stringify(saveData, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'pathfinder-progress.json';
  a.click();
  URL.revokeObjectURL(url);

  const pane = document.getElementById('display-pane');
  pane.innerHTML = `
    <div class="assessment-container">
      <h3>Progress Saved</h3>
      <hr>
      <p>Your progress file has been downloaded as <strong>pathfinder-progress.json</strong>.</p>
      <p>When you return, click <strong>New User</strong> in the menu, then use <strong>Load</strong> to continue.</p>
      <hr>
      <label class="link-button" style="cursor:pointer;" onclick="resumeFromSave()">&#8592; Return to Assessment</label>
    </div>
  `;
}

function resumeFromSave() {
  renderQuestion();
}

function loadProgress(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const saveData = JSON.parse(e.target.result);
      if (typeof saveData.currentQuestionIndex !== 'number' || typeof saveData.userAnswers !== 'object') {
        throw new Error('Invalid save file format.');
      }
      if (saveData.currentQuestionIndex < 0 || saveData.currentQuestionIndex >= assessmentData.length) {
        throw new Error('Save file question index is out of range.');
      }

      currentQuestionIndex = saveData.currentQuestionIndex;
      userAnswers = saveData.userAnswers;

      const savedDate = saveData.savedAt ? new Date(saveData.savedAt).toLocaleDateString() : 'unknown date';
      const progress = Math.round((currentQuestionIndex / assessmentData.length) * 100);

      const pane = document.getElementById('display-pane');
      pane.innerHTML = `
        <div class="assessment-container">
          <h3>Save File Loaded</h3>
          <hr>
          <p>Restored progress from <strong>${savedDate}</strong>.</p>
          <p>You are at question <strong>${currentQuestionIndex + 1}</strong> of ${assessmentData.length} &mdash; ${progress}% complete.</p>
          <hr>
          <label class="link-button" style="cursor:pointer;" onclick="renderQuestion()">&#9658; Continue Assessment</label>
        </div>
      `;
    } catch (err) {
      const pane = document.getElementById('display-pane');
      pane.innerHTML = `
        <div class="assessment-container">
          <h3>Load Failed</h3>
          <hr>
          <p>Could not read the save file: <em>${err.message}</em></p>
          <hr>
          <label class="link-button" style="cursor:pointer;" onclick="showContent('pathfinder')">Start Over</label>
        </div>
      `;
    }
  };
  reader.readAsText(file);
}


// === SCORING ===

function calculateScores() {
  const sections = {};

  assessmentData.forEach(q => {
    if (!sections[q.section]) sections[q.section] = { earned: 0, total: 0 };
    if (!q.weight || q.weight <= 0) return;
    if (shouldSkip(q)) return;

    const ans = userAnswers[q.id];

    // yn_na: skip entirely if N/A or unanswered
    if (q.type === 'yn_na') {
      if (!ans || ans === 'na') return;
      sections[q.section].total += q.weight;
      if (q.reverse) { if (ans === 'no') sections[q.section].earned += q.weight; }
      else { if (ans === 'yes') sections[q.section].earned += q.weight; }
      return;
    }

    sections[q.section].total += q.weight;
    if (ans === undefined || ans === null) return;

    if (q.type === 'yn') {
      if (q.reverse) { if (ans === 'no') sections[q.section].earned += q.weight; }
      else { if (ans === 'yes') sections[q.section].earned += q.weight; }
    } else if (q.type === 'scale') {
      const n = Number(ans);
      if (n >= 1 && n <= 5) sections[q.section].earned += q.weight * ((n - 1) / 4);
    } else if (q.type === 'select') {
      const opts = q.options.map(Number);
      const max = Math.max(...opts), min = Math.min(...opts);
      const range = max - min;
      if (range > 0) sections[q.section].earned += q.weight * ((Number(ans) - min) / range);
    }
  });

  const scores = {};
  for (const [name, data] of Object.entries(sections)) {
    scores[name] = data.total > 0 ? Math.round((data.earned / data.total) * 100) : 0;
  }

  // Spirit is binary — Jesus question only
  scores['Spirit'] = userAnswers[247.5] === 'yes' ? 100 : 0;

  return scores;
}


// === RESULTS ===

function showResults() {
  const scores = calculateScores();
  window.vpAssessmentScores = scores;

  const skillOrder = ['Body','Mind','Heart','Hand','Finance','Vitality','Status','Space','Time','World','Creative','Tech','Spirit'];
  const pane = document.getElementById('display-pane');

  const scoreRows = skillOrder.map(name => {
    const score = scores[name];
    if (score === undefined) return '';
    return `
      <div style="display:flex;justify-content:space-between;padding:3px 0;border-bottom:1px dotted #808080;">
        <span>${name}</span><span style="color:darkred;font-weight:bold;">${score}/100</span>
      </div>`;
  }).join('');

  pane.innerHTML = `
    <div class="assessment-container">
      <h3>Assessment Complete</h3>
      <hr>
      <p>Your scores have been recorded. Click <strong>Continue</strong> to view your Pathways.</p>
      <hr>
      <div style="margin:10px 0;">${scoreRows}</div>
      <hr>
      <label class="link-button" style="cursor:pointer;" onclick="enterPathwaysMode()">Continue &rarr;</label>
      &nbsp;
      <label class="link-button" style="cursor:pointer;" onclick="showContent('pathfinder')">Restart</label>
    </div>
  `;
}
