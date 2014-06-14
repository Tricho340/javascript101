"use strict";

var beerAndFries = function(items) {
  function getItemsByType(type) {
    return items.filter(function(currentItem) {
      return currentItem.type === type;
    });
  }

  function getItemsSortedByScore(array) {
    return array.sort(function(a, b) {
      if (a.score > b.score) {
        return -1;
      }
      if (a.score < b.score) {
        return 1;
      }
      return 0;
    });
  }

  var beers = getItemsByType("beer");
  var beersSortedByScore = getItemsSortedByScore(beers);
  var fries = getItemsByType("fries");
  var friesSortedByScore = getItemsSortedByScore(fries);

  var maxScore = 0;
  beersSortedByScore.forEach(function(currentBeer, currentIndex) {
    maxScore += currentBeer.score * friesSortedByScore[currentIndex].score;
  });

  return maxScore;
};

exports.beerAndFries = beerAndFries;
