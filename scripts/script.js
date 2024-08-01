const newGameButton = document.getElementById("new-game-btn");
const rollButton = document.getElementById("roll-dice-btn");
const leftScoreButton = document.getElementById("left-score-btn");

const playerOneScore = document.getElementById("pl-0-score");
const playerTwoScore = document.getElementById("pl-1-score");
const playerOneCurrentScore = document.getElementById("pl-0-current-score");
const playerTwoCurrentScore = document.getElementById("pl-1-current-score");
const diceImage = document.getElementById("dice-img");

const playerOneCard = document.getElementById("pl-0-card");
const playerTwoCard = document.getElementById("pl-1-card");

let playersScores = [0, 0];
let playersCurrentScores = [0, 0];
let currentPlayerId;

const LOST_DICE_ID = 1;

function startNewGame() {
  currentPlayerId = getRandomIntd(0, 1);
  playersScores = [0, 0];
  playersCurrentScores = [0, 0];
  updateUI();

  updatePlayerCardUI();
}

function updateUI() {
  playerOneScore.textContent = playersScores[0];
  playerTwoScore.textContent = playersScores[1];
  playerOneCurrentScore.textContent = playersCurrentScores[0];
  playerTwoCurrentScore.textContent = playersCurrentScores[1];
}

function rollDice() {
  let diceId = getRandomIntd(1, 6);
  diceImage.src = `img/dice${diceId}.png`;

  if (diceId != LOST_DICE_ID) {
    playersCurrentScores[currentPlayerId] += diceId;
  } else {
    playersCurrentScores[currentPlayerId] = 0;
    switchPlayers();
  }

  updateUI();
}

function switchPlayers() {
  playersScores[0] += playersCurrentScores[0];
  playersScores[1] += playersCurrentScores[1];

  playersCurrentScores[currentPlayerId] = 0;

  switch (currentPlayerId) {
    case 0:
      currentPlayerId = 1;
      playerOneCard.classList.remove("pl-current");
      playerTwoCard.classList.add("pl-current");
      break;
    case 1:
      currentPlayerId = 0;
      playerTwoCard.classList.remove("pl-current");
      playerOneCard.classList.add("pl-current");
      break;
  }

  updateUI();
}

function updatePlayerCardUI() {
  switch (currentPlayerId) {
    case 0:
      playerTwoCard.classList.remove("pl-current");
      playerOneCard.classList.add("pl-current");
    case 1:
      playerOneCard.classList.remove("pl-current");
      playerTwoCard.classList.add("pl-current");
      break;
  }
}

function getRandomIntd(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

rollButton.onclick = function () {
  rollDice();
};

newGameButton.onclick = function () {
  startNewGame();
};

leftScoreButton.onclick = function () {
  switchPlayers();
};
