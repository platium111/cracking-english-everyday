import * as React from 'react';
import Frame from 'react-frame-component';
import { APP_CONSTANTS } from '../../_foundation';

// ! dont know why cannot separate to .scss file -> get error even with width: 100%
const frameStyle = {
  width: '100%',
  height: '440px',
  border: 'none',
};

export default function (props) {
  const { appType } = props;

  // ! frame only uses `style`, not class
  return appType === APP_CONSTANTS.appType.chrome ? (
    <Frame
      head={[
        <link type="text/css" rel="stylesheet" href={chrome?.runtime?.getURL('./index.css')}></link>,
        <link rel="preconnect" href="https://fonts.gstatic.com" />,
        <link
          href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />,
      ]}
      style={frameStyle}
    >
      {props.children}
    </Frame>
  ) : (
    <>{props.children} </>
  );
}
