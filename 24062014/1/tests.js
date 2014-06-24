"use strict";

var htmlGenerator = require('./app.js').htmlGenerator;

exports.htmlGeneratorLinkTest = function(test) {
  var link = htmlGenerator.link({
    href: "https://hackbulgaria.com",
    title: "Hack Bulgaria",
    label: "Курсове по Програмиране!"
  });
  var expectedElementHtml = "<a href=\"https://hackbulgaria.com\" title=\"Hack Bulgaria\">Курспове по Програмиране!</a>";
  test.equal(link, expectedElementHtml);
  test.done();
};

exports.htmlGeneratorParagraphTest = function(test) {
  var p = htmlGenerator.paragraph({
      label: "Hack Bulgaria"
  });
  var expectedElementHtml = "<p>Hack Bulgaria</p>";
  test.equal(p, expectedElementHtml);
  test.done();
};

exports.htmlGeneratorListTest = function(test) {
  var list = htmlGenerator.list({
      type: "ul",
      children: [{
          label: "Item 1"
      }, {
          label: "Item 2"
      }]
  });
  var expectedElementHtml = "<ul><li>Item 1</li><li>Item 2</li></ul>";
  test.equal(list, expectedElementHtml);
  test.done();
};

exports.htmlGeneratorTagTest = function(test) {
  var element = htmlGenerator.tag({
    tagName: "div",
    data: htmlGenerator.tag({
        tagName: "h1",
        data: "Hello!"
    }),
    attributes: [{
        key: "class",
        value: "container"
    }, {
        key: "id",
        value: "main-container"
    }]
  });
  var expectedElementHtml = "<div class=\"container\" id=\"main-container\"><h1>Hello!</h1></div>";
  test.equal(element, expectedElementHtml);
  test.done();
};
