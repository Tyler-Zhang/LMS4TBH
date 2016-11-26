// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.


document.addEventListener('DOMContentLoaded', function () {
  chrome.tabs.executeScript(null, {code: "document.location = 'http://m.facebook.com/messages/?q=Susan Li'"}, function(){
    chrome.tabs.onUpdated.addListener(function(tabId , info) {
      if (info.status == "complete") {
        chrome.tabs.executeScript(null, { file: "jquery.js" }, function() {
          chrome.tabs.executeScript(null, { file: "search.js" });
          chrome.tabs.executeScript(null, { file: "scrape.js" });
        });
      }
    });
  });
});
