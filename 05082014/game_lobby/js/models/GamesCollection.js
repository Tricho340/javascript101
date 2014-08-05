define("GamesCollection", ["backbone", "Game"], function(Backbone, Game) {
  var GamesCollection = Backbone.Collection.extend({
    model: Game,
    url: "http://hackbulgaria.com:3000/games2/"
  });

  return GamesCollection;
});
