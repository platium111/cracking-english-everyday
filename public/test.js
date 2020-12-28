chrome.browserAction.onClicked.addListener(function (tab) {
  chrome.tabs.sendRequest(tab.id, { method: 'getSelection' }, function (response) {
    sendServiceRequest(response.data);
  });
});

function sendServiceRequest(selectedText) {
  var serviceCall = 'http://www.google.com/search?q=' + selectedText;
  chrome.tabs.create({ url: serviceCall });
}
