let gridItems = document.querySelectorAll(".grid-item");
let messageContainer = document.querySelector(".game-status");

let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
let winning = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function cellPlayed(currentItem, itemIndex) {
  gameState[itemIndex] = currentPlayer;
  currentItem.innerHTML = currentPlayer;
}

function changePlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  messageContainer.innerHTML = `It is player ${currentPlayer}'s turn!`;
}

function gamePlay() {
  let roundWon = false;

  for (let i = 0; i < winning.length; i++) {
    let winCombo = winning[i];
    let positionOne = gameState[winCombo[0]];
    let positionTwo = gameState[winCombo[1]];
    let positionThree = gameState[winCombo[2]];

    if (positionOne === "" || positionTwo === "" || positionThree === "") {
      continue;
    }

    if (positionOne === positionTwo && positionTwo === positionThree) {
      roundWon = true;
    }
  }

  // If game won
  if (roundWon) {
    messageContainer.innerHTML = `Player ${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  // If game tie
  let tie = !gameState.includes("");
  if (tie) {
    messageContainer.innerHTML = `Tie game! Want to play another round?`;
    gameActive = false;
    return;
  }

  changePlayer();
}

let handleClick = (e) => {
  let clickedItem = e.target;
  let clickedIndex = parseInt(clickedItem.dataset.index);

  if (gameState[clickedIndex] !== "" || !gameActive) {
    return;
  }

  cellPlayed(clickedItem, clickedIndex);
  gamePlay();
};

gridItems.forEach((gridItem) => {
  gridItem.addEventListener("click", handleClick);
});

let reloadButton = document.querySelector("#restartButton");

function reload() {
  reload = location.reload();
}
reloadButton.addEventListener("click", reload);
