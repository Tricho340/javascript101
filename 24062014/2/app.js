"use strict";

var groceries = [
  {
    type: "fruit",
    name: "banana",
    image: "http://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Banana-Single.jpg/166px-Banana-Single.jpg"
  },
  {
    type: "fruit",
    name: "apple",
    image: "http://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/160px-Red_Apple.jpg"
  },
  {
    type: "fruit",
    name: "grape",
    image: "http://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Table_grapes_on_white.jpg/217px-Table_grapes_on_white.jpg"
  },
  {
    type: "fruit",
    name: "watermelon",
    image: "http://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Taiwan_2009_Tainan_City_Organic_Farm_Watermelon_FRD_7962.jpg/96px-Taiwan_2009_Tainan_City_Organic_Farm_Watermelon_FRD_7962.jpg"
  },
  {
    type: "vegetable",
    name: "potato",
    image: "http://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Patates.jpg/220px-Patates.jpg"
  },
  {
    type: "vegetable",
    name: "carrot",
    image: "http://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/13-08-31-wien-redaktionstreffen-EuT-by-Bi-frie-037.jpg/218px-13-08-31-wien-redaktionstreffen-EuT-by-Bi-frie-037.jpg"
  },
  {
    type: "vegetable",
    name: "turnip",
    image: "http://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Turnip_2622027.jpg/218px-Turnip_2622027.jpg"
  },
  {
    type: "vegetable",
    name: "lettuce",
    image: "http://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Iceberg_lettuce_in_SB.jpg/320px-Iceberg_lettuce_in_SB.jpg"
  }
];

$(function() {
  function isItemInArray(item, arr) {
    return arr.some(function(currentValue) {
      return (currentValue === item);
    });
  }

  function getTypeValues(array) {
    return array.map(function(currentValue) {
      return currentValue.type;
    });
  }

  function getUniqueValuesFromArray(array) {
    var uniqueValues = [];
    array.forEach(function(currentValue) {
      if (!isItemInArray(currentValue, uniqueValues)) {
        uniqueValues.push(currentValue);
      }
    });

    return uniqueValues;
  }

  function getUniqueGroceryTypesArray(groceryObjects) {
    var allTypesInArray = getTypeValues(groceryObjects);
    var uniqueGroceryTypes = getUniqueValuesFromArray(allTypesInArray);
    return uniqueGroceryTypes;
  }

  function getProcessedTemplateHtml(templateId, data) { // unfortunately this approach will not work @ Node environment, because jQuery needs a window to run and we are using jQuery to load the lo-dash templates from the HTML
    var templateHtml = $("#" + templateId).html();
    var htmlWithValues = _.template(templateHtml, data); // very Lodash magic goes here. wow.

    return htmlWithValues;
  }

  function getTemplateHtml() {
    var groceryTypes = getUniqueGroceryTypesArray(groceries);
    var dataObject = {
      groceryTypes: groceryTypes,
      groceriesData: groceries
    };
    var templateHtml = getProcessedTemplateHtml('groceriesTemplate', dataObject);
    return templateHtml;
  }

  function renderGroceries() {
    var groceriesTemplateHtml = getTemplateHtml();
    $('div#templateOutputArea').html(groceriesTemplateHtml);
  }

  renderGroceries();
});
