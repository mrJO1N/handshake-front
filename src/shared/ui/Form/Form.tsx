import clsx from 'clsx';
import styles from './Form.module.sass';

export const Form = ({ children, className, ...props }: React.FormHTMLAttributes<HTMLFormElement>) => (
  <form className={clsx(styles.form, className)} {...props}>
    {children}
  </form>
);

export const FormError = ({ children }: { children: React.ReactNode }) => (
  <span className={styles.error}>{children}</span>
);

export const FormFooter = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={clsx(styles.formFooter, className)}>{children}</div>
)