"use strict";

$(document).ready(function() {
  var MAX_TABLES_PER_ROW = 3;
  var BOOTSTRAP_TABLE_WIDTH_CLASS = "col-xs-";

  var isInGroupMode = false;
  var defaultTableWidthInColumns;

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
    var tableHeaderHtml = ["<div class=\"",
                            BOOTSTRAP_TABLE_WIDTH_CLASS,
                            defaultTableWidthInColumns,
                            "\"><table class=\"table\">",
                           "<thead><tr><th>Id</th>",
                           "<th>Name</th><th>Course</th></tr>",
                           "</thead>",
                           "<tbody>"].join("");

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
    var $tableContainer = $('#tablesContainer');
    $tableContainer.empty();
    $tableContainer.append(html);
  };

  var resetStudentsDataAfterSearch = function(studentsData) {
    studentsData.forEach(function(currentValue) {
      currentValue.isMatch = false;
    });

    return studentsData;
  };

  var getDefaultTableWidth = function(itemsCount) {
    if (itemsCount === 1) {
      return 12;
    } else if (itemsCount === 2) {
      return 6;
    }

    return 4;
  };

  var getGrouppedStudentsTablesHtml = function(grouppedStudentsData) {
    var grouppedTablesHtml = "";

    var tablesAdded = 0;
    defaultTableWidthInColumns = getDefaultTableWidth(grouppedStudentsData.length);

    grouppedStudentsData.forEach(function(currentGroup) {
      if (tablesAdded % MAX_TABLES_PER_ROW === 0) {
        grouppedTablesHtml += "</div><div class=\"row\">";
      }
      grouppedTablesHtml += getTableHtml(currentGroup);
      tablesAdded++;
    });
    grouppedTablesHtml += "</div>";

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
