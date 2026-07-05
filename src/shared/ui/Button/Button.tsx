import { FC, type ButtonHTMLAttributes } from 'react';
import styles from './Button.module.sass';
import clsx from 'clsx';

type ButtonVariant = 'default' | 'colored' | 'clear';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export const Button: FC<IButtonProps> = ({
  variant = 'default',
  className = '',
  children,
  ...rest
}) => {
  return (
    <button
      {...rest}
      className={clsx(styles.button, styles[variant], className)}
    >
      {children}
    </button>
  );
};