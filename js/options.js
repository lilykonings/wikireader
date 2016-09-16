chrome.runtime.getBackgroundPage(function(bgPage) {
  bgPage.storeCSS("wiki");
  bgPage.injectCSS("wiki");
});