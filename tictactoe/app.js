const Gameboard = (function() {
  let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ];

  const getBoard = () => board;

  const setMark = (row, col, mark) => {
    if (board[row][col] === "") {
      board[row][col] = mark;
    }
  };

  const resetBoard = () => {
    board = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""]
    ];
  };

  const checkWinner = () => {
    // Check rows and columns
    for (let i = 0; i < 3; i++) {
      if (board[i][0] && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
        return board[i][0];
      }
      if (board[0][i] && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
        return board[0][i];
      }
    }

    // Check diagonals
    if (board[0][0] && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
      return board[0][0];
    }
    if (board[0][2] && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
      return board[0][2];
    }

    // Check if board is full (Tie)
    if (board.every(row => row.every(cell => cell !== ""))) {
      return "Tie";
    }

    return null;
  };

  return {
    getBoard,
    setMark,
    resetBoard,
    checkWinner
  };
})();

const Player = (name, mark) => {
  return { name, mark };
};

const Game = (function() {
  let currentPlayer = null;
  let gameOver = false;

  const player1 = Player("Player 1", "X");
  const player2 = Player("Player 2", "O");
  currentPlayer = player1;

  const playTurn = (row, col) => {
    if (!gameOver) {
      Gameboard.setMark(row, col, currentPlayer.mark);
      const winner = Gameboard.checkWinner();

      if (winner) {
        gameOver = true;
        console.log(winner === "Tie" ? "It's a tie!" : `${currentPlayer.name} wins!`);
      } else {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
      }
    } else {
      console.log("Game is over. Please restart!");
    }
  };

  const resetGame = () => {
    Gameboard.resetBoard();
    gameOver = false;
    currentPlayer = player1;
  };

  return {
    playTurn,
    resetGame,
    getCurrentPlayer: () => currentPlayer,
    getGameOver: () => gameOver
  };
})();

const DisplayController = (function() {
  const gameContainer = document.querySelector("#game-container");
  const statusDisplay = document.querySelector("#status");
  const resetButton = document.querySelector("#reset-btn");

  const renderBoard = () => {
    gameContainer.innerHTML = '';  

    const board = Gameboard.getBoard();

    board.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const cellDiv = document.createElement('div');
        cellDiv.classList.add('cell');
        cellDiv.textContent = cell;  
        cellDiv.addEventListener('click', () => handleCellClick(rowIndex, colIndex));
        gameContainer.appendChild(cellDiv); 
      });
    });
  };

  const handleCellClick = (row, col) => {
    if (Gameboard.getBoard()[row][col] === "" && !Game.getGameOver()) {
      Game.playTurn(row, col);
      renderBoard();
      updateStatus();
    }
  };

  const updateStatus = () => {
    const winner = Gameboard.checkWinner();
    if (winner) {
      statusDisplay.textContent = winner === "Tie" ? "It's a tie!" : `${winner} wins!`;
    } else {
      statusDisplay.textContent = `${Game.getCurrentPlayer().name}'s turn`;
    }
  };

  const setupResetButton = () => {
    resetButton.addEventListener('click', () => {
      Game.resetGame();
      renderBoard();
      updateStatus();
    });
  };

  const init = () => {
    renderBoard();
    updateStatus();
    setupResetButton();
  };

  return { init };
})();

document.addEventListener('DOMContentLoaded', () => {
  DisplayController.init();
});
