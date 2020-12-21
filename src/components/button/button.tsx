import * as React from 'react';
import styles from './button.style.scss';
interface IButtonProps {
  label: String;
}
export default function (props: IButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { label, className, onClick } = props;
  return (
    <button className={`${className} ${styles.button} `} onClick={onClick}>
      {label}
    </button>
  );
}
