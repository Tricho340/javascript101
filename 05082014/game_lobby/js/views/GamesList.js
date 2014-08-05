define("GamesList", ["backbone", "handlebars", "jquery"], function(Backbone, Handlebars, $) {
  var GamesList = Backbone.View.extend({
    initialize: function() {

    },
    render: function() {
      var templateFunction = Handlebars.compile($("#gamesListView").html());
      this.$el.html(templateFunction(this.model.toJSON()));
    }
  });

  return GamesList;
});
