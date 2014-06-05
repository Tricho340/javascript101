"use strict";

var ol = function(items) {
  var htmlOutput = "<ol>";
  items.forEach(function(currentValue) {
    htmlOutput += "<li>" + currentValue.label + "</li>";
  });
  htmlOutput += "</ol>";

  return htmlOutput;
};

var ul = function(items) {
  var htmlOutput = "<ul>";
  items.forEach(function(currentValue) {
    htmlOutput += "<li>" + currentValue.label + "</li>";
  });
  htmlOutput += "</ul>";

  return htmlOutput;
};

exports.ol = ol;
exports.ul = ul;
