"use strict";

var queue = (function Queue() {
  var _private = {
    queueItems: []
  };

  var _public = {
    push: function(item) {
      _private.queueItems.push(item);
    },
    pop: function() {
      _private.queueItems.pop();
    },
    isEmpty: function() {
      return _private.queueItems.length === 0;
    },
    items: function() {
      return _private.queueItems;
    }
  };

  return _public;
} ());
