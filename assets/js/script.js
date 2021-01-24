const question = document.body.querySelector("h2");
const check = document.body.querySelector("p");
const displayChoices = document.querySelector('#choices')
const counter = document.body.querySelector("#counter");
const gameWindow = document.querySelector("#content");


let finalScore = 0;
let secondsLeft = 80;
let timerId;
let currentQstn = {};
let questionCount = 10;


const start = () => {
    setTimer();
    displayQuestion();
}

const setTimer = () => {
    timerId = setInterval(function () {
        counter.textContent = secondsLeft;
        if (secondsLeft === 0) {
            saveScore();
        } else {
            secondsLeft--;
        }
    }, 1000);
}

async function displayQuestion() {
    // I learned how do do the api request from Benjamin Siegel on https://www.youtube.com/watch?v=SgJ_femmsfg

    let response = await fetch(`https://opentdb.com/api.php?amount=1&difficulty=easy&type=multiple`);
    
    let data = await response.json();

    currentQstn = data.results[0];
    
    data.results[0].incorrect_answers.push(data.results[0].correct_answer);

    let options = data.results[0].incorrect_answers;

    let trimmedQuestion = data.results[0].question.replace(/&quot;/g, '"'); // replace the weird things with single and double quotations
    trimmedQuestion = trimmedQuestion.replace(/&#039;/g, "'");
    question.textContent = trimmedQuestion;

    displayChoices.textContent = '';

    let shuffledOptions = shuffle(options); // use an algorithm to shuffle the array of options

    for (let i = 0; i < shuffledOptions.length; i++) {
        const choice = document.createElement('div');
        choice.classList.add('choice');
        
        let trimmedOption = shuffledOptions[i].replace(/&quot;/g, '"');
        trimmedOption = trimmedOption.replace(/&#039;/g, "'");

        choice.textContent = trimmedOption;
        choice.addEventListener('click', validateAnswer);

        displayChoices.appendChild(choice);
        
    }

    questionCount--;
}

// Algorithm from https://gomakethings.com/how-to-shuffle-an-array-with-vanilla-js/
const shuffle = (array) => {

	let currentIndex = array.length;
	let temporaryValue, randomIndex;

	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
};

function validateAnswer() {
    if (this.textContent === currentQstn.correct_answer) {
        finalScore++;
        check.textContent = "Correct!";
    } else {
        secondsLeft -= 10;
        check.textContent = "WRONG!";
    }

    if (questionCount >= 0 && secondsLeft > 0) {
        displayQuestion()
    } else {
        saveScore()
    }
}

const saveScore = () => {
    clearInterval(timerId);
    displayChoices.textContent = ''
    question.textContent = "Quiz over!";

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

    const restartButton = document.createElement("button");
    restartButton.textContent = "Restart";
    restartButton.addEventListener("click", function() {
        window.location.href = "./index.html";
    })
    newDiv.appendChild(restartButton);
}

const setScores = values => localStorage.setItem("highscores", JSON.stringify(values));

const getScores = () => JSON.parse(localStorage.getItem("highscores")) || [];

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


start();