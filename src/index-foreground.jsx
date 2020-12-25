import * as React from 'react';

import { render } from 'react-dom';
import { App } from './App';
import styles from './index-foreground.scss';
// can inject component here

render(
  <div id="foreground-app" style={{ display: 'none' }}>
    {' '}
    <App className={styles.container} appType="chrome" />
  </div>,
  document.querySelector('#foreground')
);
