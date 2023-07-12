var currentQuestion;
var startButton = document.getElementById("start-Button");
var choicesList = document.getElementById("choices");
var timeLeft = document.getElementById("time-left");
var initialsInput = document.getElementById("initials");
var saveButton = document.getElementById("save-button");
var questionHeader = document.getElementById("question");
var score = 0;
var timeInterval;
var currentIndex = 0;
var quizData = [
  {
    question: "Who Invented JavaScript?",
    choices: ["Douglas Crockford", "Sheryl Sandberg", "Brendan Eich", "Scooby Doo"],
    correctAnswer: "Brendan Eich"
  },
  {
    question: "Which one of these is a JavaScript package manager?",
    choices: ["Node.js", "TypeScript", "npm", "CSS"],
    correctAnswer: "npm"
  }
];

startButton.addEventListener("click", startQuiz);

function startQuiz() {
  startButton.parentElement.classList.add("hide");
  questionContainer.classList.remove("hide");
  startTimer();
  setQuestion();
}

function setQuestion() {
  if (currentIndex < quizData.length) {
    currentQuestion = quizData[currentIndex];
    questionHeader.textContent = currentQuestion.question;
    choicesList.innerHTML = ""; 

    for (var i = 0; i < currentQuestion.choices.length; i++) {
      var newLi = document.createElement("li");
      newLi.classList.add("questionAnswer");
      newLi.textContent = currentQuestion.choices[i];
      choicesList.appendChild(newLi);
    }

    currentIndex++; 
  } else {
    endQuiz();
  }
}

choicesList.addEventListener("click", checkAnswer);

function checkAnswer(event) {
  var selectedChoice = event.target.textContent;

  if (selectedChoice === currentQuestion.correctAnswer) {
    score++;
  } else {
    timeLeft.textContent = parseInt(timeLeft.textContent) - 5; 
  }

  setQuestion();
}

function startTimer() {
  var timeLeftValue = 30;
  timeLeft.textContent = timeLeftValue;

  timeInterval = setInterval(function () {
    timeLeftValue--;
    timeLeft.textContent = timeLeftValue;

    if (timeLeftValue <= 0) {
      clearInterval(timeInterval);
      endQuiz();
    }
  }, 1000);
}

function endQuiz() {
  clearInterval(timeInterval);
  questionContainer.classList.add("hide");
  saveButton.addEventListener("click", saveScore);
  document.getElementById("final-score").textContent = score;
  document.getElementById("end-screen").classList.remove("hide");
}

function saveScore(event) {
  event.preventDefault();

  var initials = initialsInput.value;
  window.localStorage.setItem("initials", initials);
  console.log("Initials: " + initials + ", Score: " + score);
}
