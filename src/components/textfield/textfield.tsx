import * as React from 'react';
import styles from './index.scss';
interface ITextfieldProps {}
type Ref = HTMLInputElement;

const Button = React.forwardRef<Ref, ITextfieldProps & React.InputHTMLAttributes<HTMLInputElement>>((props, ref) => {
  const { onKeyDown, className, placeholder } = props;
  return (
    <input ref={ref} className={`${className} ${styles.Textfield}`} onKeyDown={onKeyDown} placeholder={placeholder}></input>
  );
});

export default Button;
