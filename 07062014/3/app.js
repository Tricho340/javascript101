$(document).ready(function() {
  $('#search-button').on('click', function() {
    var currentImageUrl = $('#search-input').val();
    var imageToBeAdded = $('#imagesContainer').append('<img src="' + currentImageUrl + '">');
    console.log("Image html: ", currentImageUrl);
    console.log("Image to be added: ", imageToBeAdded);
    $('#imagesContainer img').on('error', function() {
      alert("An error has occurred while trying to load latest image. Sorry about that, bro.");
    });
    $('#imagesContainer img').on('click', function() {
      $(this).remove();
    });
  });
});
