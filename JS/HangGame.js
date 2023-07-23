const words = [
  "hangman",
  "javascript",
  "programming",
  "html",
  "computer",
  "hat",
  "cup",
  "cookie",
  "cute",
];
let secretWord;
let displayWord;
let attempts;

function selectRandomWord() {
  // Select a random word from the 'words' array
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
}

function initializeGame() {
  secretWord = selectRandomWord().toLowerCase();
  displayWord = "_".repeat(secretWord.length);
  attempts = 12;
  updateDisplay();
}

function updateDisplay() {
  document.getElementById("word-display").textContent = displayWord;
  document.getElementById("word-length").textContent = secretWord.length;
  document.getElementById("attempts").textContent = attempts;
}

function checkGuess() {
  const guessInput = document.getElementById("guess");
  const guess = guessInput.value.toLowerCase();
  guessInput.value = "";

  if (guess.length !== 1 || !guess.match(/[a-z]/i)) {
    document.getElementById("message").textContent =
      "Please enter a single letter from A to Z.";
    return;
  }

  if (secretWord.includes(guess)) {
    for (let i = 0; i < secretWord.length; i++) {
      if (secretWord[i] === guess) {
        displayWord =
          displayWord.substr(0, i) + guess + displayWord.substr(i + 1);
      }
    }

    if (!displayWord.includes("_")) {
      document.getElementById("message").textContent =
        "Congratulations! You guessed the word!";
      document.getElementById("guess").disabled = true;
    } else {
      document.getElementById("message").textContent = "Correct guess!";
    }
  } else {
    attempts--;
    document.getElementById("message").textContent =
      "Incorrect guess. Try again.";
  }

  if (attempts === 0) {
    document.getElementById("message").textContent =
      "You ran out of attempts. The word was '" + secretWord + "'.";
    document.getElementById("guess").disabled = true;
  }

  updateDisplay();
}

function resetGame() {
  document.getElementById("message").textContent = "";
  document.getElementById("guess").disabled = false;
  initializeGame();
}

initializeGame();
