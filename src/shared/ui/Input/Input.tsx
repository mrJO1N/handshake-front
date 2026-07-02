import { forwardRef, useState, type InputHTMLAttributes } from 'react';
import styles from './Input.module.sass';
import { preventClipboard } from '@/features/auth/lib/formFunctions';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    variant?: 'default' | 'search';
    onSearch?: () => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ variant = 'default', className = '', onSearch, type, ...rest }, ref) => {
        const isPassword = type === 'password';
        const [isVisible, setIsVisible] = useState(false);

        return (
            <div className={[styles.input, className].filter(Boolean).join(' ')}>
                <input
                    {...rest}
                    type={isPassword ? (isVisible ? 'text' : 'password') : type}
                    ref={ref}
                    className={styles[variant]}
                    {...(isPassword && {
                        onCopy: preventClipboard,
                        onPaste: preventClipboard,
                        onCut: preventClipboard,
                    })}
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
                {isPassword && (
                    <button
                        type="button"
                        className={styles.eyeToggle}
                        onClick={() => setIsVisible((prev) => !prev)}
                    >
                        {isVisible ? 'hide' : 'show'}
                    </button>
                )}
            </div>
        );
    },
);

Input.displayName = 'Input';
