$(document).ready(function() {
  var PIZZERIA_STATUS_OPEN = 'OPEN';
  var PIZZERIA_STATUS_CLOSED = 'CLOSED';
  var laPastaria = new LaPastaria();

  var markPizzeriaAsOpen = function() {
    $('span.pizzeriaStatus').removeClass('pizzeria-closed').addClass('pizzeria-open').text(PIZZERIA_STATUS_OPEN);
  };

  var openUpThatThingggBrooooo = function() {
    laPastaria.gogogo();
  };

  $('#workYouLittlePieceOf').on('click', function() {
    markPizzeriaAsOpen();
    openUpThatThingggBrooooo();
  });
});
