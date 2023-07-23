let score = 0;
let cardsFlipped = 0;
let firstCard, secondCard;
let lockBoard = false;
let timer;
let seconds = 0;

const cards = [
  "🐶",
  "🐱",
  "🐭",
  "🐹",
  "🐰",
  "🦊",
  "🐻",
  "🐼",
  "🐨",
  "🐯",
  "🦁",
  "🐮",
  "🐷",
  "🐸",
  "🐵",
  "🐔",
];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createCard(card) {
  const cardElement = document.createElement("div");
  cardElement.classList.add("card");
  cardElement.dataset.card = card; // Store the card value in a data attribute
  cardElement.textContent = card;
  cardElement.addEventListener("click", flipCard);
  return cardElement;
}

function createBoard() {
  const gameBoard = document.getElementById("game-board");
  cardsFlipped = 0;
  score = 0;
  seconds = 0;
  clearInterval(timer);
  document.getElementById("score").textContent = score;
  document.getElementById("timer").textContent = seconds;

  const shuffledCards = shuffle(cards.concat(cards));
  gameBoard.innerHTML = "";
  shuffledCards.forEach((card) => {
    const cardElement = createCard(card);
    gameBoard.appendChild(cardElement);
  });
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");

  if (!firstCard) {
    firstCard = this;
  } else {
    secondCard = this;
    checkForMatch();
  }
}

function checkForMatch() {
  let isMatch = firstCard.dataset.card === secondCard.dataset.card;
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  score++;
  document.getElementById("score").textContent = score;

  cardsFlipped += 2;
  if (cardsFlipped === cards.length * 2) {
    clearInterval(timer);
    alert(`Congratulations! You won in ${seconds} seconds.`);
  }

  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

function startGame() {
  createBoard();
  timer = setInterval(() => {
    seconds++;
    document.getElementById("timer").textContent = seconds;
  }, 1000);
}

// Initialize the game
document.addEventListener("DOMContentLoaded", () => {
  createBoard();
});
