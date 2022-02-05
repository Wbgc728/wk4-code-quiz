// Query Selector Variables
var startButton = document.querySelector("#start-quiz");
var quizQuestions = document.querySelector("#questions");
var quizAnswers = document.querySelector("#answer-choices");




//Timer
var timerElement = document.querySelector("#timer")
var timer;
var timerCount = 30;

function startTimer() {
    timer = setInterval(function () {
        timerCount--;
        timerElement.textContent = timerCount + " seconds left";

        if (timerCount <= 0 || qIndex == questions.length) {
            // Clears interval and stops timer
            clearInterval(timer);
        }
    }, 1000);
}


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
        correctAnswer: 3
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


// Start Timer, disable start button, call questions
function generateQuiz() {
    startTimer();
    startButton.disabled = true;
    generateQuestions();
}

var currentQuestion;
var qIndex = 0;

function generateQuestions() {
    currentQuestion = questions[qIndex];
    quizQuestions.textContent = currentQuestion.question;

    var key = Object.keys(currentQuestion.answers);

    quizAnswers.textContent = "";
    // create buttons based on question answer choices
    for (var i = 0; i < key.length; i++) {
        var answerButton = document.createElement("button")
        answerButton.textContent = currentQuestion.answers[key[i]];
        answerButton.addEventListener("click", userAnswer);
        quizAnswers.appendChild(answerButton);
    }
    qIndex++;
}

// Check is the user selected the right choice
var answerCheck = document.getElementById("answer-check");
var userScore = 0;

function userAnswer(event) {
    userChoice = event.target;
// Display feedback and update score/time if right or wrong
    if (userChoice.textContent === currentQuestion.answers[currentQuestion.correctAnswer]) {
        answerCheck.textContent = "Correct"
        userScore = userScore + 10;
    }
    else {
        answerCheck.textContent = "Wrong";
        timerCount = timerCount - 10;
    }
    // Call next question if available and if time
    if (qIndex < questions.length && timerCount > 0) {
        generateQuestions();
    }
    // if no time or more questions call results function
    else {
        userResults();
    }
}

function userResults() {
    // Hide question and answers
    quizQuestions.style.display = "none"
    quizAnswers.style.display = "none"

    userScore = userScore + timerCount;
// Display current Score and shows initial input form
    var userFinalScore = "Your score: " + userScore;
    document.getElementById("score").textContent = userFinalScore;
    document.getElementById("initial-form").style.visibility = "visible";

    var userScoreSubmit = document.getElementById("submit");
    userScoreSubmit.addEventListener("click", submitScore);
}


//checks local storage,for previous scores and initailizes if none
var userInitials = JSON.parse(localStorage.getItem("initials"));
if (userInitials === null) {
    userInitials = [];
}

var userScoreList = JSON.parse(localStorage.getItem("score"));
if (userScoreList === null) {
    userScoreList = [];
}


// define back and clear buttons
var backButton = document.getElementById("back");
var clearButton = document.getElementById("clear");

// save score to local storage
function submitScore(event) {
    event.preventDefault();

    // rehide form and button
    document.getElementById("initial-form").style.visibility = "hidden";
    answerCheck.textContent = "";

    var userScoreSubmit = document.getElementById("submit");
    userScoreSubmit.style.visibility = "hidden";

    userScoreList.push(userScore);
    localStorage.setItem("score", JSON.stringify(userScoreList));

    var userInitialsInput = document.getElementById("initials");
    userInitials.push(userInitialsInput.value);

    localStorage.setItem("initials", JSON.stringify(userInitials));

    // Clears the initial input value and previous result feedback
    userInitialsInput.value = "";
    answerCheck.textContent = "";


    displayScores();

    // Display scores in the table
    function displayScores() {

        // Show High score table and clear & back buttons
        var highScoreTable = document.getElementById("high-score-table");
        highScoreTable.style.visibility = "visible";

        backButton.style.visibility = "visible";
        clearButton.style.visibility = "visible";

        // for loop that adds a row for each score
        for (let i = 0; i < userInitials.length; i++) {
            var newTableRow = document.createElement("tr");
            newTableRow.classList.add("table-row");
            var tableInitials = document.createElement("td");
            var tableScores = document.createElement("td");

            tableInitials.textContent = userInitials[i];
            tableScores.textContent = userScoreList[i];

            newTableRow.append(tableInitials, tableScores);

            highScoreTable.appendChild(newTableRow);
        }
    }
};



// Event Listenter for start quiz button, back button and clear button
startButton.addEventListener("click", generateQuiz);

backButton.addEventListener("click", function () {
    location.reload();
});

clearButton.addEventListener("click", function () {
    localStorage.clear();
    document.querySelectorAll(".table-row").forEach((element) => element.remove());
});


