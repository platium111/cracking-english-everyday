import * as React from 'react';

import { render } from 'react-dom';
import { App } from './App';
import styles from './index-foreground.css';
import { APP_CONSTANTS } from './_foundation';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const ForegroundApp = () => {
  const foregroundRef = React.useRef(null);

  function handleClose() {
    chrome?.runtime?.sendMessage({ action: 'close', value: 'foregroundApp' }, function (response) {
      console.log('send message to close foreground app');
    });
  }
  return (
    <div id="foreground-app" style={{ display: 'none' }} ref={foregroundRef}>
      <button
        id="closeForegroundApp"
        style={{
          width: '20px',
          height: '20px',
          position: 'absolute',
          right: '-4px',
          top: '-12px',
          backgroundColor: 'white',
          borderRadius: '50px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: '0px 0px 30px 0px rgba(247,149,29)',
          opacity: 1,
          borderStyle: 'none',
          outline: 'none',
        }}
        onClick={handleClose}
      >
        <span style={{ fontWeight: 700, color: 'rgba(247,149,29)' }}>X</span>
      </button>
      <App className={styles.container} appType={APP_CONSTANTS.appType.chrome} appName={'Cracking English by Clark'} />
    </div>
  );
};
render(<ForegroundApp />, document.querySelector('#foreground'));
