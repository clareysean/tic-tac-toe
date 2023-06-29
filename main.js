/*----- state variables -----*/

let winner;
let boardState;
let player;
let isFirstMove;

/*----- cached elements  -----*/

let board = document.querySelector(".board-container");
let squaresArr = [...board.querySelectorAll(".square")];
let gameMessage = document.querySelector(".game-message");
let playAgainBtn = document.querySelector("button");

/*----- event listeners -----*/

board.addEventListener("click", play);

playAgainBtn.addEventListener("click", initializeGame);

/*----- functions -----*/

initializeGame();

function initializeGame() {
  winner = null;
  isFirstMove = true;
  boardState = new Array(squaresArr.length).fill(null);
  gameMessage.innerText = "Click a square to start.";
  gameMessage.style.visibility = "visible";
  updateBoard(boardState);
  player = 1;
}

function play(e) {
  if (winner) return;
  isFirstMove = false;
  let clickedSquare = e.target;
  let clickedSquareIdx = squaresArr.indexOf(clickedSquare);
  if (clickedSquare.innerText) return;
  boardState[clickedSquareIdx] = player === 1 ? "X" : "O";
  winner = checkWinner(boardState);
  player *= -1;
  updateBoard(boardState);
  checkTie(winner, boardState);
}

function updateBoard(state) {
  gameMessage.style.visibility = isFirstMove ? "visible" : "hidden";

  if (winner) {
    gameMessage.style.visibility = "visible";
    gameMessage.innerText = `${winner} WINS!`;
  }
  for (let i = 0; i < squaresArr.length; i++) {
    squaresArr[i].innerText = boardState[i];
  }
}

function checkTie(winner, state) {
  if (!winner && !boardState.includes(null)) {
    gameMessage.style.visibility = "visible";
    gameMessage.innerText = `IT'S A TIE...`;
  }
  return;
}

function checkWinner(state) {
  const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < winningLines.length; i++) {
    const [a, b, c] = winningLines[i];
    if (state[a] && state[a] === state[b] && state[a] === state[c]) {
      return state[a];
    }
  }
  return null;
}
