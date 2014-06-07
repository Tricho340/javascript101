"use strict";

$(document).ready(function() {
  var OPTION_HTML_ELEMENT = "option";

  var leftDropdownItems = [];
  var rightDropdownItems = [];

  var $leftDropdown = $('#leftDropdown');
  var $rightDropdown = $('#rightDropdown');
  var $moveToRightListButton = $('button.btn-success');
  var $moveToLeftListButton = $('button.btn-warning');

  var populateSelectWithOptions = function(selectComponent, optionsArray) {
    selectComponent.empty();
    var optionsHtml = "";
    optionsArray.forEach(function(currentOption) {
      optionsHtml += "<" + OPTION_HTML_ELEMENT + ">" + currentOption + "</" + OPTION_HTML_ELEMENT + ">";
    });
    selectComponent.append(optionsHtml);
  };

  var updateDropdowns = function() {
    populateSelectWithOptions($leftDropdown, leftDropdownItems);
    populateSelectWithOptions($rightDropdown, rightDropdownItems);
  };

  var displayDropdownItemsInParagraphs = function() {
    displayItemsInParagraph(leftDropdownItems, $('#leftListItemsParagraph'));
    displayItemsInParagraph(rightDropdownItems, $('#rightListItemsParagraph'));
  };

  var displayItemsInParagraph = function(array, paragraph) {
    var paragraphText = array.join(", ");
    console.log(paragraphText);
    paragraph.text(paragraphText);
  };

  $moveToRightListButton.on('click', function() {
    var selectedItemsFromLeftDropdown = $leftDropdown.find(':selected');
    console.log(selectedItemsFromLeftDropdown);
    selectedItemsFromLeftDropdown.each(function(index, element) {
      var removedItem = leftDropdownItems.splice(index, 1);
      rightDropdownItems.push(removedItem);
      updateDropdowns();
      displayDropdownItemsInParagraphs();
    });
  });
  $moveToLeftListButton.on('click', function() {
    var selectedItemsFromRightDropdown = $rightDropdown.find(':selected');
    console.log(selectedItemsFromRightDropdown);
    selectedItemsFromRightDropdown.each(function(index, element) {
      var removedItem = rightDropdownItems.splice(index, 1);
      leftDropdownItems.push(removedItem);
      updateDropdowns();
      displayDropdownItemsInParagraphs();
    });
  });

  $.getJSON('http://localhost:3000/students', function(data) {
    leftDropdownItems = data.map(function(currentValue) {
      return currentValue.name;
    });
    updateDropdowns();
  });
});
