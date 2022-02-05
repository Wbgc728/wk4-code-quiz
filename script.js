// Query Selector Variables
var startButton = document.querySelector("#start-quiz");
var quizQuestions = document.querySelector(".questions");
var quizAnswers = document.querySelector(".answer-choices");




//Timer
var timerElement = document.querySelector(".timer")
var timer;
var timerCount = 60;
var currentQ;
var qIndex = 0;

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

    var key = Object.keys(currentQ.answers);

    quizAnswers.innerHTML = "";
    for (var i = 0; i < key.length; i++) {
        var answerButton = document.createElement("button")
        answerButton.textContent = currentQ.answers[key[i]];
        answerButton.addEventListener("click", userAnswer);
        quizAnswers.appendChild(answerButton);
    }
    qIndex++;
}

// Check is the user selected the right choice

var answerCheck = document.getElementsByClassName("answer-check");
var userScore = 0;

function userAnswer(event) {
    userChoice = event.target;

    if (userChoice.textContent === currentQ.answers[currentQ.correctAnswer]) {
        answerCheck.textContent = "Correct"
        userScore = userScore + 10;
    }
    else {
        answerCheck.textContent = "Wrong";
        timerCount = timerCount - 10;
    }
    if (qIndex < questions.length && timerCount > 0) {
        generateQuestions();
    }
    else {
        userResults();
    }
}

function userResults() {
    quizQuestions.style.display = "none"
    quizAnswers.style.display = "none"

    var userFinalScore = "Your score: " + userScore;
    document.getElementsByClassName("score").textContent = userFinalScore;
    document.getElementsById("inital-form").style.visibility = "visible";

    var userScoreSubmit = document.getElementById("submit");
    userScoreSubmit.addEventListener("click", submitScore);
}


// If nothing in user storage, use info in array

var userInitials = JSON.parse(localStorage.getItem("initials"));
if (userInitials === null) {
    userInitials = [];
}

var userScoreList = JSON.parse(localStorage.getItem("score"));
if (userScoreList === null) {
    userScoreList = [];
}

function submitScore(event) {
    event.preventDefault();

    document.getElementsByClassName("initial-form").style.visibility = "hidden";
    answerCheck.textContent = "";

    var userScoreSubmit = document.getElementById("submit");
    userScoreSubmit.style.visibility = "hidden";

    // Set score and initials to local storage, option 1
    userScoreList.push(userScore);
    localStorage.setItem("score", JSON.stringify(userScoreList));

    // Set initials to local storage, option 1
    var userInitialsInput = document.getElementById("initials");
    userInitials.push(userInitialsInput.value);

    localStorage.setItem("initials", JSON.stringify(userInitials));

    // Clears the initial input value
    userInitialsInput.value = "";

    displayScores();

    // Send scores to the table
    function displayScores() {
        // High score table visible
        var visibleTable = document.getElementsByClassName("high-score-table");
        visibleTable.style.visibility = "visible";

        // Create a for loop that creates and append a table row for each high score
        for (let i = 0; i < userInitials.length; i++) {
            var newTableRow = document.createElement("tr");
            newTableRow.classList.add("table-row");
            var tableDataOne = document.createElement("td");
            var tableDataTwo = document.createElement("td");

            tableDataOne.innerHTML = userInitials[i];
            tableDataTwo.innerHTML = userScoreList[i];

            newTableRow.append(tableDataOne, tableDataTwo);

            visibleTable.appendChild(newTableRow);
        }
    }
};



// Event Listenter for start quiz button
startButton.addEventListener("click", generateQuiz);

// resetQuiz.addEventListener("click",function () {
//     location.reload();
// });
