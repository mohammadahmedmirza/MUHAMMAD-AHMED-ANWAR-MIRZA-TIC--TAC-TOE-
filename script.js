document.addEventListener("DOMContentLoaded", () => {
  const board = document.getElementById("board");
  const status = document.getElementById("status");
  const resetBtn = document.getElementById("resetBtn");

  let currentPlayer = "X";
  let gameBoard = ["", "", "", "", "", "", "", "", ""];

  // Create the game board
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.addEventListener("click", () => handleCellClick(i));
    board.appendChild(cell);
  }

  // Handle cell click
  function handleCellClick(index) {
    if (gameBoard[index] === "" && !isGameOver()) {
      gameBoard[index] = currentPlayer;
      updateBoard();
      if (isWinner()) {
        status.textContent = `Player ${currentPlayer} wins!`;
      } else if (isBoardFull()) {
        status.textContent = "It's a draw!";
      } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        status.textContent = `Player ${currentPlayer}'s turn`;
      }
    }
  }

  // Check if a player has won
  function isWinner() {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Columns
      [0, 4, 8],
      [2, 4, 6], // Diagonals
    ];

    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (
        gameBoard[a] !== "" &&
        gameBoard[a] === gameBoard[b] &&
        gameBoard[b] === gameBoard[c]
      ) {
        return true;
      }
    }

    return false;
  }

  // Check if the board is full (draw)
  function isBoardFull() {
    return !gameBoard.includes("");
  }

  // Check if the game is over (either a player has won or it's a draw)
  function isGameOver() {
    return isWinner() || isBoardFull();
  }

  // Update the visual representation of the board
  function updateBoard() {
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell, index) => {
      cell.textContent = gameBoard[index];
    });
  }

  // Reset the game
  function resetGame() {
    currentPlayer = "X";
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    updateBoard();
    status.textContent = "Player X's turn";
  }

  // Event listener for the reset button
  resetBtn.addEventListener("click", resetGame);
});
