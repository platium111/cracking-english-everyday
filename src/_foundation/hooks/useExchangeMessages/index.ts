import * as React from 'react';

export default function (input) {
  const [data, setData] = React.useState(input);

  function setMessage(request, sender, sendResponse) {
    /* if (request.target === 'background') {
        if (request.type === 'message') {
          chrome.runtime.sendMessage(chrome.runtime.id, { target: 'app', type: 'setMessage', body: 'How are you' });
        }
      } */
    if (request.selectedText) {
      setData(request.selectedText);
    }
  }

  React.useEffect(() => {
    chrome?.runtime?.onMessage?.addListener(setMessage);
    return () => {
      chrome.runtime.onMessage.removeListener(setMessage);
    };
  }, []);

  return { data };
}
