// Query Selector Variables
var startButton = document.querySelector("#start-quiz");
var quizQuestions = document.querySelector(".qustions");
var quizAnswers = document.querySelector(".answer-choices");




//Timer
var timerElement = document.querySelector(".timer")
var timer;
var timerCount = 60;

function startTimer() {
    // Sets timer
    timer = setInterval(function () {
        timerCount--;
        timerElement.textContent = timerCount + "seconds left";

        if (timerCount >= 0) {
            // Clears interval and stops timer
            clearInterval(timer);
        }
        // Tests if time has run out
        if (timerCount === 0) {
            timerElement.textContent = timerCount;
        }
    }, 1000);
}


// Initialize question/answer variables and score
var currentQ;
var qIndex = 0;





// Array of Questions and Answers

var questions = [
    {
        question: "Commonly used date types DO NOT include:",
        answers: {
            1: "strings",
            2: "booleans",
            3: "alerts",
            4: "numbers",
        },
        correctAnswer: 3
    },
    {
        question: "The condition in an if/else statement is enclosed within____",
        answers: {
            1: "quotes",
            2: "curly brackets",
            3: "parenthesis",
            4: "square brackets",
        },
        correctAnswer: 3
    },
    {
        question: "Arrays in JavaScript can be used to store______",
        answers: {
            1: "numbers and strings",
            2: "other arrays",
            3: "booleans",
            4: "all of the above",
        },
        correctAnswer: 4
    },
    {
        question: "String values must be enclosed with _____ when being assigned to variables.",
        answers: {
            1: "commas",
            2: "curly brackets",
            3: "quotes",
            4: "parenthesis",
        },
        correctAnswer: 1
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debuggers is:",
        answers: {
            1: "JavaScript",
            2: "terminal/bash",
            3: "for loops",
            4: "console.log",
        },
        correctAnswer: 4
    }
];


function generateQuiz() {
    startTimer();
    startButton.disabled = true;
    generateQuestions();
}

function generateQuestions() {
    currentQ = questions[qIndex];
    quizQuestions.textContent = currentQ.question;

    var key = object.keys(currentQ.answers);

    quizAnswers.innerHTML = "";
    for (var i = 0; i < key.length; i++) {
        var answerButton = document.createElement("button")
        answerButton.textContent = currentQ.answers[key[i]];
        answerButton.addEventListener("click", userAnswer);
        quizAnswers.appendChild(answerButton);
    }
    qIndex++;
}







// Event Listenter for start quiz button
startButton.addEventListener("click", generateQuiz);
