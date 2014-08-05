define("Game", ["backbone"], function(Backbone) {
  var Game = Backbone.Model.extend({
    url: function() {
      return "http://hackbulgaria.com:3000/games2"
    }
  });

  return Game;
});
