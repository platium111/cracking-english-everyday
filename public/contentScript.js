// File này dùng để listener những event (TƯƠNG TÁC VỚI DOM) có thể có trong page và dùng chrome.runtime.sendMessage đến background, background sẽ tương tác với REACT
// ? dù có thể chạy ở đây theo định nghĩa của chrome extension nhưng organize for better
// * phải khai báo trong manifest.json -> permissions: []
//
window.onload = function () {
  sendMessage();
};

function sendMessage() {
  document.onmouseup = () => {
    const selectionText = window.getSelection().toString()?.trim();
    var r = window.getSelection().getRangeAt(0).getBoundingClientRect();
    var relative = document.body.parentNode.getBoundingClientRect();

    // ! error if doing const translatePopupEle = document.getElementById('foreground-app'); và send vào trong sendMessage -> lý do là SYN data ko đc gửi qua chrome functions
    // ? không hiểu tại sao không chrome listener (như làm ở background.js) ở trong file này, có thể ko cần trong onmouseup nhưng vẫn sendMessage -> chắc vẫn ok
    if (selectionText) {
      chrome?.runtime?.sendMessage({ selectedText: selectionText, position: { r, relative } }, function (response) {
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
      // `foreground` là wrapper của `foreground-app`
      const foregroundEle = document.getElementById('foreground');
      foregroundEle.style.display = 'none';
    }
  };
}
