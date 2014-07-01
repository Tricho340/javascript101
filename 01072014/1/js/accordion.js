'use strict';


function Accordion(accordionId) {
  this.ACCORDION_TAB_HEADING_TAG = 'dt';
  this.ACCORDION_TAB_CONTENTS_TAG = 'dd';

  this.initialize(accordionId);
}

Accordion.prototype.initialize = function(accordionId) {
  this.initializeJQueryObjectReferences(accordionId);
  this.initializeListeners();
  this.initializeDefaultTabSelection();
};

Accordion.prototype.initializeDefaultTabSelection = function() {
  this.collapseAllTabs();
  var $firstTabHeading = this.$tabHeaders.first();
  this.selectTab($firstTabHeading);
};

Accordion.prototype.initializeJQueryObjectReferences = function(accordionId) {
  this.$accordion = $(accordionId);
  this.$tabHeaders = this.$accordion.find(this.ACCORDION_TAB_HEADING_TAG);
  this.$tabContents = this.$accordion.find(this.ACCORDION_TAB_CONTENTS_TAG);
};

Accordion.prototype.initializeListeners = function() {
  var accordion = this;
  this.$accordion.on('click', this.ACCORDION_TAB_HEADING_TAG, function(e) {
    e.preventDefault();
    var $tabHeadingClicked = $(this);
    accordion.selectTab($tabHeadingClicked);
  });
};

Accordion.prototype.getAccordionTabByTabHeader = function(tabHeaderObject) {
  var $tabContents = tabHeaderObject.next();
  return $tabContents;
};

Accordion.prototype.selectTab = function(tabHeading) {
  this.collapseAllTabs();

  var $selectedTab = this.getAccordionTabByTabHeader(tabHeading);
  $selectedTab.show();
};

Accordion.prototype.collapseAllTabs = function() {
  this.$tabContents.hide();
};
