// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var config = {
apiKey: "",
    authDomain: "",
    databaseURL: "",
    storageBucket: "",
    messagingSenderId: ""
};
firebase.initializeApp(config);

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  firebase.database().ref('/'+request.name+'/index').on('value', function(originalshot){
    firebase.database().ref('/'+request.name+'/likes/'+originalshot.val()+'/name').once('value').then(function(snapshot) {
      if(snapshot.val() != null){
        var name = snapshot.val();
        chrome.tabs.executeScript(null, { code: "location = '/messages/?q="+name+"'" });
      }else{
        chrome.tabs.executeScript(null, { code: "location = 'http://lmsfortbh.herokuapp.com/public/index.html'" });
      }
    });
  });
});

chrome.tabs.onUpdated.addListener(function(tabId , info) {
  if (info.status == "complete") {
    chrome.tabs.executeScript(null, { file: "jquery.js" }, function() {
      chrome.tabs.executeScript(null, { file: "firebase.js" }, function() {
        chrome.tabs.executeScript(null, { file: "user.js" });
        chrome.tabs.executeScript(null, { file: "search.js" });
        chrome.tabs.executeScript(null, { file: "scrape.js" });
      });
    });
  }
});

document.addEventListener('DOMContentLoaded', function () {
  chrome.tabs.executeScript(null, {code: "document.location = 'http://m.facebook.com/me'"}, function(){
      chrome.tabs.executeScript(null, { file: "jquery.js" }, function() {
          chrome.tabs.executeScript(null, { file: "user.js" });
      });
  });
});
