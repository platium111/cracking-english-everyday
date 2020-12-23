import * as React from 'react';
import styles from './button.style.scss';
interface IButtonProps {
  label: String;
}
export default function (props: IButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { label, className, onClick, id } = props;
  return (
    <button className={`${className} ${styles.button} `} onClick={onClick} id={id}>
      {label}
    </button>
  );
}
