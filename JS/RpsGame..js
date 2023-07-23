function computerPlay() {
  // Randomly choose rock, paper, or scissors for the computer
  const moves = ["rock", "paper", "scissors"];
  const randomIndex = Math.floor(Math.random() * moves.length);
  return moves[randomIndex];
}

function play(playerMove) {
  const computerMove = computerPlay();
  const resultDisplay = document.getElementById("result");

  if (playerMove === computerMove) {
    resultDisplay.textContent = `It's a tie! Both chose ${playerMove}.`;
  } else if (
    (playerMove === "rock" && computerMove === "scissors") ||
    (playerMove === "paper" && computerMove === "rock") ||
    (playerMove === "scissors" && computerMove === "paper")
  ) {
    resultDisplay.textContent = `You win! ${playerMove} beats ${computerMove}.`;
  } else {
    resultDisplay.textContent = `You lose! ${computerMove} beats ${playerMove}.`;
  }
}

function resetGame() {
  document.getElementById("result").textContent = "";
}
