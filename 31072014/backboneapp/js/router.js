/* global Backbone, $ */

var GitHubApp = GitHubApp || {};

var GitHubAppRouter = Backbone.Router.extend({
  routes: {
    "": "home",
    "/user/:username": "user",
    "/statistics": "stats"
  },
  initialize: function () {
    'use strict';
    this.users = new GitHubApp.Models.UserCollection();
  },
  home: function () {
    'use strict';
    var userModelPromises = this.users.map(function(currentUserModel) {
      return currentUserModel.fetch();
    });
    var that = this;
    $.when.apply($, userModelPromises).then(function() { // shtoto apply ochakva masiv ot argumentite
//    $.when(arg1, arg2, .... ) // kogato vsichki se izpylnqt shte mine
      GitHubApp.Controllers.FrontCtrl.setView({
        partial: 'partials/home.tpl',
        view: GitHubApp.Views.Home,
        model: that.users
      });
      GitHubApp.Controllers.FrontCtrl.render();
    });
  },
  user: function (login) {
    'use strict';
    var match = this.users.where({ login: login }),
        user;
    if (!match || !match.length) {
      user = new GitHubApp.Models.User({
        login: login
      });
      this.users.add(user);
    } else {
      user = match[0];
    }
    user.fetch()
    .done(function () {
      // Invoke the FrontCtrl.setView and FrontCtrl.render
      // with appropriate parameters
      GitHubApp.Controllers.FrontCtrl.setView({
        partial: 'partials/user.tpl',
        view: GitHubApp.Views.User,
        model: user
      });
      GitHubApp.Controllers.FrontCtrl.render();
    });
  },
  stats: function () {
    'use strict';
    GitHubApp.Controllers.FrontCtrl.setView({
      partial: 'partials/stats.tpl',
      view   : GitHubApp.Views.Stats,
      model  : this.users
    });
    GitHubApp.Controllers.FrontCtrl.render();
  }
});

GitHubApp.router = new GitHubAppRouter();

Backbone.history.start();
