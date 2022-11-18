import styles from './Button.module.css'
import {clsx} from 'clsx'
import { ButtonHTMLAttributes, JSXElementConstructor } from 'react'


export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    href?: string
    className?: string
    variant?: "contained" | "outlined"
    active?: boolean
    type?: 'submit' | 'reset' | 'button'
    loading?: boolean
    disabled?: boolean
  }
const Button = (
    {
        variant = "contained",
        className,
        children,
        active,
        type,
        loading,
        disabled,
        href,
        ...rest
    }:ButtonProps

) => {
  const newClasses = clsx(
    styles.container,
    {
       [styles.contained]: variant === "contained",
       [styles.outlined]: variant === "outlined",
       [styles.disabled]: disabled,
       [styles.loading]: loading
    },
    className
  )
  return (
    <button 
    aria-pressed={active}
    data-variant={variant}
    className={newClasses}
    disabled={disabled}
    {...rest}
    >

        {children}
    </button>
  )
}

export default Button