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

    // ! error if do
    
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
