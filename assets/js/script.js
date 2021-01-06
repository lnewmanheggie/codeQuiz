let questionsAnswers = [

    {
        question: "a question here",
        choice0: "choice1",
        choice1: "choice2",
        choice2: "choice3",
        choice3: "choice4",
        answer: "two"
    },
    {
        question: "another question here",
        choice0: "choice21",
        choice1: "choice22",
        choice2: "choice23",
        choice3: "choice24",
        answer: "three"
    },
    {
        question: "a dumb question here",
        choice0: "choice31",
        choice1: "choice32",
        choice2: "choice33",
        choice3: "choice34",
        answer: "four"
    },
    {
        question: "a really stupid question here",
        choice0: "choice41",
        choice1: "choice42",
        choice2: "choice43",
        choice3: "choice44",
        answer: "one"
    }

]

const question = document.body.querySelector("h2");
const choices = Array.from(document.body.querySelectorAll(".choice"));
const check = document.body.querySelector("p");

const questionsLeft = [0, 1, 2, 3];

function displayQuestion() {

    //Generate random question with random number
    let randNum = questionsLeft[Math.floor(Math.random() * questionsLeft.length)];
    let currentQstn = questionsAnswers[randNum];

    // remove the random number in the questionsLeft array
    questionsLeft.splice(questionsLeft.indexOf(randNum), 1);

    question.textContent = currentQstn["question"];

    for (let i = 0; i < choices.length; i++) {
        choices[i].textContent = currentQstn["choice" + i];
    }

    document.querySelector("#one").onclick = clickElement;
    document.querySelector("#two").onclick = clickElement;
    document.querySelector("#three").onclick = clickElement;
    document.querySelector("#four").onclick = clickElement;

    function clickElement() {
        if (this.id === currentQstn["answer"]) {
            check.textContent = "correct";
            displayQuestion();
        } else {
            check.textContent = "WRONG!";
            displayQuestion();
        }
    }


    if (questionsLeft.length === 0) {
        window.location.href = "./highscores.html";
    }

    // let answer = currentQstn["answer"];

    // for (let i = 0; i <= choices.length; i++) {
    //     if (i < choices.length) {
    //         choices[i].addEventListener("click", validateAnswer);
    //     } 
    // }
    
}

displayQuestion();

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














