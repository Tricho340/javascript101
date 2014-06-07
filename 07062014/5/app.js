"use strict";

$(document).ready(function() {
  var MAX_NUMBER_POSSIBLE = 1000000;
  var latestRandomNumber;
  var inputtedDigit = "";


  var getRandomNumber = function(maxNumberPossible) {
    var randomMultiplier = Math.random();
    return Math.floor(maxNumberPossible * randomMultiplier).toString();
  };

  var updateRandomNumber = function() {
    latestRandomNumber = getRandomNumber(MAX_NUMBER_POSSIBLE);
    $('#randomNumber').text(latestRandomNumber);
  };

  var $numberButtonsContainer = $('#numberButtonsContainer');
  var $numberButtons = $numberButtonsContainer.find('button.btn-lg:not(.btn-warning)');
  var $clearLastButton = $numberButtonsContainer.find('button.btn-warning');
  $clearLastButton.on('click', function() {
    var digitCharacters = inputtedDigit.split("");
    digitCharacters.pop();
    console.log("inputted digit: ", digitCharacters);
    inputtedDigit = digitCharacters.join("");
    $('#numberInputtedSoFar').text(inputtedDigit);
  });

  $numberButtons.on('click', function() {
    var selectedDigit = $(this).text();
    inputtedDigit += selectedDigit;
    $('#numberInputtedSoFar').text(inputtedDigit);
    checkWhetherPlayerWins();
  });

  var startNewGame = function() {
    inputtedDigit = "";
    $('#numberInputtedSoFar').text(inputtedDigit);
    updateRandomNumber();
  };

  var checkWhetherPlayerWins = function() {
    if (isPlayerWinning()) {
      alert("You, sir, are quite a player! You win!!!!");
      startNewGame();
    }
  };
  var isPlayerWinning = function() {
    return (latestRandomNumber === inputtedDigit);
  };

  startNewGame();
});
