'use strict';


function Tabs(tabComponentId) {
  this.TAB_HEADING_ITEM_TAG = 'li';

  this.initialize(tabComponentId);
}

Tabs.prototype.initialize = function(tabComponentId) {
  this.initializeJQueryObjectReferences(tabComponentId);
  this.initializeListeners();
  this.initializeDefaultTabSelection();
};

Tabs.prototype.initializeDefaultTabSelection = function() {
  this.collapseAllTabs();
  var $firstTabHeading = this.$tabHeaders.first();
  this.selectTab($firstTabHeading);
};

Tabs.prototype.initializeJQueryObjectReferences = function(tabComponentId) {
  this.$tabs = $(tabComponentId);
  this.$tabHeaders = this.$tabs.find(this.TAB_HEADING_ITEM_TAG);
};

Tabs.prototype.initializeListeners = function() {
  var tabs = this;
  this.$tabs.on('click', this.TAB_HEADING_ITEM_TAG, function(e) {
    e.preventDefault();
    var $tabHeadingClicked = $(this);
    tabs.selectTab($tabHeadingClicked);
  });
};

Tabs.prototype.getTabContentsByTabHeader = function(tabHeaderObject) {
  var tabContentsId = tabHeaderObject.find('a').attr('href');
  var $tabContents = $(tabContentsId);
  return $tabContents;
};

Tabs.prototype.collapseTabByTabHeader = function(tabHeaderObject) {
  var $tabContents = this.getTabContentsByTabHeader(tabHeaderObject);
  $tabContents.hide();
};

Tabs.prototype.selectTab = function(tabHeading) {
  this.collapseAllTabs();

  tabHeading.find('a').addClass('active');
  var $selectedTab = this.getTabContentsByTabHeader(tabHeading);
  $selectedTab.show();
};

Tabs.prototype.collapseAllTabs = function() {
  var tabs = this;
  this.$tabHeaders.each(function(tabIndex, tabHeader) {
    var $tabHeader = $(tabHeader);
    $tabHeader.find('a').removeClass('active');
    tabs.collapseTabByTabHeader($tabHeader);
  });
};
