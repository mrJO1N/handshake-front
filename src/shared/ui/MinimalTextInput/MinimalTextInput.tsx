import { forwardRef, useState, type ClipboardEventHandler, type InputHTMLAttributes, type Ref, type TextareaHTMLAttributes } from 'react';
import styles from './MinimalTextInput.module.sass';

type MinimalTextInputVisibility = 'row' | 'textarea';

interface MinimalTextInputProps extends InputHTMLAttributes<HTMLInputElement> {
    variant?: MinimalTextInputVisibility;
}

const preventClipboard: ClipboardEventHandler<HTMLInputElement> = (e) => e.preventDefault();

export const MinimalTextInput = forwardRef<HTMLInputElement | HTMLTextAreaElement, MinimalTextInputProps>(
    ({ variant = 'row', className = '', type, ...rest }, ref) => {
        const isPassword = type === 'password';
        const [isVisible, setIsVisible] = useState(false);

        return (
            <div className={[styles.minimalTextInput, className].filter(Boolean).join(' ')}>
                {variant === 'row' ? (
                    <input
                        {...rest}
                        type={isPassword ? (isVisible ? 'text' : 'password') : type}
                        ref={ref as Ref<HTMLInputElement>}
                        {...(isPassword && {
                            onCopy: preventClipboard,
                            onPaste: preventClipboard,
                            onCut: preventClipboard,
                        })}
                    />
                ) : (
                    <textarea
                        {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
                        ref={ref as Ref<HTMLTextAreaElement>}
                    />
                )}
                {isPassword && (
                    <button
                        type="button"
                        className={styles.eyeToggle}
                        onClick={() => setIsVisible((prev) => !prev)}
                    >
                        {isVisible ? '1' : '0'}
                    </button>
                )}
            </div>
        );
    },
);

MinimalTextInput.displayName = 'MinimalTextInput';
