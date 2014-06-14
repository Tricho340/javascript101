"use strict";


$(document).ready(function() {
  var timer;


  /* BASIC TIMER */
  function BasicTimer(targetMinutes, targetSeconds) {
    this.targetMinutes = parseInt(targetMinutes, 10);
    this.targetSeconds = parseInt(targetSeconds, 10);
    this.minutes = 0;
    this.seconds = 0;
    this.currentInterval;
  }

  BasicTimer.prototype.startCount = function() {
    this.initializeCounter();
    var that = this; // necessary because setInterval executes callback function with this = window
    this.currentInterval = setInterval(function() {
      that.tick.call(that);
    }, 1000);
  };

  BasicTimer.prototype.tick = function() {
    this.updateCounter();
    this.handleTimeOverIfNecessary();
    this.updateUI();
  };

  BasicTimer.prototype.handleTimeOverIfNecessary = function() {
    if (this.isTimeOver()) {
      clearInterval(this.currentInterval);
    }
  };

  BasicTimer.prototype.resetCount = function() {
    if (this.currentInterval) {
      clearInterval(this.currentInterval);
    }
    this.targetMinutes = 0;
    this.targetSeconds = 0;
    this.minutes = 0;
    this.seconds = 0;
    this.resetUI();
  };

  BasicTimer.prototype.getFormattedMinutes = function() {
    return this.getFormattedPieceOfTime(this.minutes);
  };

  BasicTimer.prototype.getFormattedSeconds = function() {
    return this.getFormattedPieceOfTime(this.seconds);
  };

  BasicTimer.prototype.getFormattedPieceOfTime = function(pieceOfTimeValue) { // we could be passing minutes or seconds here
    if (pieceOfTimeValue.toString().length === 1) {
      return "0" + pieceOfTimeValue; // make sure that for instance 2 seconds are formatted as 02
    }

    return pieceOfTimeValue;
  };

  BasicTimer.prototype.resetUI = function() {
    $('#minutes').val(0);
    $('#seconds').val(0);
    this.updateUI();
  };

  BasicTimer.prototype.updateUI = function() {
    $('#minute-digit').text(this.getFormattedMinutes());
    $('#second-digit').text(this.getFormattedSeconds());
  };
  /**/


  /* COUNT DOWN TIMER */
  function CountDownTimer(targetMinutes, targetSeconds) {
    BasicTimer.call(this, targetMinutes, targetSeconds);
  }

  CountDownTimer.prototype = Object.create(BasicTimer.prototype);

  CountDownTimer.prototype.updateCounter = function() {
    this.seconds--;
    if (this.seconds < 0) {
      this.seconds = 59;
      this.minutes--;
    }
  };

  CountDownTimer.prototype.initializeCounter = function() {
    this.minutes = this.targetMinutes;
    this.seconds = this.targetSeconds;
  };

  CountDownTimer.prototype.isTimeOver = function() {
    return ((this.minutes === 0) && (this.seconds === 0));
  };
  /**/


  /* COUNT UP TIMER */
  function CountUpTimer(targetMinutes, targetSeconds) {
    BasicTimer.call(this, targetMinutes, targetSeconds);
  }

  CountUpTimer.prototype = Object.create(BasicTimer.prototype);

  CountUpTimer.prototype.updateCounter = function() {
    this.seconds++;
    if (this.seconds > 59) {
      this.seconds = 0;
      this.minutes++;
    }
  };

  CountUpTimer.prototype.initializeCounter = function() {
    this.minutes = 0;
    this.seconds = 0;
  };

  CountUpTimer.prototype.isTimeOver = function() {
    return ((this.minutes === this.targetMinutes) && (this.seconds === this.targetSeconds));
  };
  /**/

  function startCountingUp() {
    var targetMinutes = $('#minutes').val();
    var targetSeconds = $('#seconds').val();
    timer = new CountUpTimer(targetMinutes, targetSeconds);
    timer.startCount();
  }

  function startCountingDown() {
    var targetMinutes = $('#minutes').val();
    var targetSeconds = $('#seconds').val();
    timer = new CountDownTimer(targetMinutes, targetSeconds);
    timer.startCount();
  }

  function resetCount() {
    timer.resetCount();
  }

  function initializeApplication() {
    timer = new BasicTimer(0, 0);
    timer.resetCount();
  }

  $('#startCountingUpButton').on('click', function() {
    startCountingUp();
  });

  $('#startCountingDownButton').on('click', function() {
    startCountingDown();
  });

  $('#stopAndResetButton').on('click', function() {
    resetCount();
  });

  initializeApplication();
});
