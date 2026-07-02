import { forwardRef, useState, type InputHTMLAttributes, type Ref, type TextareaHTMLAttributes, type ReactElement } from 'react';
import styles from './MinimalTextInput.module.sass';
import { preventClipboard } from '@/features/auth/lib/formFunctions';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    variant?: "row"
}

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
    variant: "textarea"
}

type MinimalTextInputProps = InputProps | TextareaProps

// Type overloads
function MinimalTextInputf(
    props: TextareaProps,
    ref: Ref<HTMLTextAreaElement>
): ReactElement;

function MinimalTextInputf(
    props: InputProps,
    ref: Ref<HTMLInputElement>
): ReactElement;

// Implementation
function MinimalTextInputf(
    { variant = 'row', className = '', ...rest }: MinimalTextInputProps,
    ref: Ref<HTMLInputElement | HTMLTextAreaElement>
) {
    const isPassword = variant === 'row' && 'type' in rest && rest.type === 'password';
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div className={[styles.minimalTextInput, className].filter(Boolean).join(' ')}>
            {variant === 'row' ? (
                <input
                    {...(rest as InputHTMLAttributes<HTMLInputElement>)}
                    type={isPassword ? (isVisible ? 'text' : 'password') : (rest as any).type}
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
                    {isVisible ? 'hide' : 'show'}
                </button>
            )}
        </div>
    );
}

export const MinimalTextInput = forwardRef(MinimalTextInputf);
MinimalTextInput.displayName = 'MinimalTextInput';
