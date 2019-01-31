//DOM Variables
var grid = document.getElementsByClassName("grid-item");
for (var i = 0; i < grid.length; i++) {
    grid[i].addEventListener('click', test, false);
}

var result = document.getElementById("result");
console.log(result);
document.getElementById("new-game-button").addEventListener("click", startNewGame); 

//Game Variables
var allPlayers = ["X", "O"]; 
var currentPlayer = allPlayers[0];
var currentTurnNumber = 0;
var isGameOver = false; 
var gameBoard = {};  

function test() {
  if (!isGameOver){
    var targetElement = event.target || event.srcElement;
    makePlay(targetElement); 
  
    if (didCurrentPlayerWin()){
      result.innerText = currentPlayer + " Wins the Game!"; 
      isGameOver = true; 
    }
    else if (currentTurnNumber == 9){
      result.innerText = "Draw!"; 
      isGameOver = true; 
    }
    else {
      getNextPlayer();  
    }
  }
}

function startNewGame() {
  isGameOver = false; 
  result.innerText = ""; 
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
  if (currentPlayer == allPlayers[0]){
    currentPlayer = allPlayers[1]; 
  }
  else {
    currentPlayer = allPlayers[0]; 
  }
}

function makePlay(targetElement){
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
      var firstSquare = gameBoard["A" + row]; 
      if (firstSquare !== undefined && gameBoard["B" + row] == firstSquare && gameBoard["C" + row] == firstSquare){
        return true; 
      }
    }
    return false;
}

function hasVerticalWin(){
    var columns = ["A", "B", "C"]; 
    for (var colIndex = 0; colIndex <= columns.length; colIndex++) {
      var currentColumn = columns[colIndex]
      var firstSquare = gameBoard[currentColumn + 1]; 
      if (firstSquare !== undefined && gameBoard[currentColumn + 2] == firstSquare && gameBoard[currentColumn + 3] == firstSquare){
        return true; 
      }
    }
    return false; 
}

function hasDiagonalWin(){
    if (gameBoard["A1"] !== undefined && gameBoard["B2"] == gameBoard["A1"] && gameBoard["C3"] == gameBoard["A1"] ||
        gameBoard["C1"] !== undefined && gameBoard["B2"] == gameBoard["C1"] && gameBoard["A3"] == gameBoard["C1"]){
          return true; 
        }
    return false; 
}
  


