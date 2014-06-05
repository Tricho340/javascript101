"use strict";

$(document).ready(function() {
  var isInGroupMode = false;

  /* Group by definition */
  var groupBy = function(groupingFunction, arr) {
    var valuesOfSpecificPropertyToGroupBy = arr.map(groupingFunction); // vryshta vsichki stoinosti na syotvetnoto property VALUES!

    var resultObject = {};

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

    var uniquePropertyValues = getUniqueValuesFromArray(valuesOfSpecificPropertyToGroupBy);

    var resultObject = [];
    uniquePropertyValues.forEach(function(currentUniquePropertyValue) {
      var recordsWithThisProperty = arr.filter(function(currentValue) {
        var currentPropertyValue = groupingFunction(currentValue);
        return (currentUniquePropertyValue === currentPropertyValue);
      });
      resultObject.push(recordsWithThisProperty);
    });

    return resultObject;
  };
  /* End of group by definition */


  var studentsData;
  var getTableHeaderHtml = function() {
    var tableHeaderHtml = "<div class=\"col-xs-4\"><table class=\"table\">";
    tableHeaderHtml += "<thead><tr><th>Id</th>";
    tableHeaderHtml += "<th>Name</th><th>Course</th></tr>";
    tableHeaderHtml += "</thead>";
    tableHeaderHtml += "<tbody>";

    return tableHeaderHtml;
  };
  var getTableFooterHtml = function() {
    var tableFooterHtml = "</tbody></table></div>";

    return tableFooterHtml;
  };
  var getTableLineHtml = function(studentData) {
    var tableLineHtmlElements = [
                          "<tr>",
                            "<td>",
                              studentData.id,
                            "</td>",
                            "<td>",
                              studentData.name,
                            "</td>",
                            "<td>",
                              studentData.course,
                            "</td>",
                          "</tr>"
    ];
    if (studentData.isMatch) {
      tableLineHtmlElements.shift();
      tableLineHtmlElements.unshift("<tr class=\"success\">");
    }
    return tableLineHtmlElements.join("");
  };
  var getTableBodyHtml = function(studentsData) {
    var tableBodyHtml = "";

    studentsData.forEach(function(currentStudentData) {
      tableBodyHtml += getTableLineHtml(currentStudentData);
    });

    return tableBodyHtml;
  };
  var getTableHtml = function(studentsData) {
    var tableHeaderHtml = getTableHeaderHtml();
    var tableFooterHtml = getTableFooterHtml();
    var tableBodyHtml = getTableBodyHtml(studentsData);

    var tableHtml = tableHeaderHtml + tableBodyHtml + tableFooterHtml;
    return tableHtml;
  };

  var showHtmlInTableContainer = function(html) {
    var $tableContainer = $('#start-here .row > div').first();
    $tableContainer.empty();
    $tableContainer.append(html);
  };

  var resetStudentsDataAfterSearch = function(studentsData) {
    studentsData.forEach(function(currentValue) {
      currentValue.isMatch = false;
    });

    return studentsData;
  };

  var getGrouppedStudentsTablesHtml = function(grouppedStudentsData) {
    var grouppedTablesHtml = "";

    grouppedStudentsData.forEach(function(currentGroup) {
      grouppedTablesHtml += getTableHtml(currentGroup);
    });

    return grouppedTablesHtml;
  };

  var getTableHtmlFiltered = function(studentsData, searchQuery) {
    var tableHeaderHtml = getTableHeaderHtml();
    var tableFooterHtml = getTableFooterHtml();
    var tableBodyHtml = getFilteredTableBodyHtml(studentsData, searchQuery);

    var tableHtml = tableHeaderHtml + tableBodyHtml + tableFooterHtml;
    return tableHtml;
  };

  var showStudentsUngroupped = function(studentsData) {
    var tableHtml = getTableHtml(studentsData);
    showHtmlInTableContainer(tableHtml);
  };

  var showStudentsGroupped = function(studentsData) {
    var grouppedStudentsData = groupBy(function(currentValue) {
      return currentValue.course;
    }, studentsData);
    var tablesHtml = getGrouppedStudentsTablesHtml(grouppedStudentsData);
    showHtmlInTableContainer(tablesHtml);
  };

  var modifyStudentsDataBasedOnSearch = function(studentsData, searchQuery) {
    studentsData.forEach(function(currentStudentData) {
      var isCurrentStudentMatch = (currentStudentData.name.toLowerCase().indexOf(searchQuery) != -1);
      currentStudentData.isMatch = isCurrentStudentMatch;
    });
    return studentsData;
  };

  var showStudentsByFilter = function(studentsData, searchQuery) {
    studentsData = modifyStudentsDataBasedOnSearch(studentsData, searchQuery);
    console.log("Students data; ", studentsData);
    if (isInGroupMode) {
      showStudentsGroupped(studentsData);
    } else {
      showStudentsUngroupped(studentsData);
    }
  };

  $.getJSON('http://localhost:3000/students', function(students, textStatus) {
    studentsData = students;
    showStudentsUngroupped(studentsData);
  });


  $("#group-btn").on("click", function() {
    isInGroupMode = true;
    showStudentsGroupped(studentsData);
  });

  $("#search-btn").on("click", function() {
    var searchQuery = $("#search-box").val();
    showStudentsByFilter(studentsData, searchQuery);
  });
});
