"use strict";

exports.programTest = function(test) {
  var program = require("./studentsProblemNode.js").parseStudentData;
  var actualProgramOutput = program();
  var correctHtmlOutput = "<p>Frontend JavaScript</p><table class=\"table table-hover table-bordered\"><tr><th>Student name</th></tr><tr><td>Daniel Taskoff</td></tr><tr><td>Luboslava Dimitrova</td></tr></table><p>Programming 101</p><table class=\"table table-hover table-bordered\"><tr><th>Student name</th></tr><tr><td>Elena Jeleva</td></tr></table><p>Core Java</p><table class=\"table table-hover table-bordered\"><tr><th>Student name</th></tr><tr><td>Anton Antonov</td></tr><tr><td>Nikola Dichev</td></tr></table>";
  test.equal(actualProgramOutput, correctHtmlOutput);
  test.done();
};
