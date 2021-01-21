import * as React from 'react';
import styles from './options.scss';
import globalAlign from '../../_foundation/styles/globalAlign.scss';

export default function () {
  return (
    <div className={`${styles.optionBox}`}>
      <p className={globalAlign.centralise}>
        <h1>Cracking English by Clark</h1>{' '}
      </p>
      <p>
        <h2>Cấu hình tra từ</h2>
      </p>
    </div>
  );
}
