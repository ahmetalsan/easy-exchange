import cls from 'classnames'
import React from 'react'

import styles from './Button.module.scss'

type ButtonProps = {
  color?: 'primary' | 'secondary'
  variant?: 'text' | 'contained' | 'outlined'
  size?: 'small' | 'medium' | 'large'
  children: React.ReactNode
  className?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const Button = ({
  color = 'primary',
  variant = 'text',
  size = 'medium',
  children,
  className,
  ...props
}: ButtonProps) => (
  <button className={cls(styles.btn, styles[size], styles[`${color}-${variant}`], className)} {...props}>
    {children}
  </button>
)

export default Button
