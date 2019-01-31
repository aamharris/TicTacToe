//DOM Variables
var grid = document.getElementsByClassName("grid-item");
for (var i = 0; i < grid.length; i++) {
    grid[i].addEventListener('click', playTurn, false);
}

var result = document.getElementById("result");
document.getElementById("new-game-button").addEventListener("click", startNewGame); 

//Game Variables
var allPlayers = ["X", "O"]; 
var currentPlayer = allPlayers[0];
var currentTurnNumber = 0;
var isGameOver = false; 
var gameBoard = {};  

function playTurn() {
  if (!isGameOver){
    var targetElement = event.target || event.srcElement;
    markBoard(targetElement); 
  
    if (didCurrentPlayerWin()){
      endGame(`${currentPlayer} wins the game!`); 
    }
    else if (currentTurnNumber == 9){
      endGame("Draw!");       
    }
    else {
      getNextPlayer();  
    }
  }
}

function endGame(displayMessage){
  result.innerText = displayMessage;
  isGameOver = true; 
  for (var i = 0; i < grid.length; i++) {
    grid[i].classList.remove("hoverable");
  }
}

function startNewGame() {
  isGameOver = false; 
  result.innerText = ""; 
  for (var i = 0; i < grid.length; i++) {
    grid[i].classList.add("hoverable");
  }
  currentTurnNumber = 0; 
  resetGameBoard(); 
}

function resetGameBoard(){
  gameBoard = {
                "A1": undefined, "B1": undefined, "C1": undefined, 
                "A2": undefined, "B2": undefined, "C2": undefined,
                "A3": undefined, "B3": undefined, "C3": undefined
              }; 
              
  for (var i = 0; i < grid.length; i++) {
    grid[i].innerText = "";
  }              
}

function getNextPlayer(){
  currentPlayer == allPlayers[0] ? currentPlayer = allPlayers[1] : currentPlayer = allPlayers[0];
}

function markBoard(targetElement){
   if (gameBoard[targetElement.id] === undefined){
     gameBoard[targetElement.id] = currentPlayer;
     targetElement.innerText = currentPlayer; 
     currentTurnNumber += 1;
   }
}

function didCurrentPlayerWin(){
   if (currentTurnNumber >= 5){
     return hasHorizontalWin() || hasVerticalWin() || hasDiagonalWin(); 
   }
   return false;
}

function hasHorizontalWin(){
    for (var row = 1; row <= 3; row++) {
      if (gameBoard[`A${row}`] === currentPlayer && gameBoard[`B${row}`] === currentPlayer && gameBoard[`C${row}`] === currentPlayer){
        return true; 
      }
    }
    return false;
}

function hasVerticalWin(){
    var columns = ["A", "B", "C"]; 
    for (var i = 0; i <= columns.length; i++) {
      var currentColumn = columns[i]
      if (gameBoard[`${currentColumn}1`] === currentPlayer && gameBoard[`${currentColumn}2`] === currentPlayer && gameBoard[`${currentColumn}3`] === currentPlayer){
        return true; 
      }
    }
    return false; 
}

function hasDiagonalWin(){
    if (gameBoard["A1"] === currentPlayer && gameBoard["B2"] === currentPlayer && gameBoard["C3"] === currentPlayer ||
        gameBoard["C1"] === currentPlayer && gameBoard["B2"] === currentPlayer && gameBoard["A3"] === currentPlayer){
          return true; 
        }
    return false; 
}
  


