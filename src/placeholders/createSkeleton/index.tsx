import * as React from 'react';
import styles from './index.scss';

export default function withSkeleton(Layout, {}) {
  return () => {
    return <Layout className={styles.placeholderWrapper} />;
  };
}
