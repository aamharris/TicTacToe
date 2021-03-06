//DOM Variables
var isMobile = false;
var grid = document.getElementsByClassName("grid-item");
for (var i = 0; i < grid.length; i++) {
    grid[i].addEventListener('click', playTurn, false);
}

var result = document.getElementById("result");
document.getElementById("new-game-button").addEventListener("click", startNewGame);

if (!!('ontouchstart' in window)) {
    //check for touch device
    //behaviour and events for touch device
    isMobile = true;
    removeHoverEffect();
}

//Game Variables
var currentPlayer = "X";
var currentTurnNumber = 0;
var isGameOver = false;
var gameBoard = {};
var winningRow = [];

function playTurn() {
    const currentSquare = this;
    if (!isGameOver) {
        if (gameBoard[currentSquare.id] === undefined) {
            markBoard(currentSquare);

            if (didCurrentPlayerWin()) {
                endGame(`${currentPlayer} wins the game!`);
            }
            else if (currentTurnNumber == 9) {
                endGame("Draw!");
            }
            else {
                getNextPlayer();
            }
        }
    }
}

function endGame(displayMessage) {
    isGameOver = true;
    result.innerText = displayMessage;
    removeHoverEffect();

    for (var i = 0; i < winningRow.length; i++) {
        document.getElementById(winningRow[i]).children[0].classList.add("winner");
    }
}

function removeHoverEffect() {
    for (var i = 0; i < grid.length; i++) {
        grid[i].classList.remove("hoverable");
    }
}

function startNewGame() {
    isGameOver = false;
    currentPlayer = "X";
    result.innerText = "";
    if (!isMobile) {
        for (var i = 0; i < grid.length; i++) {
            grid[i].classList.add("hoverable");
        }
    }
    currentTurnNumber = 0;
    resetGameBoard();
}

function resetGameBoard() {
    gameBoard = {
        "A1": undefined, "B1": undefined, "C1": undefined,
        "A2": undefined, "B2": undefined, "C2": undefined,
        "A3": undefined, "B3": undefined, "C3": undefined
    };

    for (var i = 0; i < grid.length; i++) {
        grid[i].innerHTML = "";
    }
    winningRow = [];
}

function getNextPlayer() {
    currentPlayer == "X" ? currentPlayer = "O" : currentPlayer = "X";
}

function markBoard(square) {
    if (gameBoard[square.id] === undefined) {
        gameBoard[square.id] = currentPlayer;
        square.innerHTML = `<span class=${currentPlayer}>${currentPlayer}</span>`;
        currentTurnNumber += 1;
    }
}

function didCurrentPlayerWin() {
    if (currentTurnNumber >= 5) {
        return hasHorizontalWin() || hasVerticalWin() || hasDiagonalWin();
    }
    return false;
}

function hasHorizontalWin() {
    for (var row = 1; row <= 3; row++) {
        if (gameBoard[`A${row}`] === currentPlayer && gameBoard[`B${row}`] === currentPlayer && gameBoard[`C${row}`] === currentPlayer) {
            winningRow = [`A${row}`, `B${row}`, `C${row}`];
            return true;
        }
    }
    return false;
}

function hasVerticalWin() {
    var columns = ["A", "B", "C"];
    for (var i = 0; i <= columns.length; i++) {
        var currentColumn = columns[i]
        if (gameBoard[`${currentColumn}1`] === currentPlayer && gameBoard[`${currentColumn}2`] === currentPlayer && gameBoard[`${currentColumn}3`] === currentPlayer) {
            winningRow = [`${currentColumn}1`, `${currentColumn}2`, `${currentColumn}3`];
            return true;
        }
    }
    return false;
}

function hasDiagonalWin() {
    if (gameBoard["A1"] === currentPlayer && gameBoard["B2"] === currentPlayer && gameBoard["C3"] === currentPlayer) {
        winningRow = ["A1", "B2", "C3"];
        return true;
    } else if (gameBoard["C1"] === currentPlayer && gameBoard["B2"] === currentPlayer && gameBoard["A3"] === currentPlayer) {
        winningRow = ["C1", "B2", "A3"];
        return true;
    } else {
        return false;
    }
}