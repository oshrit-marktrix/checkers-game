let secretNumber, attempts;

function generateSecretNumber() {
  // Generate a random number between 1 and 100
  secretNumber = Math.floor(Math.random() * 100) + 1;
}

function checkGuess() {
  const guessInput = document.getElementById("guess");
  const message = document.getElementById("message");
  const attemptsDisplay = document.getElementById("attempts");

  const guess = parseInt(guessInput.value);

  if (isNaN(guess) || guess < 1 || guess > 100) {
    message.textContent = "Please enter a valid number between 1 and 100.";
  } else {
    attempts++;
    attemptsDisplay.textContent = attempts;

    if (guess === secretNumber) {
      message.textContent = `Congratulations! You guessed the number ${secretNumber} correctly in ${attempts} attempts!`;
    } else if (guess < secretNumber) {
      message.textContent = "Try again. The secret number is higher.";
    } else {
      message.textContent = "Try again. The secret number is lower.";
    }
  }

  guessInput.value = "";
}

function resetGame() {
  attempts = 0;
  document.getElementById("attempts").textContent = attempts;
  document.getElementById("message").textContent = "";
  generateSecretNumber();
}
