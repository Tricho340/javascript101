define("GamesList", ["backbone", "handlebars", "jquery"], function(Backbone, Handlebars, $) {
  var GamesList = Backbone.View.extend({
    events: {
      "click .hostGameButton": "hostGameButtonClickHandler"
    },
    hostGameButtonClickHandler: function() {
      console.log("Host game button click handler");
      this.trigger("hostGameRequested");
    },
    initialize: function() {

    },
    render: function() {
      var templateFunction = Handlebars.compile($("#gamesListView").html());
      this.$el.html(templateFunction(this.model.toJSON()));
    }
  });

  return GamesList;
});
