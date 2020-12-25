window.onload = function () {
  sendMessage();
};

function sendMessage() {
  document.onmouseup = () => {
    const selectionText = window.getSelection().toString()?.trim();

    var r = window.getSelection().getRangeAt(0).getBoundingClientRect();
    var relative = document.body.parentNode.getBoundingClientRect();

    // const translatePopupEle = document.getElementById('foreground-app');
    if (selectionText) {
      chrome.runtime.sendMessage({ selectedText: selectionText, position: { r, relative } }, function (response) {
        console.log('respond from sendMessage', response);
      });
      return true;
    }
  };

  document.onkeydown = function (evt) {
    evt = evt || window.event;
    var isEscape = false;
    if ('key' in evt) {
      isEscape = evt.key === 'Escape' || evt.key === 'Esc';
    } else {
      isEscape = evt.keyCode === 27;
    }
    if (isEscape) {
      console.log('going to escape');
      const foregroundEle = document.getElementById('foreground');
      foregroundEle.style.display = 'none';
    }
  };
}
