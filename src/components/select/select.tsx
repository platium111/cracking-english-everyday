import * as React from 'react';
import styles from './index.scss';
export default function (props) {
  const { data, className, onChange } = props;
  return (
    <select className={`${styles.Select} ${className}`} onChange={onChange}>
      {data &&
        data.map((option) => {
          const { label, value } = option;
          return <option value={value}>{label}</option>;
        })}
    </select>
  );
}
