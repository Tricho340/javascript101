"use strict";


var eventQueue = (function() {
  var _listenersQueue = [];

  function QueueEventListener(eventName, callback) {
    this.eventName = eventName;
    this.callback = callback;
  }

  function addEventListener(eventName, callback) {
    var listener = getEventListenerInstance(eventName, callback);
    _listenersQueue.push(listener);
  }

  function getEventListenerInstance(eventName, callback) {
    return new QueueEventListener(eventName, callback);
  }

  function executeAllHandlersForEvent(eventName) {
    var allInterestedListeners = _listenersQueue.filter(function(currentValue) {
      return currentValue.eventName === eventName;
    });

    allInterestedListeners.forEach(function(currentListener) {
      currentListener.callback();
    });
  }

  function removeEventListenersFor(eventName) {
    _listenersQueue.forEach(function(currentValue, currentIndex) {
      if (currentValue.eventName === eventName) {
        _listenersQueue.splice(currentIndex, 1);
      }
    });
  }

  var _public = {
    on: function(eventName, callback) {
      addEventListener(eventName, callback);
    },
    remove: function(eventName) {
      removeEventListenersFor(eventName);
    },
    trigger: function(eventName) {
      executeAllHandlersForEvent(eventName);
    }
  };
  return _public;
} ());

