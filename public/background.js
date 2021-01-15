// backround.js sẽ luôn đc chạy 

chrome.runtime.onInstalled.addListener(function () {
  console.log('onInstall event is created');
  chrome.contextMenus.create({
    id: 'english-app-context',
    title: 'Cracking English by Clark',
    contexts: ['selection'],
  });
  return true;
});

// chạy khi tabs đc update, nghĩa là khi refresh hoặc tab mới đc mở -> load chrome extension React vào <body>
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  console.log('log background.js');
  if (changeInfo.status === 'complete') {
    chrome.tabs.executeScript(tabId, { file: './inject_script.js' }, function () {
      chrome.tabs.executeScript(tabId, { file: './index-foreground.js' }, function () {
        console.log('INJECTED AND EXECUTED');
      });
    });
  }
  // để chỉ ra đây là chạy async
  return true;
});

// LISTENER có close và selection text | sẽ có thể manipulate chrome styling
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  // ! dont put element object here
  const { selectedText, position: { r, relative } = {}, action, value } = request || {};

  // 1. CLOSE
  if (action === 'close' && value === 'foregroundApp') {
    const code = `document.getElementById('foreground-app').style.display = 'none';`;
    chrome.tabs.executeScript(sender.tab.id, {
      code: code,
    });
  }

  // 2. SELECTION TEXT
  // HOW | khi selection text -> display styling + style box position sẽ có cả zIndex, background -> gửi chrome.tabs.sendMessage cho react nhận từ để get result
  // todo tại sao không set backgroundImage trong react?
  if (selectedText?.trim()) {
    console.log('listener received text', selectedText);
    // ! cannot use ES6 here, only javascript
    const code = `
      document.getElementById('foreground-app').style.display = 'block';
      document.getElementById('foreground-app').style.width = '100%';
      document.getElementById('foreground').style.top = '${r.bottom - relative.top}px';
      document.getElementById('foreground').style.left = '${r.x}px';
      document.getElementById('foreground').style.position='absolute';
      document.getElementById('foreground').style.zIndex = 9999;
      document.getElementById('foreground').style.backgroundImage = 'linear-gradient(to top, #a8edea 0%, #fed6e3 100%)';
      document.getElementById('foreground').style.backgroundRepeat = 'no-repeat';
      document.getElementById('foreground').style.width = '400px';
      document.getElementById('foreground').style.display = 'inherit';
      `;
    chrome.tabs.executeScript(sender.tab.id, {
      code: code,
    });

    // send to REACT
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(sender?.tab?.id, { selectedText: selectedText, position: { r, relative } }, {}, function (
        response
      ) {
        // good get response
        console.log('sendMessage from background', response);
      });
    });
  }

  // ! need this to not have close port errors
  sendResponse({});
  return true;
});
