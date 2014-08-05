define("WaitingForPlayer", ["backbone", "handlebars", "jquery"], function(Backbone, Handlebars, $) {
  var WaitingForPlayer = Backbone.View.extend({
    initialize: function() {

    },
    render: function() {
      var compiledTemplateHtml = Handlebars.compile($("#waitingForPlayerTemplate").html());
      this.$el.html(compiledTemplateHtml);
    }
  });

  return WaitingForPlayer;
});
