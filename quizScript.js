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
    text: "Pick a design you like:",
    options: [
      { label: "Minimalist", score: "minimalist" },
      { label: "Vintage", score: "vintage" },
      { label: "Bold", score: "bold" },
      { label: "Elegant", score: "elegant" },
    ],
  },
  {
    text: "Choose a colour palette that resonates with you vibe:",
    options: [
      { label: "Soft Pastels", score: "minimalist" },
      { label: "Bold and Vibrant", score: "bold" },
      { label: "Neutral Tones", score: "elegant" },
      { label: "Monochromatic", score: "vintage" },
    ],
  },
  {
    text: "Choose what kind of movie you like:",
    options: [
      { label: "Rocky", score: "minimalist" },
      { label: "The Revenant", score: "bold" },
      { label: "Elizabeth the 3rd", score: "vintage" },
      { label: "Love Actually", score: "elegant" },
    ],
  },
];

// #3: Defining Results
const results = {
  minimalist: {
    persona: "The Minimalist",
    description: "You value simplicity and elegance in everything you create.",
  },
  vintage: {
    persona: "The Storyteller",
    description: "Your designs are inspired by the beauty of the past.",
  },
  bold: {
    persona: "The Innovator",
    description: "You love taking risks and creating designs that stand out.",
  },
  elegant: {
    persona: "The Visionary",
    description: "You have a refined eye and create timeless works of art.",
  }
}

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

    // Step 9: Set the inner text of the button to display the label of the current option
    button.innerText = option.label;

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
  personaElement.innerText = results[topScore].persona;
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