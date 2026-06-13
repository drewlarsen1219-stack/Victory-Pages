// pathways_system.js — see inline comments for change summary

const VP_SKILL_DATA = [
  { name: 'Body',     section: 'Body',     importance: 4, desc: 'Physical health — sleep, movement, nutrition, and care of the body as a temple.' },
  { name: 'Mind',     section: 'Mind',     importance: 4, desc: 'Mental discipline — reading, focus, learning, and guarding what enters your thoughts.' },
  { name: 'Heart',    section: 'Heart',    importance: 3, desc: 'Emotional health — gratitude, forgiveness, relationships, and the affections of the inner man.' },
  { name: 'Hand',     section: 'Hand',     importance: 3, desc: 'Practical skill — vocation, craftsmanship, home stewardship, and work done with excellence.' },
  { name: 'Finance',  section: 'Finance',  importance: 3, desc: 'Stewardship of money — budgeting, giving, saving, and freedom from debt.' },
  { name: 'Vitality', section: 'Vitality', importance: 4, desc: 'Spiritual disciplines — prayer, scripture, fasting, and the practices that sustain the inner life.' },
  { name: 'Status',   section: 'Status',   importance: 2, desc: 'Reputation and integrity — how you are known, what you stand for, and alignment between words and actions.' },
  { name: 'Space',    section: 'Space',    importance: 2, desc: 'Your environment — the order, beauty, and function of the physical spaces you inhabit.' },
  { name: 'Time',     section: 'Time',     importance: 5, desc: 'Use of time — planning, priorities, rest, and the redemption of hours given by God.' },
  { name: 'World',    section: 'World',    importance: 2, desc: 'Engagement with others — service, evangelism, and faithful presence in your community and culture.' },
  { name: 'Creative', section: 'Creative', importance: 1, desc: 'Expression and making — writing, art, music, and bearing the image of the Creator through creative work.' },
  { name: 'Tech',     section: 'Tech',     importance: 2, desc: 'Use of technology — digital habits, information discernment, and keeping tools subordinate to calling.' },
  { name: 'Spirit',   section: 'Spirit',   importance: 5, desc: 'Foundation of faith — trust in Christ alone for forgiveness and the assurance of salvation.' }
];

let vpSkillsData        = VP_SKILL_DATA.map(s => ({ ...s, score: 0, completed: false }));
let vpCompletedPathways = [];
let vpPathwayProgress   = {};
let vpCurrentPathway    = null;
let vpUserName          = '';
let vpIsLoggedIn        = false;
let vpStreak            = 0;
let vpLastVisit         = '';
let vpFirstUse          = '';
let vpLastReflection    = '';
let vpReflections       = [];
let vpScoreHistory      = [];
let vpMilestonesShown   = [];
let vpEstimatedDomains  = [];

// ── LOCAL SAVE / LOAD ──────────────────────────────────────────────────────
function vpSaveToLocal() {
  const data = {
    v: 1,
    savedAt: new Date().toISOString(),
    userName: vpUserName,
    streak: vpStreak,
    lastVisit: vpLastVisit,
    firstUse: vpFirstUse,
    lastReflection: vpLastReflection,
    reflections: vpReflections,
    scoreHistory: vpScoreHistory,
    milestonesShown: vpMilestonesShown,
    skills: vpSkillsData.map(s => ({ score: s.score, completed: s.completed })),
    completedPathways: vpCompletedPathways,
    pathwayProgress: vpPathwayProgress,
    estimatedDomains: vpEstimatedDomains,
  };
  localStorage.setItem('victoryPages_v1', JSON.stringify(data));
}

function vpApplyData(data) {
  if (!data || !data.skills) return false;
  // Tolerate saves from before Spirit was added
  data.skills.forEach((s, i) => {
    if (i < vpSkillsData.length) {
      vpSkillsData[i].score     = s.score     || 0;
      vpSkillsData[i].completed = s.completed || false;
    }
  });
  vpUserName          = data.userName           || '';
  vpIsLoggedIn        = true;
  vpStreak            = data.streak             || 0;
  vpLastVisit         = data.lastVisit          || '';
  vpFirstUse          = data.firstUse           || '';
  vpLastReflection    = data.lastReflection     || '';
  vpReflections       = data.reflections        || [];
  vpScoreHistory      = data.scoreHistory       || [];
  vpMilestonesShown   = data.milestonesShown    || [];
  vpCompletedPathways = data.completedPathways  || [];
  vpPathwayProgress   = data.pathwayProgress    || {};
  vpEstimatedDomains  = data.estimatedDomains   || [];
  return true;
}

function vpLoadFromLocal() {
  try {
    const raw = localStorage.getItem('victoryPages_v1');
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (!vpApplyData(data)) return null;
    return data.savedAt ? new Date(data.savedAt).toLocaleDateString() : 'unknown date';
  } catch (e) { return null; }
}

window.vpImportFromFile = function(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const data = JSON.parse(e.target.result);
      if (!vpApplyData(data)) {
        document.getElementById('display-pane').innerHTML = `
          <div class="assessment-container">
            <p style="color:darkred;">That file does not appear to be a valid Pilgrim Pace save.</p>
            <hr>
            <a href="javascript:void(0)" class="link-button" onclick="vpLoadExistingUser()">Try again</a>
          </div>`;
        return;
      }
      vpSaveToLocal();
      vpSnapshotScores();
      vpUpdateStreak();
      const welcome = document.getElementById('sidebar-welcome');
      if (welcome) welcome.textContent = vpUserName ? `Welcome, ${vpUserName}!` : 'Welcome!';
      renderPathwaysNav();
      attachSidebarStatusBar();
      vpGoHome();
    } catch (err) {
      document.getElementById('display-pane').innerHTML = `
        <div class="assessment-container">
          <p style="color:darkred;">Could not read that file. Make sure it is a valid vp_export.json.</p>
          <hr>
          <a href="javascript:void(0)" class="link-button" onclick="vpLoadExistingUser()">Try again</a>
        </div>`;
    }
  };
  reader.readAsText(file);
};

window.vpHasSave = function() {
  return !!localStorage.getItem('victoryPages_v1');
};

function vpSnapshotScores() {
  const today = new Date().toDateString();
  const last  = vpScoreHistory[vpScoreHistory.length - 1];
  if (last && new Date(last.date).toDateString() === today) return;
  vpScoreHistory.push({
    date: new Date().toISOString(),
    scores: vpSkillsData.map(s => ({ score: s.score, completed: s.completed }))
  });
  if (vpScoreHistory.length > 30) vpScoreHistory.shift();
}

const VP_REFLECTION_QUESTIONS = {
  'Body':     'How did you do with your body this week — sleep, movement, and food?',
  'Mind':     'Where did your focus go this week? Did your mind serve you well?',
  'Heart':    'How were your closest relationships this week?',
  'Hand':     'What practical work did you put your hands to this week?',
  'Finance':  'Did you spend and steward your money in line with your values this week?',
  'Vitality': 'How consistent was your prayer and Scripture time this week?',
  'Status':   'Did your words and conduct reflect who you want to be this week?',
  'Space':    'Is your home and workspace in the order you want it?',
  'Time':     'Did you spend your time intentionally this week?',
  'World':    'How did you love your neighbor or serve someone outside yourself this week?',
  'Creative': 'Did you create or make anything meaningful this week?',
  'Tech':     'How was your relationship with screens and devices this week?',
  'Spirit':   'Where did you rest in the Gospel this week?',
};

const VP_MILESTONE_DATA = {
  25:  { label: 'First Quarter',    body: 'Getting to 25 is harder than it looks. You built something real here.', scripture: 'He who began a good work in you will bring it to completion.', ref: 'Philippians 1:6' },
  50:  { label: 'Halfway',          body: 'Halfway is where most people stop. You didn\'t. Keep going.', scripture: 'Let us not grow weary of doing good, for in due season we will reap.', ref: 'Galatians 6:9' },
  75:  { label: 'Three Quarters',   body: 'You\'re in rare territory now. Finish what you started.', scripture: 'I press on toward the goal for the prize of the upward call of God in Christ Jesus.', ref: 'Philippians 3:14' },
  100: { label: 'Domain Complete',  body: 'This is what sustained faithfulness produces. This domain is fully cultivated.', scripture: 'Well done, good and faithful servant. You have been faithful over a little; I will set you over much.', ref: 'Matthew 25:21' },
};

window.vpSaveReflection = function() {
  const el = document.getElementById('vp-reflection-input');
  if (!el) return;
  const text = el.value.trim();
  vpLastReflection = new Date().toISOString();
  if (text) {
    vpReflections.unshift({ date: vpLastReflection, text });
    if (vpReflections.length > 12) vpReflections.pop();
  }
  vpSaveToLocal();
  vpGoHome();
};

window.vpSkipReflection = function() {
  vpLastReflection = new Date().toISOString();
  vpSaveToLocal();
  vpGoHome();
};

function vpUpdateStreak() {
  const today = new Date().toDateString();
  if (vpLastVisit === today) return;
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  vpStreak    = vpLastVisit === yesterday ? vpStreak + 1 : 1;
  vpLastVisit = today;
  vpSaveToLocal();
}

window.vpLoadExistingUser = function() {
  const date = vpLoadFromLocal();
  if (!date) {
    document.getElementById('display-pane').innerHTML = `
      <div class="assessment-container">
        <p>No saved progress found in this browser.</p>
        <hr>
        <p style="margin:0 0 8px 0;">Have a saved file? Load it here:</p>
        <label class="classic-3d-button" style="cursor:pointer;display:inline-block;">
          Choose vp_export.json
          <input type="file" accept=".json" style="display:none;" onchange="vpImportFromFile(event)">
        </label>
        <hr>
        <a href="javascript:void(0)" class="link-button" onclick="showContent('pathfinder')">Start as New User instead</a>
      </div>`;
    return;
  }
  vpSnapshotScores();
  vpUpdateStreak();
  const heading = document.getElementById('page-heading');
  if (heading) heading.textContent = vpUserName ? `Welcome, ${vpUserName}! Alleluia!` : 'Pilgrim Pace — Your Pathways. Alleluia!';
  renderPathwaysNav();
  attachSidebarStatusBar();
  vpGoHome();
};

// ── DAILY SCRIPTURE ────────────────────────────────────────────────────────
const VP_DAILY_SCRIPTURES = [
  { text: 'The Lord is my shepherd; I shall not want.',                                                                           ref: 'Psalm 23:1' },
  { text: 'I can do all things through him who strengthens me.',                                                                  ref: 'Philippians 4:13' },
  { text: 'For I know the plans I have for you, declares the Lord, plans for welfare and not for evil, to give you a future and a hope.', ref: 'Jeremiah 29:11' },
  { text: 'Trust in the Lord with all your heart, and do not lean on your own understanding.',                                    ref: 'Proverbs 3:5' },
  { text: 'Come to me, all who labor and are heavy laden, and I will give you rest.',                                             ref: 'Matthew 11:28' },
  { text: 'Be strong and courageous. Do not be frightened, and do not be dismayed, for the Lord your God is with you wherever you go.', ref: 'Joshua 1:9' },
  { text: 'And we know that for those who love God all things work together for good.',                                           ref: 'Romans 8:28' },
  { text: 'The Lord is near to the brokenhearted and saves the crushed in spirit.',                                               ref: 'Psalm 34:18' },
  { text: 'Do not be anxious about anything, but in everything by prayer and supplication with thanksgiving let your requests be made known to God.', ref: 'Philippians 4:6' },
  { text: 'For by grace you have been saved through faith. And this is not your own doing; it is the gift of God.',               ref: 'Ephesians 2:8' },
  { text: 'Cast your burden on the Lord, and he will sustain you.',                                                               ref: 'Psalm 55:22' },
  { text: 'Let us not grow weary of doing good, for in due season we will reap, if we do not give up.',                          ref: 'Galatians 6:9' },
  { text: 'The steadfast love of the Lord never ceases; his mercies never come to an end; they are new every morning.',          ref: 'Lamentations 3:22–23' },
  { text: 'God is our refuge and strength, a very present help in trouble.',                                                      ref: 'Psalm 46:1' },
  { text: 'Fear not, for I am with you; be not dismayed, for I am your God; I will strengthen you, I will help you.',            ref: 'Isaiah 41:10' },
  { text: 'If we confess our sins, he is faithful and just to forgive us our sins and to cleanse us from all unrighteousness.',  ref: '1 John 1:9' },
  { text: 'Therefore, if anyone is in Christ, he is a new creation. The old has passed away; behold, the new has come.',         ref: '2 Corinthians 5:17' },
  { text: 'He who began a good work in you will bring it to completion at the day of Jesus Christ.',                             ref: 'Philippians 1:6' },
  { text: 'The Lord your God is in your midst, a mighty one who will save; he will rejoice over you with gladness.',             ref: 'Zephaniah 3:17' },
  { text: 'Peace I leave with you; my peace I give to you. Not as the world gives do I give to you.',                            ref: 'John 14:27' },
  { text: 'For God gave us a spirit not of fear but of power and love and self-control.',                                         ref: '2 Timothy 1:7' },
  { text: 'But they who wait for the Lord shall renew their strength; they shall mount up with wings like eagles.',               ref: 'Isaiah 40:31' },
  { text: 'I have been crucified with Christ. It is no longer I who live, but Christ who lives in me.',                          ref: 'Galatians 2:20' },
  { text: 'The Lord is faithful in all his words and kind in all his works.',                                                     ref: 'Psalm 145:13' },
  { text: 'Draw near to God, and he will draw near to you.',                                                                      ref: 'James 4:8' },
  { text: 'For I am sure that neither death nor life, nor angels nor rulers, nor things present nor things to come, nor powers, nor height nor depth, nor anything else in all creation, will be able to separate us from the love of God in Christ Jesus our Lord.', ref: 'Romans 8:38–39' },
  { text: 'Commit your work to the Lord, and your plans will be established.',                                                    ref: 'Proverbs 16:3' },
  { text: 'This is the day that the Lord has made; let us rejoice and be glad in it.',                                           ref: 'Psalm 118:24' },
  { text: 'Blessed is the man who remains steadfast under trial, for when he has stood the test he will receive the crown of life.', ref: 'James 1:12' },
  { text: 'Search me, O God, and know my heart! Try me and know my thoughts!',                                                   ref: 'Psalm 139:23' },
  { text: 'The name of the Lord is a strong tower; the righteous man runs into it and is safe.',                                  ref: 'Proverbs 18:10' },
  { text: 'Even though I walk through the valley of the shadow of death, I will fear no evil, for you are with me.',             ref: 'Psalm 23:4' },
  { text: 'And my God will supply every need of yours according to his riches in glory in Christ Jesus.',                         ref: 'Philippians 4:19' },
  { text: 'For the word of God is living and active, sharper than any two-edged sword.',                                         ref: 'Hebrews 4:12' },
  { text: 'I sought the Lord, and he answered me and delivered me from all my fears.',                                            ref: 'Psalm 34:4' },
  { text: 'Whoever finds his life will lose it, and whoever loses his life for my sake will find it.',                            ref: 'Matthew 10:39' },
  { text: 'The Lord will keep your going out and your coming in from this time forth and forevermore.',                           ref: 'Psalm 121:8' },
  { text: 'For we are his workmanship, created in Christ Jesus for good works, which God prepared beforehand, that we should walk in them.', ref: 'Ephesians 2:10' },
  { text: 'Bless the Lord, O my soul, and forget not all his benefits — who forgives all your iniquity, who heals all your diseases.', ref: 'Psalm 103:2–3' },
  { text: 'If God is for us, who can be against us?',                                                                            ref: 'Romans 8:31' },
];

function vpGetDailyScripture() {
  const now   = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const day   = Math.floor((now - start) / 86400000);
  return VP_DAILY_SCRIPTURES[day % VP_DAILY_SCRIPTURES.length];
}

// ── PATHWAYS DATA ──────────────────────────────────────────────────────────
const VP_PATHWAYS_DATA = {

  // 0: BODY
  0: [
    {
      id: 'body_sleep_foundation',
      title: 'Sleep Foundation',
      description: 'Sleep is the foundation of all health. Poor sleep undermines exercise, nutrition, and mental clarity.',
      difficulty: 'Beginner', scoreThreshold: 80, priority: 1, prerequisites: [], reward: 15,
      scriptureText: 'He grants sleep to those he loves.', scriptureRef: 'Psalm 127:2',
      tasks: [
        { id: 'bsf_1', text: 'Set a consistent bedtime and wake time (within 30 min) and follow it for 7 days',
          guidance: {
            howTo: ['Determine when you need to wake up','Count back 8 hours to find your bedtime','Add 15 min buffer for falling asleep','Set a wind-down alarm 30 min before bed','Write your times down and post them visibly','Check off each day you hit both times'],
            recommendations: ['Maintain the same times 7 days/week including weekends','Shift gradually if sleep is currently erratic','Tell someone for accountability'],
            commonErrors: ['Setting an unrealistic bedtime','Weekend exceptions destroy your rhythm','Hitting snooze fragments sleep'],
            sources: ['Walker, M. "Why We Sleep" (2017)','Huberman Lab — Toolkit for Sleep'] } },
        { id: 'bsf_2', text: 'Create complete darkness in your bedroom for 7 nights',
          guidance: {
            howTo: ['Identify every light source at night','Cover charging lights and standby LEDs with tape','Install blackout curtains or use a sleep mask','Test: you should not see your hand in the dark'],
            recommendations: ['Blackout curtains are worth $30-50','Remove your phone — use a real alarm clock'],
            commonErrors: ['Thinking it is dark enough when it is not','Leaving phone in bedroom for emergencies'],
            sources: ['Gooley et al. JCEM (2011)','National Sleep Foundation'] } },
        { id: 'bsf_3', text: 'Stop all screens 1 hour before bed for 7 consecutive nights',
          guidance: {
            howTo: ['Set a daily alarm for screens-off time','Put phone in another room when alarm fires','Turn off TV, computer, tablet — no exceptions','Prepare alternatives: book, journal, prayer'],
            recommendations: ['Keep a book on your nightstand','Charge phone in another room overnight'],
            commonErrors: ['"Just one more video" always runs long','Night mode does not make screens safe'],
            sources: ['Chang et al. PNAS (2015)','Walker — Why We Sleep'] } }
      ]
    },
    {
      id: 'body_movement_base',
      title: 'Movement Base',
      description: 'Build a sustainable baseline of daily movement. The body was designed to move.',
      difficulty: 'Beginner', scoreThreshold: 80, priority: 2, prerequisites: [], reward: 12,
      scriptureText: 'Do you not know that your bodies are temples of the Holy Spirit?', scriptureRef: '1 Corinthians 6:19',
      tasks: [
        { id: 'bmb_1', text: 'Walk at least 20 minutes outside every day for 14 days',
          guidance: {
            howTo: ['Pick a consistent time — morning walks have highest adherence','Schedule it like an appointment','Choose a route you enjoy'],
            recommendations: ['Walk without headphones at least half the time','Invite someone for accountability'],
            commonErrors: ['Skipping due to low motivation — momentum beats mood'],
            sources: ['Harvard Health — Benefits of walking'] } },
        { id: 'bmb_2', text: 'Do 10 bodyweight squats and 10 pushups every morning for 14 days',
          guidance: {
            howTo: ['Place gym shoes next to your bed as a trigger','Do it immediately after waking, before your phone','Scale: wall pushups or knee pushups are valid'],
            recommendations: ['Form over reps','Pair with an existing habit like prayer or brushing teeth'],
            commonErrors: ['Skipping to "do more later" — do the minimum now'],
            sources: ['Ratey, J. "Spark" (2008)'] } }
      ]
    },
    {
      id: 'body_nutrition_foundation',
      title: 'Nutrition Foundation',
      description: 'The body runs on what you put into it. Exercise cannot outwork a poor diet. This pathway builds a simple, sustainable baseline of clean eating without requiring perfection.',
      difficulty: 'Beginner', scoreThreshold: 80, priority: 3, prerequisites: [], reward: 12,
      scriptureText: 'So, whether you eat or drink, or whatever you do, do all to the glory of God.', scriptureRef: '1 Corinthians 10:31',
      tasks: [
        { id: 'bnf_1', text: 'Eliminate one category of poor nutrition for 21 days — choose: fast food, sugary drinks, daily processed snacks, or alcohol',
          guidance: {
            howTo: ['Pick the single worst offender in your diet','Define "elimination" clearly — not reduction, elimination','Remove it from your home so the decision does not have to be made under temptation','Plan what you will eat or drink instead before you get hungry'],
            recommendations: ['Removing one thing at a time beats a full diet overhaul — consistency matters more than ambition','Environment beats willpower: if it is not in the house, you will not eat it','Tell one person for accountability'],
            commonErrors: ['Choosing too easy a target — pick the habit that actually needs to go','Substituting one bad habit for another (replacing soda with fruit juice)','Treating a single slip as a failure and quitting'],
            sources: ['Pollan, M. "In Defense of Food"','1 Corinthians 10:31','Huberman Lab — Nutrition protocols'] } },
        { id: 'bnf_2', text: 'Cook at least 5 home-prepared meals per week for 4 weeks',
          guidance: {
            howTo: ['Plan the week\'s meals every Sunday — write them down','Shop once with a list — do not improvise at the store','Batch-cook protein and grains on Sunday to reduce daily effort','Track home-cooked vs. restaurant meals each week'],
            recommendations: ['Simple meals cooked at home beat elaborate restaurant meals nutritionally every time','Meal prep 2 hours on Sunday makes the whole week easier','Cooking is a skill — it improves with repetition, not recipes'],
            commonErrors: ['Choosing recipes too complex to sustain on a weeknight','Not planning and running out of groceries mid-week','Eating out because cooking feels like too much effort — batch prep solves this'],
            sources: ['Pollan, M. "In Defense of Food"','Harvard T.H. Chan School of Public Health — Healthy Eating Plate'] } }
      ]
    },
    {
      id: 'body_physical_benchmarks',
      title: 'Physical Benchmarks',
      description: 'What gets measured gets improved. This pathway establishes a baseline of physical capability, runs a simple progressive program, and retests — so you can see concrete evidence that the work is producing results.',
      difficulty: 'Intermediate', scoreThreshold: 80, priority: 4, prerequisites: ['body_movement_base'], reward: 15,
      scriptureText: 'Train yourself for godliness; for while bodily training is of some value, godliness is of value in every way.', scriptureRef: '1 Timothy 4:7-8',
      tasks: [
        { id: 'bpb_1', text: 'Complete a physical baseline test and record every result honestly',
          guidance: {
            howTo: ['Test in one session: max pushups, max bodyweight squats, 1-mile walk/run time, plank hold time, toe touch (yes or no)','Record every number — do not skip the exercises you are weakest at','Schedule a retest in exactly 8 weeks','Take a photo if you want a visual record'],
            recommendations: ['Numbers you do not record cannot show improvement','The baseline is not a judgment — it is a starting point','Weakness in a category is information, not shame'],
            commonErrors: ['Skipping exercises you struggle with — those are the most important to measure','Rounding up numbers to feel better','Not scheduling the retest date immediately'],
            sources: ['1 Timothy 4:7-8','Rippetoe, M. "Starting Strength"'] } },
        { id: 'bpb_2', text: 'Follow a simple progressive 8-week strength plan and retest at the end',
          guidance: {
            howTo: ['3 days per week, full body: pushups, squats, hip hinges, rows','Add 1 rep or slightly more difficulty each session — small progressive overload','Log every session: exercise, sets, reps','Retest baseline numbers at week 8 and compare'],
            recommendations: ['Progression is what turns exercise into training — doing the same thing every week produces no results','3 days per week is enough for significant beginner gains','Log before you leave the session — memory is unreliable'],
            commonErrors: ['Changing programs before 8 weeks — consistency beats variety','Skipping progressive overload and just "working out"','Missing sessions and not making them up'],
            sources: ['Rippetoe, M. "Starting Strength"','Ratey, J. "Spark" (2008)','1 Timothy 4:7-8'] } }
      ]
    }
  ],

  // 1: MIND
  1: [
    {
      id: 'mind_reading_habit',
      title: 'Reading Habit',
      description: 'Intentional reading is one of the highest-return investments of time. It builds focus, expands knowledge, and counters the fragmentation of digital culture.',
      difficulty: 'Beginner', scoreThreshold: 80, priority: 1, prerequisites: [], reward: 12,
      scriptureText: 'Let the word of Christ dwell in you richly, teaching and admonishing one another in all wisdom.', scriptureRef: 'Colossians 3:16',
      tasks: [
        { id: 'mrh_1', text: 'Read for 20 minutes every day for 14 days — no phone, no TV',
          guidance: {
            howTo: ['Choose a book before the session starts so there is no decision friction','Set a timer for 20 minutes','Sit in a chair with no screens nearby','Read until the timer ends — do not stop early'],
            recommendations: ['Keep your current book on your pillow or nightstand','Read at the same time each day to build the habit','Physical books are better than e-readers for this habit'],
            commonErrors: ['Checking your phone mid-session','Choosing a book that is too difficult — start accessible','Counting social media articles as reading'],
            sources: ['Newport, C. "Deep Work" (2016)','Adler, M. "How to Read a Book" (1940)'] } },
        { id: 'mrh_2', text: 'Write a one-paragraph summary of what you read each session',
          guidance: {
            howTo: ['Keep a small notebook next to your reading spot','After each session, write the main idea in your own words','Do not copy — paraphrase to force comprehension'],
            recommendations: ['Do not skip this even if the summary is short','Review past summaries weekly to reinforce retention'],
            commonErrors: ['Skipping the summary because it feels tedious — it doubles retention','Copying quotes instead of summarizing in your own words'],
            sources: ['Brown, P. "Make It Stick" (2014)'] } }
      ]
    },
    {
      id: 'mind_focus_training',
      title: 'Focus Training',
      description: 'Sustained attention is a skill that must be trained. This pathway builds the capacity for deep, uninterrupted work.',
      difficulty: 'Beginner', scoreThreshold: 80, priority: 2, prerequisites: [], reward: 10,
      scriptureText: 'Whatever is true, whatever is honorable... think about these things.', scriptureRef: 'Philippians 4:8',
      tasks: [
        { id: 'mft_1', text: 'Complete one 25-minute focused work block daily with zero distractions for 10 days',
          guidance: {
            howTo: ['Choose a single task before starting','Put phone in another room or on airplane mode','Close all browser tabs except what is needed','Set a 25-minute timer and do not stop until it ends'],
            recommendations: ['Start with 25 minutes (Pomodoro) and extend over time','Tell others you are unavailable during this block'],
            commonErrors: ['Checking email or messages mid-block','Starting without a defined task','Allowing notifications'],
            sources: ['Newport, C. "Deep Work" (2016)','Cirillo, F. — The Pomodoro Technique'] } },
        { id: 'mft_2', text: 'Do not check your phone for the first 60 minutes after waking for 10 days',
          guidance: {
            howTo: ['Put your phone in another room the night before','Use an alarm clock instead of your phone for waking','Spend the first hour in prayer, reading, or movement'],
            recommendations: ['Replace the habit with something intentional — do not just avoid the phone','Keep a notepad to capture thoughts instead'],
            commonErrors: ['Checking phone "just for the time"','Keeping phone on the nightstand'],
            sources: ['Huberman Lab — Morning routine protocols','Hardy, D. "The Compound Effect"'] } }
      ]
    },
    {
      id: 'mind_thought_life',
      title: 'Thought Life',
      description: 'The mind feeds on what it dwells on. Taking thoughts captive is not passive — it is an active daily discipline of naming destructive patterns, bringing them to Scripture, and replacing them with truth.',
      difficulty: 'Intermediate', scoreThreshold: 80, priority: 3, prerequisites: [], reward: 10,
      scriptureText: 'Whatever is true, whatever is honorable, whatever is just, whatever is pure, whatever is lovely, whatever is commendable — think about these things.', scriptureRef: 'Philippians 4:8',
      tasks: [
        { id: 'mtl_1', text: 'Identify your 3 most frequent destructive thought patterns and write the actual recurring sentence, not the category',
          guidance: {
            howTo: ['For one week, notice thoughts that produce anxiety, anger, lust, envy, or despair','Write the specific thought — not "anxiety" but "I am going to fail and everyone will see it"','Identify what triggers each thought','Ask of each: Is this true? Is it useful? Does it align with Philippians 4:8?'],
            recommendations: ['You cannot fight what you have not named','Most destructive patterns repeat daily — they will not be hard to find','Bring them into the light honestly — God already knows them'],
            commonErrors: ['Writing vague categories instead of the specific recurring sentence','Judging yourself for having the thought instead of analyzing it','Stopping at one pattern when there are usually three or four'],
            sources: ['2 Corinthians 10:5','Philippians 4:8','Powlison, D. "Seeing with New Eyes"'] } },
        { id: 'mtl_2', text: 'Choose a Scripture passage that directly counters your most frequent destructive thought and memorize it — then use it when the thought appears',
          guidance: {
            howTo: ['Match passage to thought: anxiety → Matthew 6:25-27; shame → Romans 8:1; fear → Psalm 27:1; anger → Proverbs 15:1','Memorize the passage in 2 weeks using daily repetition — say it aloud','When the destructive thought appears, speak the passage aloud as a response','Use it as a replacement, not just a suppression'],
            recommendations: ['Suppressing a thought without replacing it creates a vacuum — fill it with truth','Speaking Scripture aloud against a destructive thought is ancient, practiced, and effective','The passage you need most will be the one you resist memorizing'],
            commonErrors: ['Memorizing without applying — the point is to use it when the thought appears','Choosing a passage that sounds good but does not address the specific thought','Expecting the thought to disappear — it will diminish with consistent replacement over weeks'],
            sources: ['Philippians 4:8','2 Corinthians 10:5','Powlison, D. "Good and Angry"'] } }
      ]
    },
    {
      id: 'mind_knowledge_retention',
      title: 'Knowledge Retention',
      description: 'Reading without retention is recreation. This pathway builds a simple system for capturing, reviewing, and applying what you learn — so knowledge becomes wisdom that actually changes how you live.',
      difficulty: 'Intermediate', scoreThreshold: 80, priority: 4, prerequisites: ['mind_reading_habit'], reward: 10,
      scriptureText: 'An intelligent heart acquires knowledge, and the ear of the wise seeks knowledge.', scriptureRef: 'Proverbs 18:15',
      tasks: [
        { id: 'mkr_1', text: 'After finishing each book, write a one-page summary: main argument, 3 key insights, one action to take',
          guidance: {
            howTo: ['Write in your own words — do not copy passages','Limit to one page — brevity forces you to identify what actually mattered','Name one concrete action: "I will try X from this book this week"','Keep all summaries in one notebook or file so they are reviewable'],
            recommendations: ['One page per book retains the core — the full book will not be forgotten if you wrote the page','The action item is the most important part — knowledge applied is wisdom; knowledge filed is trivia','Write the summary within 24 hours of finishing'],
            commonErrors: ['Writing summaries too long to re-read — one page maximum','Skipping the action item because it is hard to identify','Writing what sounds impressive rather than what actually stuck'],
            sources: ['Brown, P. "Make It Stick"','Adler, M. "How to Read a Book"','Proverbs 18:15'] } },
        { id: 'mkr_2', text: 'Review your book summaries monthly and identify one insight to put into practice that month',
          guidance: {
            howTo: ['Set a monthly recurring reminder — first of the month works well','Read through all summaries in 15-20 minutes','Pick the one insight most relevant to your current season','Write specifically how you will apply it in the next 30 days'],
            recommendations: ['The review converts short-term memory to long-term — re-reading once a month triples retention','The best insight to apply is the most relevant one now, not the most intellectually interesting','After applying it, note in your summary how it worked'],
            commonErrors: ['Never reviewing — the summaries become an archive instead of a tool','Choosing too many insights to apply at once — one is enough','Picking insights that require no behavior change'],
            sources: ['Brown, P. "Make It Stick" — spaced repetition','Newport, C. "Deep Work"','Proverbs 18:15'] } }
      ]
    }
  ],

  // 2: HEART
  2: [
    {
      id: 'heart_gratitude_practice',
      title: 'Gratitude Practice',
      description: 'Gratitude is a discipline, not a feeling. Practiced consistently, it rewires attention toward blessing and away from complaint.',
      difficulty: 'Beginner', scoreThreshold: 80, priority: 1, prerequisites: [], reward: 10,
      scriptureText: 'Give thanks in all circumstances; for this is the will of God in Christ Jesus for you.', scriptureRef: '1 Thessalonians 5:18',
      tasks: [
        { id: 'hgp_1', text: 'Write 3 specific things you are grateful for each morning for 14 days',
          guidance: {
            howTo: ['Keep a small notebook on your nightstand','Write immediately after waking, before phone','Be specific: not "family" but "my wife made dinner last night"','Aim for different entries each day — do not repeat'],
            recommendations: ['Specificity matters more than length','Include at least one small, ordinary thing each day'],
            commonErrors: ['Writing vague generalities that feel hollow','Skipping days and trying to catch up'],
            sources: ['Emmons, R. "Thanks!" (2007)','Seligman, M. — Positive Psychology research'] } },
        { id: 'hgp_2', text: 'Verbally express thanks to a specific person each day for 7 days',
          guidance: {
            howTo: ['Identify the person and what specifically to thank them for','Say it in person or by phone — not text','Be direct: "I want to thank you for..."'],
            recommendations: ['This is harder than it sounds — do not skip it','Include people you take for granted: spouse, parents, coworkers'],
            commonErrors: ['Sending a text instead of speaking','Vague thanks — name the specific act'],
            sources: ['Emmons, R. "Thanks!" (2007)'] } }
      ]
    },
    {
      id: 'heart_conflict_resolution',
      title: 'Conflict Resolution',
      description: 'Unresolved conflict is a weight that compounds over time. This pathway addresses it directly through scripture and practical action.',
      difficulty: 'Intermediate', scoreThreshold: 80, priority: 2, prerequisites: [], reward: 15,
      scriptureText: 'If possible, so far as it depends on you, live peaceably with all.', scriptureRef: 'Romans 12:18',
      tasks: [
        { id: 'hcr_1', text: 'Identify one unresolved conflict or unforgiveness and write it down honestly',
          guidance: {
            howTo: ['Find a quiet place with no interruptions','Write the name of the person and what happened','Write how it affected you — be honest, not performative','Write what you have done or not done in response'],
            recommendations: ['Do not share this with anyone yet — this is for clarity','Include conflicts where you are also at fault'],
            commonErrors: ['Minimizing to avoid discomfort','Only writing about the other person\'s fault'],
            sources: ['Powlison, D. "Good and Angry" (2016)','Matthew 18:15-17'] } },
        { id: 'hcr_2', text: 'Take one concrete step toward resolution — apologize, reach out, or forgive in prayer',
          guidance: {
            howTo: ['Choose the lowest-friction first step','If you owe an apology: say it without conditions or justifications','If reconciliation is not possible: pray for the person by name for 7 days'],
            recommendations: ['Do not wait for the other person to go first','A letter or email is acceptable if in-person is not possible'],
            commonErrors: ['A non-apology apology: "I\'m sorry if you felt..."','Waiting for a "good time" indefinitely'],
            sources: ['Romans 12:18-21','Sande, K. "The Peacemaker"'] } }
      ]
    },
    {
      id: 'heart_closest_relationships',
      title: 'Invest in Your Closest Relationships',
      description: 'Proximity is not the same as intimacy. The people closest to you require the most deliberate investment. This pathway builds the habits of attention and presence toward the 1-3 people who matter most.',
      difficulty: 'Beginner', scoreThreshold: 80, priority: 3, prerequisites: [], reward: 12,
      scriptureText: 'A friend loves at all times, and a brother is born for a time of adversity.', scriptureRef: 'Proverbs 17:17',
      tasks: [
        { id: 'hcr2_1', text: 'Schedule one intentional, uninterrupted block of time with each of your 1-3 closest people every week for 4 weeks',
          guidance: {
            howTo: ['Name the people: spouse, close friend, sibling, parent — whoever is most important to you right now','Block the time in your calendar before the week fills — treat it as an appointment you do not cancel','No phones during the time — full presence is the point, including phone face-down and silenced','Do something that allows conversation: a walk, a meal, a drive — not a movie or event where you cannot talk'],
            recommendations: ['Presence without distraction is rarer than most people realize — even a phone on the table divides attention','Regularity matters more than duration — 30 focused minutes weekly beats a quarterly dinner','For marriage: protect this time first, before any other social commitment'],
            commonErrors: ['Letting the block get bumped by things that feel more urgent','Filling the time with activities that prevent conversation','Thinking about the relationship without actually spending time in it'],
            sources: ['Proverbs 17:17','Ecclesiastes 4:9-10','Gottman, J. "The Seven Principles for Making Marriage Work"'] } },
        { id: 'hcr2_2', text: 'Ask each person one deep question this month and listen without redirecting to yourself',
          guidance: {
            howTo: ['Choose one question: "What is the hardest thing you are dealing with right now?" or "What do you wish I understood about you?" or "Is there anything I\'ve done that hurt you that we\'ve never talked about?"','Ask when you have time and privacy — not between tasks','Listen fully: no advice, no "me too" stories, no solutions — just receive what they share','Reflect back what you heard to show you understood before responding'],
            recommendations: ['Most people feel unknown even by those closest to them — one honest question can change that','The goal is to understand, not to be impressive or helpful','Write down what they share so you can follow up and remember'],
            commonErrors: ['Asking and then immediately sharing your own answer','Giving advice when the person only wanted to be heard','Asking in a distracted or rushed context — wait for the right moment'],
            sources: ['James 1:19','Proverbs 18:13','Chapman, G. "The Five Love Languages"'] } }
      ]
    },
    {
      id: 'heart_emotional_sobriety',
      title: 'Emotional Sobriety',
      description: 'Emotions are real but they are not always reliable guides. This pathway builds the discipline of understanding what you feel and why — so that you respond from values rather than react from feeling.',
      difficulty: 'Intermediate', scoreThreshold: 80, priority: 4, prerequisites: ['heart_gratitude_practice'], reward: 10,
      scriptureText: 'Whoever is slow to anger is better than the mighty, and he who rules his spirit than he who takes a city.', scriptureRef: 'Proverbs 16:32',
      tasks: [
        { id: 'hes_1', text: 'Keep a one-week emotion journal — three times daily write what you felt, what triggered it, and what you did in response',
          guidance: {
            howTo: ['Three times per day (morning, midday, evening) spend 3 minutes writing','What am I feeling right now? What triggered it? What did I do or want to do in response?','Use specific emotion words — not "bad" but "frustrated," "ashamed," "anxious," "lonely," "overlooked"','Do this for 7 consecutive days without skipping'],
            recommendations: ['Most people can name 3-4 emotions; the full vocabulary has 30+ — specificity reveals what vagueness hides','The trigger matters as much as the feeling: the same event does not produce the same emotion in everyone','Patterns across 7 days tell you far more than any single entry'],
            commonErrors: ['Writing what you think you should feel instead of what you actually feel','Skipping entries when the emotions are unpleasant — those entries are the most important','Writing "fine" or "okay" — these are not emotions'],
            sources: ['Proverbs 16:32','Proverbs 4:23','Powlison, D. "Good and Angry"'] } },
        { id: 'hes_2', text: 'Identify your primary reactive emotion and write a specific plan for responding differently when it is triggered',
          guidance: {
            howTo: ['Review your 7-day journal — what emotion appeared most? what triggered it most consistently?','Write: "When I feel __ triggered by __, my default response is __. A better response would be __."','Define the better response concretely: step away and pray, state your feeling calmly, wait 10 minutes before responding','Practice the plan for 30 days — track how often you choose the better response'],
            recommendations: ['The goal is not to stop feeling — it is to govern the response','A plan made in advance holds better under pressure than a decision made in the moment of feeling','Tell one trusted person your plan — accountability makes the difference in weeks 2 and 3'],
            commonErrors: ['Trying to change the emotion instead of the response — you cannot directly control what you feel','Setting a vague goal ("be calmer") instead of a concrete if-then plan','Expecting instant change — emotional patterns built over years require months to reshape'],
            sources: ['Proverbs 16:32','James 1:19-20','Powlison, D. "Good and Angry"'] } }
      ]
    }
  ],

  // 3: HAND
  3: [
    {
      id: 'hand_skill_development',
      title: 'Skill Development',
      description: 'The hand is the instrument of vocation. This pathway establishes a deliberate practice routine for a practical skill.',
      difficulty: 'Beginner', scoreThreshold: 80, priority: 1, prerequisites: [], reward: 10,
      scriptureText: 'Whatever your hand finds to do, do it with all your might.', scriptureRef: 'Ecclesiastes 9:10',
      tasks: [
        { id: 'hsd_1', text: 'Identify one practical skill to develop and practice it for 20 minutes daily for 14 days',
          guidance: {
            howTo: ['Choose one skill: cooking, woodworking, writing, a trade skill, an instrument','Schedule 20 minutes at the same time each day','Practice deliberately — focus on what you are weak at, not what is comfortable','Track what you practiced each day in a notebook'],
            recommendations: ['Choose something with a clear end product or milestone','Find one resource (book, video, person) to guide the practice'],
            commonErrors: ['Practicing what you already do well instead of your weak points','Skipping days and losing momentum'],
            sources: ['Ericsson, A. "Peak" (2016)','Proverbs 22:29'] } },
        { id: 'hsd_2', text: 'Complete one finished project using your chosen skill',
          guidance: {
            howTo: ['Define a small, completable project at the start','Set a deadline no more than 3 weeks out','Finish it — even imperfectly'],
            recommendations: ['Done is better than perfect for a first project','Show the finished work to someone — accountability through visibility'],
            commonErrors: ['Project scope creep — keep it small','Abandoning when it gets difficult'],
            sources: ['Pressfield, S. "The War of Art" (2002)'] } }
      ]
    },
    {
      id: 'hand_home_competency',
      title: 'Home Competency',
      description: 'Basic home maintenance is a stewardship responsibility. This pathway ensures you can care for the space God has given you.',
      difficulty: 'Beginner', scoreThreshold: 80, priority: 2, prerequisites: [], reward: 10,
      scriptureText: 'Know well the condition of your flocks, and give attention to your herds.', scriptureRef: 'Proverbs 27:23',
      tasks: [
        { id: 'hhc_1', text: 'Complete a home maintenance walkthrough and write a list of needed repairs',
          guidance: {
            howTo: ['Walk every room and the exterior with a notepad','Check: leaky faucets, loose fixtures, worn caulk, HVAC filter, smoke detector batteries','Write every issue down — do not fix yet, just document','Categorize: urgent, soon, eventually'],
            recommendations: ['Do this quarterly as an ongoing habit','Take photos of issues to reference later'],
            commonErrors: ['Overlooking small problems that become large ones','Only checking visible surfaces'],
            sources: ['Family Handyman — Home maintenance checklist'] } },
        { id: 'hhc_2', text: 'Fix or address the top 2 items on your maintenance list',
          guidance: {
            howTo: ['Pick the two most urgent or impactful items','Research the fix: YouTube is sufficient for most basic repairs','Gather tools and materials before starting','Complete both fixes within one week'],
            recommendations: ['Ask a knowledgeable friend or neighbor if needed','Document what you did for future reference'],
            commonErrors: ['Hiring out things you can learn to do yourself','Buying tools for a single task — borrow first'],
            sources: ['Proverbs 27:23'] } }
      ]
    },
    {
      id: 'hand_vocation_excellence',
      title: 'Excellence in Vocation',
      description: 'Work done well is an act of worship. This pathway challenges you to bring full effort to your current vocation — not for recognition or promotion, but as service rendered to God and neighbor.',
      difficulty: 'Beginner', scoreThreshold: 80, priority: 3, prerequisites: ['hand_skill_development'], reward: 10,
      scriptureText: 'Whatever you do, work heartily, as for the Lord and not for men.', scriptureRef: 'Colossians 3:23',
      tasks: [
        { id: 'hve_1', text: 'Identify the one area of your work where you consistently give less than your best and close that gap for 30 days',
          guidance: {
            howTo: ['Write honestly: where do you cut corners, arrive late, do the minimum, or mentally check out?','Choose the single most impactful area — not the easiest one','Define specifically what "full effort" looks like in that area','Do it consistently for 30 days, especially on the low-motivation days'],
            recommendations: ['Colossians 3:23 removes the excuse of doing work "just for the paycheck" — the audience is God','Starting with the hardest area produces the most visible and lasting change','Tell no one at work — let the work speak for itself'],
            commonErrors: ['Choosing an easy area to feel the satisfaction of improvement without the cost','Maintaining the new standard only when a supervisor is watching','Framing this as performance improvement instead of worship'],
            sources: ['Colossians 3:23','Proverbs 22:29','Keller, T. "Every Good Endeavor"'] } },
        { id: 'hve_2', text: 'Ask your supervisor, a coworker, or a customer for honest feedback on your work and act on one piece of it',
          guidance: {
            howTo: ['Choose someone who will be honest, not just kind','Ask directly: "What is one thing I could do better in my work?"','Listen without defensiveness — write it down','Choose one piece of feedback and act on it specifically for the next 30 days'],
            recommendations: ['Solicited honest feedback is rare and more valuable than unsolicited praise','The willingness to ask for critique signals genuine seriousness about your craft','Follow up with the person — tell them what you did with their feedback'],
            commonErrors: ['Asking someone who will only affirm you','Becoming defensive when the feedback is accurate','Asking but not acting on any of it — the ask was theater'],
            sources: ['Proverbs 12:15','Proverbs 15:22','Keller, T. "Every Good Endeavor"'] } }
      ]
    },
    {
      id: 'hand_build_something',
      title: 'Build Something',
      description: 'The hand was made to make. This pathway takes you from practicing skills to actually producing something — a physical object or project that did not exist before you made it.',
      difficulty: 'Intermediate', scoreThreshold: 80, priority: 4, prerequisites: ['hand_skill_development'], reward: 15,
      scriptureText: 'Do you see a man skillful in his work? He will stand before kings; he will not stand before obscure men.', scriptureRef: 'Proverbs 22:29',
      tasks: [
        { id: 'hbs_1', text: 'Define a substantial project, list everything you need, and set a completion deadline within 60 days',
          guidance: {
            howTo: ['Choose a project that requires real skill and sustained effort — furniture, a repaired room, a garden bed, a built tool, a finished piece of writing','Define the finished state clearly: what does "done" look like?','List every material and resource needed before starting','Set a completion date no more than 60 days out and write it down'],
            recommendations: ['The project should stretch you — if it requires nothing you don\'t already know, choose something harder','Choosing a project for someone else (wife, neighbor, church) adds purpose and accountability','A physical, completable project teaches more than hours of unfocused practice'],
            commonErrors: ['Scoping the project too large to finish in 60 days — cut it down','Not gathering materials before starting — waiting on supplies kills momentum','Choosing a project that impresses others rather than one that develops you'],
            sources: ['Proverbs 22:29','Ecclesiastes 9:10','Ericsson, A. "Peak"'] } },
        { id: 'hbs_2', text: 'Complete the project and show it to at least one person — then write one paragraph on what you learned',
          guidance: {
            howTo: ['Work on the project in regular sessions, not in one burst','Log progress as you go — even brief notes','When finished, show it to someone and explain what you made and what it cost you','Write one paragraph: what did this project teach me about my craft, my patience, or myself?'],
            recommendations: ['"Done" is the goal — imperfect and finished teaches more than perfect and incomplete','Showing the work closes the creative loop and forces honest self-assessment','The paragraph produces reflection that the work itself does not — do not skip it'],
            commonErrors: ['Stopping at 90% because the final polish is the hardest part','Hiding the work because it is imperfect','Not writing the reflection — the insight lives in the writing, not just the doing'],
            sources: ['Proverbs 22:29','Pressfield, S. "The War of Art"','Ecclesiastes 9:10'] } }
      ]
    }
  ],

  // 4: FINANCE
  4: [
    {
      id: 'finance_budget_foundation',
      title: 'Budget Foundation',
      description: 'A budget is not a restriction — it is a plan. Without one, money flows to whatever is loudest. This pathway establishes basic financial visibility.',
      difficulty: 'Beginner', scoreThreshold: 80, priority: 1, prerequisites: [], reward: 15,
      scriptureText: 'For which of you, desiring to build a tower, does not first sit down and count the cost?', scriptureRef: 'Luke 14:28',
      tasks: [
        { id: 'fbf_1', text: 'Write down your total monthly income and every monthly expense',
          guidance: {
            howTo: ['Pull your last 2 bank and credit card statements','List every recurring expense: rent, utilities, subscriptions, insurance','List variable expenses: groceries, gas, dining, entertainment','Total income and total expenses — subtract to find surplus or deficit'],
            recommendations: ['Use a simple spreadsheet or paper — complexity kills follow-through','Include annual expenses divided by 12 (car registration, etc.)'],
            commonErrors: ['Forgetting subscriptions — check statements carefully','Estimating instead of using actual numbers'],
            sources: ['Ramsey, D. "The Total Money Makeover"','Luke 14:28'] } },
        { id: 'fbf_2', text: 'Assign every dollar of income to a category before next month begins (zero-based budget)',
          guidance: {
            howTo: ['Start with giving (tithe or offering) and savings first','Then necessities: housing, food, transportation, utilities','Then debt minimums','Remaining money is discretionary — assign it intentionally'],
            recommendations: ['Give before you pay yourself — it builds the right order of priorities','Keep categories broad at first — you will refine over time'],
            commonErrors: ['Forgetting irregular expenses','Setting an unrealistic entertainment/food budget'],
            sources: ['Ramsey, D. "The Total Money Makeover"','Proverbs 21:5'] } }
      ]
    },
    {
      id: 'finance_emergency_fund',
      title: 'Emergency Fund',
      description: 'An emergency fund is the first true act of financial stewardship. It breaks the cycle of debt when the unexpected happens.',
      difficulty: 'Beginner', scoreThreshold: 80, priority: 2, prerequisites: ['finance_budget_foundation'], reward: 15,
      scriptureText: 'Precious treasure and oil are in a wise man\'s dwelling, but a foolish man devours it.', scriptureRef: 'Proverbs 21:20',
      tasks: [
        { id: 'fef_1', text: 'Open a separate savings account designated only for emergencies',
          guidance: {
            howTo: ['Open a free savings account at your bank or a high-yield online savings account','Name it "Emergency Fund" so the purpose is clear','Transfer a starter amount — even $50 — to begin'],
            recommendations: ['A high-yield savings account (HYSA) earns more while keeping funds accessible','Do not attach a debit card to this account'],
            commonErrors: ['Keeping emergency funds in your checking account where it gets spent','Not starting because the amount feels too small'],
            sources: ['Ramsey, D. — Baby Step 1','Proverbs 21:20'] } },
        { id: 'fef_2', text: 'Save $1,000 in your emergency fund',
          guidance: {
            howTo: ['Determine how much per month you can add from your budget','Set up an automatic transfer on payday','Find one expense to temporarily cut to accelerate progress','Track your balance weekly'],
            recommendations: ['Sell something you do not need to accelerate the first $1,000','Treat it as a bill — non-negotiable each month'],
            commonErrors: ['Raiding the account for non-emergencies','Stopping at $500 because it feels like enough'],
            sources: ['Ramsey, D. — Baby Step 1'] } }
      ]
    },
    {
      id: 'finance_giving_first',
      title: 'Giving First',
      description: 'The order of giving reveals who you trust. Giving before paying yourself is not a rule — it is a posture of faith that says God is the owner and you are the steward. This pathway makes giving the first line of the budget.',
      difficulty: 'Beginner', scoreThreshold: 80, priority: 3, prerequisites: ['finance_budget_foundation'], reward: 12,
      scriptureText: 'Honor the LORD with your wealth and with the firstfruits of all your produce.', scriptureRef: 'Proverbs 3:9',
      tasks: [
        { id: 'fgf_1', text: 'Set a specific giving percentage and give it before paying any other bill for 3 consecutive months',
          guidance: {
            howTo: ['Decide your giving percentage — start with 10% if uncertain, start with 2% if that is what you can commit to honestly','Give on the day income arrives, before any other bill is paid','Give to your local church first, then other causes','Track giving as line 1 of your budget every month — not line 12'],
            recommendations: ['Giving first is a faith decision, not a math decision — the math never seems to work until you do it','Automatic transfers on payday remove the temptation to spend first and give later','Start where you are: 2% given consistently beats 10% given sporadically and then abandoned'],
            commonErrors: ['Giving what is left over — there is never anything left over','Treating giving as optional in lean months','Not giving to your local church at all — the congregation is your first obligation'],
            sources: ['Proverbs 3:9','Malachi 3:10','Ramsey, D. "The Total Money Makeover"'] } },
        { id: 'fgf_2', text: 'Research and give intentionally to one organization outside your church that aligns with your values',
          guidance: {
            howTo: ['Choose one cause: crisis pregnancy center, Christian school, food pantry, mission organization','Research the organization: what is the mission? how are funds used? are they accountable?','Give a specific, decided amount — not "whatever is left"','Write one sentence explaining why you chose this organization'],
            recommendations: ['Giving beyond the local church builds awareness of the wider Kingdom','Writing the reason deepens the act — it becomes intentional generosity rather than impulsive charity','Charity Navigator or the organization\'s annual report can help evaluate stewardship'],
            commonErrors: ['Giving to organizations without any research into how funds are used','Using outside giving as a substitute for local church giving','Giving an amount too small to require any real decision'],
            sources: ['2 Corinthians 9:6-7','Matthew 6:19-21','Proverbs 3:9'] } }
      ]
    },
    {
      id: 'finance_debt_elimination',
      title: 'Debt Assault',
      description: 'Debt is a weight that compounds silently. The borrower is servant to the lender. This pathway builds a systematic plan to eliminate debt using the snowball method — smallest balance first for real momentum.',
      difficulty: 'Intermediate', scoreThreshold: 80, priority: 4, prerequisites: ['finance_emergency_fund'], reward: 15,
      scriptureText: 'The rich rules over the poor, and the borrower is the slave of the lender.', scriptureRef: 'Proverbs 22:7',
      tasks: [
        { id: 'fde_1', text: 'List every debt you owe — creditor, balance, interest rate, minimum payment — sorted smallest to largest balance',
          guidance: {
            howTo: ['Pull every statement: credit cards, car loans, student loans, medical bills, personal loans','List: creditor name, current balance, interest rate, minimum monthly payment','Sort by balance smallest to largest — ignore interest rate for now','Total all minimum payments — this is your debt floor each month'],
            recommendations: ['Seeing every debt in one place is often uncomfortable — that discomfort is useful','Smallest balance first seems counterintuitive but builds momentum that keeps people going','Do not include your mortgage in the snowball'],
            commonErrors: ['Hiding a debt from yourself or a spouse — every debt goes on the list','Sorting by interest rate instead of balance (mathematically optimal but people quit before it pays off)','Not tracking minimum payments — missing one damages credit and adds fees'],
            sources: ['Proverbs 22:7','Ramsey, D. "The Total Money Makeover" — Baby Step 2','Luke 14:28'] } },
        { id: 'fde_2', text: 'Make one extra payment toward your smallest debt this month — find the money by cutting or selling something',
          guidance: {
            howTo: ['Find extra dollars: cut one subscription, sell something unused, skip dining out for two weeks','Apply every extra dollar to the smallest debt only — pay minimums on everything else','Call the creditor and confirm extra payment is applied to principal, not next month\'s payment','Calculate the new payoff date at your current extra payment rate'],
            recommendations: ['Any extra amount counts: $20 extra, $50 extra — the direction matters more than the size','Sell something you do not use to accelerate the first payoff and build psychological momentum','When the first debt is paid, redirect those payments entirely to the next — this is the snowball'],
            commonErrors: ['Paying extra on the largest or highest-interest debt before the smallest is gone','Not finding any extra to pay — something can always be cut or sold for one month','Spending the freed-up money after a debt is paid instead of rolling it to the next debt'],
            sources: ['Ramsey, D. "The Total Money Makeover"','Proverbs 22:7','Romans 13:8'] } }
      ]
    }
  ],

  // 5: VITALITY
  5: [
    {
      id: 'vitality_daily_office',
      title: 'Daily Office',
      description: 'The Daily Office is the ancient Christian practice of structured prayer at set times. It anchors the day in God\'s word and shapes the soul over time.',
      difficulty: 'Beginner', scoreThreshold: 80, priority: 1, prerequisites: [], reward: 15,
      scriptureText: 'Seven times a day I praise you for your righteous rules.', scriptureRef: 'Psalm 119:164',
      tasks: [
        { id: 'vdo_1', text: 'Establish a morning prayer routine of at least 10 minutes for 14 days',
          guidance: {
            howTo: ['Choose a set time — immediately after waking is best','Use a structured form: Luther\'s Morning Prayer, a psalm, and the Lord\'s Prayer','Keep it short enough to be sustainable — 10 minutes is sufficient to start','Do it in the same place each day'],
            recommendations: ['Use the Lutheran Service Book or a Daily Office app for structure','Do not skip due to busyness — a short prayer is better than none'],
            commonErrors: ['Making it too long and then abandoning it','Treating it as optional on "busy" days — those are the days it matters most'],
            sources: ['Luther\'s Small Catechism — Morning Prayer','Lutheran Service Book — Daily Prayer'] } },
        { id: 'vdo_2', text: 'Read one psalm per day and write one observation for 14 days',
          guidance: {
            howTo: ['Read the psalm slowly — twice if possible','Write one sentence: what does this teach me about God, or about man?','Do not overthink — one honest observation is sufficient'],
            recommendations: ['Start with Psalms 1, 23, 27, 46, 51, 91, 103','Use the ESV or NASB for accuracy'],
            commonErrors: ['Reading too fast to fill a quota','Writing what you think you should feel instead of what you actually notice'],
            sources: ['Bonhoeffer, D. "Psalms: The Prayer Book of the Bible"','ESV Study Bible'] } }
      ]
    },
    {
      id: 'vitality_catechism',
      title: 'Catechism Review',
      description: 'The Small Catechism is the foundation of Lutheran teaching. Reviewing it builds doctrinal clarity and strengthens daily faith.',
      difficulty: 'Beginner', scoreThreshold: 80, priority: 2, prerequisites: [], reward: 12,
      scriptureText: 'Always be prepared to make a defense to anyone who asks you for a reason for the hope that is in you.', scriptureRef: '1 Peter 3:15',
      tasks: [
        { id: 'vcat_1', text: 'Memorize the Ten Commandments with their meanings from Luther\'s Small Catechism',
          guidance: {
            howTo: ['Read one commandment and its meaning each day','Recite what you have learned from memory each morning','Use flashcards or write them out — active recall beats passive reading','Review all memorized commandments each day before adding the next'],
            recommendations: ['The meaning section is as important as the commandment itself','Say it aloud — vocalization improves retention'],
            commonErrors: ['Trying to memorize all ten at once','Only reading, never reciting'],
            sources: ['Luther\'s Small Catechism (Concordia Publishing House)'] } },
        { id: 'vcat_2', text: 'Memorize the Apostles\' Creed with its three articles and explanations',
          guidance: {
            howTo: ['Learn one article per week with its explanation','Recite the full Creed each morning — it is already embedded in the Divine Service','Write the explanations in your own words to test understanding'],
            recommendations: ['The explanations are Luther\'s richest theological writing — do not skip them','Recite at the dinner table with family if applicable'],
            commonErrors: ['Knowing the words without understanding the content','Rushing through it as a checklist item'],
            sources: ['Luther\'s Small Catechism','Concordia: The Lutheran Confessions'] } }
      ]
    },
    {
      id: 'vitality_scripture_memory',
      title: 'Scripture in the Heart',
      description: 'Beyond the catechism, the Christian life is sustained by God\'s Word hidden in the heart. This pathway builds a personal scripture memory practice anchored to your actual needs and struggles.',
      difficulty: 'Beginner', scoreThreshold: 80, priority: 3, prerequisites: ['vitality_catechism'], reward: 12,
      scriptureText: 'I have stored up your word in my heart, that I might not sin against you.', scriptureRef: 'Psalm 119:11',
      tasks: [
        { id: 'vsm_1', text: 'Memorize 5 passages of Scripture over 8 weeks — one per week, review all daily',
          guidance: {
            howTo: ['Choose 5 passages relevant to your current struggles or growth areas','Suggested starting set: Psalm 23, Romans 8:1, Philippians 4:6-7, Proverbs 3:5-6, Isaiah 41:10','Write each on a card — reference on front, passage on back','Recite the week\'s passage daily until memorized; review all previous cards every morning before adding the next'],
            recommendations: ['Always memorize the reference too — a verse without a location is a floating quote','Say it aloud: vocalization improves retention significantly over reading alone','Choose passages you genuinely need, not impressive-sounding ones — the need drives the memorization'],
            commonErrors: ['Trying to memorize too many passages at once','Not reviewing old passages — they will fade within two weeks without daily review','Choosing passages without personal significance — memorization driven by need sticks; memorization driven by impressiveness fades'],
            sources: ['Psalm 119:11','Navigators Topical Memory System','Sproul, R.C. "Knowing Scripture"'] } },
        { id: 'vsm_2', text: 'Use one memorized passage as active prayer for 30 days — pray it back to God word by word each morning',
          guidance: {
            howTo: ['Choose the passage most relevant to your current need or weakness','Each morning, pray it back slowly: "Lord, you are my shepherd — I claim this promise today..."','Personalize it: name your situation within the prayer','Do not rush — let each phrase settle before moving to the next'],
            recommendations: ['Praying Scripture is one of the oldest and most effective forms of prayer — you are using God\'s own words to address him','The passage you need most will sometimes be the one you resist praying most','After 30 days, choose another passage and repeat'],
            commonErrors: ['Reciting without praying — words without address to God are just speech','Choosing a passage too vague or abstract to pray with personal application','Abandoning the practice before 30 days — the habit forms in the second and third week, not the first'],
            sources: ['Psalm 119:11','Bonhoeffer, D. "Psalms: The Prayer Book of the Bible"','Luther\'s Small Catechism — How to Pray the Lord\'s Prayer'] } }
      ]
    },
    {
      id: 'vitality_fasting',
      title: 'The Discipline of Fasting',
      description: 'Fasting is the discipline the modern church has most forgotten. Done rightly, it is not a diet — it is the body submitting to the spirit and an act of deliberate dependence on God alone.',
      difficulty: 'Intermediate', scoreThreshold: 80, priority: 4, prerequisites: ['vitality_daily_office'], reward: 12,
      scriptureText: 'When you fast, anoint your head and wash your face, that your fasting may not be seen by others but by your Father who is in secret.', scriptureRef: 'Matthew 6:17-18',
      tasks: [
        { id: 'vf_1', text: 'Complete one 24-hour fast — water only — with dedicated prayer during each skipped meal',
          guidance: {
            howTo: ['Choose a day with no significant physical demands','Tell no one unless necessary — Matthew 6:16-18 is direct on this','Drink water throughout the day','When hunger comes, treat it as a prompt to pray rather than a problem to solve','Break the fast with a simple, grateful meal — not a feast'],
            recommendations: ['Your first fast will feel harder than subsequent ones — this is normal','Expect unusual mental clarity in the afternoon hours','Do not announce the fast before or discuss it after — the secrecy is part of the discipline'],
            commonErrors: ['Breaking the fast for comfort rather than genuine physical necessity','Using the fast as a weight-loss technique — it is a spiritual act, not a diet','Not replacing meal times with prayer — fasting without prayer is just skipping meals'],
            sources: ['Matthew 6:16-18','Luke 4:1-2','Whitney, D. "Spiritual Disciplines for the Christian Life"'] } },
        { id: 'vf_2', text: 'Establish a monthly fasting rhythm — one fast per month for 3 consecutive months',
          guidance: {
            howTo: ['Choose a fixed day each month so it requires no repeated decision','Plan your prayer focus for each fast before the day arrives — write it down','Keep a brief journal entry after each fast: what did you pray for? what did you notice? what was hard?','After 3 months, evaluate: extend, adjust, or continue as is'],
            recommendations: ['Monthly fasting is historically normal for Christians — it need not feel extraordinary','The pattern matters more than the length — consistency over time shapes the soul more than occasional intensity','A journal entry after each fast builds the habit into something you can look back on and grow from'],
            commonErrors: ['Making it too long or dramatic before establishing the basic pattern','Abandoning after one hard fast — the second is always easier than the first','Treating it as a spiritual achievement — fasting is an act of humility, not a spiritual credit'],
            sources: ['Matthew 6:16-18','Whitney, D. "Spiritual Disciplines for the Christian Life"','Luther — Large Catechism, on fasting'] } }
      ]
    }
  ],

  // 6: STATUS
  6: [
    {
      id: 'status_integrity_audit',
      title: 'Integrity Audit',
      description: 'Integrity is alignment between who you are in private and who you present in public. This pathway examines that gap honestly.',
      difficulty: 'Intermediate', scoreThreshold: 80, priority: 1, prerequisites: [], reward: 12,
      scriptureText: 'The integrity of the upright guides them, but the crookedness of the treacherous destroys them.', scriptureRef: 'Proverbs 11:3',
      tasks: [
        { id: 'sia_1', text: 'Write answers to these questions honestly: Where do I cut corners? Where is my public self different from my private self?',
          guidance: {
            howTo: ['Find 30 minutes alone with no interruptions','Answer each question in writing — do not answer in your head only','Be specific: name the situations, not just categories'],
            recommendations: ['This is not for anyone else to read — be ruthlessly honest','Include small things: exaggeration, lateness, half-truths'],
            commonErrors: ['Being vague to protect yourself from discomfort','Stopping at surface-level answers'],
            sources: ['Proverbs 11:3','Ortberg, J. "The Me I Want to Be"'] } },
        { id: 'sia_2', text: 'Choose one area of inconsistency and make a concrete plan to close the gap',
          guidance: {
            howTo: ['Pick the most important gap identified','Define the specific behavior change required','Tell one trusted person your commitment','Check in with that person in 30 days'],
            recommendations: ['Start with the area that would have the most impact if changed','Write the commitment down — vague intentions fade'],
            commonErrors: ['Choosing the easiest gap instead of the most important','Making a private commitment with no accountability'],
            sources: ['James 1:22-25'] } }
      ]
    },
    {
      id: 'status_speech_discipline',
      title: 'Speech Discipline',
      description: 'Integrity is most visible in ordinary speech. Gossip, complaint, exaggeration, and broken promises erode character slowly and silently. This pathway brings the tongue under authority.',
      difficulty: 'Intermediate', scoreThreshold: 80, priority: 2, prerequisites: ['status_integrity_audit'], reward: 12,
      scriptureText: 'Let no corrupting talk come out of your mouths, but only such as is good for building up, as fits the occasion, that it may give grace to those who hear.', scriptureRef: 'Ephesians 4:29',
      tasks: [
        { id: 'ssd_1', text: 'Monitor your speech for 7 days — write down each instance of gossip, complaint, exaggeration, or harsh words',
          guidance: {
            howTo: ['Keep a small notepad or note on your phone','After each conversation, ask: did I say anything I would not want repeated?','Categories to watch: gossip (talking about someone not present), complaint (without purpose), exaggeration (making yourself or events seem more than they are), harsh words (cutting, contemptuous, dismissive)','At the end of each day, write what you noticed'],
            recommendations: ['The goal is awareness, not shame — diagnosis before treatment','You will notice more than you expect — that is the point','Share this exercise with no one while doing it — keep it between you and God'],
            commonErrors: ['Justifying each instance in the moment — write it down and evaluate later','Stopping after day 2 because it is uncomfortable','Only tracking dramatic failures, not the small daily drift'],
            sources: ['James 3:1-12','Ephesians 4:29-32','Powlison, D. "Good and Angry"'] } },
        { id: 'ssd_2', text: 'Make 5 specific, small promises to 5 different people this week and keep every one of them',
          guidance: {
            howTo: ['Choose small, concrete commitments: "I will call you Thursday," "I will send you that link today," "I will be there at 6"','Write each promise down when you make it','Track completion — did you keep it, or did you let it slide?','If you cannot keep one, contact the person before the deadline and say so'],
            recommendations: ['Small promises kept build the reputation that large promises rely on','The discipline of keeping small commitments trains the will for larger ones','Do not make a promise you are not confident you can keep'],
            commonErrors: ['Making vague commitments that cannot be evaluated ("I\'ll try")','Forgetting you made a promise — write them down','Deciding a promise was not important enough to keep'],
            sources: ['Matthew 5:37 — Let your yes be yes','Ecclesiastes 5:2','Sande, K. "The Peacemaker"'] } }
      ]
    },
    {
      id: 'status_accountability',
      title: 'Accountability Relationship',
      description: 'No man sees his own blind spots clearly. An accountability relationship gives another person permission to speak truth to you about your character — and obligates you to listen. This is one of the rarest and most valuable relationships a man can have.',
      difficulty: 'Intermediate', scoreThreshold: 80, priority: 3, prerequisites: ['status_integrity_audit'], reward: 12,
      scriptureText: 'Iron sharpens iron, and one man sharpens another.', scriptureRef: 'Proverbs 27:17',
      tasks: [
        { id: 'sac_1', text: 'Identify one person with the character and courage to speak truth to you and ask them to meet monthly',
          guidance: {
            howTo: ['The person must be: more mature than you in at least one key area, someone whose life you respect, willing to say hard things','Ask directly: "Would you be willing to meet with me monthly and hold me accountable to who I say I want to be?"','At the first meeting: share 2-3 areas you are working on and give them explicit permission to ask hard questions about them'],
            recommendations: ['Choose someone you would slightly fear disappointing — that tension is the right kind of accountability','Choose a man if you are a man — cross-gender accountability rarely works long-term','Do not choose someone who will only encourage you — you need someone who will correct you'],
            commonErrors: ['Choosing a friend who will only affirm you','Meeting but only discussing surface things','Not giving real access — accountability without vulnerability is just a catch-up call'],
            sources: ['Proverbs 27:17','Ecclesiastes 4:9-10','Bonhoeffer, D. "Life Together"'] } },
        { id: 'sac_2', text: 'Meet with your accountability partner for 3 consecutive months and report honestly on your commitments each time',
          guidance: {
            howTo: ['Calendar the meetings so they do not get cancelled','Come prepared: what did I commit to last month? Did I do it? If not, why not?','Let them ask hard questions — do not get defensive','After each meeting, write one thing you will do differently before the next meeting'],
            recommendations: ['The discomfort of reporting failure to someone you respect is one of the most powerful motivators for change','Monthly is sustainable; less than monthly loses continuity','The meetings you most want to cancel are the most important ones to keep'],
            commonErrors: ['Cancelling when you have nothing good to report','Being vague about commitments so failure cannot be identified','Treating it as a social call rather than a structured accountability meeting'],
            sources: ['Proverbs 27:17','Hebrews 10:24-25','James 5:16'] } }
      ]
    },
    {
      id: 'status_reputation_audit',
      title: 'Reputation Audit',
      description: 'You have a reputation whether you built it intentionally or not. This pathway asks people who know you in different contexts to tell you who you actually are — then compares their answers to who you want to be.',
      difficulty: 'Intermediate', scoreThreshold: 80, priority: 4, prerequisites: ['status_integrity_audit'], reward: 10,
      scriptureText: 'A good name is to be chosen rather than great riches, and favor is better than silver or gold.', scriptureRef: 'Proverbs 22:1',
      tasks: [
        { id: 'sra_1', text: 'Ask 3 people who know you in different contexts the same 3 questions and write their exact answers',
          guidance: {
            howTo: ['Choose people from different areas: one from work, one from home, one from church or community','Ask each separately and privately: (1) "What one word would you use to describe me?" (2) "What do you see as my greatest strength?" (3) "What is one thing I could improve?"','Write their exact words — do not edit or soften','Tell them you genuinely want honest answers, not flattering ones'],
            recommendations: ['The person most reluctant to answer question 3 often has the most valuable answer — press gently for it','Three people from different contexts reveals which traits are consistent and which are context-specific','Do not react to their answers in the moment — just thank them and write it down'],
            commonErrors: ['Asking only people who will say what you want to hear','Becoming defensive when someone answers question 3 honestly','Editing their answers in your notes to make them less uncomfortable'],
            sources: ['Proverbs 22:1','Proverbs 27:6','Ortberg, J. "The Me I Want to Be"'] } },
        { id: 'sra_2', text: 'Compare the pattern in their answers to who you want to be — identify the largest gap and make one concrete change',
          guidance: {
            howTo: ['Look for patterns: what words appear across multiple answers? where do people agree?','Write: "The person they describe is ___. The person I want to be is ___. The most important gap is ___.","Choose one gap that is both important and actionable','Define one specific behavior change and begin it this week'],
            recommendations: ['The gap between perceived reputation and desired character is precisely what the Holy Spirit works through — do not minimize it','Choose the most important gap, not the easiest one','Return to this audit in 12 months — reputation changes slowly but measurably'],
            commonErrors: ['Dismissing feedback as inaccurate when multiple people say the same thing','Choosing a gap too vague to act on: "be more patient" needs a specific trigger and response','Completing the audit but making no change'],
            sources: ['Proverbs 22:1','Proverbs 11:3','Ortberg, J. "The Me I Want to Be"'] } }
      ]
    }
  ],

  // 7: SPACE
  7: [
    {
      id: 'space_declutter',
      title: 'Space Declutter',
      description: 'A disordered environment produces a disordered mind. This pathway clears physical space so that it can serve its purpose.',
      difficulty: 'Beginner', scoreThreshold: 80, priority: 1, prerequisites: [], reward: 10,
      scriptureText: 'Let all things be done decently and in order.', scriptureRef: '1 Corinthians 14:40',
      tasks: [
        { id: 'sdc_1', text: 'Declutter one room completely — remove everything that does not belong or serve a purpose',
          guidance: {
            howTo: ['Choose the room you spend the most time in','Remove everything from surfaces first','Sort into: keep, donate, trash','Put back only what belongs in this room'],
            recommendations: ['Do not organize clutter — eliminate it first','Donate box goes in your car immediately so it actually leaves'],
            commonErrors: ['Keeping things "just in case"','Organizing into bins without first removing excess'],
            sources: ['Kondo, M. "The Life-Changing Magic of Tidying Up"','1 Corinthians 14:40'] } },
        { id: 'sdc_2', text: 'Establish and follow a 10-minute daily tidy routine for 21 days',
          guidance: {
            howTo: ['Choose a consistent time — before bed is most effective','Reset every surface to its default state','Put away anything out of place','Do not clean — just reset'],
            recommendations: ['Set a timer — 10 minutes is enough if done daily','Do it as a family if applicable'],
            commonErrors: ['Skipping because the space is already "good enough"','Letting items accumulate because a full clean is planned later'],
            sources: ['Clear, J. "Atomic Habits" — Environment design chapter'] } }
      ]
    },
    {
      id: 'space_home_systems',
      title: 'Home Systems',
      description: 'Decluttering clears the space — systems keep it clear. Without a rhythm of maintenance, order decays back to chaos within weeks. This pathway builds the habits that make order permanent.',
      difficulty: 'Beginner', scoreThreshold: 80, priority: 2, prerequisites: ['space_declutter'], reward: 10,
      scriptureText: 'By wisdom a house is built, and by understanding it is established; by knowledge the rooms are filled with all precious and pleasant riches.', scriptureRef: 'Proverbs 24:3-4',
      tasks: [
        { id: 'shs_1', text: 'Create a simple weekly cleaning schedule — assign specific tasks to specific days — and follow it for 4 weeks',
          guidance: {
            howTo: ['List every cleaning task your home requires weekly','Assign each task to a specific day — do not leave them floating','Write the schedule and post it somewhere visible','Follow it for 4 weeks without skipping — even if a task takes only 5 minutes'],
            recommendations: ['Spread tasks across the week so no single day is overwhelming','Monday/Thursday rhythm works well: light reset at start of week, heavier clean mid-week','Tasks assigned to specific days get done — tasks left to "whenever" do not'],
            commonErrors: ['Making the schedule too ambitious and abandoning it after 10 days','Treating cleaning as one large event instead of small daily habits','Not posting the schedule — out of sight means out of mind'],
            sources: ['Kondo, M. "The Life-Changing Magic of Tidying Up"','1 Corinthians 14:40'] } },
        { id: 'shs_2', text: 'Identify the one area of your home that always re-clutters and create a permanent system for it',
          guidance: {
            howTo: ['Look for the surface, corner, or room that collects clutter within days of being cleaned','Ask: why does this area clutter? (No designated home for items, too many items, wrong location)','Solve the root cause: assign homes for homeless items, reduce quantity, reposition storage','Test the system for 2 weeks — does it hold without effort?'],
            recommendations: ['Common chaos zones: kitchen counter, bedroom floor, entry table, desk','The fix is almost always either "fewer items" or "a designated home for each item"','A system that requires daily effort will fail — a good system is nearly automatic'],
            commonErrors: ['Organizing the clutter instead of eliminating it','Creating a system too complicated to maintain','Solving the symptom (tidying) instead of the cause (no assigned home)'],
            sources: ['Clear, J. "Atomic Habits" — Environment design','Proverbs 24:3-4'] } }
      ]
    },
    {
      id: 'space_hospitality',
      title: 'Hospitality',
      description: 'Your home is not just yours. The biblical vision of home is a place of welcome for the neighbor, the stranger, and the lonely. This pathway opens your space to others as a deliberate act of love.',
      difficulty: 'Beginner', scoreThreshold: 80, priority: 3, prerequisites: ['space_declutter'], reward: 10,
      scriptureText: 'Show hospitality to one another without grumbling.', scriptureRef: '1 Peter 4:9',
      tasks: [
        { id: 'sho_1', text: 'Invite one person or family into your home for a meal within the next 2 weeks — someone outside your immediate household',
          guidance: {
            howTo: ['Choose someone who needs it: a neighbor you barely know, a single person, a family in difficulty, someone new to church','Invite with a specific day and time — not "sometime soon"','Prepare a simple meal — hospitality is about presence, not performance','Clean and prepare the space so guests feel welcomed, not like an afterthought'],
            recommendations: ['Hospitality has declined because people wait until the home is perfect — it never will be','A bowl of soup and a clean table is enough — the person came for you, not the food','The guest cares about your full attention far more than your cooking skill'],
            commonErrors: ['Waiting until the home is in better condition','Over-preparing to the point of stress and resentment','Treating it as a performance rather than a gift'],
            sources: ['1 Peter 4:9','Romans 12:13','Pohl, C. "Making Room: Recovering Hospitality as a Christian Tradition"'] } },
        { id: 'sho_2', text: 'Make hospitality a regular practice — invite someone into your home at least twice per month for 3 consecutive months',
          guidance: {
            howTo: ['Put a standing question on your weekly plan: "Who are we inviting this week?"','Vary the guests over time — deepen some relationships, begin new ones','Keep it simple enough to be sustainable — not every gathering needs to be a dinner party','After 3 months, note: who have you hosted? what relationships have deepened?'],
            recommendations: ['Regular hospitality builds a reputation in your community — people know which homes are open','Simplify the food over time so the relationship can be the focus, not the cooking','Involve your spouse or housemate — hospitality practiced together builds the household'],
            commonErrors: ['Making each gathering elaborate so it becomes unsustainable','Hosting only people you already know well and are comfortable with','Stopping after month 1 because it is more work than expected'],
            sources: ['1 Peter 4:9','Luke 14:12-14','Pohl, C. "Making Room"'] } }
      ]
    },
    {
      id: 'space_sanctuary',
      title: 'Create a Sanctuary',
      description: 'Every person needs one place of quiet, order, and beauty set apart from the noise. This pathway designates and protects that space in your home — a place for prayer, reading, and restoration.',
      difficulty: 'Beginner', scoreThreshold: 80, priority: 4, prerequisites: ['space_declutter'], reward: 10,
      scriptureText: 'But when you pray, go into your room and shut the door and pray to your Father who is in secret.', scriptureRef: 'Matthew 6:6',
      tasks: [
        { id: 'ssa_1', text: 'Designate one space — a chair, a corner, a room — as your dedicated place for prayer and reflection, and use it daily for 14 days',
          guidance: {
            howTo: ['Choose the quietest space available — even a chair in a corner qualifies','Remove everything from that space that does not serve prayer, reading, or reflection','Add what helps: a Bible, a journal, a candle, a small cross — nothing with a screen','Use it every day for 14 days at the same time'],
            recommendations: ['The physical association of one space with prayer builds the habit faster than willpower alone','A modest space — a chair with a small table — is fully sufficient; the discipline matters more than the aesthetics','Post your prayer list or a psalm in the space to anchor your time there'],
            commonErrors: ['Waiting until you have a better space — use what you have today','Adding a phone or screen to the space even for a Bible app — get a physical Bible','Using the space for work or other activities and losing the sacred association'],
            sources: ['Matthew 6:6','Bonhoeffer, D. "Life Together" — on solitude','Foster, R. "Celebration of Discipline"'] } },
        { id: 'ssa_2', text: 'Protect the sanctuary from your phone for 30 days — no phone in that space, ever',
          guidance: {
            howTo: ['Charge your phone in another room and leave it there when you enter your sanctuary','Keep a physical Bible and paper journal in the space instead of using apps','When tempted to bring the phone "just for the Bible app" — use the physical Bible','Track how often you used the space and note what was different when you did'],
            recommendations: ['The phone\'s presence — even silenced — reduces the depth of prayer and reading by fragmenting attention','This is the simplest and most powerful single change many people can make to their prayer life','If the sanctuary has no phone, the first temptation of the morning has no foothold'],
            commonErrors: ['Using a Bible app instead of a physical Bible in the sanctuary — the difference is real','Allowing "quick checks" that become 20-minute scrolling sessions','Designating the space but not actually using it — a sanctuary unused is just a chair'],
            sources: ['Matthew 6:6','Newport, C. "Digital Minimalism"','Foster, R. "Celebration of Discipline"'] } }
      ]
    }
  ],

  // 8: TIME
  8: [
    {
      id: 'time_daily_rhythm',
      title: 'Daily Rhythm',
      description: 'A weekly plan means nothing without a daily structure to execute it. Owning your mornings and evenings is the first act of intentional time stewardship.',
      difficulty: 'Beginner', scoreThreshold: 80, priority: 1, prerequisites: [], reward: 12,
      scriptureText: 'This is the day that the LORD has made; let us rejoice and be glad in it.', scriptureRef: 'Psalm 118:24',
      tasks: [
        { id: 'tdr_1', text: 'Design and follow a morning routine of at least 20 minutes for 14 days — include prayer, no phone for first 30 minutes',
          guidance: {
            howTo: ['Write out your morning routine before the first day','Include at minimum: prayer, a brief review of the day\'s priorities','No phone or social media until the routine is complete','Do it at the same time each day — consistency builds the habit'],
            recommendations: ['20 minutes is enough to start — resist making it elaborate','Post the routine where you will see it when you wake','A bad morning routine beats no morning routine every time'],
            commonErrors: ['Making it too long and abandoning it after 3 days','Checking your phone "just for a second" first','Skipping weekends because the schedule is different'],
            sources: ['Huberman Lab — Morning routine protocols','Luther\'s Small Catechism — Morning Prayer','Hardy, D. "The Compound Effect"'] } },
        { id: 'tdr_2', text: 'Create a 10-minute evening shutdown routine for 14 days — write tomorrow\'s top 3 tasks, review your calendar, give thanks',
          guidance: {
            howTo: ['Do this at least 30 minutes before bed','Write tomorrow\'s 3 most important tasks — not a full list, just the top 3','Check your calendar for anything requiring preparation','End with a brief prayer of thanksgiving — close the day intentionally'],
            recommendations: ['The shutdown prevents the "did I forget something?" anxiety that disrupts sleep','Knowing tomorrow\'s top 3 before bed means you wake with direction','Keep a notepad on your desk for the shutdown — not your phone'],
            commonErrors: ['Doing it in bed on your phone — defeats both habits','Writing a full to-do list instead of the top 3','Skipping it because you\'re tired — those are the most important nights'],
            sources: ['Newport, C. "Deep Work" — Shutdown rituals','Covey, S. "First Things First"'] } }
      ]
    },
    {
      id: 'time_weekly_plan',
      title: 'Weekly Planning',
      description: 'Without a plan, the urgent always displaces the important. This pathway builds the habit of intentional weekly scheduling.',
      difficulty: 'Beginner', scoreThreshold: 80, priority: 1, prerequisites: [], reward: 12,
      scriptureText: 'Look carefully then how you walk, not as unwise but as wise, making the best use of the time.', scriptureRef: 'Ephesians 5:15-16',
      tasks: [
        { id: 'twp_1', text: 'Conduct a weekly planning session every Sunday for 4 weeks',
          guidance: {
            howTo: ['Set a recurring 30-minute block on Sunday evening','Review the coming week: obligations, appointments, deadlines','Identify the 3 most important things to accomplish','Block time for them in your calendar before the week fills up'],
            recommendations: ['Review the previous week briefly first — what did and did not happen?','Include personal and spiritual priorities, not just work'],
            commonErrors: ['Only planning work and forgetting family, faith, health','Making the plan but not looking at it during the week'],
            sources: ['Covey, S. "The 7 Habits of Highly Effective People" — Habit 3','Ephesians 5:15-16'] } },
        { id: 'twp_2', text: 'Identify your top 3 priorities and protect time for them for 4 consecutive weeks',
          guidance: {
            howTo: ['Write your top 3 priorities for the season of life you are in','Block time for each in your weekly plan before reactive tasks fill the calendar','Treat these blocks like appointments — reschedule rather than delete'],
            recommendations: ['Priorities that are not scheduled do not happen','Review whether your calendar reflects your stated values'],
            commonErrors: ['Filling the calendar reactively and then "fitting in" priorities','Priorities that are too vague to schedule'],
            sources: ['Covey, S. "First Things First"'] } }
      ]
    },
    {
      id: 'time_priority_clarity',
      title: 'Priority Clarity',
      description: 'Busyness is not the same as fruitfulness. Before you can steward time well, you need a clear hierarchy of what actually matters — written down, ranked, and compared against how you actually live.',
      difficulty: 'Beginner', scoreThreshold: 80, priority: 3, prerequisites: ['time_weekly_plan'], reward: 10,
      scriptureText: 'But seek first the kingdom of God and his righteousness, and all these things will be added to you.', scriptureRef: 'Matthew 6:33',
      tasks: [
        { id: 'tpc_1', text: 'Write your top 5 life priorities in ranked order and post them where you will see them daily',
          guidance: {
            howTo: ['Find 20 minutes alone with no interruptions','Write the 5 most important areas of your life — rank them 1 to 5','Common categories: faith, marriage, family, vocation, health','Rank ruthlessly — you cannot have five number ones','Post the list somewhere visible: desk, mirror, wallet card'],
            recommendations: ['Faith should be first if you are a Christian — this is not legalism, it is order','Your ranking will reveal what you actually believe about what matters','Revisit this list once per season — priorities shift with life stage'],
            commonErrors: ['Making the list too long — more than 5 loses its force','Writing what sounds right instead of what you actually live by','Keeping the list private where it has no daily influence'],
            sources: ['Matthew 6:33','Covey, S. "First Things First"','Hybels, B. "Simplify"'] } },
        { id: 'tpc_2', text: 'Audit last week\'s time against your priority list and identify where the gap is largest',
          guidance: {
            howTo: ['Look at your calendar and actual activities from the past 7 days','Estimate hours spent in each priority area','Compare: does your time match your ranked list?','Write one sentence naming the largest gap between stated priority and actual time'],
            recommendations: ['Be honest — the audit is diagnostic, not condemning','One clear insight is enough: "I said faith is first but I spent 0 minutes in prayer"','Use this insight in your next weekly planning session'],
            commonErrors: ['Rounding up time in priority areas to feel better','Identifying the gap but not acting on it in the weekly plan','Trying to fix everything at once instead of the biggest gap first'],
            sources: ['Ephesians 5:15-16','Covey, S. "The 7 Habits of Highly Effective People"'] } }
      ]
    }
  ],

  // 9: WORLD
  9: [
    {
      id: 'world_neighbor_love',
      title: 'Neighbor Love',
      description: 'Love of neighbor is not a feeling — it is a habit of attention and action toward the people God has placed around you.',
      difficulty: 'Beginner', scoreThreshold: 80, priority: 1, prerequisites: [], reward: 12,
      scriptureText: 'You shall love your neighbor as yourself.', scriptureRef: 'Matthew 22:39',
      tasks: [
        { id: 'wnl_1', text: 'Perform one intentional act of service for a neighbor, coworker, or stranger each week for 4 weeks',
          guidance: {
            howTo: ['Define "neighbor" broadly — anyone near you geographically or relationally','Plan the act in advance — do not wait for inspiration','Act without expectation of recognition or reciprocation','Write down what you did and how it went'],
            recommendations: ['Start with people you already know but rarely serve','Practical help is often more valuable than words'],
            commonErrors: ['Waiting for a "big" opportunity instead of acting in small ones','Doing it for the feeling of virtue rather than the benefit of the other'],
            sources: ['Luke 10:25-37 — The Good Samaritan'] } },
        { id: 'wnl_2', text: 'Pray for 5 specific non-Christians by name for 30 days',
          guidance: {
            howTo: ['Write down 5 names of people you know who do not profess faith','Pray for each by name every day — ask God to bring them to faith','Look for natural opportunities to speak about what you believe'],
            recommendations: ['Pray with specificity: for their circumstances, not just "salvation" abstractly','This builds evangelism as a regular posture, not an event'],
            commonErrors: ['Vague prayers with no named individuals','Stopping before 30 days because nothing visible has happened'],
            sources: ['Romans 10:1','1 Timothy 2:1-4'] } }
      ]
    },
    {
      id: 'world_share_your_faith',
      title: 'Share Your Faith',
      description: 'Neighbor love includes the soul, not just the body. This pathway moves from praying for non-Christians to actually speaking with them about what you believe.',
      difficulty: 'Intermediate', scoreThreshold: 80, priority: 2, prerequisites: ['world_neighbor_love'], reward: 12,
      scriptureText: 'How are they to believe in him of whom they have never heard? And how are they to hear without someone preaching?', scriptureRef: 'Romans 10:14',
      tasks: [
        { id: 'wsf_1', text: 'Learn to explain the Gospel clearly in 2-3 sentences from memory — Law, Grace, Faith, Life',
          guidance: {
            howTo: ['Learn the four-part structure: (1) We are all sinners who deserve God\'s judgment. (2) Christ died in our place and rose again. (3) Faith in Christ alone receives forgiveness. (4) This produces a new life.','Write your own version in plain language — no jargon','Say it aloud until it is natural, not recited','Practice with a trusted Christian friend first'],
            recommendations: ['Plain language is more powerful than theological vocabulary with unbelievers','"Christ died for sinners and I am one of them" is more compelling than a five-point presentation','Memorize it so you do not stumble — stumbling signals you do not believe it'],
            commonErrors: ['Making it too long — 2-3 sentences means 2-3 sentences','Using church words without defining them: "saved," "grace," "born again"','Thinking you need a perfect presentation before you can speak'],
            sources: ['1 Corinthians 15:1-4 — the Gospel in four verses','Luther\'s Small Catechism — the Creed\'s second article','Fay, W. "Share Jesus Without Fear"'] } },
        { id: 'wsf_2', text: 'Have one intentional spiritual conversation with a non-Christian — ask about their beliefs and share yours',
          guidance: {
            howTo: ['Choose someone from your prayer list (from Neighbor Love pathway)','Find a natural opening: a life event, a question they raise, something you are reading','Ask first: "What do you believe about God / death / meaning?" — listen without debating','Share your own answer honestly: what you believe and why'],
            recommendations: ['Ask before you tell — curiosity opens doors that proclamation closes','You are planting a seed, not closing a sale — one conversation is a success','Pray for the person before and after'],
            commonErrors: ['Waiting for the perfect moment — it rarely comes; create it','Arguing instead of witnessing — your job is not to win the argument','Giving up if the conversation goes awkwardly — awkward conversations still plant seeds'],
            sources: ['1 Peter 3:15','Colossians 4:5-6','Fay, W. "Share Jesus Without Fear"'] } }
      ]
    },
    {
      id: 'world_community_presence',
      title: 'Community Presence',
      description: 'You cannot love people you do not know. This pathway builds the habit of consistent, visible presence in your local community so that you become a known and trusted neighbor — the first step in being a faithful witness.',
      difficulty: 'Beginner', scoreThreshold: 80, priority: 3, prerequisites: ['world_neighbor_love'], reward: 10,
      scriptureText: 'Seek the welfare of the city where I have sent you, and pray to the LORD on its behalf, for in its welfare you will find your welfare.', scriptureRef: 'Jeremiah 29:7',
      tasks: [
        { id: 'wcp_1', text: 'Learn the names of your 5 nearest neighbors and have one substantive conversation with each within 30 days',
          guidance: {
            howTo: ['Walk your street with the intent to meet neighbors — no agenda, just presence','Learn: name, how long they have lived there, one detail about their life','Write the names and details down immediately so you remember them','Follow up within 2 weeks with a second encounter — use their name'],
            recommendations: ['Using someone\'s name signals that you see them as a person — it builds trust faster than anything else','Do not start with an agenda — just become known first','Your neighbors are your first mission field and your first safety network'],
            commonErrors: ['Only talking to neighbors when you need something','Forgetting names because you did not write them down','Waiting for neighbors to approach you first'],
            sources: ['Jeremiah 29:7','Luke 10:27','Putnam, R. "Bowling Alone"'] } },
        { id: 'wcp_2', text: 'Attend one recurring community gathering consistently for 2 months — a neighborhood event, volunteer group, farmers market, or civic meeting',
          guidance: {
            howTo: ['Choose something that puts you among your actual neighbors — not online','Attend consistently for 2 months — not just once','Introduce yourself by name until you are recognized','Look for ways to contribute, not just attend'],
            recommendations: ['Recurring presence builds trust that single events cannot — people need to see you multiple times before they open up','Choose something you can sustain, not the most impressive option','Bring something: a dish, a skill, a helping hand — participants are more trusted than spectators'],
            commonErrors: ['Attending once and counting it complete','Going but never introducing yourself or engaging','Choosing a group so large you remain anonymous'],
            sources: ['Jeremiah 29:7','Hebrews 10:25','Putnam, R. "Bowling Alone"'] } }
      ]
    },
    {
      id: 'world_service_partnership',
      title: 'Service Partnership',
      description: 'Individual acts of service are good. Joining an organization already doing sustained, effective work multiplies your impact and roots you in a community of people bound by the same purpose.',
      difficulty: 'Intermediate', scoreThreshold: 80, priority: 4, prerequisites: ['world_neighbor_love'], reward: 12,
      scriptureText: 'For we are God\'s fellow workers.', scriptureRef: '1 Corinthians 3:9',
      tasks: [
        { id: 'wsp_1', text: 'Research 2-3 local organizations doing work you care about and contact each one to learn what regular commitment looks like',
          guidance: {
            howTo: ['Identify a need you are drawn to: food insecurity, crisis pregnancy, prison ministry, youth, homeless services','Find 2-3 local organizations addressing that need','Contact each: "How can I volunteer? What does regular involvement look like?"','Visit in person if possible — seeing the work changes your understanding of it'],
            recommendations: ['Ask about commitment level before signing up — some need one-time help, others need monthly regulars','Organizations that place you in direct contact with people served are more impactful than administrative roles','Ask who else volunteers regularly — the character of the volunteer base reflects the organization'],
            commonErrors: ['Choosing based on convenience alone rather than mission fit','Signing up and not showing up','Giving money as a substitute for giving time — money is easier and less transformative'],
            sources: ['1 Corinthians 3:9','Matthew 25:35-40','Corbett, S. "When Helping Hurts"'] } },
        { id: 'wsp_2', text: 'Commit to one organization and serve consistently for 3 months — same day, same role, every time',
          guidance: {
            howTo: ['Choose the one organization that best fits your gifts, schedule, and the need','Make a specific commitment: which day, how often, what role','Show up every scheduled time — reliability is the rarest thing volunteers give','After 3 months: evaluate whether to continue, deepen, or redirect your service'],
            recommendations: ['Consistent presence over 3 months transforms you from a volunteer to a member of the community — people depend on you','The evaluation at 3 months matters: some service fits grow with time, others do not — assess honestly','Do not quit before 3 months — difficulty at month 2 is normal and the most important time to stay'],
            commonErrors: ['Serving sporadically — unreliability damages the organization and the people served','Starting with too large a commitment and burning out — begin with what you can sustain','Quitting before 3 months when it gets harder than expected'],
            sources: ['1 Corinthians 3:9','Galatians 6:9','Corbett, S. "When Helping Hurts"'] } }
      ]
    }
  ],

  // 10: CREATIVE
  10: [
    {
      id: 'creative_output_habit',
      title: 'Creative Output Habit',
      description: 'Creativity is stewardship of the image of God in you. This pathway builds the discipline of regular creative output.',
      difficulty: 'Beginner', scoreThreshold: 80, priority: 1, prerequisites: [], reward: 10,
      scriptureText: 'In the beginning, God created...', scriptureRef: 'Genesis 1:1',
      tasks: [
        { id: 'coh_1', text: 'Produce one creative output per week for 4 weeks — writing, drawing, building, composing, or any medium',
          guidance: {
            howTo: ['Define your medium before the week begins','Block 60-90 minutes for the creative session','Start with a constraint — a specific prompt, format, or subject','Finish something — even if imperfect'],
            recommendations: ['Share the work with at least one person each week','Constraints improve creativity — do not wait for open inspiration'],
            commonErrors: ['Waiting until you feel creative — that feeling comes during work, not before','Abandoning the piece because it does not match your vision'],
            sources: ['Pressfield, S. "The War of Art"','Genesis 1'] } },
        { id: 'coh_2', text: 'Study the work of one master in your chosen medium and write what you learned',
          guidance: {
            howTo: ['Choose one creator — a writer, artist, musician, craftsman','Spend 30 minutes studying one specific work closely','Write: what makes this work effective? What technique can I apply?'],
            recommendations: ['Go deep on one work rather than skimming many','Imitation is not plagiarism — copying to learn is a classical method'],
            commonErrors: ['Passive consumption instead of active analysis','Choosing someone too similar to your current level'],
            sources: ['Kleon, A. "Steal Like an Artist"'] } }
      ]
    },
    {
      id: 'creative_committed_medium',
      title: 'Committed Medium',
      description: 'Dabbling produces nothing. Creative mastery requires depth, and depth requires commitment to one medium long enough to move past the beginner\'s frustration. This pathway makes that commitment.',
      difficulty: 'Intermediate', scoreThreshold: 80, priority: 2, prerequisites: ['creative_output_habit'], reward: 12,
      scriptureText: 'Whatever you do, work heartily, as for the Lord and not for men.', scriptureRef: 'Colossians 3:23',
      tasks: [
        { id: 'ccm_1', text: 'Choose one creative medium and commit to it for 60 days — no switching',
          guidance: {
            howTo: ['Pick the medium you are most drawn to: writing, visual art, music, woodworking, photography, etc.','Write the commitment down with the medium and start date','Work in this medium at least 3 times per week for 60 days','When you are tempted to switch, note the temptation and continue anyway'],
            recommendations: ['The urge to switch usually hits around day 20-30 when initial excitement fades and real difficulty begins — that is exactly when to stay','Depth in one medium teaches you more than breadth across many','Choose the medium, not the one that seems most impressive'],
            commonErrors: ['Switching when it gets hard instead of recognizing the hard part as progress','Choosing a medium to impress others rather than one that genuinely draws you','Taking on too many creative projects simultaneously'],
            sources: ['Ericsson, A. "Peak" (2016) — deliberate practice','Pressfield, S. "The War of Art" — resistance','Kleon, A. "Steal Like an Artist"'] } },
        { id: 'ccm_2', text: 'Set one specific creative goal for the 60 days and pursue it — finish something',
          guidance: {
            howTo: ['Define a concrete output: "finish a short story," "produce 8 paintings," "record 3 songs," "build a bookshelf"','Write it down with a deadline within the 60 days','Work backward: what do you need to do each week to finish?','Share the finished work with at least one person'],
            recommendations: ['A finished imperfect thing is worth more than an unfinished perfect one','The goal is to complete a creative arc — beginning, middle, end','Showing the work to someone creates accountability and closes the loop'],
            commonErrors: ['Setting a goal with no deadline — it will never be finished','Abandoning near the end because it does not match your vision','Keeping the work private forever — sharing is part of the creative act'],
            sources: ['Pressfield, S. "The War of Art"','Colossians 3:23'] } }
      ]
    },
    {
      id: 'creative_create_for_service',
      title: 'Create for Service',
      description: 'Creative gifts are not just for self-expression — they are for the neighbor. This pathway channels your creative work outward: making something for your church, community, or a specific person who needs it.',
      difficulty: 'Intermediate', scoreThreshold: 80, priority: 3, prerequisites: ['creative_output_habit'], reward: 10,
      scriptureText: 'As each has received a gift, use it to serve one another, as good stewards of God\'s varied grace.', scriptureRef: '1 Peter 4:10',
      tasks: [
        { id: 'ccs_1', text: 'Identify one creative need in your church, community, or a specific person\'s life and commit to meeting it',
          guidance: {
            howTo: ['Look for needs: a neighbor who needs a handmade gift, a church needing design or music or writing, a community event needing photography or visual work','Ask directly: "Is there anything you need that I could make or create?"','Define the scope: what exactly will you make, for whom, and by when?','Do not wait to be formally asked — notice the need and offer'],
            recommendations: ['Creating for a specific person focuses creative energy in a way that open-ended projects do not','The constraint of a real need often produces better work than unlimited creative freedom','Choose a project you can actually finish — a small completed piece serves better than a large abandoned one'],
            commonErrors: ['Waiting for a formal commission or official request before offering','Choosing a project too large or complex to deliver on time','Making something for yourself and calling it service'],
            sources: ['1 Peter 4:10','Exodus 35:30-35 — Bezalel given skill for the Tabernacle','Ephesians 2:10'] } },
        { id: 'ccs_2', text: 'Complete the project, deliver it in person, and ask whether it was useful',
          guidance: {
            howTo: ['Hold to your deadline — the recipient is depending on you','Deliver in person if possible — the relationship matters as much as the product','Ask: "Was this useful? Is there anything you would change?"','If the need is ongoing, offer to make it a regular contribution'],
            recommendations: ['Delivering in person and asking for feedback closes the creative loop and deepens the relationship','Serving with a creative skill builds a bridge that words alone cannot','An honest "this is what I could make" is better than an impressive promise you cannot keep'],
            commonErrors: ['Abandoning near the deadline because the work is not perfect enough','Delivering without asking if it was actually helpful','Never following up — the service ends at delivery, not at the conversation after'],
            sources: ['1 Peter 4:10','1 Corinthians 12:7','Exodus 35:30-35'] } }
      ]
    },
    {
      id: 'creative_teach_your_craft',
      title: 'Teach Your Craft',
      description: 'To teach is to learn twice. Explaining what you know to someone else reveals what you truly understand versus what you only think you understand — and it multiplies your creative gift beyond yourself.',
      difficulty: 'Intermediate', scoreThreshold: 80, priority: 4, prerequisites: ['creative_committed_medium'], reward: 10,
      scriptureText: 'What you have heard from me entrust to faithful men, who will be able to teach others also.', scriptureRef: '2 Timothy 2:2',
      tasks: [
        { id: 'ctc_1', text: 'Identify one person who wants to learn your craft and offer to teach them over 4 sessions',
          guidance: {
            howTo: ['Think of who has expressed interest: a younger person, a spouse, a friend, a child','Offer a bounded commitment: "I will teach you what I know over 4 sessions"','Plan the first session before agreeing — what will you cover? what will they produce?','Choose someone genuinely interested — enthusiasm in the student multiplies the teacher\'s investment'],
            recommendations: ['You do not need to be an expert to teach — you only need to know more than the person you are teaching','Planning what to teach reveals gaps in your own understanding faster than any other exercise','Set a regular time for all 4 sessions before you begin so they actually happen'],
            commonErrors: ['Waiting until you feel qualified enough — you never will','Choosing someone who is not actually interested and losing momentum after session 1','Teaching without a plan and losing the student\'s attention'],
            sources: ['2 Timothy 2:2','Proverbs 22:29','Kleon, A. "Show Your Work"'] } },
        { id: 'ctc_2', text: 'Teach all 4 sessions and write what the student\'s questions revealed about your own craft',
          guidance: {
            howTo: ['Prepare briefly before each session — what one skill or concept will this cover?','Let the student try, fail, and try again — do not do it for them','After each session, write: what question did they ask that I struggled to answer? what did teaching reveal about my own assumptions?','In the final session, have them complete a finished piece with minimal help from you'],
            recommendations: ['A student\'s naive question often exposes the most important thing you do automatically without understanding why','The finished piece at the end gives both teacher and student a moment of real closure','What you articulate to a student becomes clearer and more deeply yours than what you only practice privately'],
            commonErrors: ['Talking too much and letting the student watch instead of practice — they learn by doing','Skipping the post-session reflection — the insight lives there','Abandoning the sessions when the student struggles — their struggle is the learning'],
            sources: ['2 Timothy 2:2','Ericsson, A. "Peak" — on teaching as mastery accelerant','Kleon, A. "Show Your Work"'] } }
      ]
    }
  ],

  // 11: TECH
  11: [    {
      id: 'tech_digital_boundaries',
      title: 'Digital Boundaries',
      description: 'Technology is a tool. When it becomes a compulsion, it must be brought under authority. This pathway establishes intentional boundaries with your devices.',
      difficulty: 'Beginner', scoreThreshold: 80, priority: 1, prerequisites: [], reward: 10,
      scriptureText: 'All things are lawful for me, but I will not be dominated by anything.', scriptureRef: '1 Corinthians 6:12',
      tasks: [
        { id: 'tdb_1', text: 'Audit your screen time and identify your top 3 time-consuming apps',
          guidance: {
            howTo: ['Check Screen Time (iPhone) or Digital Wellbeing (Android) for last week\'s data','Note the total daily average and the top 3 apps by time','Write: is this time aligned with my values and priorities?'],
            recommendations: ['Do not justify the numbers — let them speak plainly','Compare where you spend time vs. where you say your priorities are'],
            commonErrors: ['Rounding down the numbers mentally to feel better','Skipping this step because you already know it is bad'],
            sources: ['Newport, C. "Digital Minimalism"','1 Corinthians 6:12'] } },
        { id: 'tdb_2', text: 'Set a hard daily limit on your top time-wasting app and keep it for 14 days',
          guidance: {
            howTo: ['Set the limit in Screen Time or Digital Wellbeing — enable the passcode so you cannot override it easily','Give the passcode to a trusted person if needed','When the limit triggers, stop — do not request more time','Replace the time with a pre-decided alternative'],
            recommendations: ['Delete the app from your phone if the limit does not hold','Tell someone your commitment for accountability'],
            commonErrors: ['Setting the limit but giving yourself the override passcode','Not having a replacement activity ready'],
            sources: ['Newport, C. "Digital Minimalism"'] } }
      ]
    },
    {
      id: 'tech_digital_minimalism',
      title: 'Digital Minimalism',
      description: 'Setting limits is the first step. The deeper step is removal — keeping only the tools that serve your calling and eliminating the rest. This pathway clears the digital noise so your attention belongs to you again.',
      difficulty: 'Intermediate', scoreThreshold: 80, priority: 2, prerequisites: ['tech_digital_boundaries'], reward: 10,
      scriptureText: 'Do not be conformed to this world, but be transformed by the renewal of your mind.', scriptureRef: 'Romans 12:2',
      tasks: [
        { id: 'tdm_1', text: 'Delete every app on your phone you have not used intentionally in 30 days — remove social media apps entirely for 30 days',
          guidance: {
            howTo: ['Go through every app on your phone','Delete any app you have not opened with a specific purpose in the past 30 days','Remove all social media apps — not deactivate, delete','Access social media only from a desktop browser if needed, with a defined time limit'],
            recommendations: ['The friction of opening a browser instead of an app reduces mindless use by 80%','If you are afraid to delete an app, that fear is evidence you should delete it','A Light Phone or similar minimal device is the end state — start by removing apps'],
            commonErrors: ['Keeping apps "just in case" — you will reinstall the ones you truly need','Deactivating instead of deleting — one tap reinstalls and the habit returns','Replacing one time-wasting app with another'],
            sources: ['Newport, C. "Digital Minimalism"','Romans 12:2','Philippians 4:8'] } },
        { id: 'tdm_2', text: 'Curate your information intake — unsubscribe from every email list you do not read intentionally and define what you will and will not consume online',
          guidance: {
            howTo: ['Spend one hour going through your email inbox — unsubscribe from every list','Write a short personal policy: what sources do I allow in? What do I refuse?','Apply the policy to newsletters, news sites, YouTube subscriptions, podcasts','Review and prune subscriptions again in 30 days'],
            recommendations: ['Information you consume shapes how you think — curate it as carefully as food','A personal media policy removes daily decision fatigue about what to consume','Less information consumed more deeply is better than more information consumed shallowly'],
            commonErrors: ['Keeping subscriptions you "might read someday"','Having a policy but not enforcing it when boredom strikes','Replacing low-quality content with high-volume high-quality content — volume still fragments attention'],
            sources: ['Newport, C. "Digital Minimalism"','Newport, C. "Deep Work"','Philippians 4:8'] } }
      ]
    },
    {
      id: 'tech_analog_alternatives',
      title: 'Analog Alternatives',
      description: 'For every digital habit, there is usually an analog alternative that accomplishes the same goal with less distraction and more depth. This pathway replaces three digital habits with analog equivalents for 30 days.',
      difficulty: 'Intermediate', scoreThreshold: 80, priority: 3, prerequisites: ['tech_digital_boundaries'], reward: 10,
      scriptureText: 'I will not be dominated by anything.', scriptureRef: '1 Corinthians 6:12',
      tasks: [
        { id: 'taa_1', text: 'Identify 3 digital habits and find a concrete analog replacement for each — acquire what you need before day 1',
          guidance: {
            howTo: ['Look for: phone as alarm clock, news on your phone, digital calendar, phone notes, e-books, phone for navigation on familiar routes','For each habit write: Digital Habit → Analog Alternative → Start Date','Common replacements: alarm clock, paper planner, pocket notebook, physical books','Acquire the analog tools before you begin — having them ready removes the excuse of inconvenience'],
            recommendations: ['Start with the habits that cause the most morning phone interaction — mornings set the tone for the day','The goal is not nostalgia — analog tools often require more skill but produce more depth and less distraction','Three habits is the right scope — too many changes at once guarantees failure'],
            commonErrors: ['Choosing digital habits you barely have — pick real, daily ones','Making too many changes at once','Replacing one digital tool with a different digital tool'],
            sources: ['1 Corinthians 6:12','Newport, C. "Digital Minimalism"','Sax, D. "The Revenge of Analog"'] } },
        { id: 'taa_2', text: 'Use the analog alternatives for 30 days — then write what changed and decide which to keep permanently',
          guidance: {
            howTo: ['Commit to the analog alternative even when it is less convenient','Keep a brief weekly note: what is harder? what is better? what do I not miss?','At day 30, write one paragraph on what changed in your attention, morning routine, or sense of time','Decide which analogs to keep permanently and which digital tools to restore'],
            recommendations: ['Most people find week 1 hardest and week 4 most revealing — push through the early friction','The things you do not miss are the best candidates for permanent removal','This is an experiment, not a vow — honest evaluation at day 30 is the point'],
            commonErrors: ['Reverting after the first difficult week before the new habit has formed','Not writing the comparison at day 30 — the insight lives in the reflection','Treating this as a permanent rejection of technology rather than a deliberate experiment'],
            sources: ['1 Corinthians 6:12','Newport, C. "Digital Minimalism"','Sax, D. "The Revenge of Analog"'] } }
      ]
    },
    {
      id: 'tech_technology_sabbath',
      title: 'Technology Sabbath',
      description: 'Rest from technology is an expression of the Sabbath principle — declaring that your life does not depend on constant connectivity. This pathway establishes a weekly, structured rest from screens.',
      difficulty: 'Intermediate', scoreThreshold: 80, priority: 4, prerequisites: ['tech_digital_minimalism'], reward: 10,
      scriptureText: 'Remember the Sabbath day, to keep it holy.', scriptureRef: 'Exodus 20:8',
      tasks: [
        { id: 'tts_1', text: 'Practice one full day per week with no recreational screen use for 4 consecutive weeks — plan the day in advance',
          guidance: {
            howTo: ['Choose and commit to a fixed day — Sunday is natural for Christians','Define "recreational screen use": no social media, streaming, YouTube, gaming, or news scrolling','Plan what you will do instead before the day arrives: worship, family, nature, reading, prayer, handwork, cooking','Leave your phone at home or in a drawer — do not carry it'],
            recommendations: ['Plan the day fully in advance — boredom without a plan causes failure by noon','The discomfort in the first hour reveals how dependent you have become — sit with it','Screens are not sinful on the Sabbath; the discipline is habitual rest from constant connectivity'],
            commonErrors: ['Allowing "just one exception" that becomes three','Not planning alternative activities — nature abhors a vacuum','Treating it as a rule rather than a gift — Sabbath is rest, not punishment'],
            sources: ['Exodus 20:8','Mark 2:27','Newport, C. "Digital Minimalism"'] } },
        { id: 'tts_2', text: 'After 4 weeks, write what the technology Sabbath revealed — then decide whether to make it permanent',
          guidance: {
            howTo: ['Write: what was hard? what was surprisingly good? what did I miss that was worth missing? what did I not miss at all?','Identify: which digital habits returned Monday morning that you wish had not?','Decide: continue as is, adjust the day or boundaries, or make it a permanent practice','Share your findings with one person who might benefit from the practice'],
            recommendations: ['The reflection is as important as the practice — the Sabbath is meant to teach you about the rest of the week','The things you did not miss are the best candidates for permanent removal','What you share with someone else becomes more real and lasting to you'],
            commonErrors: ['Completing 4 weeks and reverting to full digital consumption without reflection','Not writing the evaluation — it prevents the insight from landing','Treating the end of 4 weeks as graduation rather than the beginning of a decision'],
            sources: ['Exodus 20:8','Mark 2:27','Newport, C. "Digital Minimalism"'] } }
      ]
    }
  ],

  // 12: SPIRIT
  12: [
    {
      id: 'spirit_gospel_foundation',
      title: 'Gospel Foundation',
      description: 'Faith rests on Christ alone. This pathway walks through what the Gospel is, why it matters, and what it means to trust in Jesus for the forgiveness of sins.',
      difficulty: 'Beginner', scoreThreshold: 80, priority: 1, prerequisites: [], reward: 0,
      scriptureText: 'For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life.', scriptureRef: 'John 3:16',
      tasks: [
        { id: 'sgf_1', text: 'Read Romans 3:21-26 and write in your own words what it teaches about how a person is made right with God',
          guidance: {
            howTo: [
              'Read the passage slowly at least twice — ESV or NASB recommended',
              'Write: What does it say about sin? What does it say about Jesus? What does it say about faith?',
              'Do not consult a commentary first — write your initial understanding',
              'Then read a trusted explanation and note what you missed or misunderstood'
            ],
            recommendations: [
              'Use the ESV Study Bible notes or Luther\'s commentary on Romans',
              'Do not rush — the Gospel is the center of all Scripture'
            ],
            commonErrors: [
              'Assuming you already understand it fully — read it fresh each time',
              'Skipping the writing step — it reveals what you do and do not actually understand'
            ],
            sources: [
              'Luther, M. — Preface to the Epistle to the Romans',
              'ESV Study Bible — notes on Romans 3',
              'Plass, E. "What Luther Says" — on justification'
            ]
          }
        },
        { id: 'sgf_2', text: 'Speak with your pastor or a trusted Christian about what you believe and receive their counsel',
          guidance: {
            howTo: [
              'Contact your pastor and request a meeting',
              'Tell them honestly where you are: what you believe, what you doubt, what you do not understand',
              'Ask: "What must I do to be saved?" and listen carefully',
              'If you have no pastor, contact the nearest confessional Lutheran church'
            ],
            recommendations: [
              'Bring your written answer from task 1 as a starting point',
              'This is a conversation with someone who cares for your soul — not a test'
            ],
            commonErrors: [
              'Postponing indefinitely because it feels uncomfortable',
              'Substituting online content for a real conversation with a pastor'
            ],
            sources: [
              'Acts 8:26-38 — Philip and the Ethiopian eunuch',
              'Lutheran Church Missouri Synod — lcms.org/find-a-church'
            ]
          }
        }
      ]
    },
    {
      id: 'spirit_read_john',
      title: 'Read the Gospel of John',
      description: 'Before any other step, encounter Jesus himself in Scripture. The Gospel of John was written specifically so that you may believe — and believing, have life in his name.',
      difficulty: 'Beginner', scoreThreshold: 80, priority: 2, prerequisites: ['spirit_gospel_foundation'], reward: 0,
      scriptureText: 'These are written so that you may believe that Jesus is the Christ, the Son of God, and that by believing you may have life in his name.', scriptureRef: 'John 20:31',
      tasks: [
        { id: 'srj_1', text: 'Read one chapter of the Gospel of John each day for 21 days',
          guidance: {
            howTo: [
              'Read slowly — this is not a reading speed exercise',
              'Read twice if a chapter is short (chapters 1-3 especially reward re-reading)',
              'Use the ESV or NASB for accuracy',
              'Read at the same time each day — morning is best'
            ],
            recommendations: [
              'Start with no commentary — let the text speak first',
              'John 1, 3, 8, 10, 14, and 17 are the richest — read them with extra care',
              'If you miss a day, continue where you left off — do not restart'
            ],
            commonErrors: [
              'Reading too fast to fill a quota',
              'Skipping chapters because they seem less interesting',
              'Stopping when it gets confusing — confusion is a prompt to re-read, not quit'
            ],
            sources: [
              'ESV Study Bible — notes on John',
              'Luther, M. — Sermons on the Gospel of John',
              'Köstenberger, A. "John" (BECNT commentary)'
            ] } },
        { id: 'srj_2', text: 'Write one observation per chapter — what does this teach me about who Jesus is?',
          guidance: {
            howTo: [
              'Keep a small notebook with your Bible',
              'After each chapter, write one sentence: what did I learn about Jesus here?',
              'Do not overthink — one honest observation is more valuable than a polished essay',
              'After 21 days, read back through your observations'
            ],
            recommendations: [
              'Focus the question on Jesus, not on what you should do — John is revelation, not instruction',
              'Your observations will deepen on re-reading — they do not need to be final'
            ],
            commonErrors: [
              'Writing what you think you should observe instead of what you actually noticed',
              'Skipping the writing step — it forces comprehension that reading alone does not'
            ],
            sources: [
              'Bonhoeffer, D. "Meditating on the Word"',
              'John 20:31'
            ] } }
      ]
    },
    {
      id: 'spirit_seek_church',
      title: 'Seek a Church Home',
      description: 'Faith is not a private matter. The Christian life is lived within the community of believers — hearing the Word preached rightly and receiving the sacraments. This pathway leads to finding a church home.',
      difficulty: 'Beginner', scoreThreshold: 80, priority: 3, prerequisites: ['spirit_gospel_foundation'], reward: 0,
      scriptureText: 'And let us consider how to stir up one another to love and good works, not neglecting to meet together, as is the habit of some.', scriptureRef: 'Hebrews 10:24-25',
      tasks: [
        { id: 'ssc_1', text: 'Attend a confessional Lutheran church service this Sunday',
          guidance: {
            howTo: [
              'Find a congregation near you at lcms.org/find-a-church',
              'Arrive a few minutes early — introduce yourself to someone',
              'Follow the liturgy as best you can — do not worry about doing it perfectly',
              'Stay for any fellowship time after the service'
            ],
            recommendations: [
              'A confessional Lutheran church (LCMS) will preach Christ crucified for sinners — that is the mark to look for',
              'If you feel out of place, that is normal — go again',
              'Bring your Gospel of John notebook if you have been working through it'
            ],
            commonErrors: [
              'Waiting until you feel "ready" — you will never feel ready',
              'Church-shopping based on music style or building instead of doctrine',
              'Attending once and deciding it is not for you'
            ],
            sources: [
              'Hebrews 10:24-25',
              'Luther\'s Small Catechism — On the Church',
              'lcms.org/find-a-church'
            ] } },
        { id: 'ssc_2', text: 'Attend 4 consecutive Sundays and request a meeting with the pastor',
          guidance: {
            howTo: [
              'Commit to 4 consecutive Sundays at the same congregation',
              'After the second or third Sunday, ask to speak with the pastor',
              'Tell the pastor where you are: what you believe, what you doubt, what you are seeking',
              'Ask about adult instruction or confirmation class if they offer it'
            ],
            recommendations: [
              'Pastors expect people to come with questions — this is their calling',
              'Adult instruction (confirmation) is not just for young people — it is for anyone seeking to understand the faith',
              'Consistency matters more than perfect understanding at this stage'
            ],
            commonErrors: [
              'Attending but never speaking to anyone — membership requires relationship',
              'Expecting to feel certain before committing to instruction',
              'Treating the 4 weeks as an evaluation period instead of a commitment'
            ],
            sources: [
              'Acts 2:42 — devoted to teaching, fellowship, breaking of bread, and prayer',
              'Luther\'s Small Catechism — Baptism and the Lord\'s Supper'
            ] } }
      ]
    }
  ]

};

// ── ENTRY POINT ────────────────────────────────────────────────────────────
window.enterPathwaysMode = function() {
  const scores = window.vpAssessmentScores || {};
  vpSkillsData.forEach(skill => {
    if (scores[skill.section] !== undefined) {
      skill.score     = scores[skill.section];
      skill.completed = true;
    }
  });
  if (window.vpAssessmentIsQuick) {
    vpEstimatedDomains = vpSkillsData.filter(s => s.completed).map(s => s.section);
    window.vpAssessmentIsQuick = false;
  } else if (window.vpRefineSection) {
    vpEstimatedDomains = vpEstimatedDomains.filter(d => d !== window.vpRefineSection);
    window.vpRefineSection = null;
  } else {
    vpEstimatedDomains = [];
  }
  vpIsLoggedIn = true;
  if (!vpFirstUse) vpFirstUse = new Date().toISOString();
  vpSnapshotScores();
  vpSaveToLocal();
  const heading = document.getElementById('page-heading');
  if (heading) heading.textContent = vpUserName ? `Welcome, ${vpUserName}! Alleluia!` : 'Pilgrim Pace — Your Pathways. Alleluia!';
  renderPathwaysNav();
  attachSidebarStatusBar();
  vpGoHome();
};

// ── LEFT SIDEBAR ────────────────────────────────────────────────────────────
function attachSidebarStatusBar() {
  const descEl = document.getElementById('sidebar-desc');
  if (!descEl) return;
  const defaultHTML = 'Click a section below';
  descEl.innerHTML = defaultHTML;
  document.querySelectorAll('[data-desc]').forEach(function(item) {
    const text = item.getAttribute('data-desc');
    item.addEventListener('mouseenter', function() {
      descEl.textContent = text;
      var sb = document.getElementById('sidebar-status');
      if (sb) sb.classList.add('has-desc');
    });
    item.addEventListener('mouseleave', function() {
      if (!window._vpStatusAnim) descEl.innerHTML = defaultHTML;
      var sb = document.getElementById('sidebar-status');
      if (sb) sb.classList.remove('has-desc');
    });
  });
}

window.renderPathwaysNav = function renderPathwaysNav() {
  const nav = document.querySelector('.sidebar');
  if (!nav) return;

  const recommended = getRecommendedPathways().slice(0, 3);

  let pathwayItems = '';
  if (recommended.length === 0) {
    pathwayItems = `
      <li style="position:relative;padding-left:20px;padding-top:14px;padding-bottom:10px;border-left:1px dotted #808080;">
        <span style="font-size:0.9em;color:#555;">No pathways available yet.</span>
      </li>`;
  } else {
    pathwayItems = recommended.map((pw, idx) => {
      const done  = countCompletedTasks(pw);
      const total = pw.tasks.length;
      const isLast = idx === recommended.length - 1;
      return `
        <li class="menu-item" data-desc="${pw.skillName} · ${pw.difficulty} · ${done}/${total} tasks"
            style="position:relative;padding-left:20px;padding-top:14px;padding-bottom:10px;
                   border-left:${isLast ? '1px dotted transparent' : '1px dotted #808080'};">
          ${isLast ? `<span style="position:absolute;top:0;left:-1px;height:27px;border-left:1px dotted #808080;"></span>` : ''}
          <span style="position:absolute;top:27px;left:0;width:20px;border-top:1px dotted #808080;display:block;"></span>
          <a href="javascript:void(0)" class="link-button" onclick="vpShowPathwayDetail('${pw.id}')">${pw.title}</a>
        </li>`;
    }).join('');

    pathwayItems += `
      <li style="position:relative;padding-left:20px;padding-top:10px;padding-bottom:6px;border-left:1px dotted transparent;">
        <span style="position:absolute;top:0;left:-1px;height:14px;border-left:1px dotted #808080;"></span>
        <span style="display:inline-block;border:1px dotted #808080;padding:2px 6px;font-size:0.8em;color:#555;">
          More pathways unlock as you complete these.
        </span>
      </li>`;
  }

  const resourceDefs = [
    { label: 'Home',   action: 'vpGoHome()',              desc: 'Return to the landing page.'           },
    { label: 'Skills', action: 'renderSkillTracker()',    desc: 'View all domain scores and progress.'  },
    { label: 'About',  action: "showContent('about')",    desc: 'Information about the site and owner.' },
    { label: 'Library',action: "showContent('library')",  desc: 'Collection of curated literature.'     }
  ];
  const resourceItems = resourceDefs.map((item, idx) => {
    const isLast = idx === resourceDefs.length - 1;
    return `
      <li class="menu-item" data-desc="${item.desc}"
          style="position:relative;padding-left:20px;padding-top:14px;padding-bottom:10px;
                 border-left:${isLast ? '1px dotted transparent' : '1px dotted #808080'};">
        ${isLast ? `<span style="position:absolute;top:0;left:-1px;height:27px;border-left:1px dotted #808080;"></span>` : ''}
        <span style="position:absolute;top:27px;left:0;width:20px;border-top:1px dotted #808080;display:block;"></span>
        <a href="javascript:void(0)" class="link-button" onclick="${item.action}">${item.label}</a>
      </li>`;
  }).join('');

  nav.innerHTML = `
    <ul class="tree-view">
      <li>
        <details open>
          <summary data-desc="Your recommended pathways based on your domain scores — expand to view and work on each one.">Your Pathways</summary>
          <ul style="list-style-type:none;padding-left:0;margin-left:15px;margin-top:-4px;">
            ${pathwayItems}
          </ul>
        </details>
      </li>
      <li style="margin-top:4px;">
        <details>
          <summary>Resources</summary>
          <ul style="list-style-type:none;padding-left:0;margin-left:15px;margin-top:-4px;">
            ${resourceItems}
          </ul>
        </details>
      </li>
    </ul>`;
};

window.vpGoHome = function() {
  const welcome = document.getElementById('sidebar-welcome');
  if (welcome) welcome.textContent = vpUserName ? `Welcome, ${vpUserName}!` : 'Welcome!';

  const pane = document.getElementById('display-pane');
  if (!pane) return;

  // If logged in, only update the content pane — leave the pathways sidebar intact
  if (vpIsLoggedIn) {
    const recommended = getRecommendedPathways();
    const focus = recommended[0] || null;
    const verse = vpGetDailyScripture();

    let focusBlock = '';
    if (focus) {
      focusBlock = `
        <div style="max-width:500px;margin-top:18px;">
          <div style="font-size:0.72em;font-weight:bold;color:#555;margin-bottom:6px;border-bottom:1px dotted #808080;padding-bottom:4px;">TODAY'S FOCUS</div>
          <div style="font-size:0.85em;color:#888;margin-bottom:2px;">${focus.skillName}</div>
          <div style="font-weight:bold;margin-bottom:6px;">${focus.title}</div>
          <div style="font-size:0.82em;color:#333;margin-bottom:12px;line-height:1.5;">${focus.description}</div>
          <label class="link-button" style="cursor:pointer;" onclick="vpShowPathwayDetail('${focus.id}')">Open Pathway &rarr;</label>
        </div>`;
    } else {
      focusBlock = `
        <div style="max-width:500px;margin-top:18px;">
          <div style="font-size:0.72em;font-weight:bold;color:#555;margin-bottom:6px;border-bottom:1px dotted #808080;padding-bottom:4px;">TODAY'S FOCUS</div>
          <div style="font-size:0.85em;color:#555;">All available pathways complete. Well done — open Your Pathways to review your progress.</div>
        </div>`;
    }

    const streakLabel = vpStreak > 1 ? `${vpStreak}-day streak` : `Day 1`;
    const streakBlock = `
      <div style="max-width:500px;margin-top:20px;">
        <div style="font-size:0.72em;font-weight:bold;color:#555;margin-bottom:6px;border-bottom:1px dotted #808080;padding-bottom:4px;">STREAK</div>
        <div style="font-size:0.85em;color:#222;">${streakLabel} — keep showing up.</div>
      </div>`;

    // Weekly reflection prompt
    const _reflectionBase = vpLastReflection || vpFirstUse;
    const daysSince = _reflectionBase
      ? Math.floor((Date.now() - new Date(_reflectionBase)) / 86400000)
      : -1;
    let reflectionBlock = '';
    if (daysSince >= 7) {
      const focusDomain = focus ? focus.skillName : null;
      const question = focusDomain && VP_REFLECTION_QUESTIONS[focusDomain]
        ? VP_REFLECTION_QUESTIONS[focusDomain]
        : 'How did this past week go? Where did you grow, and where did you fall short?';
      reflectionBlock = `
        <div style="max-width:500px;margin-top:20px;">
          <div style="font-size:0.72em;font-weight:bold;color:#555;margin-bottom:6px;border-bottom:1px dotted #808080;padding-bottom:4px;">WEEKLY REFLECTION</div>
          <div style="font-size:0.85em;margin-bottom:8px;">${question}</div>
          <textarea id="vp-reflection-input" rows="3"
            style="width:100%;box-sizing:border-box;font-family:inherit;font-size:0.85em;padding:4px 6px;border:1px dotted #808080;background:#d4d0c8;resize:vertical;"></textarea>
          <div style="margin-top:6px;display:flex;gap:8px;">
            <label class="link-button" style="cursor:pointer;" onclick="vpSaveReflection()">Save</label>
            <label class="link-button" style="cursor:pointer;color:#888;" onclick="vpSkipReflection()">Skip</label>
          </div>
        </div>`;
    }

    const nameBlock = !vpUserName ? `
      <div style="max-width:500px;margin-top:20px;">
        <div style="font-size:0.72em;font-weight:bold;color:#555;margin-bottom:6px;border-bottom:1px dotted #808080;padding-bottom:4px;">YOUR NAME</div>
        <div style="display:flex;align-items:center;gap:8px;">
          <input id="vp-name-set" type="text" placeholder="Enter your name"
            style="font-family:inherit;font-size:0.9em;padding:4px 8px;border:1px dotted #808080;background:#d4d0c8;width:180px;box-sizing:border-box;"
            onkeydown="if(event.key==='Enter')vpSetName()">
          <label class="link-button" style="cursor:pointer;" onclick="vpSetName()">Save</label>
        </div>
      </div>` : '';

    const _fsq = document.getElementById('footer-scripture');
    if (_fsq) _fsq.style.display = '';

    pane.innerHTML = `<div id="default-msg">${focusBlock}${streakBlock}${reflectionBlock}${nameBlock}</div>`;
    return;
  }

  // Not logged in — reset sidebar to original nav
  const nav = document.querySelector('.sidebar');
  if (nav) {
    nav.innerHTML = `
      <ul class="tree-view">
        <li>
          <details><summary data-desc="Hovering over any menu item will show a description here, then click to open the item.">Quick Start</summary>
            <ul>
              <li class="menu-item" data-desc="You now understand how the menu works. Next, find and click the About item in the Resources dropdown.">
                <a href="javascript:void(0)" class="link-button">Hover here</a>
              </li>
            </ul>
          </details>
        </li>
        <li>
          <details>
            <summary data-desc="Access reference materials, curated literature, and information about the site.">Resources</summary>
            <ul>
              <li class="menu-item" data-desc="Information about the site owner, the website, and how the site functions.">
                <a href="javascript:void(0)" class="link-button" onclick="showContent('about')">About</a>
              </li>
              <li class="menu-item" data-desc="Collection of curated literature.">
                <a href="javascript:void(0)" class="link-button" onclick="showContent('library')">Library</a>
              </li>
            </ul>
          </details>
        </li>
        <li>
          <details><summary data-desc="Begin a new assessment to find your starting point, or load your saved progress to continue your pathways.">Pathways</summary>
            <ul>
              <li class="menu-item" data-desc="Assessment questionnaire to determine your starting point.">
                <a href="javascript:void(0)" class="link-button" onclick="showContent('pathfinder')">New User</a>
              </li>
              <li class="menu-item" data-desc="Load your saved progress and continue your pathways.">
                <a href="javascript:void(0)" class="link-button" onclick="vpLoadExistingUser()">Existing User</a>
              </li>
            </ul>
          </details>
        </li>
      </ul>
`;
    attachSidebarStatusBar();
  }
  pane.innerHTML = `<div id="default-msg" style="padding:24px 20px;max-width:420px;">
  <p style="font-family:'MS UI Gothic',monospace;font-size:0.95em;color:#333;margin:0 0 10px;font-weight:bold;letter-spacing:0.03em;">What is Pilgrim Pace?</p>
  <p style="font-family:'MS UI Gothic',monospace;font-size:0.8em;color:#555;margin:0;line-height:1.7;letter-spacing:0.08em;">A faith-based personal operating system for intentional Christian living. Assess your life across 13 domains — Body, Mind, Finance, Vitality, Spirit, and more — then follow guided pathways toward growth in each area. New Users select <strong style="color:#444;">"Quick Start"</strong> on the menu to begin.</p>
</div>`;
};

window.vpSetName = function() {
  const input = document.getElementById('vp-name-set');
  if (!input) return;
  const name = input.value.trim();
  if (!name) return;
  vpUserName = name;
  vpSaveToLocal();
  const welcome = document.getElementById('sidebar-welcome');
  if (welcome) welcome.textContent = `Welcome, ${vpUserName}!`;
  vpGoHome();
};

// Also update the Existing User link in index.html's nav at runtime
document.addEventListener('DOMContentLoaded', function() {
  const existingLink = document.querySelector('a[onclick*="existing"]');
  if (existingLink) existingLink.setAttribute('onclick', 'vpLoadExistingUser()');

  const pane = document.getElementById('display-pane');
   if (pane) pane.innerHTML = `<div id="default-msg" style="padding:24px 20px;max-width:420px;">
  <p style="font-family:'MS UI Gothic',monospace;font-size:0.95em;color:#333;margin:0 0 10px;font-weight:bold;letter-spacing:0.03em;">What is Pilgrim Pace?</p>
  <p style="font-family:'MS UI Gothic',monospace;font-size:0.8em;color:#555;margin:0;line-height:1.7;letter-spacing:0.08em;">A faith-based personal operating system for intentional Christian living. Assess your life across 13 domains — Body, Mind, Finance, Vitality, Spirit, and more — then follow guided pathways toward growth in each area. New Users select <strong style="color:#444;">"Quick Start"</strong> on the menu to begin.</p>
</div>`;
  const v  = vpGetDailyScripture();
  const fs = document.getElementById('footer-scripture');
  if (fs) fs.innerHTML = '”' + v.text + '” <span style=”font-size:0.85em;color:#999;letter-spacing:0.05em;”>— ' + v.ref + '</span>';
});

// ── RIGHT PANEL — Skill Tracker ────────────────────────────────────────────

window.renderSkillTracker = function renderSkillTracker() {
  const _fsq = document.getElementById('footer-scripture');
  if (_fsq) _fsq.style.display = 'none';
  if (window._vpStatusAnim) { clearInterval(window._vpStatusAnim); window._vpStatusAnim = null; }
  const _sb = document.getElementById('sidebar-desc');
  if (_sb) _sb.innerHTML = 'Click a section below';
  const pane = document.getElementById('display-pane');
  if (!pane) return;

  const completedSkills = vpSkillsData.filter(s => s.completed);
  const overall = completedSkills.length
    ? Math.round(completedSkills.reduce((sum, s) => sum + s.score, 0) / completedSkills.length)
    : 0;

  let saveLabel = '';
  try {
    const raw = localStorage.getItem('victoryPages_v1');
    if (raw) {
      const d = JSON.parse(raw);
      if (d.savedAt) saveLabel = new Date(d.savedAt).toLocaleDateString();
    }
  } catch(e) {}

  const sorted = vpSkillsData
    .map((skill, i) => ({ ...skill, originalIndex: i }))
    .sort((a, b) => {
      if (!a.completed && !b.completed) return 0;
      if (!a.completed) return 1;
      if (!b.completed) return -1;
      const pa = (a.importance || 1) * 15 + (100 - a.score);
      const pb = (b.importance || 1) * 15 + (100 - b.score);
      return pb - pa;
    });

  const fs     = 'font-size:0.72em;';
  const border = 'border-bottom:1px dotted #808080;';
  const priCol = 'width:58px;flex-shrink:0;border-right:1px dotted #808080;padding-right:8px;';
  const scoCol = 'width:55px;flex-shrink:0;text-align:right;';
  const rowPad = 'padding:2px 0;';

  const header = `
    <div style="${fs}display:flex;gap:10px;${rowPad}border-top:1px dotted #808080;${border}font-weight:bold;color:#555;">
      <span style="${priCol}">Priority</span>
      <span style="flex:1;">Domain</span>
      <span style="${scoCol}">Score</span>
    </div>`;

  const jc = window._vpJustCompleted || null;
  window._vpJustCompleted = null;

  const visible = sorted;
  const rows = visible.map((skill, i) => {
    const isJustCompleted = jc && skill.originalIndex === jc.skillIndex;
    const isEstimated = vpEstimatedDomains.includes(skill.section);
    const estTag   = isEstimated ? ` <span style="font-size:0.85em;color:#888;">(est.)</span>` : '';
    const refineBtn = (isEstimated && skill.completed)
      ? ` <a href="javascript:void(0)" class="link-button" style="font-size:0.78em;" onclick="startDomainRefinement('${skill.section}')">Refine</a>`
      : '';
    const scoreCell = skill.completed
      ? (isJustCompleted
          ? `<span id="vp-score-flash" style="${scoCol}color:#1a7a1a;align-self:flex-start;padding-top:1px;font-weight:bold;">${skill.score}/100 <span style="color:#1a7a1a;">&#8593;+${jc.reward}</span></span>`
          : `<span style="${scoCol}color:darkred;align-self:flex-start;padding-top:1px;">${skill.score}/100</span>`)
      : `<span style="${scoCol}color:darkred;align-self:flex-start;padding-top:1px;">—</span>`;
    return `
    <div style="${fs}display:flex;gap:10px;${rowPad}${border}align-items:center;cursor:default;"
         data-desc="${(skill.desc || '').replace(/"/g, '&quot;')}"
         onmouseenter="var s=document.getElementById('sidebar-desc');if(s)s.textContent=this.dataset.desc;var sb=document.getElementById('sidebar-status');if(sb)sb.classList.add('has-desc');this.style.background='#c8c8c8';"
         onmouseleave="var s=document.getElementById('sidebar-desc');if(s)s.innerHTML='Click a section below';var sb=document.getElementById('sidebar-status');if(sb)sb.classList.remove('has-desc');this.style.background='';">
      <span style="${priCol}color:#888;align-self:flex-start;padding-top:1px;">${i + 1}</span>
      <div style="flex:1;">
        <div>${skill.name}${estTag}${refineBtn}</div>
      </div>
      ${scoreCell}
    </div>`;
  }).join('');

  // Build right-side description
  let tierLabel, tierBody, tierScripture, tierRef;
  if (!completedSkills.length) {
    tierLabel     = 'Assessment Needed';
    tierBody      = 'Complete the Pathfinder assessment to unlock your domains. Your scores will appear here and guide which pathways are recommended first.';
    tierScripture = 'Search me, O God, and know my heart; try me and know my thoughts!';
    tierRef       = 'Psalm 139:23';
  } else if (overall < 20) {
    tierLabel     = 'Just Beginning';
    tierBody      = 'Every great journey starts with honest self-examination. You\'ve already done the harder thing — you looked. God doesn\'t demand perfection; He asks for faithfulness. Pick one domain and start there. Show up again tomorrow.';
    tierScripture = 'He who began a good work in you will bring it to completion at the day of Jesus Christ.';
    tierRef       = 'Philippians 1:6';
  } else if (overall < 40) {
    tierLabel     = 'Laying Foundations';
    tierBody      = 'You\'re in the building phase. The habits you form now will carry you further than any single breakthrough. Small, repeated faithfulness is how God shapes character.';
    tierScripture = 'Trust in the Lord with all your heart, and do not lean on your own understanding. In all your ways acknowledge him, and he will make straight your paths.';
    tierRef       = 'Proverbs 3:5–6';
  } else if (overall < 60) {
    tierLabel     = 'Growing Strong';
    tierBody      = 'The middle of a journey is harder than the beginning — the novelty is gone, but the finish isn\'t yet in sight. This is where real character is formed: not in the victories, but in the staying. Keep going. The fruit is coming.';
    tierScripture = 'Let us not grow weary of doing good, for in due season we will reap, if we do not give up.';
    tierRef       = 'Galatians 6:9';
  } else if (overall < 80) {
    tierLabel     = 'Bearing Fruit';
    tierBody      = 'Consistent effort over time produces real change. What your scores reflect isn\'t a number — it\'s sustained faithfulness. Go deeper now rather than wider. Mastery in the domains you\'ve claimed is more valuable than scattered effort.';
    tierScripture = 'I am the vine; you are the branches. Whoever abides in me and I in him, he it is that bears much fruit, for apart from me you can do nothing.';
    tierRef       = 'John 15:5';
  } else {
    tierLabel     = 'Walking in Maturity';
    tierBody      = 'This is what a well-ordered life looks like — not perfection, but intention. Consider how your growth now serves those around you: your household, your neighbor, your church. A mature life pours outward.';
    tierScripture = 'As each has received a gift, use it to serve one another, as good stewards of God\'s varied grace.';
    tierRef       = '1 Peter 4:10';
  }

  // Milestone banner
  const ms = window._vpMilestone || null;
  window._vpMilestone = null;
  const milestoneBanner = ms ? `
    <div id="vp-milestone-banner" style="max-width:860px;margin-bottom:16px;padding:10px 14px;border:1px dotted #808080;background:#f0f0e8;">
      <div style="${fs}font-weight:bold;color:#555;margin-bottom:4px;">${ms.domain} — ${ms.data.label}</div>
      <div style="font-size:0.85em;margin-bottom:6px;">${ms.data.body}</div>
      <div style="font-size:0.82em;color:#555;">"${ms.data.scripture}" — ${ms.data.ref}</div>
    </div>` : '';

  // Score history delta for description panel
  let historyNote = '';
  if (vpScoreHistory.length >= 2) {
    const first = vpScoreHistory[0];
    const firstDate = new Date(first.date).toLocaleDateString();
    const completedNow = vpSkillsData.filter(s => s.completed);
    let totalDelta = 0;
    completedNow.forEach((s, idx) => {
      const orig = vpSkillsData.indexOf(s);
      const snap = first.scores[orig];
      if (snap && snap.completed) totalDelta += s.score - snap.score;
    });
    if (totalDelta > 0)
      historyNote = `<div style="border-top:1px dotted #808080;margin-top:10px;padding-top:8px;font-size:0.9em;color:#555;">Since ${firstDate}: <strong style="color:#1a7a1a;">+${totalDelta} pts</strong> across all domains</div>`;
  }

  const saveReminder = jc ? `
    <div style="max-width:860px;margin-bottom:12px;padding:8px 14px;border:1px dotted #808080;background:#f5f5e8;font-size:0.85em;">
      Pathway complete — <strong>Save Progress</strong> below to keep your new score.
    </div>` : '';

  pane.innerHTML = `
    <div>
    ${saveReminder}
    ${milestoneBanner}
    <div style="display:flex;gap:28px;align-items:flex-start;">
      <div style="max-width:380px;flex-shrink:0;">
        <div style="${fs}margin-bottom:8px;">Overall: <strong style="color:darkred;">${overall}/100</strong></div>
        ${header}
        <div>${rows}</div>
        <div style="${fs}margin-top:6px;display:flex;align-items:center;gap:12px;">
          <label class="link-button" style="cursor:pointer;" onclick="vpSaveAndConfirm()">Save Progress</label>
          <label class="link-button" style="cursor:pointer;" onclick="vpCopyForClaude()"
            onmouseenter="var s=document.getElementById('sidebar-desc');if(s)s.textContent='Claude is an AI assistant by Anthropic — recommended here for its depth and nuance with personal reflection. Copies your VP scores to clipboard; paste into claude.ai for tailored guidance.';var sb=document.getElementById('sidebar-status');if(sb)sb.classList.add('has-desc');"
            onmouseleave="var s=document.getElementById('sidebar-desc');if(s)s.innerHTML='Click a section below';var sb=document.getElementById('sidebar-status');if(sb)sb.classList.remove('has-desc');">Ask Claude</label>
          <span id="vp-save-label" style="color:#555;">${saveLabel ? 'Saved ' + saveLabel : ''}</span>
        </div>
      </div>
      <div style="font-size:0.78em;max-width:300px;padding-top:22px;padding-left:70px;">
        <div style="font-weight:bold;margin-bottom:8px;font-size:1.05em;">${tierLabel}</div>
        <p style="margin:0 0 12px 0;line-height:1.5;color:#222;">${tierBody}</p>
        <hr style="margin:8px 0;">
        <p style="margin:0;line-height:1.5;color:#555;">"${tierScripture}" <span style="color:#888;">— ${tierRef}</span></p>
        ${historyNote}
      </div>
    </div>
    </div>`;
};

window.vpSaveAndConfirm = function() {
  vpSaveToLocal();

  const raw = localStorage.getItem('victoryPages_v1');
  if (raw) {
    const blob = new Blob([raw], { type: 'application/json' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = 'vp_export.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  const btn = document.querySelector('[onclick="vpSaveAndConfirm()"]');
  const lbl = document.getElementById('vp-save-label');
  if (btn) {
    const old = btn.textContent;
    btn.textContent = 'Saved.';
    setTimeout(() => { btn.textContent = old; }, 2000);
  }
  if (lbl) lbl.textContent = 'Last saved ' + new Date().toLocaleDateString();
};

// ── ASK CLAUDE ──────────────────────────────────────────────────────────────
window.vpCopyForClaude = function() {
  const scoredDomains = vpSkillsData
    .map((s, i) => ({ ...s, idx: i }))
    .filter(s => s.completed)
    .sort((a, b) => {
      const pa = (a.importance || 1) * 15 + (100 - a.score);
      const pb = (b.importance || 1) * 15 + (100 - b.score);
      return pb - pa;
    });

  if (scoredDomains.length === 0) {
    alert('Complete the assessment first, then use Ask Claude to get guidance.');
    return;
  }

  const date = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  const overallAvg = Math.round(scoredDomains.reduce((s, d) => s + d.score, 0) / scoredDomains.length);

  const domainLines = scoredDomains.map(d => `  ${d.name}: ${d.score}/100`).join('\n');

  const recs = getRecommendedPathways().slice(0, 5);
  const recLines = recs.length
    ? recs.map((pw, i) => `  ${i + 1}. ${pw.title} (${pw.skillName} — score ${pw.currentScore})`).join('\n')
    : '  None — all current pathways are above threshold.';

  const inProgress = [];
  Object.keys(vpPathwayProgress).forEach(pwId => {
    if (vpCompletedPathways.includes(pwId)) return;
    const pw = vpFindPathwayById(pwId);
    if (!pw) return;
    const done = countCompletedTasks(pw);
    if (done === 0) return;
    inProgress.push(`  ${pw.title} (${pw.skillName}) — ${done} of ${pw.tasks.length} tasks complete`);
  });
  const progressLines = inProgress.length ? inProgress.join('\n') : '  None started yet.';

  const completedCount = vpCompletedPathways.length;
  const recentCompleted = vpCompletedPathways.slice(-5).map(id => {
    const pw = vpFindPathwayById(id);
    return pw ? `  ${pw.title} (${pw.skillName})` : '';
  }).filter(Boolean).join('\n');
  const completedLines = completedCount > 0 ? recentCompleted : '  None yet.';

  const text =
`Pilgrim Pace Snapshot — ${date}
Overall: ${overallAvg}/100

DOMAIN SCORES (priority order):
${domainLines}

RECOMMENDED PATHWAYS (most important first):
${recLines}

IN PROGRESS:
${progressLines}

COMPLETED PATHWAYS (${completedCount} total${completedCount > 5 ? ', showing 5 most recent' : ''}):
${completedLines}

---
I use Pilgrim Pace, a faith-based personal operating system with 13 life domains. Based on my scores and recommended pathways above, what should I focus on next for intentional Christian living?`;

  const confirmBtn = () => {
    const btn = document.querySelector('[onclick="vpCopyForClaude()"]');
    if (btn) {
      const old = btn.textContent;
      btn.textContent = 'Copied!';
      setTimeout(() => { btn.textContent = old; }, 2500);
    }
  };

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(confirmBtn).catch(() => fallbackCopy(text, confirmBtn));
  } else {
    fallbackCopy(text, confirmBtn);
  }
};

function fallbackCopy(text, callback) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0;';
  document.body.appendChild(ta);
  ta.select();
  try { document.execCommand('copy'); callback(); } catch(e) {}
  document.body.removeChild(ta);
}

// ── PATHWAY DETAIL ──────────────────────────────────────────────────────────
window.vpShowPathwayDetail = function(pathwayId) {
  const pw = vpFindPathwayById(pathwayId);
  if (!pw) return;
  vpCurrentPathway = pw;

  const pane = document.getElementById('display-pane');
  if (!pane) return;

  const _fsq = document.getElementById('footer-scripture');
  if (_fsq) _fsq.style.display = 'none';

  const progress = vpGetPathwayProgress(pw.id);
  const done     = countCompletedTasks(pw);
  const allDone  = vpIsPathwayComplete(pw);

  const taskItems = pw.tasks.map(task => {
    const isComplete = progress[task.id] === true;
    return `
      <div style="display:flex;align-items:flex-start;gap:6px;padding:6px 0;border-bottom:1px dotted #808080;">
        <span style="cursor:pointer;flex-shrink:0;" onclick="vpToggleTask('${pw.id}','${task.id}')">${isComplete ? '[x]' : '[ ]'}</span>
        <span style="flex:1;font-size:0.9em;${isComplete ? 'text-decoration:line-through;color:#888;' : ''}">${task.text}</span>
        ${task.guidance ? `<a href="javascript:void(0)" class="link-button" style="font-size:0.78em;flex-shrink:0;" onclick="vpShowGuidance('${pw.id}','${task.id}')">info</a>` : ''}
      </div>`;
  }).join('');

  pane.innerHTML = `
    <div class="assessment-container">
      <p style="margin:0 0 8px 0;"><strong>${pw.title}</strong></p>
      <p style="font-size:0.9em;margin:0 0 8px 0;">${pw.description}</p>
      <hr>
      <p style="font-size:0.85em;margin:0 0 6px 0;"><strong>Tasks (${done}/${pw.tasks.length} completed)</strong></p>
      <div>${taskItems}</div>
      <div style="margin-top:14px;">
        ${allDone ? `<label class="link-button" style="cursor:pointer;" onclick="vpCompletePathway('${pw.id}')">Complete Path</label>&nbsp;` : ''}
        <label class="link-button" style="cursor:pointer;" onclick="renderSkillTracker()">&#8592; Back</label>
      </div>
      <div id="vp-guidance-panel" style="margin-top:16px;"></div>
    </div>`;
  if (window._vpStatusAnim) clearInterval(window._vpStatusAnim);
  const _sb = document.getElementById('sidebar-desc');
  if (_sb) {
    const _scripture = '”' + pw.scriptureText + '” — ' + pw.scriptureRef;
    const _frames = [
      '▲ ' + pw.skillName + '<br><span style=”color:#888;display:block;margin-top:4px;”>' + _scripture + '</span>',
      '△ ' + pw.skillName + '<br><span style=”color:#888;display:block;margin-top:4px;”>' + _scripture + '</span>'
    ];
    let _f = 0;
    _sb.innerHTML = _frames[0];
    window._vpStatusAnim = setInterval(function() {
      const s = document.getElementById('sidebar-desc');
      if (s) s.innerHTML = _frames[_f++ % 2];
    }, 1200);
  }
};

// ── TASK GUIDANCE ───────────────────────────────────────────────────────────
window.vpShowGuidance = function(pathwayId, taskId) {
  const pw   = vpFindPathwayById(pathwayId);
  const task = pw && pw.tasks.find(t => t.id === taskId);
  if (!task || !task.guidance) return;

  const g       = task.guidance;
  const sec = (title, items, marker) => items && items.length
    ? `<details style="margin-bottom:8px;">
         <summary style="cursor:pointer;font-size:0.85em;border-bottom:1px dotted #808080;">${title}</summary>
         <div style="padding:6px 0 0 8px;">
           ${items.map(item => `<p style="font-size:0.82em;margin:3px 0;">${marker} ${item}</p>`).join('')}
         </div>
       </details>` : '';

  const panel = document.getElementById('vp-guidance-panel');
  if (!panel) return;
  panel.innerHTML = `
    <hr>
    <p style="font-size:0.85em;margin:0 0 6px 0;"><strong>Task Guidance</strong>
      <label class="link-button" style="float:right;font-size:0.75em;cursor:pointer;"
             onclick="document.getElementById('vp-guidance-panel').innerHTML=''">close</label>
    </p>
    <p style="font-size:0.85em;font-style:italic;margin-bottom:8px;">${task.text}</p>
    ${sec('Step-by-Step',    g.howTo,         '-')}
    ${sec('Recommendations', g.recommendations, '+')}
    ${sec('Common Errors',   g.commonErrors,   '!')}
    ${sec('Sources',         g.sources,        '*')}`;
};

// ── HELPERS ─────────────────────────────────────────────────────────────────
function vpGetPathwayProgress(pathwayId) {
  if (!vpPathwayProgress[pathwayId]) vpPathwayProgress[pathwayId] = {};
  return vpPathwayProgress[pathwayId];
}
function vpIsPathwayComplete(pw) {
  const p = vpGetPathwayProgress(pw.id);
  return pw.tasks.every(t => p[t.id] === true);
}
function countCompletedTasks(pw) {
  const p = vpGetPathwayProgress(pw.id);
  return pw.tasks.filter(t => p[t.id] === true).length;
}
function vpFindPathwayById(pathwayId) {
  for (const [si, pathways] of Object.entries(VP_PATHWAYS_DATA)) {
    for (const pw of pathways) {
      if (pw.id === pathwayId)
        return { ...pw, skillIndex: parseInt(si), skillName: VP_SKILL_DATA[si].name };
    }
  }
  return null;
}
function getRecommendedPathways() {
  const out = [];
  vpSkillsData.forEach((skill, i) => {
    if (skill.completed && VP_PATHWAYS_DATA[i]) {
      const isEstimated = vpEstimatedDomains.includes(skill.section);
      let addedForDomain = 0;
      const sorted = [...VP_PATHWAYS_DATA[i]].sort((a, b) => (a.priority || 99) - (b.priority || 99));
      sorted.forEach(pw => {
        if (vpCompletedPathways.includes(pw.id)) return;
        if (skill.score >= pw.scoreThreshold) return;
        if (pw.prerequisites && pw.prerequisites.length > 0)
          if (!pw.prerequisites.every(pid => vpCompletedPathways.includes(pid))) return;
        if (isEstimated && addedForDomain >= 1) return;
        out.push({ ...pw, skillIndex: i, skillName: skill.name, currentScore: skill.score, importance: skill.importance || 1 });
        addedForDomain++;
      });
    }
  });
  // Sort by leverage: importance × 15 + gap from 100. Higher = more urgent to address.
  // This surfaces foundational domains (Time, Spirit) over low-scoring but low-leverage domains.
  return out.sort((a, b) => {
    const pa = a.importance * 15 + (100 - a.currentScore);
    const pb = b.importance * 15 + (100 - b.currentScore);
    if (pa !== pb) return pb - pa;
    return (a.priority || 99) - (b.priority || 99);
  });
}
window.vpToggleTask = function(pathwayId, taskId) {
  if (!vpPathwayProgress[pathwayId]) vpPathwayProgress[pathwayId] = {};
  vpPathwayProgress[pathwayId][taskId] = !vpPathwayProgress[pathwayId][taskId];
  vpSaveToLocal();
  vpShowPathwayDetail(pathwayId);
};
window.vpCompletePathway = function(pathwayId) {
  const pw = vpFindPathwayById(pathwayId);
  if (!pw || !vpIsPathwayComplete(pw)) return;
  vpCompletedPathways.push(pathwayId);
  const oldScore = vpSkillsData[pw.skillIndex].score;
  const newScore = Math.min(100, oldScore + pw.reward);
  vpSkillsData[pw.skillIndex].score = newScore;
  // Check for milestone crossings
  let milestone = null;
  [25, 50, 75, 100].forEach(function(t) {
    const key = pw.skillIndex + '_' + t;
    if (oldScore < t && newScore >= t && !vpMilestonesShown.includes(key)) {
      vpMilestonesShown.push(key);
      milestone = { domain: pw.skillName, threshold: t, data: VP_MILESTONE_DATA[t] };
    }
  });
  vpSaveToLocal();
  window._vpJustCompleted = { skillIndex: pw.skillIndex, reward: pw.reward };
  if (milestone) window._vpMilestone = milestone;
  renderPathwaysNav();
  renderSkillTracker();
  setTimeout(function() {
    const flash = document.getElementById('vp-score-flash');
    if (flash) {
      flash.style.transition = 'color 1s, font-weight 0.5s';
      flash.style.color = 'darkred';
      flash.style.fontWeight = '';
      const arrow = flash.querySelector('span');
      if (arrow) arrow.style.display = 'none';
    }
  }, 2500);
};
