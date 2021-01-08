const scores = document.querySelector("#scores");
const clear = document.querySelector("#clear-scores");

let parsedScores = JSON.parse(localStorage.getItem("highscores"));

for (let i = 0; i < parsedScores.length; i++) {
    const score = document.createElement('div');
    score.classList.add('score');
    score.textContent = parsedScores[i].player + " : " + parsedScores[i].score;
    scores.appendChild(score);
}

clear.addEventListener('click', clearStorage);

function clearStorage() {
    localStorage.clear();
    scores.textContent = '';
}
