"use strict";

var ORDERED_LIST_ELEMENT = "ol";
var UNORDERED_LIST_ELEMENT = "ul";
var LIST_ITEM_ELEMENT = "li";

var getItemHtml = function(value, childrenOutput) {
  return "<" + LIST_ITEM_ELEMENT + ">" + value + childrenOutput + "</" + LIST_ITEM_ELEMENT + ">";
};

var getListHtml = function(listTagName, items) {
  var htmlOutput = "<" + listTagName + ">";
  items.forEach(function(currentValue) {
    var childrenOutputIfDefined = "";
    if (currentValue.hasOwnProperty("children")) {
      childrenOutputIfDefined = olNested(currentValue.children);
    }

    htmlOutput += getItemHtml(currentValue.label, childrenOutputIfDefined);
  });
  htmlOutput += "</" + listTagName + ">";


  return htmlOutput;
};

var olNested = function(items) {
  return getListHtml(ORDERED_LIST_ELEMENT, items);
};

var ulNested = function(items) {
  return getListHtml(UNORDERED_LIST_ELEMENT, items);
};

exports.olNested = olNested;
exports.ulNested = ulNested;
