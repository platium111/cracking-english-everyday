const foreground_entry_point = document.createElement('div');
// const foreground_heading_style = document.createElement('link');
// foreground_heading_style.type = 'text/css';
// foreground_heading_style.rel = 'stylesheet';
// foreground_heading_style.href = chrome.runtime.getURL('./index-foreground.css');

let reactJS_script = document.createElement('script');

foreground_entry_point.id = 'foreground';
reactJS_script.src = 'index-foreground.js';

foreground_entry_point.appendChild(reactJS_script);
document.querySelector('body').appendChild(foreground_entry_point);
// document.querySelector('head').appendChild(foreground_heading_style);
