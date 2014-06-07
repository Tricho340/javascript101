"use strict";

console.log("Empty I am.");

$(document).ready(function() {
  var NUMBER_OF_PARAGRAPHS_TO_TOGGLE_THROUGH = 3;
  var PARAGRAPH_CLASS_NAMES = ['first', 'second', 'third'];

  var highlightedParagraphIndex;
  $('#toggleHighlightButton').on('click', function() {
    toggleHighlightedParagraph();
  });

  var toggleHighlightedParagraph = function() {
    console.log("I saw that.");
    changeSelectedParagraphIndex();
    updateParagraphHighlightAppearance();
  };

  var updateParagraphHighlightAppearance = function() {
    $('#mightyParagraphHolder > p').removeClass('highlight');
    var paragraphToBeHighlightedClassName = PARAGRAPH_CLASS_NAMES[highlightedParagraphIndex];
    $('#mightyParagraphHolder .' + paragraphToBeHighlightedClassName).addClass('highlight');
  };

  var changeSelectedParagraphIndex = function() {
    if (typeof highlightedParagraphIndex === "undefined") {
      highlightedParagraphIndex = 0;
      return;
    }
    highlightedParagraphIndex++;
    if (highlightedParagraphIndex === NUMBER_OF_PARAGRAPHS_TO_TOGGLE_THROUGH) {
      highlightedParagraphIndex = 0;
    }
  };


});
