
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

document.addEventListener("DOMContentLoaded", () => {
  const questionsContainer = document.getElementById("questions");
  const submitButton = document.getElementById("submit");
  const scoreDisplay = document.getElementById("score");

  // Load progress from session storage
  const savedProgress = JSON.parse(sessionStorage.getItem("progress")) || {};

  // Render the questions
  questions.forEach((q, index) => {
    const questionDiv = document.createElement("div");
    questionDiv.classList.add("question");
    questionDiv.innerHTML = `<p>${q.question}</p>`;
    const optionsList = document.createElement("ul");

    q.choices.forEach(choice => {
      const optionItem = document.createElement("li");
      optionItem.classList.add("option");

      // Check if this choice is the saved answer for the question
      const isChecked = savedProgress[`question${index}`] === choice ? 'checked' : '';

      optionItem.innerHTML = `
        <label>
          <input type="radio" name="question${index}" value="${choice}" ${isChecked}>
          ${choice}
        </label>`;
      optionsList.appendChild(optionItem);
    });

    questionDiv.appendChild(optionsList);
    questionsContainer.appendChild(questionDiv);
  });

  // Save progress in session storage
  questionsContainer.addEventListener("change", () => {
    const progress = {};
    document.querySelectorAll('input[type="radio"]:checked').forEach(input => {
      progress[input.name] = input.value;
    });
    sessionStorage.setItem("progress", JSON.stringify(progress));
  });

  // Handle submit button click
  submitButton.addEventListener("click", () => {
    const progress = JSON.parse(sessionStorage.getItem("progress")) || {};
    let score = 0;
    questions.forEach((q, index) => {
      if (progress[`question${index}`] === q.answer) {
        score++;
      }
    });

    // Save score in local storage
    localStorage.setItem("score", score);

    // Display score
    scoreDisplay.textContent = `Your score is ${score} out of 5.`;
  });

  // Display score from local storage if exists
  const savedScore = localStorage.getItem("score");
  if (savedScore !== null) {
    scoreDisplay.textContent = `Your score is ${savedScore} out of 5.`;
  }
});
