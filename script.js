// JavaScript code for the quiz

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

const questionsElement = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreElement = document.getElementById("score");

// Function to render questions and choices
function renderQuestions() {
    questionsElement.innerHTML = "";

    questions.forEach((question, index) => {
        const questionDiv = document.createElement("div");
        questionDiv.classList.add("question");

        const questionText = document.createElement("p");
        questionText.textContent = question.question;
        questionDiv.appendChild(questionText);

        question.choices.forEach(choice => {
            const label = document.createElement("label");
            const input = document.createElement("input");

            input.type = "radio";
            input.name = `question-${index}`;
            input.value = choice;

            // Retrieve user selection from sessionStorage
            const savedAnswer = sessionStorage.getItem(`question-${index}`);
            if (savedAnswer === choice) {
                input.checked = true;
            }

            input.addEventListener("change", () => {
                // Save user selection in sessionStorage
                sessionStorage.setItem(`question-${index}`, choice);
            });

            label.appendChild(input);
            label.appendChild(document.createTextNode(choice));
            questionDiv.appendChild(label);
        });

        questionsElement.appendChild(questionDiv);
    });
}

// Function to calculate and display the score
function calculateScore() {
    let score = 0;

    questions.forEach((question, index) => {
        const selectedAnswer = sessionStorage.getItem(`question-${index}`);
        if (selectedAnswer === question.answer) {
            score++;
        }
    });

    // Store the score in localStorage
    localStorage.setItem("score", score);

    // Display the score
    scoreElement.textContent = `Your score is ${score} out of ${questions.length}.`;
}

// Event listener for the submit button
submitButton.addEventListener("click", () => {
    calculateScore();
    sessionStorage.clear(); // Clear progress after submission
});

// Initial rendering of the quiz
renderQuestions();

// Display the score if it exists in localStorage
const storedScore = localStorage.getItem("score");
if (storedScore !== null) {
    scoreElement.textContent = `Your last score was ${storedScore} out of ${questions.length}.`;
}
