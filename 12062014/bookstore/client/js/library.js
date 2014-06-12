"use strict";


$(document).ready(function() {
  var MAX_BOOKS_PER_ROW = 3,
      MAX_CART_ITEMS_PER_ROW = 3,
      latestBooksData,
      shoppingCart = new Cart();


  /* UTIL METHODS */
  function getGridItemsHtml(gridItemsData, itemHtmlMethod, maxItemsPerRow) {
    var gridHtmlElements = ["<div class=\"row\">"];
    var gridItemsInRowSoFar = 0;
    gridItemsData.forEach(function(itemData) {
      if (gridItemsInRowSoFar === maxItemsPerRow) {
        gridHtmlElements.push("</div>");
        gridItemsInRowSoFar = 0;
        gridHtmlElements.push("<div class=\"row\">");
      }
      gridHtmlElements.push(itemHtmlMethod(itemData));
      gridItemsInRowSoFar++;
    });
    gridHtmlElements.push("</div>");

    return gridHtmlElements.join("");
  }

  function getProcessedTemplateHtml(templateId, data) {
    var templateHtml = $('#' + templateId).html();
    var htmlWithValues = _.template(templateHtml, data); // very Lodash magic goes here. wow.

    return htmlWithValues;
  }
  /**/

  /* CART CONTAINER */
  function BookPurchase(bookData) {
    var newPurchaseId = new Date().getTime().toString(); // purchase ID is timestamp of purchase
    this.purchaseId = newPurchaseId;
    this.purchasedBookData = bookData;
  }

  function Cart() {
    this.bookPurchasesInCart = [];
  }

  Cart.prototype.addToCart = function(bookData) {
    var purchase = new BookPurchase(bookData);
    console.log("addToCart::purchase", purchase);
    this.bookPurchasesInCart.push(purchase);
  };

  Cart.prototype.removeFromCart = function(purchaseId) {
    this.bookPurchasesInCart.forEach(function(currentPurchaseData, currentPurchaseIndex, bookPurchasesArray) {
      if (currentPurchaseData.purchaseId === purchaseId) {
        bookPurchasesArray.splice(currentPurchaseIndex, 1);
      }
    });
  };

  Cart.prototype.getCartBooksData = function() {
    var booksData = this.bookPurchasesInCart.map(function(currentValue) {
      var returnedObj = currentValue.purchasedBookData;
      returnedObj.purchaseId = currentValue.purchaseId;
      return returnedObj;
    });
    console.log("Cart books data: ", booksData);
    return booksData;
  };

  Cart.prototype.getTotalNumberOfPagesInCart = function() {
    var totalPages = 0;
    this.bookPurchasesInCart.forEach(function(currentPurchaseData) {
      totalPages += currentPurchaseData.purchasedBookData.num_pages;
    });

    return totalPages;
  }

  function getCartItemsHtml(cartData) {
    var cartItemsHtml = getGridItemsHtml(cartData, getCartItemHtml, MAX_CART_ITEMS_PER_ROW);
    return cartItemsHtml;
  }

  function updateCartContainer() {
    var cartItemsHtml = getCartItemsHtml(shoppingCart.getCartBooksData());
    console.log("cartItemsHtml", cartItemsHtml);
    $('#cart-container').empty().append(cartItemsHtml);
    $('#numberOfPagesInCart').text(shoppingCart.getTotalNumberOfPagesInCart());
    initializeCartButtonListeners();
  }

  function handleRemovePurchaseFromCartClick(purchaseId) {
    shoppingCart.removeFromCart(purchaseId);
    updateCartContainer();
  }

  function initializeCartButtonListeners() {
    $('#cart-container').off();
    $('#cart-container').on('click', '.removeFromCartButton', function() {
      console.log("Remove from cart button clicked!!!");
      var purchaseId = $(this).attr('id');
      console.log("Remove from cart button clicked: ", purchaseId);
      handleRemovePurchaseFromCartClick(purchaseId);
    });
  }
  /**/

  /* BOOKS CONTAINER */
  function getBooksHtml(booksData) {
    var booksHtml = getGridItemsHtml(booksData, getBookHtml, MAX_BOOKS_PER_ROW);
    return booksHtml;
  }

  function getBookHtml(bookData) {
    return getProcessedTemplateHtml('single-book-template', bookData);
  }

  function getCartItemHtml(bookData) {
    return getProcessedTemplateHtml('single-cart-item-template', bookData);
  }

  function updateBooksContainer(booksData) {
    console.log(booksData);
    var booksContainerHtml = getBooksHtml(booksData);
    console.log(booksContainerHtml);
    $('div.books_area').empty().append(booksContainerHtml);
  }

  function getBookDataByBookIsbn(bookIsbn) {
    var bookData = latestBooksData.filter(function(currentValue) {
      return (bookIsbn.toString() === currentValue.isbn.toString());
    })[0];
    return bookData;
  }

  function handleReadBookDescriptionClick(bookIsbn) {
    var bookData = getBookDataByBookIsbn(bookIsbn);
    showBookDescriptionModal(bookData);
  }

  function showBookDescriptionModal(bookData) {
    var modalHtml = getBookDescriptionModalHtml(bookData);
    var $modal = $(modalHtml);

    $modal.modal('show');
  }

  function handleAddBookToCartClick(bookTitle) {
    var bookData = getBookDataByBookIsbn(bookTitle);
    console.log("add book to cart: ", bookData);
    shoppingCart.addToCart(bookData);
    updateCartContainer();
  }

  function getBookDescriptionModalHtml(bookData) {
    return getProcessedTemplateHtml('book-description-modal-template', bookData);
  }

  function initializeBookButtonListeners() {
    $('.books_area').off();
    $('.books_area').on('click', '.readDescriptionButton', function() {
      var bookIsbn = $(this).closest('div').find('.bookisbn').text();
      handleReadBookDescriptionClick(bookIsbn);
    });
    $('.books_area').on('click', '.addToCartButton', function() {
      var bookIsbn = $(this).closest('div').find('.bookisbn').text();
      handleAddBookToCartClick(bookIsbn);
    });
  }
  /**/

  $.getJSON("http://localhost:3000/books", function(data) {
    latestBooksData = data;
    updateBooksContainer(latestBooksData);
    initializeBookButtonListeners();
  });
});
