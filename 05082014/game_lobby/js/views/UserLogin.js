define("UserLogin", ["backbone", "handlebars"], function(Backbone, Handlebars) {
  var UserLogin = Backbone.View.extend({
    initialize: function() {

    },
    render: function() {
      var compiledTemplateHtml = Handlebars.compile($("#userLoginTemplate").html());
      this.el.html(compiledTemplateHtml);
    }
  });

  return UserLogin;
});
