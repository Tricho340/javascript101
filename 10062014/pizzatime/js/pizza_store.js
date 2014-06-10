var latestOrderId = 0;

function Pizza(pizzaName, pizzaCost, ttm) {
  this.name = pizzaName;
  this.cost = pizzaCost;
  this.timeToMake = ttm;
}

function PizzaOrder(pizza) {
  var orderId = latestOrderId++;

  this.pizza = pizza;
  this.callback;
  this.isInProgress = false;

  this.getId = function() {
    return orderId;
  };

  this.ready = function(callback) {
    this.callback = callback;
  };
}

PizzaOrder.prototype.start = function() {
  var that = this;
  isInProgress = true;
  setTimeout(function() {
    that.callback(that.pizza, that);
  }, that.pizza.timeToMake);
};

function LaPastaria() {
  this.MAX_NUMBER_OF_TIMES_BETWEEN_ORDERS_IN_MILLISECONDS = 8000;
  this.MAX_NUMBER_OF_ORDERS_AT_THE_SAME_TIME = 50;
  this.PIZZERIA_STATUS_FREE_AS_F = 10;
  this.PIZZERIA_STATUS_BUSY = 30;
  this.PIZZERIA_STATUS_LIKE_REALLY_BUSY = 40;
  this.AVAILABLE_PIZZAS = [{
                            name: 'Margerita',
                            timeToMake: 3000,
                            cost: 8
                           },
                           {
                            name: 'Diavolo',
                            timeToMake: 2000,
                            cost: 12
                           },
                           {
                            name: 'Frizzi',
                            timeToMake: 4000,
                            cost: 15
                           },
                           {
                            name: 'Quattro Staggioni',
                            timeToMake: 5000,
                            cost: 14
                           }
  ];
  this.orderQueue = [];
}

LaPastaria.prototype.gogogo = function() {
  this.putAnotherOrderSoon();
};

LaPastaria.prototype.putAnotherOrderSoon = function() {
  var randomInterval = this.getRandomIntervalInMilliseconds();
  var that = this;
  setInterval(function() {
    that.addOrderToQueue();
  }, randomInterval);
};

LaPastaria.prototype.addOrderToQueue = function() {
  var randomOrder = this.getRandomOrder();
  if (this.orderQueue.length <= this.MAX_NUMBER_OF_ORDERS_AT_THE_SAME_TIME) {
    this.orderQueue.push(randomOrder);
  }
  this.executeOrders();
  this.putAnotherOrderSoon();
};

LaPastaria.prototype.executeOrders = function() {
  var that = this;
  this.orderQueue.forEach(function(orderToExecute, orderIndex) {
    if (!orderToExecute.isInProgress) {
      orderToExecute.ready(function(p, o) {
        var currentTimestamp = new Date().toString();
        that.updateAll();
        that.orderQueue.splice(orderIndex, 1); // remove order from queue
      });
      orderToExecute.start();
      that.updateAll();
    }
  });
};

LaPastaria.prototype.updateAll = function() {
    this.updatePizzaQueueArea();
    this.updatePizzeriaStatusArea();
};

LaPastaria.prototype.getRandomIntervalInMilliseconds = function() {
  var randomInterval = RandomUtil.getRandomNumber(this.MAX_NUMBER_OF_TIMES_BETWEEN_ORDERS_IN_MILLISECONDS);
  return randomInterval;
};

LaPastaria.prototype.getRandomPizza = function() {
  var randomElementIndex = RandomUtil.getRandomNumber(this.AVAILABLE_PIZZAS.length);
  var pizzaData = this.AVAILABLE_PIZZAS[randomElementIndex];

  var randomPizza = new Pizza(pizzaData.name, pizzaData.cost, pizzaData.timeToMake);
  return randomPizza;
};

LaPastaria.prototype.getRandomOrder = function() {
  var randomPizza = this.getRandomPizza();
  var order = new PizzaOrder(randomPizza);
  return order;
};

LaPastaria.prototype.updatePizzaQueueArea = function() {
  var $pizzasQueueArea = $('#activitiesLog');
  $pizzasQueueArea.empty();

  var ordersQueueHtmlElements = ['<tr>',
                                    '<th>Pizza type</th>',
                                    '<th>Time to make</th>',
                                    '<th>Cost</th>',
                                  '</tr>'
  ];
  this.orderQueue.forEach(function(currentOrder) {
    console.log("Current order: ", currentOrder);
    ordersQueueHtmlElements.push('<tr><td>' + currentOrder.pizza.name + '</td>');
    ordersQueueHtmlElements.push('<td>' + currentOrder.pizza.timeToMake + '</td>');
    ordersQueueHtmlElements.push('<td>' + currentOrder.pizza.cost + '</td></tr>');
  });
  var ordersQueueHtml = ordersQueueHtmlElements.join("");

  $pizzasQueueArea.append(ordersQueueHtml);
};

LaPastaria.prototype.updatePizzeriaStatusArea = function() {
  var numberOfPizzasInQueue = this.orderQueue.length;
  if (numberOfPizzasInQueue >= 0 && numberOfPizzasInQueue <= this.PIZZERIA_STATUS_FREE_AS_F) {
    $('span.howsPizzaBusinessGoing').text("free as f***");
  } else if (numberOfPizzasInQueue > this.PIZZERIA_STATUS_FREE_AS_F && numberOfPizzasInQueue <= this.PIZZERIA_STATUS_BUSY) {
    $('span.howsPizzaBusinessGoing').text("a bit busy");
  } else if (numberOfPizzasInQueue > this.PIZZERIA_STATUS_BUSY) {
    $('span.howsPizzaBusinessGoing').text("veeeery busy and sluggish!");
  }
};

LaPastaria.prototype.updatePizzaStatusDashboard = function(message) {
  var $pizzaStatusList = $('#pizzaStatusList');
  $pizzaStatusList.append('<p>' + message + '</p>');
};

function RandomUtil() {

}

RandomUtil.getRandomNumber = function(maxValue) {
  return Math.floor(Math.random() * maxValue);
};
