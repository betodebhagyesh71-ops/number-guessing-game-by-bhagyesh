let secretNumber;
let attempts;
let score;

let bestScore = localStorage.getItem("bestScore") || 0;

const guessInput = document.getElementById("guess-input");
const guessButton = document.getElementById("guess-btn");
const newGameButton = document.getElementById("new-game-btn");

const message = document.getElementById("message");
const hintText = document.getElementById("hint-text");

const attemptsDisplay = document.getElementById("attempts");
const scoreDisplay = document.getElementById("score");
const bestScoreDisplay = document.getElementById("best-score");

function startGame() {
  secretNumber = Math.floor(Math.random() * 100) + 1;

  attempts = 10;
  score = 0;

  attemptsDisplay.textContent = attempts;
  scoreDisplay.textContent = score;
  bestScoreDisplay.textContent = bestScore;

  message.textContent = "Make your first guess!";
  message.style.color = "#333";

  hintText.textContent = "Choose a number between 1 and 100";

  guessInput.value = "";
  guessInput.disabled = false;
  guessButton.disabled = false;

  guessInput.focus();
}

function makeGuess() {

  const guess = Number(guessInput.value);

  if (!guess || guess < 1 || guess > 100) {
    message.textContent = "⚠️ Enter a number from 1 to 100.";
    message.style.color = "#e67e22";
    return;
  }

  attempts--;

  attemptsDisplay.textContent = attempts;

  if (guess === secretNumber) {

    score = attempts * 10 + 50;

    scoreDisplay.textContent = score;

    message.textContent = "🎉 You got it!";
    message.style.color = "#27ae60";

    hintText.textContent =
      `The number was ${secretNumber}. Amazing guessing!`;

    document.querySelector(".game-card").classList.add("win");

    if (score > bestScore) {
      bestScore = score;

      localStorage.setItem("bestScore", bestScore);

      bestScoreDisplay.textContent = bestScore;
      hintText.textContent += " 🏆 New Best Score!";
    }

    guessInput.disabled = true;
    guessButton.disabled = true;

    return;
  }

  if (attempts === 0) {

    message.textContent = "💀 Game Over!";
    message.style.color = "#e74c3c";

    hintText.textContent =
      `The number was ${secretNumber}. Try again!`;

    guessInput.disabled = true;
    guessButton.disabled = true;

    return;
  }

  if (guess < secretNumber) {

    message.textContent = "⬆️ Too low!";
    message.style.color = "#667eea";

    hintText.textContent =
      "Try a higher number.";

  } else {

    message.textContent = "⬇️ Too high!";
    message.style.color = "#764ba2";

    hintText.textContent =
      "Try a lower number.";
  }

  guessInput.value = "";
  guessInput.focus();
}

guessButton.addEventListener("click", makeGuess);

newGameButton.addEventListener("click", () => {

  document.querySelector(".game-card").classList.remove("win");

  startGame();

});

guessInput.addEventListener("keydown", (event) => {

  if (event.key === "Enter") {
    makeGuess();
  }

});

startGame();