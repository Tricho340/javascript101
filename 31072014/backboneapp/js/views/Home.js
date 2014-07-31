/* global Backbone, $ */

var GitHubApp = GitHubApp || {};

GitHubApp.Views = GitHubApp.Views || {};

GitHubApp.Views.Home = Backbone.View.extend({
  events: {
    'click #add-btn': 'addUser',
    'click .delete-btn': 'removeUser'
  },

  initialize: function () {
    'use strict';
    this.model.on('change', this.render, this);
    this.model.on('add', this.render, this);
    this.model.on('remove', this.render, this);
  },

  addUser: function () {
    'use strict';
    console.log(this);
    var nameInputted = this.$el.find('#user-input').val();
    console.log(nameInputted);
    var userToAdd = new GitHubApp.Models.User({ login: nameInputted });
    this.model.add(userToAdd);
  },

  removeUser: function (e) {
    'use strict';
    var indexOfUserToRemove = $(e.target).data('index');
    var userToRemove = this.model.at(indexOfUserToRemove);
    this.model.remove(userToRemove);
  },

  render: function () {
    'use strict';
    $(this.el).html(this.template({ users: this.model.toJSON() }));
    return this;
  }
});
