// function evil(fn) {
//   return new Function('return ' + fn)();
// }

// function findClickedWord(parentElt, x, y) {
//   if (parentElt.nodeName !== '#text') {
//     console.log("didn't click on text node");
//     return null;
//   }
//   var range = document.createRange();
//   var words = parentElt.textContent.split(' ');
//   var start = 0;
//   var end = 0;
//   for (var i = 0; i < words.length; i++) {
//     var word = words[i];
//     end = start + word.length;
//     range.setStart(parentElt, start);
//     range.setEnd(parentElt, end);
//     // not getBoundingClientRect as word could wrap
//     var rects = range.getClientRects();
//     var clickedRect = isClickInRects(rects);
//     if (clickedRect) {
//       return [word, start, clickedRect];
//     }
//     start = end + 1;
//   }

//   function isClickInRects(rects) {
//     for (var i = 0; i < rects.length; ++i) {
//       var r = rects[i];
//       if (r.left < x && r.right > x && r.top < y && r.bottom > y) {
//         return r;
//       }
//     }
//     return false;
//   }
//   return null;
// }

// function getRangeSelectedText() {
//   var clicked = findClickedWord(e.target.childNodes[0], e.clientX, e.clientY);
//   var word = clicked[0];
//   var start = clicked[1];
//   var r = clicked[2];
//   console.log(`top: ${r.top}, left: ${r.left} `);
//   document.getElementById('foreground-app').style.visibility = 'visible';
//   document.getElementById('foreground-app').style.top = `${r.top}px`;
//   document.getElementById('foreground-app').style.left = `${r.left}px`;
// }

// evil(getRangeSelectedText);

// var translatePopupEle = document.getElementById('foreground-app');
// console.log('translatePopupEle', translatePopupEle);
// translatePopupEle.style.visibility = 'visible';
// translatePopupEle.style.top = r.bottom - relative.top + 'px'; //this will place ele below the selection
// translatePopupEle.style.right = -(r.right - relative.right) + 'px'; //this will align the right edges together

// alert('alignprops', r.bottom, r.right);
