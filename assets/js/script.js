const question = document.body.querySelector("h2");
const choices = Array.from(document.body.querySelectorAll(".choice"));
const check = document.body.querySelector("p");

let secondsLeft = 80;
const counter = document.body.querySelector("#counter");

function setTimer() {
    const timer = setInterval(function() {
        secondsLeft--;
        counter.textContent = secondsLeft;
        if (secondsLeft === 0 || questionsLeft.length === 0) {
            clearInterval(timer);
            saveScore();
        }
    }, 1000);
}

const questionsLeft = [0, 1, 2, 3];

function start() {
    setTimer();
    displayQuestion();
}

let currentQstn = {};
let randNum = 0;
let currentScore = 0;

function displayQuestion() {

    randNum = questionsLeft[Math.floor(Math.random() * questionsLeft.length)];
    
    currentQstn = questionsAnswers[randNum];
    
    question.textContent = currentQstn["question"];

    for (let i = 0; i < choices.length; i++) {
        choices[i].textContent = currentQstn["choice" + i];
    }
}

const answers = document.querySelector(".content");

answers.addEventListener("click", validateAnswer);

function validateAnswer(event) {
    let element = event.target;

    if (element.matches(".choice")) {
        let number = element.getAttribute("data-answer");
        if (number === currentQstn["answer"]) {
            check.textContent = "correct";
            currentScore += 1;
        } else {
            check.textContent = "WRONG!";
            secondsLeft -= 10;
        }
        questionsLeft.splice(questionsLeft.indexOf(randNum), 1);
        if (questionsLeft.length !== 0) {
            displayQuestion();
        }
    }   
}


function saveScore() {
    if (secondsLeft === 0) {
        question.textContent = "Out of time!";
    } else {
        question.textContent = "Great job finishing!";
    }

    for (let i = 0; i < choices.length; i++) {
        choices[i].remove();
    }

    let finalScore = currentScore + secondsLeft;

    check.textContent = "Your Score is " + finalScore;

    const newDiv = document.createElement("div");
    const enterInitials = document.createElement("p");
    const initialBox = document.createElement("input");
    const submitButton = document.createElement("button");

    newDiv.classList.add('initials');

    answers.appendChild(newDiv);
    newDiv.appendChild(enterInitials);
    newDiv.appendChild(initialBox);
    newDiv.appendChild(submitButton);

    enterInitials.textContent = "Enter initials:";

    submitButton.textContent = "Submit";
    
    submitButton.addEventListener("click", submitScore);

    function submitScore(event) {
        event.preventDefault();

        // let playerScore1 = {
        //     player: "",
        //     score: 0
        // }

    
        let getPlayerScore1 = JSON.parse(localStorage.getItem("getPlayerScore1"));
        // let playerScore2 = JSON.parse(localStorage.getItem("playerScore2"));
        console.log(getPlayerScore1);
        // console.log(playerScore2);

        if (getPlayerScore1 === null) {
            console.log("Yes");
            getPlayerScore1 = {
                player: initialBox.value,
                score: finalScore,
            }
            console.log(getPlayerScore1);
            // getPlayerScore1["player"] = initialBox.value;
            // getPlayerScore1["score"] = finalScore;
            localStorage.setItem("getPlayerScore1", JSON.stringify(getPlayerScore1));
        }
        // if (finalScore < playerScore1["score"] || playerScore2 === null) {
        //     playerScore2["player"] = initialBox.value;
        //     playerScore2["score"] = finalScore;
        //     localStorage.setItem("playerScore2", JSON.stringify(playerScore2));
        // }

        // } else if (finalScore < playerScore1["score"] || playerScore2 === null) {
        //     playerScore2["player"] = initialBox.value;
        //     playerScore2["score"] = finalScore;
        //     localStorage.setItem("playerScore2", JSON.stringify(playerScore2));
        // }

        // const playerScore1 = {
        //     player: initialBox.value,
        //     score: finalScore
        // }

        

        // window.location.href = "./highscores.html";

    }

}



start();

// window.location.href = "./highscores.html";


// const answers = document.querySelector(".content");

// answers.addEventListener("click", );

// function validateAnswer(event) {
//     console.log(currentQstn["answer"])
//     let element = event.target;

//     if (element.matches(".choice")) {
//         let number = element.getAttribute("data-answer");
        
//         if (number === currentQstn["answer"]) {
//             check.textContent = "correct";
//             displayQuestion();
//         } else {
//             check.textContent = "WRONG!";
//             displayQuestion();
//         }
//     }

// }


// displayQuestion();

// document.querySelector("#one").onclick = clickElement;
// document.querySelector("#two").onclick = clickElement;
// document.querySelector("#three").onclick = clickElement;
// document.querySelector("#four").onclick = clickElement;

// function clickElement() {
//     if (this.id === currentQstn["answer"]) {
//         check.textContent = "correct";
//         displayQuestion();
//     } else {
//         check.textContent = "WRONG!";
//         displayQuestion();
//     }
// }


// function displayQuestion() {

//     let randNum = questionsLeft[Math.floor(Math.random() * questionsLeft.length)];
//     let currentQstn = questionsAnswers[randNum];

//     questionsLeft.splice(questionsLeft.indexOf(randNum), 1);

//     question.textContent = currentQstn["question"];

//     for (let i = 0; i < choices.length; i++) {
//         choices[i].textContent = currentQstn["choice" + i];
//     }

//     document.querySelector("#one").onclick = clickElement;
//     document.querySelector("#two").onclick = clickElement;
//     document.querySelector("#three").onclick = clickElement;
//     document.querySelector("#four").onclick = clickElement;

//     function clickElement() {
//         if (this.id === currentQstn["answer"]) {
//             check.textContent = "correct";
//             displayQuestion();
//         } else {
//             check.textContent = "WRONG!";
//             displayQuestion();
//         }
//     }


//     if (questionsLeft.length === 0) {
//         window.location.href = "./highscores.html";
//     }

    // let answer = currentQstn["answer"];

    // for (let i = 0; i <= choices.length; i++) {
    //     if (i < choices.length) {
    //         choices[i].addEventListener("click", validateAnswer);
    //     } 
    // }
    
// }

// displayQuestion();

// function validateAnswer() {
//     check.textContent = "correct";
//     displayQuestion();
// }








// console.log(displayQuestion());

// choices[i].addEventListener("click", displayQuestion);



    // else {
    //     window.location.href = "./highscores.html";
    // }


// let i = 0;

// if (i < 4) {
//     console.log("yes");
//     choices[i].addEventListener("click", displayQuestion);
//     i++;
// } else {
//     console.log("no")
//     window.location.href = "./highscores.html";
// }


// do {
//     choices[i].addEventListener("click", displayQuestion);
//     i++;
//     console.log(i);
// }
// while (i < choices.length);
