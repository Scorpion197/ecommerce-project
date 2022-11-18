import { InputHTMLAttributes } from 'react'
import styles from './Input.module.css'
import clsx from 'clsx';
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    className?:string;
  }
const Input = ({className, ...rest}:InputProps) => {
    const newClassNames = clsx(
        styles.container,
        className
    )
  return (
    <input
        className={newClassNames}
        {...rest}
    />
  )
}

export default Input