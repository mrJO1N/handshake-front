import { forwardRef, useState, type InputHTMLAttributes, type Ref, type TextareaHTMLAttributes } from 'react';
import styles from './MinimalTextInput.module.sass';
import { preventClipboard } from '@/shared/lib/formFunctions';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    variant?: 'row';
};
type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
    variant: 'textarea';
};
type MinimalTextInputProps = InputProps | TextareaProps;

export const MinimalTextInput = forwardRef<
    HTMLInputElement | HTMLTextAreaElement,
    MinimalTextInputProps
>(({ variant = 'row', className = '', ...rest }, ref) => {
    const [isVisible, setIsVisible] = useState(false);

    const wrapperClass = [styles.minimalTextInput, className].filter(Boolean).join(' ');

    if (variant === 'textarea') {
        return (
            <div className={wrapperClass}>
                <textarea
                    {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
                    ref={ref as Ref<HTMLTextAreaElement>}
                />
            </div>
        );
    }

    const inputProps = rest as InputHTMLAttributes<HTMLInputElement>;
    const isPassword = inputProps.type === 'password';

    return (
        <div className={wrapperClass}>
            <input
                {...inputProps}
                type={isPassword ? (isVisible ? 'text' : 'password') : inputProps.type}
                ref={ref as Ref<HTMLInputElement>}
                {...(isPassword && {
                    onCopy: preventClipboard,
                    onPaste: preventClipboard,
                    onCut: preventClipboard,
                })}
            />
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
});

MinimalTextInput.displayName = 'MinimalTextInput';