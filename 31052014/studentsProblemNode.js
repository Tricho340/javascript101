"use strict";


var parseStudentData = function() {
  var studentsData = require("./students.json");

  var isValueInArray = function(value, array) {
    console.log("isValueInArray", value, array);
    var isInArray = false;
    array.forEach(function(currentValue) {
      if (currentValue === value) {
        console.log("value is in array");
        isInArray = true;
      }
    });

    console.log("value is not in array");
    return isInArray;
  };

  var getStudentGroupsArray = function(studentsJSON) {
    var studentGroupIds = [];
    studentsJSON.students.forEach(function(currentStudentInfo) {
      var currentStudentGroupId = currentStudentInfo.course;
      if (!isValueInArray(currentStudentGroupId, studentGroupIds)) {
        console.log("Check whether group id: " + currentStudentGroupId + " is in array");
        studentGroupIds.push(currentStudentGroupId);
      } else {
        console.log("Object is in array");
      }
    });

    return studentGroupIds;
  };

  var getHtmlForGroupId = function(groupId) {
    var outputHtml = "<p>" + groupId + "</p>";
    outputHtml += "<table class=\"table table-hover table-bordered\">";
    outputHtml += "<tr><th>Student name</th></tr>";
    var studentsFromGroup = studentsData.students.filter(function(currentValue) {
      return (currentValue.course === groupId);
    });
    studentsFromGroup.forEach(function(currentStudentData) {
      outputHtml += "<tr><td>" + currentStudentData.name + "</td></tr>";
    });
    outputHtml += "</table>";
    return outputHtml;
  };

  var getHtmlForAllGroups = function(studentsJSON) {
    var outputHtml = "",
        studentGroupIds = getStudentGroupsArray(studentsJSON);

    console.log("Student group ids length: ", studentGroupIds.length);
    studentGroupIds.forEach(function(groupId) {
      outputHtml += getHtmlForGroupId(groupId);
    });

    return outputHtml;
  };

  var htmlForAllGroups = getHtmlForAllGroups(studentsData);
  console.log(htmlForAllGroups);
};

exports.parseStudentData = parseStudentData;

parseStudentData();
