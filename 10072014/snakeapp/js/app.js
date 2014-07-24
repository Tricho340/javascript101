'use strict';

var SnakePoint = (function() {
  function SnakePointClass(x, y) {
    this.x = x;
    this.y = y;
  }

  SnakePointClass.prototype.setX = function(newX) {
    this.x = newX;
  };

  SnakePointClass.prototype.setY = function(newY) {
    this.y = newY;
  };

  SnakePointClass.prototype.getX = function() {
    return this.x;
  };

  SnakePointClass.prototype.getY = function() {
    return this.y;
  };

  SnakePointClass.prototype.isTheSamePointAs = function(point) {
    return ((point.getX() === this.getX()) && (point.getY() === this.getY()));
  };

  return SnakePointClass;
})();

var Pixel = (function() {
  function PixelClass(point) {
    this.setX(point.getX());
    this.setY(point.getY());
    this.context = getContext();
  }
  PixelClass.NOKIA3310_DEFAULT_PIXEL_SIZE = 3;
  PixelClass.NOKIA3310_DEFAULT_PIXEL_COLOR = 0x253c1f;
  PixelClass.NOKIA3310_DEFAULT_SPACE_BETWEEN_PIXELS = 1;
  PixelClass.CANVAS_ELEMENT_WIDTH_PX = 147;
  PixelClass.CANVAS_ELEMENT_HEIGHT_PX = 97;
  PixelClass.CANVAS_ELEMENT_ID = 'snakeCanvas';

  PixelClass.getContext = getContext;
  PixelClass.getVerticalCenterY = function() {
    return Math.floor(PixelClass.CANVAS_ELEMENT_HEIGHT_PX / 2);
  };

  function getContext() {
    var canvasInstance = document.getElementById(PixelClass.CANVAS_ELEMENT_ID);
    var context = canvasInstance.getContext("2d");
    context.fillStyle = Pixel.NOKIA3310_DEFAULT_PIXEL_COLOR;

    return context;
  }

  PixelClass.prototype.setPosition = function(newPoint) {
    this.x = newPoint.getX();
    this.y = newPoint.getY();
  };

  PixelClass.prototype.setX = function(newX) {
    this.x = newX;
  };

  PixelClass.prototype.setY = function(newY) {
    this.y = newY;
  };

  PixelClass.prototype.render = function() {
    this.context.fillRect(this.x, this.y, PixelClass.NOKIA3310_DEFAULT_PIXEL_SIZE, PixelClass.NOKIA3310_DEFAULT_PIXEL_SIZE);
  };

  return PixelClass;
})();

var CollisionableObject = (function() {
  function CollisionableObjectClass(points) {
    this.points = points;
  }

  CollisionableObjectClass.prototype.getPoints = function() {
    return this.points;
  };

  CollisionableObjectClass.prototype.isCollision = function(snakePoint) {
    // all classes that subclass SnakeObstacleClass should implement this method
    return (this.points.indexOf(snakePoint) !== -1);
  };

  CollisionableObjectClass.prototype.render = function() {
    this.points.forEach(function(currentPoint) {
      var newPixel = new Pixel(currentPoint);
      newPixel.render();
    });
  };

  return CollisionableObjectClass;
})();

var RectangleShapedCollisionableObject = (function() {
  function RectangleShapedCollisionableObjectClass(upperLeftCornerPoint, width, height) {
    this.upperLeftCornerPoint = upperLeftCornerPoint;
    this.width = width;
    this.height = height;
  }

  RectangleShapedCollisionableObjectClass.prototype = Object.create(CollisionableObject);

  function getPointsInRectArea() {
    var lowerRightCornerX = this.upperLeftCornerPoint.getX() + this.width,
        lowerRightCornerY = this.upperLeftCornerPoint.getY() + this.height,
        currentX,
        currentY,
        points = [];
    for (currentX = 0; currentX <= lowerRightCornerX; currentX++) {
      for (currentY = 0; currentY <= lowerRightCornerY; currentY++) {
        var newPoint = new SnakePoint(currentX, currentY);
        points.push(newPoint);
      }
    }

    return points;
  }

  RectangleShapedCollisionableObjectClass.prototype.getPoints = function() {
    this.points = this.points || getPointsInRectArea();
    return this.points;
  };

  RectangleShapedCollisionableObjectClass.prototype.isCollision = function(point) {
    var pointX = point.getX(),
        pointY = point.getY(),
        isInHorizontalRange,
        isInVerticalRange,
        stageLeftmostPoint = this.upperLeftCornerPoint.getX(),
        stageRightmostPoint = stageLeftmostPoint + this.width,
        stageTopPoint = this.upperLeftCornerPoint.getY(),
        stageBottomPoint = stageTopPoint + this.height;

    isInHorizontalRange = (pointX >= stageLeftmostPoint && pointX <= stageRightmostPoint);
    isInVerticalRange = (pointY >= stageTopPoint && pointY <= stageBottomPoint);

    return isInHorizontalRange && isInVerticalRange;
  };

  RectangleShapedCollisionableObjectClass.prototype.render = function() {
    CollisionableObject.prototype.render.call(this); // using parent class' method
  };

  return RectangleShapedCollisionableObjectClass;
})();

var StageObstacle = (function() {
  function StageObstacleClass() {

  }

  StageObstacleClass.prototype = Object.create(RectangleShapedCollisionableObject);

  StageObstacleClass.prototype.isCollision = function(snakePoint) {
    return RectangleShapedCollisionableObject.prototype.isCollision.call(this); // we could have used the apply method here as well.
  };

  StageObstacleClass.prototype.render = function() {
    return RectangleShapedCollisionableObject.prototype.render.call(this);
  };

  return StageObstacleClass;
})();

var Observable = (function() {
  var observersList = [];

  function ObservableClass() {
  }

  ObservableClass.prototype.addObserver = function(observer) {
    observersList.push(observer);
  };

  ObservableClass.prototype.removeObserver = function(observer) {
    var observerElementIndex = observersList.indexOf(observer);
    observersList.splice(observerElementIndex, 1);
  };

  ObservableClass.prototype.notify = function() {
    observersList.forEach(function(currentObserver) {
      currentObserver.update();
    });
  };

  return ObservableClass;
})();

var Observer = (function() {
  function ObserverClass() {
  }

  ObserverClass.prototype.update = function() {
  };

  return ObserverClass;
})();

var CountdownTimer = (function() {
  var timer = {},
      secondsLeft;

  function CountdownTimerClass(timeToCountdownInSeconds) {
    secondsLeft = timeToCountdownInSeconds;
  }

  CountdownTimerClass.prototype = Object.create(Observable);

  function initialize() {
    var millisecondsInOneSecond = 1000;
    timer = setInterval(tick, millisecondsInOneSecond);
  }

  function tick(context) {
    secondsLeft--;
    stopTimerIfNecessary();
  }

  function isTimeOver() {
    return (secondsLeft <= 0);
  }

  function stopTimerIfNecessary() {
    if (isTimeOver()) {
      stopTimer();
    }
  }

  function stopTimer() {
    clearInterval(timer);
    Observable.prototype.notify.call(this);
  }

  return CountdownTimer;
})();

var SnakeFood = (function() {
  function SnakeFoodClass(point) {
    this.position = point;
  }
  SnakeFoodClass.DEFAULT_TIME_TO_BE_VISIBLE_IN_SECONDS = 10;

  SnakeFoodClass.prototype = Object.create(RectangleShapedCollisionableObject);

  SnakeFoodClass.prototype.showUp = function() {
  };

  SnakeFoodClass.prototype.isCollision = function(snakePoint) {
    return RectangleShapedCollisionableObject.prototype.isCollision.call(this); // we could have used the apply method here as well.
  };

  SnakeFoodClass.prototype.getPosition = function() {
    return this.position;
  };

  SnakeFoodClass.prototype.render = function() {
    return RectangleShapedCollisionableObject.prototype.render.call(this);
  };

  return SnakeFoodClass;
})();

var SnakeParticle = (function() {
  function SnakeParticleClass(point) {
    this.particlePosition = point;
    this.particlePixel = new Pixel(point);
  }

  SnakeParticleClass.prototype.getPosition = function() {
    return this.particlePosition;
  };

  SnakeParticleClass.prototype.render = function() {
    this.particlePixel.render();
  };

  return SnakeParticleClass;
})();

var LevelEngine = (function() {
  var instanceOfLevelEngine;

  function init() {
    var LevelEngineClass = (function() {
      var LEVEL_1_OBSTACLES = [
          ],
          LEVEL_2_OBSTACLES = [
          ],
          _currentLevel = 1,
          _currentLevelObstacles = []
      ;

      function loadLevel(newLevel) {
        _currentLevel = newLevel;
        // probably will need to redraw stuff here,
        // set the _currentLevelObstacles var to the respective constant
        // containing information for the newly selected level obstacles
        // and render the level...
      }

      return {
        loadLevel: loadLevel
      };
    })();

    return LevelEngineClass;
  }

  return {
    getInstance: function() {
      if (!instanceOfLevelEngine) {
        instanceOfLevelEngine = init();
      }

      return instanceOfLevelEngine;
    }
  }
})();

var GameEngine = (function() {
  var instanceOfGameEngine;

  function init() {
    var GameEngineClass = (function() {
      var SNAKE_MOVEMENT_SLOW_SPEED = 600,
          SNAKE_MOVEMENT_NORMAL_SPEED = 300,
          SNAKE_MOVEMENT_FAST_SPEED = 100,
          SNAKE_MOVEMENT_GODLIKE_SPEED = 50,
          KEYBOARD_KEY_UP_CODE = 87,
          KEYBOARD_KEY_DOWN_CODE = 83,
          KEYBOARD_KEY_LEFT_CODE = 65,
          KEYBOARD_KEY_RIGHT_CODE = 68,
          KEYBOARD_KEY_ESC_CODE = 27,

          _snakeSpeed = SNAKE_MOVEMENT_FAST_SPEED,
          _snakeInterval,
          _isPaused = false,
          _snake = Snake.getInstance(),
          _levelEngine = LevelEngine.getInstance();


      function setSpeed(newSpeed) {
        _snakeSpeed = newSpeed;
      }

      function initializeSnakeInterval() {
        var snakeSpeed = _snakeSpeed;
        var that = this;
        console.log(that);
        _snakeInterval = setInterval(function() {
          rerender();
        }, snakeSpeed);
      }

      function togglePause() {
        _isPaused = !_isPaused;
      }

      function clearScreen() {
        var context = Pixel.getContext();
        context.clearRect(0, 0, Pixel.CANVAS_ELEMENT_WIDTH_PX, Pixel.CANVAS_ELEMENT_HEIGHT_PX);
      }

      function rerender() {
        if (!_isPaused) {
          _snake.move();
        }
      }

      function startGame() {
        initializeKeyListeners();
        initializeSnakeInterval();
      }

      function rightKeyPressHandler() {
        _snake.moveRight();
      }

      function leftKeyPressHandler() {
        _snake.moveLeft();
      }

      function upKeyPressHandler() {
        _snake.moveUp();
      }

      function downKeyPressHandler() {
        _snake.moveDown();
      }

      function escapeKeyPressHandler() {
        _snake.togglePause();
      }

      function loadLevel(levelNumber) {
        _levelEngine.loadLevel(levelNumber);
      }

      function initializeKeyListeners() {
        $(document).keyup(function(event) {
          var codeOfKeyPressed = event.which;
          switch (codeOfKeyPressed) {
            case KEYBOARD_KEY_RIGHT_CODE:
              rightKeyPressHandler();
              break;
            case KEYBOARD_KEY_LEFT_CODE:
              leftKeyPressHandler();
              break;
            case KEYBOARD_KEY_UP_CODE:
              upKeyPressHandler();
              break;
            case KEYBOARD_KEY_DOWN_CODE:
              downKeyPressHandler();
              break;
            case KEYBOARD_KEY_ESC_CODE:
              escapeKeyPressHandler();
              break;
            default:
              break;
          }
        });
      }

      return { // public API
        setSpeed: setSpeed,
        rerender: rerender,
        startGame: startGame,
        loadLevel: loadLevel,
        togglePause: togglePause
      };
    })();

    return GameEngineClass;
  }

  return {
    getInstance: function() {
      if (!instanceOfGameEngine) {
        instanceOfGameEngine = init();
      }

      return instanceOfGameEngine;
    }
  }
})();

var Snake = (function() { // implemented using the Singleton pattern
  var instanceOfSnake;


  function init() {
    // syzdavame i return-vame instanciq na klasa
    var SnakeClass = (function() { // I hereby implement this using Revealing Module pattern for the Gods of Goldplating. Amen.
      var SNAKE_DIRECTION_RIGHT = 'RIGHT',
          SNAKE_DIRECTION_LEFT = 'LEFT',
          SNAKE_DIRECTION_UP = 'UP',
          SNAKE_DIRECTION_DOWN = 'DOWN',
          STAGE_VERTICAL_CENTER_Y = Pixel.getVerticalCenterY(),
          INITIAL_NUMBER_OF_SNAKE_PARTICLES = 5,
          DEFAULT_SNAKE_POINTS = [
            new SnakePoint(0, STAGE_VERTICAL_CENTER_Y),
            new SnakePoint(1 * INITIAL_NUMBER_OF_SNAKE_PARTICLES, STAGE_VERTICAL_CENTER_Y),
            new SnakePoint(2 * INITIAL_NUMBER_OF_SNAKE_PARTICLES, STAGE_VERTICAL_CENTER_Y),
            new SnakePoint(3 * INITIAL_NUMBER_OF_SNAKE_PARTICLES, STAGE_VERTICAL_CENTER_Y),
            new SnakePoint(4 * INITIAL_NUMBER_OF_SNAKE_PARTICLES, STAGE_VERTICAL_CENTER_Y),
          ],
          DEFAULT_SNAKE_PARTICLES = [ // initially the snake comprises of 3 particles
            new SnakeParticle(DEFAULT_SNAKE_POINTS[0]),
            new SnakeParticle(DEFAULT_SNAKE_POINTS[1]),
            new SnakeParticle(DEFAULT_SNAKE_POINTS[2]),
            new SnakeParticle(DEFAULT_SNAKE_POINTS[3]),
            new SnakeParticle(DEFAULT_SNAKE_POINTS[4])
          ],

          _snakeParticles = DEFAULT_SNAKE_PARTICLES,
          _snakeDirection = SNAKE_DIRECTION_RIGHT;


      function getLastParticlePosition() {
        var lastParticle = _snakeParticles[_snakeParticles.length - 1];
        return lastParticle.getPosition();
      }

      function moveLeft() {
        if (_snakeDirection !== SNAKE_DIRECTION_RIGHT) {
          _snakeDirection = SNAKE_DIRECTION_LEFT;
        }
      }

      function moveRight() {
        if (_snakeDirection !== SNAKE_DIRECTION_LEFT) {
          _snakeDirection = SNAKE_DIRECTION_RIGHT;
        }
      }

      function moveUp() {
        if (_snakeDirection !== SNAKE_DIRECTION_DOWN) {
          _snakeDirection = SNAKE_DIRECTION_UP;
        }
      }

      function moveDown() {
        if (_snakeDirection !== SNAKE_DIRECTION_UP) {
          console.log("Snake direction changed to DOWN");
          _snakeDirection = SNAKE_DIRECTION_DOWN;
        }
      }

      function getFullPixelSize() {
        var fullPixelSize = (Pixel.NOKIA3310_DEFAULT_SPACE_BETWEEN_PIXELS + Pixel.NOKIA3310_DEFAULT_PIXEL_SIZE);
        return fullPixelSize;
      }

      function getNextLeftPosition() {
        var lastParticlePosition = getLastParticlePosition();
        var nextLeftPosition = lastParticlePosition.getX() - getFullPixelSize();
        lastParticlePosition.setX(nextLeftPosition);
        return lastParticlePosition;
      }

      function getNextRightPosition() {
        var lastParticlePosition = getLastParticlePosition();
        var nextRightPosition = lastParticlePosition.getX() + getFullPixelSize();
        lastParticlePosition.setX(nextRightPosition);
        return lastParticlePosition;
      }

      function getNextDownPosition() {
        var lastParticlePosition = getLastParticlePosition();
        var nextDownPosition = lastParticlePosition.getY() + getFullPixelSize();
        lastParticlePosition.setY(nextDownPosition);
        return lastParticlePosition;
      }

      function getNextUpPosition() {
        var lastParticlePosition = getLastParticlePosition();
        var nextYPosition = lastParticlePosition.getY() - getFullPixelSize();
        lastParticlePosition.setY(nextYPosition);
        return lastParticlePosition;
      }

      function snakeBeforeMove() {
        _snakeParticles.shift();
      }

      function handleMoveLeft() {
        snakeBeforeMove();
        var newSnakeHead = new SnakeParticle(getNextLeftPosition());
        _snakeParticles.push(newSnakeHead);
      }

      function handleMoveRight() {
        snakeBeforeMove();
        var newSnakeHead = new SnakeParticle(getNextRightPosition());
        _snakeParticles.push(newSnakeHead);
      }

      function handleMoveDown() {
        snakeBeforeMove();
        var newSnakeHead = new SnakeParticle(getNextDownPosition());
        _snakeParticles.push(newSnakeHead);
      }

      function handleMoveUp() {
        snakeBeforeMove();
        var newSnakeHead = new SnakeParticle(getNextUpPosition());
        _snakeParticles.push(newSnakeHead);
      }

      function move() {
        switch (_snakeDirection) {
          case SNAKE_DIRECTION_LEFT:
            handleMoveLeft();
            break;
          case SNAKE_DIRECTION_RIGHT:
            handleMoveRight();
            break;
          case SNAKE_DIRECTION_UP:
            handleMoveUp();
            break;
          case SNAKE_DIRECTION_DOWN:
            handleMoveDown();
            break;
          default:
            break;
        }
        renderSnake();
//        Observable.prototype.notify.call(this); // notify observers that the snake has changed its position
      }

      function renderSnake() {
        _snakeParticles.forEach(function(currentSnakeParticle) {
          currentSnakeParticle.render();
        });
      }

      return { // public API is exposed using this object (that is returned)
        moveLeft: moveLeft,
        moveRight: moveRight,
        moveUp: moveUp,
        moveDown: moveDown,
        move: move
      };
    })();

    return SnakeClass;
  }

  return {
    getInstance: function() {
      if (!instanceOfSnake) {
        instanceOfSnake = init();
      }

      return instanceOfSnake;
    }
  };
})();

var App = (function() {
  var instanceOfApp;

  function init() {
    var AppClass = (function() {
      var gameEngine = GameEngine.getInstance();
      gameEngine.startGame();
    })();

    return AppClass;
  }

  return {
    getInstance: function() {
      if (!instanceOfApp) {
        instanceOfApp = init();
      }

      return instanceOfApp;
    }
  }
})();

$(function() {
  var snake2App = App.getInstance();
});
