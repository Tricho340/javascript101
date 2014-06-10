function Robot(startingPoint) {
  var doACoupleOfTimes = function(toDo, times) {
    while (times > 0) {
      toDo();
      times--;
    }
  };

  this.moveLeft = function(amount) {
    doACoupleOfTimes(function() {
      startingPoint.xDec();
    }, amount);
  };
  this.moveRight = function(amount) {
    doACoupleOfTimes(function() {
      startingPoint.xInc();
    }, amount);
  };
  this.moveUp = function(amount) {
    doACoupleOfTimes(function() {
      startingPoint.yDec();
    }, amount);
  };
  this.moveDown = function(amount) {
    doACoupleOfTimes(function() {
      startingPoint.yInc();
    }, amount);
  };
  this.getPosition = function() {
    return startingPoint;
  };
}

exports.Robot = Robot;
