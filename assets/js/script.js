// I learned how do do the api request from Benjamin Siegel on https://www.youtube.com/watch?v=SgJ_femmsfg

// window.onload = sendApiRequest;

// async function sendApiRequest() {
//     let response = await fetch(`https://opentdb.com/api.php?amount=1&difficulty=medium&type=multiple`);
    
//     let data = await response.json();
    
//     console.log(data.results[0]);
//     data.results[0]["incorrect_answers"].push(data.results[0]["correct_answer"])
//     console.log(data.results[0]["incorrect_answers"]);
// }


const question = document.body.querySelector("h2");
const check = document.body.querySelector("p");
const displayChoices = document.querySelector('#choices')
const counter = document.body.querySelector("#counter");
const gameWindow = document.querySelector("#content");

let finalScore;
let currentScore = 0;
let secondsLeft = 80;
let index = 0;
let timerId;

start();

function start() {
    setTimer();
    displayQuestion();
}

function setTimer() {
    timerId = setInterval(function () {
        secondsLeft--;
        counter.textContent = secondsLeft;
        if (secondsLeft === 0) {
            saveScore();
        }
    }, 1000);
}

function displayQuestion() {
    const currentQstn = questionsAnswers[index];

    question.textContent = currentQstn["question"];

    displayChoices.textContent = '';
    for (let i = 0; i < currentQstn.choices.length; i++) {
        const choice = document.createElement('div');
        choice.classList.add('choice');
        choice.textContent = currentQstn.choices[i];
        choice.addEventListener('click', validateAnswer);

        displayChoices.appendChild(choice);
    }
}

function validateAnswer() {
    if (this.textContent === questionsAnswers[index].answer) {
        currentScore++;
        check.textContent = "correct";
    } else {
        secondsLeft -= 10;
        check.textContent = "WRONG!";
    }

    index++
    if (index < questionsAnswers.length) {
        displayQuestion()
    } else {
        saveScore()
    }
}

function saveScore() {
    clearInterval(timerId);
    displayChoices.textContent = ''

    finalScore = secondsLeft + currentScore
    check.textContent = "Your Score is " + finalScore;

    const newDiv = document.createElement("div");
    newDiv.classList.add('initials');
    gameWindow.appendChild(newDiv);

    const enterInitials = document.createElement("p");
    enterInitials.textContent = "Enter initials:";
    newDiv.appendChild(enterInitials);

    const initialBox = document.createElement("input");
    newDiv.appendChild(initialBox);

    const submitButton = document.createElement("button");
    submitButton.textContent = "Submit";
    submitButton.addEventListener("click", submitScore)
    newDiv.appendChild(submitButton);
}

function submitScore() {
    const score = {
        player: this.previousSibling.value, // reads the value from enterInitials input
        score: finalScore
    }

    let highscores = getScores();
    highscores.push(score)

    highscores = highscores.sort(function (saved1, saved2) {
        return saved2.score - saved1.score
    })

    if (highscores.length === 5) {
        highscores.pop();
    }

    setScores(highscores);

    window.location.href = "./highscores.html";
}

function setScores(values) {
    localStorage.setItem("highscores", JSON.stringify(values));
}
function getScores() {
    return JSON.parse(localStorage.getItem("highscores")) || [];
}










// window.location.href = "./highscores.html";




