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
  },
  shim: {
    handlebars: {
      exports: 'Handlebars'
    }
  }
});

require(["jquery", "backbone", "GamesList", "UserLogin", "WaitingForPlayer", "User", "Game"], function($, Backbone, GamesList, UserLogin, WaitingForPlayer, User, Game) {
  console.log("All modules loaded");
  var activeUser = new User();

  function showLoginView() {
    var loginView = new UserLogin({ model: activeUser });
    loginView.render();
    loadViewInMainContainer(loginView);
    loginView.on("usernameInputted", function() {
      showGamesListView();
    });
  }

  function loadViewInMainContainer(view) {
    $("#mainContainer").append(view.el);
  }

  function showGamesListView() {
    console.log("Showing games list view...");
    var gamesList = new GamesList();

    var games = Game.fetch();
//    gamesList.fetch().done(function(result) {
  //    console.log("Games list loaded.");
   // });
    loadViewInMainContainer(gamesList);
  }

  function showWaitingForPlayersView() {

  }

  showLoginView();
});
