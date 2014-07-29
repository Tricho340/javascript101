require.config({
  paths: {
    "Q": "q"
  }
});

require(["Q"], function(Q) {
  function first(callback) {
    var deferred = Q.defer();
    setTimeout(function() {
      console.log("called first!");
      deferred.resolve();
    }, 1000);
    return deferred.promise;
  }

  function second() {
    var deferred = Q.defer();
    setTimeout(function() {
      console.log("called second!");
      deferred.resolve();
    }, 1000);
    return deferred.promise;
  }

  function third() {
    console.log("I should do the job after first and second");
  }

  function testFunction() {
    var a = 1 + 1;
  }

  Q.fcall(first).then(second).then(third);

});
