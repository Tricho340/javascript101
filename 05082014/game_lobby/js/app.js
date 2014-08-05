require.config({
  paths: {
    "jquery": "../bower_components/jquery/dist/jquery",
    "backbone": "../bower_components/backbone/backbone",
    "handlebars": "../bower_components/handlebars/handlebars",
    "underscore": "../bower_components/underscore/underscore",
    "GamesList": "../js/views/GamesList",
    "UserLogin": "../js/views/UserLogin",
    "WaitingForPlayer": "../js/views/WaitingForPlayer",
    "User": "../js/models/User",
    "Game": "../js/models/Game"
  }
});

require(["jquery", "backbone", "handlebars", "GamesList", "UserLogin", "WaitingForPlayer", "User", "Game"], function($, Backbone, Handlebars, GamesList, UserLogin, WaitingForPlayer, User, Game) {
  console.log("All modules loaded");

  function showLoginView() {
    var loginView = new UserLogin();
    loginView.render();
  }

  function showGamesListView() {
    var gamesList = new GamesList();
    gamesList.fetch().done(function() {
      console.log("Games list loaded.");
    });
  }

  function showWaitingForPlayersView() {

  }

  showLoginView();
});
