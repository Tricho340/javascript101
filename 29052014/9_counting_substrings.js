"use strict";

var count_substrings = function(haystack, needle) {
  var latestString = haystack,
      count = 0,
      indexToCutTo = latestString.indexOf(needle);

  while (latestString.indexOf(needle) !== -1) {
    indexToCutTo = latestString.indexOf(needle) + needle.length;
    latestString = latestString.substring(indexToCutTo);
    count++;
  }

  return count;
};

exports.count_substrings = count_substrings;
