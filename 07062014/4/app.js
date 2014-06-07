"use strict";

$(document).ready(function() {
  var OPTION_HTML_ELEMENT = "option";

  var courses = [];
  var students = [];

  var filterStudentsByCourse = function(courseId) {
    var studentsInCourse = students.filter(function(currentStudentData) {
      return (currentStudentData.course === courseId);
    });
    var studentNames = studentsInCourse.map(function(currentStudentData) {
      return currentStudentData.name;
    });
    return studentNames;
  };

  var isItemInArray = function(item, arr) {
    return arr.some(function(currentValue) {
      return (currentValue === item);
    });
  };

  var getUniqueValuesFromArray = function(array) {
    var uniqueValues = [];
    array.forEach(function(currentValue) {
      if (!isItemInArray(currentValue, uniqueValues)) {
        uniqueValues.push(currentValue);
      }
    });

    return uniqueValues;
  };

  var populateCoursesDropdown = function() {
    var selectToPopulate = $('#coursePickerSelect');
    populateSelectWithOptions(selectToPopulate, courses);
    selectToPopulate.on('change', function() {
      coursesDropdownChangeHandler($(this));
    });
    selectToPopulate.trigger('change');
  };

  var coursesDropdownChangeHandler = function(coursesDropdown) {
    var selectedCourseId = coursesDropdown.val();
    var studentsInCourse = filterStudentsByCourse(selectedCourseId);
    populateStudentsDropdown(studentsInCourse);
  };

  var getStudentGitHubUrlByStudentName = function(studentName) {
    var studentData = students.filter(function(currentStudentData) {
      return (currentStudentData.name === studentName);
    }).shift();
    return studentData.github;
  };

  var studentsDropDownChangeHandler = function(studentsDropdown) {
    var selectedStudentName = studentsDropdown.val();
    var selectedStudentGithubAccount = getStudentGitHubUrlByStudentName(selectedStudentName);
    $('h2.selectedStudent').text('GitHub for ' + selectedStudentName + ' is ' + selectedStudentGithubAccount);
  };

  var populateStudentsDropdown = function(studentsData) {
    var studentsDropdown = $('#studentPickerSelect');
    populateSelectWithOptions(studentsDropdown, studentsData);
    studentsDropdown.on('change', function() {
      studentsDropDownChangeHandler($(this));
    });
    studentsDropdown.trigger('change');
  };

  var populateSelectWithOptions = function(selectComponent, optionsArray) {
    selectComponent.empty();
    var optionsHtml = "";
    optionsArray.forEach(function(currentOption) {
      optionsHtml += "<" + OPTION_HTML_ELEMENT + ">" + currentOption + "</" + OPTION_HTML_ELEMENT + ">";
    });
    selectComponent.append(optionsHtml);
  };

  $.getJSON('http://localhost:3000/students', function(data) {
    students = data;
    var allCourses = data.map(function(currentValue) {
      return currentValue.course;
    });
    courses = getUniqueValuesFromArray(allCourses);
    populateCoursesDropdown();
  });
});
