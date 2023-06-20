const cells = document.querySelectorAll('.cell');
let isXPlayer = true;

function startGame() {
  isXPlayer = true;
  cells.forEach(cell => {
    cell.textContent = '';
    cell.style.backgroundColor = '';
    cell.addEventListener('click', handleCellClick, { once: true });
  });
}

function handleCellClick(e) {
  const cell = e.target;
  const currentSymbol = isXPlayer ? '😡' : '😍';
  const playerTurnText = document.getElementById('player-turn');

  placeMark(cell, currentSymbol);

  if (checkWin(currentSymbol)) {
    endGame(false);
  } else if (boardFilled()) {
    endGame(true);
  } else {
    isXPlayer = !isXPlayer;
    playerTurnText.textContent = (isXPlayer ? "😡" : "😍") + "'s turn";
  }
}

// End game prompt
function endGame(draw) {
  if (draw) {
    alert('Draw!');
  } else {
    alert(`${isXPlayer ? 'X' : 'O'} Wins!`);
  }
  startGame();
}

function checkWin(symbol) {
    const topLeft = cells[0].textContent;
    const topMiddle = cells[1].textContent;
    const topRight = cells[2].textContent;
    const middleLeft = cells[3].textContent;
    const middleMiddle = cells[4].textContent;
    const middleRight = cells[5].textContent;
    const bottomLeft = cells[6].textContent;
    const bottomMiddle = cells[7].textContent;
    const bottomRight = cells[8].textContent;
  
    // check rows, columns, and diagonals for win condition
    return (
      (topLeft === symbol && topMiddle === symbol && topRight === symbol) ||
      (middleLeft === symbol && middleMiddle === symbol && middleRight === symbol) ||
      (bottomLeft === symbol && bottomMiddle === symbol && bottomRight === symbol) ||
      (topLeft === symbol && middleLeft === symbol && bottomLeft === symbol) ||
      (topMiddle === symbol && middleMiddle === symbol && bottomMiddle === symbol) ||
      (topRight === symbol && middleRight === symbol && bottomRight === symbol) ||
      (topLeft === symbol && middleMiddle === symbol && bottomRight === symbol) ||
      (topRight === symbol && middleMiddle === symbol && bottomLeft === symbol)
    );
  }
  
  function boardFilled() {
    return [...cells].every(cell => cell.textContent !== '');
  }
  
  function placeMark(cell, symbol) {
    cell.textContent = symbol;
  }
  
  startGame();

function playRandomGame() {
  const cellsArray = Array.from(cells);
  
  // Checking for available cells
  while (cellsArray.length > 0 && !checkWin('😡') && !checkWin('😍')) {
    // Will choose a random cell from the array
    const randomCellIndex = Math.floor(Math.random() * cellsArray.length);
    const randomCell = cellsArray[randomCellIndex];

    // "Click" the cell
    placeMark(randomCell, isXPlayer ? '😡' : '😍');
    if (checkWin(isXPlayer ? '😡' : '😍')) {
      endGame(false);
      break;
    } else if (boardFilled()) {
      endGame(true);
      break;
    } else {
      isXPlayer = !isXPlayer;
      const playerTurnText = document.getElementById('player-turn');
      playerTurnText.textContent = (isXPlayer ? "😡" : "😍") + "'s turn";
    }

    // Removes the chosen cell from the array
    cellsArray.splice(randomCellIndex, 1);
  }
}

// The event listener to the "Play Random Game" button
const randomGameButton = document.getElementById('random-game');
randomGameButton.addEventListener('click', playRandomGame);
// The event listener to the "Reset" button
const restartButton = document.getElementById('restart');
restartButton.addEventListener('click', startGame);

