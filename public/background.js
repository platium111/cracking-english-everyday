chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  console.log('log background.js');
  if (changeInfo.status === 'complete') {
    chrome.tabs.executeScript(tabId, { file: './inject_script.js' }, function () {
      chrome.tabs.executeScript(tabId, { file: './index-foreground.js' }, function () {
        console.log('INJECTED AND EXECUTED');
      });
    });
  }
});
