define("UserLogin", ["backbone", "handlebars", "jquery"], function(Backbone, Handlebars, $) {
  var UserLogin = Backbone.View.extend({
    events: {
      "click .loginButton": "loginButtonClickHandler"
    },
    loginButtonClickHandler: function() {
      var usernameInputted = this.$el.find(".usernameTextInput").val();
      this.model.set("username", usernameInputted);
      this.trigger("usernameInputted");
    },
    initialize: function() {

    },
    render: function() {
      var userLoginTemplateHandlebars = $("#userLoginTemplate").html();
      console.log(userLoginTemplateHandlebars);
      var templateFunction = Handlebars.compile(userLoginTemplateHandlebars);
      var html = templateFunction();
      console.log(html);
      this.$el.html(html); // this.model.toJSON()
    }
  });

  return UserLogin;
});
