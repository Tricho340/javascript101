define("WaitingForPlayer", ["backbone", "handlebars"], function(Backbone, Handlebars) {
  var WaitingForPlayer = Backbone.View.extend({
    initialize: function() {

    },
    render: function() {
      var compiledTemplateHtml = Handlebars.compile($("#waitingForPlayerTemplate").html());
      this.el.html(compiledTemplateHtml);
    }
  });

  return WaitingForPlayer;
});
