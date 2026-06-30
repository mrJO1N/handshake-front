import { FC, type ButtonHTMLAttributes } from 'react';
import styles from './Button.module.sass';

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
      className={[styles.button, styles[variant], className]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </button>
  );
};