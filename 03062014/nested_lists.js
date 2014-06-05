"use strict";

var olNested = function(items) {
  var htmlOutput = "<ol>";
  items.forEach(function(currentValue) {
    var childrenOutputIfDefined = "";
    if (currentValue.hasOwnProperty("children")) {
      childrenOutputIfDefined = olNested(currentValue.children);
    }
    htmlOutput += "<li>" + currentValue.label + childrenOutputIfDefined + "</li>";
  });
  htmlOutput += "</ol>";

  return htmlOutput;
};

var ulNested = function(items) {
  var htmlOutput = "<ul>";
  items.forEach(function(currentValue) {
    var childrenOutputIfDefined = "";
    if (currentValue.hasOwnProperty("children")) {
      childrenOutputIfDefined = olNested(currentValue.children);
    }
    htmlOutput += "<li>" + currentValue.label + childrenOutputIfDefined + "</li>";
  });
  htmlOutput += "</ul>";

  return htmlOutput;
};

exports.olNested = olNested;
exports.ulNested = ulNested;
