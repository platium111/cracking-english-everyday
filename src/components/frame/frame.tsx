import * as React from 'react';
import Frame from 'react-frame-component';
import { APP_CONSTANTS } from '../../_foundation';

const frameStyle = {
  width: '100%',
  height: '440px',
  border: 'none',
  'font-family': `'Quicksand', sans-serif`,
  'background-image': `linear-gradient(to top, #a8edea 0%, #fed6e3 100%)`,
  'background-repeat': 'no-repeat',
};

export default function (props) {
  const { appType } = props;

  // ! frame only uses `style`, not class
  return appType === APP_CONSTANTS.appType.chrome ? (
    <Frame
      head={[<link type="text/css" rel="stylesheet" href={chrome?.runtime?.getURL('./index.css')}></link>]}
      style={frameStyle}
    >
      {props.children}
    </Frame>
  ) : (
    <>{props.children} </>
  );
}
