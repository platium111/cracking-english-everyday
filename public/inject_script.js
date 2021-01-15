// Mục đích: tạo div có id = foreground -> tạo <script> -> append <script> vào div -> tìm body để append `div` vào body
// -> div có script là `index-foreground` đến body
const foreground_entry_point = document.createElement('div');
foreground_entry_point.id = 'foreground';

// const foreground_heading_style = document.createElement('link');
// foreground_heading_style.type = 'text/css';
// foreground_heading_style.rel = 'stylesheet';
// foreground_heading_style.href = chrome.runtime.getURL('./index-foreground.css');

let reactJS_script = document.createElement('script');
reactJS_script.src = 'index-foreground.js';

foreground_entry_point.appendChild(reactJS_script);
document.querySelector('body').appendChild(foreground_entry_point);
// document.querySelector('head').appendChild(foreground_heading_style);
