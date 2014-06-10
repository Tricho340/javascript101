var latestOrderId = 0;

function Pizza(name, cost, timeToMake) {
  this.name = name;
  this.cost = cost;
  this.timeToMake = timeToMake;
}

function PizzaOrder(pizza) {
  var orderId = latestOrderId++;

  this.pizza = pizza;
  this.callback;


  this.getId = function() {
    return orderId;
  };

  this.ready = function(callback) {
    callback(this);
  };
}

PizzaOrder.prototype.start = function() {
  var that = this;
  setInterval(function() {
    this.callback(that.pizza, that);
  }, this.timeToMake);
};

PizzaOrder.prototype.ready = function(callback) {
  this.callback = callback;
};
