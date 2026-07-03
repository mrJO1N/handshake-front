import { Button, Input } from '@/shared/ui';
import styles from '../AuthForm.module.sass';
import { FC } from 'react';
import { LoginFormProps } from '../../formProps';
import { useLoginForm } from '../../model/useLoginForm';

export const LoginFormMobile: FC<LoginFormProps> = ({ onSuccess, onSwitchToRegister }) => {
   const { register, onSubmit, formState: { errors }, isPending } = useLoginForm(onSuccess);

    return (
        <form onSubmit={onSubmit} noValidate className={styles.mobile}>
            <div>
                <Input
                    type="email"
                    placeholder="Email"
                    {...register('email')}
                />
                {errors.email && <span className={styles.error}>{errors.email.message}</span>}
            </div>
            <div>
                <Input
                    type="password"
                    placeholder="Пароль"
                    {...register('password')}
                />
                {errors.password && <span className={styles.error}>{errors.password.message}</span>}
            </div>
            {errors.root && <span className={styles.error}>{errors.root.message}</span>}

            <div className={styles.formFooter}>
                <Button className={styles.submit} variant="colored" type="submit" disabled={isPending}>
                    {isPending ? 'Вход…' : 'Войти'}
                </Button>

                <p className={styles.switch}>
                    Нет аккаунта?{' '}
                    <button type="button" className={styles.switchLink} onClick={onSwitchToRegister}>
                        Регистрация
                    </button>
                </p></div>
        </form>
    );
};