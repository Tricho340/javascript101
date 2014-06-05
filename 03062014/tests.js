"use strict";

exports.sumNumbersTestWithNumbers = function(test) {
  var sum = require("./sum_numbers_concat_strings.js").sum;
  var result = sum(1, 1);
  test.equal(result, 2);
  test.done();
};

exports.sumNumbersTestWithStrings = function(test) {
  var sum = require("./sum_numbers_concat_strings.js").sum;
  test.throws(function() {
    sum("1", "1");
  });
  test.done();
};

exports.concatStringsTestWithStrings = function(test) {
  var concat = require("./sum_numbers_concat_strings.js").concat;
  var result = concat("a", "b");
  test.equal(result, "ab");
  test.done();
};

exports.concatStringsTestWithNumbers = function(test) {
  var concat = require("./sum_numbers_concat_strings.js").concat;
  test.throws(function() {
    concat(1, 1);
  });
  test.done();
};

exports.testContainsExerciseContainedCase = function(test) {
  var contains = require("./contains.js").contains;
  var result = contains("a", ["a", "b", 0]);
  test.equals(result, true);
  test.done();
};

exports.testContainsExerciseNotContainedCase = function(test) {
  var contains = require("./contains.js").contains;
  var result = contains("c", ["a", "b", 0]);
  test.equals(result, false);
  test.done();
};

exports.testContainsAllExerciseContainedCase = function(test) {
  var containsAll = require("./contains_all.js").containsAll;
  var result =  containsAll([0, 1, 2], [0, 1, 2, 3]);
  test.equal(result, true);
  test.done();
};

exports.testContainsAllExerciseNotContainedCase = function(test) {
  var containsAll = require("./contains_all.js").containsAll;
  var result =  containsAll([0, 1, 2], [3, 2, 4, 5, 6]);
  test.equal(result, false);
  test.done();
};

exports.testGroupByExercise = function(test) {
  var groupBy = require("./group_by.js").groupBy,
      students = [{
    "name" : "Daniel Taskoff",
    "course" : "Frontend JavaScript"
  }, {
    "name" : "Elena Jeleva",
    "course" : "Programming 101"
  }, {
    "name" : "Luboslava Dimitrova",
    "course" : "Frontend JavaScript"
  }, {
    "name" : "Anton Antonov",
    "course" : "Core Java"
  }, {
    "name" : "Nikola Dichev",
    "course" : "Core Java"
  }],
  correctOutput = { "Frontend JavaScript":
   [ { name: "Daniel Taskoff", course: "Frontend JavaScript" },
     { name: "Luboslava Dimitrova", course: "Frontend JavaScript" } ],
  "Programming 101": [ { name: "Elena Jeleva", course: "Programming 101" } ],
  "Core Java":
   [ { name: "Anton Antonov", course: "Core Java" },
     { name: "Nikola Dichev", course: "Core Java" } ] };
  var output = groupBy(function(student) {
    return student.course;
  }, students);
  test.deepEqual(output, correctOutput);
  test.done();
};

exports.testCountThemByExercise = function(test) {
  var countBy = require("./count_by.js").countBy;
  var students = [
                  {
                    "name" : "Daniel Taskoff",
                    "course" : "Frontend JavaScript"
                  }, {
                    "name" : "Elena Jeleva",
                    "course" : "Programming 101"
                  }, {
                    "name" : "Luboslava Dimitrova",
                    "course" : "Frontend JavaScript"
                  }, {
                    "name" : "Anton Antonov",
                    "course" : "Core Java"
                  }, {
                    "name" : "Nikola Dichev",
                    "course" : "Core Java"
                  }
  ];
  var output = countBy(function(student) {
    return student.course;
  }, students);
  var expectedOutput = {
      'Frontend JavaScript': 2,
      'Programming 101': 1,
      'Core Java': 2
  };
  test.deepEqual(output, expectedOutput);
  test.done();
};

exports.testAlwaysExercise = function(test) {
  var always = require("./always.js").always(5);
  var result = always();
  test.equal(result, 5);
  test.done();
};

exports.testOnlyExerciseFalseCase = function(test) {
  var only = require("./list_certain_values.js").only;

  var result = only("string", [1,2,3,4])
  test.equal(result, false);
  test.done();
};

exports.testOnlyExerciseTrueCase = function(test) {
  var only = require("./list_certain_values.js").only;

  var result = only("number", [1,2,3,4]);
  test.equal(result, true);
  test.done();
};

exports.testTexasRangerExercise = function(test) {
  var range = require("./texas_ranger.js").range;

  var actualResult = range(1, 10);
  var expectedResult = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  test.deepEqual(actualResult, expectedResult);
  test.done();
};

exports.testFindOrUndefinedExercise = function(test) {
  var find = require("./find_or_undefined.js").find;
  var testArray = [1, 2, 3, 4, 5, 6];
  var predicateFunction = function(currentValue) {
    return (currentValue > 4);
  };
  var actualResult = find(predicateFunction, testArray);
  var expectedResult = 5;
  test.equal(actualResult, expectedResult);
  test.done();
};

exports.testWithoutThemExercise = function(test) {
  var without = require("./without.js").without;
  var actualResult = without([5, 6], [1, 2, 3, 4, 5, 6]);
  var expectedResult = [1, 2, 3, 4];
  test.deepEqual(actualResult, expectedResult);
  test.done();
};

exports.testPluckExercise = function(test) {
  var pluck = require("./pluck.js").pluck;
  var students = [{
    "name" : "Daniel Taskoff",
    "course" : "Frontend JavaScript"
  }, {
    "name" : "Elena Jeleva",
    "course" : "Programming 101"
  }, {
    "name" : "Luboslava Dimitrova",
    "course" : "Frontend JavaScript"
  }, {
    "name" : "Anton Antonov",
    "course" : "Core Java"
  }, {
    "name" : "Nikola Dichev",
    "course" : "Core Java"
  }];
  var actualResult = pluck("name", students);
  var expectedResult = ["Daniel Taskoff", "Elena Jeleva", "Luboslava Dimitrova", "Anton Antonov", "Nikola Dichev"];
  test.deepEqual(actualResult, expectedResult);
  test.done();
};

exports.zipExerciseFirstTest = function(test) {
  var zip = require("./zip.js").zip;
  var actualData = zip([1, 2, 3], [4, 5, 6]);
  var expectedResult = [ [1, 4], [2, 5], [3, 6] ];
  test.deepEqual(actualData, expectedResult);
  test.done();
};

exports.zipExerciseSecondTest = function(test) {
  var zip = require("./zip.js").zip;
  var actualData = zip([1, 2, 3], [4, 5, 6], [7, 8, 9]);
  var expectedResult = [ [1, 4, 7], [2, 5, 8], [3, 6, 9] ];
  test.deepEqual(actualData, expectedResult);
  test.done();
};

exports.testHistogramOfWordsExercise = function(test) {
  var wordsHistogram = require("./histogram_of_words.js").wordsHistogram;
  var str = "A function is a function with a very functional function!";
  var actualResult = wordsHistogram(str);
  var expectedResult = {
                        "a" : 3,
                        "function" : 3,
                        "is" : 1,
                        "with" : 1,
                        "very" : 1,
                        "functional" : 1
  };
  test.deepEqual(actualResult, expectedResult);
  test.done();
};

exports.testCharsInHistogramExercise = function(test) {
  var charsHistogram = require("./histogram_of_characters.js").charsHistogram;
  var testString = "Count the characters in this very profound sentence";
  var actualResult = charsHistogram(testString);
  var expectedResult = {
                          c: 4,
                          o: 3,
                          u: 2,
                          n: 5,
                          t: 5,
                          h: 3,
                          e: 6,
                          a: 2,
                          r: 4,
                          s: 3,
                          i: 2,
                          v: 1,
                          y: 1,
                          p: 1,
                          f: 1,
                          d: 1
  };
  test.deepEqual(actualResult, expectedResult);
  test.done();
};

exports.testOrderedListsExercise = function(test) {
  var ol = require("./unordered_lists_and_ordered_lists.js").ol;
  var items = [{ "label" : "Item 1"}, { "label" : "Item 2"}];
  var actualResult = ol(items);
  var expectedResult = "<ol><li>Item 1</li><li>Item 2</li></ol>";
  test.equal(actualResult, expectedResult);
  test.done();
};

exports.testUnorderedListsExercise = function(test) {
  var ul = require("./unordered_lists_and_ordered_lists.js").ul;
  var items = [{ "label" : "Item 1"}, { "label" : "Item 2"}];
  var actualResult = ul(items);
  var expectedResult = "<ul><li>Item 1</li><li>Item 2</li></ul>";
  test.equal(actualResult, expectedResult);
  test.done();
};

exports.testNestedListsInsideOlExercise = function(test) {
  var olNested = require("./nested_lists.js").olNested;
  var items = [{ "label" : "Item 1"},
             { "label" : "Item 2", "children" : [
                {
                    "label" : "Level 2 of Item 2"
                },
                {
                    "label" : "Another level 2"
                }
             ]}];
  var expectedResult = "<ol><li>Item 1</li><li>Item 2<ol><li>Level 2 of Item 2</li><li>Another level 2</li></ol></li></ol>";
  var actualResult = olNested(items);
  test.equal(actualResult, expectedResult);
  test.done();
};

exports.testNestedListsInsideUlExercise = function(test) {
  var ulNested = require("./nested_lists.js").ulNested;
  var items = [{ "label" : "Item 1"},
             { "label" : "Item 2", "children" : [
                {
                    "label" : "Level 2 of Item 2"
                },
                {
                    "label" : "Another level 2"
                }
             ]}];
  var expectedResult = "<ul><li>Item 1</li><li>Item 2<ol><li>Level 2 of Item 2</li><li>Another level 2</li></ol></li></ul>";
  var actualResult = ulNested(items);
  test.equal(actualResult, expectedResult);
  test.done();
};
