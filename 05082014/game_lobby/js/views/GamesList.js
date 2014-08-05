define("GamesList", ["backbone", "handlebars"], function(Backbone, Handlebars) {
  var GamesList = Backbone.View.extend({
    initialize: function() {

    },
    render: function() {
      var compiledTemplateHtml = Handlebars.compile($("#gamesListView").html());
      this.el.html(compiledTemplateHtml);
    }
  });

  return GamesList;
});
