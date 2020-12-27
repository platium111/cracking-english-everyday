import * as React from 'react';

import { render } from 'react-dom';
import { App } from './App';
import styles from './index-foreground.scss';
import { APP_CONSTANTS } from './_foundation';

render(
  <div id="foreground-app" style={{ display: 'none' }}>
    <App className={styles.container} appType={APP_CONSTANTS.appType.chrome} appName={'Cracking English by Clark'} />
  </div>,
  document.querySelector('#foreground')
);
