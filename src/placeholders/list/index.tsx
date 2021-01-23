import * as React from 'react';
import listStyles from '../../components/list/index.scss';
import styles from './index.scss';

export default function ({ className }: React.HTMLAttributes<HTMLDataListElement>) {
  return (
    <div className={`${listStyles.list} ${className}`}>
      {Array(6)
        .fill(0)
        .map((_) => {
          return (
            <div key={`placeholder-list`} className={`${listStyles.item} ${styles.item}`}>
              <div className={`${listStyles.foundLanguage} ${styles.foundLanguage}`}>&nbsp;</div>
              <div className={`${listStyles.targetLanguage} ${styles.targetLanguage}`}>&nbsp;</div>
            </div>
          );
        })}
    </div>
  );
}
