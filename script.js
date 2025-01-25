// #1: Selecting DOM elements 
const landingPage = document.getElementById('landing');
const quizPage = document.getElementById('quiz');
const resultsPage = document.getElementById('results');
const startQuizButton = document.getElementById('startQuiz');
const restartQuizButton = document.getElementById('restartQuiz');
const personaElement = document.getElementById('persona');
const descriptionElement = document.getElementById('description');
const progressBar = document.querySelector('.progress');

// #2: Defining my quiz questions
const questions = [
  {
    text: "It’s Friday night. Tell me, what’s your game plan? 🌙",
    options: [
      { label: "Hit the bars", score: "rideOrDie" },
      { label: "Stay home, chill", score: "chillPhilosopher" },
      { label: "Go with the flow", score: "hypeBro" },
      { label: "Find live music", score: "wildCard" },
    ],
  },
  {
    text: "What’s your go-to workout vibe? 💪",
    options: [
      { label: "Yoga and zen", score: "chillPhilosopher" },
      { label: "Group fitness", score: "hypeBro" },
      { label: "Hiking/Running trails", score: "wildCard" },
      { label: "Heavy lifting", score: "rideOrDie" },
    ],
  },
  {
    text: "For a bet? What’s your move? 🎰",
    options: [
      { label: "I’m winning this", score: "hypeBro" },
      { label: "Double or nothing", score: "rideOrDie" },
      { label: "Stack the odds", score: "chillPhilosopher" },
      { label: "Only for laughs", score: "wildCard" },
    ],
  },
  {
    text: "Your buddy calls at 3 a.m. 📱 What’s your move?",
    options: [
      { label: "I’m on my way", score: "rideOrDie" },
      { label: "Uber a solution", score: "chillPhilosopher" },
      { label: "Help, then scold", score: "hypeBro" },
      { label: "Call back later", score: "wildCard" },
    ],
  },
  {
    text: "What’s your idea of ‘cool’? 😎",
    options: [
      { label: "Break the rules", score: "wildCard" },
      { label: "Quiet confidence", score: "chillPhilosopher" },
      { label: "Style and charm", score: "hypeBro" },
      { label: "Be yourself", score: "rideOrDie" },
    ],
  },
  {
    text: "At a party 🎉, you are…",
    options: [
      { label: "On the dance floor", score: "hypeBro" },
      { label: "Deep in convo", score: "chillPhilosopher" },
      { label: "Stargazing outside", score: "wildCard" },
      { label: "Hosting the fun", score: "rideOrDie" },
    ],
  },
  {
    text: "So, what’s your style vibe? 👟",
    options: [
      { label: "Comfort first", score: "rideOrDie" },
      { label: "Clean and sharp", score: "chillPhilosopher" },
      { label: "Bold statements", score: "hypeBro" },
      { label: "Whatever works", score: "wildCard" },
    ],
  },
  {
    text: "Meeting new people 🤝, you are…",
    options: [
      { label: "Mysterious", score: "wildCard" },
      { label: "Low-key", score: "chillPhilosopher" },
      { label: "Confident", score: "hypeBro" },
      { label: "Approachable", score: "rideOrDie" },
    ],
  },
];

// #3: Defining Results
const results = {
  rideOrDie: {
    persona: "The Ride-or-Die Bro",
    description: "You’re the foundation of any crew—the guy who shows up when it matters most.\n\nLoyalty is your trademark, and you take pride in being the friend everyone can count on.\n\nYou thrive on camaraderie and never shy away from taking the lead when things need fixing.\n\nBut just remember bro, it’s okay to lean on others too.\n\nYou’re only human.",
  },
  chillPhilosopher: {
    persona: "The Chill Philosopher Bro",
    description: "You’re the guy with a laid-back approach to life, valuing peace and deep conversations over chaos and noise.\n\nPeople gravitate to your steady energy and appreciate your ability to find meaning in the mundane.\n\nYou’re the type to suggest a road trip just to 'figure things out' or to lose track of time watching the stars.\n\nBut don't forget to stay grounded, and let loose now and then.",
  },
  hypeBro: {
    persona: "The Hype Bro",
    description: "You’re all about energy, fun, and keeping the good times rolling.\n\nWhen you’re around, there’s never a dull moment.\n\nYou thrive on spontaneity and know how to light up a room with your presence.\n\nBut just remember, bro, not every moment needs to be high-octane,\n\nit's sometimes good to stay calm and cool, let the world catch up to you.",
  },
  wildCard: {
    persona: "The Wild Card Bro",
    description: "You defy expectations at every turn.\n\nYou live life as one unpredictable adventure after another.\n\nWhether it’s spontaneous plans or unorthodox solutions, you keep people on their toes.\n\nPeople love your unconventional approach to life. But sometimes, bro, a little stability isn’t a bad thing.\n\nEmbrace your chaos, but keep it balanced.",
  },
};

// #4: Track the quiz state
let currentQuestionIndex = 0; // This tracks the current question
let scores = {}; // Tracks the selected score

// #5: Helper Functions
/** Function to show a specific section and hide all others, 
 * it ensures only one section (landing, quiz, or results) 
is visible at a time.  */
function showSection(sectionId) {
  // Hide the landing page by adding the 'hidden' class
  landingPage.classList.add('hidden');
  console.log('Landing Page Classes:', landingPage.classList);
  // Hide the quiz page by adding the 'hidden' class
  quizPage.classList.add('hidden');

  // Hides the results page by adding the 'hidden' class
  resultsPage.classList.add('hidden');

  // Show the target section by removing the 'hidden' class
  // This makes the specified section visible
  document.getElementById(sectionId).classList.remove('hidden');

  // Debugging the showSection as the landing page was not hidden after start quiz button clicked. 
  // Fixed it by adding !important to .hidden class in CSS. 
  // console.log('Landing Page Hidden:', landingPage.classList.contains('hidden'));
  // console.log('Quiz Page Hidden:', quizPage.classList.contains('hidden'));
  // console.log('Results Page Hidden:', resultsPage.classList.contains('hidden'));
}

function updateProgressBar() {
  // Calculate progress as a percentage 
  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;

  // Update the width of the progress bar 
  progressBar.style.width = `${progressPercentage}%`; // 30 mins debugging - Was missing the % 

  // Debugging process
  // console.log(`Progress: ${progressPercentage}%`);
  // console.log(`Current Index: ${currentQuestionIndex}, Progress: ${progressPercentage}%`);
  // console.log(document.querySelector('.progress')); 
};

// Function to render the current question and its answers
function renderQuestion() {
  // Step 1: Get the current question object using the currentQuestionIndex
  const question = questions[currentQuestionIndex];

  // Step 2: Select the main question container where the question and answers will be displayed
  const questionContainer = document.querySelector('#questions .question');

  // Step 3: Select the container for the answer buttons within the question container 
  const answersContainer = questionContainer.querySelector('.answers');

  // Step 4: Update the text of the <h2> element in the question container to show the current text
  questionContainer.querySelector('h2').innerText = question.text;

  // Step 5: Clear any old answers from the answers container to avoid duplicating buttons
  answersContainer.innerHTML = '';

  // Create answer buttons
  // Step 6: Loop through each option in the current question's options array
  question.options.forEach((option) => {
    // Step 7: Create a new <button> element for the answer option
    const button = document.createElement('button');

    // Step 8: Add the 'answer' class to the button for styling purposes
    button.classList.add('answer');
    // Add a span inside the button for text
    const span = document.createElement('span');
    // Step 9: Set the inner text for the span to display the label/question of the current option
    span.innerText = option.label;

    // Append the span to the button
    button.appendChild(span);

    // Handle answer click
    button.addEventListener('click', () => {
      scores[option.score] = (scores[option.score] || 0) + 1;

      // Move to next question or show results 
      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) {
        renderQuestion();
      } else {
        showResults();
      }
    });
    // Step 9: Append the button to the answers container
    answersContainer.appendChild(button);
  });

  // Update the progress bar
  updateProgressBar();
};

// Show the results page
function showResults() {
  // Step 1: Determine the highest score
  // - Object.keys(scores) retrieves all the keys (e.g., "minimalist", "vintage") from the scores object.
  // - The .reduce() function iterates through these keys to find the one with the highest score. 
  // - For each pair of keys (a, b), scores[a] and scores[b] are compared.
  // - The key with the highest score is returned as the topScore.
  const topScore = Object.keys(scores).reduce((a, b) =>
    scores[a] > scores[b] ? a : b);

  // Update the results section 
  const personaName = results[topScore].persona;
  personaElement.innerText = `"${personaName}"`; // Wrapping in quotes
  descriptionElement.innerText = results[topScore].description;

  // Show the results page
  showSection('results');
};

// Restart the quiz
function restartQuiz() {
  currentQuestionIndex = 0;
  scores = {}; // Reset scores
  showSection('landing'); // Show the landing page
}

// #6: Adding Event Listeners
startQuizButton.addEventListener('click', () => {
  showSection('quiz'); // Start the quiz
  renderQuestion(); // Render the first question
});

restartQuizButton.addEventListener('click', restartQuiz);