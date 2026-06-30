import { type InputHTMLAttributes, type ChangeEvent } from 'react';
import styles from './Input.module.sass';

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  variant?: 'default' | 'search';
  onSearch?: () => void;
}

export const Input = ({
  variant = 'default',
  className = '',
  onChange,
  value,
  onSearch,
  ...rest
}: InputProps) => {
  return (
    <div className={[styles.input, className].filter(Boolean).join(' ')}>
      <input
        {...rest}
        value={value}
        onChange={onChange}
        className={styles[variant]}
      />
      {variant === 'search' && (
        <button
          type="button"
          className={styles.searchIcon}
          onClick={onSearch}
        >
          <span className={styles.arrow} />
        </button>
      )}
    </div>
  );
};