const assessmentData = [

        // === SECTION A: CURRENT HEALTH STATUS ===
        { id: 1, section: "Body", text: "How would you rate your current overall physical health? (1=Very Poor, 5=Excellent)", type: "select", options: [1, 2, 3, 4, 5], weight: 8 },
        { id: 2, section: "Body", text: "Do you have any chronic health conditions (diabetes, heart disease, autoimmune, etc.)?", type: "yn", weight: 6, reverse: true },
        { id: 3, section: "Body", text: "If you have chronic conditions, are they well-managed with your doctor?", type: "yn", weight: 5 },
        { id: 4, section: "Body", text: "Have you had a physical checkup with a doctor in the past 12 months?", type: "yn", weight: 5 },
        { id: 5, section: "Body", text: "Do you know your key health numbers (blood pressure, cholesterol, blood sugar)?", type: "yn", weight: 4 },
        { id: 6, section: "Body", text: "Are you currently at a healthy weight for your height and frame?", type: "yn", weight: 6 },
        { id: 7, section: "Body", text: "How would you rate your current energy levels throughout the day? (1=Very Low, 5=High)", type: "select", options: [1, 2, 3, 4, 5], weight: 7 },
        
        // === SECTION B: MOVEMENT & EXERCISE ===
        { id: 8, section: "Body", text: "How many days per week do you engage in ANY intentional physical movement (walking, exercise, sports, physical labor)?", type: "select", options: [0, 1, 2, 3, 4, 5, 6, 7], weight: 10 },
        { id: 9, section: "Body", text: "On days you are active, approximately how many minutes do you move? (1=<15min, 2=15-30, 3=30-45, 4=45-60, 5=60+)", type: "select", options: [1, 2, 3, 4, 5], weight: 8 },
        { id: 10, section: "Body", text: "Do you engage in strength/resistance training (weights, bodyweight, bands) at least twice per week?", type: "yn", weight: 8 },
        { id: 11, section: "Body", text: "Do you engage in cardiovascular exercise (walking, running, cycling, swimming) at least 3 times per week?", type: "yn", weight: 7 },
        { id: 12, section: "Body", text: "Do you engage in flexibility/mobility work (stretching, yoga, mobility drills) at least twice per week?", type: "yn", weight: 6 },
        { id: 13, section: "Body", text: "Is your daily life mostly sedentary (sitting 6+ hours)?", type: "yn", weight: 7, reverse: true },
        { id: 14, section: "Body", text: "Do you take movement breaks at least once per hour if sitting for extended periods?", type: "yn", weight: 5 },
        { id: 15, section: "Body", text: "Can you walk up 3 flights of stairs without significant breathlessness?", type: "yn", weight: 6 },
        { id: 16, section: "Body", text: "Can you perform basic functional movements without pain or difficulty (squat, bend, reach overhead, get up from floor)?", type: "yn", weight: 7 },
        { id: 17, section: "Body", text: "Do you follow a structured, progressive workout program (not random workouts)?", type: "yn", weight: 5 },
        { id: 18, section: "Body", text: "Do you track your workouts or physical activity?", type: "yn", weight: 4 },
        { id: 19, section: "Body", text: "Have you seen measurable improvement in your fitness in the past 6 months?", type: "yn", weight: 5 },
        
        // === SECTION C: SLEEP ===
        { id: 20, section: "Body", text: "How many hours of sleep do you typically get per night? (1=<5, 2=5-6, 3=6-7, 4=7-8, 5=8+)", type: "select", options: [1, 2, 3, 4, 5], weight: 10 },
        { id: 21, section: "Body", text: "How would you rate your sleep quality? (1=Very Poor/never rested, 5=Excellent/wake refreshed)", type: "select", options: [1, 2, 3, 4, 5], weight: 9 },
        { id: 22, section: "Body", text: "Do you have a consistent sleep schedule (within 30 min same bed/wake time)?", type: "yn", weight: 6 },
        { id: 23, section: "Body", text: "Do you have difficulty falling asleep (takes more than 20 minutes)?", type: "yn", weight: 6, reverse: true },
        { id: 24, section: "Body", text: "Do you wake up frequently during the night or too early?", type: "yn", weight: 6, reverse: true },
        { id: 25, section: "Body", text: "Do you use screens (phone, TV, computer) within 1 hour of bedtime?", type: "yn", weight: 4, reverse: true },
        { id: 26, section: "Body", text: "Is your bedroom dark (no light pollution)?", type: "yn", weight: 4 },
        { id: 27, section: "Body", text: "Is your bedroom cool (65-68°F / 18-20°C)?", type: "yn", weight: 3 },
        { id: 28, section: "Body", text: "Is your bedroom quiet or do you use white noise effectively?", type: "yn", weight: 3 },
        { id: 29, section: "Body", text: "Do you avoid caffeine within 8 hours of bedtime?", type: "yn", weight: 4 },
        { id: 30, section: "Body", text: "Do you have a wind-down routine before bed?", type: "yn", weight: 4 },
        
        // === SECTION D: NUTRITION ===
        { id: 31, section: "Body", text: "How many meals do you eat per day on average? (1=1 or irregular, 2=2, 3=3, 4=3+ structured)", type: "select", options: [1, 2, 3, 4], weight: 5 },
        { id: 32, section: "Body", text: "How often do you eat home-prepared meals vs restaurant/takeout? (1=Almost never cook, 5=Almost always cook)", type: "select", options: [1, 2, 3, 4, 5], weight: 7 },
        { id: 33, section: "Body", text: "How many servings of vegetables do you eat on a typical day?", type: "select", options: [0, 1, 2, 3, 4, 5], weight: 8 },
        { id: 34, section: "Body", text: "How many servings of fruit do you eat on a typical day?", type: "select", options: [0, 1, 2, 3, 4], weight: 5 },
        { id: 35, section: "Body", text: "Do you eat adequate protein with most meals (palm-sized portion)?", type: "yn", weight: 6 },
        { id: 36, section: "Body", text: "Do you eat highly processed foods (fast food, chips, packaged snacks, candy) daily?", type: "yn", weight: 7, reverse: true },
        { id: 37, section: "Body", text: "Do you drink sugary beverages (soda, juice, sweetened coffee/tea) daily?", type: "yn", weight: 5, reverse: true },
        { id: 38, section: "Body", text: "How many glasses of water do you drink daily? (1=1-2, 2=3-4, 3=5-6, 4=7-8, 5=8+)", type: "select", options: [1, 2, 3, 4, 5], weight: 6 },
        { id: 39, section: "Body", text: "Do you eat breakfast or intentionally practice structured intermittent fasting?", type: "yn", weight: 4 },
        { id: 40, section: "Body", text: "Do you eat mindfully (sitting down, not distracted, aware of hunger/fullness)?", type: "yn", weight: 4 },
        { id: 41, section: "Body", text: "Do you frequently eat past the point of fullness?", type: "yn", weight: 5, reverse: true },
        { id: 42, section: "Body", text: "Do you use food to cope with stress or emotions regularly?", type: "yn", weight: 6, reverse: true },
        
        // === SECTION E: SUBSTANCES & HARMFUL HABITS ===
        { id: 43, section: "Body", text: "Do you smoke or use tobacco/nicotine products?", type: "yn", weight: 9, reverse: true },
        { id: 44, section: "Body", text: "How often do you consume alcohol? (1=Daily, 2=Several times/week, 3=Weekly, 4=Occasionally, 5=Rarely/Never)", type: "select", options: [1, 2, 3, 4, 5], weight: 6 },
        { id: 45, section: "Body", text: "When you drink alcohol, do you have more than 2 drinks?", type: "yn", weight: 5, reverse: true },
        { id: 46, section: "Body", text: "Do you use recreational drugs?", type: "yn", weight: 6, reverse: true },
        { id: 47, section: "Body", text: "Do you rely on caffeine to function (more than 2-3 cups coffee/day)?", type: "yn", weight: 3, reverse: true },
        
        // === SECTION F: PAIN, POSTURE & PHYSICAL FUNCTION ===
        { id: 48, section: "Body", text: "Do you experience chronic pain (back, neck, joints) that affects daily life?", type: "yn", weight: 7, reverse: true },
        { id: 49, section: "Body", text: "Do you have good posture when sitting and standing?", type: "yn", weight: 4 },
        { id: 50, section: "Body", text: "Do you experience frequent headaches or migraines?", type: "yn", weight: 4, reverse: true },
        { id: 51, section: "Body", text: "Can you touch your toes (or close) with straight legs?", type: "yn", weight: 3 },
        { id: 52, section: "Body", text: "Can you hold a 60-second plank with good form?", type: "yn", weight: 4 },
        { id: 53, section: "Body", text: "Can you do at least 10 proper pushups (or knee pushups)?", type: "yn", weight: 4 },
        
        // === SECTION G: HYGIENE & PREVENTIVE CARE ===
        { id: 54, section: "Body", text: "Do you brush your teeth at least twice daily?", type: "yn", weight: 3 },
        { id: 55, section: "Body", text: "Do you floss daily?", type: "yn", weight: 3 },
        { id: 56, section: "Body", text: "Have you had a dental checkup in the past year?", type: "yn", weight: 3 },
        { id: 57, section: "Body", text: "Do you wear sunscreen or protect your skin from sun damage?", type: "yn", weight: 3 },
        { id: 58, section: "Body", text: "Are you up to date on recommended health screenings for your age?", type: "yn", weight: 4 },
        
        // === SECTION H: RECOVERY & STRESS ===
        { id: 59, section: "Body", text: "Do you take at least one full rest day per week from intense exercise?", type: "yn", weight: 4 },
        { id: 60, section: "Body", text: "Do you actively manage physical stress (massage, foam rolling, epsom salt baths, etc.)?", type: "yn", weight: 3 },
        { id: 61, section: "Body", text: "Do physical stress symptoms manifest in your body (tension, clenched jaw, shallow breathing)?", type: "yn", weight: 5, reverse: true },
        { id: 62, section: "Body", text: "Do you spend time outdoors in nature at least a few times per week?", type: "yn", weight: 4 },
        { id: 63, section: "Body", text: "Do you get adequate sunlight exposure (or supplement Vitamin D)?", type: "yn", weight: 4 },
    


        // === SECTION A: LEARNING & GROWTH ===
        { id: 64, text: "In the past month, have you intentionally learned something new (book, course, tutorial, skill)?", type: "yn", weight: 8 },
        { id: 65, text: "How many books (or audiobooks) have you read/listened to in the past 6 months?", type: "select", options: [0, 1, 2, 3, 4, 5], weight: 7 },
        { id: 66, text: "Do you have a skill or subject you are actively trying to improve or master?", type: "yn", weight: 8 },
        { id: 67, text: "When you encounter a difficult intellectual challenge, do you persist or give up quickly?", type: "yn", weight: 7 },
        { id: 68, text: "Do you seek out perspectives and opinions different from your own?", type: "yn", weight: 6 },
        { id: 69, text: "Do you enjoy learning new things?", type: "yn", weight: 5 },
        { id: 70, text: "Have you taken any course, class, or structured learning in the past year?", type: "yn", weight: 6 },
        { id: 71, text: "Do you regularly consume educational content (documentaries, podcasts, articles)?", type: "yn", weight: 5 },
        
        // === SECTION B: FOCUS & ATTENTION ===
        { id: 72, text: "How would you rate your ability to focus on a single task without distraction? (1=Very Poor, 5=Excellent)", type: "select", options: [1, 2, 3, 4, 5], weight: 9 },
        { id: 73, text: "How often do you check your phone or get distracted when trying to concentrate? (1=Constantly, 5=Rarely)", type: "select", options: [1, 2, 3, 4, 5], weight: 8 },
        { id: 74, text: "Can you engage in deep, focused work for 60+ minutes without interruption?", type: "yn", weight: 8 },
        { id: 75, text: "Do you frequently start tasks but struggle to finish them?", type: "yn", weight: 7, reverse: true },
        { id: 76, text: "Do you practice any form of attention training (meditation, mindfulness, focus exercises)?", type: "yn", weight: 6 },
        { id: 77, text: "Do you feel in control of your attention, or does it feel scattered?", type: "yn", weight: 7 },
        { id: 78, text: "Can you read for 30+ minutes without losing focus?", type: "yn", weight: 6 },
        { id: 79, text: "Do you multitask frequently (multiple screens, tasks, conversations)?", type: "yn", weight: 5, reverse: true },
        
        // === SECTION C: DIGITAL HABITS & SCREEN TIME ===
        { id: 80, text: "How many hours per day do you spend on passive entertainment (social media, random browsing, TV)? (1=5+hrs, 2=3-5hrs, 3=1-3hrs, 4=30min-1hr, 5=<30min)", type: "select", options: [1, 2, 3, 4, 5], weight: 8 },
        { id: 81, text: "Do you check your phone within 30 minutes of waking up?", type: "yn", weight: 5, reverse: true },
        { id: 82, text: "Do you have set boundaries or limits on your screen time?", type: "yn", weight: 6 },
        { id: 83, text: "Do you feel addicted to or controlled by your phone/social media?", type: "yn", weight: 7, reverse: true },
        { id: 84, text: "Do you use technology intentionally as a tool, or do you mindlessly consume?", type: "yn", weight: 6 },
        { id: 85, text: "Do you take regular breaks from screens throughout the day?", type: "yn", weight: 5 },
        
        // === SECTION D: CRITICAL THINKING & DECISION MAKING ===
        { id: 86, text: "When you encounter new information, do you verify it from multiple sources before accepting it?", type: "yn", weight: 7 },
        { id: 87, text: "Can you change your mind when presented with compelling evidence against your beliefs?", type: "yn", weight: 7 },
        { id: 88, text: "Can you articulate the strongest arguments AGAINST your own opinions?", type: "yn", weight: 6 },
        { id: 89, text: "When making important decisions, do you use a structured approach (pros/cons, criteria, research)?", type: "yn", weight: 6 },
        { id: 90, text: "Do you tend to make impulsive decisions you later regret?", type: "yn", weight: 6, reverse: true },
        { id: 91, text: "How confident are you in your ability to solve complex problems? (1=Not at all, 5=Very confident)", type: "select", options: [1, 2, 3, 4, 5], weight: 6 },
        { id: 92, text: "Do you consider long-term consequences when making decisions?", type: "yn", weight: 6 },
        { id: 93, text: "Do you seek advice from wise/knowledgeable people before major decisions?", type: "yn", weight: 5 },
        
        // === SECTION E: MEMORY & MENTAL ORGANIZATION ===
        { id: 94, text: "How would you rate your memory for important information? (1=Very Poor, 5=Excellent)", type: "select", options: [1, 2, 3, 4, 5], weight: 6 },
        { id: 95, text: "Do you use any external system to capture and organize information (notes, apps, journals)?", type: "yn", weight: 6 },
        { id: 96, text: "Do you regularly review and reflect on what you have learned?", type: "yn", weight: 5 },
        { id: 97, text: "Do you write or journal to process your thoughts?", type: "yn", weight: 5 },
        { id: 98, text: "Do you frequently forget important tasks, appointments, or commitments?", type: "yn", weight: 6, reverse: true },
        { id: 99, text: "Can you clearly explain complex ideas in simple terms?", type: "yn", weight: 5 },
        
        // === SECTION F: MENTAL HEALTH & COGNITIVE WELLNESS ===
        { id: 100, text: "How often do you feel mentally overwhelmed or unable to think clearly? (1=Daily, 5=Rarely)", type: "select", options: [1, 2, 3, 4, 5], weight: 8 },
        { id: 101, text: "Do you experience brain fog or difficulty concentrating regularly?", type: "yn", weight: 7, reverse: true },
        { id: 102, text: "How would you rate your current mental clarity and sharpness? (1=Very Foggy, 5=Very Sharp)", type: "select", options: [1, 2, 3, 4, 5], weight: 7 },
        { id: 103, text: "Do you engage in activities specifically for cognitive health (puzzles, games, learning)?", type: "yn", weight: 5 },
        { id: 104, text: "Do you feel curious about the world around you?", type: "yn", weight: 6 },
        { id: 105, text: "Do you experience racing thoughts or mental anxiety frequently?", type: "yn", weight: 6, reverse: true },
        { id: 106, text: "Do you feel mentally sharp in the morning or does it take hours to wake up?", type: "yn", weight: 5 },
        
        // === SECTION G: WISDOM & DISCERNMENT ===
        { id: 107, text: "Do you regularly read Scripture or wisdom literature?", type: "yn", weight: 7 },
        { id: 108, text: "Do you seek God's guidance in your thinking and decisions?", type: "yn", weight: 7 },
        { id: 109, text: "Do you have mentors or wise counselors you learn from?", type: "yn", weight: 6 },
        { id: 110, text: "Can you discern between good and evil, wisdom and foolishness in daily situations?", type: "yn", weight: 6 },
        { id: 111, text: "Do you think before you speak, or do you often say things you regret?", type: "yn", weight: 6 },
        { id: 112, text: "Do you learn from your mistakes and avoid repeating them?", type: "yn", weight: 6 },
        { id: 113, text: "Do you value truth even when it is uncomfortable?", type: "yn", weight: 6 },
    


        // === SECTION A: CLOSE RELATIONSHIPS ===
        { id: 114, text: "Do you have at least one person you can share anything with and trust completely?", type: "yn", weight: 10 },
        { id: 115, text: "How many close friends do you have that you speak with at least monthly?", type: "select", options: [0, 1, 2, 3, 4, 5], weight: 8 },
        { id: 116, text: "Do you feel known and understood by the people closest to you?", type: "yn", weight: 9 },
        { id: 117, text: "Do you regularly spend quality time with people you care about?", type: "yn", weight: 8 },
        { id: 118, text: "How often do you have meaningful conversations (beyond small talk) per week?", type: "select", options: [0, 1, 2, 3, 4, 5], weight: 7 },
        { id: 119, text: "Do you feel lonely often?", type: "yn", weight: 8, reverse: true },
        { id: 120, text: "Do you have friends who challenge you to grow and hold you accountable?", type: "yn", weight: 7 },
        { id: 121, text: "Are you satisfied with the depth and quality of your friendships?", type: "yn", weight: 7 },
        
        // === SECTION B: FAMILY RELATIONSHIPS ===
        { id: 122, text: "Do you have a healthy relationship with your parents (or have you made peace with the past)?", type: "yn", weight: 8 },
        { id: 123, text: "Do you have healthy relationships with your siblings (if applicable)?", type: "yn", weight: 6 },
        { id: 124, text: "If married, how would you rate your marriage? (1=Struggling, 5=Thriving, 0=N/A)", type: "select", options: [0, 1, 2, 3, 4, 5], weight: 10 },
        { id: 125, text: "If you have children, do you have strong relationships with each of them?", type: "yn", weight: 9 },
        { id: 126, text: "Do you prioritize family time in your schedule?", type: "yn", weight: 7 },
        { id: 127, text: "Are there unresolved conflicts in your family that weigh on you?", type: "yn", weight: 7, reverse: true },
        { id: 128, text: "Do you regularly express love and appreciation to family members?", type: "yn", weight: 6 },
        
        // === SECTION C: EMOTIONAL HEALTH ===
        { id: 129, text: "How would you rate your overall emotional health? (1=Struggling, 5=Thriving)", type: "select", options: [1, 2, 3, 4, 5], weight: 9 },
        { id: 130, text: "Are you able to identify and name your emotions when you feel them?", type: "yn", weight: 7 },
        { id: 131, text: "Do you express your emotions in healthy ways?", type: "yn", weight: 8 },
        { id: 132, text: "Do you suppress or bottle up your emotions?", type: "yn", weight: 7, reverse: true },
        { id: 133, text: "Do you experience frequent anxiety or worry?", type: "yn", weight: 7, reverse: true },
        { id: 134, text: "Do you experience depression or persistent sadness?", type: "yn", weight: 8, reverse: true },
        { id: 135, text: "Are you able to regulate your emotions (calm yourself when upset)?", type: "yn", weight: 7 },
        { id: 136, text: "Do you have healthy coping mechanisms for stress?", type: "yn", weight: 7 },
        
        // === SECTION D: FORGIVENESS & RECONCILIATION ===
        { id: 137, text: "Are you holding grudges or unforgiveness toward anyone?", type: "yn", weight: 9, reverse: true },
        { id: 138, text: "Do you forgive others when they wrong you?", type: "yn", weight: 8 },
        { id: 139, text: "Is there anyone you need to ask forgiveness from?", type: "yn", weight: 7, reverse: true },
        { id: 140, text: "Do you apologize when you are wrong?", type: "yn", weight: 7 },
        { id: 141, text: "Are there broken relationships in your life that could be reconciled?", type: "yn", weight: 6, reverse: true },
        { id: 142, text: "Do you deal with conflict directly rather than avoiding it?", type: "yn", weight: 6 },
        { id: 143, text: "Can you separate a person from their behavior (hate the sin, love the sinner)?", type: "yn", weight: 6 },
        
        // === SECTION E: GRATITUDE & POSITIVITY ===
        { id: 144, text: "Do you regularly practice gratitude (counting blessings)?", type: "yn", weight: 7 },
        { id: 145, text: "Do you express thanks to others for what they do?", type: "yn", weight: 6 },
        { id: 146, text: "Do you tend toward optimism or pessimism? (1=Very Pessimistic, 5=Very Optimistic)", type: "select", options: [1, 2, 3, 4, 5], weight: 5 },
        { id: 147, text: "Do you celebrate others successes genuinely without envy?", type: "yn", weight: 6 },
        { id: 148, text: "Do you focus more on what you have or what you lack?", type: "yn", weight: 6 },
        { id: 149, text: "Do you find joy in everyday moments?", type: "yn", weight: 6 },
        
        // === SECTION F: EMPATHY & COMPASSION ===
        { id: 150, text: "Do you easily empathize with others feelings and perspectives?", type: "yn", weight: 7 },
        { id: 160, text: "Do you show compassion to those who are suffering?", type: "yn", weight: 7 },
        { id: 161, text: "Do you listen to understand or to respond?", type: "yn", weight: 7 },
        { id: 162, text: "Do you give others the benefit of the doubt?", type: "yn", weight: 6 },
        { id: 163, text: "Do you judge others harshly or critically?", type: "yn", weight: 6, reverse: true },
        { id: 164, text: "Do you remember and follow up on what people share with you?", type: "yn", weight: 5 },
        
        // === SECTION G: LOVE IN ACTION ===
        { id: 165, text: "Do you regularly perform acts of kindness for others?", type: "yn", weight: 7 },
        { id: 166, text: "Do you give generously of your time to people who need it?", type: "yn", weight: 7 },
        { id: 167, text: "Do you encourage and build others up with your words?", type: "yn", weight: 7 },
        { id: 168, text: "Do you serve your family sacrificially?", type: "yn", weight: 8 },
        { id: 169, text: "Do you love people who are difficult to love?", type: "yn", weight: 7 },
        { id: 170, text: "Do you pray for others regularly?", type: "yn", weight: 6 },
        { id: 171, text: "How often do you reach out to check on others without prompting? (1=Rarely, 5=Daily)", type: "select", options: [1, 2, 3, 4, 5], weight: 6 },
        { id: 172, text: "Do you put others needs before your own preferences?", type: "yn", weight: 7 },
  
       // === SECTION A: PRACTICAL SKILLS ===
        { id: 173, text: "Do you have at least one practical skill you actively develop and practice?", type: "yn", weight: 10 },
        { id: 174, text: "How many hours per week do you spend practicing or developing a skill or craft?", type: "select", options: [0, 1, 2, 3, 4, 5, 6, 7], weight: 9 },
        { id: 175, text: "How would you rate your proficiency in your primary skill? (1=Beginner, 5=Expert)", type: "select", options: [1, 2, 3, 4, 5], weight: 8 },
        { id: 176, text: "Do you create things with your hands regularly (not just consume)?", type: "yn", weight: 8 },
        { id: 177, text: "Do you take pride in the quality of your work?", type: "yn", weight: 7 },
        { id: 178, text: "Do you finish projects you start?", type: "yn", weight: 8 },
        { id: 179, text: "How many distinct practical skills do you possess at a competent level?", type: "select", options: [0, 1, 2, 3, 4, 5], weight: 7 },
        
        // === SECTION B: HOME SKILLS ===
        { id: 180, text: "Can you perform basic home repairs (fix a leaky faucet, patch a hole, unclog a drain)?", type: "yn", weight: 6 },
        { id: 181, text: "Can you use basic hand tools competently (hammer, screwdriver, drill, saw)?", type: "yn", weight: 6 },
        { id: 182, text: "Can you assemble furniture or follow technical instructions?", type: "yn", weight: 5 },
        { id: 183, text: "Do you maintain your home and possessions proactively (not just when they break)?", type: "yn", weight: 6 },
        { id: 184, text: "Can you perform basic car maintenance (change tire, check fluids, jump battery)?", type: "yn", weight: 5 },
        { id: 185, text: "Do you fix things yourself when possible rather than immediately hiring someone?", type: "yn", weight: 5 },
        
        // === SECTION C: COOKING & FOOD ===
        { id: 186, text: "Can you cook a healthy, complete meal from scratch?", type: "yn", weight: 7 },
        { id: 187, text: "How many meals per week do you cook at home?", type: "select", options: [0, 1, 2, 3, 4, 5, 6, 7], weight: 7 },
        { id: 188, text: "Do you know how to follow a recipe and adapt it?", type: "yn", weight: 5 },
        { id: 189, text: "Can you cook at least 5 different meals without a recipe?", type: "yn", weight: 6 },
        { id: 190, text: "Do you know basic knife skills and cooking techniques?", type: "yn", weight: 5 },
        { id: 191, text: "Can you plan meals and shop efficiently for a week?", type: "yn", weight: 5 },
        { id: 192, text: "Do you know how to properly store food and assess freshness?", type: "yn", weight: 4 },
        
        // === SECTION D: LEARNING & GROWTH ===
        { id: 193, text: "Are you currently learning or improving a skill?", type: "yn", weight: 8 },
        { id: 194, text: "Do you seek feedback to improve your work?", type: "yn", weight: 6 },
        { id: 195, text: "Do you invest in tools, resources, or training to improve your skills?", type: "yn", weight: 5 },
        { id: 196, text: "Do you practice deliberately (focused improvement) vs just going through motions?", type: "yn", weight: 7 },
        { id: 197, text: "Have you learned a new skill in the past year?", type: "yn", weight: 6 },
        { id: 198, text: "Do you push yourself to improve rather than staying at comfortable level?", type: "yn", weight: 6 },
        
        // === SECTION E: TEACHING & SHARING ===
        { id: 199, text: "Do you teach or share your skills with others?", type: "yn", weight: 5 },
        { id: 200, text: "Could you explain how to do your skill to a complete beginner?", type: "yn", weight: 5 },
        { id: 201, text: "Have you mentored or helped someone develop a skill?", type: "yn", weight: 5 },
        
        // === SECTION F: WORK ETHIC ===
        { id: 202, text: "Do you do quality work even when no one is watching?", type: "yn", weight: 8 },
        { id: 203, text: "Do you take shortcuts that compromise quality?", type: "yn", weight: 6, reverse: true },
        { id: 204, text: "Do you complete tasks thoroughly rather than just adequately?", type: "yn", weight: 7 },
        { id: 205, text: "Do you clean up and organize after completing a project?", type: "yn", weight: 5 },
        { id: 206, text: "Do you maintain your tools and equipment properly?", type: "yn", weight: 5 },
        { id: 207, text: "Do you approach work as service to God and others, not just obligation?", type: "yn", weight: 7 },
  

        // 4: FINANCE
		
        // === SECTION A: FINANCIAL FOUNDATION ===
        { id: 208, text: "Do you have a written monthly budget that you follow?", type: "yn", weight: 10 },
        { id: 209, text: "Do you track your spending regularly (at least weekly)?", type: "yn", weight: 8 },
        { id: 210, text: "Do you know your net worth (assets minus liabilities)?", type: "yn", weight: 6 },
        { id: 211, text: "Do you live below your means (spend less than you earn)?", type: "yn", weight: 10 },
        { id: 212, text: "Do you have financial goals written down?", type: "yn", weight: 7 },
        { id: 213, text: "How would you rate your financial stress level? (1=Very Stressed, 5=No Stress)", type: "select", options: [1, 2, 3, 4, 5], weight: 8 },
        
        // === SECTION B: EMERGENCY & SAVINGS ===
        { id: 214, text: "Do you have an emergency fund?", type: "yn", weight: 9 },
        { id: 215, text: "How many months of expenses does your emergency fund cover?", type: "select", options: [0, 1, 2, 3, 4, 5, 6], weight: 10 },
        { id: 216, text: "Do you save money consistently each month?", type: "yn", weight: 8 },
        { id: 217, text: "Do you have automatic transfers to savings?", type: "yn", weight: 6 },
        { id: 218, text: "Are you saving for specific future goals (house, car, vacation)?", type: "yn", weight: 6 },
        
        // === SECTION C: DEBT ===
        { id: 219, text: "Do you carry credit card debt from month to month?", type: "yn", weight: 9, reverse: true },
        { id: 220, text: "Do you have any debt other than mortgage (car loans, student loans, personal loans)?", type: "yn", weight: 6, reverse: true },
        { id: 221, text: "Do you know exactly how much total debt you have?", type: "yn", weight: 7 },
        { id: 222, text: "Do you have a plan to become debt-free?", type: "yn", weight: 7 },
        { id: 223, text: "Are you making more than minimum payments on debt?", type: "yn", weight: 6 },
        { id: 224, text: "Do you use debt to buy things you cannot afford?", type: "yn", weight: 8, reverse: true },
        
        // === SECTION D: RETIREMENT & INVESTING ===
        { id: 225, text: "Are you contributing to retirement savings (401k, IRA, etc.)?", type: "yn", weight: 9 },
        { id: 226, text: "If employer matches retirement contributions, are you getting the full match?", type: "yn", weight: 8 },
        { id: 227, text: "What percentage of your income do you save for retirement?", type: "select", options: [0, 1, 2, 3, 4, 5], weight: 7 },
        { id: 228, text: "Do you understand basic investing principles (diversification, compound interest)?", type: "yn", weight: 6 },
        { id: 229, text: "Do you have investments outside of retirement accounts?", type: "yn", weight: 5 },
        { id: 230, text: "Do you know what your retirement accounts are invested in?", type: "yn", weight: 5 },
        
        // === SECTION E: GIVING ===
        { id: 231, text: "Do you tithe or give regularly to your church?", type: "yn", weight: 9 },
        { id: 232, text: "Do you give to charitable causes beyond tithing?", type: "yn", weight: 6 },
        { id: 233, text: "Is giving a planned part of your budget (not just leftovers)?", type: "yn", weight: 7 },
        { id: 234, text: "Do you give generously when you see needs?", type: "yn", weight: 6 },
        { id: 235, text: "What percentage of your income do you give away?", type: "select", options: [0, 1, 2, 3, 4, 5], weight: 7 },
        
        // === SECTION F: PROTECTION ===
        { id: 236, text: "Do you have adequate health insurance?", type: "yn", weight: 7 },
        { id: 237, text: "Do you have life insurance (if you have dependents)?", type: "yn", weight: 7 },
        { id: 238, text: "Do you have a will or estate plan?", type: "yn", weight: 6 },
        { id: 239, text: "Do you have disability insurance or income protection?", type: "yn", weight: 5 },
        { id: 240, text: "Are your important financial documents organized and accessible?", type: "yn", weight: 5 },
        
        // === SECTION G: INCOME & CONTENTMENT ===
        { id: 241, text: "Do you earn enough to meet your basic needs?", type: "yn", weight: 8 },
        { id: 242, text: "Do you have multiple sources of income?", type: "yn", weight: 5 },
        { id: 243, text: "Are you content with what you have (not always wanting more)?", type: "yn", weight: 8 },
        { id: 244, text: "Do you make purchases impulsively that you later regret?", type: "yn", weight: 7, reverse: true },
        { id: 245, text: "Do you compare your financial situation to others?", type: "yn", weight: 5, reverse: true },
        { id: 246, text: "Do you trust God with your finances?", type: "yn", weight: 8 },
        { id: 247, text: "Do you see yourself as a steward (manager) rather than owner of your money?", type: "yn", weight: 7 },
  

                { id: 247.5, text: "Do you trust in Jesus Christ alone for the forgiveness of your sins?", type: "yn", weight: 100 },
            
     // 6: VITALITY (Sanctification)

        // === SECTION A: WORD OF GOD ===
        { id: 248, text: "Do you read or hear God's Word (Scripture) regularly?", type: "yn", weight: 10 },
        { id: 249, text: "How many days per week do you spend time in Scripture?", type: "select", options: [0, 1, 2, 3, 4, 5, 6, 7], weight: 9 },
        { id: 250, text: "Do you meditate on Scripture, letting it dwell in you richly?", type: "yn", weight: 7 },
        { id: 251, text: "Do you have Scripture passages memorized?", type: "yn", weight: 5 },
        { id: 252, text: "Do you study Scripture to understand its meaning in context?", type: "yn", weight: 6 },
        
        // === SECTION B: DIVINE SERVICE & SACRAMENTS ===
        { id: 253, text: "Do you attend Divine Service (church) weekly?", type: "yn", weight: 10 },
        { id: 254, text: "Do you receive the Lord's Supper regularly?", type: "yn", weight: 10 },
        { id: 255, text: "Do you examine yourself before receiving the Sacrament?", type: "yn", weight: 7 },
        { id: 256, text: "Do you believe Christ's true body and blood are present in the Supper for forgiveness?", type: "yn", weight: 9 },
        { id: 257, text: "Do you value your Baptism and remember it daily?", type: "yn", weight: 8 },
        
        // === SECTION C: CONFESSION & ABSOLUTION ===
        { id: 258, text: "Do you confess your sins regularly?", type: "yn", weight: 9 },
        { id: 259, text: "Do you believe God truly forgives you when absolution is spoken?", type: "yn", weight: 9 },
        { id: 260, text: "Have you made use of private confession and absolution?", type: "yn", weight: 5 },
        { id: 261, text: "Do you examine yourself using the Ten Commandments?", type: "yn", weight: 7 },
        { id: 262, text: "Do you struggle with guilt even after confessing sins?", type: "yn", weight: 6, reverse: true },
        
        // === SECTION D: PRAYER ===
        { id: 263, text: "Do you pray daily?", type: "yn", weight: 9 },
        { id: 264, text: "Do you pray the Lord's Prayer regularly?", type: "yn", weight: 7 },
        { id: 265, text: "Do you bring your anxieties and needs to God in prayer?", type: "yn", weight: 7 },
        { id: 266, text: "Do you pray for others (intercession)?", type: "yn", weight: 6 },
        { id: 267, text: "Do you include thanksgiving and praise in your prayers?", type: "yn", weight: 6 },
        
        // === SECTION E: CATECHESIS & DOCTRINE ===
        { id: 268, text: "Do you know Luther's Small Catechism?", type: "yn", weight: 7 },
        { id: 269, text: "Can you explain the Six Chief Parts of Christian doctrine?", type: "yn", weight: 6 },
        { id: 270, text: "Do you continue to grow in understanding of Christian doctrine?", type: "yn", weight: 6 },
        { id: 271, text: "Do you attend Bible class or other Christian education?", type: "yn", weight: 5 },
        
        // === SECTION F: VOCATION & DAILY LIFE ===
        { id: 272, text: "Do you understand your daily work as service to God and neighbor?", type: "yn", weight: 8 },
        { id: 273, text: "Do you serve your neighbor in your vocations (family, work, community)?", type: "yn", weight: 8 },
        { id: 274, text: "Do you seek to live according to God's Commandments out of love for Him?", type: "yn", weight: 8 },
        { id: 275, text: "Do you struggle to see how faith connects to daily life?", type: "yn", weight: 6, reverse: true },
        
        // === SECTION G: TRUST & SPIRITUAL WARFARE ===
        { id: 276, text: "Do you trust God's promises even when feelings or circumstances are troubled?", type: "yn", weight: 8 },
        { id: 277, text: "Do you recognize the attacks of the devil, world, and flesh in your life?", type: "yn", weight: 6 },
        { id: 278, text: "Do you fight temptation with God's Word and prayer?", type: "yn", weight: 7 },
        { id: 279, text: "Do you find joy in the Gospel and your identity in Christ?", type: "yn", weight: 8 },
        { id: 280, text: "Do you practice Sabbath rest, trusting God rather than your own efforts?", type: "yn", weight: 6 },
   

        // 7: STATUS


        // === SECTION A: INTEGRITY & CHARACTER ===
        { id: 281, text: "Do you act with integrity even when no one is watching?", type: "yn", weight: 10 },
        { id: 282, text: "Do you keep your commitments and promises?", type: "yn", weight: 10 },
        { id: 283, text: "Do you tell the truth consistently, even when it is costly?", type: "yn", weight: 9 },
        { id: 284, text: "Do you exaggerate or embellish to make yourself look better?", type: "yn", weight: 7, reverse: true },
        { id: 285, text: "Do you take responsibility for your mistakes publicly?", type: "yn", weight: 8 },
        { id: 286, text: "Is there alignment between your private life and public image?", type: "yn", weight: 9 },
        
        // === SECTION B: REPUTATION ===
        { id: 287, text: "Do you have a good reputation in your community?", type: "yn", weight: 8 },
        { id: 288, text: "Would people who know you well say you are trustworthy?", type: "yn", weight: 9 },
        { id: 289, text: "Are you known for your character or just your achievements?", type: "yn", weight: 7 },
        { id: 290, text: "Do people speak well of you when you are not present?", type: "yn", weight: 6 },
        { id: 291, text: "Have you damaged relationships through broken trust?", type: "yn", weight: 7, reverse: true },
        { id: 292, text: "Are you respected by your peers?", type: "yn", weight: 7 },
        
        // === SECTION C: SPEECH & COMMUNICATION ===
        { id: 293, text: "Do you gossip or speak negatively about others?", type: "yn", weight: 8, reverse: true },
        { id: 294, text: "Do you build others up with your words?", type: "yn", weight: 7 },
        { id: 295, text: "Do you speak the truth in love, even when difficult?", type: "yn", weight: 7 },
        { id: 296, text: "Do you listen more than you speak?", type: "yn", weight: 6 },
        { id: 297, text: "Do you complain frequently?", type: "yn", weight: 5, reverse: true },
        { id: 298, text: "Can you keep confidential information confidential?", type: "yn", weight: 8 },
        
        // === SECTION D: INFLUENCE & LEADERSHIP ===
        { id: 299, text: "Do people seek your advice or counsel?", type: "yn", weight: 7 },
        { id: 300, text: "Do you lead or mentor others?", type: "yn", weight: 6 },
        { id: 301, text: "Rate your influence in your workplace or community (1=None, 5=Significant):", type: "select", options: [1, 2, 3, 4, 5], weight: 6 },
        { id: 302, text: "Do you use your influence to help others or to serve yourself?", type: "yn", weight: 8 },
        { id: 303, text: "Do people follow your example?", type: "yn", weight: 6 },
        { id: 304, text: "Are you comfortable leading when called upon?", type: "yn", weight: 5 },
        
        // === SECTION E: HUMILITY & SERVICE ===
        { id: 305, text: "Do you seek recognition and credit for your work?", type: "yn", weight: 6, reverse: true },
        { id: 306, text: "Do you celebrate others' successes genuinely?", type: "yn", weight: 7 },
        { id: 307, text: "Do you serve without expecting recognition?", type: "yn", weight: 8 },
        { id: 308, text: "Can you receive correction without becoming defensive?", type: "yn", weight: 7 },
        { id: 309, text: "Do you give credit to others who deserve it?", type: "yn", weight: 7 },
        { id: 310, text: "Do you consider yourself better than others?", type: "yn", weight: 7, reverse: true },
        
        // === SECTION F: CONFLICT & RELATIONSHIPS ===
        { id: 311, text: "Do you address conflict directly and respectfully?", type: "yn", weight: 7 },
        { id: 312, text: "Do you hold grudges?", type: "yn", weight: 6, reverse: true },
        { id: 313, text: "Do you apologize when you are wrong?", type: "yn", weight: 8 },
        { id: 314, text: "Do you seek reconciliation in broken relationships?", type: "yn", weight: 7 },
        { id: 315, text: "Do you give others the benefit of the doubt?", type: "yn", weight: 6 },
   

        // 8: SPACE

        // === SECTION A: HOME ORGANIZATION ===
        { id: 316, text: "Is your home generally clean and organized?", type: "yn", weight: 9 },
        { id: 317, text: "Do you have a place for everything you own?", type: "yn", weight: 8 },
        { id: 318, text: "Can you find things easily when you need them?", type: "yn", weight: 7 },
        { id: 319, text: "Do you have piles of clutter that have accumulated?", type: "yn", weight: 7, reverse: true },
        { id: 320, text: "Is your home a peaceful, restful environment?", type: "yn", weight: 8 },
        { id: 321, text: "Do you feel embarrassed when unexpected guests arrive?", type: "yn", weight: 6, reverse: true },
        { id: 322, text: "How would you rate the overall organization of your home? (1=Chaotic, 5=Very Organized)", type: "select", options: [1, 2, 3, 4, 5], weight: 8 },
        
        // === SECTION B: CLEANING & MAINTENANCE ===
        { id: 323, text: "Do you have regular cleaning routines?", type: "yn", weight: 8 },
        { id: 324, text: "Is your kitchen clean and functional?", type: "yn", weight: 7 },
        { id: 325, text: "Is your bathroom clean and maintained?", type: "yn", weight: 7 },
        { id: 326, text: "Do you make your bed daily?", type: "yn", weight: 5 },
        { id: 327, text: "Do you wash dishes promptly (same day)?", type: "yn", weight: 6 },
        { id: 328, text: "Do you do laundry regularly before it piles up?", type: "yn", weight: 6 },
        { id: 329, text: "Is your home free of maintenance issues (broken things, needed repairs)?", type: "yn", weight: 6 },
        
        // === SECTION C: DECLUTTERING ===
        { id: 330, text: "Do you own things you never use?", type: "yn", weight: 6, reverse: true },
        { id: 331, text: "Do you regularly purge items you no longer need?", type: "yn", weight: 7 },
        { id: 332, text: "Is your closet organized with clothes you actually wear?", type: "yn", weight: 6 },
        { id: 333, text: "Do you have storage areas filled with things you have forgotten about?", type: "yn", weight: 5, reverse: true },
        { id: 334, text: "Do you struggle to let go of possessions?", type: "yn", weight: 6, reverse: true },
        { id: 335, text: "Do you buy things you do not need?", type: "yn", weight: 6, reverse: true },
        
        // === SECTION D: WORKSPACE ===
        { id: 336, text: "Is your workspace (desk, office) organized and functional?", type: "yn", weight: 8 },
        { id: 337, text: "Can you work effectively without clutter distracting you?", type: "yn", weight: 7 },
        { id: 338, text: "Do you have a designated place for focused work?", type: "yn", weight: 6 },
        { id: 339, text: "Is your digital workspace organized (files, desktop, email)?", type: "yn", weight: 6 },
        
        // === SECTION E: SYSTEMS & HABITS ===
        { id: 340, text: "Do you have systems for managing mail and paperwork?", type: "yn", weight: 6 },
        { id: 341, text: "Do you put things away immediately after using them?", type: "yn", weight: 7 },
        { id: 342, text: "Do you have a daily reset or tidying routine?", type: "yn", weight: 7 },
        { id: 343, text: "Do you maintain organization or does it always slip back to chaos?", type: "yn", weight: 7 },
        
        // === SECTION F: HOSPITALITY & ENVIRONMENT ===
        { id: 344, text: "Is your home ready to welcome guests?", type: "yn", weight: 6 },
        { id: 345, text: "Does your environment reflect your values?", type: "yn", weight: 6 },
        { id: 346, text: "Do you invest in making your space beautiful, not just functional?", type: "yn", weight: 5 },
        { id: 347, text: "Does your physical environment support your goals and well-being?", type: "yn", weight: 7 },
        { id: 349, text: "Do you feel at peace in your home?", type: "yn", weight: 8 },
   

        // 9: TIME

        // === SECTION A: PLANNING & PRIORITIES ===
        { id: 350, text: "Do you plan your days intentionally?", type: "yn", weight: 9 },
        { id: 351, text: "Do you have clear priorities that guide how you spend your time?", type: "yn", weight: 10 },
        { id: 352, text: "Do you use a calendar to schedule your commitments?", type: "yn", weight: 8 },
        { id: 353, text: "Do you use a task management system (to-do list, app, etc.)?", type: "yn", weight: 7 },
        { id: 354, text: "Do you plan your week in advance?", type: "yn", weight: 8 },
        { id: 355, text: "Do you know your most important tasks each day?", type: "yn", weight: 9 },
        
        // === SECTION B: FOCUS & PRODUCTIVITY ===
        { id: 356, text: "Can you focus on a single task for extended periods without distraction?", type: "yn", weight: 8 },
        { id: 357, text: "Do you complete what you set out to do each day?", type: "yn", weight: 8 },
        { id: 358, text: "Do you frequently feel overwhelmed by all you have to do?", type: "yn", weight: 7, reverse: true },
        { id: 359, text: "Do you procrastinate on important tasks?", type: "yn", weight: 8, reverse: true },
        { id: 360, text: "How often do you get distracted during focused work?", type: "select", options: [1, 2, 3, 4, 5], weight: 7 },
        { id: 361, text: "Do you batch similar tasks together for efficiency?", type: "yn", weight: 5 },
        
        // === SECTION C: TIME AWARENESS ===
        { id: 362, text: "Do you know where your time actually goes?", type: "yn", weight: 7 },
        { id: 363, text: "Do you regularly review how you spent your time?", type: "yn", weight: 6 },
        { id: 364, text: "Are you often surprised by how much time has passed?", type: "yn", weight: 5, reverse: true },
        { id: 365, text: "Do you accurately estimate how long tasks will take?", type: "yn", weight: 6 },
        { id: 366, text: "Do you track time spent on different activities?", type: "yn", weight: 5 },
        
        // === SECTION D: BOUNDARIES & SAYING NO ===
        { id: 367, text: "Do you protect time for your most important work?", type: "yn", weight: 8 },
        { id: 368, text: "Can you say no to requests that do not align with your priorities?", type: "yn", weight: 8 },
        { id: 369, text: "Do you have boundaries around your time (work hours, availability)?", type: "yn", weight: 7 },
        { id: 370, text: "Do you often overcommit and feel stretched too thin?", type: "yn", weight: 7, reverse: true },
        { id: 371, text: "Do interruptions frequently derail your plans?", type: "yn", weight: 6, reverse: true },
        
        // === SECTION E: REST & RHYTHM ===
        { id: 372, text: "Do you practice Sabbath - regular rest from work?", type: "yn", weight: 8 },
        { id: 373, text: "Do you take breaks during work to maintain energy?", type: "yn", weight: 6 },
        { id: 374, text: "Do you have margin in your schedule (not every moment filled)?", type: "yn", weight: 7 },
        { id: 375, text: "Do you feel rushed most of the time?", type: "yn", weight: 6, reverse: true },
        { id: 376, text: "Do you have regular rhythms and routines that structure your days?", type: "yn", weight: 7 },
        
        // === SECTION F: GOALS & PURPOSE ===
        { id: 377, text: "Do you have written goals for this year?", type: "yn", weight: 7 },
        { id: 378, text: "Does how you spend your time align with what you say matters most?", type: "yn", weight: 9 },
        { id: 380, text: "Do you regularly review your goals and progress?", type: "yn", weight: 6 },
        { id: 381, text: "Do you feel your time is spent on meaningful activities?", type: "yn", weight: 8 },
        { id: 382, text: "Do you waste significant time on things that do not matter?", type: "yn", weight: 7, reverse: true },
        
        // === SECTION G: PUNCTUALITY & RELIABILITY ===
        { id: 383, text: "Are you consistently on time for appointments and commitments?", type: "yn", weight: 7 },
        { id: 384, text: "Do you meet deadlines reliably?", type: "yn", weight: 8 },
        { id: 385, text: "Do you keep your time commitments to others?", type: "yn", weight: 7 },
   

        // 10: WORLD

        // === SECTION A: GOSPEL WITNESS ===
        { id: 386, text: "Can you clearly explain the Gospel message to someone?", type: "yn", weight: 10 },
        { id: 387, text: "Have you shared your faith with someone in the past year?", type: "yn", weight: 9 },
        { id: 388, text: "Do you pray regularly for unbelieving friends and family?", type: "yn", weight: 8 },
        { id: 389, text: "Do you have relationships with people who do not know Christ?", type: "yn", weight: 8 },
        { id: 390, text: "Are you comfortable talking about your faith when appropriate?", type: "yn", weight: 7 },
        { id: 391, text: "Do you invite people to church or Christian events?", type: "yn", weight: 6 },
        
        // === SECTION B: SERVICE & COMPASSION ===
        { id: 392, text: "Do you regularly serve others outside your family and church?", type: "yn", weight: 8 },
        { id: 393, text: "Do you notice and respond to needs in your community?", type: "yn", weight: 7 },
        { id: 394, text: "Have you volunteered for a charitable cause in the past year?", type: "yn", weight: 7 },
        { id: 395, text: "Do you help the poor, hungry, or marginalized?", type: "yn", weight: 8 },
        { id: 396, text: "Do you give to charitable causes beyond your church?", type: "yn", weight: 6 },
        { id: 397, text: "How many hours per month do you spend serving others outside your family?", type: "select", options: [0, 1, 2, 3, 4, 5, 6, 7], weight: 7 },
        
        // === SECTION C: CHURCH INVOLVEMENT ===
        { id: 398, text: "Do you actively serve in your local church?", type: "yn", weight: 9 },
        { id: 399, text: "Do you use your gifts for the benefit of the congregation?", type: "yn", weight: 8 },
        { id: 400, text: "Do you support your church's outreach and mission efforts?", type: "yn", weight: 7 },
        { id: 401, text: "Do you welcome and connect with newcomers at church?", type: "yn", weight: 6 },
        { id: 402, text: "Are you involved in a small group or ministry team?", type: "yn", weight: 6 },
        
        // === SECTION D: GLOBAL AWARENESS ===
        { id: 403, text: "Do you pray for missionaries and global missions?", type: "yn", weight: 7 },
        { id: 404, text: "Do you financially support missions?", type: "yn", weight: 7 },
        { id: 405, text: "Are you aware of global needs and how the Church is responding?", type: "yn", weight: 5 },
        { id: 406, text: "Have you participated in a mission trip or cross-cultural ministry?", type: "yn", weight: 5 },
        { id: 407, text: "Do you care about the spread of the Gospel worldwide?", type: "yn", weight: 7 },
        
        // === SECTION E: CULTURAL ENGAGEMENT ===
        { id: 408, text: "Can you engage thoughtfully with cultural issues from a Christian perspective?", type: "yn", weight: 6 },
        { id: 409, text: "Do you seek to be salt and light in your workplace and community?", type: "yn", weight: 8 },
        { id: 410, text: "Do you live distinctively as a Christian in your daily life?", type: "yn", weight: 8 },
        { id: 411, text: "Do you pray for your community and nation?", type: "yn", weight: 6 },
        { id: 412, text: "Do you engage in civic responsibilities (voting, community involvement)?", type: "yn", weight: 5 },
        
        // === SECTION F: NEIGHBOR LOVE ===
        { id: 413, text: "Do you know your neighbors by name?", type: "yn", weight: 6 },
        { id: 414, text: "Do you look for ways to serve and bless your neighbors?", type: "yn", weight: 7 },
        { id: 415, text: "Are you known as someone who helps others in your community?", type: "yn", weight: 6 },
        { id: 416, text: "Do you show hospitality to those outside your normal circle?", type: "yn", weight: 7 },
        { id: 417, text: "Do you love others in practical ways, not just feelings?", type: "yn", weight: 8 },
   

        // 11: CREATIVE

        // === SECTION A: CREATIVE ENGAGEMENT ===
        { id: 418, text: "Do you regularly engage in creative activities?", type: "yn", weight: 9 },
        { id: 419, text: "Do you have a creative hobby or artistic pursuit?", type: "yn", weight: 8 },
        { id: 420, text: "How often do you create something (art, music, writing, crafts, etc.)?", type: "select", options: [0, 1, 2, 3, 4, 5], weight: 8 },
        { id: 421, text: "Do you make time for creative expression in your regular schedule?", type: "yn", weight: 7 },
        { id: 422, text: "Have you created something you are proud of in the past year?", type: "yn", weight: 7 },
        
        // === SECTION B: CREATIVE IDENTITY ===
        { id: 423, text: "Do you consider yourself a creative person?", type: "yn", weight: 7 },
        { id: 424, text: "Do you believe creativity is a gift from God to be developed?", type: "yn", weight: 8 },
        { id: 425, text: "Were you more creative as a child than you are now?", type: "yn", weight: 5, reverse: true },
        { id: 426, text: "Do you feel that creativity is only for 'artistic' people?", type: "yn", weight: 6, reverse: true },
        { id: 427, text: "Do you suppress creative impulses because they seem impractical?", type: "yn", weight: 6, reverse: true },
        
        // === SECTION C: CREATIVE SKILLS ===
        { id: 428, text: "Have you developed skill in at least one creative medium?", type: "yn", weight: 8 },
        { id: 429, text: "Do you continue to learn and grow in your creative abilities?", type: "yn", weight: 7 },
        { id: 430, text: "Can you express yourself through at least one creative form?", type: "yn", weight: 7 },
        { id: 431, text: "Have you taken classes or training to develop creative skills?", type: "yn", weight: 5 },
        { id: 432, text: "Do you study and appreciate the creative work of others?", type: "yn", weight: 6 },
        
        // === SECTION D: CREATIVE PRACTICE ===
        { id: 433, text: "Do you have dedicated space for creative work?", type: "yn", weight: 5 },
        { id: 434, text: "Do you have the tools and materials you need for your creative pursuits?", type: "yn", weight: 5 },
        { id: 435, text: "Do you finish creative projects you start?", type: "yn", weight: 7 },
        { id: 436, text: "Do you share your creative work with others?", type: "yn", weight: 6 },
        { id: 437, text: "Do you receive feedback on your creative work?", type: "yn", weight: 5 },
        
        // === SECTION E: CREATIVE MINDSET ===
        { id: 438, text: "Are you curious and open to new ideas?", type: "yn", weight: 7 },
        { id: 439, text: "Do you see problems as opportunities for creative solutions?", type: "yn", weight: 7 },
        { id: 440, text: "Are you willing to experiment and take creative risks?", type: "yn", weight: 6 },
        { id: 441, text: "Do you embrace failure as part of the creative process?", type: "yn", weight: 6 },
        { id: 442, text: "Do you find inspiration in everyday life?", type: "yn", weight: 6 },
        
        // === SECTION F: CREATIVE BARRIERS ===
        { id: 443, text: "Does fear of failure or judgment prevent you from creating?", type: "yn", weight: 7, reverse: true },
        { id: 444, text: "Do you feel too busy to be creative?", type: "yn", weight: 6, reverse: true },
        { id: 445, text: "Do you compare your work to others and feel inadequate?", type: "yn", weight: 6, reverse: true },
        { id: 446, text: "Do you struggle to start creative projects?", type: "yn", weight: 5, reverse: true },
        { id: 447, text: "Do you believe it is too late for you to be creative?", type: "yn", weight: 5, reverse: true },
        
        // === SECTION G: CREATIVE PURPOSE ===
        { id: 448, text: "Do you use your creativity to serve or bless others?", type: "yn", weight: 8 },
        { id: 449, text: "Do you see your creativity as a way to glorify God?", type: "yn", weight: 8 },
        { id: 450, text: "Does your creative work bring you joy and fulfillment?", type: "yn", weight: 7 },
   

        // 12: TECH

        // === SECTION A: DIGITAL HABITS ===
        { id: 451, text: "Do you have healthy boundaries with your smartphone?", type: "yn", weight: 9 },
        { id: 452, text: "How many hours per day do you spend on screens (excluding work)?", type: "select", options: [1, 2, 3, 4, 5, 6, 7], weight: 8 },
        { id: 453, text: "Do you check your phone first thing in the morning?", type: "yn", weight: 6, reverse: true },
        { id: 454, text: "Do you use your phone during meals or conversations?", type: "yn", weight: 7, reverse: true },
        { id: 455, text: "Can you go several hours without checking your phone?", type: "yn", weight: 7 },
        { id: 456, text: "Do you feel anxious when separated from your phone?", type: "yn", weight: 7, reverse: true },
        
        // === SECTION B: SOCIAL MEDIA ===
        { id: 457, text: "Do you use social media intentionally rather than compulsively?", type: "yn", weight: 8 },
        { id: 458, text: "Does social media negatively affect your mood or self-image?", type: "yn", weight: 7, reverse: true },
        { id: 459, text: "Do you compare yourself to others on social media?", type: "yn", weight: 6, reverse: true },
        { id: 460, text: "Have you curated your social media feeds to be positive and helpful?", type: "yn", weight: 6 },
        { id: 461, text: "Can you take extended breaks from social media without difficulty?", type: "yn", weight: 6 },
        { id: 462, text: "Do you post thoughtfully rather than impulsively?", type: "yn", weight: 6 },
        
        // === SECTION C: DIGITAL WELLNESS ===
        { id: 463, text: "Do you have screen-free times built into your day?", type: "yn", weight: 8 },
        { id: 464, text: "Do you have screen-free spaces in your home?", type: "yn", weight: 7 },
        { id: 465, text: "Do you protect your sleep from screens (no screens before bed)?", type: "yn", weight: 8 },
        { id: 466, text: "Do you take regular breaks when using screens for extended periods?", type: "yn", weight: 6 },
        { id: 467, text: "Does technology enhance your life or dominate it?", type: "yn", weight: 9 },
        
        // === SECTION D: DIGITAL SECURITY ===
        { id: 468, text: "Do you use strong, unique passwords for your accounts?", type: "yn", weight: 7 },
        { id: 469, text: "Do you use two-factor authentication where available?", type: "yn", weight: 6 },
        { id: 470, text: "Are you cautious about what personal information you share online?", type: "yn", weight: 7 },
        { id: 471, text: "Do you keep your devices and software updated?", type: "yn", weight: 5 },
        { id: 472, text: "Have you reviewed your privacy settings on major platforms?", type: "yn", weight: 5 },
        
        // === SECTION E: DIGITAL SKILLS ===
        { id: 473, text: "Are you comfortable with the technology you need for work and life?", type: "yn", weight: 6 },
        { id: 474, text: "Do you continue to learn new technology skills?", type: "yn", weight: 5 },
        { id: 475, text: "Can you troubleshoot basic technology problems?", type: "yn", weight: 4 },
        { id: 476, text: "Do you use technology to improve your productivity?", type: "yn", weight: 6 },
        
        // === SECTION F: DIGITAL DISCERNMENT ===
        { id: 477, text: "Can you identify misinformation and unreliable sources online?", type: "yn", weight: 7 },
        { id: 478, text: "Do you verify information before sharing it?", type: "yn", weight: 7 },
        { id: 479, text: "Are you aware of how algorithms shape what you see online?", type: "yn", weight: 6 },
        { id: 480, text: "Do you consume news and information from diverse, reliable sources?", type: "yn", weight: 6 },
        
        // === SECTION G: DIGITAL STEWARDSHIP ===
        { id: 481, text: "Do you use technology in ways that honor God?", type: "yn", weight: 8 },
        { id: 482, text: "Does your online behavior reflect your Christian values?", type: "yn", weight: 8 },
        { id: 483, text: "Do you protect yourself from harmful content online?", type: "yn", weight: 8 },
        { id: 484, text: "Do you use technology to connect with and serve others?", type: "yn", weight: 6 },
        { id: 485, text: "Are you teaching good digital habits to those in your care?", type: "yn", weight: 6 }
        
]; // end of assessmentData

// === STATE MANAGEMENT ===
let currentQuestionIndex = 0;
let userAnswers = {};

// === CORE FUNCTIONS ===

function showContent(section) {
  const pane = document.getElementById('display-pane');
  if (section === 'pathfinder') {
    currentQuestionIndex = 0;
    userAnswers = {};
    renderQuestion();
  } else if (section === 'about') {
    pane.innerHTML = "<p>About the Owner</p><p>Follower of Jesus Christ. Confessional Lutheran (LCMS). Husband and Outdoor Guide based in Northwest Arkansas.</p><p><hr>About Victory Pages</p><p>A Personal Operating System designed for intentional Christian living. Built on vocational stewardship and a progression system called Pathways.A new user starts with a questionaire that will determine the starting point. Existing users will log in with a saved file and continue where they left off.As the user completes and logs pathways by completing real-world tasks assigned by the site, new pathways and mini games are unlocked.<hr><p>New users will open Pathways, select New User, and complete the questionaire to determine the starting point.</p>";
  } else if (section === 'library') {
    pane.innerHTML = "<p>Library</p><p>Curated literature for the modern pilgrim.</p>";
  }
}

function renderQuestion() {
  const pane = document.getElementById('display-pane');
  const q = assessmentData[currentQuestionIndex];
  const progress = Math.round((currentQuestionIndex / assessmentData.length) * 100);

  let inputHtml = '';
  if (q.type === 'yn') {
    inputHtml = `
      <button class="link-button" onclick="handleAnswer('yes')">Yes</button>
      <button class="link-button" onclick="handleAnswer('no')">No</button>
    `;
  } else if (q.type === 'select') {
    inputHtml = q.options.map(opt =>
      `<button class="link-button" onclick="handleAnswer(${opt})">${opt}</button>`
    ).join(' ');
  }

  pane.innerHTML = `
    <div class="assessment-container">
      <h3>Pathfinder Assessment</h3>
      <p>Progress: ${progress}% &nbsp;|&nbsp; Question ${currentQuestionIndex + 1} of ${assessmentData.length}</p>
      <hr>
      <p class="question-text"><strong>Q${currentQuestionIndex + 1}:</strong> ${q.text}</p>
      <div class="answer-zone">${inputHtml}</div>
      <hr>
      <div class="save-load-zone">
        <button class="link-button" onclick="prevQuestion()" ${currentQuestionIndex === 0 ? 'disabled' : ''}>&#8592; Back</button>
        &nbsp;
        <button class="link-button" onclick="saveProgress()">Save</button>
        &nbsp;
        <label class="link-button" style="cursor:pointer;">
           Load
          <input type="file" accept=".json" onchange="loadProgress(event)" style="display:none;">
        </label>
      </div>
    </div>
  `;
}

function handleAnswer(val) {
  userAnswers[assessmentData[currentQuestionIndex].id] = val;
  if (currentQuestionIndex < assessmentData.length - 1) {
    currentQuestionIndex++;
    renderQuestion();
  } else {
    showResults();
  }
}

function prevQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    renderQuestion();
  }
}

// === SAVE & LOAD ===

function saveProgress() {
  const saveData = {
    version: 1,
    savedAt: new Date().toISOString(),
    currentQuestionIndex: currentQuestionIndex,
    userAnswers: userAnswers
  };

  const blob = new Blob([JSON.stringify(saveData, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'victory-pages-progress.json';
  a.click();
  URL.revokeObjectURL(url);

  const pane = document.getElementById('display-pane');
  pane.innerHTML = `
    <div class="assessment-container">
      <h3>Progress Saved</h3>
      <hr>
      <p>Your progress file has been downloaded as <strong>victory-pages-progress.json</strong>.</p>
      <p>Keep it somewhere safe. When you return, click <strong>New User</strong> in the menu, 
         then use the <strong>Load Save</strong> button to pick up where you left off.</p>
      <hr>
      <button class="link-button" onclick="resumeFromSave()">&#8592; Return to Assessment</button>
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
          <button class="link-button" onclick="renderQuestion()">&#9658; Continue Assessment</button>
        </div>
      `;
    } catch (err) {
      const pane = document.getElementById('display-pane');
      pane.innerHTML = `
        <div class="assessment-container">
          <h3>Load Failed</h3>
          <hr>
          <p>Could not read the save file: <em>${err.message}</em></p>
          <p>Make sure you are using a <strong>victory-pages-progress.json</strong> file downloaded from this site.</p>
          <hr>
          <button class="link-button" onclick="showContent('pathfinder')">Start Over</button>
        </div>
      `;
    }
  };
  reader.readAsText(file);
}

function showResults() {
  const pane = document.getElementById('display-pane');
  pane.innerHTML = `
    <h2>Assessment Complete</h2>
    <p>Thank you! Your results have been recorded.</p>
    <button class="link-button" onclick="showContent('pathfinder')">Restart</button>
  `;
}
