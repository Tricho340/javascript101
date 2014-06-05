"use strict";

var countBy = function(groupingFunction, arr) {
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

  var resultObject = {};
  uniquePropertyValues.forEach(function(currentUniquePropertyValue) {
    var recordsWithThisPropertyCount = arr.filter(function(currentValue) {
      var currentPropertyValue = groupingFunction(currentValue);
      return (currentUniquePropertyValue === currentPropertyValue);
    }).length;
    resultObject[currentUniquePropertyValue] = recordsWithThisPropertyCount;
  });

  return resultObject;
};

exports.countBy = countBy;
