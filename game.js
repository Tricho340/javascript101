"use strict";

// var prompt = require("sync-prompt").prompt;

var hb = hb ? hb : {};
hb.tictactoe = hb.tictactoe ? hb.tictactoe : {};

hb.tictactoe = function() {
  this.PLAYER_1_CHARACTER = 'X';
  this.PLAYER_2_CHARACTER = 'O';
  this.BOARD_NUMBER_OF_ROWS = 3;
  this.BOARD_NUMBER_OF_COLUMNS = 3;
  this.MAX_NUMBER_OF_MOVES = this.BOARD_NUMBER_OF_COLUMNS * this.BOARD_NUMBER_OF_ROWS;
  this.movesLeft = this.MAX_NUMBER_OF_MOVES;
  this.player1Name = "player1";
  this.player2Name = "player2";
  this.latestPlayerCharacter = this.PLAYER_1_CHARACTER;

  this.board = [];
};

hb.tictactoe.prototype.toggleLastPlayerCharacter = function() {
  if (this.latestPlayerCharacter === this.PLAYER_1_CHARACTER) {
    this.latestPlayerCharacter = this.PLAYER_2_CHARACTER;
  } else {
    this.latestPlayerCharacter = this.PLAYER_1_CHARACTER;
  }
};

hb.tictactoe.prototype.printBoard = function() {
  // keep in mind that this is poorly-written JavaScript code
  // we will learn not to use for loops in JavaScript
  var that = this;
  this.board.map(function(currentRowData, currentRowIndex) {
    that.printRow(currentRowData);
  });
};

hb.tictactoe.prototype.printRow = function(rowData) {
    console.log(rowData.join(""));
};

hb.tictactoe.prototype.initializePlayerNames = function() {
  this.player1Name = this.requestPlayerName(1);
  this.player2Name = this.requestPlayerName(2);
};

hb.tictactoe.prototype.requestPlayerName = function(playerNumber) {
  var playerName = prompt("Please enter player " + playerNumber + " name: ");
  return playerName;
};

hb.tictactoe.prototype.isFieldEmpty = function(fieldX, fieldY) {
  var fieldValue = this.board[fieldY][fieldX];
  var isEmpty = ((fieldValue !== this.PLAYER_1_CHARACTER) || (fieldValue !== this.PLAYER_2_CHARACTER));

  return isEmpty;
};

hb.tictactoe.prototype.isMoveValid = function(moveString) {
  var moveStringParts = moveString.split(" ");
  var moveX = parseInt(moveStringParts[0], 10);
  var moveY = parseInt(moveStringParts[1], 10);
  var isMoveXValid = (moveX < this.BOARD_NUMBER_OF_COLUMNS);
  var isMoveYValid = (moveY < this.BOARD_NUMBER_OF_ROWS);
  var isMoveValidInTermsOfBoundaries = (isMoveXValid || isMoveYValid);
  console.log("move valid in terms of boundaries: ", isMoveValidInTermsOfBoundaries, "number of cols: ", this.BOARD_NUMBER_OF_COLUMNS);
  if (isMoveValidInTermsOfBoundaries) {
    var isFieldEmpty = this.isFieldEmpty(moveX, moveY);
    return isFieldEmpty;
  }

  return false;
};

hb.tictactoe.prototype.isRowWin = function(playerCharacter) {
  var that = this;
  this.board.map(function(currentRowData, currentRowIndex) {
    var isRowWonByCharacterIndeed = that.isRowWonByCharacter(currentRowData, playerCharacter);
    if (isRowWonByCharacterIndeed) {
      return true;
    }
  });

  return false;
};

hb.tictactoe.prototype.isColumnIndexWin = function(playerCharacter, columnIndex) {
    var isValid = true;
    this.board.map(function(currentRowData, currentRowIndex) {
      var currentValue = currentRowData[columnIndex];
      if (currentValue !== playerCharacter) {
        isValid = false;
      }
    });

    return isValid;
};

hb.tictactoe.prototype.isColumnWin = function(playerCharacter) {
  var c = 0;
  for (c; c < this.BOARD_NUMBER_OF_COLUMNS; c++) {
    var isCurrentColumnWin = this.isColumnIndexWin(playerCharacter, c);
    if (isCurrentColumnWin) {
      return true;
    }
  }

  return false;
};

hb.tictactoe.prototype.isForwardDiagonalWin = function(playerCharacter) {
  var isWin = true;
  this.board.map(function(currentRowData, currentRowIndex) {
    if (currentRowData[currentRowIndex] !== playerCharacter) {
      isWin = false;
    }
  });

  return isWin;
};

hb.tictactoe.prototype.isBackwardDiagonalWin = function(playerCharacter) {
  var that = this;
  var isWin = true;
  this.board.map(function(currentRowData, currentRowIndex) {
    var columnIndex = that.BOARD_NUMBER_OF_COLUMNS - currentRowIndex;
    if (currentRowData[columnIndex] !== playerCharacter) {
      isWin = false;
    }
  });

  return isWin;
};

hb.tictactoe.prototype.isDiagonalWin = function(playerCharacter) {
  var isForwardDiagonalWonIndeed = this.isForwardDiagonalWin(playerCharacter);
  var isBackwardDiagonalWonIndeed = this.isBackwardDiagonalWin(playerCharacter);
  console.log("win by forward diagonal: ", isForwardDiagonalWonIndeed, "win by backward diagonal: ", isBackwardDiagonalWonIndeed);
  var isDiagonalWon = isForwardDiagonalWonIndeed || isBackwardDiagonalWonIndeed;

  return isDiagonalWon;
};

hb.tictactoe.prototype.isPlayerWin = function(playerCharacter) {
  var hasPlayerWonByStraightRows = this.isRowWin(playerCharacter);
  var hasPlayerWonByStraightColumns = this.isColumnWin(playerCharacter);
  var hasPlayerWonByDiagonal = this.isDiagonalWin(playerCharacter);
  var isWin = hasPlayerWonByDiagonal || hasPlayerWonByStraightRows || hasPlayerWonByStraightColumns;
  console.log("win by straightrows: ", hasPlayerWonByStraightRows, "win by straightcolumns: ", hasPlayerWonByStraightColumns, "win by diagonals: ", hasPlayerWonByDiagonal, "is win: ", isWin);
  return isWin;
};

hb.tictactoe.prototype.isRowWonByCharacter = function(rowData, character) {
  var r = 0;
  var numberOfFieldsOnRow = rowData.length;
  for (r; r < numberOfFieldsOnRow; r++) {
    var currentFieldValue = rowData[r];
    var isCurrentFieldValueTheCharacter = (currentFieldValue === character);
    if (!isCurrentFieldValueTheCharacter) {
      return false;
    }
  }

  return true;
};

hb.tictactoe.prototype.isPlayerOneWin = function() {
  var hasThePlayerWon = this.isPlayerWin(this.PLAYER_1_CHARACTER);
  return hasThePlayerWon;
};

hb.tictactoe.prototype.isPlayerTwoWin = function() {
  var hasThePlayerWon = this.isPlayerWin(this.PLAYER_2_CHARACTER);
  return hasThePlayerWon;
};

hb.tictactoe.prototype.handlePlayer1WinIfNecessary = function() {
  var hasPlayerOneWon = this.isPlayerOneWin();
  console.log("hasPlayerOneWon", hasPlayerOneWon);
  if (hasPlayerOneWon) {
    // act accordingly
    console.log("Player 1 won, bro.");
  }
};

hb.tictactoe.prototype.handlePlayer2WinIfNecessary = function() {
  var hasPlayerTwoWon = this.isPlayerTwoWin();
  console.log("hasPlayerTwoWon", hasPlayerTwoWon);
  if (hasPlayerTwoWon) {
    // act accordingly
    console.log("Player 2 won, bro.");
  }
};

// deadend = no more moves and neither player wins
hb.tictactoe.prototype.handleGameDeadendIfNecessary = function() {
  var isGameDeadendIndeed = this.isGameDeadend();
  if (isGameDeadendIndeed) {
    console.log("Neither player wins. Better luck next time.");
  }
};

hb.tictactoe.prototype.isGameDeadend = function() {
  var isGameDeadendIndeed = (this.movesLeft === 0);
  return isGameDeadendIndeed;
};

hb.tictactoe.prototype.checkGameState = function() {
  // 4 possibilities: either player 1 wins, or player 2 wins, or game is deadend or still got moves to go
  if (!this.isGameOver()) {
    this.promptForNextMove();
  }
  this.handlePlayer1WinIfNecessary();
  this.handlePlayer2WinIfNecessary();
  this.handleGameDeadendIfNecessary();
};

hb.tictactoe.prototype.isGameOver = function() {
    var hasPlayerOneWon = this.isPlayerOneWin();
    var hasPlayerTwoWon = this.isPlayerTwoWin();
    var isItDeadend = this.isGameDeadend();

    var isItOver = (hasPlayerOneWon || hasPlayerTwoWon || isItDeadend);

    return isItOver;
};

hb.tictactoe.prototype.setBoardCellFromMove = function(moveString, playerCharacter) {
  var moveStringParts = moveString.split(" ");
  var moveX = parseInt(moveStringParts[0], 10);
  var moveY = parseInt(moveStringParts[1], 10);
  this.movesLeft--;
  this.board[moveX][moveY] = playerCharacter;
  console.log("Moved successfully and feeling happy now.");
};

hb.tictactoe.prototype.promptForNextMove = function() {
 this.printBoard();
 var moveString = prompt("x y>");
 var isMoveValidIndeed = this.isMoveValid(moveString);
 if (isMoveValidIndeed) {
  this.setBoardCellFromMove(moveString, this.latestPlayerCharacter);
  this.checkGameState();
  this.toggleLastPlayerCharacter();
 } else {
   console.log("Invalid move, bro.");
   this.printBoard();
 }
  this.promptForNextMove();
};

// entry point for the game
hb.tictactoe.prototype.startNewGame = function() {
  this.board = [ ["*", "*", "*"],
              ["*", "*", "*"],
              ["*", "*", "*"] ];
  console.log("This is the current state of the board:");
  this.promptForNextMove();
};

var theGame = new hb.tictactoe();
theGame.startNewGame();
