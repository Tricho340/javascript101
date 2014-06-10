"use strict";

var latestOrderId = 0;

function Pizza(name, cost, timeToMake) {
  this.name = name;
  this.cost = cost;
  this.timeToMake = timeToMake;
}

function PizzaOrder(pizza) {
  var orderId = latestOrderId++;

  this.pizza = pizza;

  this.getId = function() {
    return orderId;
  };

  this.ready = function(callback) {
    this.callback = callback;
  };
}

PizzaOrder.prototype.start = function() {
  var that = this;
  setInterval(function() {
    this.callback(that.pizza, that);
  }, this.timeToMake);
};

function LaPastaria() {

}
