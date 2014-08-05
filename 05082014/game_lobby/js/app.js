require.config({
  paths: {
    "jquery": "../bower_components/jquery/dist/jquery",
    "backbone": "../bower_components/backbone/backbone",
    "handlebars": "../bower_components/handlebars/handlebars",
    "underscore": "../bower_components/underscore/underscore",
    "GamesList": "../js/views/GamesList",
    "UserLogin": "../js/views/UserLogin",
    "WaitingForPlayer": "../js/views/WaitingForPlayer",
    "GamesCollection": "../js/models/GamesCollection",
    "User": "../js/models/User",
    "Game": "../js/models/Game",
    "socketio": "../bower_components/socket.io-client/socket.io"
  },
  shim: {
    "handlebars": {
      exports: "Handlebars"
    },
    "socketio": {
      exports: "io"
    },
    "underscore": {
      exports: "_"
    }
  }
});

require(["jquery", "backbone", "GamesList", "UserLogin", "WaitingForPlayer", "User", "Game", "GamesCollection", "underscore", "socketio"], function($, Backbone, GamesList, UserLogin, WaitingForPlayer, User, Game, GamesCollection, _, io) {
  console.log("All modules loaded");
  var API_ROOT_URL = "http://hackbulgaria.com:3000/",
      activeUser = new User(),
      socketId;

  function showLoginView() {
    var loginView = new UserLogin({ model: activeUser });
    loginView.render();
    loadViewInMainContainer(loginView);
    loginView.on("usernameInputted", function() {
      showGamesListView();
      initiateSocketSession();
    });
  }

  function initiateSocketSession() {
    var socket = new io(API_ROOT_URL);
    socket.on("connect", function() {
      console.log("We're here.");
      socketId = socket.io.engine.id;
      console.log(socketId);
    });
  }

  function loadViewInMainContainer(view) {
    $("#mainContainer").empty().append(view.el);
  }

  function hostNewGame() {
    var requestPayload = {
      "playerName": activeUser.get("username"),
      "socketId": socketId
    };
    $.ajax({
      type: "POST",
      url: API_ROOT_URL + "createGame/",
      data: requestPayload,
      success: function(data) {
        console.log("Create game() response received.");
        console.log(data);
      },
      dataType: "json"
    });
  }

  function showGamesListView() {
    console.log("Showing games list view...");
//    var games = Game.fetch();
//    gamesList.fetch().done(function(result) {
  //    console.log("Games list loaded.");
   // });
    var games = new GamesCollection();
    games.fetch().done(function(result) {
      var gamesList = new GamesList({ model: games });
      gamesList.render();
      loadViewInMainContainer(gamesList);
      gamesList.on("hostGameRequested", function() {
        hostNewGame();
        showWaitingForPlayersView();
      });
    });
  }

  function showWaitingForPlayersView() {
    var waitingForPlayers = new WaitingForPlayer();
    waitingForPlayers.render();
    loadViewInMainContainer(waitingForPlayers);
  }

  showLoginView();
});
