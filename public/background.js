chrome.runtime.onInstalled.addListener(function () {
  console.log('onInstall event is created');
  chrome.contextMenus.create({
    id: 'english-app-context',
    title: 'Cracking English by Clark',
    contexts: ['selection'],
  });
});

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

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log('onMessage is trigger. ', request);
  console.log('onMessage is sender. ', sender);
  console.log('onMessage is sendResponse. ', sendResponse);
  // ! dont put element object here
  const { selectedText, position: { r, relative } = {} } = request || {};

  if (selectedText?.trim()) {
    console.log('listener received text', selectedText);
    // ! cannot use ES6 here, only javascript
    // r.right - relative.right
    const code = `
      document.getElementById('foreground-app').style.display = 'inherit';
      document.getElementById('foreground').style.top = '${r.bottom - relative.top}px';
      document.getElementById('foreground').style.right = '-${r.right - relative.right}px';
      document.getElementById('foreground').style.position='absolute';
      document.getElementById('foreground').style.zIndex = 9999;
      document.getElementById('foreground').style.backgroundImage = 'linear-gradient(to top, #a8edea 0%, #fed6e3 100%)';
      document.getElementById('foreground').style.backgroundRepeat = 'no-repeat';
      document.getElementById('foreground').style.width = '400px';
      document.getElementById('foreground').style.display = 'inherit';
      `;
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(sender?.tab?.id, { selectedText: selectedText, position: { r, relative } }, {}, function (
        response
      ) {
        // good get response
        console.log('sendMessage from background', response);
      });
    });

    chrome.tabs.executeScript(sender.tab.id, {
      code: code,
    });
  }
});
