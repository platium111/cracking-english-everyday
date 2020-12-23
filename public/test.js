/* global chrome */
// chrome.tabs.executeScript(
//   {
//     code: 'window.getSelection().toString();',
//   },
//   function (selection) {
//     alert('hey');
//     console.log('clark test');
//   }
// );
console.log('ok in test.js');

chrome.browserAction.onClicked.addListener(function (tab) {
  chrome.tabs.sendRequest(tab.id, { method: 'getSelection' }, function (response) {
    sendServiceRequest(response.data);
  });
});

function sendServiceRequest(selectedText) {
  console.log('click triggered');
  var serviceCall = 'http://www.google.com/search?q=' + selectedText;
  chrome.tabs.create({ url: serviceCall });
}
