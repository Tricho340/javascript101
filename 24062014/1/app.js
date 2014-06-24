"use strict";

function getProcessedTemplateHtml(templateId, data) { // unfortunately this approach will not work @ Node environment, because jQuery needs a window to run and we are using jQuery to load the lo-dash templates from the HTML
  var templateHtml = $("#" + templateId).html();
  var htmlWithValues = _.template(templateHtml, data); // very Lodash magic goes here. wow.

  return htmlWithValues;
}

var htmlGenerator = {
  link: function(data) {
    return getProcessedTemplateHtml("linkTemplate", data);
  },
  paragraph: function(data) {
    return getProcessedTemplateHtml("paragraphTemplate", data);
  },
  list: function(data) {
    return getProcessedTemplateHtml("listTemplate", data);
  },
  tag: function(data) {
    return getProcessedTemplateHtml("tagTemplate", data);
  }
};

// exports.htmlGenerator = htmlGenerator; // RUN THIS @ NODE ENVIRONMENT

$(function() {
  var ELEMENT_TYPE_LINK = "0";
  var ELEMENT_TYPE_PARAGRAPH = "1";
  var ELEMENT_TYPE_LIST = "2";
  var ELEMENT_TYPE_TAG = "3";

  var HTML_GEN_METHOD_LINK_NAME = "link";
  var HTML_GEN_METHOD_PARAGRAPH_NAME = "paragraph";
  var HTML_GEN_METHOD_LIST_NAME = "list";
  var HTML_GEN_METHOD_TAG_NAME = "tag";


  function getJSONInputtedByUser() {
    var jsonCodeEnteredByUser = $("#parseTemplateForm textarea").val();
    var jsonObject = {};
    if (jsonCodeEnteredByUser !== "") {
      jsonObject = JSON.parse(jsonCodeEnteredByUser);
    }

    return jsonObject;
  }

  function getHtmlGeneratorMethod() {
    var selectedElementType = $("#parseTemplateForm select").val();
    switch (selectedElementType) {
      case ELEMENT_TYPE_LINK:
        return HTML_GEN_METHOD_LINK_NAME;
      case ELEMENT_TYPE_TAG:
        return HTML_GEN_METHOD_TAG_NAME;
      case ELEMENT_TYPE_LIST:
        return HTML_GEN_METHOD_LIST_NAME;
      case ELEMENT_TYPE_PARAGRAPH:
        return HTML_GEN_METHOD_PARAGRAPH_NAME;
    }
  }

  function parseTemplate() {
    var templateHtml = getTemplateHtml();
    console.log(templateHtml);
    $('#templateOutputArea').html(templateHtml);
  }

  function getTemplateHtml() {
    var jsonObject = getJSONInputtedByUser();
    var htmlGeneratorMethod = getHtmlGeneratorMethod();
    var templateHtml = htmlGenerator[htmlGeneratorMethod](jsonObject);

    return templateHtml;
  }

  function getSubmitButtonStatus() {
    var jsonText = $("#parseTemplateForm textarea").val();
    var shouldSubmitButtonBeEnabled = (jsonText !== "");

    return shouldSubmitButtonBeEnabled;
  }

  function updateSubmitButtonStatus() {
    var shouldSubmitBeEnabled = getSubmitButtonStatus();
    $("#parseTemplateForm").attr("disabled", "disabled");
  }

  function initializeParseTemplateFormListeners() {
    var parseTemplateForm = $("#parseTemplateForm");
    parseTemplateForm.on("submit", function(event) {
      event.preventDefault();
    });
    parseTemplateForm.on("change", "textarea", function() {
      updateSubmitButtonStatus();
    });
    parseTemplateForm.on("click", 'input[type="submit"]', function() {
      parseTemplate();
    });
  }

  function initializeApplicationListeners() {
    initializeParseTemplateFormListeners();
  }

  initializeApplicationListeners();
});
