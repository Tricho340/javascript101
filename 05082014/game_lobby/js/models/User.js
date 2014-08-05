define("User", ["backbone"], function(Backbone) {
  var User = Backbone.Model.extend({
    username: ""
  });

  return User;
});
