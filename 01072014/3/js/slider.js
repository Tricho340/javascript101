'use strict';

function getHtmlByHandlebarsTemplateAndData(handlebarsTemplateId, dataObject) {
  var templateHtml = $('#' + handlebarsTemplateId).html();
  var compiledHtml = Handlebars.compile(templateHtml, dataObject);

  return compiledHtml;
}

function Slider(sliderComponentContainerId) {
  this.GOOGLE_IMAGES_API_URL = 'http://ajax.googleapis.com/ajax/services/search/images';

  this.$slider = $(sliderComponentContainerId);
  this.images = [];
  this.selectedImageIndex = 0;
  this.initialize();
}

Slider.prototype.initialize = function() {
  this.renderSliderComponent();
  this.initializeJQueryObjects();
  this.initializeListeners();
};

Slider.prototype.renderSliderComponent = function() {
  var sliderComponentHtml = getHtmlByHandlebarsTemplateAndData('gallery-component-template', {});
  this.$slider.html(sliderComponentHtml);
};

Slider.prototype.initializeJQueryObjects = function() {
  this.$imageSearchArea = this.$slider.find('.imageSearchQueryArea');
  this.$imageSearchQueryTextInput = this.$imageSearchArea.find('input[type="text"]').first();
  this.$searchForImagesButton = this.$imageSearchArea.find('.btn').first();
  this.$galleryArea = this.$slider.find('.gallery');
  this.$previousImageButton = this.$galleryArea.find('.btn').first();
  this.$nextImageButton = this.$galleryArea.find('.btn').last();
  this.$imageComponent = this.$slider.find('#current-image').first();
};

Slider.prototype.initializeListeners = function() {
  var slider = this;
  this.$searchForImagesButton.on('click', function() {
    slider.searchImagesClickHandler();
  });
  this.$nextImageButton.on('click', function() {
    slider.nextImageClickHandler();
  });
  this.$previousImageButton.on('click', function() {
    slider.previousImageClickHandler();
  });
};

Slider.prototype.searchImagesClickHandler = function() {
  var searchQueryInputtedByUser = this.$imageSearchQueryTextInput.val();
  this.searchImages(searchQueryInputtedByUser);
};

Slider.prototype.nextImageClickHandler = function() {
  this.loadNextImage();
};

Slider.prototype.previousImageClickHandler = function() {
  this.loadPreviousImage();
};

Slider.prototype.getNextImageData = function() {
  this.selectedImageIndex++;
  if (this.selectedImageIndex >= this.images.length) {
    this.selectedImageIndex = 0;
  }

  return this.getCurrentImageData();
};

Slider.prototype.getPreviousImageData = function() {
  this.selectedImageIndex--;
  if (this.selectedImageIndex < 0) {
    this.selectedImageIndex = (this.images.length - 1);
  }

  return this.getCurrentImageData();
};

Slider.prototype.loadNextImage = function() {
  var nextImageData = this.getNextImageData();
  this.loadImageByData(nextImageData);
};

Slider.prototype.getCurrentImageData = function() {
  return this.images[this.selectedImageIndex];
};

Slider.prototype.loadPreviousImage = function() {
  var previousImageData = this.getPreviousImageData();
  this.loadImageByData(previousImageData);
};

Slider.prototype.loadImageByData = function(imageData) {
  var imageUrl = imageData.url;
  this.$imageComponent.attr('src', imageUrl);
};

Slider.prototype.initializeSliderByImagesJSONData = function(imagesJSONData) {
  this.images = imagesJSONData.responseData.results;
  this.selectedImageIndex = 0;
  this.loadImageByData(this.getCurrentImageData());
};

Slider.prototype.searchImages = function(query) {
  $.ajax({
      url: this.GOOGLE_IMAGES_API_URL,
      type: 'GET',
      context: this,
      dataType: 'jsonp',
      data: {
          v:  '1.0',
          q:  query,
          format: 'json',
          jsoncallback:  '?'
      },
      success: this.initializeSliderByImagesJSONData
  });
};
