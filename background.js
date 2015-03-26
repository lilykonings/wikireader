if (jQuery) {
  var storage = chrome.storage.local;

  // Credit: adamfeuer.com
  var optionsPage = function() {
    var page = "options.html";
    var pageUrl = chrome.extension.getURL(page); 
    chrome.tabs.query({}, function(extensionTabs) {
      var found = false;
      for (var i=0; i < extensionTabs.length; i++) {
        if (pageUrl == extensionTabs[i].url) {
          found = true;
          console.log("tab id: " + extensionTabs[i].id);
          chrome.tabs.update(extensionTabs[i].id, {"selected": true});
        }
      }
      if (found == false) {
        chrome.tabs.create({url: page});
      }
    });
  }

  var storeCSS = function(filename) {
    $.ajax({
        url: "wiki.css",
        dataType: "text",
        success: function(css) {
          $("#test").innerText = "success";
          storage.set({'css': css});
        }
    }).fail(function() {
      $("#test").innerText = "failure";
    });
  }

  var injectCSS = function(filename) {
    var css = chrome.extension.getURL(filename);
    storage.get('css', function(value) {
      console.log(value);
      if (value.filename) {
        chrome.tabs.insertCSS({code: value.filename})
      }
    });
  }

  chrome.runtime.onInstalled.addListener(function() {
    storeCSS("wiki");
    // optionsPage();
    injectCSS("wiki");
  });

  chrome.extension.onConnect.addListener(function(port) {
    var tab = port.sender.tab;
    port.onMessage.addListener(function(info) {
      var max_length = 1024;
      if (info.selection.length > max_length)
        info.selection = info.selection.substring(0, max_length);
        optionsPage();
    });
  });

  chrome.browserAction.onClicked.addListener(function(tab) {
    optionsPage();
  });
} else {
  console.log("jQuery not loaded!");
}