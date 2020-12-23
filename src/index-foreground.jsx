import * as React from 'react';

import { render } from 'react-dom';

render(
  <div style={{ backgroundColor: 'red', width: '700px', hight: '600px' }}>Foreground component</div>,
  document.querySelector('#foreground')
);
